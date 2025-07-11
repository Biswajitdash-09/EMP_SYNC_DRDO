
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, Edit, Trash2, Key } from 'lucide-react';
import { Employee } from '@/hooks/useEmployeeData';

interface EmployeeTableProps {
  employees: Employee[];
  selectedEmployee: Employee | null;
  onSelectEmployee: (employee: Employee) => void;
  onViewEmployee: (employee: Employee) => void;
  onEditEmployee: (employee: Employee) => void;
  onDeleteEmployee: (employeeId: string) => void;
}

const EmployeeTable = ({
  employees,
  selectedEmployee,
  onSelectEmployee,
  onViewEmployee,
  onEditEmployee,
  onDeleteEmployee
}: EmployeeTableProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Probation': return 'bg-yellow-100 text-yellow-800';
      case 'Terminated': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDeleteEmployee = (employeeId: string) => {
    if (confirm('Are you sure you want to delete this employee? This action cannot be undone.')) {
      onDeleteEmployee(employeeId);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Login Access</TableHead>
            <TableHead>Join Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow 
              key={employee.id}
              className={`cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 ${
                selectedEmployee?.id === employee.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
              }`}
              onClick={() => onSelectEmployee(employee)}
            >
              <TableCell className="font-medium">{employee.id}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={employee.profilePictureUrl} alt={employee.name} />
                    <AvatarFallback>{getInitials(employee.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{employee.name}</div>
                    <div className="text-sm text-gray-500">{employee.email}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{employee.department}</TableCell>
              <TableCell>{employee.position}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(employee.status)}>
                  {employee.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  {employee.loginCredentials?.isActive ? (
                    <div className="flex items-center space-x-1 text-green-600">
                      <Key className="w-4 h-4" />
                      <span className="text-sm">Active</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1 text-red-600">
                      <Key className="w-4 h-4 opacity-50" />
                      <span className="text-sm">Disabled</span>
                    </div>
                  )}
                  {employee.loginCredentials?.loginEmail && (
                    <div className="text-xs text-gray-500">
                      {employee.loginCredentials.loginEmail}
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>{employee.joinDate ? new Date(employee.joinDate).toLocaleDateString() : 'N/A'}</TableCell>
              <TableCell>
                <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onViewEmployee(employee)}
                    title="View Details"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onEditEmployee(employee)}
                    title="Edit Employee"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDeleteEmployee(employee.id)}
                    className="text-red-600 hover:text-red-700"
                    title="Delete Employee"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {employees.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No employees found matching your criteria.
        </div>
      )}
    </div>
  );
};

export default EmployeeTable;
