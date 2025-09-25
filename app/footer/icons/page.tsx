"use client";

import React, { useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Trash2 } from "lucide-react";

type Props = {};

type IconItem = {
  id: number;
  url: string;
  image?: File;
  category: string;
  imageUrl?: string;
};

const initialCategories = ["Social", "Navigation", "Utility"];

const IconsPage = (props: Props) => {
  const [form, setForm] = useState<Partial<IconItem>>({});
  const [icons, setIcons] = useState<IconItem[]>([]);
  const [categories, setCategories] = useState<string[]>(initialCategories);
  const [editingId, setEditingId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setForm({});
    setEditingId(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setForm({
        ...form,
        image: file,
        imageUrl: URL.createObjectURL(file),
      });
    }
  };

  const handleSave = () => {
    if (!form.url || !form.category) {
      alert("Please fill all required fields");
      return;
    }

    if (editingId) {
      setIcons((prev) =>
        prev.map((item) =>
          item.id === editingId ? { ...item, ...(form as IconItem) } : item
        )
      );
      setEditingId(null);
    } else {
      setIcons((prev) => [...prev, { ...(form as IconItem), id: Date.now() }]);
    }

    resetForm();
  };

  const handleEdit = (icon: IconItem) => {
    setForm(icon);
    setEditingId(icon.id);
  };

  const handleDelete = (id: number) => {
    setIcons((prev) => prev.filter((icon) => icon.id !== id));
    if (editingId === id) resetForm();
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="w-full">
        <Card>
          <CardHeader>
            <CardTitle>Icons</CardTitle>
            <CardDescription>
              Manage icons: create, edit, reset, delete
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {/* URL */}
            <div className="grid gap-2">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                value={form.url || ""}
                onChange={(e) => setForm({ ...form, url: e.target.value })}
              />
            </div>

            {/* Image */}
            <div className="grid gap-2">
              <Label htmlFor="image">Image</Label>
              <Input
                ref={fileInputRef}
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {form.imageUrl && (
                <img
                  src={form.imageUrl}
                  alt="preview"
                  className="h-32 w-32 object-cover rounded"
                />
              )}
            </div>

            {/* Category */}
            <div className="grid gap-2">
              <Label>Category</Label>
              <Select
                value={form.category || ""}
                onValueChange={(value) => setForm({ ...form, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat, idx) => (
                    <SelectItem key={idx} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2">
              <Button onClick={handleSave}>
                {editingId ? "Update" : "Save"}
              </Button>
              <Button variant="outline" onClick={resetForm}>
                Reset
              </Button>
            </div>

            {/* View created icons */}
            {icons.length > 0 && (
              <div className="mt-4 space-y-2">
                <h3 className="font-semibold">Created Icons</h3>
                {icons.map((icon) => (
                  <div
                    key={icon.id}
                    className="flex items-center justify-between border rounded px-3 py-2"
                  >
                    <div className="flex flex-col">
                      <p className="font-semibold">{icon.url}</p>
                      <p className="text-sm">{icon.category}</p>
                      {icon.image && <p className="text-sm">Image selected</p>}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleEdit(icon)}>
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(icon.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default IconsPage;
