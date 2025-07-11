
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield } from 'lucide-react';

interface AccessControlTabProps {
  onEditAccess: () => void;
}

const AccessControlTab = ({ onEditAccess }: AccessControlTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Role-Based Access Management
        </CardTitle>
        <CardDescription>Configure user roles and permissions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">Admin</h4>
              <p className="text-sm text-gray-600">Full system access</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={onEditAccess}>
                Edit
              </Button>
              <span className="text-sm text-gray-500">3 users</span>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">HR Manager</h4>
              <p className="text-sm text-gray-600">HR and employee management</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={onEditAccess}>
                Edit
              </Button>
              <span className="text-sm text-gray-500">5 users</span>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">Employee</h4>
              <p className="text-sm text-gray-600">Basic access to personal data</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={onEditAccess}>
                Edit
              </Button>
              <span className="text-sm text-gray-500">89 users</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccessControlTab;
