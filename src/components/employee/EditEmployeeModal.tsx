
/**
 * Edit Employee Modal Component
 * Refactored to use smaller form components for better maintainability
 */

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Employee } from '@/hooks/useEmployeeData';
import BasicInformationForm from './forms/BasicInformationForm';
import EmploymentInformationForm from './forms/EmploymentInformationForm';
import EmergencyContactForm from './forms/EmergencyContactForm';
import LoginCredentialsForm from './forms/LoginCredentialsForm';

interface EditEmployeeModalProps {
  employee: Employee | null;
  onClose: () => void;
  onUpdateEmployee: (updates: Partial<Employee>) => void;
}

const EditEmployeeModal = ({ employee, onClose, onUpdateEmployee }: EditEmployeeModalProps) => {
  const [formData, setFormData] = useState({
    name: employee?.name || '',
    email: employee?.email || '',
    phone: employee?.phone || '',
    department: employee?.department || '',
    role: employee?.role || '',
    status: employee?.status || 'Active',
    address: employee?.address || '',
    dateOfBirth: employee?.dateOfBirth || '',
    manager: employee?.manager || '',
    baseSalary: employee?.baseSalary || 0,
    emergencyContactName: employee?.emergencyContact?.name || '',
    emergencyContactPhone: employee?.emergencyContact?.phone || '',
    emergencyContactRelationship: employee?.emergencyContact?.relationship || '',
    loginEmail: employee?.loginCredentials?.loginEmail || '',
    loginPassword: employee?.loginCredentials?.password || '',
    isLoginActive: employee?.loginCredentials?.isActive || false
  });

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updates: Partial<Employee> = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      department: formData.department,
      role: formData.role,
      status: formData.status as 'Active' | 'Probation' | 'Terminated',
      address: formData.address,
      dateOfBirth: formData.dateOfBirth,
      manager: formData.manager,
      baseSalary: Number(formData.baseSalary),
      emergencyContact: {
        name: formData.emergencyContactName,
        phone: formData.emergencyContactPhone,
        relationship: formData.emergencyContactRelationship
      },
      loginCredentials: {
        loginEmail: formData.loginEmail,
        password: formData.loginPassword,
        isActive: formData.isLoginActive
      }
    };

    onUpdateEmployee(updates);
    onClose();
  };

  if (!employee) return null;

  return (
    <Dialog open={!!employee} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Employee - {employee.name}</DialogTitle>
          <DialogDescription>
            Update employee information including login credentials for {employee.name} ({employee.id})
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BasicInformationForm
              formData={{
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                dateOfBirth: formData.dateOfBirth,
                address: formData.address
              }}
              onInputChange={handleInputChange}
            />

            <EmploymentInformationForm
              formData={{
                department: formData.department,
                role: formData.role,
                status: formData.status,
                manager: formData.manager,
                baseSalary: formData.baseSalary
              }}
              onInputChange={handleInputChange}
            />
          </div>

          <EmergencyContactForm
            formData={{
              emergencyContactName: formData.emergencyContactName,
              emergencyContactPhone: formData.emergencyContactPhone,
              emergencyContactRelationship: formData.emergencyContactRelationship
            }}
            onInputChange={handleInputChange}
          />

          <LoginCredentialsForm
            formData={{
              loginEmail: formData.loginEmail,
              loginPassword: formData.loginPassword,
              isLoginActive: formData.isLoginActive
            }}
            onInputChange={handleInputChange}
          />

          <div className="flex justify-end gap-4 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditEmployeeModal;
