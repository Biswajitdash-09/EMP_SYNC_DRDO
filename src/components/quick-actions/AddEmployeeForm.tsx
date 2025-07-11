
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { UserPlus, AlertCircle, Key } from 'lucide-react';
import { useEmployeeData } from "@/hooks/useEmployeeData";

interface AddEmployeeFormProps {
  employeeForm: {
    firstName: string;
    lastName: string;
    email: string;
    department: string;
    position: string;
    startDate: string;
    phone: string;
    address: string;
    baseSalary: string;
    loginEmail: string;
    loginPassword: string;
    isLoginActive: boolean;
  };
  onFormChange: (updates: any) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const AddEmployeeForm = ({
  employeeForm,
  onFormChange,
  onSubmit,
  onCancel
}: AddEmployeeFormProps) => {
  const {
    allEmployees,
    departments
  } = useEmployeeData();

  // Validation helper
  const isFormValid = () => {
    return employeeForm.firstName.trim() && 
           employeeForm.lastName.trim() && 
           employeeForm.email.trim() && 
           employeeForm.department &&
           employeeForm.loginEmail.trim() &&
           employeeForm.loginPassword.trim();
  };

  // Check for duplicate email
  const isDuplicateEmail = () => {
    if (!employeeForm.email.trim()) return false;
    return allEmployees.some(emp => emp.email.toLowerCase() === employeeForm.email.toLowerCase());
  };

  // Check for duplicate login email
  const isDuplicateLoginEmail = () => {
    if (!employeeForm.loginEmail.trim()) return false;
    return allEmployees.some(emp => emp.loginCredentials?.loginEmail.toLowerCase() === employeeForm.loginEmail.toLowerCase());
  };

  // Email validation
  const isValidEmail = (email: string) => {
    if (!email.trim()) return true; // Don't show error for empty email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = () => {
    if (!isFormValid()) {
      return; // Form validation will show via UI
    }
    onSubmit();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <UserPlus className="w-5 h-5 text-blue-600" />
            <span>Add New Employee</span>
          </div>
          <Badge variant="secondary">
            Current Total: {allEmployees.length}
          </Badge>
        </CardTitle>
        <CardDescription>
          Fill in the information to create a new employee profile with login credentials. 
          Fields marked with * are required.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Email validation warnings */}
        {!isValidEmail(employeeForm.email) && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <span className="text-sm text-red-700">Please enter a valid contact email address</span>
            </div>
          </div>
        )}
        
        {isDuplicateEmail() && (
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-yellow-600" />
              <span className="text-sm text-yellow-700">An employee with this contact email already exists</span>
            </div>
          </div>
        )}

        {!isValidEmail(employeeForm.loginEmail) && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <span className="text-sm text-red-700">Please enter a valid login email address</span>
            </div>
          </div>
        )}

        {isDuplicateLoginEmail() && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <span className="text-sm text-red-700">An employee with this login email already exists</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name *</Label>
            <Input 
              id="firstName" 
              value={employeeForm.firstName} 
              onChange={e => onFormChange(prev => ({
                ...prev,
                firstName: e.target.value
              }))} 
              placeholder="Enter first name" 
              className={!employeeForm.firstName.trim() && employeeForm.firstName !== '' ? 'border-red-300' : ''} 
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name *</Label>
            <Input 
              id="lastName" 
              value={employeeForm.lastName} 
              onChange={e => onFormChange(prev => ({
                ...prev,
                lastName: e.target.value
              }))} 
              placeholder="Enter last name" 
              className={!employeeForm.lastName.trim() && employeeForm.lastName !== '' ? 'border-red-300' : ''} 
            />
          </div>
          <div>
            <Label htmlFor="email">Contact Email *</Label>
            <Input 
              id="email" 
              type="email" 
              value={employeeForm.email} 
              onChange={e => onFormChange(prev => ({
                ...prev,
                email: e.target.value
              }))} 
              placeholder="Enter contact email address" 
              className={!isValidEmail(employeeForm.email) || isDuplicateEmail() ? 'border-red-300' : ''} 
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input 
              id="phone" 
              value={employeeForm.phone} 
              onChange={e => onFormChange(prev => ({
                ...prev,
                phone: e.target.value
              }))} 
              placeholder="Enter phone number" 
            />
          </div>
          <div>
            <Label htmlFor="department">Department *</Label>
            <select 
              id="department" 
              value={employeeForm.department} 
              onChange={e => onFormChange(prev => ({
                ...prev,
                department: e.target.value
              }))} 
              className={`w-full p-2 border rounded-md ${!employeeForm.department ? 'border-red-300' : ''}`}
            >
              <option value="">Select Department</option>
              {departments.map(dept => 
                <option key={dept} value={dept}>{dept}</option>
              )}
            </select>
          </div>
          <div>
            <Label htmlFor="position">Position</Label>
            <Input 
              id="position" 
              value={employeeForm.position} 
              onChange={e => onFormChange(prev => ({
                ...prev,
                position: e.target.value
              }))} 
              placeholder="Enter job position" 
            />
          </div>
          <div>
            <Label htmlFor="startDate">Start Date</Label>
            <Input 
              id="startDate" 
              type="date" 
              value={employeeForm.startDate} 
              onChange={e => onFormChange(prev => ({
                ...prev,
                startDate: e.target.value
              }))} 
            />
          </div>
          <div>
            <Label htmlFor="baseSalary">Base Salary (Annual)</Label>
            <Input 
              id="baseSalary" 
              type="number" 
              min="0" 
              step="1000" 
              value={employeeForm.baseSalary} 
              onChange={e => onFormChange(prev => ({
                ...prev,
                baseSalary: e.target.value
              }))} 
              placeholder="Enter annual salary" 
            />
          </div>
        </div>

        <div>
          <Label htmlFor="address">Address</Label>
          <Input 
            id="address" 
            value={employeeForm.address} 
            onChange={e => onFormChange(prev => ({
              ...prev,
              address: e.target.value
            }))} 
            placeholder="Enter full address" 
          />
        </div>

        {/* Login Credentials Section */}
        <div className="border-t pt-6 mt-6">
          <div className="flex items-center space-x-2 mb-4">
            <Key className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Login Credentials</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="loginEmail">Login Email *</Label>
              <Input 
                id="loginEmail" 
                type="email" 
                value={employeeForm.loginEmail} 
                onChange={e => onFormChange(prev => ({
                  ...prev,
                  loginEmail: e.target.value
                }))} 
                placeholder="employee.login@company.com" 
                className={!isValidEmail(employeeForm.loginEmail) || isDuplicateLoginEmail() ? 'border-red-300' : ''} 
              />
              <p className="text-sm text-gray-500 mt-1">Email the employee will use to log in</p>
            </div>
            <div>
              <Label htmlFor="loginPassword">Login Password *</Label>
              <Input 
                id="loginPassword" 
                type="password" 
                value={employeeForm.loginPassword} 
                onChange={e => onFormChange(prev => ({
                  ...prev,
                  loginPassword: e.target.value
                }))} 
                placeholder="Secure password for employee" 
                className={!employeeForm.loginPassword.trim() ? 'border-red-300' : ''} 
              />
              <p className="text-sm text-gray-500 mt-1">Password for employee dashboard access</p>
            </div>
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2">
                <Switch
                  id="isLoginActive"
                  checked={employeeForm.isLoginActive}
                  onCheckedChange={(checked) => onFormChange(prev => ({
                    ...prev,
                    isLoginActive: checked
                  }))}
                />
                <Label htmlFor="isLoginActive">Enable Login Access</Label>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {employeeForm.isLoginActive ? 'Employee can log in to their dashboard' : 'Employee login access is disabled'}
              </p>
            </div>
          </div>
        </div>
        
        {/* Form status */}
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="text-sm text-blue-700">
            <p><strong>Form Status:</strong> {isFormValid() ? 'Ready to submit' : 'Please fill required fields'}</p>
            <p><strong>Will be added to:</strong> Main Employee Records ({allEmployees.length} current employees)</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            onClick={handleSubmit} 
            disabled={!isFormValid() || 
                     !isValidEmail(employeeForm.email) || 
                     isDuplicateEmail() ||
                     !isValidEmail(employeeForm.loginEmail) ||
                     isDuplicateLoginEmail()} 
            className="bg-violet-950 hover:bg-violet-800"
          >
            Add Employee with Login Access
          </Button>
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddEmployeeForm;
