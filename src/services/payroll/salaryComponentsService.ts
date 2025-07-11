
import { supabase } from '@/integrations/supabase/client';
import { SalaryComponent } from './types';

export const salaryComponentsService = {
  // Get salary components
  async getSalaryComponents(): Promise<SalaryComponent[]> {
    try {
      const { data, error } = await supabase
        .from('salary_components')
        .select('*')
        .order('type', { ascending: true });

      if (error) {
        console.error('Error fetching salary components:', error);
        throw error;
      }

      return (data || []).map(component => ({
        ...component,
        type: component.type as 'earning' | 'deduction' | 'benefit'
      }));
    } catch (error) {
      console.error('Error in getSalaryComponents:', error);
      throw error;
    }
  },

  // Update salary component
  async updateSalaryComponent(id: string, updates: Partial<SalaryComponent>): Promise<SalaryComponent> {
    try {
      const { data, error } = await supabase
        .from('salary_components')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating salary component:', error);
        throw error;
      }

      return {
        ...data,
        type: data.type as 'earning' | 'deduction' | 'benefit'
      };
    } catch (error) {
      console.error('Error in updateSalaryComponent:', error);
      throw error;
    }
  }
};
