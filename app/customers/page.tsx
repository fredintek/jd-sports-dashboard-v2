"use client";

import { useState } from "react";
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
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Edit, Key, Trash2, FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
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
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "Active" | "Inactive" | "Banned";
  joined: string;
  orders: number;
  avatar?: string;
};

const initialCustomers: Customer[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 555-1234",
    status: "Active",
    joined: "2024-06-01",
    orders: 12,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1 555-5678",
    status: "Banned",
    joined: "2024-07-15",
    orders: 5,
  },
];

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [customers, setCustomers] = useState(initialCustomers);
  const [deleteCustomer, setDeleteCustomer] = useState<Customer | null>(null);
  const [editCustomer, setEditCustomer] = useState<Customer | null>(null);
  const router = useRouter();

  // Filter customers based on search
  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
    setDeleteCustomer(null);
  };

  const handleEditSave = () => {
    if (!editCustomer) return;
    setCustomers((prev) =>
      prev.map((c) => (c.id === editCustomer.id ? editCustomer : c))
    );
    setEditCustomer(null);
  };

  const handleResetPassword = (customer: Customer) => {
    toast.success(`Password reset link sent to ${customer.email}`);
  };

  return (
    <div className="p-6 space-y-6">
      <Toaster position="top-right" />
      {/* Header */}
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Customers</CardTitle>
          <div className="flex gap-2">
            <Input
              placeholder="Search customers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-64"
            />
            <Button variant="outline">
              <Search className="h-4 w-4 mr-2" /> Search
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src={c.avatar} />
                      <AvatarFallback>{c.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {c.name}
                  </TableCell>
                  <TableCell>{c.email}</TableCell>
                  <TableCell>{c.phone}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        c.status === "Active" ? "default" : "destructive"
                      }
                    >
                      {c.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{c.joined}</TableCell>
                  <TableCell>{c.orders}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        router.push(
                          `/transactions/single-transaction?customerId=${c.id}`
                        )
                      }
                    >
                      <FileText className="w-4 h-4" /> Transactions
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditCustomer(c)}
                    >
                      <Edit className="w-4 h-4" /> Edit
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleResetPassword(c)}
                    >
                      <Key className="w-4 h-4" /> Reset Password
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setDeleteCustomer(c)}
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Customer Dialog */}
      <Dialog open={!!editCustomer} onOpenChange={() => setEditCustomer(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Customer</DialogTitle>
          </DialogHeader>
          {editCustomer && (
            <div className="space-y-4">
              <Input
                placeholder="Name"
                value={editCustomer.name}
                onChange={(e) =>
                  setEditCustomer({ ...editCustomer, name: e.target.value })
                }
              />
              <Input
                placeholder="Email"
                value={editCustomer.email}
                onChange={(e) =>
                  setEditCustomer({ ...editCustomer, email: e.target.value })
                }
              />
              <Input
                placeholder="Phone"
                value={editCustomer.phone}
                onChange={(e) =>
                  setEditCustomer({ ...editCustomer, phone: e.target.value })
                }
              />
              <DialogFooter>
                <Button variant="outline" onClick={() => setEditCustomer(null)}>
                  Cancel
                </Button>
                <Button onClick={handleEditSave}>Save</Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog
        open={!!deleteCustomer}
        onOpenChange={() => setDeleteCustomer(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete{" "}
              <strong>{deleteCustomer?.name}</strong> and cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteCustomer && handleDelete(deleteCustomer.id)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
