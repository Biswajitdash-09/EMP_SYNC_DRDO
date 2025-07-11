
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Settings } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface Integration {
  id: number;
  name: string;
  status: 'Connected' | 'Disconnected';
  description: string;
  config: Record<string, any>;
}

interface IntegrationsSettingsProps {
  initialIntegrations?: Integration[];
}

const IntegrationsSettings = ({ initialIntegrations }: IntegrationsSettingsProps) => {
  const { toast } = useToast();
  
  // Integrations State
  const [integrations, setIntegrations] = useState<Integration[]>(initialIntegrations || [
    { id: 1, name: 'Slack', status: 'Connected', description: 'Team communication and notifications', config: {} },
    { id: 2, name: 'Google Workspace', status: 'Connected', description: 'Calendar and email integration', config: {} },
    { id: 3, name: 'Zoom', status: 'Disconnected', description: 'Video conferencing for meetings', config: {} },
    { id: 4, name: 'Microsoft Teams', status: 'Disconnected', description: 'Collaboration and meetings', config: {} }
  ]);

  // API Settings Modal State
  const [isApiModalOpen, setIsApiModalOpen] = useState(false);
  const [apiSettings, setApiSettings] = useState({
    apiKey: '',
    webhookUrl: '',
    description: ''
  });

  // Integration Handlers
  const handleToggleIntegration = (integrationId: number) => {
    setIntegrations(prev => prev.map(integration => 
      integration.id === integrationId 
        ? { ...integration, status: integration.status === 'Connected' ? 'Disconnected' : 'Connected' }
        : integration
    ));
    
    const integration = integrations.find(i => i.id === integrationId);
    const newStatus = integration?.status === 'Connected' ? 'Disconnected' : 'Connected';
    
    toast({
      title: `Integration ${newStatus}`,
      description: `${integration?.name} has been ${newStatus.toLowerCase()}.`,
    });
  };

  const handleManageApiSettings = () => {
    setIsApiModalOpen(true);
  };

  const handleSaveApiSettings = () => {
    if (!apiSettings.apiKey.trim()) {
      toast({
        title: "Validation Error",
        description: "API Key is required.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "API Settings Saved",
      description: "Your API configuration has been updated successfully.",
    });

    setIsApiModalOpen(false);
    setApiSettings({ apiKey: '', webhookUrl: '', description: '' });
  };

  const handleCancelApiSettings = () => {
    setIsApiModalOpen(false);
    setApiSettings({ apiKey: '', webhookUrl: '', description: '' });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Integration Settings</CardTitle>
          <CardDescription>Connect with third-party tools and services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {integrations.map((integration) => (
              <div key={integration.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">{integration.name}</h4>
                  <p className="text-sm text-gray-600">{integration.description}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge 
                    variant={integration.status === 'Connected' ? 'default' : 'secondary'}
                    className={integration.status === 'Connected' ? 'bg-green-100 text-green-800' : ''}
                  >
                    {integration.status}
                  </Badge>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className={integration.status === 'Connected' ? 'text-red-600' : 'text-blue-600'}
                    onClick={() => handleToggleIntegration(integration.id)}
                  >
                    {integration.status === 'Connected' ? 'Disconnect' : 'Connect'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">API Access</h4>
            <p className="text-sm text-blue-700 mb-3">
              Configure API keys and webhooks for custom integrations
            </p>
            <Button variant="outline" size="sm" onClick={handleManageApiSettings}>
              <Settings className="w-4 h-4 mr-2" />
              Manage API Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* API Settings Modal */}
      <Dialog open={isApiModalOpen} onOpenChange={setIsApiModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>API Settings</DialogTitle>
            <DialogDescription>
              Configure API keys and webhook URLs for custom integrations
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                type="password"
                value={apiSettings.apiKey}
                onChange={(e) => setApiSettings(prev => ({ ...prev, apiKey: e.target.value }))}
                placeholder="Enter your API key"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="webhookUrl">Webhook URL</Label>
              <Input
                id="webhookUrl"
                value={apiSettings.webhookUrl}
                onChange={(e) => setApiSettings(prev => ({ ...prev, webhookUrl: e.target.value }))}
                placeholder="https://your-app.com/webhook"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="apiDescription">Description</Label>
              <Textarea
                id="apiDescription"
                value={apiSettings.description}
                onChange={(e) => setApiSettings(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the purpose of this API integration"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancelApiSettings}>
              Cancel
            </Button>
            <Button onClick={handleSaveApiSettings}>
              Save Settings
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default IntegrationsSettings;
