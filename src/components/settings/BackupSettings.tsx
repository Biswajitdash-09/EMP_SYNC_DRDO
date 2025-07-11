
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Download, Upload, RefreshCw } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface BackupSettings {
  dailyBackups: boolean;
  weeklyFullBackup: boolean;
  cloudStorage: boolean;
  retentionDays: number;
}

interface BackupSettingsProps {
  initialBackupSettings?: BackupSettings;
  onExportSettings?: () => void;
}

const BackupSettings = ({ 
  initialBackupSettings,
  onExportSettings
}: BackupSettingsProps) => {
  const { toast } = useToast();
  
  // Backup Settings State
  const [backupSettings, setBackupSettings] = useState<BackupSettings>(initialBackupSettings || {
    dailyBackups: true,
    weeklyFullBackup: true,
    cloudStorage: false,
    retentionDays: 30
  });

  const [isBackingUp, setIsBackingUp] = useState(false);

  // Backup Handlers
  const handleBackupSettingChange = (setting: string, value: boolean | number) => {
    setBackupSettings(prev => ({ ...prev, [setting]: value }));
  };

  const handleCreateBackup = async () => {
    setIsBackingUp(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast({
        title: "Backup Created",
        description: "System backup has been created successfully.",
      });
    } catch (error) {
      toast({
        title: "Backup Failed",
        description: "Failed to create system backup.",
        variant: "destructive",
      });
    } finally {
      setIsBackingUp(false);
    }
  };

  const handleRestoreBackup = () => {
    toast({
      title: "Restore Initiated",
      description: "Backup restoration process has been started.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Backup & Restore</CardTitle>
        <CardDescription>Manage system backups and data restoration</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold">Automatic Backups</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Daily Backups</span>
                <Switch 
                  checked={backupSettings.dailyBackups} 
                  onCheckedChange={(checked) => handleBackupSettingChange('dailyBackups', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Weekly Full Backup</span>
                <Switch 
                  checked={backupSettings.weeklyFullBackup} 
                  onCheckedChange={(checked) => handleBackupSettingChange('weeklyFullBackup', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Cloud Storage</span>
                <Switch 
                  checked={backupSettings.cloudStorage} 
                  onCheckedChange={(checked) => handleBackupSettingChange('cloudStorage', checked)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="retention">Backup Retention (days)</Label>
              <Input 
                id="retention" 
                value={backupSettings.retentionDays} 
                type="number" 
                min="1"
                max="365"
                onChange={(e) => handleBackupSettingChange('retentionDays', parseInt(e.target.value) || 30)}
              />
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold">Manual Operations</h4>
            <div className="space-y-3">
              <Button 
                className="w-full" 
                onClick={handleCreateBackup}
                disabled={isBackingUp}
              >
                {isBackingUp ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Creating Backup...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Create Backup Now
                  </>
                )}
              </Button>
              <Button variant="outline" className="w-full" onClick={handleRestoreBackup}>
                <Upload className="w-4 h-4 mr-2" />
                Restore from Backup
              </Button>
              <Button variant="outline" className="w-full" onClick={onExportSettings}>
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <h4 className="font-semibold">Recent Backups</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <h5 className="font-medium">Full System Backup</h5>
                <p className="text-sm text-gray-600">June 21, 2024 at 2:00 AM</p>
              </div>
              <div className="flex gap-2">
                <Badge className="bg-green-100 text-green-800">Completed</Badge>
                <Button variant="outline" size="sm" onClick={handleRestoreBackup}>
                  Restore
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <h5 className="font-medium">Daily Incremental Backup</h5>
                <p className="text-sm text-gray-600">June 20, 2024 at 11:30 PM</p>
              </div>
              <div className="flex gap-2">
                <Badge className="bg-green-100 text-green-800">Completed</Badge>
                <Button variant="outline" size="sm" onClick={handleRestoreBackup}>
                  Restore
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BackupSettings;
