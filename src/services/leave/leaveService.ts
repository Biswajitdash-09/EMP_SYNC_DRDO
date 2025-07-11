
// Main leave service that exports all sub-services
export { leaveTypeService } from './leaveTypeService';
export { leaveRequestService } from './leaveRequestService';
export { leaveBalanceService } from './leaveBalanceService';
export { holidayService } from './holidayService';
export * from './types';

// Consolidated service for backward compatibility
import { leaveTypeService } from './leaveTypeService';
import { leaveRequestService } from './leaveRequestService';
import { leaveBalanceService } from './leaveBalanceService';
import { holidayService } from './holidayService';

export const leaveService = {
  // Leave Types
  getLeaveTypes: leaveTypeService.getLeaveTypes,
  createLeaveType: leaveTypeService.createLeaveType,
  updateLeaveType: leaveTypeService.updateLeaveType,
  deleteLeaveType: leaveTypeService.deleteLeaveType,

  // Leave Requests
  getLeaveRequests: leaveRequestService.getLeaveRequests,
  createLeaveRequest: leaveRequestService.createLeaveRequest,
  updateLeaveRequestStatus: leaveRequestService.updateLeaveRequestStatus,
  deleteLeaveRequest: leaveRequestService.deleteLeaveRequest,

  // Leave Balances
  getLeaveBalances: leaveBalanceService.getLeaveBalances,
  getAvailableBalance: leaveBalanceService.getAvailableBalance,

  // Holidays
  getHolidays: holidayService.getHolidays,
  createHoliday: holidayService.createHoliday,
  deleteHoliday: holidayService.deleteHoliday
};
