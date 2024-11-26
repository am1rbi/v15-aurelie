import { supabase } from '../lib/supabase';
import { Submission, SubmissionImage } from '../types/submission';

export const submissionService = {
  async createSubmission(submission: Omit<Submission, 'id' | 'created_at'>): Promise<Submission> {
    const { data, error } = await supabase
      .from('submissions')
      .insert([submission])
      .select()
      .single();

    if (error) {
      console.error('Error creating submission:', error);
      throw error;
    }

    return data;
  },

  async addSubmissionImages(submissionId: string, imageUrls: string[]): Promise<SubmissionImage[]> {
    const images = imageUrls.map(url => ({
      submission_id: submissionId,
      image_url: url
    }));

    const { data, error } = await supabase
      .from('submission_images')
      .insert(images)
      .select();

    if (error) {
      console.error('Error adding submission images:', error);
      throw error;
    }

    return data;
  }
};