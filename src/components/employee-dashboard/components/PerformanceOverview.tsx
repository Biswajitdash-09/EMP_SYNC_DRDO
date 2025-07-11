
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Target, MessageSquare, Award } from 'lucide-react';

interface Goal {
  id: string;
  title: string;
  progress: number;
  target: string;
  status: 'on-track' | 'at-risk' | 'completed';
}

interface Feedback {
  id: string;
  from: string;
  message: string;
  date: string;
  type: 'positive' | 'constructive';
}

const PerformanceOverview = () => {
  const kpis = [
    { label: 'Current Score', value: '4.2/5.0', trend: '+0.3' },
    { label: 'Goals Completed', value: '8/12', trend: '+2' },
    { label: 'Peer Rating', value: '4.5/5.0', trend: '+0.1' }
  ];

  const goals: Goal[] = [
    {
      id: 'g1',
      title: 'Complete React Training',
      progress: 75,
      target: 'Jul 30, 2024',
      status: 'on-track'
    },
    {
      id: 'g2',
      title: 'Improve Code Quality',
      progress: 90,
      target: 'Aug 15, 2024',
      status: 'on-track'
    },
    {
      id: 'g3',
      title: 'Team Leadership Project',
      progress: 45,
      target: 'Sep 1, 2024',
      status: 'at-risk'
    }
  ];

  const recentFeedback: Feedback[] = [
    {
      id: 'f1',
      from: 'Alice Johnson (Manager)',
      message: 'Excellent work on the client presentation. Very well prepared and delivered.',
      date: '2024-06-26',
      type: 'positive'
    },
    {
      id: 'f2',
      from: 'Robert Davis (Team Lead)',
      message: 'Consider improving documentation practices for better team collaboration.',
      date: '2024-06-21',
      type: 'constructive'
    }
  ];

  const getGoalStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'on-track': return 'bg-blue-100 text-blue-800';
      case 'at-risk': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {kpis.map((kpi, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{kpi.label}</p>
                  <p className="text-2xl font-bold">{kpi.value}</p>
                </div>
                <div className="flex items-center text-green-600">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span className="text-sm">{kpi.trend}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Goals Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {goals.map((goal) => (
              <div key={goal.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{goal.title}</h4>
                  <div className="flex items-center gap-2">
                    <Badge className={getGoalStatusColor(goal.status)}>
                      {goal.status.replace('-', ' ')}
                    </Badge>
                    <span className="text-sm text-gray-600">{goal.progress}%</span>
                  </div>
                </div>
                <Progress value={goal.progress} className="h-2" />
                <p className="text-xs text-gray-600">Target: {goal.target}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Recent Feedback
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentFeedback.map((feedback) => (
              <div key={feedback.id} className="border-l-4 border-blue-500 pl-4 py-2">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-sm">{feedback.from}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant={feedback.type === 'positive' ? 'default' : 'secondary'}>
                      {feedback.type}
                    </Badge>
                    <span className="text-xs text-gray-500">{feedback.date}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-700">{feedback.message}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceOverview;
