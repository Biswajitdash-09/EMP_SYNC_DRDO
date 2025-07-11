
import { supabase } from '@/integrations/supabase/client';
import { LeaveType } from './types';
import { fallbackLeaveTypes } from './fallbackData';

export const leaveTypeService = {
  async getLeaveTypes(): Promise<LeaveType[]> {
    try {
      const { data, error } = await supabase
        .from('leave_types')
        .select('*')
        .order('name');
      
      if (error) {
        console.warn('Leave types table not found, using fallback data:', error);
        return fallbackLeaveTypes;
      }
      
      // Transform to include compatibility fields
      return (data || []).map((type: any) => ({
        ...type,
        maxDays: type.annual_days,
        carryForward: type.carry_forward,
        requiresApproval: type.requires_approval
      }));
    } catch (error) {
      console.warn('Error fetching leave types, using fallback:', error);
      return fallbackLeaveTypes;
    }
  },

  async createLeaveType(leaveType: Omit<LeaveType, 'id' | 'created_at' | 'updated_at'>): Promise<LeaveType> {
    try {
      const { data, error } = await supabase
        .from('leave_types')
        .insert({
          name: leaveType.name,
          description: leaveType.description,
          annual_days: leaveType.annual_days,
          requires_approval: leaveType.requires_approval,
          carry_forward: leaveType.carry_forward,
          color: leaveType.color
        })
        .select()
        .single();
      
      if (error) throw error;
      
      return {
        ...data,
        maxDays: data.annual_days,
        carryForward: data.carry_forward,
        requiresApproval: data.requires_approval
      };
    } catch (error) {
      console.error('Error creating leave type:', error);
      throw error;
    }
  },

  async updateLeaveType(id: string, updates: Partial<LeaveType>): Promise<LeaveType> {
    try {
      const updateData: any = {};
      if (updates.name) updateData.name = updates.name;
      if (updates.description) updateData.description = updates.description;
      if (updates.annual_days) updateData.annual_days = updates.annual_days;
      if (updates.requires_approval !== undefined) updateData.requires_approval = updates.requires_approval;
      if (updates.carry_forward !== undefined) updateData.carry_forward = updates.carry_forward;
      if (updates.color) updateData.color = updates.color;
      updateData.updated_at = new Date().toISOString();

      const { data, error } = await supabase
        .from('leave_types')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      
      return {
        ...data,
        maxDays: data.annual_days,
        carryForward: data.carry_forward,
        requiresApproval: data.requires_approval
      };
    } catch (error) {
      console.error('Error updating leave type:', error);
      throw error;
    }
  },

  async deleteLeaveType(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('leave_types')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    } catch (error) {
      console.error('Error deleting leave type:', error);
      throw error;
    }
  }
};
