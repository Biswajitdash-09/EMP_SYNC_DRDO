
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useRealtimeLeaveRequests } from '@/hooks/leave/useRealtimeLeaveRequests';
import { leaveService } from '@/services/leave/leaveService';

const LeaveHistory = () => {
  const { user } = useAuth();
  const [initialRequests, setInitialRequests] = useState([]);
  const { leaveRequests } = useRealtimeLeaveRequests(initialRequests);

  // Load initial leave requests for current user
  useEffect(() => {
    if (!user) return;

    const loadUserLeaveRequests = async () => {
      try {
        console.log('Loading leave requests for user:', user.id);
        const allRequests = await leaveService.getLeaveRequests();
        console.log('All requests fetched:', allRequests);
        
        // Filter requests for current user using employee_id
        const userRequests = allRequests.filter(req => 
          req.employee_id === user.id
        );
        console.log('Filtered user requests:', userRequests);
        
        setInitialRequests(userRequests);
      } catch (error) {
        console.error('Error loading user leave requests:', error);
        setInitialRequests([]);
      }
    };

    loadUserLeaveRequests();
  }, [user]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  // Filter real-time requests for current user using employee_id
  const userLeaveRequests = leaveRequests.filter(req => 
    req.employee_id === user?.id
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          My Leave History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {userLeaveRequests.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">No leave requests found</p>
              <p className="text-sm text-gray-400">Your leave requests will appear here</p>
            </div>
          ) : (
            userLeaveRequests.map((request) => (
              <div key={request.id} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(request.status)}
                    <h4 className="font-medium">{request.leave_type_name}</h4>
                    <Badge className={getStatusColor(request.status)}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </Badge>
                  </div>
                  <span className="text-sm text-gray-500">
                    Applied: {new Date(request.created_at).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-3">
                  <div>
                    <span className="font-medium">Duration:</span> {request.days} day{request.days > 1 ? 's' : ''}
                  </div>
                  <div>
                    <span className="font-medium">From:</span> {new Date(request.start_date).toLocaleDateString()}
                  </div>
                  <div>
                    <span className="font-medium">To:</span> {new Date(request.end_date).toLocaleDateString()}
                  </div>
                </div>
                
                {request.reason && (
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Reason:</span> {request.reason}
                  </p>
                )}
                
                {request.comments && (
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Comments:</span> {request.comments}
                  </p>
                )}

                {request.reviewed_by && request.reviewed_date && (
                  <p className="text-xs text-gray-500">
                    Reviewed on {new Date(request.reviewed_date).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaveHistory;
