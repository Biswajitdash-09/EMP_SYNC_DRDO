
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { CompanyPolicy } from './types';
import { mapSupabaseDataToCompanyPolicy } from './utils';

export const usePolicyOperations = () => {
  const { toast } = useToast();

  const addPolicy = async (policy: Omit<CompanyPolicy, 'id' | 'created_at' | 'last_updated'>, setPolicies: React.Dispatch<React.SetStateAction<CompanyPolicy[]>>) => {
    try {
      const { data, error } = await supabase
        .from('company_policies')
        .insert([policy])
        .select()
        .single();

      if (error) {
        throw error;
      }

      setPolicies(prev => [mapSupabaseDataToCompanyPolicy([data])[0], ...prev]);
      toast({
        title: "Success",
        description: "Policy created successfully.",
      });
    } catch (error) {
      console.error('Error creating policy:', error);
      toast({
        title: "Error",
        description: "Failed to create policy. Please try again.",
        variant: "destructive"
      });
    }
  };

  const updatePolicy = async (policyData: { id: string; [key: string]: any }, setPolicies: React.Dispatch<React.SetStateAction<CompanyPolicy[]>>) => {
    try {
      const { data, error } = await supabase
        .from('company_policies')
        .update({
          title: policyData.title,
          category: policyData.category,
          content: policyData.content,
          status: policyData.status,
          last_updated: new Date().toISOString()
        })
        .eq('id', policyData.id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      const updatedPolicy = mapSupabaseDataToCompanyPolicy([data])[0];
      setPolicies(prev => prev.map(policy => 
        policy.id === policyData.id ? updatedPolicy : policy
      ));
      toast({
        title: "Success",
        description: "Policy updated successfully.",
      });
    } catch (error) {
      console.error('Error updating policy:', error);
      toast({
        title: "Error",
        description: "Failed to update policy. Please try again.",
        variant: "destructive"
      });
    }
  };

  const deletePolicy = async (id: string, setPolicies: React.Dispatch<React.SetStateAction<CompanyPolicy[]>>) => {
    try {
      const { error } = await supabase
        .from('company_policies')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      setPolicies(prev => prev.filter(policy => policy.id !== id));
      toast({
        title: "Success",
        description: "Policy deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting policy:', error);
      toast({
        title: "Error",
        description: "Failed to delete policy. Please try again.",
        variant: "destructive"
      });
    }
  };

  return {
    addPolicy,
    updatePolicy,
    deletePolicy
  };
};
