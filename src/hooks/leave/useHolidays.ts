
import { Holiday } from './useLeaveCore';

export const useHolidaysOperations = (
  holidays: Holiday[],
  setHolidays: React.Dispatch<React.SetStateAction<Holiday[]>>
) => {
  const addHoliday = (holiday: Omit<Holiday, 'id'>) => {
    const newId = `h${holidays.length + 1}`;
    setHolidays(prev => [...prev, { ...holiday, id: newId }]);
  };

  const updateHoliday = (id: string, updates: Partial<Holiday>) => {
    setHolidays(prev => prev.map(holiday =>
      holiday.id === id ? { ...holiday, ...updates } : holiday
    ));
  };

  const deleteHoliday = (id: string) => {
    setHolidays(prev => prev.filter(holiday => holiday.id !== id));
  };

  return {
    addHoliday,
    updateHoliday,
    deleteHoliday
  };
};
