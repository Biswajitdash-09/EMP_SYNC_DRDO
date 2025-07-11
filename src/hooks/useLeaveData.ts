
import { useLeaveCore } from './leave/useLeaveCore';
import { useLeaveRequestsOperations } from './leave/useLeaveRequests';
import { useLeaveTypesOperations } from './leave/useLeaveTypes';
import { useHolidaysOperations } from './leave/useHolidays';
import { useLeaveBalancesOperations } from './leave/useLeaveBalances';
import { useLeaveFilters } from './leave/useLeaveFilters';

// Re-export types for backward compatibility
export type { LeaveRequest, LeaveBalance, LeaveType, Holiday } from './leave/useLeaveCore';

export const useLeaveData = () => {
  const {
    leaveRequests: allLeaveRequests,
    setLeaveRequests,
    leaveBalances,
    setLeaveBalances,
    leaveTypes,
    setLeaveTypes,
    holidays,
    setHolidays
  } = useLeaveCore();

  const {
    statusFilter,
    typeFilter,
    employeeFilter,
    setStatusFilter,
    setTypeFilter,
    setEmployeeFilter,
    filteredRequests
  } = useLeaveFilters(allLeaveRequests);

  const {
    addLeaveRequest,
    updateLeaveRequest,
    approveLeaveRequest,
    rejectLeaveRequest,
    deleteLeaveRequest
  } = useLeaveRequestsOperations(allLeaveRequests, setLeaveRequests);

  const {
    addLeaveType,
    updateLeaveType,
    deleteLeaveType
  } = useLeaveTypesOperations(leaveTypes, setLeaveTypes);

  const {
    addHoliday,
    updateHoliday,
    deleteHoliday
  } = useHolidaysOperations(holidays, setHolidays);

  const {
    updateLeaveBalance,
    getEmployeeBalance,
    getAvailableBalance
  } = useLeaveBalancesOperations(leaveBalances, setLeaveBalances);

  // Calculate stats
  const pendingRequests = allLeaveRequests.filter(req => req.status === 'Pending').length;
  const approvedThisMonth = allLeaveRequests.filter(req => 
    req.status === 'Approved' && 
    new Date(req.approvedDate || '').getMonth() === new Date().getMonth()
  ).length;

  return {
    // Filtered and all requests
    leaveRequests: filteredRequests,
    allLeaveRequests,
    
    // Core data
    leaveBalances,
    leaveTypes,
    holidays,
    
    // Filters
    statusFilter,
    typeFilter,
    employeeFilter,
    setStatusFilter,
    setTypeFilter,
    setEmployeeFilter,
    
    // Leave request operations
    addLeaveRequest,
    updateLeaveRequest,
    approveLeaveRequest,
    rejectLeaveRequest,
    deleteLeaveRequest,
    
    // Leave type operations
    addLeaveType,
    updateLeaveType,
    deleteLeaveType,
    
    // Holiday operations
    addHoliday,
    updateHoliday,
    deleteHoliday,
    
    // Balance operations
    updateLeaveBalance,
    getEmployeeBalance,
    getAvailableBalance,
    
    // Stats
    pendingRequests,
    approvedThisMonth
  };
};
