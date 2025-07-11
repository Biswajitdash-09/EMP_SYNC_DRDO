
import { Button } from "@/components/ui/button";
import { Building, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HRManagementHeaderProps {
  onNewPolicy: () => void;
}

const HRManagementHeader = ({ onNewPolicy }: HRManagementHeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate('/dashboard')} className="bg-orange-400 hover:bg-orange-300 text-slate-50">
              ← Back to Dashboard
            </Button>
            <div className="flex items-center space-x-2">
              <Building className="w-6 h-6 text-green-600" />
              <h1 className="text-xl font-bold text-gray-900">HR Management</h1>
            </div>
          </div>
          <Button className="bg-green-600 hover:bg-green-700" onClick={onNewPolicy}>
            <FileText className="w-4 h-4 mr-2" />
            New Policy
          </Button>
        </div>
      </div>
    </header>
  );
};

export default HRManagementHeader;
