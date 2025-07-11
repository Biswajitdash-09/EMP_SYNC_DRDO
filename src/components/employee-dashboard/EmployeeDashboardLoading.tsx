
/**
 * Employee Dashboard Loading Component
 * Displays loading state while authentication is being verified
 */

const EmployeeDashboardLoading = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <div className="space-y-2">
          <p className="text-lg font-medium text-gray-900 dark:text-white">
            Loading your dashboard...
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Please wait while we prepare your workspace
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboardLoading;
