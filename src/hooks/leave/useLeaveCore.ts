
import { useState } from 'react';

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employee: string;
  type: string;
  startDate: string;
  endDate: string;
  days: number;
  status: 'Pending' | 'Approved' | 'Rejected';
  reason: string;
  appliedDate: string;
  approvedBy?: string;
  approvedDate?: string;
  comments?: string;
}

export interface LeaveBalance {
  employeeId: string;
  employee: string;
  vacation: number;
  sick: number;
  personal: number;
  maternity: number;
  usedVacation: number;
  usedSick: number;
  usedPersonal: number;
  usedMaternity: number;
}

export interface LeaveType {
  id: string;
  name: string;
  description: string;
  maxDays: number;
  carryForward: boolean;
  requiresApproval: boolean;
  color: string;
}

export interface Holiday {
  id: string;
  name: string;
  date: string;
  type: 'National' | 'Company' | 'Regional';
  description?: string;
}

const initialLeaveRequests: LeaveRequest[] = [
  {
    id: 'LR001',
    employeeId: 'EMP001',
    employee: 'John Smith',
    type: 'Vacation',
    startDate: '2024-07-15',
    endDate: '2024-07-19',
    days: 5,
    status: 'Pending',
    reason: 'Family vacation',
    appliedDate: '2024-06-15'
  },
  {
    id: 'LR002',
    employeeId: 'EMP002',
    employee: 'Sarah Johnson',
    type: 'Sick Leave',
    startDate: '2024-06-20',
    endDate: '2024-06-21',
    days: 2,
    status: 'Approved',
    reason: 'Medical appointment',
    appliedDate: '2024-06-18',
    approvedBy: 'HR Manager',
    approvedDate: '2024-06-19'
  },
  {
    id: 'LR003',
    employeeId: 'EMP003',
    employee: 'Mike Chen',
    type: 'Personal',
    startDate: '2024-07-01',
    endDate: '2024-07-01',
    days: 1,
    status: 'Rejected',
    reason: 'Personal matters',
    appliedDate: '2024-06-25',
    approvedBy: 'HR Manager',
    approvedDate: '2024-06-26',
    comments: 'Insufficient notice provided'
  }
];

const initialLeaveBalances: LeaveBalance[] = [
  {
    employeeId: 'EMP001',
    employee: 'John Smith',
    vacation: 25,
    sick: 15,
    personal: 5,
    maternity: 12,
    usedVacation: 10,
    usedSick: 7,
    usedPersonal: 2,
    usedMaternity: 0
  },
  {
    employeeId: 'EMP002',
    employee: 'Sarah Johnson',
    vacation: 25,
    sick: 15,
    personal: 5,
    maternity: 12,
    usedVacation: 13,
    usedSick: 10,
    usedPersonal: 3,
    usedMaternity: 0
  },
  {
    employeeId: 'EMP003',
    employee: 'Mike Chen',
    vacation: 20,
    sick: 12,
    personal: 4,
    maternity: 0,
    usedVacation: 5,
    usedSick: 2,
    usedPersonal: 1,
    usedMaternity: 0
  }
];

const initialLeaveTypes: LeaveType[] = [
  {
    id: 'vacation',
    name: 'Vacation Leave',
    description: 'Annual vacation days',
    maxDays: 25,
    carryForward: true,
    requiresApproval: true,
    color: 'blue'
  },
  {
    id: 'sick',
    name: 'Sick Leave',
    description: 'Medical leave',
    maxDays: 15,
    carryForward: false,
    requiresApproval: false,
    color: 'green'
  },
  {
    id: 'personal',
    name: 'Personal Leave',
    description: 'Personal matters',
    maxDays: 5,
    carryForward: false,
    requiresApproval: true,
    color: 'purple'
  },
  {
    id: 'maternity',
    name: 'Maternity/Paternity',
    description: 'Family leave',
    maxDays: 84,
    carryForward: false,
    requiresApproval: true,
    color: 'pink'
  }
];

const initialHolidays: Holiday[] = [
  { id: 'h1', name: 'Independence Day', date: '2024-07-04', type: 'National', description: 'National Holiday' },
  { id: 'h2', name: 'Labor Day', date: '2024-09-02', type: 'National', description: 'National Holiday' },
  { id: 'h3', name: 'Thanksgiving', date: '2024-11-28', type: 'National', description: 'National Holiday' },
  { id: 'h4', name: 'Christmas Day', date: '2024-12-25', type: 'National', description: 'National Holiday' },
  { id: 'h5', name: 'New Year\'s Day', date: '2025-01-01', type: 'National', description: 'National Holiday' },
  { id: 'h6', name: 'Company Retreat', date: '2024-08-15', type: 'Company', description: 'Company Event' }
];

export const useLeaveCore = () => {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(initialLeaveRequests);
  const [leaveBalances, setLeaveBalances] = useState<LeaveBalance[]>(initialLeaveBalances);
  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>(initialLeaveTypes);
  const [holidays, setHolidays] = useState<Holiday[]>(initialHolidays);

  return {
    leaveRequests,
    setLeaveRequests,
    leaveBalances,
    setLeaveBalances,
    leaveTypes,
    setLeaveTypes,
    holidays,
    setHolidays
  };
};
