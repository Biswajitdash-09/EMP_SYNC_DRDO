
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Settings } from 'lucide-react';

interface OrganizationTabProps {
  onUpdateOrganization: () => void;
}

const OrganizationTab = ({ onUpdateOrganization }: OrganizationTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Organizational Structure
        </CardTitle>
        <CardDescription>Define company hierarchy and reporting structure</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-medium">Executive</h4>
            <p className="text-sm text-gray-600">3 positions</p>
          </div>
          <div className="p-4 border rounded-lg text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-medium">Management</h4>
            <p className="text-sm text-gray-600">12 positions</p>
          </div>
          <div className="p-4 border rounded-lg text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-medium">Staff</h4>
            <p className="text-sm text-gray-600">89 positions</p>
          </div>
        </div>
        <Button className="w-full" variant="outline" onClick={onUpdateOrganization}>
          <Users className="w-4 h-4 mr-2" />
          Update Organization Chart
        </Button>
      </CardContent>
    </Card>
  );
};

export default OrganizationTab;
