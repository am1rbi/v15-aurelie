import React from 'react';
import { Upload, Loader, X } from 'lucide-react';
import './UploadButton.css';

interface UploadButtonProps {
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
  previewUrl: string | null;
  isUploading: boolean;
  accept?: string;
  maxSize?: number;
  disabled?: boolean;
}

const UploadButton: React.FC<UploadButtonProps> = ({
  onFileSelect,
  onRemove,
  previewUrl,
  isUploading,
  accept = "image/*",
  maxSize = 5 * 1024 * 1024, // 5MB default
  disabled = false
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) return;

    if (file.size > maxSize) {
      alert('הקובץ גדול מדי. גודל מקסימלי מותר הוא 5MB');
      return;
    }

    onFileSelect(e);
  };

  return (
    <div className="upload-button-container">
      {!previewUrl ? (
        <label 
          htmlFor="file-upload" 
          className={`upload-button ${disabled || isUploading ? 'disabled' : ''}`}
          aria-label="העלאת קובץ"
        >
          {isUploading ? (
            <Loader className="upload-icon spinning" />
          ) : (
            <>
              <Upload className="upload-icon" />
              <span className="upload-text">העלו תמונה</span>
            </>
          )}
        </label>
      ) : (
        <div className="preview-container">
          <img
            src={previewUrl}
            alt="תצוגה מקדימה"
            className="image-preview"
          />
          <button
            onClick={onRemove}
            className="remove-button"
            aria-label="הסר תמונה"
          >
            <X size={20} />
          </button>
        </div>
      )}
      <input
        id="file-upload"
        type="file"
        onChange={handleFileChange}
        accept={accept}
        className="hidden-input"
        disabled={disabled || isUploading}
        aria-label="בחר קובץ להעלאה"
      />
    </div>
  );
};

export default UploadButton;