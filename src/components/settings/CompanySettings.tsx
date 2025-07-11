
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building, Save, RefreshCw } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { getCompanySettings, saveCompanySettings, type CompanySettings as CompanySettingsType } from '@/services/companySettingsService';

interface CompanyData {
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  industry: string;
  timezone: string;
  currency: string;
}

const CompanySettings = () => {
  const { toast } = useToast();
  const { isAdmin } = useAuth();
  
  // Company Settings State
  const [companyData, setCompanyData] = useState<CompanyData>({
    name: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    industry: '',
    timezone: '',
    currency: ''
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load company settings on component mount
  useEffect(() => {
    const loadCompanySettings = async () => {
      try {
        setIsLoading(true);
        const settings = await getCompanySettings();
        
        if (settings) {
          setCompanyData({
            name: settings.name || '',
            address: settings.address || '',
            phone: settings.phone || '',
            email: settings.email || '',
            website: settings.website || '',
            industry: settings.industry || '',
            timezone: settings.timezone || '',
            currency: settings.currency || ''
          });
        } else {
          // Set default values if no settings exist
          setCompanyData({
            name: 'EMP SYNC Inc.',
            address: '123 Business Street, City, State 12345',
            phone: '+1 (555) 123-4567',
            email: 'contact@empsync.com',
            website: 'https://www.empsync.com',
            industry: 'Technology',
            timezone: 'UTC-8',
            currency: 'USD'
          });
        }
      } catch (error) {
        console.error('Error loading company settings:', error);
        toast({
          title: "Error",
          description: "Failed to load company settings.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (isAdmin) {
      loadCompanySettings();
    } else {
      setIsLoading(false);
    }
  }, [isAdmin, toast]);

  // Company Settings Handlers
  const handleCompanyDataChange = (field: string, value: string) => {
    setCompanyData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveCompanyData = async () => {
    if (!isAdmin) {
      toast({
        title: "Access Denied",
        description: "Only administrators can update company settings.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      await saveCompanySettings(companyData);
      toast({
        title: "Success",
        description: "Company information saved successfully.",
      });
    } catch (error) {
      console.error('Error saving company settings:', error);
      toast({
        title: "Error",
        description: "Failed to save company information.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Show access denied message for non-admins
  if (!isAdmin) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="w-5 h-5" />
            Company Profile Setup
          </CardTitle>
          <CardDescription>Access restricted to administrators only</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground">You need administrator privileges to view and modify company settings.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Show loading state
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="w-5 h-5" />
            Company Profile Setup
          </CardTitle>
          <CardDescription>Loading company information...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="w-6 h-6 animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building className="w-5 h-5" />
          Company Profile Setup
        </CardTitle>
        <CardDescription>Configure your organization's basic information and settings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="companyName">Company Name</Label>
              <Input 
                id="companyName" 
                value={companyData.name}
                onChange={(e) => handleCompanyDataChange('name', e.target.value)}
                disabled={isSaving}
              />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Textarea 
                id="address" 
                value={companyData.address}
                onChange={(e) => handleCompanyDataChange('address', e.target.value)}
                disabled={isSaving}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input 
                id="phone" 
                value={companyData.phone}
                onChange={(e) => handleCompanyDataChange('phone', e.target.value)}
                disabled={isSaving}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email"
                value={companyData.email}
                onChange={(e) => handleCompanyDataChange('email', e.target.value)}
                disabled={isSaving}
              />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="website">Website</Label>
              <Input 
                id="website" 
                value={companyData.website}
                onChange={(e) => handleCompanyDataChange('website', e.target.value)}
                disabled={isSaving}
              />
            </div>
            <div>
              <Label htmlFor="industry">Industry</Label>
              <Select 
                value={companyData.industry} 
                onValueChange={(value) => handleCompanyDataChange('industry', value)}
                disabled={isSaving}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="Retail">Retail</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="timezone">Timezone</Label>
              <Select 
                value={companyData.timezone} 
                onValueChange={(value) => handleCompanyDataChange('timezone', value)}
                disabled={isSaving}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UTC-8">UTC-8 (Pacific Time)</SelectItem>
                  <SelectItem value="UTC-7">UTC-7 (Mountain Time)</SelectItem>
                  <SelectItem value="UTC-6">UTC-6 (Central Time)</SelectItem>
                  <SelectItem value="UTC-5">UTC-5 (Eastern Time)</SelectItem>
                  <SelectItem value="UTC+0">UTC+0 (GMT)</SelectItem>
                  <SelectItem value="UTC+1">UTC+1 (CET)</SelectItem>
                  <SelectItem value="UTC+5:30">UTC+5:30 (IST - Indian Standard Time)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="currency">Currency</Label>
              <Select 
                value={companyData.currency} 
                onValueChange={(value) => handleCompanyDataChange('currency', value)}
                disabled={isSaving}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="GBP">GBP (£)</SelectItem>
                  <SelectItem value="CAD">CAD (C$)</SelectItem>
                  <SelectItem value="AUD">AUD (A$)</SelectItem>
                  <SelectItem value="INR">INR (₹)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <Button 
          onClick={handleSaveCompanyData}
          disabled={isSaving}
          className="w-full md:w-auto"
        >
          {isSaving ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Company Information
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default CompanySettings;
