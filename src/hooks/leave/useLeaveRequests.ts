
import { LeaveRequest } from './useLeaveCore';

export const useLeaveRequestsOperations = (
  leaveRequests: LeaveRequest[],
  setLeaveRequests: React.Dispatch<React.SetStateAction<LeaveRequest[]>>
) => {
  const addLeaveRequest = (request: Omit<LeaveRequest, 'id' | 'appliedDate'>) => {
    const newId = `LR${String(leaveRequests.length + 1).padStart(3, '0')}`;
    const newRequest: LeaveRequest = {
      ...request,
      id: newId,
      appliedDate: new Date().toISOString().split('T')[0]
    };
    setLeaveRequests(prev => [...prev, newRequest]);
  };

  const updateLeaveRequest = (id: string, updates: Partial<LeaveRequest>) => {
    setLeaveRequests(prev => prev.map(request =>
      request.id === id ? { ...request, ...updates } : request
    ));
  };

  const approveLeaveRequest = (id: string, approvedBy: string, comments?: string) => {
    updateLeaveRequest(id, {
      status: 'Approved',
      approvedBy,
      approvedDate: new Date().toISOString().split('T')[0],
      comments
    });
  };

  const rejectLeaveRequest = (id: string, approvedBy: string, comments: string) => {
    updateLeaveRequest(id, {
      status: 'Rejected',
      approvedBy,
      approvedDate: new Date().toISOString().split('T')[0],
      comments
    });
  };

  const deleteLeaveRequest = (id: string) => {
    setLeaveRequests(prev => prev.filter(request => request.id !== id));
  };

  return {
    addLeaveRequest,
    updateLeaveRequest,
    approveLeaveRequest,
    rejectLeaveRequest,
    deleteLeaveRequest
  };
};
