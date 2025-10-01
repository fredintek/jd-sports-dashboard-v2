"use client";
import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Users,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Undo2,
  Eye,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const revenueData = [
  { name: "Jan", revenue: 4000, sales: 240 },
  { name: "Feb", revenue: 3000, sales: 200 },
  { name: "Mar", revenue: 5000, sales: 278 },
  { name: "Apr", revenue: 4780, sales: 189 },
  { name: "May", revenue: 5890, sales: 239 },
  { name: "Jun", revenue: 4390, sales: 349 },
];

const salesTableData = [
  {
    id: 1,
    product: "Nike Air Max",
    customer: "John Doe",
    amount: "$120",
    status: "Completed",
    pcs: "3",
    productImage:
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmlrZSUyMHNuZWFrZXJzfGVufDB8fDB8fHww",
    date: "2025-09-20",
  },
  {
    id: 2,
    product: "Adidas Ultraboost",
    customer: "Jane Smith",
    amount: "$95",
    status: "Pending",
    pcs: "2",
    productImage:
      "https://images.unsplash.com/photo-1620794341491-76be6eeb6946?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWRpZGFzJTIwc25lYWtlcnN8ZW58MHx8MHx8fDA%3D",
    date: "2025-09-21",
  },
  {
    id: 3,
    product: "Puma RS-X",
    customer: "Mike Johnson",
    amount: "$110",
    status: "Completed",
    pcs: "1",
    productImage:
      "https://images.unsplash.com/photo-1626298038175-e9f383124e1f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHVtYSUyMHNuZWFrZXJzfGVufDB8fDB8fHww",
    date: "2025-09-22",
  },
];

const DashboardPage = () => {
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchCustomer, setSearchCustomer] = useState("");
  const [viewRecentSales, setViewRecentSales] = useState<any>(null);
  const [dateRange, setDateRange] = useState<any>({
    from: new Date(),
  });

  const filteredData = useMemo(() => {
    return salesTableData.filter((row) => {
      const matchesStatus =
        statusFilter === "All" ? true : row.status === statusFilter;
      const matchesCustomer = row.customer
        .toLowerCase()
        .includes(searchCustomer.toLowerCase());
      const matchesDate =
        !dateRange.from || !dateRange.to
          ? true
          : new Date(row.date) >= dateRange.from &&
            new Date(row.date) <= dateRange.to;
      return matchesStatus && matchesCustomer && matchesDate;
    });
  }, [statusFilter, searchCustomer, dateRange]);

  const exportToCSV = () => {
    const headers = ["ID", "Product", "Customer", "Amount", "Status", "Date"];
    const rows = filteredData.map((row) => [
      row.id,
      row.product,
      row.customer,
      row.amount,
      row.status,
      row.date,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "sales_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetFilter = () => {
    setSearchCustomer("");
    setStatusFilter("All");
    setDateRange({
      from: new Date(),
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <TrendingUp className="w-4 h-4 text-green-500" />
              Active Sales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">1,245</p>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <DollarSign className="w-4 h-4 text-blue-500" />
              Product Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$54,230</p>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <ShoppingCart className="w-4 h-4 text-orange-500" />
              Products Sold
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">3,492</p>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <Users className="w-4 h-4 text-purple-500" />
              Active Customers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">892</p>
            <p className="text-xs text-muted-foreground">+3% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Analytics</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#4f46e5"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales Analytics</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#f97316" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Sales Data Table */}
      <Card>
        <CardHeader className="flex flex-col gap-4">
          <CardTitle>Recent Sales</CardTitle>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 md:gap-4 md:items-center w-full">
            {/* Search */}
            <Input
              placeholder="Search customer..."
              value={searchCustomer}
              onChange={(e) => setSearchCustomer(e.target.value)}
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
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Failed">Failed</SelectItem>
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
                <TableHead>Product</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                {/* <TableHead>Pieces</TableHead> */}
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.product}</TableCell>
                  <TableCell>{row.customer}</TableCell>
                  <TableCell>{row.amount}</TableCell>
                  {/* <TableCell>{row.pcs}</TableCell> */}
                  <TableCell>{row.status}</TableCell>
                  <TableCell>
                    {/* VIEW RECENT SALES MODDAL */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          onClick={() => setViewRecentSales(row)}
                          variant="outline"
                          size="sm"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Purchase Details</DialogTitle>
                          <DialogDescription>
                            Details of the customer’s purchase.
                          </DialogDescription>
                        </DialogHeader>

                        {viewRecentSales && (
                          <div className="space-y-4">
                            <div className="flex items-center gap-4">
                              <img
                                src={viewRecentSales.productImage}
                                alt={viewRecentSales.product}
                                className="rounded-md w-[80px] h-[80px]"
                              />
                              <div>
                                <p className="font-medium">
                                  {viewRecentSales.product}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Status: {viewRecentSales.status}
                                </p>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <p className="font-semibold">Customer:</p>
                              <p>{viewRecentSales.customer}</p>

                              <p className="font-semibold">Amount:</p>
                              <p>{viewRecentSales.amount}</p>

                              <p className="font-semibold">Pieces:</p>
                              <p>{viewRecentSales.pcs}</p>

                              <p className="font-semibold">Date Purchased:</p>
                              <p>{viewRecentSales.date}</p>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
