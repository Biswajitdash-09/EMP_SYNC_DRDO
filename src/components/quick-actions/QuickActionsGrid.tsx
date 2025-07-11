
import { UserPlus, DollarSign, Calendar, FileText, BarChart3 } from 'lucide-react';
import QuickActionCard from './QuickActionCard';

interface QuickActionsGridProps {
  onActionSelect: (actionId: string) => void;
}

const QuickActionsGrid = ({ onActionSelect }: QuickActionsGridProps) => {
  const quickActions = [
    {
      id: 'add-employee',
      title: 'Add Employee',
      description: 'Quickly onboard new team members',
      icon: UserPlus,
      color: 'blue',
    },
    {
      id: 'process-payroll',
      title: 'Process Payroll',
      description: 'Calculate and process monthly payroll',
      icon: DollarSign,
      color: 'green',
    },
    {
      id: 'leave-requests',
      title: 'Leave Requests',
      description: 'Review pending leave applications',
      icon: Calendar,
      color: 'orange',
    },
    {
      id: 'generate-report',
      title: 'Generate Report',
      description: 'Create comprehensive business reports',
      icon: FileText,
      color: 'purple',
    },
    {
      id: 'performance-review',
      title: 'Performance Review',
      description: 'Conduct employee performance evaluations',
      icon: BarChart3,
      color: 'red',
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Available Quick Actions</h2>
        <p className="text-gray-600">Perform common HR tasks quickly and efficiently</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quickActions.map((action) => (
          <QuickActionCard
            key={action.id}
            {...action}
            onAction={() => onActionSelect(action.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default QuickActionsGrid;
