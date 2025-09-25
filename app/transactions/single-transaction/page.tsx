"use client";

import { useState, useEffect } from "react";
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
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
    date: "2024-09-01",
    status: "Completed",
  },
  {
    id: "t2",
    customerId: "1",
    product: "Adidas Ultraboost",
    amount: "$95",
    date: "2024-09-05",
    status: "Pending",
  },
  {
    id: "t3",
    customerId: "2",
    product: "Puma RS-X",
    amount: "$110",
    date: "2024-09-03",
    status: "Completed",
  },
];

export default function page() {
  const searchParams = useSearchParams();
  const customerId = searchParams.get("customerId");

  const [customerTransactions, setCustomerTransactions] = useState<
    Transaction[]
  >([]);

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
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
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
              {customerTransactions.length > 0 ? (
                customerTransactions.map((t) => (
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
