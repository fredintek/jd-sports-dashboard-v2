"use client";

import { useParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const mockCustomers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 555-1234",
    status: "Active",
    joined: "2024-06-01",
    orders: [
      {
        orderId: "ORD-001",
        product: "Nike Air Max",
        productImage: "https://unsplash.com/photos/logo-mtk-7S-i_78",
        pieces: 2,
        amount: "$240",
        status: "Completed",
      },
      {
        orderId: "ORD-002",
        product: "Adidas Ultraboost",
        productImage:
          "https://unsplash.com/photos/a-white-and-black-shoe-1IRnESiBIU4",
        pieces: 1,
        amount: "$95",
        status: "Pending",
      },
    ],
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1 555-5678",
    status: "Banned",
    joined: "2024-07-15",
    orders: [],
  },
];

export default function CustomerDetailsPage() {
  const { id } = useParams();
  const customer = mockCustomers.find((c) => c.id === id);

  if (!customer) {
    return <div className="p-6">Customer not found</div>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Customer Info */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>
            <strong>Name:</strong> {customer.name}
          </p>
          <p>
            <strong>Email:</strong> {customer.email}
          </p>
          <p>
            <strong>Phone:</strong> {customer.phone}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <Badge
              variant={customer.status === "Active" ? "default" : "destructive"}
            >
              {customer.status}
            </Badge>
          </p>
          <p>
            <strong>Joined:</strong> {customer.joined}
          </p>
        </CardContent>
      </Card>

      {/* Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {customer.orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <div className="space-y-4">
              {customer.orders.map((order) => (
                <div
                  key={order.orderId}
                  className="flex items-center gap-4 border-b pb-2"
                >
                  <img
                    src={order.productImage}
                    alt={order.product}
                    className="rounded-md w-[60px] h-[60px]"
                  />
                  <div className="flex-1">
                    <p>
                      <strong>{order.product}</strong>
                    </p>
                    <p>Pieces: {order.pieces}</p>
                    <p>Amount: {order.amount}</p>
                  </div>
                  <Badge
                    variant={
                      order.status === "Completed"
                        ? "default"
                        : order.status === "Pending"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {order.status}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
