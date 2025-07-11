import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Download, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { ThemeProvider } from '@/components/ThemeProvider';
import CompanySettings from '@/components/settings/CompanySettings';
import PermissionsSettings from '@/components/settings/PermissionsSettings';
import NotificationsSettings from '@/components/settings/NotificationsSettings';
import IntegrationsSettings from '@/components/settings/IntegrationsSettings';
import AppearanceSettings from '@/components/settings/AppearanceSettings';
import BackupSettings from '@/components/settings/BackupSettings';
const SystemSettings = () => {
  const navigate = useNavigate();
  const {
    toast
  } = useToast();

  // Loading States
  const [isExporting, setIsExporting] = useState(false);

  // Export Settings Handler
  const handleExportSettings = async () => {
    setIsExporting(true);
    try {
      const settings = {
        company: {
          name: 'EMP SYNC Inc.',
          address: '123 Business Street, City, State 12345',
          phone: '+1 (555) 123-4567',
          email: 'contact@empsync.com',
          website: 'https://www.empsync.com',
          industry: 'Technology',
          timezone: 'UTC-8',
          currency: 'USD'
        },
        notifications: {
          email: true,
          sms: false,
          types: {
            leaveRequests: true,
            payrollProcessing: true,
            performanceReviews: true,
            attendanceAlerts: false,
            newEmployeeOnboarding: true,
            policyUpdates: true,
            systemMaintenance: true,
            birthdayReminders: false
          }
        },
        appearance: {
          darkMode: false,
          colorScheme: 'blue'
        },
        backup: {
          dailyBackups: true,
          weeklyFullBackup: true,
          cloudStorage: false,
          retentionDays: 30
        },
        exportedAt: new Date().toISOString()
      };
      const blob = new Blob([JSON.stringify(settings, null, 2)], {
        type: 'application/json'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `empsync-settings-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast({
        title: "Export Complete",
        description: "Settings have been exported successfully."
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export settings.",
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
    }
  };
  return <ThemeProvider defaultTheme="system" storageKey="empsync-ui-theme">
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" onClick={() => navigate('/dashboard')} className="bg-yellow-500 hover:bg-yellow-400">
                  ← Back to Dashboard
                </Button>
                <div className="flex items-center space-x-2">
                  <Settings className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                  <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">System Settings</h1>
                </div>
              </div>
              <Button className="bg-gray-600 hover:bg-gray-700" onClick={handleExportSettings} disabled={isExporting}>
                {isExporting ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
                {isExporting ? 'Exporting...' : 'Export Settings'}
              </Button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Tabs defaultValue="company" className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="company">Company</TabsTrigger>
              <TabsTrigger value="permissions">Permissions</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="integrations">Integrations</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="backup">Backup</TabsTrigger>
            </TabsList>

            <TabsContent value="company" className="space-y-6">
              <CompanySettings />
            </TabsContent>

            <TabsContent value="permissions" className="space-y-6">
              <PermissionsSettings />
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <NotificationsSettings />
            </TabsContent>

            <TabsContent value="integrations" className="space-y-6">
              <IntegrationsSettings />
            </TabsContent>

            <TabsContent value="appearance" className="space-y-6">
              <AppearanceSettings />
            </TabsContent>

            <TabsContent value="backup" className="space-y-6">
              <BackupSettings onExportSettings={handleExportSettings} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ThemeProvider>;
};
export default SystemSettings;