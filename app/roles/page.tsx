"use client";

import { useState } from "react";
import { Eye, Edit, Trash, Trash2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { addRole, deleteRole, updateRole } from "@/redux/slices/roleSlice";
import { defaultPermissions } from "./_ui/RBAC/permission";
import { Role } from "./_ui/RBAC/data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function RoleSettingsPage() {
  const dispatch = useAppDispatch();
  const roles = useAppSelector((state) => state.roles.roles);

  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [roleName, setRoleName] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const togglePermission = (id: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleSave = () => {
    const permissions = defaultPermissions.filter((p) =>
      selectedPermissions.includes(p.id)
    );

    if (editMode && selectedRole) {
      dispatch(
        updateRole({ id: selectedRole.id, name: roleName, permissions })
      );
    } else {
      dispatch(addRole({ name: roleName, permissions }));
    }

    setOpen(false);
    setRoleName("");
    setSelectedPermissions([]);
    setEditMode(false);
    setSelectedRole(null);
  };

  const handleEdit = (role: Role) => {
    setRoleName(role.name);
    setSelectedPermissions(role.permissions.map((p) => p.id));
    setSelectedRole(role);
    setEditMode(true);
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteRole(id));
  };

  const handleViewPermissions = (role: Role) => {
    setSelectedRole(role);
    setViewOpen(true);
  };

  // Badge color mapping
  const actionColors: Record<string, string> = {
    view: "bg-gray-200 text-gray-800",
    edit: "bg-blue-200 text-blue-800",
    delete: "bg-red-200 text-red-800",
    create: "bg-green-200 text-green-800",
  };

  return (
    <div className="grid grid-cols-2">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Roles & Permissions</h1>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setEditMode(false);
                  setRoleName("");
                  setSelectedPermissions([]);
                }}
              >
                Create Role
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editMode ? "Edit Role" : "Create a New Role"}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                <Input
                  placeholder="Role name (e.g. Admin)"
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                />

                {Array.from(
                  new Set(defaultPermissions.map((p) => p.group))
                ).map((group) => (
                  <div key={group} className="mb-4 border-b pb-2">
                    <h3 className="font-medium mb-2">{group}</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {defaultPermissions
                        .filter((p) => p.group === group)
                        .map((perm) => (
                          <label
                            key={perm.id}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              checked={selectedPermissions.includes(perm.id)}
                              onCheckedChange={() => togglePermission(perm.id)}
                            />
                            <span className="capitalize">{perm.action}</span>
                          </label>
                        ))}
                    </div>
                  </div>
                ))}

                <Button onClick={handleSave} className="w-full">
                  {editMode ? "Update Role" : "Save Role"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="p-4">
          {roles?.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Role Name</TableHead>
                  <TableHead className="w-[180px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roles.map((role) => (
                  <TableRow key={role.id}>
                    <TableCell>{role.name}</TableCell>
                    <TableCell className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewPermissions(role)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(role)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete the nav link
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(role.id)}
                            >
                              Confirm
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center text-center space-y-3">
              <div className="bg-muted rounded-full p-4">
                <Eye className="w-10 h-10 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-medium">No Roles Found</h3>
                <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                  You haven’t created any roles yet. Start by adding your first
                  role to manage permissions.
                </p>
              </div>
            </div>
          )}
        </Card>

        {/* View Permissions Modal */}
        <Dialog open={viewOpen} onOpenChange={setViewOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                Permissions for Role: {selectedRole?.name}
              </DialogTitle>
            </DialogHeader>

            {selectedRole && (
              <div className="space-y-4">
                {Array.from(
                  new Set(selectedRole.permissions.map((p) => p.group))
                ).map((group) => (
                  <div key={group} className="border-b pb-3">
                    <h3 className="font-semibold mb-2">{group}</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedRole.permissions
                        .filter((p) => p.group === group)
                        .map((perm) => (
                          <Badge
                            key={perm.id}
                            className={`capitalize ${
                              actionColors[perm.action]
                            }`}
                          >
                            {perm.action}
                          </Badge>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
