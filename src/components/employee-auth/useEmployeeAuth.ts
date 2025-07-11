
/**
 * Employee Authentication Hook
 * Handles authentication logic and state management
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { authenticateEmployee, storeEmployeeAuth } from '@/services/employeeAuthService';

export const useEmployeeAuth = (onClose: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    console.log('🚀 Starting login process with:', {
      email: formData.email,
      password: formData.password ? '***' : 'empty'
    });

    try {
      // Trim whitespace from inputs
      const email = formData.email.trim();
      const password = formData.password.trim();
      
      if (!email || !password) {
        toast({
          title: "Validation Error",
          description: "Please enter both email and password.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Validate credentials against employee records
      const authData = authenticateEmployee(email, password);
      
      if (authData) {
        console.log('✅ Login successful, storing auth data');
        // Store authentication data
        storeEmployeeAuth(authData);

        // Reset form first
        setFormData({ email: '', password: '' });
        
        // Close modal
        onClose();

        // Show success message
        toast({
          title: "Login Successful",
          description: `Welcome ${authData.employee.name}! Redirecting to your dashboard...`,
        });

        // Navigate after a short delay to ensure the toast is visible
        setTimeout(() => {
          navigate('/employee-dashboard');
        }, 1500);
      } else {
        console.log('❌ Login failed - invalid credentials');
        toast({
          title: "Invalid Credentials",
          description: "The email or password you entered is incorrect. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('💥 Login error:', error);
      toast({
        title: "Login Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fillCredentials = (email: string, password: string) => {
    setFormData({ email, password });
    toast({
      title: "Credentials Filled",
      description: "You can now click Sign In to login.",
    });
  };

  const resetForm = () => {
    setFormData({ email: '', password: '' });
  };

  return {
    isLoading,
    formData,
    setFormData,
    handleLogin,
    fillCredentials,
    resetForm
  };
};
