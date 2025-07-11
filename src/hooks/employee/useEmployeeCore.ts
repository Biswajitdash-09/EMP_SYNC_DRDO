
/**
 * Core employee data management hook
 * Orchestrates employee operations using specialized hooks with real-time updates
 */

import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useEmployeeFetch } from './useEmployeeFetch';
import { useEmployeeCRUD } from './useEmployeeCRUD';

export const useEmployeeCore = () => {
  const {
    employees,
    loading,
    fetchEmployees,
    setEmployees
  } = useEmployeeFetch();

  const {
    addEmployee,
    updateEmployee,
    deleteEmployee
  } = useEmployeeCRUD(fetchEmployees);

  // Set up real-time subscription for employee changes
  useEffect(() => {
    // Initial fetch
    fetchEmployees();

    // Set up real-time subscription for employees changes
    const employeesSubscription = supabase
      .channel('employees-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'employees'
        },
        (payload) => {
          console.log('🔄 Employee data changed:', payload.eventType);
          fetchEmployees();
        }
      )
      .subscribe();

    // Set up subscription for emergency contacts changes
    const contactsSubscription = supabase
      .channel('contacts-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'employee_emergency_contacts'
        },
        () => {
          console.log('🔄 Emergency contacts changed, refreshing...');
          fetchEmployees();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(employeesSubscription);
      supabase.removeChannel(contactsSubscription);
    };
  }, []);

  return {
    employees,
    loading,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    refreshEmployees: fetchEmployees
  };
};
