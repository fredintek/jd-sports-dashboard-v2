"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Edit, Trash2, Key, Undo2, Download } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  addUser,
  deleteUser,
  updateUser,
  User,
} from "@/redux/slices/userSlice";
import { format } from "date-fns";

export default function UsersPage() {
  const stateUser = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [users, setUsers] = useState<User[]>(stateUser.users);
  const [searchUser, setSearchUser] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isNewUserDialogOpen, setIsNewUserDialogOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);

  const filteredData = useMemo(() => {
    return users.filter((row) => {
      const matchesStatus =
        statusFilter === "All" ? true : row.status === statusFilter;
      const matchesCustomer = row.name
        .toLowerCase()
        .includes(searchUser.toLowerCase());
      return matchesStatus && matchesCustomer;
    });
  }, [statusFilter, searchUser]);

  const exportToCSV = () => {
    const headers = ["Name", "Email", "Role", "Status", "Last Login"];
    const rows = filteredData.map((row) => [
      row.name,
      row.email,
      row.role,
      row.status,
      row.lastLogin,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "users_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetFilter = () => {
    setSearchUser("");
    setStatusFilter("All");
  };

  const handleAddUser = (user: Omit<User, "id">) => {
    dispatch(addUser({ ...user }));
    toast.success("User created successfully");
    setIsNewUserDialogOpen(false);
  };

  const handleEditUser = (updated: User) => {
    dispatch(updateUser(updated));
    toast.success("User updated successfully");
    setSelectedUser(null);
  };

  const handleDeleteUser = (id: number) => {
    dispatch(deleteUser(id));
    toast.success("User deleted");
    setDeleteUserId(null);
  };

  const handleResetPassword = (user: User) => {
    toast.success(`Password reset email sent to ${user.email}`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <Card>
        <CardHeader className="flex flex-col gap-4">
          <CardTitle>Users</CardTitle>
          {/* Filters */}
          <div className="flex flex-wrap gap-2 md:gap-4 md:items-center w-full">
            {/* Search */}
            <Input
              placeholder="Search user..."
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
              className="max-w-[200px] w-full"
            />

            {/* Status */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="max-w-[200px] w-full">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>

            {/* Export */}
            <Button
              onClick={exportToCSV}
              variant="outline"
              className="max-w-[100px] w-full"
            >
              <Download className="mr-1 h-4 w-4" />
              Export
            </Button>

            {/* Reset */}
            <Button
              onClick={resetFilter}
              variant="outline"
              className="max-w-[100px] w-full"
            >
              <Undo2 className="mr-1 h-4 w-4" />
              Reset
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                {stateUser?.activeUser?.role !== "user" && (
                  <TableHead>Actions</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{u.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        u.status === "active" ? "default" : "destructive"
                      }
                    >
                      {u.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {u.lastLogin
                      ? `${format(new Date(u.lastLogin), "MM/dd/yyyy hh:mm a")}`
                      : "null"}
                  </TableCell>
                  {stateUser?.activeUser?.role !== "user" && (
                    <TableCell className="space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedUser(u)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      {stateUser?.activeUser?.role !== "editor" && (
                        <>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => setDeleteUserId(u.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => handleResetPassword(u)}
                          >
                            <Key className="w-4 h-4" /> Reset Password
                          </Button>
                        </>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit User Dialog */}
      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <Input
                placeholder="Name"
                value={selectedUser.name}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, name: e.target.value })
                }
              />
              <Input
                placeholder="Email"
                value={selectedUser.email}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, email: e.target.value })
                }
              />
              <Select
                value={selectedUser.role}
                onValueChange={(value) =>
                  setSelectedUser({
                    ...selectedUser,
                    role: value as User["role"],
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
              <Button
                className="mt-2"
                onClick={() => handleEditUser(selectedUser)}
              >
                Save
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add User Dialog */}
      <Dialog
        open={isNewUserDialogOpen}
        onOpenChange={() => setIsNewUserDialogOpen(false)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input placeholder="Name" id="new-name" />
            <Input placeholder="Email" id="new-email" />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Editor">Editor</SelectItem>
                <SelectItem value="User">User</SelectItem>
              </SelectContent>
            </Select>
            <Button
              className="mt-2"
              onClick={() =>
                handleAddUser({
                  name: (
                    document.getElementById("new-name") as HTMLInputElement
                  ).value,
                  email: (
                    document.getElementById("new-email") as HTMLInputElement
                  ).value,
                  role: (
                    document.getElementById("new-role") as HTMLSelectElement
                  ).value as User["role"],
                  status: "active",
                  image: "",
                  phone: "+90 633 773 8383",
                })
              }
            >
              Create
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete User AlertDialog */}
      <AlertDialog
        open={!!deleteUserId}
        onOpenChange={() => setDeleteUserId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this user? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteUserId && handleDeleteUser(deleteUserId)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
