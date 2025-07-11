
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from 'lucide-react';
import { LeaveType } from '@/services/leave/leaveService';
import { useToast } from "@/hooks/use-toast";

interface LeaveTypesConfigurationProps {
  leaveTypes: LeaveType[];
  onEditLeaveType: (leaveType: LeaveType) => void;
  onDeleteLeaveType: (id: string) => void;
}

const LeaveTypesConfiguration = ({ 
  leaveTypes, 
  onEditLeaveType,
  onDeleteLeaveType
}: LeaveTypesConfigurationProps) => {
  const { toast } = useToast();

  const handleDeleteLeaveType = (id: string) => {
    if (confirm('Are you sure you want to delete this leave type?')) {
      onDeleteLeaveType(id);
      toast({
        title: "Leave Type Deleted",
        description: "The leave type has been removed successfully."
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        {leaveTypes.map((type) => (
          <div key={type.id} className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded bg-${type.color}-500`}></div>
              <div>
                <h4 className="font-medium">{type.name}</h4>
                <p className="text-sm text-gray-600">
                  {type.description} • {type.annual_days} days per year
                  {type.carry_forward && ' • Carry forward enabled'}
                  {type.requires_approval && ' • Requires approval'}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onEditLeaveType(type)}
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="text-red-600"
                onClick={() => handleDeleteLeaveType(type.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaveTypesConfiguration;
