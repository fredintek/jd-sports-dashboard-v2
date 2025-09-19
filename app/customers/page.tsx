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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search } from "lucide-react";

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

const customers: Customer[] = [
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

export default function page() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Customer | null>(null);

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((c) => (
                <TableRow
                  key={c.id}
                  onClick={() => setSelected(c)}
                  className="cursor-pointer"
                >
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Customer Detail Modal */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selected.avatar} />
                  <AvatarFallback>{selected.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-lg font-semibold">{selected.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    {selected.email}
                  </p>
                  <p className="text-sm">{selected.phone}</p>
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span>Status:</span>
                <Badge>{selected.status}</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>Joined:</span>
                <span>{selected.joined}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Total Orders:</span>
                <span>{selected.orders}</span>
              </div>
              <div className="flex gap-2">
                <Button>Edit</Button>
                <Button variant="destructive">Delete</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
