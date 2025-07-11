
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertCircle, Clock, Trash2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface LeaveRequest {
  id: string;
  employee_id: string;
  employee_name?: string;
  leave_type_name?: string;
  start_date: string;
  end_date: string;
  days: number;
  status: 'pending' | 'approved' | 'rejected';
  reason?: string;
  comments?: string;
  reviewed_by?: string;
  reviewed_date?: string;
  created_at: string;
}

interface LeaveRequestsTableProps {
  leaveRequests: LeaveRequest[];
  onApprovalAction: (request: LeaveRequest) => void;
  onDeleteRequest: (id: string) => void;
}

const LeaveRequestsTable = ({ 
  leaveRequests, 
  onApprovalAction,
  onDeleteRequest
}: LeaveRequestsTableProps) => {
  const { toast } = useToast();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'rejected': return <XCircle className="w-4 h-4 text-red-600" />;
      case 'pending': return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDeleteRequest = (id: string) => {
    if (confirm('Are you sure you want to delete this request?')) {
      onDeleteRequest(id);
      toast({
        title: "Request Deleted",
        description: "The leave request has been deleted."
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Employee</TableHead>
          <TableHead>Leave Type</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>End Date</TableHead>
          <TableHead>Days</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Applied Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leaveRequests.map((request) => (
          <TableRow key={request.id}>
            <TableCell className="font-medium">{request.employee_name || 'Unknown'}</TableCell>
            <TableCell>{request.leave_type_name || 'Unknown'}</TableCell>
            <TableCell>{formatDate(request.start_date)}</TableCell>
            <TableCell>{formatDate(request.end_date)}</TableCell>
            <TableCell>{request.days}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                {getStatusIcon(request.status)}
                <Badge className={getStatusColor(request.status)}>
                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                </Badge>
              </div>
            </TableCell>
            <TableCell>{formatDate(request.created_at)}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                {request.status === 'pending' && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onApprovalAction(request)}
                  >
                    Review
                  </Button>
                )}
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="text-red-600"
                  onClick={() => handleDeleteRequest(request.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default LeaveRequestsTable;
