
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Edit, Trash2 } from 'lucide-react';
import { ShiftSchedule } from '@/hooks/time-tracking/useTimeTrackingCore';
import ShiftModal from './ShiftModal';

interface ShiftManagementProps {
  shifts?: ShiftSchedule[];
  onAddShift?: (shift: Omit<ShiftSchedule, 'id'>) => void;
  onUpdateShift?: (shift: ShiftSchedule) => void;
  onDeleteShift?: (shiftId: string) => void;
}

const ShiftManagement = ({ shifts, onAddShift, onUpdateShift, onDeleteShift }: ShiftManagementProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedShift, setSelectedShift] = useState<ShiftSchedule | null>(null);

  const defaultShifts: ShiftSchedule[] = [
    { 
      id: '1', 
      employeeId: 'emp1',
      employeeName: 'Multiple Employees',
      shiftName: 'Morning Shift', 
      startTime: '09:00 AM', 
      endTime: '05:00 PM', 
      date: '2024-06-21',
      status: 'scheduled'
    },
    { 
      id: '2', 
      employeeId: 'emp2',
      employeeName: 'Multiple Employees',
      shiftName: 'Evening Shift', 
      startTime: '02:00 PM', 
      endTime: '10:00 PM', 
      date: '2024-06-21',
      status: 'scheduled'
    },
    { 
      id: '3', 
      employeeId: 'emp3',
      employeeName: 'Multiple Employees',
      shiftName: 'Night Shift', 
      startTime: '10:00 PM', 
      endTime: '06:00 AM', 
      date: '2024-06-21',
      status: 'scheduled'
    }
  ];

  const shiftData = shifts || defaultShifts;

  // Group shifts by shift name to show employee counts
  const groupedShifts = shiftData.reduce((acc, shift) => {
    const existing = acc.find(s => s.shiftName === shift.shiftName);
    if (existing) {
      existing.employeeCount += 1;
      existing.shifts.push(shift);
    } else {
      acc.push({
        ...shift,
        employeeCount: 1,
        shifts: [shift]
      });
    }
    return acc;
  }, [] as (ShiftSchedule & { employeeCount: number; shifts: ShiftSchedule[] })[]);

  const handleCreateShift = () => {
    setSelectedShift(null);
    setIsModalOpen(true);
  };

  const handleEditShift = (shift: ShiftSchedule) => {
    setSelectedShift(shift);
    setIsModalOpen(true);
  };

  const handleSaveShift = (shiftData: Omit<ShiftSchedule, 'id'>) => {
    if (selectedShift) {
      onUpdateShift?.({ ...shiftData, id: selectedShift.id });
    } else {
      onAddShift?.(shiftData);
    }
  };

  const handleDeleteShift = (shiftId: string) => {
    if (window.confirm('Are you sure you want to delete this shift?')) {
      onDeleteShift?.(shiftId);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Shift Scheduling
          </CardTitle>
          <CardDescription>Manage employee work schedules and shifts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            {groupedShifts.map((shift) => (
              <div key={shift.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">{shift.shiftName}</h4>
                  <p className="text-sm text-gray-600">{shift.startTime} - {shift.endTime}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-medium">{shift.employeeCount} employees</p>
                    <p className="text-sm text-gray-600">assigned</p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditShift(shift.shifts[0])}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteShift(shift.shifts[0].id)}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button className="w-full" variant="outline" onClick={handleCreateShift}>
            <Calendar className="w-4 h-4 mr-2" />
            Create New Shift
          </Button>
        </CardContent>
      </Card>

      <ShiftModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        shift={selectedShift}
        onSave={handleSaveShift}
        onDelete={selectedShift ? handleDeleteShift : undefined}
      />
    </>
  );
};

export default ShiftManagement;
