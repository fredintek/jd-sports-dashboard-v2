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
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2 } from "lucide-react";

type Look = {
  id: number;
  name: string;
  price: string;
  url: string;
  image?: File;
  category: string;
};

const LooksSection = () => {
  const [form, setForm] = useState<Partial<Look>>({});
  const [looks, setLooks] = useState<Look[]>([]);
  const [categories, setCategories] = useState<string[]>([
    "Shoes",
    "Bags",
    "Clothes",
  ]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setForm({});
    setEditingId(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSave = () => {
    if (!form.name || !form.price || !form.url || !form.category) {
      alert("Please fill all required fields");
      return;
    }

    if (editingId) {
      setLooks((prev) =>
        prev.map((look) =>
          look.id === editingId ? { ...look, ...(form as Look) } : look
        )
      );
      setEditingId(null);
    } else {
      setLooks((prev) => [...prev, { ...(form as Look), id: Date.now() }]);
    }

    // Add category on the fly if new
    if (form.category && !categories.includes(form.category)) {
      setCategories((prev) => [...prev, form.category!]);
    }

    resetForm();
  };

  const handleEdit = (look: Look) => {
    setForm(look);
    setEditingId(look.id);
  };

  const handleDelete = (id: number) => {
    setLooks((prev) => prev.filter((look) => look.id !== id));
    if (editingId === id) resetForm();
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="w-full">
        <Card>
          <CardHeader>
            <CardTitle>Create / Edit Look</CardTitle>
            <CardDescription>
              Fill in the fields to create or edit a look
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={form.name || ""}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                value={form.price || ""}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                value={form.url || ""}
                onChange={(e) => setForm({ ...form, url: e.target.value })}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="image">Image</Label>
              <Input
                ref={fileInputRef}
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setForm({ ...form, image: e.target.files?.[0] })
                }
              />
            </div>

            <div className="grid gap-2">
              <Label>Category</Label>
              <Select
                value={form.category || ""}
                onValueChange={(value) => setForm({ ...form, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select or type category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat, idx) => (
                    <SelectItem key={idx} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                placeholder="Or create new category"
                value={form.category || ""}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSave}>
                {editingId ? "Update Look" : "Save Look"}
              </Button>
              <Button variant="outline" onClick={resetForm}>
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Created looks */}
        {looks.length > 0 && (
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Created Looks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {looks.map((look) => (
                <div
                  key={look.id}
                  className="flex items-center justify-between border rounded px-3 py-2"
                >
                  <div>
                    <p className="font-semibold">{look.name}</p>
                    <p className="text-sm">{look.price}</p>
                    <p className="text-sm text-muted-foreground">{look.url}</p>
                    <p className="text-sm">Category: {look.category}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleEdit(look)}>
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(look.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};

export default LooksSection;
