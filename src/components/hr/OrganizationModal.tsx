
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Users, Plus, Trash2 } from 'lucide-react';

interface OrganizationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Department {
  id: string;
  name: string;
  headCount: number;
  manager: string;
}

interface Position {
  id: string;
  title: string;
  department: string;
  level: string;
  reportsTo: string;
}

const OrganizationModal = ({ isOpen, onClose }: OrganizationModalProps) => {
  const { toast } = useToast();
  const [departments, setDepartments] = useState<Department[]>([
    { id: '1', name: 'Executive', headCount: 3, manager: 'CEO' },
    { id: '2', name: 'Human Resources', headCount: 5, manager: 'HR Director' },
    { id: '3', name: 'Engineering', headCount: 25, manager: 'CTO' },
    { id: '4', name: 'Sales', headCount: 15, manager: 'Sales Director' },
    { id: '5', name: 'Marketing', headCount: 8, manager: 'Marketing Manager' },
    { id: '6', name: 'Finance', headCount: 6, manager: 'CFO' }
  ]);

  const [positions, setPositions] = useState<Position[]>([
    { id: '1', title: 'CEO', department: 'Executive', level: 'C-Level', reportsTo: 'Board' },
    { id: '2', title: 'CTO', department: 'Executive', level: 'C-Level', reportsTo: 'CEO' },
    { id: '3', title: 'CFO', department: 'Executive', level: 'C-Level', reportsTo: 'CEO' },
    { id: '4', title: 'HR Director', department: 'Human Resources', level: 'Director', reportsTo: 'CEO' },
    { id: '5', title: 'Senior Software Engineer', department: 'Engineering', level: 'Senior', reportsTo: 'CTO' }
  ]);

  const [newDepartment, setNewDepartment] = useState({ name: '', manager: '' });
  const [newPosition, setNewPosition] = useState({ title: '', department: '', level: '', reportsTo: '' });

  const handleAddDepartment = () => {
    if (!newDepartment.name.trim() || !newDepartment.manager.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all department fields.",
        variant: "destructive"
      });
      return;
    }

    const department: Department = {
      id: Date.now().toString(),
      name: newDepartment.name,
      headCount: 0,
      manager: newDepartment.manager
    };

    setDepartments(prev => [...prev, department]);
    setNewDepartment({ name: '', manager: '' });
    
    toast({
      title: "Department Added",
      description: `${department.name} department has been added successfully.`,
    });
  };

  const handleAddPosition = () => {
    if (!newPosition.title.trim() || !newPosition.department.trim()) {
      toast({
        title: "Error",
        description: "Please fill in required position fields.",
        variant: "destructive"
      });
      return;
    }

    const position: Position = {
      id: Date.now().toString(),
      title: newPosition.title,
      department: newPosition.department,
      level: newPosition.level,
      reportsTo: newPosition.reportsTo
    };

    setPositions(prev => [...prev, position]);
    setNewPosition({ title: '', department: '', level: '', reportsTo: '' });
    
    toast({
      title: "Position Added",
      description: `${position.title} position has been added successfully.`,
    });
  };

  const handleDeleteDepartment = (id: string) => {
    setDepartments(prev => prev.filter(dept => dept.id !== id));
    toast({
      title: "Department Removed",
      description: "Department has been removed successfully.",
    });
  };

  const handleDeletePosition = (id: string) => {
    setPositions(prev => prev.filter(pos => pos.id !== id));
    toast({
      title: "Position Removed",
      description: "Position has been removed successfully.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Organization Structure Management
          </DialogTitle>
          <DialogDescription>
            Manage departments, positions, and organizational hierarchy
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="departments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="positions">Positions</TabsTrigger>
          </TabsList>

          <TabsContent value="departments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Add New Department</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Department Name</Label>
                    <Input
                      value={newDepartment.name}
                      onChange={(e) => setNewDepartment(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter department name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Department Manager</Label>
                    <Input
                      value={newDepartment.manager}
                      onChange={(e) => setNewDepartment(prev => ({ ...prev, manager: e.target.value }))}
                      placeholder="Enter manager name"
                    />
                  </div>
                </div>
                <Button onClick={handleAddDepartment} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Department
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Current Departments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {departments.map((dept) => (
                    <div key={dept.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{dept.name}</h4>
                        <p className="text-sm text-gray-600">Manager: {dept.manager} • {dept.headCount} employees</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteDepartment(dept.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="positions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Add New Position</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Position Title</Label>
                    <Input
                      value={newPosition.title}
                      onChange={(e) => setNewPosition(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter position title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Department</Label>
                    <Input
                      value={newPosition.department}
                      onChange={(e) => setNewPosition(prev => ({ ...prev, department: e.target.value }))}
                      placeholder="Enter department"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Level</Label>
                    <Input
                      value={newPosition.level}
                      onChange={(e) => setNewPosition(prev => ({ ...prev, level: e.target.value }))}
                      placeholder="Enter position level"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Reports To</Label>
                    <Input
                      value={newPosition.reportsTo}
                      onChange={(e) => setNewPosition(prev => ({ ...prev, reportsTo: e.target.value }))}
                      placeholder="Enter reporting manager"
                    />
                  </div>
                </div>
                <Button onClick={handleAddPosition} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Position
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Current Positions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {positions.map((pos) => (
                    <div key={pos.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{pos.title}</h4>
                        <p className="text-sm text-gray-600">
                          {pos.department} • {pos.level} • Reports to: {pos.reportsTo}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeletePosition(pos.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
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

export default OrganizationModal;
