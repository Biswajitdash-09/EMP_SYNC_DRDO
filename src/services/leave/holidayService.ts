
import { supabase } from '@/integrations/supabase/client';
import { Holiday } from './types';
import { fallbackHolidays } from './fallbackData';

export const holidayService = {
  async getHolidays(): Promise<Holiday[]> {
    try {
      const { data, error } = await supabase
        .from('holidays')
        .select('*')
        .order('date');
      
      if (error) {
        console.warn('Holidays table not found, using fallback data:', error);
        return fallbackHolidays;
      }
      
      // Transform data to match Holiday type
      const transformedData = (data || []).map(holiday => ({
        ...holiday,
        type: holiday.type as 'National' | 'Company' | 'Regional'
      }));
      
      return transformedData.length > 0 ? transformedData : fallbackHolidays;
    } catch (error) {
      console.warn('Error fetching holidays, using fallback:', error);
      return fallbackHolidays;
    }
  },

  async createHoliday(holiday: Omit<Holiday, 'id' | 'created_at'>): Promise<Holiday> {
    try {
      const { data, error } = await supabase
        .from('holidays')
        .insert(holiday)
        .select()
        .single();
      
      if (error) throw error;
      
      return {
        ...data,
        type: data.type as 'National' | 'Company' | 'Regional'
      };
    } catch (error) {
      console.error('Error creating holiday:', error);
      throw error;
    }
  },

  async deleteHoliday(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('holidays')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    } catch (error) {
      console.error('Error deleting holiday:', error);
      throw error;
    }
  }
};
