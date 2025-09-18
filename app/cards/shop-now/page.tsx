"use client";

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
import React, { useRef, useState } from "react";

type ShopNowItem = {
  id: number;
  label: string;
  url: string;
  image?: File;
};

const ShopNow = () => {
  const [form, setForm] = useState<Partial<ShopNowItem>>({});
  const [items, setItems] = useState<ShopNowItem[]>([]);
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
    if (!form.label || !form.url || !form.image) {
      alert("Please fill all fields and select an image");
      return;
    }

    if (editingId) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === editingId ? { ...item, ...(form as ShopNowItem) } : item
        )
      );
      setEditingId(null);
    } else {
      setItems((prev) => [
        ...prev,
        { ...(form as ShopNowItem), id: Date.now() },
      ]);
    }

    resetForm();
  };

  const handleEdit = (item: ShopNowItem) => {
    setForm(item);
    setEditingId(item.id);
  };

  const handleDelete = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    if (editingId === id) resetForm();
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Shop Now Item</CardTitle>
          <CardDescription>
            Add or edit items for the Shop Now section
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="label">Label</Label>
            <Input
              id="label"
              value={form.label || ""}
              onChange={(e) => setForm({ ...form, label: e.target.value })}
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
              onChange={(e) => setForm({ ...form, image: e.target.files?.[0] })}
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSave}>
              {editingId ? "Update" : "Save"}
            </Button>
            <Button variant="outline" onClick={resetForm}>
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {items.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Created Shop Now Items</CardTitle>
            <CardDescription>
              View, edit or delete created items
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border rounded px-3 py-2"
              >
                <div className="flex flex-col">
                  <p className="font-semibold">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.url}</p>
                  {item.image && (
                    <p className="text-sm">File: {item.image.name}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleEdit(item)}>
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </section>
  );
};

export default ShopNow;
