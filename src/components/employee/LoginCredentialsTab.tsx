
/**
 * Login Credentials Tab Component
 * Displays and manages employee login credentials for admin view
 * Shows login email, password status, and access controls
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Key, Eye, EyeOff, RefreshCw } from 'lucide-react';
import { Employee } from '@/hooks/useEmployeeData';
import { useState } from 'react';

interface LoginCredentialsTabProps {
  selectedEmployee: Employee | null;
  onUpdateCredentials?: (employeeId: string, credentials: { loginEmail: string; password: string; isActive: boolean }) => void;
}

const LoginCredentialsTab = ({ selectedEmployee, onUpdateCredentials }: LoginCredentialsTabProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editCredentials, setEditCredentials] = useState({
    loginEmail: '',
    password: '',
    isActive: false
  });

  if (!selectedEmployee) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Key className="w-5 h-5 text-blue-600" />
            <span>Login Credentials</span>
          </CardTitle>
          <CardDescription>
            Select an employee to view and manage their login credentials
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            No employee selected. Please select an employee from the overview tab to view their login credentials.
          </div>
        </CardContent>
      </Card>
    );
  }

  const handleEditStart = () => {
    setEditCredentials({
      loginEmail: selectedEmployee.loginCredentials?.loginEmail || '',
      password: selectedEmployee.loginCredentials?.password || '',
      isActive: selectedEmployee.loginCredentials?.isActive || false
    });
    setIsEditing(true);
  };

  const handleSaveCredentials = () => {
    if (onUpdateCredentials) {
      onUpdateCredentials(selectedEmployee.id, editCredentials);
    }
    setIsEditing(false);
  };

  const generateRandomPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setEditCredentials(prev => ({ ...prev, password }));
  };

  const credentials = selectedEmployee.loginCredentials;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Key className="w-5 h-5 text-blue-600" />
                <span>Login Credentials for {selectedEmployee.name}</span>
              </CardTitle>
              <CardDescription>
                Manage login access and credentials for this employee
              </CardDescription>
            </div>
            <Badge 
              variant={credentials?.isActive ? "default" : "secondary"}
              className={credentials?.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
            >
              {credentials?.isActive ? (
                <><Key className="w-3 h-3 mr-1" /> Active</>
              ) : (
                <><Key className="w-3 h-3 mr-1 opacity-50" /> Disabled</>
              )}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {!isEditing ? (
            // View Mode
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Login Email</Label>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md border">
                    {credentials?.loginEmail || 'Not set'}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Password</Label>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md border flex justify-between items-center">
                    <span className="font-mono">
                      {showPassword ? (credentials?.password || 'Not set') : '••••••••••••'}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={credentials?.isActive || false}
                  disabled={true}
                />
                <Label>Login Access Enabled</Label>
              </div>

              <div className="pt-4 border-t">
                <Button onClick={handleEditStart}>
                  Edit Credentials
                </Button>
              </div>
            </div>
          ) : (
            // Edit Mode
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="editLoginEmail">Login Email</Label>
                  <Input
                    id="editLoginEmail"
                    type="email"
                    value={editCredentials.loginEmail}
                    onChange={(e) => setEditCredentials(prev => ({ ...prev, loginEmail: e.target.value }))}
                    placeholder="employee.login@company.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="editPassword">Password</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="editPassword"
                      type={showPassword ? "text" : "password"}
                      value={editCredentials.password}
                      onChange={(e) => setEditCredentials(prev => ({ ...prev, password: e.target.value }))}
                      placeholder="Enter password"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={generateRandomPassword}
                      title="Generate random password"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={editCredentials.isActive}
                  onCheckedChange={(checked) => setEditCredentials(prev => ({ ...prev, isActive: checked }))}
                />
                <Label>Enable Login Access</Label>
              </div>

              <div className="flex space-x-2 pt-4 border-t">
                <Button onClick={handleSaveCredentials}>
                  Save Changes
                </Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Login Instructions Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Employee Login Instructions</CardTitle>
          <CardDescription>
            Information for the employee on how to access their dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg space-y-2">
            <p className="font-medium">For Employee: {selectedEmployee.name}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Use the following credentials to log in to your employee dashboard:
            </p>
            <ul className="text-sm space-y-1 ml-4">
              <li>• <strong>Login Email:</strong> {credentials?.loginEmail || 'Not set'}</li>
              <li>• <strong>Password:</strong> {showPassword ? (credentials?.password || 'Not set') : '••••••••••••'}</li>
              <li>• <strong>Access Status:</strong> {credentials?.isActive ? 'Enabled' : 'Disabled'}</li>
            </ul>
            {!credentials?.isActive && (
              <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                ⚠️ Login access is currently disabled. Please contact your administrator.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginCredentialsTab;
