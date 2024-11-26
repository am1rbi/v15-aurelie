export interface FormData {
  name: string;
  email: string;
  phone: string;
  designImage: File | null;
  designImagePreview: string;
  designDescription: string;
  budget: string;
  dueDate: string;
  [key: string]: any;
}

export interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  design?: string;
  budget?: string;
  dueDate?: string;
  submit?: string;
  [key: string]: string | undefined;
}

export interface FunnelStepProps {
  formData: FormData;
  handleInputChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOptionSelect?: (type: string, value: string) => void;
  removeImage?: () => void;
  errors: FormErrors;
  isUploading?: boolean;
  hasInteractedWithDesign?: boolean;
}