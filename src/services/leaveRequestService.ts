
/**
 * Leave Request Service
 * Handles storing and retrieving leave requests for admin dashboard integration
 */

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: string;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  appliedDate: string;
  approvedBy?: string;
  approvedDate?: string;
  comments?: string;
}

const LEAVE_REQUESTS_KEY = 'leave-requests';

/**
 * Get all leave requests from localStorage
 */
export const getAllLeaveRequests = (): LeaveRequest[] => {
  try {
    const stored = localStorage.getItem(LEAVE_REQUESTS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading leave requests:', error);
    return [];
  }
};

/**
 * Store leave requests in localStorage
 */
export const storeLeaveRequests = (requests: LeaveRequest[]): void => {
  try {
    localStorage.setItem(LEAVE_REQUESTS_KEY, JSON.stringify(requests));
  } catch (error) {
    console.error('Error storing leave requests:', error);
  }
};

/**
 * Add a new leave request
 */
export const addLeaveRequest = (request: Omit<LeaveRequest, 'id' | 'appliedDate' | 'status'>): LeaveRequest => {
  const existingRequests = getAllLeaveRequests();
  const newId = `LR${String(existingRequests.length + 1).padStart(3, '0')}`;
  
  const newRequest: LeaveRequest = {
    ...request,
    id: newId,
    status: 'Pending',
    appliedDate: new Date().toISOString().split('T')[0]
  };

  const updatedRequests = [...existingRequests, newRequest];
  storeLeaveRequests(updatedRequests);
  
  console.log('✅ Leave request added:', newRequest);
  return newRequest;
};

/**
 * Get leave requests for a specific employee
 */
export const getEmployeeLeaveRequests = (employeeId: string): LeaveRequest[] => {
  const allRequests = getAllLeaveRequests();
  return allRequests.filter(request => request.employeeId === employeeId);
};

/**
 * Update leave request status (for admin approval/rejection)
 */
export const updateLeaveRequestStatus = (
  requestId: string, 
  status: 'Approved' | 'Rejected', 
  approvedBy: string, 
  comments?: string
): void => {
  const requests = getAllLeaveRequests();
  const updatedRequests = requests.map(request => 
    request.id === requestId 
      ? {
          ...request,
          status,
          approvedBy,
          approvedDate: new Date().toISOString().split('T')[0],
          comments
        }
      : request
  );
  
  storeLeaveRequests(updatedRequests);
  console.log('✅ Leave request status updated:', requestId, status);
};
