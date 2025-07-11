
/**
 * Main Application Component
 * Sets up routing, theme provider, and global UI components
 * Configures React Query for data fetching and state management
 * Now includes Real Supabase Authentication
 */

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import QuickActionsPage from "./pages/QuickActionsPage";
import EmployeeRecords from "./pages/EmployeeRecords";
import HRManagement from "./pages/HRManagement";
import PayrollSystem from "./pages/PayrollSystem";
import LeaveManagement from "./pages/LeaveManagement";
import PerformanceAnalytics from "./pages/PerformanceAnalytics";
import TimeTracking from "./pages/TimeTracking";
import ReportsAnalytics from "./pages/ReportsAnalytics";
import SystemSettings from "./pages/SystemSettings";
import NotFound from "./pages/NotFound";

// Configure React Query client for data fetching
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    {/* Theme management (dark/light mode) */}
    <ThemeProvider defaultTheme="system" storageKey="lovable-ui-theme">
      {/* Real Supabase authentication context */}
      <AuthProvider>
        {/* Tooltip accessibility provider */}
        <TooltipProvider>
          {/* Toast notification systems */}
          <Toaster />
          <Sonner />
          
          {/* Application routing setup */}
          <BrowserRouter>
            <Routes>
              {/* Landing page */}
              <Route path="/" element={<Index />} />
              
              {/* Admin-only routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute requireAdmin>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/quick-actions" element={
                <ProtectedRoute requireAdmin>
                  <QuickActionsPage />
                </ProtectedRoute>
              } />
              <Route path="/employees" element={
                <ProtectedRoute requireAdmin>
                  <EmployeeRecords />
                </ProtectedRoute>
              } />
              <Route path="/hr" element={
                <ProtectedRoute requireAdmin>
                  <HRManagement />
                </ProtectedRoute>
              } />
              <Route path="/payroll" element={
                <ProtectedRoute requireAdmin>
                  <PayrollSystem />
                </ProtectedRoute>
              } />
              <Route path="/leave" element={
                <ProtectedRoute requireAdmin>
                  <LeaveManagement />
                </ProtectedRoute>
              } />
              <Route path="/performance" element={
                <ProtectedRoute requireAdmin>
                  <PerformanceAnalytics />
                </ProtectedRoute>
              } />
              <Route path="/time-tracking" element={
                <ProtectedRoute requireAdmin>
                  <TimeTracking />
                </ProtectedRoute>
              } />
              <Route path="/reports" element={
                <ProtectedRoute requireAdmin>
                  <ReportsAnalytics />
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute requireAdmin>
                  <SystemSettings />
                </ProtectedRoute>
              } />
              
              {/* Employee-only routes */}
              <Route path="/employee-dashboard" element={
                <ProtectedRoute requireEmployee>
                  <EmployeeDashboard />
                </ProtectedRoute>
              } />
              
              {/* 404 fallback route - must be last */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
