
/**
 * Login Credentials Form Component
 * Handles login credentials fields for employee editing
 */

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface LoginCredentialsFormProps {
  formData: {
    loginEmail: string;
    loginPassword: string;
    isLoginActive: boolean;
  };
  onInputChange: (field: string, value: string | boolean) => void;
}

const LoginCredentialsForm = ({ formData, onInputChange }: LoginCredentialsFormProps) => {
  return (
    <div className="space-y-4 border-t pt-6">
      <h4 className="font-semibold text-blue-600">Login Credentials</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="loginEmail">Login Email</Label>
          <Input
            id="loginEmail"
            type="email"
            value={formData.loginEmail}
            onChange={(e) => onInputChange('loginEmail', e.target.value)}
            placeholder="employee.login@company.com"
            required
          />
          <p className="text-sm text-gray-500">Email used for employee login</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="loginPassword">Login Password</Label>
          <Input
            id="loginPassword"
            type="password"
            value={formData.loginPassword}
            onChange={(e) => onInputChange('loginPassword', e.target.value)}
            placeholder="Enter new password"
            required
          />
          <p className="text-sm text-gray-500">Password for employee access</p>
        </div>

        <div className="md:col-span-2">
          <div className="flex items-center space-x-2">
            <Switch
              id="isLoginActive"
              checked={formData.isLoginActive}
              onCheckedChange={(checked) => onInputChange('isLoginActive', checked)}
            />
            <Label htmlFor="isLoginActive">Enable Login Access</Label>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {formData.isLoginActive ? 'Employee can log in to their dashboard' : 'Employee login is disabled'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginCredentialsForm;
