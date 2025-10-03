"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
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
import { ArrowLeft, CalendarIcon, Download, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
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

type Transaction = {
  id: string;
  customerId: string;
  product: string;
  amount: string;
  date: string;
  status: "Completed" | "Pending" | "Failed";
};

// Mock transactions
const transactions: Transaction[] = [
  {
    id: "t1",
    customerId: "1",
    product: "Nike Air Max",
    amount: "$120",
    date: "2025-09-01",
    status: "Completed",
  },
  {
    id: "t2",
    customerId: "1",
    product: "Adidas Ultraboost",
    amount: "$95",
    date: "2025-09-05",
    status: "Pending",
  },
  {
    id: "t3",
    customerId: "2",
    product: "Puma RS-X",
    amount: "$110",
    date: "2025-09-03",
    status: "Completed",
  },
];

export default function page() {
  const searchParams = useSearchParams();
  const customerId = searchParams.get("customerId");
  const [customerTransactions, setCustomerTransactions] = useState<
    Transaction[]
  >([]);

  const [statusFilter, setStatusFilter] = useState("All");
  const [searchProduct, setSearchProduct] = useState("");
  const [dateRange, setDateRange] = useState<any>({
    from: new Date(),
  });

  const filteredData = useMemo(() => {
    return transactions.filter((row) => {
      const matchesStatus =
        statusFilter === "All" ? true : row.status === statusFilter;
      const matchesCustomer = row.product
        .toLowerCase()
        .includes(searchProduct.toLowerCase());
      const matchesDate =
        !dateRange.from || !dateRange.to
          ? true
          : new Date(row.date) >= dateRange.from &&
            new Date(row.date) <= dateRange.to;
      return matchesStatus && matchesCustomer && matchesDate;
    });
  }, [statusFilter, searchProduct, dateRange]);

  const exportToCSV = () => {
    const headers = ["ID", "Product", "Amount", "Date", "Status"];
    const rows = filteredData.map((row) => [
      row.id,
      row.product,
      row.amount,
      row.date,
      row.status,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "customer-transaction_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetFilter = () => {
    setSearchProduct("");
    setStatusFilter("All");
    setDateRange({
      from: new Date(),
    });
  };

  useEffect(() => {
    if (customerId) {
      setCustomerTransactions(
        transactions.filter((t) => t.customerId === customerId)
      );
    }
  }, [customerId]);

  return (
    <div className="p-6 space-y-6">
      <Link href="/customers">
        <Button variant="outline" className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Customers
        </Button>
      </Link>

      <Card>
        <CardHeader className="flex flex-col gap-4">
          <CardTitle>Transactions</CardTitle>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 md:gap-4 md:items-center w-full">
            {/* Search */}
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
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell>{t.id}</TableCell>
                    <TableCell>{t.product}</TableCell>
                    <TableCell>{t.amount}</TableCell>
                    <TableCell>{t.date}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          t.status === "Completed"
                            ? "success"
                            : t.status === "Pending"
                            ? "pending"
                            : "destructive"
                        }
                      >
                        {t.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    No transactions found for this customer.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
