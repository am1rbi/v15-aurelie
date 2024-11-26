export type DueDateType = 'week' | 'two_weeks' | 'month' | 'flexible';

export interface Submission {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  budget_range: string;
  due_date: DueDateType;
  specific_date?: string;
  design_description?: string;
  created_at?: string;
}

export interface SubmissionImage {
  id?: string;
  submission_id: string;
  image_url: string;
  created_at?: string;
}

export const dueDateMapping: Record<string, DueDateType> = {
  'תוך שבוע': 'week',
  'תוך שבועיים': 'two_weeks',
  'תוך חודש': 'month',
  'גמיש': 'flexible'
};