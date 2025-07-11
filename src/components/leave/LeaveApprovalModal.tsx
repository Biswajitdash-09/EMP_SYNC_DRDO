
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle, Calendar, User, Clock } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface LeaveRequest {
  id: string;
  employee_name?: string;
  leave_type_name?: string;
  start_date: string;
  end_date: string;
  days: number;
  reason?: string;
  created_at: string;
}

interface LeaveApprovalModalProps {
  open: boolean;
  onClose: () => void;
  request: LeaveRequest | null;
  onApprove: (id: string, approvedBy: string, comments?: string) => Promise<void>;
  onReject: (id: string, approvedBy: string, comments: string) => Promise<void>;
}

const LeaveApprovalModal = ({ 
  open, 
  onClose, 
  request, 
  onApprove, 
  onReject 
}: LeaveApprovalModalProps) => {
  const [comments, setComments] = useState('');
  const [processing, setProcessing] = useState(false);
  const { toast } = useToast();

  if (!request) return null;

  const handleApprove = async () => {
    if (processing) return;
    
    setProcessing(true);
    try {
      // Get current user ID
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      console.log('Approving request with user ID:', user.id);
      await onApprove(request.id, user.id, comments || undefined);
      
      toast({
        title: "Success",
        description: "Leave request approved successfully"
      });
      
      handleClose();
    } catch (error) {
      console.error('Error approving request:', error);
      toast({
        title: "Error",
        description: "Failed to approve leave request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleReject = async () => {
    if (processing) return;
    
    if (!comments.trim()) {
      toast({
        title: "Comment Required",
        description: "Please provide a reason for rejection.",
        variant: "destructive"
      });
      return;
    }
    
    setProcessing(true);
    try {
      // Get current user ID
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      console.log('Rejecting request with user ID:', user.id);
      await onReject(request.id, user.id, comments);
      
      toast({
        title: "Success",
        description: "Leave request rejected"
      });
      
      handleClose();
    } catch (error) {
      console.error('Error rejecting request:', error);
      toast({
        title: "Error",
        description: "Failed to reject leave request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleClose = () => {
    setComments('');
    onClose();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Leave Request Approval
          </DialogTitle>
          <DialogDescription>
            Review and approve or reject the leave request
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Request Details */}
          <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Employee</p>
                  <p className="text-sm text-gray-600">{request.employee_name || 'Unknown'}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Leave Type</p>
                  <p className="text-sm text-gray-600">{request.leave_type_name || 'Unknown'}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium">Start Date</p>
                <p className="text-sm text-gray-600">{formatDate(request.start_date)}</p>
              </div>
              <div>
                <p className="text-sm font-medium">End Date</p>
                <p className="text-sm text-gray-600">{formatDate(request.end_date)}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Duration</p>
                <p className="text-sm text-gray-600">{request.days} days</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-gray-500 mt-1" />
              <div>
                <p className="text-sm font-medium">Applied Date</p>
                <p className="text-sm text-gray-600">{formatDate(request.created_at)}</p>
              </div>
            </div>

            {request.reason && (
              <div>
                <p className="text-sm font-medium mb-2">Reason</p>
                <p className="text-sm text-gray-600 bg-white p-3 rounded border">
                  {request.reason}
                </p>
              </div>
            )}
          </div>

          {/* Comments Section */}
          <div className="space-y-2">
            <Label htmlFor="comments">Comments</Label>
            <Textarea
              id="comments"
              placeholder="Add your comments here..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows={3}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={handleClose} disabled={processing}>
              Cancel
            </Button>
            <Button 
              variant="outline" 
              className="text-red-600 border-red-200 hover:bg-red-50"
              onClick={handleReject}
              disabled={processing}
            >
              <XCircle className="w-4 h-4 mr-2" />
              {processing ? 'Processing...' : 'Reject'}
            </Button>
            <Button 
              className="bg-green-600 hover:bg-green-700"
              onClick={handleApprove}
              disabled={processing}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              {processing ? 'Processing...' : 'Approve'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeaveApprovalModal;
