
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Bell, Save, RefreshCw } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface NotificationTypes {
  leaveRequests: boolean;
  payrollProcessing: boolean;
  performanceReviews: boolean;
  attendanceAlerts: boolean;
  newEmployeeOnboarding: boolean;
  policyUpdates: boolean;
  systemMaintenance: boolean;
  birthdayReminders: boolean;
}

interface NotificationsSettingsProps {
  initialEmailNotifications?: boolean;
  initialSmsNotifications?: boolean;
  initialNotificationTypes?: NotificationTypes;
}

const NotificationsSettings = ({ 
  initialEmailNotifications = true,
  initialSmsNotifications = false,
  initialNotificationTypes 
}: NotificationsSettingsProps) => {
  const { toast } = useToast();
  
  // Notification Settings State
  const [emailNotifications, setEmailNotifications] = useState(initialEmailNotifications);
  const [smsNotifications, setSmsNotifications] = useState(initialSmsNotifications);
  const [notificationTypes, setNotificationTypes] = useState<NotificationTypes>(initialNotificationTypes || {
    leaveRequests: true,
    payrollProcessing: true,
    performanceReviews: true,
    attendanceAlerts: false,
    newEmployeeOnboarding: true,
    policyUpdates: true,
    systemMaintenance: true,
    birthdayReminders: false
  });

  const [isSaving, setIsSaving] = useState(false);

  // Notification Handlers
  const handleNotificationTypeChange = (type: string, value: boolean) => {
    setNotificationTypes(prev => ({ ...prev, [type]: value }));
  };

  const handleSaveNotifications = async () => {
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      toast({
        title: "Notifications Updated",
        description: "Notification preferences saved successfully.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Notification Settings
        </CardTitle>
        <CardDescription>Configure system notifications and alerts</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Email Notifications</h4>
              <p className="text-sm text-gray-600">Receive important updates via email</p>
            </div>
            <Switch 
              checked={emailNotifications} 
              onCheckedChange={setEmailNotifications}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">SMS Notifications</h4>
              <p className="text-sm text-gray-600">Receive urgent alerts via SMS</p>
            </div>
            <Switch 
              checked={smsNotifications} 
              onCheckedChange={setSmsNotifications}
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-semibold">Notification Types</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              {Object.entries(notificationTypes).slice(0, 4).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <Switch 
                    checked={value} 
                    onCheckedChange={(checked) => handleNotificationTypeChange(key, checked)}
                  />
                </div>
              ))}
            </div>
            <div className="space-y-3">
              {Object.entries(notificationTypes).slice(4).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <Switch 
                    checked={value} 
                    onCheckedChange={(checked) => handleNotificationTypeChange(key, checked)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <Button onClick={handleSaveNotifications} disabled={isSaving}>
          {isSaving ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Notification Settings
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default NotificationsSettings;
