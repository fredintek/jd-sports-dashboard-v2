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
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  DollarSign,
  ShoppingCart,
  CheckCircle,
  Users,
  CalendarIcon,
  Download,
  Undo2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";

// Mock Data
const salesData = [
  { date: "2025-09-01", sales: 120 },
  { date: "2025-09-02", sales: 200 },
  { date: "2025-09-03", sales: 150 },
  { date: "2025-09-04", sales: 220 },
  { date: "2025-09-05", sales: 180 },
];

const topProducts = [
  { name: "Nike Air Max", sold: 50 },
  { name: "Adidas Ultraboost", sold: 40 },
  { name: "Puma RS-X", sold: 30 },
];

const customerDistribution = [
  { name: "Active", value: 120 },
  { name: "Inactive", value: 30 },
  { name: "Banned", value: 10 },
];

const recentOrders = [
  {
    id: 1,
    customer: "John Doe",
    amount: 120,
    status: "Pending",
    date: "2025-10-22",
  },
  {
    id: 2,
    customer: "Jane Smith",
    amount: 95,
    status: "Shipped",
    date: "2025-09-20",
  },
  {
    id: 3,
    customer: "Chris Evans",
    amount: 110,
    status: "Delivered",
    date: "2025-09-28",
  },
];

const COLORS = ["#4ade80", "#facc15", "#f87171"]; // Green, Yellow, Red

export default function page() {
  const [sales, setSales] = useState(salesData);
  const [products, setProducts] = useState(topProducts);
  const [customers, setCustomers] = useState(customerDistribution);

  const [statusFilter, setStatusFilter] = useState("All");
  const [searchCustomer, setSearchCustomer] = useState("");
  const [dateRange, setDateRange] = useState<any>({
    from: new Date(),
  });

  const filteredData = useMemo(() => {
    return recentOrders.filter((row) => {
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
    const headers = ["ID", "Customer", "Amount", "Status", "Date"];
    const rows = filteredData.map((row) => [
      row.id,
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
    link.setAttribute("download", "report-analytics_data.csv");
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
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <ShoppingCart className="w-4 h-4 text-blue-500" />
              Total Sales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {sales.reduce((a, c) => a + c.sales, 0)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <DollarSign className="w-4 h-4 text-green-500" />
              Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              ${recentOrders.reduce((a, c) => a + c.amount, 0)}
            </p>
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
            <p className="text-2xl font-bold">
              {products.reduce((a, c) => a + c.sold, 0)}
            </p>
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
            <p className="text-2xl font-bold">
              {customers.find((c) => c.name === "Active")?.value}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Line Chart: Sales over Time */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart width={350} height={200} data={sales}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#3b82f6"
                strokeWidth={2}
              />
            </LineChart>
          </CardContent>
        </Card>

        {/* Bar Chart: Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart width={350} height={200} data={products}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sold" fill="#f97316" />
            </BarChart>
          </CardContent>
        </Card>

        {/* Pie Chart: Customer Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Status</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart width={350} height={200}>
              <Pie
                data={customers}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={60}
                label
              >
                {customers.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders Table */}
      <Card>
        <CardHeader className="flex flex-col gap-4">
          <CardTitle>Recent Orders</CardTitle>

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
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
