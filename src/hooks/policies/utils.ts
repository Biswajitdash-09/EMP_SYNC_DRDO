
import { CompanyPolicy } from './types';

// Helper function to ensure status is properly typed
export const mapSupabaseDataToCompanyPolicy = (data: any[]): CompanyPolicy[] => {
  return data.map(item => ({
    ...item,
    status: item.status as 'Active' | 'Inactive'
  }));
};
