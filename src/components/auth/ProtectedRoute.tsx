
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from "@/hooks/use-toast";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  requireEmployee?: boolean;
}

const ProtectedRoute = ({ children, requireAdmin = false, requireEmployee = false }: ProtectedRouteProps) => {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading) {
      console.log('ProtectedRoute check - User:', !!user, 'Profile:', !!profile, 'Role:', profile?.role);
      
      if (!user) {
        console.log('No user found, redirecting to home');
        toast({
          title: "Access Denied",
          description: "Please sign in to access this page.",
          variant: "destructive",
        });
        navigate('/');
        return;
      }

      if (!profile) {
        console.log('No profile found, redirecting to home');
        toast({
          title: "Access Denied",
          description: "Profile not found. Please contact support.",
          variant: "destructive",
        });
        navigate('/');
        return;
      }

      if (requireAdmin && profile.role !== 'admin') {
        console.log('Admin required but user is not admin:', profile.role);
        toast({
          title: "Access Denied",
          description: "This page requires administrator privileges.",
          variant: "destructive",
        });
        navigate('/');
        return;
      }

      if (requireEmployee && profile.role !== 'employee') {
        console.log('Employee required but user is not employee:', profile.role);
        toast({
          title: "Access Denied",
          description: "This page is for employees only.",
          variant: "destructive",
        });
        navigate('/');
        return;
      }

      console.log('Access granted for user:', profile.role);
    }
  }, [user, profile, loading, requireAdmin, requireEmployee, navigate, toast]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg">Loading...</div>
      </div>
    );
  }

  if (!user || !profile) {
    return null;
  }

  if (requireAdmin && profile.role !== 'admin') {
    return null;
  }

  if (requireEmployee && profile.role !== 'employee') {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
