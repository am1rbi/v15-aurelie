import React from 'react';
import { FunnelStepProps } from './types';

const PersonalInfoStep: React.FC<FunnelStepProps> = ({ 
  formData, 
  handleInputChange, 
  errors 
}) => {
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
};

export default PersonalInfoStep;