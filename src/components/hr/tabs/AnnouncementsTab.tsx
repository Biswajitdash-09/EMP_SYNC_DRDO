
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare } from 'lucide-react';

interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Published' | 'Draft';
}

interface AnnouncementsTabProps {
  announcements: Announcement[];
  onEditAnnouncement: (announcement: Announcement) => void;
  onDeleteAnnouncement: (id: string) => void;
  onCreateAnnouncement: () => void;
}

const AnnouncementsTab = ({
  announcements,
  onEditAnnouncement,
  onDeleteAnnouncement,
  onCreateAnnouncement
}: AnnouncementsTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          HR Announcements
        </CardTitle>
        <CardDescription>Company-wide announcements and updates ({announcements.length} announcements)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {announcements.map(announcement => (
          <div key={announcement.id} className="p-4 border rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{announcement.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{announcement.content}</p>
                <p className="text-xs text-gray-500 mt-2">
                  By {announcement.author} • {announcement.date}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded text-xs ${
                  announcement.priority === 'High' ? 'bg-red-100 text-red-800' : 
                  announcement.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-green-100 text-green-800'
                }`}>
                  {announcement.priority}
                </span>
                <span className={`px-2 py-1 rounded text-xs ${
                  announcement.status === 'Published' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {announcement.status}
                </span>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <Button variant="outline" size="sm" onClick={() => onEditAnnouncement(announcement)}>
                Edit
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onDeleteAnnouncement(announcement.id)}>
                Delete
              </Button>
            </div>
          </div>
        ))}
        <Button className="w-full" variant="outline" onClick={onCreateAnnouncement}>
          <MessageSquare className="w-4 h-4 mr-2" />
          Create New Announcement
        </Button>
      </CardContent>
    </Card>
  );
};

export default AnnouncementsTab;
