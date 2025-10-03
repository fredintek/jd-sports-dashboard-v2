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
import { Edit, Trash } from "lucide-react";

type Props = {
  permissions: string[];
  setPermissions: React.Dispatch<React.SetStateAction<string[]>>;
};

const Permissions = ({ permissions, setPermissions }: Props) => {
  const [editingPermission, setEditingPermission] = useState<string | null>(
    null
  );
  const [newPermission, setNewPermission] = useState("");
  const [permissionDialogOpen, setPermissionDialogOpen] = useState(false);

  const handleSave = () => {
    if (!newPermission.trim()) return;
    setPermissions((prev) =>
      prev.map((perm) => (perm === editingPermission ? newPermission : perm))
    );
    setEditingPermission(null);
    setNewPermission("");
  };

  const handleDelete = (permission: string) => {
    setPermissions((prev) => prev.filter((p) => p !== permission));
  };

  const handleAddPermission = () => {
    if (!newPermission.trim()) return;
    if (!permissions.includes(newPermission)) {
      setPermissions([...permissions, newPermission]);
    }
    setNewPermission("");
    setPermissionDialogOpen(false);
  };

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <div>
          <CardTitle>Permissions</CardTitle>
          <CardDescription>Create, edit and delete permissions</CardDescription>
        </div>
        <Dialog
          open={permissionDialogOpen}
          onOpenChange={setPermissionDialogOpen}
        >
          <DialogTrigger asChild>
            <Button variant={"secondary"} onClick={handleAddPermission}>
              Create Permission
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle>New Permission</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Permission name"
                className="w-full border p-2 rounded"
                value={newPermission}
                onChange={(e) => setNewPermission(e.target.value)}
              />
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setNewPermission("");
                    setPermissionDialogOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleAddPermission}>Save</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="space-y-3">
        {permissions.map((perm, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center border p-2 rounded"
          >
            <span>{perm}</span>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setEditingPermission(perm);
                  setNewPermission(perm);
                }}
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
                    <AlertDialogTitle>Delete Permission?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. The permission will be
                      permanently removed.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete(perm)}>
                      Confirm
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ))}

        {editingPermission && (
          <Dialog
            open={!!editingPermission}
            onOpenChange={() => setEditingPermission(null)}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Permission</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <input
                  type="text"
                  value={newPermission}
                  onChange={(e) => setNewPermission(e.target.value)}
                  className="w-full border p-2 rounded"
                />
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setEditingPermission(null)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSave}>Save</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  );
};

export default Permissions;
