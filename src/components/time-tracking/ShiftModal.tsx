
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShiftSchedule } from '@/hooks/time-tracking/useTimeTrackingCore';

interface ShiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  shift?: ShiftSchedule | null;
  onSave: (shift: Omit<ShiftSchedule, 'id'>) => void;
  onDelete?: (shiftId: string) => void;
}

const ShiftModal = ({ isOpen, onClose, shift, onSave, onDelete }: ShiftModalProps) => {
  const [formData, setFormData] = useState({
    employeeId: '',
    employeeName: '',
    shiftName: '',
    startTime: '',
    endTime: '',
    date: '',
    status: 'scheduled' as 'scheduled' | 'active' | 'completed' | 'missed'
  });

  useEffect(() => {
    if (shift) {
      setFormData({
        employeeId: shift.employeeId,
        employeeName: shift.employeeName,
        shiftName: shift.shiftName,
        startTime: shift.startTime,
        endTime: shift.endTime,
        date: shift.date,
        status: shift.status
      });
    } else {
      // Reset form for new shift
      setFormData({
        employeeId: '',
        employeeName: '',
        shiftName: '',
        startTime: '',
        endTime: '',
        date: new Date().toISOString().split('T')[0],
        status: 'scheduled'
      });
    }
  }, [shift, isOpen]);

  const handleSave = () => {
    if (!formData.shiftName || !formData.startTime || !formData.endTime) {
      return;
    }

    onSave(formData);
    onClose();
  };

  const handleDelete = () => {
    if (shift && onDelete && window.confirm('Are you sure you want to delete this shift?')) {
      onDelete(shift.id);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{shift ? 'Edit Shift' : 'Create New Shift'}</DialogTitle>
          <DialogDescription>
            {shift ? 'Modify the shift details' : 'Create a new shift schedule'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="shiftName">Shift Name</Label>
            <Select 
              value={formData.shiftName} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, shiftName: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select shift type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Morning Shift">Morning Shift</SelectItem>
                <SelectItem value="Evening Shift">Evening Shift</SelectItem>
                <SelectItem value="Night Shift">Night Shift</SelectItem>
                <SelectItem value="Weekend Shift">Weekend Shift</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                value={formData.startTime}
                onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                placeholder="9:00 AM"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                value={formData.endTime}
                onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                placeholder="5:00 PM"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="employeeName">Employee Name</Label>
              <Input
                id="employeeName"
                value={formData.employeeName}
                onChange={(e) => setFormData(prev => ({ ...prev, employeeName: e.target.value, employeeId: `emp${Date.now()}` }))}
                placeholder="Employee name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select 
              value={formData.status} 
              onValueChange={(value: 'scheduled' | 'active' | 'completed' | 'missed') => setFormData(prev => ({ ...prev, status: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="missed">Missed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="flex justify-between">
          {shift && onDelete && (
            <Button variant="destructive" onClick={handleDelete}>
              Delete Shift
            </Button>
          )}
          <div className="flex gap-2 ml-auto">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {shift ? 'Save Changes' : 'Create Shift'}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShiftModal;
