
import React, { useMemo, useState } from "react";
import { Upload, X, Loader, User, Phone, DollarSign, Calendar, Image } from "lucide-react";
import { useSubmission } from '../hooks/useSubmission';
import PersonalInfoStep from '../components/funnel/PersonalInfoStep';
import DesignStep from '../components/funnel/DesignStep';
import BudgetStep from '../components/funnel/BudgetStep';
import DueDateStep from '../components/funnel/DueDateStep';
import SuccessStep from '../components/funnel/SuccessStep';
import { FormData, FormErrors } from '../components/funnel/types';
import { dueDateMapping } from '../types/submission';
import "./funnel-modal.css";

export interface FunnelModalProps {
  step: "personal" | "design" | "budget" | "dueDate" | "success";
  onClose: () => void;
}

const FunnelModal: React.FC<FunnelModalProps> = ({ onClose, step: initialStep }) => {
  const [step, setStep] = useState(initialStep);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    designImage: null as File | null,
    designImagePreview: "",
    designDescription: "",
    budget: "",
    dueDate: "",
  });

  const [isUploading, setIsUploading] = useState(false);
  const [hasInteractedWithDesign, setHasInteractedWithDesign] = useState(false);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    design: "",
    budget: "",
    dueDate: "",
  });

  const stepIndex = useMemo(() => {
    const steps = ["personal", "design", "budget", "dueDate", "success"];
    return steps.indexOf(step);
  }, [step]);

  const progressPercentage = useMemo(() => {
    return ((stepIndex + 1) / 5) * 100;
  }, [stepIndex]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
      design: "",
    }));
    if (name === "designDescription") {
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
        setFormData((prev) => ({
          ...prev,
          designImage: file,
          designImagePreview: preview,
        }));
        setErrors((prev) => ({
          ...prev,
          design: "",
        }));
      } catch (error) {
        setErrors((prev) => ({
          ...prev,
          design: "שגיאה בטעינת התמונה. נסה שנית",
        }));
      } finally {
        setIsUploading(false);
      }
    }
  };

  const removeImage = () => {
    if (formData.designImagePreview) {
      URL.revokeObjectURL(formData.designImagePreview);
    }
    setFormData((prev) => ({
      ...prev,
      designImage: null,
      designImagePreview: "",
    }));
  };

  const handleOptionSelect = (type: "budget" | "dueDate", value: string) => {
    setFormData((prev) => ({
      ...prev,
      [type]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [type]: "",
    }));
  };

  const validatePersonalInfo = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!formData.name.trim()) {
      newErrors.name = "נא להזין שם מלא";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "נא להזין כתובת אימייל";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "נא להזין כתובת אימייל תקינה";
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "נא להזין מספר טלפון";
      isValid = false;
    } else if (!/^[0-9]{9,10}$/.test(formData.phone.replace(/[-\s]/g, ""))) {
      newErrors.phone = "נא להזין מספר טלפון תקין";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const validateDesign = () => {
    if (!formData.designImage && !formData.designDescription.trim()) {
      setErrors((prev) => ({
        ...prev,
      }));
      return false;
    }
    return true;
  };

  const validateBudget = () => {
    if (!formData.budget) {
      setErrors((prev) => ({
        ...prev,
        budget: "נא לבחור תקציב",
      }));
      return false;
    }
    return true;
  };

  const validateDueDate = () => {
    if (!formData.dueDate) {
      setErrors((prev) => ({
        ...prev,
        dueDate: "נא לבחור מועד אספקה מבוקש",
      }));
      return false;
    }
    return true;
  };

  const handleContinue = async () => {
    if (step === "personal") {
      if (validatePersonalInfo()) {
        setStep("design");
      }
    } else if (step === "design") {
      setHasInteractedWithDesign(true);
      if (validateDesign()) {
        setStep("budget");
      }
    } else if (step === "budget") {
      if (validateBudget()) {
        setStep("dueDate");
      }
    } else if (step === "dueDate") {
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
          
          setStep("success");
        } catch (error) {
          console.error('Error submitting form:', error);
          setErrors(prev => ({
            ...prev,
            submit: 'אירעה שגיאה בשליחת הטופס. אנא נסו שנית.'
          }));
        }
      }
    }
  };

  const renderSuccessContent = () => {
    return (
      <div className="success-page">
        <div className="success-icon-wrapper">
          <span className="success-icon">🎉</span>
        </div>
        <h2>תודה רבה!</h2>
        <p>
          קיבלנו את הפרטים שלך ונחזור אליך בהקדם.
          <br />
          צוות המומחים שלנו כבר מתחיל לעבוד על מציאת התכשיט המושלם עבורך!
        </p>

        <div className="summary">
          <div className="summary-item">
            <div className="summary-icon">
              <User size={18} />
            </div>
            <div className="summary-content">
              <span className="summary-label">שם מלא</span>
              <span className="summary-value">{formData.name}</span>
            </div>
          </div>

          <div className="summary-item">
            <div className="summary-icon">
              <Phone size={18} />
            </div>
            <div className="summary-content">
              <span className="summary-label">טלפון</span>
              <span className="summary-value">{formData.phone}</span>
            </div>
          </div>

          <div className="summary-item">
            <div className="summary-icon">
              <DollarSign size={18} />
            </div>
            <div className="summary-content">
              <span className="summary-label">תקציב</span>
              <span className="summary-value">{formData.budget}</span>
            </div>
          </div>

          <div className="summary-item">
            <div className="summary-icon">
              <Calendar size={18} />
            </div>
            <div className="summary-content">
              <span className="summary-label">מועד אספקה מבוקש</span>
              <span className="summary-value">{formData.dueDate}</span>
            </div>
          </div>

          {formData.designImagePreview && (
            <div className="summary-item">
              <div className="summary-icon">
                <Image size={18} />
              </div>
              <div className="summary-content">
                <span className="summary-label">תמונת השראה</span>
                <img
                  src={formData.designImagePreview}
                  alt="תמונת השראה"
                  className="summary-image"
                />
              </div>
            </div>
          )}
        </div>

        <div className="next-steps">
          <h3>מה הלאה?</h3>
          <ul>
            <li>צוות המומחים שלנו יבחן את הבקשה שלך</li>
            <li>ניצור איתך קשר תוך 24 שעות</li>
            <li>נציג בפניך אפשרויות מותאמות אישית</li>
          </ul>
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    switch (step) {
      case "success":
        return renderSuccessContent();
      case "personal":
        return (
          <>
            <h2>פרטים אישיים</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label htmlFor="name">שם מלא</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="הכנס/י שם מלא"
                  className={errors.name ? "error" : ""}
                />
                {errors.name && (
                  <span className="error-message">{errors.name}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="email">אימייל</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="הכנס/י כתובת אימייל"
                  className={errors.email ? "error" : ""}
                />
                {errors.email && (
                  <span className="error-message">{errors.email}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="phone">טלפון</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="הכנס/י מספר טלפון"
                  className={errors.phone ? "error" : ""}
                />
                {errors.phone && (
                  <span className="error-message">{errors.phone}</span>
                )}
              </div>
            </form>
          </>
        );
      case "design":
        return (
          <>
            <h2>עיצוב התכשיט שלך</h2>
            {hasInteractedWithDesign &&
              !formData.designImage &&
              !formData.designDescription && (
                <div className="warning-message warning-message-top">
                  נא להעלות תמונה או להוסיף תיאור של התכשיט המבוקש
                </div>
              )}
            <p className="design-description">
              מומלץ להעלות תמונה או להוסיף תיאור כדי שנוכל להבין טוב יותר את
              הבקשה שלך{" "}
            </p>
            <div className="design-options">
              <div className="upload-section">
                {!formData.designImagePreview ? (
                  <label htmlFor="designImage" className="upload-label">
                    {isUploading ? (
                      <Loader className="animate-spin" size={24} />
                    ) : (
                      <>
                        <Upload size={24} />
                        <span>העלו תמונה</span>
                      </>
                    )}
                  </label>
                ) : (
                  <div className="image-preview-container">
                    <img
                      src={formData.designImagePreview}
                      alt="תמונת השראה"
                      className="image-preview"
                    />
                    <button onClick={removeImage} className="remove-image">
                      <X size={20} />
                    </button>
                  </div>
                )}
                <input
                  type="file"
                  id="designImage"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden-input"
                  disabled={isUploading}
                />
              </div>
              <div className="form-group">
                <label htmlFor="designDescription">תיאור התכשיט המבוקש</label>
                <textarea
                  id="designDescription"
                  name="designDescription"
                  value={formData.designDescription}
                  onChange={handleInputChange}
                  placeholder="תארו את התכשיט שהיית רוצה... (חומרי גלם, סגנון, מידות וכו')"
                  className={`description-textarea ${errors.design ? "error" : ""}`}
                  rows={4}
                />
              </div>
            </div>
            {errors.design && (
              <span className="error-message error-message-centered">
                {errors.design}
              </span>
            )}
          </>
        );
      case "budget":
        return (
          <>
            <h2>תקציב</h2>
            <div className="budget-options">
              {[
                "עד 1,000 ₪",
                "1,000-4,000 ₪",
                "4,000-7,000 ₪",
                "מעל 7,000 ₪",
              ].map((option) => (
                <button
                  key={option}
                  className={`budget-option ${
                    formData.budget === option ? "selected" : ""
                  }`}
                  onClick={() => handleOptionSelect("budget", option)}
                >
                  {option}
                </button>
              ))}
            </div>
            {errors.budget && (
              <span className="error-message error-message-centered">
                {errors.budget}
              </span>
            )}
          </>
        );
      case "dueDate":
        return (
          <>
            <h2>מתי תרצה/י לקבל את התכשיט?</h2>
            <div className="date-options">
              {["תוך שבוע", "תוך שבועיים", "תוך חודש", "גמיש"].map((option) => (
                <button
                  key={option}
                  className={`date-option ${
                    formData.dueDate === option ? "selected" : ""
                  }`}
                  onClick={() => handleOptionSelect("dueDate", option)}
                >
                  {option}
                </button>
              ))}
            </div>
            {errors.dueDate && (
              <span className="error-message error-message-centered">
                {errors.dueDate}
              </span>
            )}
          </>
        );
      default:
        return <p>שלב לא חוקי</p>;
    }
  };

  return (
    <div className="funnel-modal-overlay" onClick={onClose}>
      <div
        className="funnel-modal-content"
        onClick={(e) => e.stopPropagation()}
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
          {stepIndex > 0 && step !== "success" && (
            <button className="back-button" onClick={handleBack}>
              ←
            </button>
          )}
        </div>
        <div className="funnel-modal-inner">{renderStepContent()}</div>
        <div className="modal-actions">
          {step !== "success" ? (
            <button className="continue-button" onClick={handleContinue}>
              המשך
            </button>
          ) : (
            <button className="home-button" onClick={onClose}>
              חזור לדף הבית
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FunnelModal;