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
import { Switch } from "@/components/ui/switch";
import React, { useRef, useState } from "react";
import { Trash2 } from "lucide-react";

type Brand = {
  id: number;
  name: string;
  link: string;
  favourite: boolean;
  top: boolean;
  image?: File;
  imageUrl?: string;
};

const BrandsPage = () => {
  const [form, setForm] = useState<Partial<Brand>>({});
  const [brands, setBrands] = useState<Brand[]>([]);
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
    if (!form.name || !form.link) {
      alert("Please fill Name and Link fields");
      return;
    }

    if (editingId) {
      setBrands((prev) =>
        prev.map((b) => (b.id === editingId ? { ...b, ...(form as Brand) } : b))
      );
      setEditingId(null);
    } else {
      setBrands((prev) => [...prev, { ...(form as Brand), id: Date.now() }]);
    }

    resetForm();
  };

  const handleEdit = (brand: Brand) => {
    setForm(brand);
    setEditingId(brand.id);
  };

  const handleDelete = (id: number) => {
    setBrands((prev) => prev.filter((b) => b.id !== id));
    if (editingId === id) resetForm();
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

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="w-full">
        <Card>
          <CardHeader>
            <CardTitle>Create / Edit Brand</CardTitle>
            <CardDescription>
              Fill in the fields below to create or edit a brand
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-4">
            {/* Name */}
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={form.name || ""}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            {/* Link */}
            <div className="grid gap-2">
              <Label htmlFor="link">Link</Label>
              <Input
                id="link"
                value={form.link || ""}
                onChange={(e) => setForm({ ...form, link: e.target.value })}
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

            {/* Favourite */}
            <div className="flex items-center gap-2">
              <Label>Favourite</Label>
              <Switch
                checked={form.favourite || false}
                onCheckedChange={(checked) =>
                  setForm({ ...form, favourite: checked })
                }
              />
            </div>

            {/* Top */}
            <div className="flex items-center gap-2">
              <Label>Top</Label>
              <Switch
                checked={form.top || false}
                onCheckedChange={(checked) =>
                  setForm({ ...form, top: checked })
                }
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

        {/* View Created Brands */}
        {brands.length > 0 && (
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Created Brands</CardTitle>
              <CardDescription>View, edit, or delete brands</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {brands.map((brand) => (
                <div
                  key={brand.id}
                  className="flex items-center justify-between border rounded px-3 py-2"
                >
                  <div>
                    <p className="font-semibold">{brand.name}</p>
                    <p className="text-sm">{brand.link}</p>
                    <p className="text-sm">
                      Favourite: {brand.favourite ? "Yes" : "No"}, Top:{" "}
                      {brand.top ? "Yes" : "No"}
                    </p>
                    {brand.image && (
                      <p className="text-sm text-muted-foreground">
                        {brand.image.name}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleEdit(brand)}>
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(brand.id)}
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

export default BrandsPage;
