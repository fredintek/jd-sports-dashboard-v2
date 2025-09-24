"use client";

import React, { useState } from "react";
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
import {
  Trash2,
  DollarSign,
  CreditCard,
  CheckCircle,
  XCircle,
} from "lucide-react";

type Transaction = {
  id: number;
  customer: string;
  amount: number;
  paymentMethod: string;
  status: "Pending" | "Completed" | "Failed";
  date: string;
};

export default function page() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 1,
      customer: "John Doe",
      amount: 120,
      paymentMethod: "Credit Card",
      status: "Completed",
      date: "2025-09-20",
    },
    {
      id: 2,
      customer: "Jane Smith",
      amount: 95,
      paymentMethod: "PayPal",
      status: "Pending",
      date: "2025-09-21",
    },
    {
      id: 3,
      customer: "Chris Evans",
      amount: 110,
      paymentMethod: "Credit Card",
      status: "Failed",
      date: "2025-09-22",
    },
  ]);

  const handleDelete = (id: number) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">All Transactions</h1>
      </div>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction Records</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell>{tx.id}</TableCell>
                  <TableCell>{tx.customer}</TableCell>
                  <TableCell>${tx.amount}</TableCell>
                  <TableCell className="flex items-center gap-1">
                    {tx.paymentMethod === "Credit Card" ? (
                      <CreditCard className="w-4 h-4 text-blue-500" />
                    ) : (
                      <DollarSign className="w-4 h-4 text-green-500" />
                    )}
                    {tx.paymentMethod}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        tx.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : tx.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {tx.status}
                    </span>
                  </TableCell>
                  <TableCell>{tx.date}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(tx.id)}
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
    </div>
  );
}
