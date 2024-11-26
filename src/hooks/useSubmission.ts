import { useState } from 'react';
import { Submission } from '../types/submission';
import { submissionService } from '../services/submissionService';

export const useSubmission = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitForm = async (
    submission: Omit<Submission, 'id' | 'created_at'>,
    imageUrls: string[] = []
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const createdSubmission = await submissionService.createSubmission(submission);

      if (imageUrls.length > 0) {
        await submissionService.addSubmissionImages(createdSubmission.id!, imageUrls);
      }

      return createdSubmission;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while submitting the form';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    submitForm,
    isLoading,
    error
  };
};