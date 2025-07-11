
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from 'lucide-react';

interface EmployeeFiltersProps {
  departmentFilter: string;
  setDepartmentFilter: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  departments: string[];
  statuses: string[];
}

const EmployeeFilters = ({
  departmentFilter,
  setDepartmentFilter,
  statusFilter,
  setStatusFilter,
  departments,
  statuses
}: EmployeeFiltersProps) => {
  const hasActiveFilters = departmentFilter && departmentFilter !== 'all' || statusFilter && statusFilter !== 'all';

  const clearAllFilters = () => {
    setDepartmentFilter('all');
    setStatusFilter('all');
  };

  const handleDepartmentChange = (value: string) => {
    setDepartmentFilter(value === 'all' ? '' : value);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value === 'all' ? '' : value);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      <div className="flex flex-wrap gap-2">
        <Select value={departmentFilter || 'all'} onValueChange={handleDepartmentChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {departments.map(dept => (
              <SelectItem key={dept} value={dept}>{dept}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={statusFilter || 'all'} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {statuses.map(status => (
              <SelectItem key={status} value={status}>{status}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {hasActiveFilters && (
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {departmentFilter && departmentFilter !== 'all' && (
              <Badge variant="secondary" className="gap-1">
                {departmentFilter}
                <X 
                  className="w-3 h-3 cursor-pointer" 
                  onClick={() => setDepartmentFilter('')}
                />
              </Badge>
            )}
            {statusFilter && statusFilter !== 'all' && (
              <Badge variant="secondary" className="gap-1">
                {statusFilter}
                <X 
                  className="w-3 h-3 cursor-pointer" 
                  onClick={() => setStatusFilter('')}
                />
              </Badge>
            )}
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearAllFilters}
            className="text-sm"
          >
            Clear All
          </Button>
        </div>
      )}
    </div>
  );
};

export default EmployeeFilters;
