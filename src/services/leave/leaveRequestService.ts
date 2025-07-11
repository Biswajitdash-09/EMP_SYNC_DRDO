
import { supabase } from '@/integrations/supabase/client';
import { LeaveRequest } from './types';

export const leaveRequestService = {
  async getLeaveRequests(): Promise<LeaveRequest[]> {
    try {
      const { data, error } = await supabase
        .from('leave_requests')
        .select(`
          *,
          employee:profiles!employee_id(full_name),
          leave_type:leave_types(name)
        `)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.warn('Error fetching leave requests:', error);
        // Try fallback query without reviewer relation
        const { data: fallbackData, error: fallbackError } = await supabase
          .from('leave_requests')
          .select(`
            *,
            employee:profiles!employee_id(full_name),
            leave_type:leave_types(name)
          `)
          .order('created_at', { ascending: false });
        
        if (fallbackError) {
          console.warn('Fallback query also failed:', fallbackError);
          return [];
        }
        
        return (fallbackData || []).map((request: any) => ({
          ...request,
          status: request.status as 'pending' | 'approved' | 'rejected',
          employee_name: request.employee?.full_name || 'Unknown',
          leave_type_name: request.leave_type?.name || request.leave_type || 'Unknown'
        }));
      }
      
      return (data || []).map((request: any) => ({
        ...request,
        status: request.status as 'pending' | 'approved' | 'rejected',
        employee_name: request.employee?.full_name || 'Unknown',
        leave_type_name: request.leave_type?.name || request.leave_type || 'Unknown'
      }));
    } catch (error) {
      console.warn('Error fetching leave requests:', error);
      return [];
    }
  },

  async createLeaveRequest(request: {
    employee_id: string;
    leave_type_id: string;
    start_date: string;
    end_date: string;
    days: number;
    reason?: string;
  }): Promise<LeaveRequest> {
    try {
      // Get current user ID for user_id field
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Get leave type name for the legacy leave_type field
      const { data: leaveTypeData } = await supabase
        .from('leave_types')
        .select('name')
        .eq('id', request.leave_type_id)
        .single();

      const insertData = {
        employee_id: request.employee_id,
        leave_type_id: request.leave_type_id,
        start_date: request.start_date,
        end_date: request.end_date,
        days: request.days,
        days_requested: request.days, // Required field
        leave_type: leaveTypeData?.name || 'Unknown', // Required field
        user_id: user.id, // Use current authenticated user's ID
        reason: request.reason,
        status: 'pending'
      };

      console.log('Creating leave request with data:', insertData);

      const { data, error } = await supabase
        .from('leave_requests')
        .insert(insertData)
        .select(`
          *,
          employee:profiles!employee_id(full_name),
          leave_type:leave_types(name)
        `)
        .single();
      
      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      return {
        ...data,
        status: data.status as 'pending' | 'approved' | 'rejected',
        employee_name: data.employee?.full_name || 'Unknown',
        leave_type_name: data.leave_type?.name || 'Unknown'
      };
    } catch (error) {
      console.error('Error creating leave request:', error);
      throw error;
    }
  },

  async updateLeaveRequestStatus(
    id: string, 
    status: 'approved' | 'rejected', 
    reviewerId: string, 
    comments?: string
  ): Promise<LeaveRequest> {
    try {
      console.log('Updating leave request:', { id, status, reviewerId, comments });

      // First, verify the request exists
      const { data: existingRequest, error: fetchError } = await supabase
        .from('leave_requests')
        .select('id')
        .eq('id', id)
        .single();

      if (fetchError || !existingRequest) {
        console.error('Request not found:', fetchError);
        throw new Error('Leave request not found');
      }

      // Update the request with correct field names
      const updateData = {
        status,
        reviewed_by: reviewerId, // This should be a UUID
        reviewed_date: new Date().toISOString(),
        comments,
        updated_at: new Date().toISOString()
      };

      console.log('Update data:', updateData);

      const { data, error } = await supabase
        .from('leave_requests')
        .update(updateData)
        .eq('id', id)
        .select(`
          *,
          employee:profiles!employee_id(full_name),
          leave_type:leave_types(name)
        `)
        .single();
      
      if (error) {
        console.error('Update error:', error);
        throw error;
      }
      
      // Get reviewer name separately to avoid relationship issues
      let reviewerName;
      if (reviewerId) {
        const { data: reviewerData } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', reviewerId)
          .single();
        reviewerName = reviewerData?.full_name;
      }
      
      console.log('Leave request updated successfully:', data);
      
      return {
        ...data,
        status: data.status as 'pending' | 'approved' | 'rejected',
        employee_name: data.employee?.full_name || 'Unknown',
        leave_type_name: data.leave_type?.name || 'Unknown',
        reviewer_name: reviewerName
      };
    } catch (error) {
      console.error('Error updating leave request status:', error);
      throw error;
    }
  },

  async deleteLeaveRequest(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('leave_requests')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    } catch (error) {
      console.error('Error deleting leave request:', error);
      throw error;
    }
  }
};
