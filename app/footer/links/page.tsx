"use client";

import React, { useState } from "react";
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

type FooterLink = {
  id: number;
  name: string;
  url: string;
  category: string;
};

const FooterLinksManager = () => {
  const [form, setForm] = useState<Partial<FooterLink>>({});
  const [links, setLinks] = useState<FooterLink[]>([]);
  const [categories, setCategories] = useState<string[]>([
    "About",
    "Support",
    "Legal",
  ]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const resetForm = () => {
    setForm({});
    setEditingId(null);
  };

  const handleSave = () => {
    if (!form.name || !form.url || !form.category) {
      alert("Please fill all fields");
      return;
    }

    // Add new category if it doesn't exist
    if (!categories.includes(form.category)) {
      setCategories((prev) => [...prev, form.category!]);
    }

    if (editingId) {
      setLinks((prev) =>
        prev.map((link) =>
          link.id === editingId ? { ...link, ...(form as FooterLink) } : link
        )
      );
    } else {
      setLinks((prev) => [
        ...prev,
        { ...(form as FooterLink), id: Date.now() },
      ]);
    }

    resetForm();
  };

  const handleEdit = (link: FooterLink) => {
    setForm(link);
    setEditingId(link.id);
  };

  const handleDelete = (id: number) => {
    setLinks((prev) => prev.filter((l) => l.id !== id));
    if (editingId === id) resetForm();
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Create / Edit Footer Link</CardTitle>
          <CardDescription>
            Fill in the fields to create or edit a footer link
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
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              value={form.url || ""}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Input
              list="category-list"
              id="category"
              value={form.category || ""}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              placeholder="Select or type new category"
            />
            <datalist id="category-list">
              {categories.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
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

      {/* Created Footer Links */}
      {links.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Created Footer Links</CardTitle>
            <CardDescription>
              View, edit or delete your footer links
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {links.map((link) => (
              <div
                key={link.id}
                className="flex items-center justify-between border rounded px-3 py-2"
              >
                <div>
                  <p className="font-semibold">{link.name}</p>
                  <p className="text-sm text-muted-foreground">{link.url}</p>
                  <p className="text-sm">Category: {link.category}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleEdit(link)}>
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(link.id)}
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

export default FooterLinksManager;
