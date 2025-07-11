
/**
 * Employee Leave Application Component
 * Allows employees to apply for leave and view their leave history
 */

import LeaveBalanceOverview from './components/LeaveBalanceOverview';
import LeaveApplicationForm from './components/LeaveApplicationForm';
import LeaveHistory from './components/LeaveHistory';
import { DashboardEmployee } from './hooks/useEmployeeDashboard';

interface EmployeeLeaveApplicationProps {
  employee: DashboardEmployee;
}

const EmployeeLeaveApplication = ({ employee }: EmployeeLeaveApplicationProps) => {
  return (
    <div className="space-y-6">
      <LeaveBalanceOverview leaveBalance={employee.leaveBalance} />
      <LeaveApplicationForm employee={employee} />
      <LeaveHistory />
    </div>
  );
};

export default EmployeeLeaveApplication;
