
/**
 * Quick Action Handlers Hook (Refactored)
 * Centralized entry point that combines all quick action handlers
 * Refactored into smaller, focused hooks for better maintainability
 */

import { useEmployeeQuickActions } from "./quick-actions/useEmployeeQuickActions";
import { usePayrollQuickActions } from "./quick-actions/usePayrollQuickActions";
import { useLeaveQuickActions } from "./quick-actions/useLeaveQuickActions";
import { useReportQuickActions } from "./quick-actions/useReportQuickActions";
import { usePerformanceQuickActions } from "./quick-actions/usePerformanceQuickActions";

export const useQuickActionHandlers = () => {
  const { handleAddEmployee } = useEmployeeQuickActions();
  const { handleProcessPayroll } = usePayrollQuickActions();
  const { handleLeaveAction } = useLeaveQuickActions();
  const { handleGenerateReport } = useReportQuickActions();
  const { handleScheduleReview } = usePerformanceQuickActions();

  return {
    handleAddEmployee,
    handleProcessPayroll,
    handleLeaveAction,
    handleGenerateReport,
    handleScheduleReview
  };
};
