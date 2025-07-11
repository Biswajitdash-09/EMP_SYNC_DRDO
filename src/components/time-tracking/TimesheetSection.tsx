
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Plus, Download, Upload } from 'lucide-react';
import { useState } from 'react';
import { TimeEntry } from '@/hooks/time-tracking/useTimeTrackingCore';

interface TimesheetSectionProps {
  onAddEntry: (entry: Partial<TimeEntry>) => void;
  todayEntries?: TimeEntry[];
}

const TimesheetSection = ({ onAddEntry, todayEntries = [] }: TimesheetSectionProps) => {
  const [formData, setFormData] = useState({
    project: '',
    startTime: '',
    endTime: '',
    description: '',
    category: 'development'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.project || !formData.startTime || !formData.endTime) {
      return;
    }

    // Calculate hours (simplified - in production, use proper time parsing)
    const startHour = parseInt(formData.startTime.split(':')[0]);
    const endHour = parseInt(formData.endTime.split(':')[0]);
    const totalHours = endHour - startHour;

    onAddEntry({
      project: formData.project,
      clockIn: formatTime(formData.startTime),
      clockOut: formatTime(formData.endTime),
      totalHours: totalHours > 0 ? totalHours : 0,
      description: formData.description,
      status: 'clocked-out'
    });

    // Reset form
    setFormData({
      project: '',
      startTime: '',
      endTime: '',
      description: '',
      category: 'development'
    });
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const exportTimesheet = () => {
    // In production, this would generate and download a CSV/PDF
    console.log('Exporting timesheet...');
  };

  const importTimesheet = () => {
    // In production, this would open a file picker
    console.log('Importing timesheet...');
  };

  const totalHoursToday = todayEntries.reduce((sum, entry) => sum + entry.totalHours, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Timesheet Management
        </CardTitle>
        <CardDescription>
          Track detailed work hours and manage time entries efficiently
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Time Entry Form */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-lg">Add Time Entry</h4>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={importTimesheet}>
                  <Upload className="w-4 h-4 mr-1" />
                  Import
                </Button>
                <Button variant="outline" size="sm" onClick={exportTimesheet}>
                  <Download className="w-4 h-4 mr-1" />
                  Export
                </Button>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="project">Project/Task *</Label>
                  <Select 
                    value={formData.project} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, project: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="website-development">Website Development</SelectItem>
                      <SelectItem value="mobile-app">Mobile App</SelectItem>
                      <SelectItem value="api-development">API Development</SelectItem>
                      <SelectItem value="testing">Testing & QA</SelectItem>
                      <SelectItem value="meetings">Meetings</SelectItem>
                      <SelectItem value="training">Training</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="development">Development</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="meetings">Meetings</SelectItem>
                      <SelectItem value="research">Research</SelectItem>
                      <SelectItem value="admin">Administrative</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time *</Label>
                  <Input 
                    id="startTime" 
                    type="time" 
                    value={formData.startTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time *</Label>
                  <Input 
                    id="endTime" 
                    type="time" 
                    value={formData.endTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="What did you work on?"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>

              <Button type="submit" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Time Entry
              </Button>
            </form>
          </div>

          {/* Today's Time Log */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-lg">Today's Time Log</h4>
              <div className="text-sm text-gray-600">
                Total: <span className="font-semibold text-indigo-600">{totalHoursToday}h</span>
              </div>
            </div>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {todayEntries.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p>No time entries for today</p>
                  <p className="text-sm">Add your first entry to get started</p>
                </div>
              ) : (
                todayEntries.map((entry, index) => (
                  <div key={entry.id || index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-medium text-gray-900">{entry.project || 'Untitled Task'}</h5>
                      <span className="text-sm font-semibold text-indigo-600">
                        {entry.totalHours}h
                      </span>
                    </div>
                    
                    {entry.description && (
                      <p className="text-sm text-gray-600 mb-2">{entry.description}</p>
                    )}
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{entry.clockIn} - {entry.clockOut || 'In Progress'}</span>
                      {entry.overtime > 0 && (
                        <span className="text-orange-600 font-medium">
                          +{entry.overtime}h overtime
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-lg font-bold text-blue-600">{totalHoursToday}h</div>
            <div className="text-sm text-blue-700">Today</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-lg font-bold text-green-600">37.5h</div>
            <div className="text-sm text-green-700">This Week</div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <div className="text-lg font-bold text-purple-600">168h</div>
            <div className="text-sm text-purple-700">This Month</div>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <div className="text-lg font-bold text-orange-600">2.5h</div>
            <div className="text-sm text-orange-700">Overtime</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimesheetSection;
