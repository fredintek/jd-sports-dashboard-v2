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
  Plus,
  Package,
  DollarSign,
  CheckCircle,
  XCircle,
  Download,
  Undo2,
  CalendarIcon,
  Trash2,
  Edit,
} from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  addProduct,
  deleteProduct,
  editProduct,
  Product,
} from "@/redux/slices/productSlice";

const icons: Record<string, any> = {
  package: Package,
  "check-circle": CheckCircle,
  "x-circle": XCircle,
  "dollar-sign": DollarSign,
};

const ProductsPage = () => {
  const dispatch = useAppDispatch();
  const { products, productStats } = useAppSelector((state) => state.product);
  const { categories } = useAppSelector((state) => state.category);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchProduct, setSearchProduct] = useState("");

  const [open, setOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    image: "",
  });

  const filteredData = useMemo(() => {
    return products.filter((row) => {
      const matchesStatus =
        statusFilter === "All" ? true : row.status === statusFilter;
      const matchesProduct = row.name
        .toLowerCase()
        .includes(searchProduct.toLowerCase());

      return matchesStatus && matchesProduct;
    });
  }, [statusFilter, searchProduct]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleResetForm = () => {
    setEditingProduct(null);
    setForm({ name: "", category: "", price: "", stock: "", image: "" });
  };

  const handleAddEdit = () => {
    if (editingProduct) {
      dispatch(
        editProduct({
          id: editingProduct.id,
          ...form,
          stock: Number(form.stock),
        } as Product)
      );
    } else {
      dispatch(
        addProduct({
          category: form.category,
          image: form.image,
          name: form.name,
          price: form.price,
          stock: Number(form.stock),
        })
      );
    }
    setOpen(false);
    handleResetForm();
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
    dispatch(deleteProduct(id));
  };

  const exportToCSV = () => {
    const headers = [
      "ID",
      "Image",
      "Name",
      "Category",
      "Price",
      "Stock",
      "Status",
    ];
    const rows = filteredData.map((row) => [
      row.id,
      row.image,
      row.name,
      row.category,
      row.price,
      row.stock,
      row.status,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "products_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetFilter = () => {
    setSearchProduct("");
    setStatusFilter("All");
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button
          onClick={() => {
            setOpen(true);
            handleResetForm();
          }}
        >
          <Plus className="w-4 h-4 mr-2" /> Add Product
        </Button>
      </div>
      {/* Stats */}{" "}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {" "}
        {productStats.map((stat) => {
          const Icon = icons[stat.icon];
          return (
            <Card key={stat.label}>
              {" "}
              <CardHeader>
                {" "}
                <CardTitle className="flex items-center gap-2 text-sm font-medium">
                  {" "}
                  <Icon className={`w-4 h-4 ${stat.color}`} /> {stat.label}{" "}
                </CardTitle>{" "}
              </CardHeader>{" "}
              <CardContent>
                {" "}
                <p className="text-2xl font-bold">{stat.value}</p>{" "}
              </CardContent>{" "}
            </Card>
          );
        })}{" "}
      </div>
      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Products</CardTitle>
          {/* Filters */}
          <div className="flex flex-wrap gap-2 md:gap-4 md:items-center w-full mt-2">
            {/* Search */}
            <Input
              placeholder="Search customer..."
              value={searchProduct}
              onChange={(e) => setSearchProduct(e.target.value)}
              className="max-w-[200px] w-full"
            />
            {/* Status */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="max-w-[200px] w-full">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="In Stock">In Stock</SelectItem>
                <SelectItem value="Out of Stock">Out Of Stock</SelectItem>
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
              {filteredData.map((product) => (
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
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="w-4 h-4" />
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
              <Select
                value={form.category}
                onValueChange={(value) => setForm({ ...form, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories
                    .filter((item) => item.feature === "products")
                    .map((cat) => (
                      <SelectItem key={cat.id} value={cat.name}>
                        {cat.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
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
