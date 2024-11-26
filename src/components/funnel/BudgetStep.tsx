import React from 'react';
import { FunnelStepProps } from './types';
import './BudgetStep.css';

const BUDGET_OPTIONS = [
  "1,000-4,000 ₪",
  "4,000-7,000 ₪",
  "מעל 7,000 ₪"
];

const BudgetStep: React.FC<FunnelStepProps> = ({ 
  formData, 
  handleOptionSelect, 
  errors 
}) => {
  return (
    <div className="budget-step">
      <h2>מה התקציב שלך?</h2>
      <div className="budget-options-grid">
        {BUDGET_OPTIONS.map((option) => (
          <button
            key={option}
            className={`budget-option ${
              formData.budget === option ? "selected" : ""
            }`}
            onClick={() => handleOptionSelect?.("budget", option)}
            type="button"
            aria-pressed={formData.budget === option}
          >
            <span className="budget-option-text">{option}</span>
          </button>
        ))}
      </div>
      {errors.budget && (
        <span className="error-message error-message-centered">
          {errors.budget}
        </span>
      )}
    </div>
  );
};

export default BudgetStep;