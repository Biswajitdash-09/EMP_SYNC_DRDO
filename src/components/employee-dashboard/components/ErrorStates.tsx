
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Shield } from 'lucide-react';

export const AccessDeniedError = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-red-500" />
          Access Denied
        </CardTitle>
        <CardDescription>
          You need to be logged in to access the employee dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={() => window.location.href = '/auth'} className="w-full">
          Go to Login
        </Button>
      </CardContent>
    </Card>
  </div>
);

export const EmployeeNotFoundError = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5 text-orange-500" />
          Employee Profile Not Found
        </CardTitle>
        <CardDescription>
          Your employee profile could not be found. Please contact HR for assistance.
        </CardDescription>
      </CardHeader>
    </Card>
  </div>
);
