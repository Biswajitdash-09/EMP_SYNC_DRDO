
/**
 * Employee Authentication Context
 * Provides employee authentication state throughout the app
 * Enhanced with better error handling and data validation
 */

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Employee } from '@/types/employee';
import { validateEmployeeSession, EmployeeAuthData, clearEmployeeAuth } from '@/services/employeeAuthService';

interface EmployeeAuthContextType {
  employee: Employee | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => void;
  refreshEmployeeData: () => Promise<void>;
  error: string | null;
}

const EmployeeAuthContext = createContext<EmployeeAuthContextType | undefined>(undefined);

interface EmployeeAuthProviderProps {
  children: ReactNode;
}

export const EmployeeAuthProvider = ({ children }: EmployeeAuthProviderProps) => {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshEmployeeData = useCallback(async (): Promise<void> => {
    try {
      setError(null);
      const authData = validateEmployeeSession();
      
      if (authData) {
        // Validate employee data integrity
        if (!authData.employee || !authData.employee.id || !authData.employee.name) {
          throw new Error('Invalid employee data structure');
        }
        
        console.log('✅ Employee data refreshed successfully:', authData.employee.name);
        setEmployee(authData.employee);
      } else {
        console.log('❌ No valid session found, clearing employee data');
        setEmployee(null);
      }
    } catch (error) {
      console.error('❌ Error refreshing employee data:', error);
      setError(error instanceof Error ? error.message : 'Failed to refresh employee data');
      setEmployee(null);
      // Clear potentially corrupted session
      clearEmployeeAuth();
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      console.log('🔄 Initializing employee authentication...');
      await refreshEmployeeData();
    };

    initializeAuth();
  }, [refreshEmployeeData]);

  const logout = useCallback(() => {
    try {
      console.log('🚪 Logging out employee...');
      clearEmployeeAuth();
      setEmployee(null);
      setError(null);
    } catch (error) {
      console.error('❌ Error during logout:', error);
      setError('Failed to logout properly. Please clear your browser cache.');
    }
  }, []);

  const value = {
    employee,
    isAuthenticated: !!employee,
    isLoading,
    logout,
    refreshEmployeeData,
    error
  };

  return (
    <EmployeeAuthContext.Provider value={value}>
      {children}
    </EmployeeAuthContext.Provider>
  );
};

export const useEmployeeAuth = () => {
  const context = useContext(EmployeeAuthContext);
  if (context === undefined) {
    throw new Error('useEmployeeAuth must be used within an EmployeeAuthProvider');
  }
  return context;
};
