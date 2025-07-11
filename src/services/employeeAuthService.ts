
/**
 * Employee Authentication Service
 * Handles employee login validation and data retrieval
 * Syncs with the main employee records from admin portal
 */

import { Employee } from '@/types/employee';
import { getAllEmployeesWithUpdates } from './employeeProfileService';

export interface EmployeeAuthData {
  employee: Employee;
  loginTime: string;
  role: 'employee';
}

/**
 * Get all employees with applied profile updates
 */
const getAllEmployees = (): Employee[] => {
  return getAllEmployeesWithUpdates();
};

/**
 * Authenticate employee using login credentials
 * Returns employee data if credentials are valid
 */
export const authenticateEmployee = (email: string, password: string): EmployeeAuthData | null => {
  console.log('🔐 Starting authentication for:', email);
  
  const employees = getAllEmployees();
  console.log('📊 Total employees loaded:', employees.length);
  
  // Filter active employees with login credentials first
  const activeEmployees = employees.filter(emp => 
    emp.status === 'Active' && 
    emp.loginCredentials?.isActive === true &&
    emp.loginCredentials?.loginEmail &&
    emp.loginCredentials?.password
  );
  
  console.log('✅ Active employees with credentials:', activeEmployees.length);
  console.log('🔐 Authenticating against unique employee passwords...');
  
  // Find matching employee
  const employee = activeEmployees.find(emp => {
    const emailMatch = emp.loginCredentials!.loginEmail.toLowerCase().trim() === email.toLowerCase().trim();
    const passwordMatch = emp.loginCredentials!.password === password;
    
    if (emailMatch) {
      console.log(`🔍 Found matching email for ${emp.name}:`, {
        storedEmail: emp.loginCredentials!.loginEmail,
        providedEmail: email,
        passwordMatch: passwordMatch ? '✅' : '❌',
        status: emp.status,
        isActive: emp.loginCredentials!.isActive
      });
    }
    
    return emailMatch && passwordMatch;
  });

  if (employee) {
    console.log('✅ Authentication successful for:', employee.name);
    return {
      employee,
      loginTime: new Date().toISOString(),
      role: 'employee'
    };
  }
  
  console.log('❌ Authentication failed for:', email);
  console.log('💡 Available sample credentials (first 3 employees):');
  activeEmployees.slice(0, 3).forEach(emp => {
    console.log(`   - ${emp.loginCredentials?.loginEmail} / ${emp.loginCredentials?.password}`);
  });
  
  return null;
};

/**
 * Get employee data by ID (for refreshing data)
 */
export const getEmployeeById = (employeeId: string): Employee | null => {
  const employees = getAllEmployees();
  return employees.find(emp => emp.id === employeeId) || null;
};

/**
 * Check if employee session is valid
 */
export const validateEmployeeSession = (): EmployeeAuthData | null => {
  try {
    const authData = localStorage.getItem('employee-auth');
    if (!authData) return null;

    const parsed = JSON.parse(authData) as EmployeeAuthData;
    
    // Refresh employee data to ensure it's in sync with admin portal
    const currentEmployee = getEmployeeById(parsed.employee.id);
    if (!currentEmployee || !currentEmployee.loginCredentials?.isActive) {
      // Employee no longer exists or is inactive, clear session
      localStorage.removeItem('employee-auth');
      return null;
    }

    // Return updated employee data
    return {
      ...parsed,
      employee: currentEmployee
    };
  } catch (error) {
    console.error('Error validating employee session:', error);
    localStorage.removeItem('employee-auth');
    return null;
  }
};

/**
 * Store employee authentication data
 */
export const storeEmployeeAuth = (authData: EmployeeAuthData): void => {
  localStorage.setItem('employee-auth', JSON.stringify(authData));
};

/**
 * Clear employee authentication data
 */
export const clearEmployeeAuth = (): void => {
  localStorage.removeItem('employee-auth');
};
