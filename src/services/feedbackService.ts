
import { supabase } from '@/integrations/supabase/client';

export interface FeedbackEntry {
  id: string;
  feedback_type: string;
  subject: string;
  message: string;
  rating: number;
  is_anonymous: boolean;
  status: string;
  created_at: string;
}

export interface FeedbackFormData {
  feedback_type: string;
  subject: string;
  message: string;
  rating: number;
  is_anonymous: boolean;
}

export const feedbackService = {
  async submitFeedback(feedbackData: FeedbackFormData) {
    const userId = (await supabase.auth.getUser()).data.user?.id;
    
    const { data, error } = await supabase
      .from('feedback')
      .insert({
        user_id: userId,
        ...feedbackData
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getFeedback() {
    const userId = (await supabase.auth.getUser()).data.user?.id;
    
    const { data, error } = await supabase
      .from('feedback')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }
};
