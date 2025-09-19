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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Package, DollarSign, CheckCircle, XCircle } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

const initialProducts = [
  {
    id: 1,
    name: "Nike Air Max",
    category: "Shoes",
    price: "$120",
    stock: 34,
    status: "In Stock",
    image:
      "https://www.jdsports.cy/2767528-product_horizontal/on-cloudtilt.jpg",
  },
  {
    id: 2,
    name: "Adidas Ultraboost",
    category: "Shoes",
    price: "$95",
    stock: 0,
    status: "Out of Stock",
    image:
      "https://www.jdsports.cy/2698124-product_horizontal/nike-air-force-1-07.jpg",
  },
  {
    id: 3,
    name: "Puma RS-X",
    category: "Shoes",
    price: "$110",
    stock: 12,
    status: "In Stock",
    image:
      "https://www.jdsports.cy/2768050-product_medium/adidas-originals-superstar-ii.jpg",
  },
];

const productStats = [
  {
    label: "Total Products",
    value: 245,
    icon: Package,
    color: "text-blue-500",
  },
  { label: "In Stock", value: 180, icon: CheckCircle, color: "text-green-500" },
  { label: "Out of Stock", value: 65, icon: XCircle, color: "text-red-500" },
  {
    label: "Revenue",
    value: "$23,450",
    icon: DollarSign,
    color: "text-orange-500",
  },
];

const ProductsPage = () => {
  const [products, setProducts] = useState(initialProducts);
  const [open, setOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    image: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddEdit = () => {
    if (editingProduct) {
      // Update product
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                ...form,
                stock: Number(form.stock),
                status: Number(form.stock) > 0 ? "In Stock" : "Out of Stock",
              }
            : p
        )
      );
    } else {
      // Add new product
      const newProduct = {
        id: products.length + 1,
        ...form,
        stock: Number(form.stock),
        status: Number(form.stock) > 0 ? "In Stock" : "Out of Stock",
      };
      setProducts([...products, newProduct]);
    }
    setOpen(false);
    setEditingProduct(null);
    setForm({ name: "", category: "", price: "", stock: "", image: "" });
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: String(product.stock),
      image: product.image,
    });
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button onClick={() => setOpen(true)}>
          <Plus className="w-4 h-4 mr-2" /> Add Product
        </Button>
      </div>
      {/* Stats */}{" "}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {" "}
        {productStats.map((stat) => (
          <Card key={stat.label}>
            {" "}
            <CardHeader>
              {" "}
              <CardTitle className="flex items-center gap-2 text-sm font-medium">
                {" "}
                <stat.icon className={`w-4 h-4 ${stat.color}`} /> {stat.label}{" "}
              </CardTitle>{" "}
            </CardHeader>{" "}
            <CardContent>
              {" "}
              <p className="text-2xl font-bold">{stat.value}</p>{" "}
            </CardContent>{" "}
          </Card>
        ))}{" "}
      </div>
      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Products</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={40}
                      height={40}
                      className="rounded-md"
                    />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.status === "In Stock"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          Delete
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Are you sure?</DialogTitle>
                          <DialogDescription>
                            Once this product is deleted it cannot be retrieved
                            again.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <Button
                            onClick={() => handleDelete(product.id)}
                            type="submit"
                          >
                            Confirm
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
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
              {editingProduct ? "Edit Product" : "Add Product"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label>Name</Label>
              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Product Name"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Category</Label>
              <Input
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="Category"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Price</Label>
              <Input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Price"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Stock</Label>
              <Input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                placeholder="Stock"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Image URL</Label>
              <Input
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="Image URL"
              />
            </div>
          </div>

          <DialogFooter>
            <Button onClick={handleAddEdit}>
              {editingProduct ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductsPage;
