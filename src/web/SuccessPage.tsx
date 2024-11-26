import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFunnelContext } from './FunnelContext';
import { FaCheckCircle, FaUser, FaPhone, FaCalendarAlt, FaMoneyBillWave, FaImages } from 'react-icons/fa';
import './success-page.css';

const SuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    firstName, lastName, phoneNumber, lowerBound, upperBound, 
    dueDate, specificDate, uploadedImages 
  } = useFunnelContext();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('he-IL', { 
      style: 'currency', 
      currency: 'ILS',
      maximumFractionDigits: 0 
    }).format(amount);
  };

  const getDueDateText = (dueDate: string, specificDate: string) => {
    switch (dueDate) {
      case 'now': return 'מיידי';
      case 'week': return 'תוך שבוע';
      case 'month': return 'תוך חודש';
      case 'specific': return new Date(specificDate).toLocaleDateString('he-IL');
      default: return 'לא צוין';
    }
  };

  return (
    <div className="success-page-container">
      <div className="success-content">
        <div className="success-header">
          <div className="success-icon-wrapper">
            <FaCheckCircle className="success-icon" />
          </div>
          <h1>תודה רבה!</h1>
          <p className="success-message">
            קיבלנו את הפרטים שלך ונחזור אליך בהקדם.
            <br />
            צוות המומחים שלנו כבר מתחיל לעבוד על מציאת התכשיט המושלם עבורך!
          </p>
        </div>

        <div className="summary-container">
          <h2>סיכום הפרטים שלך</h2>
          
          <div className="summary-grid">
            <div className="summary-item">
              <div className="summary-icon">
                <FaUser />
              </div>
              <div className="summary-content">
                <span className="summary-label">שם מלא</span>
                <span className="summary-value">{`${firstName} ${lastName}`}</span>
              </div>
            </div>

            <div className="summary-item">
              <div className="summary-icon">
                <FaPhone />
              </div>
              <div className="summary-content">
                <span className="summary-label">טלפון</span>
                <span className="summary-value">{phoneNumber}</span>
              </div>
            </div>

            <div className="summary-item">
              <div className="summary-icon">
                <FaMoneyBillWave />
              </div>
              <div className="summary-content">
                <span className="summary-label">טווח תקציב</span>
                <span className="summary-value">
                  {`${formatCurrency(lowerBound)} - ${formatCurrency(upperBound)}`}
                </span>
              </div>
            </div>

            <div className="summary-item">
              <div className="summary-icon">
                <FaCalendarAlt />
              </div>
              <div className="summary-content">
                <span className="summary-label">תאריך יעד</span>
                <span className="summary-value">
                  {getDueDateText(dueDate, specificDate)}
                </span>
              </div>
            </div>

            {uploadedImages.length > 0 && (
              <div className="summary-item full-width">
                <div className="summary-icon">
                  <FaImages />
                </div>
                <div className="summary-content">
                  <span className="summary-label">תמונות שהועלו</span>
                  <div className="uploaded-images-grid">
                    {uploadedImages.map((image, index) => (
                      <img 
                        key={index} 
                        src={image} 
                        alt={`תמונת השראה ${index + 1}`}
                        className="uploaded-image"
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="next-steps">
          <h3>מה הלאה?</h3>
          <ul>
            <li>צוות המומחים שלנו יבחן את הבקשה שלך</li>
            <li>ניצור איתך קשר תוך 24 שעות</li>
            <li>נציג בפניך אפשרויות מותאמות אישית</li>
          </ul>
        </div>

        <button 
          onClick={() => navigate('/')} 
          className="home-button"
        >
          חזרה לדף הבית
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;