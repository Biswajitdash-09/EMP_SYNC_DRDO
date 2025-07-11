
/**
 * Company Settings Service
 * Handles company information storage and retrieval from Supabase
 */

import { supabase } from '@/integrations/supabase/client';

export interface CompanySettings {
  id?: string;
  name: string;
  address?: string;
  website?: string;
  industry?: string;
  timezone?: string;
  currency?: string;
  phone?: string;
  email?: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * Get company settings from Supabase
 */
export const getCompanySettings = async (): Promise<CompanySettings | null> => {
  try {
    console.log('🔄 Fetching company settings from Supabase...');
    
    const { data, error } = await supabase
      .from('company_settings')
      .select('*')
      .limit(1)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No records found
        console.log('📝 No company settings found');
        return null;
      }
      console.error('❌ Error fetching company settings:', error);
      throw error;
    }

    console.log('✅ Company settings fetched:', data?.name);
    return data;
  } catch (error) {
    console.error('💥 Error in getCompanySettings:', error);
    throw error;
  }
};

/**
 * Store or update company settings in Supabase
 */
export const saveCompanySettings = async (settings: Omit<CompanySettings, 'id' | 'created_at' | 'updated_at'>): Promise<CompanySettings> => {
  try {
    console.log('🔄 Saving company settings to Supabase...');
    
    // First try to get existing settings
    const existing = await getCompanySettings();
    
    let data, error;
    
    if (existing) {
      // Update existing record
      const { data: updateData, error: updateError } = await supabase
        .from('company_settings')
        .update(settings)
        .eq('id', existing.id)
        .select()
        .single();
      
      data = updateData;
      error = updateError;
    } else {
      // Insert new record
      const { data: insertData, error: insertError } = await supabase
        .from('company_settings')
        .insert([settings])
        .select()
        .single();
      
      data = insertData;
      error = insertError;
    }

    if (error) {
      console.error('❌ Error saving company settings:', error);
      throw error;
    }

    console.log('✅ Company settings saved:', data?.name);
    return data;
  } catch (error) {
    console.error('💥 Error in saveCompanySettings:', error);
    throw error;
  }
};
