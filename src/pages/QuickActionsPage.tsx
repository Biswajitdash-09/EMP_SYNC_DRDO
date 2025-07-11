/**
 * Quick Actions Page Component
 * Dedicated page for fast HR operations and bulk actions
 * Provides quick access to common HR tasks without full module navigation
 */

import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import QuickActionsGrid from "@/components/quick-actions/QuickActionsGrid";
import QuickActionFormRenderer from "@/components/quick-actions/QuickActionFormRenderer";
import { useQuickActionForms } from "@/hooks/useQuickActionForms";
import { useQuickActionHandlers } from "@/hooks/useQuickActionHandlers";
const QuickActionsPage = () => {
  const navigate = useNavigate();

  // Track which action form is currently active
  const [activeAction, setActiveAction] = useState<string | null>(null);

  // Custom hooks for form state management
  const {
    employeeForm,
    setEmployeeForm,
    reportParams,
    setReportParams,
    reviewForm,
    setReviewForm,
    resetEmployeeForm,
    resetReviewForm
  } = useQuickActionForms();

  // Custom hooks for action handling logic
  const {
    handleAddEmployee,
    handleProcessPayroll,
    handleLeaveAction,
    handleGenerateReport,
    handleScheduleReview
  } = useQuickActionHandlers();

  /**
   * Wrapper functions that handle form submission and cleanup
   * Each function processes the action and resets the form state
   */
  const onAddEmployee = () => {
    handleAddEmployee(employeeForm, resetEmployeeForm);
    setActiveAction(null);
  };
  const onProcessPayroll = () => {
    handleProcessPayroll();
    setActiveAction(null);
  };
  const onGenerateReport = () => {
    handleGenerateReport(reportParams);
    setActiveAction(null);
  };
  const onScheduleReview = () => {
    handleScheduleReview(reviewForm, resetReviewForm);
    setActiveAction(null);
  };
  return <div className="min-h-screen bg-gray-50">
      {/* Page header with navigation */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              {/* Back to dashboard navigation */}
              <Button variant="ghost" onClick={() => navigate('/dashboard')} className="bg-amber-500 hover:bg-amber-400">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <h1 className="text-xl font-bold text-gray-900">Quick Actions</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Conditional rendering based on active action */}
        {activeAction ?
      // Show specific action form
      <div className="space-y-6">
            <QuickActionFormRenderer activeAction={activeAction} employeeForm={employeeForm} reportParams={reportParams} reviewForm={reviewForm} onEmployeeFormChange={setEmployeeForm} onReportParamsChange={setReportParams} onReviewFormChange={setReviewForm} onAddEmployee={onAddEmployee} onProcessPayroll={onProcessPayroll} onLeaveAction={handleLeaveAction} onGenerateReport={onGenerateReport} onScheduleReview={onScheduleReview} onCancel={() => setActiveAction(null)} />
          </div> :
      // Show action selection grid
      <QuickActionsGrid onActionSelect={setActiveAction} />}
      </div>
    </div>;
};
export default QuickActionsPage;