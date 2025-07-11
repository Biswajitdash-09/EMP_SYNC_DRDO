
/**
 * Employee Dashboard Container (Refactored)
 * Main container component for the employee dashboard with proper type handling
 */

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useEmployeeDashboard } from './hooks/useEmployeeDashboard';
import DashboardHeader from './components/DashboardHeader';
import DashboardStats from './components/DashboardStats';
import { AccessDeniedError, EmployeeNotFoundError } from './components/ErrorStates';
import EmployeeProfileView from './EmployeeProfileView';
import EmployeeLeaveApplication from './EmployeeLeaveApplication';
import DocumentsSection from './components/DocumentsSection';

const EmployeeDashboardContainer = () => {
  const { loading, employee, error } = useEmployeeDashboard();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error === 'access_denied') {
    return <AccessDeniedError />;
  }

  if (error === 'employee_not_found' || !employee) {
    return <EmployeeNotFoundError />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader employeeName={employee.name} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardStats employee={employee} />

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">My Profile</TabsTrigger>
            <TabsTrigger value="leave">Leave Requests</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <EmployeeProfileView employee={employee} />
          </TabsContent>

          <TabsContent value="leave" className="space-y-6">
            <EmployeeLeaveApplication employee={employee} />
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <DocumentsSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EmployeeDashboardContainer;
