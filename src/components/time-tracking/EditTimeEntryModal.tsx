
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TimeEntry } from '@/hooks/time-tracking/useTimeTrackingCore';

interface EditTimeEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  entry: TimeEntry | null;
  onSave: (entry: TimeEntry) => void;
  onDelete: (entryId: string) => void;
}

const EditTimeEntryModal = ({ isOpen, onClose, entry, onSave, onDelete }: EditTimeEntryModalProps) => {
  const [formData, setFormData] = useState({
    clockIn: '',
    clockOut: '',
    project: '',
    description: '',
    status: 'clocked-out' as 'clocked-in' | 'clocked-out' | 'break'
  });

  // Update form data when entry changes
  useEffect(() => {
    if (entry) {
      setFormData({
        clockIn: entry.clockIn || '',
        clockOut: entry.clockOut || '',
        project: entry.project || '',
        description: entry.description || '',
        status: entry.status
      });
    }
  }, [entry]);

  const handleSave = () => {
    if (!entry) return;

    // Calculate hours (simplified - in production, use proper time parsing)
    const totalHours = formData.clockOut ? 8.5 : 0;

    const updatedEntry: TimeEntry = {
      ...entry,
      clockIn: formData.clockIn,
      clockOut: formData.clockOut,
      project: formData.project,
      description: formData.description,
      status: formData.status,
      totalHours,
      overtime: totalHours > 8 ? totalHours - 8 : 0
    };

    onSave(updatedEntry);
    onClose();
  };

  const handleDelete = () => {
    if (entry && window.confirm('Are you sure you want to delete this time entry?')) {
      onDelete(entry.id);
      onClose();
    }
  };

  if (!entry) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Time Entry</DialogTitle>
          <DialogDescription>
            Modify the time entry details for {entry.employeeName}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clockIn">Clock In</Label>
              <Input
                id="clockIn"
                value={formData.clockIn}
                onChange={(e) => setFormData(prev => ({ ...prev, clockIn: e.target.value }))}
                placeholder="9:00 AM"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clockOut">Clock Out</Label>
              <Input
                id="clockOut"
                value={formData.clockOut}
                onChange={(e) => setFormData(prev => ({ ...prev, clockOut: e.target.value }))}
                placeholder="5:00 PM"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="project">Project</Label>
            <Select 
              value={formData.project} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, project: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select project" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Website Development">Website Development</SelectItem>
                <SelectItem value="Mobile App">Mobile App</SelectItem>
                <SelectItem value="API Development">API Development</SelectItem>
                <SelectItem value="Testing">Testing & QA</SelectItem>
                <SelectItem value="Meetings">Meetings</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select 
              value={formData.status} 
              onValueChange={(value: 'clocked-in' | 'clocked-out' | 'break') => setFormData(prev => ({ ...prev, status: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="clocked-in">Clocked In</SelectItem>
                <SelectItem value="clocked-out">Clocked Out</SelectItem>
                <SelectItem value="break">On Break</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="What was worked on..."
              rows={3}
            />
          </div>
        </div>

        <DialogFooter className="flex justify-between">
          <Button variant="destructive" onClick={handleDelete}>
            Delete Entry
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditTimeEntryModal;
