
import { Button } from "@/components/ui/button";
import { Trash2 } from 'lucide-react';
import { Holiday } from '@/services/leave/leaveService';
import { useToast } from "@/hooks/use-toast";

interface HolidayCalendarProps {
  holidays: Holiday[];
  onDeleteHoliday: (id: string) => void;
}

const HolidayCalendar = ({ holidays, onDeleteHoliday }: HolidayCalendarProps) => {
  const { toast } = useToast();

  const getHolidayColor = (type: string) => {
    switch (type) {
      case 'National': return 'bg-red-50 border-red-200 text-red-800';
      case 'Company': return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'Regional': return 'bg-green-50 border-green-200 text-green-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const handleDeleteHoliday = (id: string) => {
    if (confirm('Are you sure you want to delete this holiday?')) {
      onDeleteHoliday(id);
      toast({
        title: "Holiday Deleted",
        description: "The holiday has been removed from the calendar."
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {holidays.map((holiday) => (
          <div key={holiday.id} className={`p-4 border rounded-lg ${getHolidayColor(holiday.type)}`}>
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">{holiday.name}</h4>
                <p className="text-sm">{holiday.date}</p>
                <p className="text-xs mt-1">{holiday.type} Holiday</p>
                {holiday.description && (
                  <p className="text-xs mt-1 opacity-75">{holiday.description}</p>
                )}
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-red-600 hover:text-red-700"
                onClick={() => handleDeleteHoliday(holiday.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HolidayCalendar;
