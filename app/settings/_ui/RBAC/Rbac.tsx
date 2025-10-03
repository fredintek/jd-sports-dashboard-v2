"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Role } from "@/types/rbac";
import { mockRoles } from "./data";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Props = {
  permissions: string[];
  setPermissions: React.Dispatch<React.SetStateAction<string[]>>;
};

const variantColor: Record<
  number,
  "default" | "secondary" | "destructive" | "outline" | "success" | "pending"
> = {
  0: "default",
  1: "secondary",
  2: "success",
  3: "pending",
  4: "outline",
  5: "destructive",
};

const Rbac = ({ permissions, setPermissions }: Props) => {
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  console.log("roles", roles);
  const [editingRole, setEditingRole] = useState<Role | null>(null);

  const handleSave = (updatedRole: Role) => {
    setRoles((prev) =>
      prev.some((r) => r.id === updatedRole.id)
        ? prev.map((role) => (role.id === updatedRole.id ? updatedRole : role))
        : [...prev, updatedRole]
    );
    setEditingRole(null);
  };

  const handleDelete = (roleId: string) => {
    setRoles((prev) => prev.filter((role) => role.id !== roleId));
  };

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <div className="flex flex-col">
          <CardTitle>Roles</CardTitle>
          <CardDescription>Manage, create and edit roles</CardDescription>
        </div>
        <Button
          onClick={() =>
            setEditingRole({
              id: Date.now().toString(),
              name: "",
              permissions: [],
            })
          }
        >
          Create Role
        </Button>
      </CardHeader>

      <CardContent className="grid gap-4">
        {roles?.map((role, idx: number) => (
          <div key={idx} className="border p-3 rounded-md">
            {/* top */}
            <div className="flex justify-between items-center">
              <p className="text-sm text-white font-medium">{role.name}</p>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setEditingRole(role)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="sm" variant="destructive">
                      <Trash className="w-4 h-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Role?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. The role will be
                        permanently deleted.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(role.id)}>
                        Confirm
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>

            {/* bottom */}
            <div className="flex gap-4 flex-wrap mt-2">
              {role.permissions?.map((perm, idx: number) => {
                const target = variantColor[idx];
                return (
                  <Badge key={idx} variant={target}>
                    {perm}
                  </Badge>
                );
              })}
            </div>
          </div>
        ))}
        {/* Role Edit / Create Dialog */}
        {editingRole && (
          <Dialog
            open={!!editingRole}
            onOpenChange={() => setEditingRole(null)}
          >
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>
                  {editingRole.name ? "Edit Role" : "New Role"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Role Name"
                  className="w-full border p-2 rounded"
                  value={editingRole.name}
                  onChange={(e) =>
                    setEditingRole({ ...editingRole, name: e.target.value })
                  }
                />

                <div className="grid grid-cols-2 gap-2">
                  {permissions.map((perm) => (
                    <label key={perm} className="flex items-center space-x-2">
                      <Checkbox
                        checked={editingRole.permissions.includes(perm)}
                        onCheckedChange={(checked) => {
                          setEditingRole({
                            ...editingRole,
                            permissions: checked
                              ? [...editingRole.permissions, perm]
                              : editingRole.permissions.filter(
                                  (p) => p !== perm
                                ),
                          });
                        }}
                      />
                      <span>{perm}</span>
                    </label>
                  ))}
                </div>

                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setEditingRole(null)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={() => handleSave(editingRole)}>Save</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  );
};

export default Rbac;
