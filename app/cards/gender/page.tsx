"use client";

import React, { useRef, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
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

type Category = {
  id: number;
  label: string;
  url: string;
};

const existingCategory = [
  {
    id: 1,
    label: "Men",
    url: "/men",
  },
  {
    id: 2,
    label: "Women",
    url: "/women",
  },
];

type GenderCard = {
  id: number;
  title: string;
  image?: File;
  imageUrl?: string;
  categories: Category[];
};

const GenderSection = (props: Props) => {
  const [genderCards, setGenderCards] = useState<GenderCard[]>([]);
  const [existingCategories, setExistingCategories] =
    useState<Category[]>(existingCategory);
  const [form, setForm] = useState<Partial<GenderCard>>({ categories: [] });
  const [editingId, setEditingId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setForm({ categories: [] });
    setEditingId(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSave = () => {
    if (!form.title || !form.categories || form.categories.length === 0) {
      alert("Please fill all fields and add at least one category");
      return;
    }

    if (editingId) {
      setGenderCards((prev) =>
        prev.map((card) =>
          card.id === editingId ? { ...card, ...(form as GenderCard) } : card
        )
      );
      setEditingId(null);
    } else {
      setGenderCards((prev) => [
        ...prev,
        { ...(form as GenderCard), id: Date.now() },
      ]);
    }

    // Add new categories to global list if they don't exist
    form.categories.forEach((cat) => {
      if (
        !existingCategories.find(
          (c) => c.label === cat.label && c.url === cat.url
        )
      ) {
        setExistingCategories((prev) => [...prev, { ...cat, id: Date.now() }]);
      }
    });

    resetForm();
  };

  const handleEdit = (card: GenderCard) => {
    setForm(card);
    setEditingId(card.id);
  };

  const handleDelete = (id: number) => {
    setGenderCards((prev) => prev.filter((c) => c.id !== id));
    if (editingId === id) resetForm();
  };

  const handleAddCategory = () => {
    setForm((prev) => ({
      ...prev,
      categories: [
        ...(prev.categories || []),
        { id: Date.now(), label: "", url: "" },
      ],
    }));
  };

  const handleCategoryChange = (
    idx: number,
    key: "label" | "url",
    value: string
  ) => {
    const updated = [...(form.categories || [])];
    updated[idx][key] = value;
    setForm({ ...form, categories: updated });
  };

  const handleRemoveCategory = (idx: number) => {
    const updated = [...(form.categories || [])];
    updated.splice(idx, 1);
    setForm({ ...form, categories: updated });
  };

  const handleSelectExistingCategory = (cat: Category) => {
    // Prevent duplicates
    if (
      !(form.categories || []).find(
        (c) => c.label === cat.label && c.url === cat.url
      )
    ) {
      setForm({ ...form, categories: [...(form.categories || []), cat] });
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

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="w-full">
        <Card>
          <CardHeader>
            <CardTitle>Gender Card</CardTitle>
            <CardDescription>
              Fill the form to create/edit a gender card
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {/* Title */}
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={form.title || ""}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
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

            {/* Categories */}
            <div className="grid gap-2">
              <Label>Categories</Label>

              {(form.categories || []).map((cat, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Input
                    placeholder="Label"
                    value={cat.label}
                    onChange={(e) =>
                      handleCategoryChange(idx, "label", e.target.value)
                    }
                  />
                  <Input
                    placeholder="URL"
                    value={cat.url}
                    onChange={(e) =>
                      handleCategoryChange(idx, "url", e.target.value)
                    }
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveCategory(idx)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              <div className="flex gap-2">
                <Button variant="outline" onClick={handleAddCategory}>
                  + New Category
                </Button>

                <Select
                  onValueChange={(value) => {
                    const selected = existingCategories.find(
                      (c) => c.id.toString() === value
                    );
                    if (selected) handleSelectExistingCategory(selected);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select existing category" />
                  </SelectTrigger>
                  <SelectContent>
                    {existingCategories.map((cat) => (
                      <SelectItem
                        key={`${cat.id}-${cat.label}`}
                        value={cat.id.toString()}
                      >
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-2 mt-2">
              <Button onClick={handleSave}>
                {editingId ? "Update Card" : "Save Card"}
              </Button>
              <Button variant="outline" onClick={resetForm}>
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Created Gender Cards */}
        {genderCards.length > 0 && (
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Created Gender Cards</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {genderCards.map((card) => (
                <div
                  key={card.id}
                  className="border p-3 rounded flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold">{card.title}</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {card.categories.map((cat) => (
                        <span
                          key={cat.id}
                          className="px-2 py-1 bg-gray-100 rounded text-sm"
                        >
                          {cat.label}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleEdit(card)}>
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(card.id)}
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

export default GenderSection;
