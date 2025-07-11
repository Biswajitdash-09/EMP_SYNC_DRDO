
/**
 * Employee Validation Utilities
 * Handles validation logic for employee forms and data
 */

import { Employee } from '@/types/employee';

export interface EmployeeFormData {
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  position: string;
  startDate: string;
  phone: string;
  address: string;
  baseSalary: string;
  loginEmail: string;
  loginPassword: string;
  isLoginActive: boolean;
}

/**
 * Validate required employee form fields
 */
export const validateRequiredFields = (employeeForm: EmployeeFormData): boolean => {
  return !!(
    employeeForm.firstName?.trim() && 
    employeeForm.lastName?.trim() && 
    employeeForm.email?.trim() && 
    employeeForm.department &&
    employeeForm.loginEmail?.trim() &&
    employeeForm.loginPassword?.trim()
  );
};

/**
 * Validate email format
 */
export const validateEmailFormat = (email: string): boolean => {
  if (!email?.trim()) return true; // Don't show error for empty email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Check for duplicate email in employee list
 */
export const checkDuplicateEmail = (email: string, employees: Employee[]): boolean => {
  if (!email?.trim()) return false;
  return employees.some(emp => 
    emp.email.toLowerCase() === email.toLowerCase()
  );
};

/**
 * Check for duplicate login email in employee list
 */
export const checkDuplicateLoginEmail = (loginEmail: string, employees: Employee[]): boolean => {
  if (!loginEmail?.trim()) return false;
  return employees.some(emp => 
    emp.loginCredentials?.loginEmail.toLowerCase() === loginEmail.toLowerCase()
  );
};

/**
 * Create new employee object from form data
 */
export const createEmployeeFromForm = (employeeForm: EmployeeFormData): Omit<Employee, 'id'> => {
  const currentDate = new Date().toISOString().split('T')[0];
  const joinDate = employeeForm.startDate || currentDate;
  const fullName = `${employeeForm.firstName.trim()} ${employeeForm.lastName.trim()}`;
  
  return {
    name: fullName,
    email: employeeForm.email.trim(),
    phone: employeeForm.phone?.trim() || `+1 ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
    department: employeeForm.department,
    position: employeeForm.position?.trim() || 'Employee',
    role: employeeForm.position?.trim() || 'Employee',
    status: 'Active',
    joinDate: joinDate,
    address: employeeForm.address?.trim() || 'Address not provided',
    dateOfBirth: '1990-01-01',
    profilePictureUrl: undefined,
    emergencyContact: {
      name: 'Not specified',
      phone: 'Not specified',
      relationship: 'Not specified'
    },
    manager: 'Not assigned',
    baseSalary: parseInt(employeeForm.baseSalary) || 50000,
    // Add required login credentials with form values
    loginCredentials: {
      loginEmail: employeeForm.loginEmail.trim(),
      password: employeeForm.loginPassword,
      isActive: employeeForm.isLoginActive
    },
    employmentHistory: [{
      title: employeeForm.position?.trim() || 'Employee',
      department: employeeForm.department,
      startDate: joinDate,
      current: true
    }],
    documents: []
  };
};
