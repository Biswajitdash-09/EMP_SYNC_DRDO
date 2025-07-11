
/**
 * Sample Employee Credentials Component
 * Displays available employee credentials with improved mobile UI and dark mode support
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, UserCheck, Eye, EyeOff } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useState } from 'react';

interface SampleCredentialsProps {
  credentials: Array<{
    email: string;
    password: string;
  }>;
  onFillCredentials: (email: string, password: string) => void;
}

const SampleCredentials = ({ credentials, onFillCredentials }: SampleCredentialsProps) => {
  const [showPasswords, setShowPasswords] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to Clipboard",
        description: `${type} copied successfully!`,
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Unable to copy to clipboard.",
        variant: "destructive",
      });
    }
  };

  if (credentials.length === 0) {
    return (
      <Card className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-blue-900 border-blue-200 dark:border-blue-700">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-lg text-blue-700 dark:text-blue-300">
            Sample Credentials
          </CardTitle>
          <CardDescription className="text-sm text-blue-600 dark:text-blue-400">
            Loading employee credentials...
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-blue-900 border-blue-200 dark:border-blue-700">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <CardTitle className="text-lg text-blue-700 dark:text-blue-300 flex items-center gap-2">
              <UserCheck className="w-5 h-5" />
              Sample Employee Credentials
            </CardTitle>
            <CardDescription className="text-sm text-blue-600 dark:text-blue-400">
              Use these credentials to test employee login
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowPasswords(!showPasswords)}
            className="border-blue-300 dark:border-blue-600 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800/50"
          >
            {showPasswords ? (
              <>
                <EyeOff className="w-4 h-4 mr-2" />
                Hide
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 mr-2" />
                Show
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 max-h-80 overflow-y-auto">
        {credentials.map((credential, index) => (
          <div 
            key={index} 
            className="p-4 bg-white/70 dark:bg-slate-900/70 rounded-lg border border-blue-200 dark:border-blue-700 hover:shadow-md transition-all duration-200"
          >
            <div className="flex flex-col space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                  Employee #{index + 1}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onFillCredentials(credential.email, credential.password)}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/50 text-xs px-3 py-1"
                >
                  Use This
                </Button>
              </div>
              
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Email:</span>
                  <div className="flex items-center gap-2">
                    <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded font-mono text-gray-800 dark:text-gray-200 break-all">
                      {credential.email}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(credential.email, 'Email')}
                      className="p-1 h-6 w-6 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Password:</span>
                  <div className="flex items-center gap-2">
                    <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded font-mono text-gray-800 dark:text-gray-200 break-all">
                      {showPasswords ? credential.password : '••••••••••'}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(credential.password, 'Password')}
                      className="p-1 h-6 w-6 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-700">
          <p className="text-xs text-blue-700 dark:text-blue-300 mb-2 font-medium">
            Quick Start:
          </p>
          <ul className="text-xs text-blue-600 dark:text-blue-400 space-y-1">
            <li>• Click "Use This" to auto-fill credentials</li>
            <li>• Copy individual fields with the copy button</li>
            <li>• All passwords are unique and secure</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default SampleCredentials;
