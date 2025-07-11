
/**
 * Employee data fetching hook
 * Handles retrieving employee data from Supabase with proper transformations
 */

import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Employee } from '@/hooks/useEmployeeData';
import { useToast } from '@/hooks/use-toast';

export const useEmployeeFetch = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchEmployees = async () => {
    try {
      console.log('📊 Fetching employees from database...');
      setLoading(true);
      
      // Get all employees with related data
      const { data: employeesData, error: employeesError } = await supabase
        .from('employees')
        .select(`
          *,
          employee_emergency_contacts(*),
          employee_employment_history(*),
          employee_documents(*)
        `)
        .order('created_at', { ascending: false });

      if (employeesError) {
        console.error('❌ Error fetching employees:', employeesError);
        throw employeesError;
      }

      console.log('✅ Fetched employees:', employeesData?.length || 0);

      // Transform Supabase data to Employee format
      const transformedEmployees: Employee[] = (employeesData || []).map(emp => {
        const emergencyContact = emp.employee_emergency_contacts?.[0] || {
          name: '',
          phone: '',
          relationship: ''
        };

        const currentHistory = emp.employee_employment_history?.filter(h => h.current) || [];
        const allHistory = emp.employee_employment_history?.map(h => ({
          title: h.title,
          department: h.department,
          startDate: h.start_date,
          endDate: h.end_date || undefined,
          current: h.current
        })) || [];

        const documents = emp.employee_documents?.map(doc => ({
          id: doc.document_id,
          name: doc.name,
          type: doc.type,
          size: doc.size,
          uploadDate: doc.upload_date
        })) || [];

        return {
          id: emp.employee_id,
          name: emp.name,
          email: emp.email,
          phone: emp.phone || '',
          department: emp.department,
          position: emp.role, // Add position property
          role: emp.role,
          status: emp.status as 'Active' | 'Probation' | 'Terminated',
          joinDate: emp.join_date,
          address: emp.address || '',
          dateOfBirth: emp.date_of_birth || '',
          profilePictureUrl: emp.profile_picture_url,
          emergencyContact,
          manager: emp.manager || '',
          baseSalary: Number(emp.base_salary) || 0,
          loginCredentials: {
            loginEmail: emp.login_email || '',
            password: emp.login_password || '',
            isActive: emp.login_access || false
          },
          employmentHistory: allHistory,
          documents
        };
      });

      setEmployees(transformedEmployees);
      console.log('✅ Transformed employees:', transformedEmployees.length);
    } catch (error) {
      console.error('💥 Error fetching employees:', error);
      toast({
        title: "Error",
        description: "Failed to fetch employees from database",
        variant: "destructive",
      });
      
      // Set empty array on error to prevent app crash
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    employees,
    loading,
    fetchEmployees,
    setEmployees
  };
};
