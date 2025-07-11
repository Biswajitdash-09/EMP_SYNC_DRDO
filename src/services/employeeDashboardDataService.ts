
/**
 * Employee Dashboard Data Service
 * Handles syncing employee dashboard data with admin panel
 */

// Attendance data sync
export const syncAttendanceData = (employeeId: string, attendanceData: any) => {
  const key = `admin-attendance-${employeeId}`;
  localStorage.setItem(key, JSON.stringify(attendanceData));
  console.log('✅ Attendance data synced to admin:', employeeId);
};

// Support tickets sync
export const syncSupportTickets = (tickets: any[]) => {
  const existingTickets = JSON.parse(localStorage.getItem('admin-support-tickets') || '[]');
  const updatedTickets = [...existingTickets, ...tickets];
  localStorage.setItem('admin-support-tickets', JSON.stringify(updatedTickets));
  console.log('✅ Support tickets synced to admin');
};

// Feedback sync
export const syncFeedbackData = (feedback: any[]) => {
  const existingFeedback = JSON.parse(localStorage.getItem('admin-feedback') || '[]');
  const updatedFeedback = [...existingFeedback, ...feedback];
  localStorage.setItem('admin-feedback', JSON.stringify(updatedFeedback));
  console.log('✅ Feedback data synced to admin');
};

// Performance data sync
export const syncPerformanceData = (employeeId: string, performanceData: any) => {
  const key = `admin-performance-${employeeId}`;
  localStorage.setItem(key, JSON.stringify(performanceData));
  console.log('✅ Performance data synced to admin:', employeeId);
};

// Document uploads sync
export const syncDocumentUploads = (employeeId: string, documents: any[]) => {
  const key = `admin-documents-${employeeId}`;
  localStorage.setItem(key, JSON.stringify(documents));
  console.log('✅ Document uploads synced to admin:', employeeId);
};

// Get all employee dashboard data for admin
export const getEmployeeDashboardData = (employeeId: string) => {
  return {
    attendance: JSON.parse(localStorage.getItem(`admin-attendance-${employeeId}`) || '[]'),
    performance: JSON.parse(localStorage.getItem(`admin-performance-${employeeId}`) || '{}'),
    documents: JSON.parse(localStorage.getItem(`admin-documents-${employeeId}`) || '[]'),
    supportTickets: JSON.parse(localStorage.getItem('admin-support-tickets') || '[]').filter((ticket: any) => ticket.employeeId === employeeId),
    feedback: JSON.parse(localStorage.getItem('admin-feedback') || '[]').filter((fb: any) => fb.employeeId === employeeId)
  };
};

// Get all support tickets for admin dashboard
export const getAllSupportTickets = () => {
  return JSON.parse(localStorage.getItem('admin-support-tickets') || '[]');
};

// Get all feedback for admin dashboard
export const getAllFeedback = () => {
  return JSON.parse(localStorage.getItem('admin-feedback') || '[]');
};
