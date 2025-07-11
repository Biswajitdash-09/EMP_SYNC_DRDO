
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Plus, Download } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import AddEventForm from './schedule/AddEventForm';
import ScheduleEventCard from './schedule/ScheduleEventCard';
import ScheduleStats from './schedule/ScheduleStats';
import { ScheduleEvent, generateScheduleExportContent, downloadFile } from './schedule/scheduleUtils';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ScheduleModal = ({ isOpen, onClose }: ScheduleModalProps) => {
  const { toast } = useToast();
  const [showAddEvent, setShowAddEvent] = useState(false);

  // Mock schedule data with more comprehensive information
  const [todaySchedule, setTodaySchedule] = useState<ScheduleEvent[]>([
    {
      id: 1,
      title: 'Team Standup Meeting',
      time: '09:00 - 09:30',
      location: 'Conference Room A',
      attendees: 8,
      type: 'meeting',
      status: 'upcoming',
      description: 'Daily standup to discuss progress and blockers',
      date: new Date().toISOString().split('T')[0]
    },
    {
      id: 2,
      title: 'HR Policy Review',
      time: '11:00 - 12:00',
      location: 'HR Office',
      attendees: 4,
      type: 'review',
      status: 'upcoming',
      description: 'Review updated HR policies and procedures',
      date: new Date().toISOString().split('T')[0]
    },
    {
      id: 3,
      title: 'Employee Performance Reviews',
      time: '14:00 - 16:00',
      location: 'Meeting Room B',
      attendees: 3,
      type: 'review',
      status: 'upcoming',
      description: 'Quarterly performance review sessions',
      date: new Date().toISOString().split('T')[0]
    },
    {
      id: 4,
      title: 'System Maintenance Check',
      time: '16:30 - 17:00',
      location: 'Server Room',
      attendees: 2,
      type: 'maintenance',
      status: 'upcoming',
      description: 'Regular system health check and updates',
      date: new Date().toISOString().split('T')[0]
    }
  ]);

  const [upcomingEvents, setUpcomingEvents] = useState<ScheduleEvent[]>([
    {
      id: 5,
      title: 'Monthly Board Meeting',
      date: 'Tomorrow',
      time: '10:00 - 11:30',
      location: 'Boardroom',
      type: 'meeting',
      attendees: 12,
      status: 'upcoming',
      description: 'Monthly board meeting to discuss company progress'
    },
    {
      id: 6,
      title: 'New Employee Orientation',
      date: 'Friday',
      time: '09:00 - 17:00',
      location: 'Training Room',
      type: 'training',
      attendees: 6,
      status: 'upcoming',
      description: 'Comprehensive orientation for new hires'
    },
    {
      id: 7,
      title: 'Quarterly Review Meeting',
      date: 'Next Week',
      time: '14:00 - 16:00',
      location: 'Conference Room A',
      type: 'review',
      attendees: 15,
      status: 'upcoming',
      description: 'Q2 performance and goals review'
    }
  ]);

  const handleAddEvent = (eventData: any) => {
    if (!eventData.title || !eventData.time || !eventData.location) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const event: ScheduleEvent = {
      id: Date.now(),
      ...eventData,
      status: 'upcoming'
    };

    if (eventData.date === new Date().toISOString().split('T')[0]) {
      setTodaySchedule(prev => [...prev, event]);
    } else {
      setUpcomingEvents(prev => [...prev, event]);
    }

    setShowAddEvent(false);
    
    toast({
      title: "Event Added",
      description: "New event has been added to your schedule.",
    });
  };

  const handleDeleteEvent = (id: number, isToday: boolean) => {
    if (isToday) {
      setTodaySchedule(prev => prev.filter(event => event.id !== id));
    } else {
      setUpcomingEvents(prev => prev.filter(event => event.id !== id));
    }
    
    toast({
      title: "Event Deleted",
      description: "Event has been removed from your schedule.",
    });
  };

  const handleExportSchedule = () => {
    const content = generateScheduleExportContent(todaySchedule, upcomingEvents);
    const filename = `schedule-export-${new Date().toISOString().split('T')[0]}.txt`;
    
    downloadFile(content, filename);

    toast({
      title: "Schedule Exported",
      description: "Your schedule has been downloaded successfully.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            My Schedule
            <div className="ml-auto flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportSchedule}
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAddEvent(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Event
              </Button>
            </div>
          </DialogTitle>
          <DialogDescription>
            View and manage your upcoming meetings, tasks, and events
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Add Event Form */}
          {showAddEvent && (
            <AddEventForm
              onAddEvent={handleAddEvent}
              onCancel={() => setShowAddEvent(false)}
            />
          )}

          {/* Today's Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Today's Schedule</CardTitle>
              <CardDescription>
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todaySchedule.map((event) => (
                  <ScheduleEventCard
                    key={event.id}
                    event={event}
                    onDelete={(id) => handleDeleteEvent(id, true)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Events</CardTitle>
              <CardDescription>
                Your scheduled events for the coming days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <ScheduleEventCard
                    key={event.id}
                    event={event}
                    onDelete={(id) => handleDeleteEvent(id, false)}
                    showDate={true}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <ScheduleStats
            todayCount={todaySchedule.length}
            upcomingCount={upcomingEvents.length}
            totalHours={(todaySchedule.length + upcomingEvents.length) * 1.5}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleModal;
