/**
 * Employee Queries Hook
 * 
 * This hook handles all data fetching operations for employee management.
 * It provides functions to retrieve employee data from the Supabase database.
 * 
 * Key Features:
 * - Fetch all employees from the database
 * - Real-time data updates using React Query
 * - Error handling for database operations
 * - Loading states for better user experience
 */

import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Employee } from '@/types/employee';

/**
 * Custom hook for fetching employee data
 * 
 * @returns {Object} Query result containing:
 * - data: Array of employee records
 * - loading: Boolean indicating if data is being fetched
 * - error: Any error that occurred during fetching
 * - refetch: Function to manually refresh the data
 */
export const useEmployeeQueries = () => {
  // Use React Query to fetch and cache employee data
  const {
    data: employees = [], // Default to empty array if no data
    isLoading: loading,
    error,
    refetch
  } = useQuery({
    // Unique key for this query - used for caching
    queryKey: ['employees'],
    
    // Function that actually fetches the data
    queryFn: async (): Promise<Employee[]> => {
      console.log('🔍 Fetching employees from database...');
      
      // Query the employees table in Supabase
      const { data, error } = await supabase
        .from('employees')
        .select('*') // Select all columns
        .order('name'); // Sort by name alphabetically

      // Handle any database errors
      if (error) {
        console.error('❌ Error fetching employees:', error);
        throw error;
      }

      console.log(`✅ Successfully fetched ${data?.length || 0} employees`);
      
      // Transform database records to match our Employee interface
      return (data || []).map(emp => ({
        // Map database fields to Employee type properties
        id: emp.employee_id,
        name: emp.name,
        email: emp.email,
        phone: emp.phone || '',
        department: emp.department || '',
        position: emp.role || '',
        role: emp.role || '',
        status: emp.status || 'Active',
        joinDate: emp.join_date || new Date().toISOString().split('T')[0],
        address: emp.address || '',
        dateOfBirth: emp.date_of_birth || '',
        profilePictureUrl: emp.profile_picture_url,
        manager: emp.manager || '',
        baseSalary: emp.base_salary || 0,
        
        // Emergency contact information
        emergencyContact: {
          name: 'Not specified',
          phone: 'Not specified', 
          relationship: 'Not specified'
        },
        
        // Login credentials for employee portal access
        loginCredentials: {
          loginEmail: emp.login_email || emp.email,
          password: emp.login_password || '',
          isActive: emp.login_access || false
        },
        
        // Employment history tracking
        employmentHistory: [{
          title: emp.role || 'Employee',
          department: emp.department || '',
          startDate: emp.join_date || new Date().toISOString().split('T')[0],
          current: true
        }],
        
        // Document storage (empty by default)
        documents: []
      }));
    },
    
    // Refetch data every 5 minutes to keep it fresh
    refetchInterval: 5 * 60 * 1000,
    
    // Keep data fresh when window regains focus
    refetchOnWindowFocus: true
  });

  // Return the query results for use in components
  return {
    employees,
    loading,
    error,
    refetch
  };
};
