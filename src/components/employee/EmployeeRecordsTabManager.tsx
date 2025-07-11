
/**
 * Employee Records Tab Manager Component
 * Manages tab state and content rendering
 */

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Employee } from '@/hooks/useEmployeeData';
import EmployeeOverviewTab from './EmployeeOverviewTab';
import PersonalDetailsTab from './PersonalDetailsTab';
import EmploymentHistoryTab from './EmploymentHistoryTab';
import DocumentsTab from './DocumentsTab';
import LoginCredentialsTab from './LoginCredentialsTab';

interface EmployeeRecordsTabManagerProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  employees: Employee[];
  selectedEmployee: Employee | null;
  onSelectEmployee: (employee: Employee) => void;
  onViewEmployee: (employee: Employee) => void;
  onEditEmployee: (employee: Employee) => void;
  onDeleteEmployee: (employeeId: string) => void;
  onUpdateCredentials: (employeeId: string, credentials: { loginEmail: string; password: string; isActive: boolean }) => void;
  onDocumentUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  departmentFilter: string;
  setDepartmentFilter: (filter: string) => void;
  statusFilter: string;
  setStatusFilter: (filter: string) => void;
  departments: string[];
  statuses: string[];
}

const EmployeeRecordsTabManager = ({
  activeTab,
  setActiveTab,
  employees,
  selectedEmployee,
  onSelectEmployee,
  onViewEmployee,
  onEditEmployee,
  onDeleteEmployee,
  onUpdateCredentials,
  onDocumentUpload,
  searchTerm,
  setSearchTerm,
  departmentFilter,
  setDepartmentFilter,
  statusFilter,
  setStatusFilter,
  departments,
  statuses
}: EmployeeRecordsTabManagerProps) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="personal">Personal Details</TabsTrigger>
        <TabsTrigger value="employment">Employment History</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
        <TabsTrigger value="credentials">Login Credentials</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6">
        <EmployeeOverviewTab
          employees={employees}
          selectedEmployee={selectedEmployee}
          onSelectEmployee={onSelectEmployee}
          onViewEmployee={onViewEmployee}
          onEditEmployee={onEditEmployee}
          onDeleteEmployee={onDeleteEmployee}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          departmentFilter={departmentFilter}
          setDepartmentFilter={setDepartmentFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          departments={departments}
          statuses={statuses}
        />
      </TabsContent>

      <TabsContent value="personal" className="space-y-6">
        <PersonalDetailsTab selectedEmployee={selectedEmployee} />
      </TabsContent>

      <TabsContent value="employment" className="space-y-6">
        <EmploymentHistoryTab selectedEmployee={selectedEmployee} />
      </TabsContent>

      <TabsContent value="documents" className="space-y-6">
        <DocumentsTab 
          selectedEmployee={selectedEmployee}
          onDocumentUpload={onDocumentUpload}
        />
      </TabsContent>

      <TabsContent value="credentials" className="space-y-6">
        <LoginCredentialsTab 
          selectedEmployee={selectedEmployee}
          onUpdateCredentials={onUpdateCredentials}
        />
      </TabsContent>
    </Tabs>
  );
};

export default EmployeeRecordsTabManager;
