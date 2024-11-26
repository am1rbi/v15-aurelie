import React, { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import PersonalInfoStep from './PersonalInfoStep';
import DesignStep from './DesignStep';
import BudgetStep from './BudgetStep';
import DueDateStep from './DueDateStep';
import SuccessStep from './SuccessStep';
import { useSubmission } from '../../hooks/useSubmission';
import { FormData, FormErrors } from './types';
import { dueDateMapping } from '../../types/submission';
import './FunnelModal.css';

interface FunnelModalProps {
  onClose: () => void;
}

const FunnelModal: React.FC<FunnelModalProps> = ({ onClose }) => {
  const [step, setStep] = useState<'personal' | 'design' | 'budget' | 'dueDate' | 'success'>('personal');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    designImage: null,
    designImagePreview: '',
    designDescription: '',
    budget: '',
    dueDate: ''
  });

  const [isUploading, setIsUploading] = useState(false);
  const [hasInteractedWithDesign, setHasInteractedWithDesign] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  
  const { submitForm, isLoading } = useSubmission();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '', design: '' }));
    
    if (name === 'designDescription') {
      setHasInteractedWithDesign(true);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setHasInteractedWithDesign(true);
      try {
        const preview = URL.createObjectURL(file);
        setFormData(prev => ({
          ...prev,
          designImage: file,
          designImagePreview: preview
        }));
        setErrors(prev => ({ ...prev, design: '' }));
      } catch (error) {
        setErrors(prev => ({
          ...prev,
          design: 'שגיאה בטעינת התמונה. נסה שנית'
        }));
      } finally {
        setIsUploading(false);
      }
    }
  };

  const removeImage = useCallback(() => {
    if (formData.designImagePreview) {
      URL.revokeObjectURL(formData.designImagePreview);
    }
    setFormData(prev => ({
      ...prev,
      designImage: null,
      designImagePreview: ''
    }));
  }, [formData.designImagePreview]);

  const handleOptionSelect = (type: 'budget' | 'dueDate', value: string) => {
    setFormData(prev => ({ ...prev, [type]: value }));
    setErrors(prev => ({ ...prev, [type]: '' }));
  };

  const validatePersonalInfo = () => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'נא להזין שם מלא';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'נא להזין כתובת אימייל';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'נא להזין כתובת אימייל תקינה';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'נא להזין מספר טלפון';
    } else if (!/^[0-9]{9,10}$/.test(formData.phone.replace(/[-\s]/g, ''))) {
      newErrors.phone = 'נא להזין מספר טלפון תקין';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateDesign = () => {
    if (!formData.designImage && !formData.designDescription.trim()) {
      setErrors(prev => ({
        ...prev,
        design: 'נא להעלות תמונה או להוסיף תיאור'
      }));
      return false;
    }
    return true;
  };

  const validateBudget = () => {
    if (!formData.budget) {
      setErrors(prev => ({ ...prev, budget: 'נא לבחור תקציב' }));
      return false;
    }
    return true;
  };

  const validateDueDate = () => {
    if (!formData.dueDate) {
      setErrors(prev => ({ ...prev, dueDate: 'נא לבחור מועד אספקה מבוקש' }));
      return false;
    }
    return true;
  };

  const handleBack = () => {
    switch (step) {
      case 'design':
        setStep('personal');
        break;
      case 'budget':
        setStep('design');
        break;
      case 'dueDate':
        setStep('budget');
        break;
      case 'success':
        setStep('dueDate');
        break;
    }
  };

  const handleContinue = async () => {
    switch (step) {
      case 'personal':
        if (validatePersonalInfo()) {
          setStep('design');
        }
        break;
      case 'design':
        setHasInteractedWithDesign(true);
        if (validateDesign()) {
          setStep('budget');
        }
        break;
      case 'budget':
        if (validateBudget()) {
          setStep('dueDate');
        }
        break;
      case 'dueDate':
        if (validateDueDate()) {
          try {
            const mappedDueDate = dueDateMapping[formData.dueDate];
            if (!mappedDueDate) {
              throw new Error('Invalid due date value');
            }

            await submitForm({
              first_name: formData.name.split(' ')[0],
              last_name: formData.name.split(' ').slice(1).join(' '),
              email: formData.email,
              phone_number: formData.phone,
              budget_range: formData.budget,
              due_date: mappedDueDate,
              design_description: formData.designDescription
            }, formData.designImagePreview ? [formData.designImagePreview] : []);
            
            setStep('success');
          } catch (error) {
            console.error('Error submitting form:', error);
            setErrors(prev => ({
              ...prev,
              submit: 'אירעה שגיאה בשליחת הטופס. אנא נסו שנית.'
            }));
          }
        }
        break;
    }
  };

  const renderStep = () => {
    const commonProps = {
      formData,
      handleInputChange,
      handleFileChange,
      handleOptionSelect,
      removeImage,
      errors,
      isUploading,
      hasInteractedWithDesign
    };

    switch (step) {
      case 'personal':
        return <PersonalInfoStep {...commonProps} />;
      case 'design':
        return <DesignStep {...commonProps} />;
      case 'budget':
        return <BudgetStep {...commonProps} />;
      case 'dueDate':
        return <DueDateStep {...commonProps} />;
      case 'success':
        return <SuccessStep {...commonProps} />;
      default:
        return null;
    }
  };

  const progressPercentage = {
    personal: 25,
    design: 50,
    budget: 75,
    dueDate: 90,
    success: 100
  }[step];

  return (
    <AnimatePresence>
      <motion.div
        className="funnel-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="funnel-modal-content"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={e => e.stopPropagation()}
        >
          <div className="modal-header">
            <div className="progress-container">
              <div className="progress-bar">
                <div
                  className="progress"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
            {step !== 'personal' && step !== 'success' && (
              <button className="back-button" onClick={handleBack}>
                ←
              </button>
            )}
          </div>
          <div className="funnel-modal-inner">{renderStep()}</div>
          <div className="modal-actions">
            {step !== 'success' ? (
              <button 
                className="continue-button" 
                onClick={handleContinue}
                disabled={isLoading}
              >
                {isLoading ? 'שולח...' : 'המשך'}
              </button>
            ) : (
              <button className="home-button" onClick={onClose}>
                חזור לדף הבית
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FunnelModal;