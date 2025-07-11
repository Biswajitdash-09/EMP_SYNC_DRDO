
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Shield, Edit, Trash2, Plus } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface UserRole {
  id: number;
  name: string;
  users: number;
  permissions: string;
  editable: boolean;
}

interface PermissionsSettingsProps {
  initialRoles?: UserRole[];
}

const PermissionsSettings = ({ initialRoles }: PermissionsSettingsProps) => {
  const { toast } = useToast();
  
  // User Roles State
  const [userRoles, setUserRoles] = useState<UserRole[]>(initialRoles || [
    { id: 1, name: 'Super Admin', users: 2, permissions: 'Full system access', editable: false },
    { id: 2, name: 'HR Manager', users: 5, permissions: 'HR and employee management', editable: true },
    { id: 3, name: 'Payroll Manager', users: 3, permissions: 'Payroll and financial data', editable: true },
    { id: 4, name: 'Department Manager', users: 12, permissions: 'Department-specific access', editable: true },
    { id: 5, name: 'Employee', users: 1226, permissions: 'Personal data access only', editable: true }
  ]);

  // Edit Role Modal State
  const [editingRole, setEditingRole] = useState<UserRole | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    permissions: ''
  });

  // Role Management Handlers
  const handleDeleteRole = (roleId: number) => {
    const role = userRoles.find(r => r.id === roleId);
    if (role && !role.editable) {
      toast({
        title: "Cannot Delete",
        description: "This system role cannot be deleted.",
        variant: "destructive",
      });
      return;
    }
    
    setUserRoles(prev => prev.filter(role => role.id !== roleId));
    toast({
      title: "Role Deleted",
      description: "User role has been deleted successfully.",
    });
  };

  const handleEditRole = (role: UserRole) => {
    if (!role.editable) {
      toast({
        title: "Cannot Edit",
        description: "This system role cannot be edited.",
        variant: "destructive",
      });
      return;
    }
    
    setEditingRole(role);
    setEditForm({
      name: role.name,
      permissions: role.permissions
    });
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editingRole) return;

    if (!editForm.name.trim() || !editForm.permissions.trim()) {
      toast({
        title: "Validation Error",
        description: "Role name and permissions are required.",
        variant: "destructive",
      });
      return;
    }

    setUserRoles(prev => prev.map(role => 
      role.id === editingRole.id 
        ? { ...role, name: editForm.name.trim(), permissions: editForm.permissions.trim() }
        : role
    ));

    toast({
      title: "Role Updated",
      description: `${editForm.name} role has been updated successfully.`,
    });

    setIsEditModalOpen(false);
    setEditingRole(null);
    setEditForm({ name: '', permissions: '' });
  };

  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
    setEditingRole(null);
    setEditForm({ name: '', permissions: '' });
  };

  const handleCreateRole = () => {
    const newRole: UserRole = {
      id: Math.max(...userRoles.map(r => r.id)) + 1,
      name: 'New Role',
      users: 0,
      permissions: 'Custom permissions',
      editable: true
    };
    setUserRoles(prev => [...prev, newRole]);
    toast({
      title: "Role Created",
      description: "New user role has been created.",
    });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            User Roles and Permissions
          </CardTitle>
          <CardDescription>Manage user access levels and permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {userRoles.map((role) => (
              <div key={role.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">{role.name}</h4>
                  <p className="text-sm text-gray-600">{role.permissions}</p>
                  <p className="text-xs text-gray-500">{role.users} user(s) assigned</p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEditRole(role)}
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  {role.editable && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleDeleteRole(role.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <Button className="mt-4" onClick={handleCreateRole}>
            <Plus className="w-4 h-4 mr-2" />
            Create New Role
          </Button>
        </CardContent>
      </Card>

      {/* Edit Role Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit User Role</DialogTitle>
            <DialogDescription>
              Update the role name and permissions. Changes will affect all users assigned to this role.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="roleName">Role Name</Label>
              <Input
                id="roleName"
                value={editForm.name}
                onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter role name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="rolePermissions">Permissions Description</Label>
              <Textarea
                id="rolePermissions"
                value={editForm.permissions}
                onChange={(e) => setEditForm(prev => ({ ...prev, permissions: e.target.value }))}
                placeholder="Describe the permissions for this role"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancelEdit}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PermissionsSettings;
