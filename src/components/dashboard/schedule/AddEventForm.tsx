
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface AddEventFormProps {
  onAddEvent: (event: any) => void;
  onCancel: () => void;
}

const AddEventForm = ({ onAddEvent, onCancel }: AddEventFormProps) => {
  const [newEvent, setNewEvent] = useState({
    title: '',
    time: '',
    location: '',
    attendees: 1,
    type: 'meeting' as const,
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = () => {
    onAddEvent(newEvent);
    setNewEvent({
      title: '',
      time: '',
      location: '',
      attendees: 1,
      type: 'meeting',
      description: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Event</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="title">Event Title *</Label>
            <Input
              id="title"
              value={newEvent.title}
              onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter event title"
            />
          </div>
          <div>
            <Label htmlFor="date">Date *</Label>
            <Input
              id="date"
              type="date"
              value={newEvent.date}
              onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="time">Time *</Label>
            <Input
              id="time"
              value={newEvent.time}
              onChange={(e) => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
              placeholder="e.g., 09:00 - 10:00"
            />
          </div>
          <div>
            <Label htmlFor="location">Location *</Label>
            <Input
              id="location"
              value={newEvent.location}
              onChange={(e) => setNewEvent(prev => ({ ...prev, location: e.target.value }))}
              placeholder="Enter location"
            />
          </div>
          <div>
            <Label htmlFor="attendees">Attendees</Label>
            <Input
              id="attendees"
              type="number"
              min="1"
              value={newEvent.attendees}
              onChange={(e) => setNewEvent(prev => ({ ...prev, attendees: parseInt(e.target.value) || 1 }))}
            />
          </div>
          <div>
            <Label htmlFor="type">Type</Label>
            <select
              id="type"
              value={newEvent.type}
              onChange={(e) => setNewEvent(prev => ({ ...prev, type: e.target.value as any }))}
              className="w-full p-2 border rounded-md"
            >
              <option value="meeting">Meeting</option>
              <option value="review">Review</option>
              <option value="training">Training</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={newEvent.description}
            onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Enter event description (optional)"
          />
        </div>
        <div className="flex gap-2">
          <Button onClick={handleSubmit}>Add Event</Button>
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddEventForm;
