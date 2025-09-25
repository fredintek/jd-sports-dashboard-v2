"use client";

import { useRef, useState } from "react";
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

type Showcase = {
  id: number;
  image?: File | null;
  imageUrl?: string;
  btn: boolean;
  btnTitle: string;
  link?: string;
};

const LooksSection = () => {
  const [form, setForm] = useState<Partial<Showcase>>({ btn: false });
  const [showcases, setShowcases] = useState<Showcase[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setForm({ btn: false });
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
    if (!form.image) {
      alert("Please upload an image");
      return;
    }

    if (form.btn && !form.link) {
      alert("Please provide a link for Shop Now");
      return;
    }

    if (editingId) {
      setShowcases((prev) =>
        prev.map((s) =>
          s.id === editingId ? { ...s, ...(form as Showcase) } : s
        )
      );
      setEditingId(null);
    } else {
      setShowcases((prev) => [
        ...prev,
        { ...(form as Showcase), id: Date.now() },
      ]);
    }

    resetForm();
  };

  const handleEdit = (item: Showcase) => {
    setForm(item);
    setEditingId(item.id);
  };

  const handleDelete = (id: number) => {
    setShowcases((prev) => prev.filter((item) => item.id !== id));
    if (editingId === id) resetForm();
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Showcase</CardTitle>
            <CardDescription>
              Upload an image and configure the "Shop Now" option
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-4">
            {/* Image Upload */}
            <div className="grid gap-2">
              <Label>Image</Label>
              <Input
                ref={fileInputRef}
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

            {/* Shop Now Toggle */}
            <div className="flex items-center gap-2">
              <Label>Button</Label>
              <Switch
                checked={form.btn || false}
                onCheckedChange={(checked) =>
                  setForm({ ...form, btn: checked })
                }
              />
            </div>

            {/* Shop Now Link */}
            {form.btn && (
              <div className="grid grid-cols-2 gap-2">
                <div className="grid gap-2">
                  <Label htmlFor="btnTitle">Button Title</Label>
                  <Input
                    id="btnTitle"
                    value={form.btnTitle || ""}
                    onChange={(e) =>
                      setForm({ ...form, btnTitle: e.target.value })
                    }
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="link">Shop Now Link</Label>
                  <Input
                    id="link"
                    value={form.link || ""}
                    onChange={(e) => setForm({ ...form, link: e.target.value })}
                  />
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-2">
              <Button onClick={handleSave}>
                {editingId ? "Update Showcase" : "Save Showcase"}
              </Button>
              <Button variant="outline" onClick={resetForm}>
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Created Showcases */}
        {showcases.length > 0 && (
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Created Showcases</CardTitle>
              <CardDescription>Preview, edit or delete</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {showcases.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border rounded px-3 py-2"
                >
                  <div className="flex items-center gap-4">
                    {item.imageUrl && (
                      <img
                        src={item.imageUrl}
                        alt="preview"
                        className="h-16 w-16 object-cover rounded"
                      />
                    )}
                    <div>
                      <p className="font-semibold">
                        Shop Now: {item.btn ? "Yes" : "No"}
                      </p>
                      {item.btn && (
                        <p className="text-sm text-muted-foreground">
                          Link: {item.link}
                        </p>
                      )}
                    </div>
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

export default LooksSection;
