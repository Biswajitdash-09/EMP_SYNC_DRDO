
/**
 * Performance Quick Actions Hook
 * Handles performance review quick actions
 */

import { useToast } from "@/hooks/use-toast";
import { useEmployeeData } from "@/hooks/useEmployeeData";

export const usePerformanceQuickActions = () => {
  const { toast } = useToast();
  const { allEmployees } = useEmployeeData();

  const handleScheduleReview = (reviewForm: any, resetForm: () => void) => {
    if (!reviewForm.employee || !reviewForm.dueDate) {
      toast({
        title: "Validation Error",
        description: "Please select an employee and due date.",
        variant: "destructive"
      });
      return;
    }

    const employee = allEmployees.find(emp => emp.name === reviewForm.employee);
    if (!employee) {
      toast({
        title: "Employee Not Found",
        description: "The selected employee could not be found in main records.",
        variant: "destructive"
      });
      return;
    }

    const dueDate = new Date(reviewForm.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (dueDate < today) {
      toast({
        title: "Invalid Due Date",
        description: "Due date must be in the future.",
        variant: "destructive"
      });
      return;
    }

    const reviewData = {
      employeeId: employee.id,
      employeeName: employee.name,
      department: employee.department,
      reviewType: reviewForm.reviewType,
      reviewer: reviewForm.reviewer,
      dueDate: reviewForm.dueDate,
      goals: reviewForm.goals?.trim() || 'No specific goals specified',
      scheduledDate: new Date().toISOString().split('T')[0],
      status: 'Scheduled'
    };

    console.log('Performance review scheduled for employee from main records:', reviewData);

    toast({
      title: "Performance Review Scheduled",
      description: `Performance review has been scheduled for ${reviewForm.employee} from main employee records.`,
    });

    resetForm();
  };

  return {
    handleScheduleReview
  };
};
