
/**
 * Employee Records Handlers Hook
 * Centralized handlers for employee record operations
 */

import { useState } from 'react';
import { Employee } from '@/hooks/useEmployeeData';

export const useEmployeeRecordsHandlers = (
  updateEmployee: (id: string, updates: Partial<Employee>) => void,
  deleteEmployee: (id: string) => void
) => {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [modalEmployee, setModalEmployee] = useState<Employee | null>(null);

  const handleViewEmployee = (employee: Employee) => {
    setModalEmployee(employee);
  };

  const handleSelectEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    if (activeTab === 'overview') {
      setActiveTab('personal');
    }
  };

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee);
  };

  const handleUpdateEmployee = (updates: Partial<Employee>) => {
    if (editingEmployee) {
      updateEmployee(editingEmployee.id, updates);
      setEditingEmployee(null);
      
      // Update selected employee if it's the same as the one being edited
      if (selectedEmployee?.id === editingEmployee.id) {
        setSelectedEmployee(prev => prev ? { ...prev, ...updates } : null);
      }
    }
  };

  const handleDeleteEmployee = (employeeId: string) => {
    deleteEmployee(employeeId);
    // Clear selected employee if it was deleted
    if (selectedEmployee?.id === employeeId) {
      setSelectedEmployee(null);
    }
  };

  const handleUpdateCredentials = (employeeId: string, credentials: { loginEmail: string; password: string; isActive: boolean }) => {
    const updates = {
      loginCredentials: credentials
    };
    updateEmployee(employeeId, updates);
    
    // Update selected employee if it's the same as the one being updated
    if (selectedEmployee?.id === employeeId) {
      setSelectedEmployee(prev => prev ? { ...prev, loginCredentials: credentials } : null);
    }
  };

  const handleDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !selectedEmployee) return;

    // Create new document object
    const newDocument = {
      id: `doc${Date.now()}`,
      name: file.name,
      type: file.type.includes('pdf') ? 'PDF' : file.type.includes('image') ? 'Image' : 'Document',
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      uploadDate: new Date().toISOString().split('T')[0]
    };

    // Update employee with new document
    const updatedDocuments = [...selectedEmployee.documents, newDocument];
    updateEmployee(selectedEmployee.id, { documents: updatedDocuments });
    
    // Update selected employee state
    setSelectedEmployee(prev => prev ? { ...prev, documents: updatedDocuments } : null);
    
    // Clear the input
    event.target.value = '';
    
    console.log('Document uploaded:', newDocument);
  };

  return {
    selectedEmployee,
    editingEmployee,
    activeTab,
    modalEmployee,
    setActiveTab,
    setModalEmployee,
    setEditingEmployee,
    handleViewEmployee,
    handleSelectEmployee,
    handleEditEmployee,
    handleUpdateEmployee,
    handleDeleteEmployee,
    handleUpdateCredentials,
    handleDocumentUpload
  };
};
