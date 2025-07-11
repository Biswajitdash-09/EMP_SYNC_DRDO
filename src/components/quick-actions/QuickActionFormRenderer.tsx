
/**
 * Quick Action Form Renderer Component
 * Dynamically renders different forms based on selected quick action
 * Handles form delegation and action coordination
 */

import AddEmployeeForm from "./AddEmployeeForm";
import ProcessPayrollForm from "./ProcessPayrollForm";
import LeaveRequestsForm from "./LeaveRequestsForm";
import GenerateReportForm from "./GenerateReportForm";
import PerformanceReviewForm from "./PerformanceReviewForm";

// Props interface for form renderer
interface QuickActionFormRendererProps {
  activeAction: string;
  employeeForm: any;
  reportParams: any;
  reviewForm: any;
  onEmployeeFormChange: (updates: any) => void;
  onReportParamsChange: (updates: any) => void;
  onReviewFormChange: (updates: any) => void;
  onAddEmployee: () => void;
  onProcessPayroll: () => void;
  onLeaveAction: (action: 'approve' | 'reject', requestId: string, employeeName: string) => void;
  onGenerateReport: () => void;
  onScheduleReview: () => void;
  onCancel: () => void;
}

const QuickActionFormRenderer = ({
  activeAction,
  employeeForm,
  reportParams,
  reviewForm,
  onEmployeeFormChange,
  onReportParamsChange,
  onReviewFormChange,
  onAddEmployee,
  onProcessPayroll,
  onLeaveAction,
  onGenerateReport,
  onScheduleReview,
  onCancel
}: QuickActionFormRendererProps) => {
  /**
   * Form routing logic based on active action
   * Each case renders the appropriate form component
   */
  switch (activeAction) {
    // Employee addition form
    case 'add-employee':
      return (
        <AddEmployeeForm
          employeeForm={employeeForm}
          onFormChange={onEmployeeFormChange}
          onSubmit={onAddEmployee}
          onCancel={onCancel}
        />
      );
    
    // Payroll processing form
    case 'process-payroll':
      return (
        <ProcessPayrollForm
          onSubmit={onProcessPayroll}
          onCancel={onCancel}
        />
      );
    
    // Leave request management form
    case 'leave-requests':
      return (
        <LeaveRequestsForm
          onLeaveAction={onLeaveAction}
          onCancel={onCancel}
        />
      );
    
    // Report generation form
    case 'generate-report':
      return (
        <GenerateReportForm
          reportParams={reportParams}
          onParamsChange={onReportParamsChange}
          onSubmit={onGenerateReport}
          onCancel={onCancel}
        />
      );
    
    // Performance review scheduling form
    case 'performance-review':
      return (
        <PerformanceReviewForm
          reviewForm={reviewForm}
          onFormChange={onReviewFormChange}
          onSubmit={onScheduleReview}
          onCancel={onCancel}
        />
      );
    
    // Default case - no form selected
    default:
      return null;
  }
};

export default QuickActionFormRenderer;
