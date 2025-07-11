import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';

interface EmployeeAuthModalProps {
  open: boolean;
  onClose: () => void;
}

const EmployeeAuthModal = ({ open, onClose }: EmployeeAuthModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('signin');
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [signInForm, setSignInForm] = useState({
    email: '',
    password: ''
  });

  const [signUpForm, setSignUpForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  });

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLoading) return; // Prevent multiple submissions
    
    setIsLoading(true);

    try {
      console.log('🔐 Employee sign in attempt for:', signInForm.email);
      
      const { error } = await signIn(signInForm.email, signInForm.password);

      if (error) {
        console.error('❌ Employee sign in failed:', error.message);
        toast({
          title: "Sign In Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        console.log('✅ Employee sign in successful');
        toast({
          title: "Welcome back!",
          description: "You have been signed in successfully.",
        });
        
        // Reset form and close modal
        setSignInForm({ email: '', password: '' });
        onClose();
        
        // Navigate after a short delay
        setTimeout(() => {
          navigate('/employee-dashboard');
        }, 1000);
      }
    } catch (error: any) {
      console.error('💥 Employee sign in exception:', error);
      toast({
        title: "Sign In Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLoading) return; // Prevent multiple submissions
    
    if (signUpForm.password !== signUpForm.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await signUp(
        signUpForm.email, 
        signUpForm.password,
        {
          full_name: signUpForm.fullName,
          role: 'employee'
        }
      );

      if (error) {
        toast({
          title: "Sign Up Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Account Created!",
          description: "Please check your email to verify your account.",
        });
        setActiveTab('signin');
        setSignUpForm({ email: '', password: '', confirmPassword: '', fullName: '' });
      }
    } catch (error) {
      toast({
        title: "Sign Up Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (isLoading) return; // Prevent closing while loading
    
    setSignInForm({ email: '', password: '' });
    setSignUpForm({ email: '', password: '', confirmPassword: '', fullName: '' });
    setActiveTab('signin');
    setIsLoading(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Employee Portal
          </DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin" disabled={isLoading}>Sign In</TabsTrigger>
            <TabsTrigger value="signup" disabled={isLoading}>Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="signin">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <Label htmlFor="emp-signin-email">Email</Label>
                <Input
                  id="emp-signin-email"
                  type="email"
                  value={signInForm.email}
                  onChange={(e) => setSignInForm(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="employee@company.com"
                  required
                  disabled={isLoading}
                />
              </div>
              <div>
                <Label htmlFor="emp-signin-password">Password</Label>
                <Input
                  id="emp-signin-password"
                  type="password"
                  value={signInForm.password}
                  onChange={(e) => setSignInForm(prev => ({ ...prev, password: e.target.value }))}
                  required
                  disabled={isLoading}
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="signup">
            <form onSubmit={handleSignUp} className="space-y-4">
              <div>
                <Label htmlFor="emp-signup-name">Full Name</Label>
                <Input
                  id="emp-signup-name"
                  value={signUpForm.fullName}
                  onChange={(e) => setSignUpForm(prev => ({ ...prev, fullName: e.target.value }))}
                  placeholder="Jane Smith"
                  required
                  disabled={isLoading}
                />
              </div>
              <div>
                <Label htmlFor="emp-signup-email">Email</Label>
                <Input
                  id="emp-signup-email"
                  type="email"
                  value={signUpForm.email}
                  onChange={(e) => setSignUpForm(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="employee@company.com"
                  required
                  disabled={isLoading}
                />
              </div>
              <div>
                <Label htmlFor="emp-signup-password">Password</Label>
                <Input
                  id="emp-signup-password"
                  type="password"
                  value={signUpForm.password}
                  onChange={(e) => setSignUpForm(prev => ({ ...prev, password: e.target.value }))}
                  required
                  disabled={isLoading}
                />
              </div>
              <div>
                <Label htmlFor="emp-signup-confirm-password">Confirm Password</Label>
                <Input
                  id="emp-signup-confirm-password"
                  type="password"
                  value={signUpForm.confirmPassword}
                  onChange={(e) => setSignUpForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  required
                  disabled={isLoading}
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeAuthModal;
