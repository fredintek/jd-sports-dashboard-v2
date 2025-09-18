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
import React, { useState } from "react";

type Props = {};

type Item = {
  id: number;
  title: string;
  subtitle: string;
  url: string;
};

const Page = (props: Props) => {
  const [form, setForm] = useState<Partial<Item>>({});
  const [items, setItems] = useState<Item[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const resetForm = () => {
    setForm({});
    setEditingId(null);
  };

  const handleSave = () => {
    if (!form.title || !form.subtitle || !form.url) {
      alert("Please fill all fields");
      return;
    }

    if (editingId) {
      // Edit existing
      setItems((prev) =>
        prev.map((item) =>
          item.id === editingId ? { ...item, ...(form as Item) } : item
        )
      );
      setEditingId(null);
    } else {
      // Limit to 4 items
      if (items.length >= 4) {
        alert("You can only create up to 4 items");
        return;
      }
      setItems((prev) => [...prev, { ...(form as Item), id: Date.now() }]);
    }

    resetForm();
  };

  const handleEdit = (item: Item) => {
    setForm(item);
    setEditingId(item.id);
  };

  const handleDelete = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    if (editingId === id) resetForm();
  };

  return (
    <section className="grid grid-cols-2 gap-6">
      <div className="w-full">
        <Card>
          <CardHeader>
            <CardTitle>Promo Banner</CardTitle>
            <CardDescription>
              Fill in the fields below to create or edit a promo banner
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={form.title || ""}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input
                id="subtitle"
                value={form.subtitle || ""}
                onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
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

        {/* Created items */}
        {items.length > 0 && (
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Created Items</CardTitle>
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
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm">{item.subtitle}</p>
                    <p className="text-sm text-muted-foreground">{item.url}</p>
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
      </div>
    </section>
  );
};

export default Page;
