
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LeaveType } from '@/hooks/useLeaveData';

interface Employee {
  id: string;
  name: string;
}

interface LeaveRequestFiltersProps {
  statusFilter: string;
  typeFilter: string;
  employeeFilter: string;
  setStatusFilter: (value: string) => void;
  setTypeFilter: (value: string) => void;
  setEmployeeFilter: (value: string) => void;
  leaveTypes: LeaveType[];
  employees: Employee[];
}

const LeaveRequestFilters = ({
  statusFilter,
  typeFilter,
  employeeFilter,
  setStatusFilter,
  setTypeFilter,
  setEmployeeFilter,
  leaveTypes,
  employees
}: LeaveRequestFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-4 pt-4">
      <div className="flex items-center space-x-2">
        <Label>Status:</Label>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Approved">Approved</SelectItem>
            <SelectItem value="Rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-center space-x-2">
        <Label>Type:</Label>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {leaveTypes.map(type => (
              <SelectItem key={type.id} value={type.name}>{type.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-center space-x-2">
        <Label>Employee:</Label>
        <Select value={employeeFilter} onValueChange={setEmployeeFilter}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {employees.map(emp => (
              <SelectItem key={emp.id} value={emp.name}>{emp.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default LeaveRequestFilters;
