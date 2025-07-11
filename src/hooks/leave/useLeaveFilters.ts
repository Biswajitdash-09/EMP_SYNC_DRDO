
import { useState, useMemo } from 'react';
import { LeaveRequest } from './useLeaveCore';

export const useLeaveFilters = (allLeaveRequests: LeaveRequest[]) => {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [employeeFilter, setEmployeeFilter] = useState<string>('all');

  const filteredRequests = useMemo(() => {
    return allLeaveRequests.filter(request => {
      const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
      const matchesType = typeFilter === 'all' || request.type === typeFilter;
      const matchesEmployee = employeeFilter === 'all' || request.employee === employeeFilter;
      return matchesStatus && matchesType && matchesEmployee;
    });
  }, [allLeaveRequests, statusFilter, typeFilter, employeeFilter]);

  return {
    statusFilter,
    typeFilter,
    employeeFilter,
    setStatusFilter,
    setTypeFilter,
    setEmployeeFilter,
    filteredRequests
  };
};
