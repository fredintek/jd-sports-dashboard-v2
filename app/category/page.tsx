"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus, Package, Trash2, Edit } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  addCategory,
  deleteCategoryAndUnassign,
  updateCategory,
} from "@/redux/slices/categorySlice";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

type Category = {
  id: number;
  name: string;
  description: string;
  feature: "products" | "footerIcons" | "footerLinks";
};

const features = [
  { key: "products", label: "Products", icon: Package },
  // { key: "footerIcons", label: "Footer Icons", icon: Plus },
  // { key: "footerLinks", label: "Footer Links", icon: Plus },
];

export default function page() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.category.categories);

  const [open, setOpen] = useState(false);
  const [activeFeature, setActiveFeature] =
    useState<Category["feature"]>("products");

  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState<Omit<Category, "id">>({
    name: "",
    description: "",
    feature: activeFeature,
  });

  const handleOpen = (category?: Category) => {
    if (category) {
      setEditingCategory(category as Category);
      setFormData({
        name: category.name,
        description: category.description,
        feature: category.feature,
      });
    } else {
      setEditingCategory(null);
      setFormData({ name: "", description: "", feature: "products" });
    }
    setOpen(true);
  };

  const handleSave = () => {
    if (editingCategory) {
      dispatch(updateCategory({ ...editingCategory, ...formData }));
    } else {
      dispatch(addCategory({ ...formData }));
    }
    setOpen(false);
  };

  const handleDelete = (id: number, name: string) => {
    dispatch(deleteCategoryAndUnassign(id, name));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Button onClick={() => handleOpen()}>
          <Plus className="w-4 h-4 mr-2" /> Add Category
        </Button>
      </div>

      {/* Feature Cards (Products only for now) */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((f) => (
          <Card
            key={f.key}
            onClick={() => setActiveFeature(f.key as Category["feature"])}
            className={`cursor-pointer hover:shadow-lg transition ${
              activeFeature === f.key ? "ring-2 ring-blue-500" : ""
            }`}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <f.icon className="w-5 h-5 text-blue-500" />
                {f.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Manage all {f.label.toLowerCase()} categories here.
              </p>
            </CardContent>
          </Card>
        ))}
      </div> */}

      {/* Categories Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories
                .filter((c) => c.feature === activeFeature)
                .map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>{category.id}</TableCell>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>{category.description}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpen(category)}
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
                              This action cannot be undone. This will
                              permanently delete the nav link
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() =>
                                handleDelete(category.id, category.name)
                              }
                            >
                              Confirm
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

      {/* Add/Edit Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? "Edit Category" : "Add Category"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid gap-2">
              <Label className="text-sm font-medium">Category Name</Label>
              <Input
                placeholder="Category Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>
            <div className="grid gap-1">
              <Label className="text-sm font-medium">Descripton</Label>
              <Input
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </div>
            {/* {!editingCategory && (
              <div className="grid gap-1">
                <Label className="text-sm font-medium">Feature</Label>
                <Select
                  value={formData.feature}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      feature: value as Category["feature"],
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select feature" />
                  </SelectTrigger>
                  <SelectContent>
                    {features.map((f) => (
                      <SelectItem key={f.key} value={f.key}>
                        {f.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )} */}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {editingCategory ? "Update" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
