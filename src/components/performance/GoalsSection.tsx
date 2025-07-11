
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Target, Plus, Trash2 } from 'lucide-react';
import { Goal } from '@/hooks/usePerformanceData';

interface GoalsSectionProps {
  goals: Goal[];
  onCreateGoal: (goal: any) => void;
  onUpdateProgress: (goalId: string, progress: number) => void;
  onDeleteGoal: (goalId: string) => void;
}

const GoalsSection = ({ goals, onCreateGoal, onUpdateProgress, onDeleteGoal }: GoalsSectionProps) => {
  const [newGoal, setNewGoal] = useState({
    employeeId: 'perf1',
    title: '',
    description: '',
    deadline: '',
    category: 'Technical Skills'
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Active': return 'bg-blue-100 text-blue-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateGoal = () => {
    if (newGoal.title && newGoal.deadline) {
      onCreateGoal({
        ...newGoal,
        progress: 0,
        status: 'Active'
      });
      setNewGoal({
        employeeId: 'perf1',
        title: '',
        description: '',
        deadline: '',
        category: 'Technical Skills'
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5" />
          KPIs and Goals Tracking
        </CardTitle>
        <CardDescription>Set and monitor employee goals and key performance indicators</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold">Create New Goal</h4>
            <div className="space-y-3">
              <div>
                <Label htmlFor="goalTitle">Goal Title *</Label>
                <Input 
                  id="goalTitle" 
                  placeholder="Enter goal title"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="goalDescription">Description</Label>
                <Textarea 
                  id="goalDescription" 
                  placeholder="Goal description"
                  value={newGoal.description}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="deadline">Deadline *</Label>
                <Input 
                  id="deadline" 
                  type="date"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, deadline: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={newGoal.category} onValueChange={(value) => 
                  setNewGoal(prev => ({ ...prev, category: value }))
                }>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Technical Skills">Technical Skills</SelectItem>
                    <SelectItem value="Leadership">Leadership</SelectItem>
                    <SelectItem value="Quality">Quality</SelectItem>
                    <SelectItem value="Communication">Communication</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleCreateGoal} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Create Goal
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold">Active Goals</h4>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {goals.map((goal) => (
                <div key={goal.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h5 className="font-medium">{goal.title}</h5>
                      <p className="text-sm text-gray-600 mb-2">{goal.description}</p>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onUpdateProgress(goal.id, Math.min(100, goal.progress + 10))}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onDeleteGoal(goal.id)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Progress value={goal.progress} className="flex-1" />
                    <span className="text-sm font-medium">{goal.progress}%</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Due: {goal.deadline}</span>
                    <Badge className={getStatusColor(goal.status)}>
                      {goal.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalsSection;
