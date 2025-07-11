
/**
 * Employee Login Form Component
 * Handles the main login form for employee authentication
 */

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';

interface EmployeeLoginFormProps {
  formData: {
    email: string;
    password: string;
  };
  setFormData: (data: { email: string; password: string }) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const EmployeeLoginForm = ({ formData, setFormData, onSubmit, isLoading }: EmployeeLoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-4">
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="employee-email">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input 
              id="employee-email" 
              type="email" 
              placeholder="Enter your work email" 
              className="pl-10"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required 
              autoComplete="email"
              disabled={isLoading}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="employee-password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input 
              id="employee-password" 
              type={showPassword ? "text" : "password"} 
              placeholder="Enter your password" 
              className="pl-10 pr-10"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required 
              autoComplete="current-password"
              disabled={isLoading}
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)} 
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 disabled:opacity-50"
              disabled={isLoading}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" 
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Signing in...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Sign In</span>
            </div>
          )}
        </Button>
      </form>
    </div>
  );
};

export default EmployeeLoginForm;
