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
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Edit,
  Key,
  Trash2,
  FileText,
  EyeIcon,
  Download,
  Undo2,
} from "lucide-react";
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
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "Active" | "Inactive" | "Banned";
  joined: string;
  lastLogin?: string | null;
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
    lastLogin: "2025-09-30T06:13:06.970Z",
    orders: 12,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1 555-5678",
    status: "Banned",
    lastLogin: "2025-09-30T06:13:06.970Z",
    joined: "2024-07-15",
    orders: 5,
  },
];

export default function CustomersPage() {
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchCustomer, setSearchCustomer] = useState("");
  const [customers, setCustomers] = useState(initialCustomers);
  const [deleteCustomer, setDeleteCustomer] = useState<Customer | null>(null);
  const [editCustomer, setEditCustomer] = useState<Customer | null>(null);
  const router = useRouter();

  const filteredData = useMemo(() => {
    return customers.filter((row) => {
      const matchesStatus =
        statusFilter === "All" ? true : row.status === statusFilter;
      const matchesCustomer = row.name
        .toLowerCase()
        .includes(searchCustomer.toLowerCase());

      return matchesStatus && matchesCustomer;
    });
  }, [customers, statusFilter, searchCustomer]);

  const exportToCSV = () => {
    const headers = [
      "Name",
      "Email",
      "Phone",
      "Status",
      "Joined",
      "Last Login",
      "Orders",
    ];
    const rows = filteredData.map((row) => [
      row.name,
      row.email,
      row.phone,
      row.status,
      row.joined,
      row.lastLogin,
      row.orders,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "customer_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetFilter = () => {
    setSearchCustomer("");
    setStatusFilter("All");
  };

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
        <CardHeader className="flex flex-col gap-4">
          <CardTitle>Customers</CardTitle>
          {/* Filters */}
          <div className="flex flex-wrap gap-2 md:gap-4 md:items-center w-full">
            {/* Search */}
            <Input
              placeholder="Search customer..."
              value={searchCustomer}
              onChange={(e) => setSearchCustomer(e.target.value)}
              className="max-w-[200px] w-full"
            />

            {/* Status */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="max-w-[200px] w-full">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Banned">Banned</SelectItem>
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
          {/* <div className="flex gap-2">
            <Input
              placeholder="Search customers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-64"
            />
            <Button variant="outline">
              <Search className="h-4 w-4 mr-2" /> Search
            </Button>
          </div> */}
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
                <TableHead>Last Login</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((c) => (
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
                  <TableCell>
                    {c.lastLogin
                      ? `${format(new Date(c.lastLogin), "MM/dd/yyyy hh:mm a")}`
                      : "null"}
                  </TableCell>
                  <TableCell>{c.orders}</TableCell>
                  <TableCell className="space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/customers/${c.id}`)}
                    >
                      <EyeIcon className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        router.push(
                          `/transactions/single-transaction?customerId=${c.id}`
                        )
                      }
                    >
                      <FileText className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditCustomer(c)}
                    >
                      <Edit className="w-4 h-4" />
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
                      <Trash2 className="w-4 h-4" />
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
