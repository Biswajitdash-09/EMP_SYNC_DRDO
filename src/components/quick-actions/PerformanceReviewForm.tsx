import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BarChart3 } from 'lucide-react';
import { useEmployeeData } from "@/hooks/useEmployeeData";
interface PerformanceReviewFormProps {
  reviewForm: {
    employee: string;
    reviewType: string;
    reviewer: string;
    dueDate: string;
    goals: string;
  };
  onFormChange: (updates: any) => void;
  onSubmit: () => void;
  onCancel: () => void;
}
const PerformanceReviewForm = ({
  reviewForm,
  onFormChange,
  onSubmit,
  onCancel
}: PerformanceReviewFormProps) => {
  const {
    allEmployees
  } = useEmployeeData();
  return <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BarChart3 className="w-5 h-5 text-red-600" />
          <span>Schedule Performance Review</span>
        </CardTitle>
        <CardDescription>Set up performance evaluation for employees</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="employee">Employee *</Label>
            <select id="employee" value={reviewForm.employee} onChange={e => onFormChange(prev => ({
            ...prev,
            employee: e.target.value
          }))} className="w-full p-2 border rounded-md bg-green-500">
              <option value="">Select Employee</option>
              {allEmployees.map(emp => <option key={emp.id} value={emp.name}>{emp.name}</option>)}
            </select>
          </div>
          <div>
            <Label htmlFor="reviewType">Review Type</Label>
            <select id="reviewType" value={reviewForm.reviewType} onChange={e => onFormChange(prev => ({
            ...prev,
            reviewType: e.target.value
          }))} className="w-full p-2 border rounded-md bg-yellow-500">
              <option value="Annual Review">Annual Review</option>
              <option value="Mid-Year Review">Mid-Year Review</option>
              <option value="Quarterly Review">Quarterly Review</option>
              <option value="Probation Review">Probation Review</option>
              <option value="Project Review">Project Review</option>
            </select>
          </div>
          <div>
            <Label htmlFor="reviewer">Reviewer</Label>
            <select id="reviewer" value={reviewForm.reviewer} onChange={e => onFormChange(prev => ({
            ...prev,
            reviewer: e.target.value
          }))} className="w-full p-2 border rounded-md bg-fuchsia-500">
              <option value="Direct Manager">Direct Manager</option>
              <option value="HR Manager">HR Manager</option>
              <option value="Department Head">Department Head</option>
              <option value="CEO">CEO</option>
            </select>
          </div>
          <div>
            <Label htmlFor="dueDate">Due Date *</Label>
            <Input id="dueDate" type="date" value={reviewForm.dueDate} onChange={e => onFormChange(prev => ({
            ...prev,
            dueDate: e.target.value
          }))} />
          </div>
        </div>
        <div>
          <Label htmlFor="goals">Review Goals/Notes</Label>
          <textarea id="goals" value={reviewForm.goals} onChange={e => onFormChange(prev => ({
          ...prev,
          goals: e.target.value
        }))} placeholder="Enter review objectives and goals..." className="w-full p-2 border rounded-md h-24 resize-none" />
        </div>
        <div className="flex gap-2">
          <Button onClick={onSubmit}>Schedule Review</Button>
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
        </div>
      </CardContent>
    </Card>;
};
export default PerformanceReviewForm;