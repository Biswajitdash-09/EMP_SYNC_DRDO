
/**
 * Employee Overview Tab Component
 * Contains the search, filters, and employee table
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';
import { Employee } from '@/hooks/useEmployeeData';
import EmployeeFilters from './EmployeeFilters';
import EmployeeTable from './EmployeeTable';

interface EmployeeOverviewTabProps {
  employees: Employee[];
  selectedEmployee: Employee | null;
  onSelectEmployee: (employee: Employee) => void;
  onViewEmployee: (employee: Employee) => void;
  onEditEmployee: (employee: Employee) => void;
  onDeleteEmployee: (employeeId: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  departmentFilter: string;
  setDepartmentFilter: (filter: string) => void;
  statusFilter: string;
  setStatusFilter: (filter: string) => void;
  departments: string[];
  statuses: string[];
}

const EmployeeOverviewTab = ({
  employees,
  selectedEmployee,
  onSelectEmployee,
  onViewEmployee,
  onEditEmployee,
  onDeleteEmployee,
  searchTerm,
  setSearchTerm,
  departmentFilter,
  setDepartmentFilter,
  statusFilter,
  setStatusFilter,
  departments,
  statuses
}: EmployeeOverviewTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Employee Directory</CardTitle>
        <CardDescription>Manage and view all employee records ({employees.length} employees)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search employees by name, email, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <EmployeeFilters
          departmentFilter={departmentFilter}
          setDepartmentFilter={setDepartmentFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          departments={departments}
          statuses={statuses}
        />

        <EmployeeTable
          employees={employees}
          selectedEmployee={selectedEmployee}
          onSelectEmployee={onSelectEmployee}
          onViewEmployee={onViewEmployee}
          onEditEmployee={onEditEmployee}
          onDeleteEmployee={onDeleteEmployee}
        />
      </CardContent>
    </Card>
  );
};

export default EmployeeOverviewTab;
