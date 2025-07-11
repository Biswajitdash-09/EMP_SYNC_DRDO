
/**
 * Leave Quick Actions Hook
 * Handles leave-related quick actions
 */

import { useToast } from "@/hooks/use-toast";
import { useLeaveData } from "@/hooks/useLeaveData";

export const useLeaveQuickActions = () => {
  const { toast } = useToast();
  const { approveLeaveRequest, rejectLeaveRequest, allLeaveRequests } = useLeaveData();

  const handleLeaveAction = (action: 'approve' | 'reject', requestId: string, employeeName: string) => {
    const request = allLeaveRequests.find(req => req.id === requestId);
    
    if (!request) {
      toast({
        title: "Request Not Found",
        description: "The leave request could not be found in the system.",
        variant: "destructive"
      });
      return;
    }

    if (request.status !== 'Pending') {
      toast({
        title: "Request Already Processed",
        description: `This leave request has already been ${request.status.toLowerCase()}.`,
        variant: "destructive"
      });
      return;
    }

    if (action === 'approve') {
      approveLeaveRequest(requestId, 'HR Manager', 'Approved via Quick Actions');
      toast({
        title: "Leave Request Approved",
        description: `${employeeName}'s leave request has been approved and updated in main records.`,
      });
    } else {
      rejectLeaveRequest(requestId, 'HR Manager', 'Rejected via Quick Actions - needs more information');
      toast({
        title: "Leave Request Rejected",
        description: `${employeeName}'s leave request has been rejected and updated in main records.`,
        variant: "destructive"
      });
    }

    console.log(`Leave request ${requestId} ${action}ed via Quick Actions and synced to main records`);
  };

  return {
    handleLeaveAction
  };
};
