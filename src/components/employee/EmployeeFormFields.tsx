
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface EmployeeFormData {
  name: string;
  email: string;
  phone: string;
  department: string;
  role: string;
  status: 'Active' | 'Inactive';
  joinDate: string;
  address: string;
  dateOfBirth: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelationship: string;
  manager: string;
  baseSalary: number;
  loginEmail: string;
  loginPassword: string;
  isLoginActive: boolean;
}

interface EmployeeFormFieldsProps {
  formData: EmployeeFormData;
  setFormData: (data: any) => void;
}

const EmployeeFormFields = ({ formData, setFormData }: EmployeeFormFieldsProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData((prev: any) => ({...prev, name: e.target.value}))}
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData((prev: any) => ({...prev, email: e.target.value}))}
            required
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData((prev: any) => ({...prev, phone: e.target.value}))}
          />
        </div>
        <div>
          <Label htmlFor="department">Department *</Label>
          <Select value={formData.department} onValueChange={(value) => setFormData((prev: any) => ({...prev, department: value}))}>
            <SelectTrigger>
              <SelectValue placeholder="Select Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Engineering">Engineering</SelectItem>
              <SelectItem value="HR">HR</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
              <SelectItem value="Sales">Sales</SelectItem>
              <SelectItem value="Operations">Operations</SelectItem>
              <SelectItem value="Legal">Legal</SelectItem>
              <SelectItem value="Design">Design</SelectItem>
              <SelectItem value="Product">Product</SelectItem>
              <SelectItem value="Customer Support">Customer Support</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="role">Role *</Label>
          <Input
            id="role"
            value={formData.role}
            onChange={(e) => setFormData((prev: any) => ({...prev, role: e.target.value}))}
            required
          />
        </div>
        <div>
          <Label htmlFor="joinDate">Join Date *</Label>
          <Input
            id="joinDate"
            type="date"
            value={formData.joinDate}
            onChange={(e) => setFormData((prev: any) => ({...prev, joinDate: e.target.value}))}
            required
          />
        </div>
        <div>
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => setFormData((prev: any) => ({...prev, dateOfBirth: e.target.value}))}
          />
        </div>
        <div>
          <Label htmlFor="baseSalary">Base Salary</Label>
          <Input
            id="baseSalary"
            type="number"
            value={formData.baseSalary}
            onChange={(e) => setFormData((prev: any) => ({...prev, baseSalary: Number(e.target.value)}))}
          />
        </div>
        <div>
          <Label htmlFor="manager">Manager</Label>
          <Input
            id="manager"
            value={formData.manager}
            onChange={(e) => setFormData((prev: any) => ({...prev, manager: e.target.value}))}
          />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            value={formData.address}
            onChange={(e) => setFormData((prev: any) => ({...prev, address: e.target.value}))}
          />
        </div>
      </div>

      {/* Login Credentials Section */}
      <div className="border-t pt-6 mt-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Login Credentials</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="loginEmail">Login Email *</Label>
            <Input
              id="loginEmail"
              type="email"
              value={formData.loginEmail}
              onChange={(e) => setFormData((prev: any) => ({...prev, loginEmail: e.target.value}))}
              placeholder="employee.login@company.com"
              required
            />
            <p className="text-sm text-gray-500 mt-1">This email will be used by the employee to log in</p>
          </div>
          <div>
            <Label htmlFor="loginPassword">Login Password *</Label>
            <Input
              id="loginPassword"
              type="password"
              value={formData.loginPassword}
              onChange={(e) => setFormData((prev: any) => ({...prev, loginPassword: e.target.value}))}
              placeholder="Secure password for employee"
              required
            />
            <p className="text-sm text-gray-500 mt-1">Employee will use this password to access their dashboard</p>
          </div>
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2">
              <Switch
                id="isLoginActive"
                checked={formData.isLoginActive}
                onCheckedChange={(checked) => setFormData((prev: any) => ({...prev, isLoginActive: checked}))}
              />
              <Label htmlFor="isLoginActive">Enable Login Access</Label>
            </div>
            <p className="text-sm text-gray-500 mt-1">Toggle to enable/disable employee login access</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeFormFields;
