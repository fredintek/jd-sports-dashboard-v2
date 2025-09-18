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

type PrivacyInfo = {
  id: number;
  text: string;
  url: string;
};

const PrivacyInfoSection = () => {
  const [form, setForm] = useState<Partial<PrivacyInfo>>({});
  const [items, setItems] = useState<PrivacyInfo[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const resetForm = () => {
    setForm({});
    setEditingId(null);
  };

  const handleSave = () => {
    if (!form.text || !form.url) {
      alert("Please fill both fields");
      return;
    }

    if (editingId) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === editingId ? { ...item, ...(form as PrivacyInfo) } : item
        )
      );
    } else {
      setItems((prev) => [
        ...prev,
        { ...(form as PrivacyInfo), id: Date.now() },
      ]);
    }

    resetForm();
  };

  const handleEdit = (item: PrivacyInfo) => {
    setForm(item);
    setEditingId(item.id);
  };

  const handleDelete = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    if (editingId === id) resetForm();
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="w-full">
        <Card>
          <CardHeader>
            <CardTitle>Privacy Info</CardTitle>
            <CardDescription>Add links for privacy info</CardDescription>
          </CardHeader>

          <CardContent className="grid gap-4">
            {/* Text */}
            <div className="grid gap-2">
              <Label htmlFor="text">Text</Label>
              <Input
                id="text"
                value={form.text || ""}
                onChange={(e) => setForm({ ...form, text: e.target.value })}
              />
            </div>

            {/* URL */}
            <div className="grid gap-2">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                value={form.url || ""}
                onChange={(e) => setForm({ ...form, url: e.target.value })}
              />
            </div>

            {/* Buttons */}
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

        {/* View Created Items */}
        {items.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Created Privacy Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border rounded px-3 py-2"
                >
                  <div>
                    <p className="font-semibold">{item.text}</p>
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

export default PrivacyInfoSection;
