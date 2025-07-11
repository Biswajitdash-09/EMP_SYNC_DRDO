
import { LeaveBalance } from './useLeaveCore';

export const useLeaveBalancesOperations = (
  leaveBalances: LeaveBalance[],
  setLeaveBalances: React.Dispatch<React.SetStateAction<LeaveBalance[]>>
) => {
  const updateLeaveBalance = (employeeId: string, updates: Partial<LeaveBalance>) => {
    setLeaveBalances(prev => prev.map(balance =>
      balance.employeeId === employeeId ? { ...balance, ...updates } : balance
    ));
  };

  const getEmployeeBalance = (employeeId: string) => {
    return leaveBalances.find(balance => balance.employeeId === employeeId);
  };

  const getAvailableBalance = (employeeId: string, leaveTypeId: string) => {
    const balance = getEmployeeBalance(employeeId);
    if (!balance) return 0;

    switch (leaveTypeId) {
      case 'vacation': return balance.vacation - balance.usedVacation;
      case 'sick': return balance.sick - balance.usedSick;
      case 'personal': return balance.personal - balance.usedPersonal;
      case 'maternity': return balance.maternity - balance.usedMaternity;
      default: return 0;
    }
  };

  return {
    updateLeaveBalance,
    getEmployeeBalance,
    getAvailableBalance
  };
};
