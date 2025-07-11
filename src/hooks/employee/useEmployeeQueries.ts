
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Employee } from '@/types/employee';

export const useEmployeeQueries = () => {
  const [allEmployees, setAllEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEmployees = async () => {
    try {
      console.log('📊 Fetching employees from database...');
      setLoading(true);
      setError(null);

      // Fetch from profiles table which is linked to leave_requests
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .eq('is_active', true)
        .order('full_name');

      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
        throw profilesError;
      }

      // Also fetch from employees table for additional details if available
      const { data: employeesData } = await supabase
        .from('employees')
        .select('*')
        .eq('status', 'Active');

      console.log('✅ Fetched profiles:', profilesData?.length || 0);
      console.log('✅ Fetched employees:', employeesData?.length || 0);

      // Transform profiles to Employee format, merging with employees data where possible
      const transformedEmployees: Employee[] = (profilesData || []).map((profile: any) => {
        // Try to find matching employee record
        const employeeRecord = employeesData?.find(emp => 
          emp.email === profile.email || emp.login_email === profile.email
        );

        return {
          id: profile.id, // Use profile ID which matches leave_requests.employee_id FK
          name: profile.full_name || profile.email,
          email: profile.email,
          department: profile.department || employeeRecord?.department || 'Not specified',
          position: profile.position || employeeRecord?.role || 'Not specified',
          role: profile.position || employeeRecord?.role || 'Not specified',
          phone: profile.phone || employeeRecord?.phone || '',
          status: profile.is_active ? 'Active' : 'Inactive',
          joinDate: employeeRecord?.join_date || new Date().toISOString().split('T')[0],
          profilePictureUrl: profile.avatar_url || employeeRecord?.profile_picture_url,
          manager: employeeRecord?.manager || '',
          address: employeeRecord?.address || '',
          baseSalary: employeeRecord?.base_salary || 0,
          dateOfBirth: employeeRecord?.date_of_birth || new Date().toISOString().split('T')[0],
          
          // Initialize additional required properties
          emergencyContact: {
            name: '',
            phone: '',
            relationship: ''
          },
          loginCredentials: {
            loginEmail: employeeRecord?.login_email || profile.email,
            password: employeeRecord?.login_password || '',
            isActive: employeeRecord?.login_access || false
          },
          employmentHistory: [{
            title: profile.position || employeeRecord?.role || 'Not specified',
            department: profile.department || employeeRecord?.department || 'Not specified',
            startDate: employeeRecord?.join_date || new Date().toISOString().split('T')[0],
            current: true
          }],
          documents: []
        };
      });

      setAllEmployees(transformedEmployees);
      console.log('✅ Transformed employees:', transformedEmployees.length);
    } catch (err: any) {
      console.error('❌ Error fetching employees:', err);
      setError(err.message || 'Failed to fetch employees');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return {
    allEmployees,
    setAllEmployees,
    loading,
    error,
    fetchEmployees
  };
};
