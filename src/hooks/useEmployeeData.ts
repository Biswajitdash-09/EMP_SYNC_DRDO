
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Employee } from '@/types/employee';

// Re-export Employee interface for backward compatibility
export type { Employee };

export const useEmployeeData = () => {
  const [allEmployees, setAllEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

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

  const addEmployee = async (employeeData: Omit<Employee, 'id'>) => {
    try {
      console.log('➕ Adding new employee:', employeeData.email);

      // Create the main employee record using direct table insertion
      const { data: newEmployee, error: employeeError } = await supabase
        .from('employees')
        .insert({
          name: employeeData.name,
          email: employeeData.email,
          phone: employeeData.phone,
          department: employeeData.department,
          role: employeeData.role,
          status: employeeData.status || 'Active',
          join_date: employeeData.joinDate,
          address: employeeData.address,
          date_of_birth: employeeData.dateOfBirth,
          profile_picture_url: employeeData.profilePictureUrl,
          manager: employeeData.manager,
          base_salary: employeeData.baseSalary,
          login_access: employeeData.loginCredentials?.isActive,
          login_email: employeeData.loginCredentials?.loginEmail,
          login_password: employeeData.loginCredentials?.password
        })
        .select()
        .single();

      if (employeeError) {
        console.error('❌ Error creating employee:', employeeError);
        throw employeeError;
      }

      // Refresh employees list
      await fetchEmployees();
      
    } catch (error: any) {
      console.error('💥 Error adding employee:', error);
      setError(error.message || 'Failed to add employee');
    }
  };

  const updateEmployee = async (employeeId: string, updates: Partial<Employee>) => {
    try {
      console.log('✏️ Updating employee:', employeeId);

      // Update the main employee record
      const { error: employeeError } = await supabase
        .from('employees')
        .update({
          name: updates.name,
          email: updates.email,
          phone: updates.phone,
          department: updates.department,
          role: updates.role,
          status: updates.status,
          join_date: updates.joinDate,
          address: updates.address,
          date_of_birth: updates.dateOfBirth,
          profile_picture_url: updates.profilePictureUrl,
          manager: updates.manager,
          base_salary: updates.baseSalary,
          login_access: updates.loginCredentials?.isActive,
          login_email: updates.loginCredentials?.loginEmail,
          login_password: updates.loginCredentials?.password
        })
        .eq('employee_id', employeeId);

      if (employeeError) {
        console.error('❌ Error updating employee:', employeeError);
        throw employeeError;
      }

      // Refresh employees list
      await fetchEmployees();
      
    } catch (error: any) {
      console.error('💥 Error updating employee:', error);
      setError(error.message || 'Failed to update employee');
    }
  };

  const deleteEmployee = async (employeeId: string) => {
    try {
      console.log('🗑️ Deleting employee:', employeeId);

      // Delete the employee (cascade will handle related records)
      const { error: deleteError } = await supabase
        .from('employees')
        .delete()
        .eq('employee_id', employeeId);

      if (deleteError) {
        console.error('❌ Error deleting employee:', deleteError);
        throw deleteError;
      }

      // Refresh employees list
      await fetchEmployees();
      
    } catch (error: any) {
      console.error('💥 Error deleting employee:', error);
      setError(error.message || 'Failed to delete employee');
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Filter employees based on search and filters
  const filteredEmployees = allEmployees.filter(employee => {
    const matchesSearch = !searchTerm || 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = !departmentFilter || employee.department === departmentFilter;
    const matchesStatus = !statusFilter || employee.status === statusFilter;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const refreshEmployees = () => {
    fetchEmployees();
  };

  // Derive departments and statuses from employee data
  const departments = Array.from(new Set(allEmployees.map(emp => emp.department).filter(Boolean)));
  const statuses = Array.from(new Set(allEmployees.map(emp => emp.status).filter(Boolean)));

  return {
    employees: filteredEmployees,
    allEmployees,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    departmentFilter,
    setDepartmentFilter,
    statusFilter,
    setStatusFilter,
    refreshEmployees,
    departments,
    statuses,
    addEmployee: async (employeeData: Omit<Employee, 'id'>) => {
      try {
        console.log('➕ Adding new employee:', employeeData.email);

        // Create the main employee record using direct table insertion
        const { data: newEmployee, error: employeeError } = await supabase
          .from('employees')
          .insert({
            name: employeeData.name,
            email: employeeData.email,
            phone: employeeData.phone,
            department: employeeData.department,
            role: employeeData.role,
            status: employeeData.status || 'Active',
            join_date: employeeData.joinDate,
            address: employeeData.address,
            date_of_birth: employeeData.dateOfBirth,
            profile_picture_url: employeeData.profilePictureUrl,
            manager: employeeData.manager,
            base_salary: employeeData.baseSalary,
            login_access: employeeData.loginCredentials?.isActive,
            login_email: employeeData.loginCredentials?.loginEmail,
            login_password: employeeData.loginCredentials?.password
          })
          .select()
          .single();

        if (employeeError) {
          console.error('❌ Error creating employee:', employeeError);
          throw employeeError;
        }

        // Refresh employees list
        await fetchEmployees();
        
      } catch (error: any) {
        console.error('💥 Error adding employee:', error);
        setError(error.message || 'Failed to add employee');
      }
    },
    updateEmployee: async (employeeId: string, updates: Partial<Employee>) => {
      try {
        console.log('✏️ Updating employee:', employeeId);

        // Update the main employee record
        const { error: employeeError } = await supabase
          .from('employees')
          .update({
            name: updates.name,
            email: updates.email,
            phone: updates.phone,
            department: updates.department,
            role: updates.role,
            status: updates.status,
            join_date: updates.joinDate,
            address: updates.address,
            date_of_birth: updates.dateOfBirth,
            profile_picture_url: updates.profilePictureUrl,
            manager: updates.manager,
            base_salary: updates.baseSalary,
            login_access: updates.loginCredentials?.isActive,
            login_email: updates.loginCredentials?.loginEmail,
            login_password: updates.loginCredentials?.password
          })
          .eq('employee_id', employeeId);

        if (employeeError) {
          console.error('❌ Error updating employee:', employeeError);
          throw employeeError;
        }

        // Refresh employees list
        await fetchEmployees();
        
      } catch (error: any) {
        console.error('💥 Error updating employee:', error);
        setError(error.message || 'Failed to update employee');
      }
    },
    deleteEmployee: async (employeeId: string) => {
      try {
        console.log('🗑️ Deleting employee:', employeeId);

        // Delete the employee (cascade will handle related records)
        const { error: deleteError } = await supabase
          .from('employees')
          .delete()
          .eq('employee_id', employeeId);

        if (deleteError) {
          console.error('❌ Error deleting employee:', deleteError);
          throw deleteError;
        }

        // Refresh employees list
        await fetchEmployees();
        
      } catch (error: any) {
        console.error('💥 Error deleting employee:', error);
        setError(error.message || 'Failed to delete employee');
      }
    }
  };
};
