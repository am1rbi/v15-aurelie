import React from 'react';
import { User, Phone, DollarSign, Calendar, Image, Mail } from 'lucide-react';
import { FunnelStepProps } from './types';
import './SuccessStep.css';

const SuccessStep: React.FC<FunnelStepProps> = ({ formData }) => {
  return (
    <div className="success-step">
      <div className="success-icon-wrapper">
        <span className="success-icon">🎉</span>
      </div>
      
      <h2>תודה רבה!</h2>
      <p className="success-message">
        קיבלנו את הפרטים שלך ונחזור אליך בהקדם.
        <br />
        צוות המומחים שלנו כבר מתחיל לעבוד על מציאת התכשיט המושלם עבורך!
      </p>

      <div className="summary-grid">
        <div className="summary-item">
          <div className="summary-icon">
            <User size={20} />
          </div>
          <div className="summary-content">
            <span className="summary-label">שם מלא</span>
            <span className="summary-value">{formData.name}</span>
          </div>
        </div>

        <div className="summary-item">
          <div className="summary-icon">
            <Mail size={20} />
          </div>
          <div className="summary-content">
            <span className="summary-label">אימייל</span>
            <span className="summary-value">{formData.email}</span>
          </div>
        </div>

        <div className="summary-item">
          <div className="summary-icon">
            <Phone size={20} />
          </div>
          <div className="summary-content">
            <span className="summary-label">טלפון</span>
            <span className="summary-value">{formData.phone}</span>
          </div>
        </div>

        <div className="summary-item">
          <div className="summary-icon">
            <DollarSign size={20} />
          </div>
          <div className="summary-content">
            <span className="summary-label">תקציב</span>
            <span className="summary-value">{formData.budget}</span>
          </div>
        </div>

        <div className="summary-item">
          <div className="summary-icon">
            <Calendar size={20} />
          </div>
          <div className="summary-content">
            <span className="summary-label">מועד אספקה מבוקש</span>
            <span className="summary-value">{formData.dueDate}</span>
          </div>
        </div>

        {formData.designImagePreview && (
          <div className="summary-item">
            <div className="summary-icon">
              <Image size={20} />
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

export default SuccessStep;