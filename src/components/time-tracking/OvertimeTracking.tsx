import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Clock, Plus, CheckCircle, XCircle, AlertTriangle, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { OvertimeRequest } from '@/hooks/time-tracking/useTimeTrackingCore';

interface OvertimeTrackingProps {
  overtimeRequests: OvertimeRequest[];
  onApproveOvertime: (requestId: string) => void;
  onRejectOvertime: (requestId: string) => void;
  onAddOvertimeRequest: (request: Omit<OvertimeRequest, 'id' | 'status' | 'requestedAt'>) => void;
  onDeleteOvertimeRequest: (requestId: string) => void;
}

const OvertimeTracking = ({ 
  overtimeRequests, 
  onApproveOvertime, 
  onRejectOvertime, 
  onAddOvertimeRequest,
  onDeleteOvertimeRequest
}: OvertimeTrackingProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: 'current-user',
    employeeName: 'Current User',
    date: new Date().toISOString().split('T')[0],
    hours: '',
    reason: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.hours || !formData.reason) return;

    onAddOvertimeRequest({
      employeeId: formData.employeeId,
      employeeName: formData.employeeName,
      date: formData.date,
      hours: parseFloat(formData.hours),
      reason: formData.reason
    });

    setFormData({
      employeeId: 'current-user',
      employeeName: 'Current User',
      date: new Date().toISOString().split('T')[0],
      hours: '',
      reason: ''
    });
    
    setIsDialogOpen(false);
  };

  const handleDelete = (requestId: string) => {
    if (window.confirm('Are you sure you want to delete this overtime request?')) {
      onDeleteOvertimeRequest(requestId);
    }
  };

  // Calculate statistics
  const thisWeekOvertime = overtimeRequests
    .filter(req => req.status === 'approved' && isThisWeek(req.date))
    .reduce((sum, req) => sum + req.hours, 0);

  const thisMonthOvertime = overtimeRequests
    .filter(req => req.status === 'approved' && isThisMonth(req.date))
    .reduce((sum, req) => sum + req.hours, 0);

  const pendingHours = overtimeRequests
    .filter(req => req.status === 'pending')
    .reduce((sum, req) => sum + req.hours, 0);

  function isThisWeek(dateString: string) {
    const date = new Date(dateString);
    const today = new Date();
    const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
    return date >= weekStart;
  }

  function isThisMonth(dateString: string) {
    const date = new Date(dateString);
    const today = new Date();
    return date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'pending':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Overtime Management
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Request Overtime
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Submit Overtime Request</DialogTitle>
                <DialogDescription>
                  Request approval for overtime hours worked
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hours">Hours</Label>
                    <Input
                      id="hours"
                      type="number"
                      step="0.5"
                      min="0.5"
                      max="12"
                      placeholder="2.5"
                      value={formData.hours}
                      onChange={(e) => setFormData(prev => ({ ...prev, hours: e.target.value }))}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reason">Reason</Label>
                  <Textarea
                    id="reason"
                    placeholder="Please provide a reason for overtime work..."
                    value={formData.reason}
                    onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
                    required
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Submit Request</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </CardTitle>
        <CardDescription>Monitor and approve overtime hours with automated tracking</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 border rounded-lg text-center bg-blue-50">
            <Clock className="w-6 h-6 mx-auto mb-2 text-blue-600" />
            <div className="text-2xl font-bold text-blue-600">{thisWeekOvertime}h</div>
            <p className="text-sm text-blue-700">This Week</p>
          </div>
          <div className="p-4 border rounded-lg text-center bg-green-50">
            <CheckCircle className="w-6 h-6 mx-auto mb-2 text-green-600" />
            <div className="text-2xl font-bold text-green-600">{thisMonthOvertime}h</div>
            <p className="text-sm text-green-700">This Month</p>
          </div>
          <div className="p-4 border rounded-lg text-center bg-yellow-50">
            <AlertTriangle className="w-6 h-6 mx-auto mb-2 text-yellow-600" />
            <div className="text-2xl font-bold text-yellow-600">{pendingHours}h</div>
            <p className="text-sm text-yellow-700">Pending Approval</p>
          </div>
          <div className="p-4 border rounded-lg text-center bg-purple-50">
            <div className="text-2xl font-bold text-purple-600">
              ${(thisMonthOvertime * 25).toFixed(0)}
            </div>
            <p className="text-sm text-purple-700">Est. Overtime Pay</p>
          </div>
        </div>

        {/* Overtime Requests Table */}
        <div className="space-y-4">
          <h4 className="font-semibold flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Recent Overtime Requests
          </h4>
          
          {overtimeRequests.length === 0 ? (
            <div className="text-center py-8 border rounded-lg">
              <Clock className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="text-gray-500">No overtime requests found</p>
            </div>
          ) : (
            <div className="space-y-3">
              {overtimeRequests.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {getStatusIcon(request.status)}
                      <h5 className="font-medium">{request.employeeName}</h5>
                      <Badge className={getStatusColor(request.status)}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{request.reason}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>{new Date(request.date).toLocaleDateString()}</span>
                      <span>{request.hours} hours</span>
                      <span>Requested {new Date(request.requestedAt).toLocaleDateString()}</span>
                      {request.approvedBy && (
                        <span>Approved by {request.approvedBy}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    {request.status === 'pending' && (
                      <>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-green-600 border-green-200 hover:bg-green-50"
                          onClick={() => onApproveOvertime(request.id)}
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-red-600 border-red-200 hover:bg-red-50"
                          onClick={() => onRejectOvertime(request.id)}
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </>
                    )}
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-red-600 border-red-200 hover:bg-red-50"
                      onClick={() => handleDelete(request.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default OvertimeTracking;
