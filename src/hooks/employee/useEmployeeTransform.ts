
/**
 * Employee data transformation utilities
 * Handles converting Supabase data to Employee format
 */

import { Employee } from '@/types/employee';

export const transformProfileToEmployee = (profile: any): Employee => {
  // Handle employee_details - it could be null, an array, or an error
  let details = null;
  if (profile.employee_details && Array.isArray(profile.employee_details)) {
    details = profile.employee_details[0] || null;
  }

  // Provide defaults for all required fields
  const safeDetails = details || {};
  
  return {
    id: profile.employee_id || profile.id,
    name: profile.full_name || 'Unknown',
    email: profile.email,
    department: profile.department || 'Unassigned',
    position: profile.position || 'Employee',
    role: profile.position || 'Employee',
    status: (safeDetails.status === 'active' ? 'Active' : 'Inactive'),
    joinDate: safeDetails.hire_date || new Date().toISOString().split('T')[0],
    phone: profile.phone || '',
    address: safeDetails.address || '',
    dateOfBirth: safeDetails.birth_date || new Date().toISOString().split('T')[0],
    emergencyContact: {
      name: safeDetails.emergency_contact_name || '',
      relationship: 'Contact',
      phone: safeDetails.emergency_contact_phone || ''
    },
    manager: 'Not Assigned',
    baseSalary: safeDetails.salary || 0,
    profilePictureUrl: safeDetails.profile_picture_url || profile.avatar_url || '',
    documents: [],
    loginCredentials: {
      loginEmail: profile.email,
      password: '****', // Hidden for security
      isActive: profile.is_active || false
    },
    employmentHistory: [{
      title: profile.position || 'Employee',
      department: profile.department || 'Unassigned',
      startDate: safeDetails.hire_date || new Date().toISOString().split('T')[0],
      endDate: undefined,
      current: true
    }]
  };
};
