
export interface ScheduleEvent {
  id: number;
  title: string;
  time: string;
  location: string;
  attendees: number;
  type: 'meeting' | 'review' | 'maintenance' | 'training';
  status: 'upcoming' | 'completed' | 'cancelled';
  description?: string;
  date: string;
}

export const getTypeColor = (type: string) => {
  switch (type) {
    case 'meeting': return 'bg-blue-100 text-blue-800';
    case 'review': return 'bg-purple-100 text-purple-800';
    case 'maintenance': return 'bg-orange-100 text-orange-800';
    case 'training': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const generateScheduleExportContent = (todaySchedule: ScheduleEvent[], upcomingEvents: ScheduleEvent[]) => {
  return `
SCHEDULE EXPORT - ${new Date().toLocaleDateString()}
==============================================

TODAY'S SCHEDULE (${new Date().toLocaleDateString()}):
${todaySchedule.map(event => `
• ${event.title}
  Time: ${event.time}
  Location: ${event.location}
  Attendees: ${event.attendees}
  Type: ${event.type}
  Description: ${event.description || 'No description'}
`).join('\n')}

UPCOMING EVENTS:
${upcomingEvents.map(event => `
• ${event.title}
  Date: ${event.date}
  Time: ${event.time}
  Location: ${event.location}
  Attendees: ${event.attendees}
  Type: ${event.type}
  Description: ${event.description || 'No description'}
`).join('\n')}

SUMMARY:
Total Events: ${todaySchedule.length + upcomingEvents.length}
Today's Events: ${todaySchedule.length}
Upcoming Events: ${upcomingEvents.length}

Generated on: ${new Date().toLocaleString()}
    `.trim();
};

export const downloadFile = (content: string, filename: string) => {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
