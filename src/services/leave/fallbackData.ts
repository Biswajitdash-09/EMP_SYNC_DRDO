
import { LeaveType, Holiday } from './types';

export const fallbackLeaveTypes: LeaveType[] = [
  {
    id: 'vacation',
    name: 'Vacation Leave',
    description: 'Annual vacation days',
    annual_days: 25,
    requires_approval: true,
    carry_forward: true,
    color: 'blue',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    maxDays: 25,
    carryForward: true,
    requiresApproval: true
  },
  {
    id: 'sick',
    name: 'Sick Leave',
    description: 'Medical leave',
    annual_days: 15,
    requires_approval: false,
    carry_forward: false,
    color: 'green',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    maxDays: 15,
    carryForward: false,
    requiresApproval: false
  },
  {
    id: 'personal',
    name: 'Personal Leave',
    description: 'Personal matters',
    annual_days: 5,
    requires_approval: true,
    carry_forward: false,
    color: 'purple',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    maxDays: 5,
    carryForward: false,
    requiresApproval: true
  }
];

export const fallbackHolidays: Holiday[] = [
  { 
    id: 'h1', 
    name: 'Independence Day', 
    date: '2024-07-04', 
    type: 'National', 
    description: 'National Holiday', 
    created_at: new Date().toISOString() 
  },
  { 
    id: 'h2', 
    name: 'Christmas Day', 
    date: '2024-12-25', 
    type: 'National', 
    description: 'National Holiday', 
    created_at: new Date().toISOString() 
  },
  { 
    id: 'h3', 
    name: 'New Year\'s Day', 
    date: '2025-01-01', 
    type: 'National', 
    description: 'National Holiday', 
    created_at: new Date().toISOString() 
  }
];
