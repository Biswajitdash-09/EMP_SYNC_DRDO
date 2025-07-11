
import { useState, useEffect } from 'react';
import { usePolicyOperations } from './policies/usePolicyOperations';
import { usePolicyQueries } from './policies/usePolicyQueries';
import { CompanyPolicy } from './policies/types';

export type { CompanyPolicy } from './policies/types';

export const useCompanyPolicies = () => {
  const [policies, setPolicies] = useState<CompanyPolicy[]>([]);
  const [loading, setLoading] = useState(true);
  
  const { addPolicy: addPolicyOperation, updatePolicy: updatePolicyOperation, deletePolicy: deletePolicyOperation } = usePolicyOperations();
  const { fetchPolicies, searchPolicies: searchPoliciesQuery, filterPolicies: filterPoliciesQuery } = usePolicyQueries();

  const refetch = () => fetchPolicies(setPolicies, setLoading);

  const addPolicy = (policy: Omit<CompanyPolicy, 'id' | 'created_at' | 'last_updated'>) => 
    addPolicyOperation(policy, setPolicies);

  const updatePolicy = (policyData: { id: string; [key: string]: any }) => 
    updatePolicyOperation(policyData, setPolicies);

  const deletePolicy = (id: string) => 
    deletePolicyOperation(id, setPolicies);

  const searchPolicies = (searchTerm: string) => 
    searchPoliciesQuery(searchTerm, setPolicies);

  const filterPolicies = (filters: { category?: string; status?: string }) => 
    filterPoliciesQuery(filters, setPolicies);

  useEffect(() => {
    fetchPolicies(setPolicies, setLoading);
  }, []);

  return {
    policies,
    loading,
    addPolicy,
    updatePolicy,
    deletePolicy,
    searchPolicies,
    filterPolicies,
    refetch
  };
};
