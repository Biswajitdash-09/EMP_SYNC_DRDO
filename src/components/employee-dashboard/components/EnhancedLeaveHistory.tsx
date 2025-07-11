
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, CheckCircle, XCircle, Clock, Upload, FileText } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface LeaveRequest {
  id: string;
  type: string;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  appliedDate: string;
  approvedBy?: string;
  comments?: string;
  attachments?: { name: string; url: string }[];
}

interface EnhancedLeaveHistoryProps {
  employeeId: string;
}

const EnhancedLeaveHistory = ({ employeeId }: EnhancedLeaveHistoryProps) => {
  const { toast } = useToast();
  const [leaveHistory, setLeaveHistory] = useState<LeaveRequest[]>([
    {
      id: 'LR001',
      type: 'Annual Leave',
      startDate: '2024-06-15',
      endDate: '2024-06-20',
      days: 5,
      reason: 'Family vacation',
      status: 'Approved',
      appliedDate: '2024-06-01',
      approvedBy: 'Jane Smith',
      comments: 'Approved for family vacation'
    },
    {
      id: 'LR002',
      type: 'Sick Leave',
      startDate: '2024-05-10',
      endDate: '2024-05-12',
      days: 3,
      reason: 'Medical treatment',
      status: 'Approved',
      appliedDate: '2024-05-09',
      approvedBy: 'Jane Smith',
      attachments: [{ name: 'medical_certificate.pdf', url: '#' }]
    },
    {
      id: 'LR003',
      type: 'Personal Leave',
      startDate: '2024-07-08',
      endDate: '2024-07-08',
      days: 1,
      reason: 'Personal appointment',
      status: 'Pending',
      appliedDate: '2024-07-01'
    }
  ]);

  const handleFileUpload = (leaveId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const updatedHistory = leaveHistory.map(leave => {
        if (leave.id === leaveId) {
          const newAttachment = {
            name: file.name,
            url: URL.createObjectURL(file)
          };
          return {
            ...leave,
            attachments: [...(leave.attachments || []), newAttachment]
          };
        }
        return leave;
      });
      
      setLeaveHistory(updatedHistory);
      toast({
        title: "File Uploaded",
        description: `${file.name} has been attached to your leave request.`,
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'Rejected':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Leave History & Requests
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {leaveHistory.map((leave) => (
            <div key={leave.id} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(leave.status)}
                  <h4 className="font-medium">{leave.type}</h4>
                  <Badge className={getStatusColor(leave.status)}>
                    {leave.status}
                  </Badge>
                </div>
                <span className="text-sm text-gray-500">
                  Applied: {new Date(leave.appliedDate).toLocaleDateString()}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-3">
                <div>
                  <span className="font-medium">Duration:</span> {leave.days} day{leave.days > 1 ? 's' : ''}
                </div>
                <div>
                  <span className="font-medium">From:</span> {new Date(leave.startDate).toLocaleDateString()}
                </div>
                <div>
                  <span className="font-medium">To:</span> {new Date(leave.endDate).toLocaleDateString()}
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-medium">Reason:</span> {leave.reason}
              </p>
              
              {leave.comments && (
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">Comments:</span> {leave.comments}
                </p>
              )}

              {leave.attachments && leave.attachments.length > 0 && (
                <div className="mb-2">
                  <span className="font-medium text-sm">Attachments:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {leave.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded text-xs">
                        <FileText className="w-3 h-3" />
                        {attachment.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {leave.status === 'Pending' && (
                <div className="flex items-center gap-2 mt-2">
                  <Label htmlFor={`file-${leave.id}`} className="text-sm">Add supporting document:</Label>
                  <Input
                    id={`file-${leave.id}`}
                    type="file"
                    className="text-xs"
                    onChange={(e) => handleFileUpload(leave.id, e)}
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedLeaveHistory;
