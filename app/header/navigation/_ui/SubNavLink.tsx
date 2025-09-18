"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import React, { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash, Trash2 } from "lucide-react";

type Props = {};

type SubLink = {
  id: number;
  label: string;
  url: string;
  type: "image" | "category";
  button?: boolean;
  image?: File | string;
  items?: { label: string; url: string }[];
  main: string;
};

const mainLinks = [
  { id: 1, label: "New In", url: "/new-in" },
  { id: 2, label: "Men", url: "/men" },
  { id: 3, label: "Women", url: "/women" },
  { id: 4, label: "Kids", url: "/kids" },
  { id: 5, label: "Accessories", url: "/accessories" },
  { id: 6, label: "Brands", url: "/brands" },
  { id: 7, label: "Collections", url: "/collections" },
  { id: 8, label: "Only At JD", url: "/only-at-jd" },
  { id: 9, label: "Back To School", url: "/back-to-school" },
  { id: 10, label: "Egiftcard", url: "/egiftcard" },
  { id: 11, label: "Savings", url: "/savings" },
];

const SubNavLink = (props: Props) => {
  const [selectedMain, setSelectedMain] = useState<string>("");
  const [form, setForm] = useState<Partial<SubLink>>({ type: "image" });
  const [subLinks, setSubLinks] = useState<SubLink[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const resetForm = (clearMain: boolean = false) => {
    setForm({ type: "image" });
    setEditingId(null);
    if (clearMain) setSelectedMain("");
  };

  const handleSave = () => {
    if (!selectedMain) {
      alert("Please select a main link first.");
      return;
    }
    if (editingId) {
      setSubLinks((prev) =>
        prev.map((s) =>
          s.id === editingId
            ? { ...s, ...(form as SubLink), id: editingId, main: selectedMain }
            : s
        )
      );
      setEditingId(null);
    } else {
      setSubLinks((prev) => [
        ...prev,
        { ...(form as SubLink), id: Date.now(), main: selectedMain },
      ]);
    }
    resetForm();
  };

  const handleEdit = (link: SubLink) => {
    setForm(link);
    setSelectedMain(link.main);
    setEditingId(link.id);
  };

  const handleAddCategoryItem = () => {
    setForm((prev) => ({
      ...prev,
      items: [...(prev.items || []), { label: "", url: "" }],
    }));
  };

  const handleDeleteCategoryItem = (idx: number) => {
    setForm((prev) => ({
      ...prev,
      items: (prev.items || []).filter((_, i) => i !== idx),
    }));
  };

  const handleDeleteSubLinks = (id: number) => {
    setSubLinks((prev) => prev.filter((link) => link.id !== id));

    // If the deleted link is currently being edited, reset form
    if (editingId === id) {
      resetForm();
    }
  };

  return (
    <TabsContent value="sub">
      <Card>
        <CardHeader className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <CardTitle>Sub Nav Links</CardTitle>
            <CardDescription>
              Fill the input fields to add new sub nav links
            </CardDescription>
          </div>

          <Button variant="outline" size="sm" onClick={() => resetForm(true)}>
            Reset
          </Button>
        </CardHeader>

        <CardContent className="grid gap-6">
          {/* Select main link */}
          <div className="flex flex-col gap-1">
            <Label>Main Link</Label>
            <Select
              value={selectedMain}
              onValueChange={(value) => setSelectedMain(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select main link" />
              </SelectTrigger>
              <SelectContent>
                {mainLinks.map((m) => (
                  <SelectItem key={m.id} value={m.label}>
                    {m.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Form */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <Label htmlFor="label">Label</Label>
              <Input
                id="label"
                value={form.label || ""}
                onChange={(e) => setForm({ ...form, label: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                value={form.url || ""}
                onChange={(e) => setForm({ ...form, url: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Type</Label>
              <RadioGroup
                value={form.type}
                onValueChange={(v) => setForm({ ...form, type: v as any })}
                className="flex items-center gap-3"
              >
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="image" id="r1" />
                  <Label htmlFor="r1">Image</Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="category" id="r2" />
                  <Label htmlFor="r2">Category</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* Conditional fields */}
          {form.type === "image" && (
            <div className="flex flex-col gap-2">
              <Label htmlFor="image">Upload Image</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    // store the file or its preview URL
                    setForm({ ...form, image: file });
                  }
                }}
              />

              {/* Preview */}
              {form.image && (
                <div className="mt-2">
                  <img
                    src={
                      typeof form.image === "string"
                        ? form.image
                        : URL.createObjectURL(form.image)
                    }
                    alt="preview"
                    className="h-24 w-24 object-cover rounded"
                  />
                </div>
              )}

              <div className="flex items-center gap-2">
                <Label>Button</Label>
                <Switch
                  checked={form.button || false}
                  onCheckedChange={(checked) =>
                    setForm({ ...form, button: checked })
                  }
                />
              </div>
            </div>
          )}

          {form.type === "category" && (
            <div className="flex flex-col gap-2">
              <Label>Category Items</Label>
              {(form.items || []).map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Input
                    placeholder="Label"
                    value={item.label}
                    onChange={(e) => {
                      const updated = [...(form.items || [])];
                      updated[idx].label = e.target.value;
                      setForm({ ...form, items: updated });
                    }}
                  />
                  <Input
                    placeholder="URL"
                    value={item.url}
                    onChange={(e) => {
                      const updated = [...(form.items || [])];
                      updated[idx].url = e.target.value;
                      setForm({ ...form, items: updated });
                    }}
                  />
                  <Button
                    onClick={() => handleDeleteCategoryItem(idx)}
                    variant="destructive"
                    size="sm"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" onClick={handleAddCategoryItem}>
                + Add Item
              </Button>
            </div>
          )}

          <Button className="w-fit" onClick={handleSave}>
            {editingId ? "Update Link" : "Save Link"}
          </Button>

          {/* View created links */}
          <div className="space-y-2">
            <h3 className="font-semibold">Created Sub Links</h3>
            {subLinks.map((link) => (
              <div
                key={link.id}
                className="flex items-center justify-between border rounded px-3 py-2"
              >
                <span>
                  {link.label} ({link.type})
                </span>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleEdit(link)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDeleteSubLinks(link.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default SubNavLink;
