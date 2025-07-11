
/**
 * Employee Dashboard Tabs Component
 * Handles the main tab navigation and content rendering
 */

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Calendar, DollarSign, Clock, Target, FileText, HeadphonesIcon, MessageSquare, Bell } from 'lucide-react';
import EmployeeProfileView from '@/components/employee-dashboard/EmployeeProfileView';
import EmployeeLeaveApplication from '@/components/employee-dashboard/EmployeeLeaveApplication';
import EmployeeSalaryDetails from '@/components/employee-dashboard/EmployeeSalaryDetails';
import EditEmployeeProfile from '@/components/employee-dashboard/components/EditEmployeeProfile';
import AttendanceTracking from '@/components/employee-dashboard/components/AttendanceTracking';
import EnhancedLeaveHistory from '@/components/employee-dashboard/components/EnhancedLeaveHistory';
import PerformanceOverview from '@/components/employee-dashboard/components/PerformanceOverview';
import DocumentsSection from '@/components/employee-dashboard/components/DocumentsSection';
import NotificationsSystem from '@/components/employee-dashboard/components/NotificationsSystem';
import SupportTicketing from '@/components/employee-dashboard/components/SupportTicketing';
import FeedbackSystem from '@/components/employee-dashboard/components/FeedbackSystem';
import { DashboardEmployee } from './hooks/useEmployeeDashboard';

interface EmployeeDashboardTabsProps {
  employee: DashboardEmployee;
  activeTab: string;
  onTabChange: (tab: string) => void;  
}

const EmployeeDashboardTabs = ({
  employee,
  activeTab,
  onTabChange
}: EmployeeDashboardTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="space-y-6">
      <TabsList className="grid w-full grid-cols-9 h-auto p-1">
        <TabsTrigger value="profile" className="flex flex-col items-center space-y-1 p-2">
          <User className="w-4 h-4" />
          <span className="text-xs">Profile</span>
        </TabsTrigger>
        <TabsTrigger value="attendance" className="flex flex-col items-center space-y-1 p-2">
          <Clock className="w-4 h-4" />
          <span className="text-xs">Attendance</span>
        </TabsTrigger>
        <TabsTrigger value="leave" className="flex flex-col items-center space-y-1 p-2">
          <Calendar className="w-4 h-4" />
          <span className="text-xs">Leave</span>
        </TabsTrigger>
        <TabsTrigger value="performance" className="flex flex-col items-center space-y-1 p-2">
          <Target className="w-4 h-4" />
          <span className="text-xs">Performance</span>
        </TabsTrigger>
        <TabsTrigger value="salary" className="flex flex-col items-center space-y-1 p-2">
          <DollarSign className="w-4 h-4" />
          <span className="text-xs">Salary</span>
        </TabsTrigger>
        <TabsTrigger value="documents" className="flex flex-col items-center space-y-1 p-2">
          <FileText className="w-4 h-4" />
          <span className="text-xs">Documents</span>
        </TabsTrigger>
        <TabsTrigger value="notifications" className="flex flex-col items-center space-y-1 p-2">
          <Bell className="w-4 h-4" />
          <span className="text-xs">Notifications</span>
        </TabsTrigger>
        <TabsTrigger value="support" className="flex flex-col items-center space-y-1 p-2">
          <HeadphonesIcon className="w-4 h-4" />
          <span className="text-xs">Support</span>
        </TabsTrigger>
        <TabsTrigger value="feedback" className="flex flex-col items-center space-y-1 p-2">
          <MessageSquare className="w-4 h-4" />
          <span className="text-xs">Feedback</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="profile" className="space-y-6">
        <EditEmployeeProfile 
          employee={employee} 
        />
        <EmployeeProfileView employee={employee} />
      </TabsContent>

      <TabsContent value="attendance" className="space-y-6">
        <AttendanceTracking employeeId={employee.id} />
      </TabsContent>

      <TabsContent value="leave" className="space-y-6">
        <EmployeeLeaveApplication employee={employee} />
        <EnhancedLeaveHistory employeeId={employee.id} />
      </TabsContent>

      <TabsContent value="performance" className="space-y-6">
        <PerformanceOverview />
      </TabsContent>

      <TabsContent value="salary" className="space-y-6">
        <EmployeeSalaryDetails employee={employee} />
      </TabsContent>

      <TabsContent value="documents" className="space-y-6">
        <DocumentsSection />
      </TabsContent>

      <TabsContent value="notifications" className="space-y-6">
        <NotificationsSystem />
      </TabsContent>

      <TabsContent value="support" className="space-y-6">
        <SupportTicketing />
      </TabsContent>

      <TabsContent value="feedback" className="space-y-6">
        <FeedbackSystem />
      </TabsContent>
    </Tabs>
  );
};

export default EmployeeDashboardTabs;
