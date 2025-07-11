
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Users, Calendar, Trash2 } from 'lucide-react';
import { ScheduleEvent, getTypeColor } from './scheduleUtils';

interface ScheduleEventCardProps {
  event: ScheduleEvent;
  onDelete: (id: number) => void;
  showDate?: boolean;
}

const ScheduleEventCard = ({ event, onDelete, showDate = false }: ScheduleEventCardProps) => {
  return (
    <div className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
      <div className="flex flex-col items-center gap-1 min-w-[80px]">
        {showDate ? (
          <>
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium">{event.date}</span>
          </>
        ) : (
          <>
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium">{event.time}</span>
          </>
        )}
      </div>
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <h4 className="font-medium">{event.title}</h4>
          <Badge className={getTypeColor(event.type)}>
            {event.type}
          </Badge>
        </div>
        {event.description && (
          <p className="text-sm text-gray-600">{event.description}</p>
        )}
        <div className="flex items-center gap-4 text-sm text-gray-600">
          {showDate && (
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{event.time}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            <span>{event.attendees} attendees</span>
          </div>
        </div>
      </div>
      <div className="flex gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(event.id)}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default ScheduleEventCard;
