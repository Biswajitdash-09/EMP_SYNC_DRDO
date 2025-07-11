
import { LeaveType } from './useLeaveCore';

export const useLeaveTypesOperations = (
  leaveTypes: LeaveType[],
  setLeaveTypes: React.Dispatch<React.SetStateAction<LeaveType[]>>
) => {
  const addLeaveType = (leaveType: Omit<LeaveType, 'id'>) => {
    const newId = leaveType.name.toLowerCase().replace(/\s+/g, '-');
    setLeaveTypes(prev => [...prev, { ...leaveType, id: newId }]);
  };

  const updateLeaveType = (id: string, updates: Partial<LeaveType>) => {
    setLeaveTypes(prev => prev.map(type =>
      type.id === id ? { ...type, ...updates } : type
    ));
  };

  const deleteLeaveType = (id: string) => {
    setLeaveTypes(prev => prev.filter(type => type.id !== id));
  };

  return {
    addLeaveType,
    updateLeaveType,
    deleteLeaveType
  };
};
