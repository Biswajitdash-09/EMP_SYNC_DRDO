
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Shield, Users, Plus, Trash2, Edit } from 'lucide-react';

interface AccessControlModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Role {
  id: string;
  name: string;
  description: string;
  userCount: number;
  permissions: string[];
}

interface Permission {
  id: string;
  name: string;
  category: string;
  description: string;
}

const AccessControlModal = ({ isOpen, onClose }: AccessControlModalProps) => {
  const { toast } = useToast();

  const [roles, setRoles] = useState<Role[]>([
    {
      id: '1',
      name: 'Admin',
      description: 'Full system access and management capabilities',
      userCount: 3,
      permissions: ['user_management', 'system_settings', 'reports_access', 'data_export', 'role_management']
    },
    {
      id: '2',
      name: 'HR Manager',
      description: 'HR operations and employee management',
      userCount: 5,
      permissions: ['employee_management', 'payroll_access', 'reports_access', 'policy_management']
    },
    {
      id: '3',
      name: 'Employee',
      description: 'Basic access to personal data and company information',
      userCount: 89,
      permissions: ['profile_access', 'time_tracking', 'leave_requests']
    },
    {
      id: '4',
      name: 'Manager',
      description: 'Team management and reporting capabilities',
      userCount: 12,
      permissions: ['team_management', 'reports_access', 'leave_approval', 'performance_reviews']
    }
  ]);

  const [permissions] = useState<Permission[]>([
    { id: 'user_management', name: 'User Management', category: 'Administration', description: 'Create, edit, and delete user accounts' },
    { id: 'system_settings', name: 'System Settings', category: 'Administration', description: 'Configure system-wide settings' },
    { id: 'role_management', name: 'Role Management', category: 'Administration', description: 'Create and modify user roles' },
    { id: 'employee_management', name: 'Employee Management', category: 'HR', description: 'Manage employee records and information' },
    { id: 'payroll_access', name: 'Payroll Access', category: 'HR', description: 'Access payroll information and processing' },
    { id: 'policy_management', name: 'Policy Management', category: 'HR', description: 'Create and manage company policies' },
    { id: 'reports_access', name: 'Reports Access', category: 'Analytics', description: 'Generate and view system reports' },
    { id: 'data_export', name: 'Data Export', category: 'Analytics', description: 'Export system data and reports' },
    { id: 'profile_access', name: 'Profile Access', category: 'Personal', description: 'View and edit personal profile' },
    { id: 'time_tracking', name: 'Time Tracking', category: 'Personal', description: 'Log and track working hours' },
    { id: 'leave_requests', name: 'Leave Requests', category: 'Personal', description: 'Submit leave and vacation requests' },
    { id: 'team_management', name: 'Team Management', category: 'Management', description: 'Manage direct reports and team members' },
    { id: 'leave_approval', name: 'Leave Approval', category: 'Management', description: 'Approve team member leave requests' },
    { id: 'performance_reviews', name: 'Performance Reviews', category: 'Management', description: 'Conduct and manage performance reviews' }
  ]);

  const [newRole, setNewRole] = useState({ name: '', description: '', permissions: [] as string[] });
  const [editingRole, setEditingRole] = useState<Role | null>(null);

  const handleAddRole = () => {
    if (!newRole.name.trim() || !newRole.description.trim()) {
      toast({
        title: "Error",
        description: "Please fill in role name and description.",
        variant: "destructive"
      });
      return;
    }

    const role: Role = {
      id: Date.now().toString(),
      name: newRole.name,
      description: newRole.description,
      userCount: 0,
      permissions: newRole.permissions
    };

    setRoles(prev => [...prev, role]);
    setNewRole({ name: '', description: '', permissions: [] });
    
    toast({
      title: "Role Created",
      description: `${role.name} role has been created successfully.`,
    });
  };

  const handleUpdateRole = () => {
    if (!editingRole) return;

    setRoles(prev => prev.map(role => 
      role.id === editingRole.id ? editingRole : role
    ));
    
    setEditingRole(null);
    
    toast({
      title: "Role Updated",
      description: `${editingRole.name} role has been updated successfully.`,
    });
  };

  const handleDeleteRole = (roleId: string) => {
    const role = roles.find(r => r.id === roleId);
    if (role && role.userCount > 0) {
      toast({
        title: "Cannot Delete Role",
        description: "Cannot delete a role that has assigned users.",
        variant: "destructive"
      });
      return;
    }

    setRoles(prev => prev.filter(role => role.id !== roleId));
    toast({
      title: "Role Deleted",
      description: "Role has been deleted successfully.",
    });
  };

  const handlePermissionToggle = (permissionId: string, isNew: boolean = false) => {
    if (isNew) {
      setNewRole(prev => ({
        ...prev,
        permissions: prev.permissions.includes(permissionId)
          ? prev.permissions.filter(p => p !== permissionId)
          : [...prev.permissions, permissionId]
      }));
    } else if (editingRole) {
      setEditingRole(prev => prev ? {
        ...prev,
        permissions: prev.permissions.includes(permissionId)
          ? prev.permissions.filter(p => p !== permissionId)
          : [...prev.permissions, permissionId]
      } : null);
    }
  };

  const groupedPermissions = permissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {} as Record<string, Permission[]>);

  const renderPermissionsSection = (selectedPermissions: string[], isNew: boolean = false) => (
    <div className="space-y-4">
      {Object.entries(groupedPermissions).map(([category, categoryPermissions]) => (
        <div key={category}>
          <h4 className="font-medium text-gray-900 mb-2">{category}</h4>
          <div className="space-y-2 ml-4">
            {categoryPermissions.map((permission) => (
              <div key={permission.id} className="flex items-start space-x-2">
                <Checkbox
                  checked={selectedPermissions.includes(permission.id)}
                  onCheckedChange={() => handlePermissionToggle(permission.id, isNew)}
                />
                <div className="flex-1">
                  <label className="text-sm font-medium cursor-pointer">
                    {permission.name}
                  </label>
                  <p className="text-xs text-gray-500">{permission.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Access Control Management
          </DialogTitle>
          <DialogDescription>
            Manage user roles and permissions for system access control
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="roles" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="roles">Roles</TabsTrigger>
            <TabsTrigger value="create">Create Role</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
          </TabsList>

          <TabsContent value="roles" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Current Roles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {roles.map((role) => (
                    <div key={role.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{role.name}</h4>
                          <p className="text-sm text-gray-600 mt-1">{role.description}</p>
                          <p className="text-xs text-gray-500 mt-2">
                            {role.userCount} users • {role.permissions.length} permissions
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingRole(role)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteRole(role.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {role.permissions.slice(0, 3).map((permId) => {
                          const perm = permissions.find(p => p.id === permId);
                          return perm ? (
                            <span key={permId} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                              {perm.name}
                            </span>
                          ) : null;
                        })}
                        {role.permissions.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                            +{role.permissions.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="create" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>
                  {editingRole ? `Edit Role: ${editingRole.name}` : 'Create New Role'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Role Name</Label>
                    <Input
                      value={editingRole ? editingRole.name : newRole.name}
                      onChange={(e) => {
                        if (editingRole) {
                          setEditingRole(prev => prev ? { ...prev, name: e.target.value } : null);
                        } else {
                          setNewRole(prev => ({ ...prev, name: e.target.value }));
                        }
                      }}
                      placeholder="Enter role name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Input
                      value={editingRole ? editingRole.description : newRole.description}
                      onChange={(e) => {
                        if (editingRole) {
                          setEditingRole(prev => prev ? { ...prev, description: e.target.value } : null);
                        } else {
                          setNewRole(prev => ({ ...prev, description: e.target.value }));
                        }
                      }}
                      placeholder="Enter role description"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Permissions</Label>
                  <div className="max-h-60 overflow-y-auto border rounded-lg p-4">
                    {renderPermissionsSection(
                      editingRole ? editingRole.permissions : newRole.permissions,
                      !editingRole
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={editingRole ? handleUpdateRole : handleAddRole}
                    className="flex-1"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    {editingRole ? 'Update Role' : 'Create Role'}
                  </Button>
                  {editingRole && (
                    <Button
                      variant="outline"
                      onClick={() => setEditingRole(null)}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="permissions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>System Permissions</CardTitle>
                <CardDescription>
                  Overview of all available permissions in the system
                </CardDescription>
              </CardHeader>
              <CardContent>
                {Object.entries(groupedPermissions).map(([category, categoryPermissions]) => (
                  <div key={category} className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      {category}
                    </h4>
                    <div className="grid gap-2 ml-6">
                      {categoryPermissions.map((permission) => (
                        <div key={permission.id} className="p-3 border rounded-lg">
                          <h5 className="font-medium text-sm">{permission.name}</h5>
                          <p className="text-xs text-gray-600 mt-1">{permission.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
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

export default AccessControlModal;
