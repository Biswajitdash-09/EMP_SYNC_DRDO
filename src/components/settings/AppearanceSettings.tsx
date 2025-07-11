
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Palette } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useTheme } from '@/components/ThemeProvider';

interface AppearanceSettingsProps {
  initialColorScheme?: string;
}

const AppearanceSettings = ({ 
  initialColorScheme = 'blue'
}: AppearanceSettingsProps) => {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  
  // Appearance Settings State
  const [selectedColorScheme, setSelectedColorScheme] = useState(initialColorScheme);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);

  // Check if dark mode is currently active
  const isDarkMode = theme === 'dark';

  // Dark Mode Handler
  const handleDarkModeToggle = (checked: boolean) => {
    const newTheme = checked ? 'dark' : 'light';
    setTheme(newTheme);
    toast({
      title: "Theme Updated",
      description: `Switched to ${checked ? 'dark' : 'light'} mode.`,
    });
  };

  // Color Scheme Handler
  const handleColorSchemeChange = (color: string) => {
    setSelectedColorScheme(color);
    
    // Apply color scheme to CSS variables
    const root = document.documentElement;
    const colorSchemes = {
      blue: {
        primary: '222.2 47.4% 11.2%',
        primaryForeground: '210 40% 98%',
        accent: '210 40% 96.1%',
        accentForeground: '222.2 47.4% 11.2%'
      },
      green: {
        primary: '142 76% 36%',
        primaryForeground: '355 100% 97%',
        accent: '142 76% 96%',
        accentForeground: '142 76% 36%'
      },
      purple: {
        primary: '262 83% 58%',
        primaryForeground: '210 40% 98%',
        accent: '262 83% 96%',
        accentForeground: '262 83% 58%'
      },
      orange: {
        primary: '25 95% 53%',
        primaryForeground: '210 40% 98%',
        accent: '25 95% 96%',
        accentForeground: '25 95% 53%'
      }
    };

    const scheme = colorSchemes[color as keyof typeof colorSchemes];
    if (scheme) {
      root.style.setProperty('--primary', scheme.primary);
      root.style.setProperty('--primary-foreground', scheme.primaryForeground);
      root.style.setProperty('--accent', scheme.accent);
      root.style.setProperty('--accent-foreground', scheme.accentForeground);
    }

    toast({
      title: "Color Scheme Updated",
      description: `Color scheme changed to ${color}.`,
    });
  };

  // File Upload Handler
  const handleFileUpload = (type: 'logo' | 'favicon', file: File | null) => {
    if (type === 'logo') setLogoFile(file);
    if (type === 'favicon') setFaviconFile(file);
    
    if (file) {
      toast({
        title: "File Uploaded",
        description: `${type} file uploaded successfully.`,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="w-5 h-5" />
          Theme Customization
        </CardTitle>
        <CardDescription>Customize the appearance of your EMP SYNC system</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Dark Mode</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Switch to dark theme</p>
            </div>
            <Switch 
              checked={isDarkMode} 
              onCheckedChange={handleDarkModeToggle}
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-semibold">Color Scheme</h4>
          <div className="grid grid-cols-4 gap-4">
            {[
              { name: 'blue', color: 'bg-blue-500' },
              { name: 'green', color: 'bg-green-500' },
              { name: 'purple', color: 'bg-purple-500' },
              { name: 'orange', color: 'bg-orange-500' }
            ].map((scheme) => (
              <div 
                key={scheme.name}
                className={`p-4 border rounded-lg text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                  selectedColorScheme === scheme.name ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => handleColorSchemeChange(scheme.name)}
              >
                <div className={`w-8 h-8 ${scheme.color} rounded mx-auto mb-2`}></div>
                <span className="text-sm capitalize">{scheme.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold">Logo & Branding</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="logo">Company Logo</Label>
              <Input 
                id="logo" 
                type="file" 
                accept="image/*"
                onChange={(e) => handleFileUpload('logo', e.target.files?.[0] || null)}
              />
              {logoFile && (
                <p className="text-sm text-green-600 mt-1">File uploaded: {logoFile.name}</p>
              )}
            </div>
            <div>
              <Label htmlFor="favicon">Favicon</Label>
              <Input 
                id="favicon" 
                type="file" 
                accept="image/*"
                onChange={(e) => handleFileUpload('favicon', e.target.files?.[0] || null)}
              />
              {faviconFile && (
                <p className="text-sm text-green-600 mt-1">File uploaded: {faviconFile.name}</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppearanceSettings;
