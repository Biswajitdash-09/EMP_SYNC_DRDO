
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase } from 'lucide-react';
import { Employee } from '@/hooks/useEmployeeData';

interface EmploymentHistoryTabProps {
  selectedEmployee: Employee | null;
}

const EmploymentHistoryTab = ({ selectedEmployee }: EmploymentHistoryTabProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Probation': return 'bg-yellow-100 text-yellow-800';
      case 'Terminated': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="w-5 h-5" />
          Employment History & Job Details
          {selectedEmployee && (
            <span className="text-sm font-normal text-gray-500">
              - {selectedEmployee.name}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {selectedEmployee ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><strong>Current Job Title:</strong> {selectedEmployee.position}</div>
              <div><strong>Department:</strong> {selectedEmployee.department}</div>
              <div><strong>Reporting Manager:</strong> {selectedEmployee.manager}</div>
              <div><strong>Join Date:</strong> {selectedEmployee.joinDate ? new Date(selectedEmployee.joinDate).toLocaleDateString() : 'N/A'}</div>
              <div><strong>Base Salary:</strong> ${selectedEmployee.baseSalary?.toLocaleString() || 'N/A'}</div>
              <div><strong>Status:</strong> 
                <Badge className={`ml-2 ${getStatusColor(selectedEmployee.status)}`}>
                  {selectedEmployee.status}
                </Badge>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Employment History</h4>
              <div className="space-y-3">
                {selectedEmployee.employmentHistory.map((job, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-medium">{job.title}</h5>
                        <p className="text-sm text-gray-600">{job.department}</p>
                        <p className="text-xs text-gray-500">
                          {job.startDate ? new Date(job.startDate).toLocaleDateString() : 'N/A'} - {job.current ? 'Present' : (job.endDate ? new Date(job.endDate).toLocaleDateString() : 'N/A')}
                        </p>
                      </div>
                      {job.current && <Badge variant="outline">Current</Badge>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            Select an employee from the Overview tab to view their employment history.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EmploymentHistoryTab;
