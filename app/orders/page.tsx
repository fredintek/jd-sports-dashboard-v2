"use client";
import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Plus,
  ShoppingCart,
  CheckCircle,
  XCircle,
  Truck,
  DollarSign,
  Undo2,
  Download,
  CalendarIcon,
  Edit,
  Trash2,
} from "lucide-react";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";

// 📌 Initial mock orders
const initialOrders = [
  {
    id: 1,
    customer: "John Doe",
    product: "Nike Air Max",
    amount: 120,
    status: "Pending",
    date: "2025-09-01",
  },
  {
    id: 2,
    customer: "Jane Smith",
    product: "Adidas Ultraboost",
    amount: 95,
    status: "Shipped",
    date: "2025-09-05",
  },
  {
    id: 3,
    customer: "Chris Evans",
    product: "Puma RS-X",
    amount: 110,
    status: "Delivered",
    date: "2025-09-10",
  },
];

// 📌 Orders Stats
const getOrderStats = (orders: any[]) => {
  const totalOrders = orders.length;
  const pending = orders.filter((o) => o.status === "Pending").length;
  const shipped = orders.filter((o) => o.status === "Shipped").length;
  const delivered = orders.filter((o) => o.status === "Delivered").length;
  const revenue = orders.reduce((sum, o) => sum + o.amount, 0);
  return { totalOrders, pending, shipped, delivered, revenue };
};

const page = () => {
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchCustomer, setSearchCustomer] = useState("");
  const [searchProduct, setSearchProduct] = useState("");
  const [dateRange, setDateRange] = useState<any>({
    from: new Date(),
  });

  const [orders, setOrders] = useState(initialOrders);
  const [open, setOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<any | null>(null);
  const [form, setForm] = useState({
    customer: "",
    product: "",
    amount: "",
    status: "Pending",
    date: "",
  });

  const filteredData = useMemo(() => {
    return orders.filter((row) => {
      const matchesStatus =
        statusFilter === "All" ? true : row.status === statusFilter;
      const matchesCustomer = row.customer
        .toLowerCase()
        .includes(searchCustomer.toLowerCase());

      const matchesProduct = row.product
        .toLowerCase()
        .includes(searchProduct.toLowerCase());
      const matchesDate =
        !dateRange.from || !dateRange.to
          ? true
          : new Date(row.date) >= dateRange.from &&
            new Date(row.date) <= dateRange.to;
      return matchesStatus && matchesCustomer && matchesProduct && matchesDate;
    });
  }, [orders, statusFilter, searchCustomer, searchProduct, dateRange]);

  const stats = getOrderStats(orders);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddEdit = () => {
    if (editingOrder) {
      setOrders((prev) =>
        prev.map((o) =>
          o.id === editingOrder.id
            ? { ...o, ...form, amount: Number(form.amount) }
            : o
        )
      );
    } else {
      const newOrder = {
        id: orders.length + 1,
        ...form,
        amount: Number(form.amount),
      };
      setOrders([...orders, newOrder]);
    }
    setOpen(false);
    setEditingOrder(null);
    setForm({
      customer: "",
      product: "",
      amount: "",
      status: "Pending",
      date: "",
    });
  };

  const handleEdit = (order: any) => {
    setEditingOrder(order);
    setForm({
      customer: order.customer,
      product: order.product,
      amount: String(order.amount),
      status: order.status,
      date: order.date,
    });
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    setOrders(orders.filter((o) => o.id !== id));
  };

  const exportToCSV = () => {
    const headers = ["ID", "Customer", "Product", "Amount", "Status", "Date"];
    const rows = filteredData.map((row) => [
      row.id,
      row.customer,
      row.product,
      row.amount,
      row.status,
      row.date,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "orders_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetFilter = () => {
    setSearchCustomer("");
    setSearchProduct("");
    setStatusFilter("All");
    setDateRange({
      from: new Date(),
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Orders</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <ShoppingCart className="w-4 h-4 text-blue-500" />
              Total Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.totalOrders}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <XCircle className="w-4 h-4 text-yellow-500" />
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.pending}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <Truck className="w-4 h-4 text-orange-500" />
              Shipped
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.shipped}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Delivered
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.delivered}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <DollarSign className="w-4 h-4 text-purple-500" />
              Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${stats.revenue}</p>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader className="flex flex-col gap-4">
          <CardTitle>All Orders</CardTitle>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 md:gap-4 md:items-center w-full">
            {/* Search */}
            <Input
              placeholder="Search customer..."
              value={searchCustomer}
              onChange={(e) => setSearchCustomer(e.target.value)}
              className="max-w-[200px] w-full"
            />
            <Input
              placeholder="Search product..."
              value={searchProduct}
              onChange={(e) => setSearchProduct(e.target.value)}
              className="max-w-[200px] w-full"
            />
            {/* Date Range */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="max-w-[200px] w-full justify-start text-left"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange.from && dateRange.to
                    ? `${format(dateRange.from, "MM d, yy")} - ${format(
                        dateRange.to,
                        "MM d, yy"
                      )}`
                    : "Pick a date range"}
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={1}
                />
              </PopoverContent>
            </Popover>

            {/* Status */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="max-w-[200px] w-full">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Shipped">Shipped</SelectItem>
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
                <TableHead>ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.product}</TableCell>
                  <TableCell>${order.amount}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Shipped"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(order)}
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
                            This action cannot be undone. This will permanently
                            delete your order
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(order.id)}
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingOrder ? "Edit Order" : "Add Order"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label>Customer</Label>
              <Input
                name="customer"
                value={form.customer}
                onChange={handleChange}
                placeholder="Customer Name"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Product</Label>
              <Input
                name="product"
                value={form.product}
                onChange={handleChange}
                placeholder="Product"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Amount</Label>
              <Input
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                placeholder="Amount"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Status</Label>
              <Input
                name="status"
                value={form.status}
                onChange={handleChange}
                placeholder="Pending / Shipped / Delivered"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Date</Label>
              <Input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
              />
            </div>
          </div>

          <DialogFooter>
            <Button onClick={handleAddEdit}>
              {editingOrder ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default page;
