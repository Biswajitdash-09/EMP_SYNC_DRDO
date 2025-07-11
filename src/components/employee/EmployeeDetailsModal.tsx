
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Employee } from '@/hooks/useEmployeeData';

interface EmployeeDetailsModalProps {
  employee: Employee | null;
  onClose: () => void;
}

const EmployeeDetailsModal = ({ employee, onClose }: EmployeeDetailsModalProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Probation': return 'bg-yellow-100 text-yellow-800';
      case 'Terminated': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!employee) return null;

  return (
    <Dialog open={!!employee} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Employee Details - {employee.name}</DialogTitle>
          <DialogDescription>
            Complete information for {employee.name} ({employee.id})
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Basic Information</h4>
              <div className="space-y-1 text-sm">
                <div><strong>ID:</strong> {employee.id}</div>
                <div><strong>Name:</strong> {employee.name}</div>
                <div><strong>Email:</strong> {employee.email}</div>
                <div><strong>Phone:</strong> {employee.phone}</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Employment</h4>
              <div className="space-y-1 text-sm">
                <div><strong>Department:</strong> {employee.department}</div>
                <div><strong>Position:</strong> {employee.position}</div>
                <div><strong>Manager:</strong> {employee.manager}</div>
                <div><strong>Status:</strong> 
                  <Badge className={`ml-1 ${getStatusColor(employee.status)}`}>
                    {employee.status}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeDetailsModal;
