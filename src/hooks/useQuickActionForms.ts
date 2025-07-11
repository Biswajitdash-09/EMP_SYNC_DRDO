
import { useState } from 'react';

export const useQuickActionForms = () => {
  // Employee form state
  const [employeeForm, setEmployeeForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    position: '',
    startDate: '',
    phone: '',
    address: '',
    baseSalary: '',
    loginEmail: '',
    loginPassword: '',
    isLoginActive: true
  });

  // Report parameters
  const [reportParams, setReportParams] = useState({
    reportType: 'Attendance Report',
    dateRange: 'Last 30 Days',
    format: 'PDF',
    department: ''
  });

  // Review form state
  const [reviewForm, setReviewForm] = useState({
    employee: '',
    reviewType: 'Annual Review',
    reviewer: 'Direct Manager',
    dueDate: '',
    goals: ''
  });

  const resetEmployeeForm = () => {
    setEmployeeForm({
      firstName: '',
      lastName: '',
      email: '',
      department: '',
      position: '',
      startDate: '',
      phone: '',
      address: '',
      baseSalary: '',
      loginEmail: '',
      loginPassword: '',
      isLoginActive: true
    });
  };

  const resetReviewForm = () => {
    setReviewForm({
      employee: '',
      reviewType: 'Annual Review',
      reviewer: 'Direct Manager',
      dueDate: '',
      goals: ''
    });
  };

  return {
    employeeForm,
    setEmployeeForm,
    reportParams,
    setReportParams,
    reviewForm,
    setReviewForm,
    resetEmployeeForm,
    resetReviewForm
  };
};
