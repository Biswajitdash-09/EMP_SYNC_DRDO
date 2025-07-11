
// Leave management type definitions
export interface LeaveType {
  id: string;
  name: string;
  description: string;
  annual_days: number;
  requires_approval: boolean;
  carry_forward: boolean;
  color: string;
  created_at: string;
  updated_at: string;
  // Compatibility fields
  maxDays: number;
  carryForward: boolean;
  requiresApproval: boolean;
}

export interface LeaveRequest {
  id: string;
  employee_id: string;
  leave_type_id: string;
  start_date: string;
  end_date: string;
  days: number;
  status: 'pending' | 'approved' | 'rejected';
  reason?: string;
  comments?: string;
  reviewed_by?: string;
  reviewed_date?: string;
  created_at: string;
  updated_at: string;
  // Joined data
  employee_name?: string;
  leave_type_name?: string;
  reviewer_name?: string;
}

export interface LeaveBalance {
  id: string;
  employee_id: string;
  leave_type_id: string;
  total_days: number;
  used_days: number;
  available_days: number;
  year: number;
  created_at: string;
  updated_at: string;
  // Joined data
  employee_name?: string;
  leave_type_name?: string;
}

export interface Holiday {
  id: string;
  name: string;
  date: string;
  type: 'National' | 'Company' | 'Regional';
  description?: string;
  created_at: string;
}
