import { supabase } from '@/integrations/supabase/client';
import { attendanceService } from './attendanceService';

export interface ProfileUpdateData {
  full_name?: string;
  phone?: string;
  department?: string;
  position?: string;
  avatar_url?: string;
}

export interface EmployeeDetailsData {
  address?: string;
  bio?: string;
  profile_picture_url?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
}

export interface AttendanceRecord {
  id?: string;
  check_in?: string;
  check_out?: string;
  date: string;
  status?: string;
  notes?: string;
}

export interface LeaveRequest {
  id?: string;
  leave_type: string;
  start_date: string;
  end_date: string;
  days_requested: number;
  reason?: string;
  status?: string;
}

export interface DocumentUpload {
  document_name: string;
  document_type: string;
  file_url?: string;
  file_size?: number;
  mime_type?: string;
}

export interface SupportTicket {
  id?: string;
  subject: string;
  description: string;
  category: string;
  priority?: string;
  status?: string;
}

export interface FeedbackSubmission {
  feedback_type: string;
  subject: string;
  message: string;
  rating?: number;
  is_anonymous?: boolean;
}

export const employeeDashboardService = {
  // Profile operations
  async updateProfile(profileData: ProfileUpdateData) {
    const { data, error } = await supabase
      .from('profiles')
      .update(profileData)
      .eq('id', (await supabase.auth.getUser()).data.user?.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateEmployeeDetails(detailsData: EmployeeDetailsData) {
    const userId = (await supabase.auth.getUser()).data.user?.id;
    
    const { data, error } = await supabase
      .from('employee_details')
      .upsert({
        user_id: userId,
        ...detailsData,
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getEmployeeDetails() {
    const userId = (await supabase.auth.getUser()).data.user?.id;
    
    const { data, error } = await supabase
      .from('employee_details')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  // Updated attendance operations using the new service
  async checkIn(date: string, notes?: string) {
    return await attendanceService.clockIn(undefined, notes);
  },

  async checkOut(attendanceId: string) {
    return await attendanceService.clockOut(attendanceId);
  },

  async getAttendanceRecords(limit = 30) {
    return await attendanceService.getAttendanceRecords(limit);
  },

  async getTodayAttendance() {
    return await attendanceService.getTodayAttendance();
  },

  // Leave operations
  async submitLeaveRequest(leaveData: LeaveRequest) {
    const userId = (await supabase.auth.getUser()).data.user?.id;
    
    const { data, error } = await supabase
      .from('leave_requests')
      .insert({
        user_id: userId,
        ...leaveData
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getLeaveRequests() {
    const userId = (await supabase.auth.getUser()).data.user?.id;
    
    const { data, error } = await supabase
      .from('leave_requests')
      .select('*')
      .eq('user_id', userId)
      .order('applied_date', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Document operations
  async uploadDocument(file: File, documentType: string) {
    const userId = (await supabase.auth.getUser()).data.user?.id;
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${Date.now()}.${fileExt}`;

    // Upload file to storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('employee-files')
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('employee-files')
      .getPublicUrl(fileName);

    // Save document record
    const { data, error } = await supabase
      .from('documents')
      .insert({
        user_id: userId,
        document_name: file.name,
        document_type: documentType,
        file_url: publicUrl,
        file_size: file.size,
        mime_type: file.type
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getDocuments() {
    const userId = (await supabase.auth.getUser()).data.user?.id;
    
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .eq('user_id', userId)
      .order('upload_date', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async deleteDocument(documentId: string) {
    const { error } = await supabase
      .from('documents')
      .delete()
      .eq('id', documentId);

    if (error) throw error;
  },

  // Notification operations
  async getNotifications() {
    const userId = (await supabase.auth.getUser()).data.user?.id;
    
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async markNotificationAsRead(notificationId: string) {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', notificationId);

    if (error) throw error;
  },

  // Support ticket operations
  async createSupportTicket(ticketData: SupportTicket) {
    const userId = (await supabase.auth.getUser()).data.user?.id;
    
    const { data, error } = await supabase
      .from('support_tickets')
      .insert({
        user_id: userId,
        ...ticketData
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getSupportTickets() {
    const userId = (await supabase.auth.getUser()).data.user?.id;
    
    const { data, error } = await supabase
      .from('support_tickets')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Feedback operations
  async submitFeedback(feedbackData: FeedbackSubmission) {
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
  },

  // Performance reviews
  async getPerformanceReviews() {
    const userId = (await supabase.auth.getUser()).data.user?.id;
    
    const { data, error } = await supabase
      .from('performance_reviews')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }
};
