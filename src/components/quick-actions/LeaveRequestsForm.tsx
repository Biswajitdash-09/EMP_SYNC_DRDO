
/**
 * Leave Requests Form Component for Quick Actions
 * Displays real-time pending leave requests from main system
 * Enables direct approval/rejection that updates main records
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Clock } from 'lucide-react';
import { useSupabaseLeaveData } from "@/hooks/leave/useSupabaseLeaveData";

interface LeaveRequestsFormProps {
  onLeaveAction: (action: 'approve' | 'reject', requestId: string, employeeName: string) => void;
  onCancel: () => void;
}

const LeaveRequestsForm = ({
  onLeaveAction,
  onCancel
}: LeaveRequestsFormProps) => {
  // Get real-time data from main leave management system
  const {
    allLeaveRequests
  } = useSupabaseLeaveData();

  // Filter for pending requests from main records
  const pendingLeaveRequests = allLeaveRequests.filter(req => req.status === 'pending');

  // Show only first 5 for quick actions, but indicate total count
  const displayRequests = pendingLeaveRequests.slice(0, 5);
  const hasMoreRequests = pendingLeaveRequests.length > 5;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-orange-600" />
            <span>Pending Leave Requests</span>
          </div>
          <Badge variant="secondary" className="ml-2">
            {pendingLeaveRequests.length} Total
          </Badge>
        </CardTitle>
        <CardDescription>
          Review and approve/reject leave applications from main system records
          {hasMoreRequests && ` (Showing first 5 of ${pendingLeaveRequests.length})`}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {pendingLeaveRequests.length === 0 ? (
          <div className="text-center py-8">
            <Clock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No pending leave requests</p>
            <p className="text-sm text-gray-400">All leave requests are up to date</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {displayRequests.map(request => (
              <div key={request.id} className="p-4 border rounded-lg bg-white shadow-sm">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <h4 className="font-medium text-gray-900">{request.employee_name}</h4>
                      <Badge variant="outline" className="text-xs bg-sky-500">
                        {request.id}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-2">
                      <div>
                        <span className="font-medium">Type:</span> {request.leave_type_name}
                      </div>
                      <div>
                        <span className="font-medium">Days:</span> {request.days}
                      </div>
                      <div>
                        <span className="font-medium">From:</span> {request.start_date}
                      </div>
                      <div>
                        <span className="font-medium">To:</span> {request.end_date}
                      </div>
                    </div>
                    
                    {request.reason && (
                      <div className="text-sm text-gray-600 mb-2">
                        <span className="font-medium">Reason:</span> {request.reason}
                      </div>
                    )}
                    
                    <div className="text-xs text-gray-500">
                      Applied: {request.created_at}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Button 
                      size="sm" 
                      className="bg-green-600 hover:bg-green-700 text-white" 
                      onClick={() => onLeaveAction('approve', request.id, request.employee_name || 'Unknown')}
                    >
                      Approve
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => onLeaveAction('reject', request.id, request.employee_name || 'Unknown')} 
                      className="text-red-600 border-red-200 bg-yellow-300 hover:bg-yellow-200"
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            
            {hasMoreRequests && (
              <div className="text-center py-3 border-t">
                <p className="text-sm text-gray-500">
                  {pendingLeaveRequests.length - 5} more requests available in Leave Management
                </p>
              </div>
            )}
          </div>
        )}
        
        <div className="flex gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onCancel}>
            Close
          </Button>
          {pendingLeaveRequests.length > 0 && (
            <Button variant="outline" className="text-blue-600">
              View All in Leave Management
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaveRequestsForm;
