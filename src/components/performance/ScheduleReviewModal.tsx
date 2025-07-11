
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, User, Clock } from 'lucide-react';

interface ScheduleReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSchedule: (review: any) => void;
}

const ScheduleReviewModal = ({ isOpen, onClose, onSchedule }: ScheduleReviewModalProps) => {
  const [reviewData, setReviewData] = useState({
    employee: '',
    type: 'Self',
    dueDate: '',
    description: ''
  });

  const employees = [
    'John Smith',
    'Sarah Johnson', 
    'Mike Chen',
    'Alice Johnson',
    'Robert Davis'
  ];

  const handleSubmit = () => {
    if (reviewData.employee && reviewData.dueDate) {
      onSchedule({
        employeeId: 'perf1', // In a real app, this would be mapped from employee name
        employee: reviewData.employee,
        type: reviewData.type,
        status: 'Pending',
        dueDate: reviewData.dueDate,
        description: reviewData.description
      });
      setReviewData({ employee: '', type: 'Self', dueDate: '', description: '' });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Schedule Performance Review
          </DialogTitle>
          <DialogDescription>
            Schedule a new performance review for an employee
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="employee">Employee *</Label>
            <Select value={reviewData.employee} onValueChange={(value) => 
              setReviewData(prev => ({ ...prev, employee: value }))
            }>
              <SelectTrigger>
                <SelectValue placeholder="Select employee" />
              </SelectTrigger>
              <SelectContent>
                {employees.map(emp => (
                  <SelectItem key={emp} value={emp}>{emp}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="type">Review Type *</Label>
            <Select value={reviewData.type} onValueChange={(value) => 
              setReviewData(prev => ({ ...prev, type: value }))
            }>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Self">Self Review</SelectItem>
                <SelectItem value="Manager">Manager Review</SelectItem>
                <SelectItem value="Peer">Peer Review</SelectItem>
                <SelectItem value="360">360° Review</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="dueDate">Due Date *</Label>
            <Input
              id="dueDate"
              type="date"
              value={reviewData.dueDate}
              onChange={(e) => setReviewData(prev => ({ ...prev, dueDate: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Review objectives and notes..."
              value={reviewData.description}
              onChange={(e) => setReviewData(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button onClick={handleSubmit} className="flex-1">
              <Clock className="w-4 h-4 mr-2" />
              Schedule Review
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleReviewModal;
