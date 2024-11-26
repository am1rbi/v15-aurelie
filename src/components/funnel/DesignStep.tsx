import React from 'react';
import { FunnelStepProps } from './types';
import UploadButton from './UploadButton';

const DesignStep: React.FC<FunnelStepProps> = ({
  formData,
  handleInputChange,
  handleFileChange,
  removeImage,
  errors,
  isUploading,
  hasInteractedWithDesign
}) => {
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
        הבקשה שלך
      </p>
      <div className="design-options">
        <div className="upload-section">
          <UploadButton
            onFileSelect={handleFileChange}
            onRemove={removeImage}
            previewUrl={formData.designImagePreview}
            isUploading={isUploading}
            accept="image/*"
            maxSize={5 * 1024 * 1024} // 5MB
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
};

export default DesignStep;