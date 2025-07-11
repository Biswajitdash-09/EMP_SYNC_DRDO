
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useEmployeeData } from '@/hooks/useEmployeeData';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export interface DashboardEmployee {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  role: string;
  status: 'Active' | 'Probation' | 'Terminated';
  joinDate: string;
  phone: string;
  profilePictureUrl?: string;
  manager: string;
  address: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  baseSalary: number;
  leaveBalance: {
    annual: number;
    sick: number;
    personal: number;
  };
  salary: {
    basic: number;
    allowances: number;
    deductions: number;
    netSalary: number;
  };
}

export const useEmployeeDashboard = () => {
  const { user, profile, loading: authLoading } = useAuth();
  const { allEmployees, loading: employeeLoading } = useEmployeeData();

  const loading = authLoading || employeeLoading;

  if (loading) {
    return { loading: true, employee: null, error: null };
  }

  if (!user || !profile) {
    return { loading: false, employee: null, error: 'access_denied' };
  }

  // Find current employee data and transform it for dashboard compatibility
  const currentEmployee = allEmployees.find(emp => emp.email === user.email);
  
  if (!currentEmployee) {
    return { loading: false, employee: null, error: 'employee_not_found' };
  }

  // Transform employee data to dashboard format with all required fields
  const dashboardEmployee: DashboardEmployee = {
    id: currentEmployee.id,
    name: currentEmployee.name,
    email: currentEmployee.email,
    department: currentEmployee.department,
    position: currentEmployee.position,
    role: currentEmployee.role,
    status: currentEmployee.status as 'Active' | 'Probation' | 'Terminated',
    joinDate: currentEmployee.joinDate,
    phone: currentEmployee.phone,
    profilePictureUrl: currentEmployee.profilePictureUrl,
    manager: currentEmployee.manager || 'Not assigned',
    address: currentEmployee.address || 'Not provided',
    emergencyContact: {
      name: currentEmployee.emergencyContact?.name || 'Not provided',
      phone: currentEmployee.emergencyContact?.phone || 'Not provided',
      relationship: currentEmployee.emergencyContact?.relationship || 'Not specified'
    },
    baseSalary: currentEmployee.baseSalary || 0,
    leaveBalance: {
      annual: 20, // Default values - should be fetched from leave_balances table
      sick: 10,
      personal: 5
    },
    salary: {
      basic: currentEmployee.baseSalary || 0,
      allowances: Math.round((currentEmployee.baseSalary || 0) * 0.2),
      deductions: Math.round((currentEmployee.baseSalary || 0) * 0.1),
      netSalary: Math.round((currentEmployee.baseSalary || 0) * 1.1)
    }
  };

  return { loading: false, employee: dashboardEmployee, error: null };
};
