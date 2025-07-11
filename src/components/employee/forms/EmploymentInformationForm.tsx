
/**
 * Employment Information Form Component
 * Handles employment-related fields
 */

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EmploymentInformationFormProps {
  formData: {
    department: string;
    role: string;
    status: string;
    manager: string;
    baseSalary: number;
  };
  onInputChange: (field: string, value: string | number) => void;
}

const EmploymentInformationForm = ({ formData, onInputChange }: EmploymentInformationFormProps) => {
  return (
    <div className="space-y-4">
      <h4 className="font-semibold">Employment Information</h4>
      
      <div className="space-y-2">
        <Label htmlFor="department">Department</Label>
        <Select value={formData.department} onValueChange={(value) => onInputChange('department', value)}>
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

      <div className="space-y-2">
        <Label htmlFor="role">Role</Label>
        <Input
          id="role"
          value={formData.role}
          onChange={(e) => onInputChange('role', e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select value={formData.status} onValueChange={(value) => onInputChange('status', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Probation">Probation</SelectItem>
            <SelectItem value="Terminated">Terminated</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="manager">Manager</Label>
        <Input
          id="manager"
          value={formData.manager}
          onChange={(e) => onInputChange('manager', e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="baseSalary">Base Salary</Label>
        <Input
          id="baseSalary"
          type="number"
          value={formData.baseSalary}
          onChange={(e) => onInputChange('baseSalary', parseInt(e.target.value))}
          required
        />
      </div>
    </div>
  );
};

export default EmploymentInformationForm;
