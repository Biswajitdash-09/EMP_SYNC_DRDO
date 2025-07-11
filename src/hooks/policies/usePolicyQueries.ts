
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { CompanyPolicy } from './types';
import { mapSupabaseDataToCompanyPolicy } from './utils';

export const usePolicyQueries = () => {
  const { toast } = useToast();

  const fetchPolicies = async (setPolicies: React.Dispatch<React.SetStateAction<CompanyPolicy[]>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('company_policies')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setPolicies(mapSupabaseDataToCompanyPolicy(data || []));
    } catch (error) {
      console.error('Error fetching policies:', error);
      toast({
        title: "Error",
        description: "Failed to fetch policies. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const searchPolicies = async (searchTerm: string, setPolicies: React.Dispatch<React.SetStateAction<CompanyPolicy[]>>) => {
    try {
      const { data, error } = await supabase
        .from('company_policies')
        .select('*')
        .or(`title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%,category.ilike.%${searchTerm}%`)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setPolicies(mapSupabaseDataToCompanyPolicy(data || []));
    } catch (error) {
      console.error('Error searching policies:', error);
      toast({
        title: "Error",
        description: "Failed to search policies. Please try again.",
        variant: "destructive"
      });
    }
  };

  const filterPolicies = async (filters: { category?: string; status?: string }, setPolicies: React.Dispatch<React.SetStateAction<CompanyPolicy[]>>) => {
    try {
      let query = supabase
        .from('company_policies')
        .select('*');

      if (filters.category) {
        query = query.eq('category', filters.category);
      }

      if (filters.status) {
        query = query.eq('status', filters.status);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setPolicies(mapSupabaseDataToCompanyPolicy(data || []));
    } catch (error) {
      console.error('Error filtering policies:', error);
      toast({
        title: "Error",
        description: "Failed to filter policies. Please try again.",
        variant: "destructive"
      });
    }
  };

  return {
    fetchPolicies,
    searchPolicies,
    filterPolicies
  };
};
