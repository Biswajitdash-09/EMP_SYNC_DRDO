
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, UserMinus, Plus, Trash2 } from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChecklistItem {
  id: string;
  task: string;
  completed: boolean;
  assignee: string;
  dueDate: string;
}

const OnboardingModal = ({ isOpen, onClose }: OnboardingModalProps) => {
  const { toast } = useToast();
  
  const [onboardingTasks, setOnboardingTasks] = useState<ChecklistItem[]>([
    { id: '1', task: 'Send welcome email', completed: false, assignee: 'HR', dueDate: 'Day 1' },
    { id: '2', task: 'Prepare workstation and IT equipment', completed: false, assignee: 'IT', dueDate: 'Day 1' },
    { id: '3', task: 'Schedule office tour', completed: false, assignee: 'HR', dueDate: 'Day 1' },
    { id: '4', task: 'Complete HR documentation', completed: false, assignee: 'Employee', dueDate: 'Day 2' },
    { id: '5', task: 'Set up system accounts', completed: false, assignee: 'IT', dueDate: 'Day 1' },
    { id: '6', task: 'Introduce to team members', completed: false, assignee: 'Manager', dueDate: 'Day 1' },
    { id: '7', task: 'Review job responsibilities', completed: false, assignee: 'Manager', dueDate: 'Week 1' },
    { id: '8', task: 'Complete compliance training', completed: false, assignee: 'Employee', dueDate: 'Week 2' }
  ]);

  const [offboardingTasks, setOffboardingTasks] = useState<ChecklistItem[]>([
    { id: '1', task: 'Schedule exit interview', completed: false, assignee: 'HR', dueDate: 'Last Day' },
    { id: '2', task: 'Collect company equipment', completed: false, assignee: 'IT', dueDate: 'Last Day' },
    { id: '3', task: 'Revoke system access', completed: false, assignee: 'IT', dueDate: 'Last Day' },
    { id: '4', task: 'Process final payroll', completed: false, assignee: 'Payroll', dueDate: 'After Last Day' },
    { id: '5', task: 'Transfer responsibilities', completed: false, assignee: 'Manager', dueDate: 'Before Last Day' },
    { id: '6', task: 'Return company documents', completed: false, assignee: 'Employee', dueDate: 'Last Day' },
    { id: '7', task: 'Update organizational chart', completed: false, assignee: 'HR', dueDate: 'After Last Day' }
  ]);

  const [newTask, setNewTask] = useState({ task: '', assignee: '', dueDate: '' });

  const handleToggleTask = (type: 'onboarding' | 'offboarding', taskId: string) => {
    if (type === 'onboarding') {
      setOnboardingTasks(prev => 
        prev.map(task => 
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
      );
    } else {
      setOffboardingTasks(prev => 
        prev.map(task => 
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
      );
    }
  };

  const handleAddTask = (type: 'onboarding' | 'offboarding') => {
    if (!newTask.task.trim() || !newTask.assignee.trim()) {
      toast({
        title: "Error",
        description: "Please fill in task name and assignee.",
        variant: "destructive"
      });
      return;
    }

    const task: ChecklistItem = {
      id: Date.now().toString(),
      task: newTask.task,
      completed: false,
      assignee: newTask.assignee,
      dueDate: newTask.dueDate || 'TBD'
    };

    if (type === 'onboarding') {
      setOnboardingTasks(prev => [...prev, task]);
    } else {
      setOffboardingTasks(prev => [...prev, task]);
    }

    setNewTask({ task: '', assignee: '', dueDate: '' });
    
    toast({
      title: "Task Added",
      description: `New ${type} task has been added successfully.`,
    });
  };

  const handleDeleteTask = (type: 'onboarding' | 'offboarding', taskId: string) => {
    if (type === 'onboarding') {
      setOnboardingTasks(prev => prev.filter(task => task.id !== taskId));
    } else {
      setOffboardingTasks(prev => prev.filter(task => task.id !== taskId));
    }
    
    toast({
      title: "Task Removed",
      description: "Task has been removed successfully.",
    });
  };

  const renderTaskList = (tasks: ChecklistItem[], type: 'onboarding' | 'offboarding') => (
    <div className="space-y-2">
      {tasks.map((task) => (
        <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
          <div className="flex items-center space-x-3 flex-1">
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => handleToggleTask(type, task.id)}
            />
            <div className="flex-1">
              <p className={`text-sm ${task.completed ? 'line-through text-gray-500' : ''}`}>
                {task.task}
              </p>
              <p className="text-xs text-gray-500">
                Assigned to: {task.assignee} • Due: {task.dueDate}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDeleteTask(type, task.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ))}
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Onboarding & Offboarding Workflow Management</DialogTitle>
          <DialogDescription>
            Manage employee onboarding and offboarding checklists and processes
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="onboarding" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="onboarding" className="flex items-center gap-2">
              <UserPlus className="w-4 h-4" />
              Onboarding
            </TabsTrigger>
            <TabsTrigger value="offboarding" className="flex items-center gap-2">
              <UserMinus className="w-4 h-4" />
              Offboarding
            </TabsTrigger>
          </TabsList>

          <TabsContent value="onboarding" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Add New Onboarding Task</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Task Description</Label>
                    <Input
                      value={newTask.task}
                      onChange={(e) => setNewTask(prev => ({ ...prev, task: e.target.value }))}
                      placeholder="Enter task description"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Assignee</Label>
                    <Input
                      value={newTask.assignee}
                      onChange={(e) => setNewTask(prev => ({ ...prev, assignee: e.target.value }))}
                      placeholder="Who is responsible?"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Due Date</Label>
                    <Input
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))}
                      placeholder="When is it due?"
                    />
                  </div>
                </div>
                <Button onClick={() => handleAddTask('onboarding')} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Onboarding Task
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Onboarding Checklist ({onboardingTasks.filter(t => t.completed).length}/{onboardingTasks.length} completed)</CardTitle>
              </CardHeader>
              <CardContent>
                {renderTaskList(onboardingTasks, 'onboarding')}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="offboarding" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Add New Offboarding Task</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Task Description</Label>
                    <Input
                      value={newTask.task}
                      onChange={(e) => setNewTask(prev => ({ ...prev, task: e.target.value }))}
                      placeholder="Enter task description"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Assignee</Label>
                    <Input
                      value={newTask.assignee}
                      onChange={(e) => setNewTask(prev => ({ ...prev, assignee: e.target.value }))}
                      placeholder="Who is responsible?"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Due Date</Label>
                    <Input
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))}
                      placeholder="When is it due?"
                    />
                  </div>
                </div>
                <Button onClick={() => handleAddTask('offboarding')} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Offboarding Task
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Offboarding Checklist ({offboardingTasks.filter(t => t.completed).length}/{offboardingTasks.length} completed)</CardTitle>
              </CardHeader>
              <CardContent>
                {renderTaskList(offboardingTasks, 'offboarding')}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end pt-4 border-t">
          <Button onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingModal;
