import React from 'react';
import { FunnelStepProps } from './types';
import './DueDateStep.css';

const DATE_OPTIONS = [
  'תוך שבוע',
  'תוך שבועיים',
  'תוך חודש',
  'גמיש'
];

const DueDateStep: React.FC<FunnelStepProps> = ({ 
  formData, 
  handleOptionSelect, 
  errors 
}) => {
  return (
    <div className="due-date-step">
      <h2>מתי תרצה/י לקבל את התכשיט?</h2>
      <div className="due-date-options-grid">
        {DATE_OPTIONS.map((option) => (
          <button
            key={option}
            className={`due-date-option ${
              formData.dueDate === option ? "selected" : ""
            }`}
            onClick={() => handleOptionSelect?.("dueDate", option)}
            type="button"
            aria-pressed={formData.dueDate === option}
          >
            <span className="due-date-option-text">{option}</span>
          </button>
        ))}
      </div>
      {errors.dueDate && (
        <span className="error-message error-message-centered">
          {errors.dueDate}
        </span>
      )}
    </div>
  );
};

export default DueDateStep;