
/**
 * Employee Dashboard Page
 * Main entry point for the employee dashboard - now uses real Supabase authentication
 */

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";
import EmployeeDashboardLoading from '@/components/employee-dashboard/EmployeeDashboardLoading';
import EmployeeDashboardContent from '@/components/employee-dashboard/EmployeeDashboardContent';

const EmployeeDashboard = () => {
  const { user, profile, signOut } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('profile');
  const [employeeDetails, setEmployeeDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && profile) {
      fetchEmployeeDetails();
    }
  }, [user, profile]);

  const fetchEmployeeDetails = async () => {
    try {
      const { data, error } = await supabase
        .from('employee_details')
        .select('*')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching employee details:', error);
        return;
      }

      setEmployeeDetails(data);
    } catch (error) {
      console.error('Error fetching employee details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      });
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Logout Error",
        description: "There was an issue logging you out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleProfileUpdate = async (updates: any) => {
    if (!user) return;
    
    try {
      // Update profile
      const { error: profileError } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (profileError) throw profileError;

      // Update employee details if provided
      if (updates.employee_details) {
        const { error: detailsError } = await supabase
          .from('employee_details')
          .upsert({
            user_id: user.id,
            ...updates.employee_details
          });

        if (detailsError) throw detailsError;
      }

      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });

      // Refresh data
      await fetchEmployeeDetails();
    } catch (error) {
      console.error('Profile update error:', error);
      toast({
        title: "Update Error",
        description: "Failed to update your profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  if (loading) {
    return <EmployeeDashboardLoading />;
  }

  if (!user || !profile) {
    return null;
  }

  // Transform data for the existing dashboard component
  const employee = {
    id: profile.id,
    name: profile.full_name || profile.email,
    email: profile.email,
    phone: profile.phone || '',
    department: profile.department || '',
    role: profile.position || 'Employee',
    joinDate: employeeDetails?.hire_date || new Date().toISOString().split('T')[0],
    profilePicture: profile.avatar_url,
    manager: 'Not assigned',
    address: employeeDetails?.address || '',
    emergencyContact: {
      name: employeeDetails?.emergency_contact_name || '',
      phone: employeeDetails?.emergency_contact_phone || '',
      relationship: 'Not specified'
    },
    baseSalary: employeeDetails?.salary || 0,
    status: profile.is_active ? 'Active' : 'Inactive' as 'Active' | 'Probation' | 'Terminated'
  };

  return (
    <EmployeeDashboardContent
      employee={employee}
      activeTab={activeTab}
      onTabChange={handleTabChange}
      onLogout={handleLogout}
      onProfileUpdate={handleProfileUpdate}
    />
  );
};

export default EmployeeDashboard;
