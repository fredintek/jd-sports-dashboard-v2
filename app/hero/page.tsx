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
import { Trash2 } from "lucide-react";
import React, { useRef, useState } from "react";

type Props = {};

type HeroSlide = {
  id: number;
  image?: File;
  shopNow?: boolean;
  link?: string;
};

const HeroSection = (props: Props) => {
  const [form, setForm] = useState<Partial<HeroSlide>>({ shopNow: false });
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setForm({ shopNow: false });
    setEditingId(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSave = () => {
    if (!form.image) {
      alert("Please select an image");
      return;
    }

    if (form.shopNow && !form.link) {
      alert("Please fill the Shop Now link");
      return;
    }

    if (editingId) {
      setSlides((prev) =>
        prev.map((s) =>
          s.id === editingId ? { ...s, ...(form as HeroSlide) } : s
        )
      );
      setEditingId(null);
    } else {
      setSlides((prev) => [
        ...prev,
        { ...(form as HeroSlide), id: Date.now() },
      ]);
    }

    resetForm();
  };

  const handleEdit = (slide: HeroSlide) => {
    setForm(slide);
    setEditingId(slide.id);
  };

  const handleDelete = (id: number) => {
    setSlides((prev) => prev.filter((s) => s.id !== id));
    if (editingId === id) resetForm();
  };

  return (
    <section className="grid grid-cols-2 gap-6">
      <div className="w-full">
        <Card>
          <CardHeader>
            <CardTitle>Create / Edit Hero Slide</CardTitle>
            <CardDescription>
              Upload image and optionally set a Shop Now button
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="image">Slider Image</Label>
              <Input
                ref={fileInputRef}
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setForm({ ...form, image: e.target.files[0] });
                  }
                }}
              />
            </div>

            <div className="flex items-center gap-2">
              <Label>Shop Now Button</Label>
              <Switch
                checked={form.shopNow || false}
                onCheckedChange={(checked) =>
                  setForm({ ...form, shopNow: checked })
                }
              />
            </div>

            {form.shopNow && (
              <div className="grid gap-2">
                <Label htmlFor="link">Shop Now Link</Label>
                <Input
                  id="link"
                  value={form.link || ""}
                  onChange={(e) => setForm({ ...form, link: e.target.value })}
                />
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={handleSave}>
                {editingId ? "Update Slide" : "Save Slide"}
              </Button>
              <Button variant="outline" onClick={resetForm}>
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* View created slides */}
        {slides.length > 0 && (
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Created Slides</CardTitle>
              <CardDescription>Edit or delete slides below</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {slides.map((slide) => (
                <div
                  key={slide.id}
                  className="flex items-center justify-between border rounded px-3 py-2"
                >
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold">{slide.image?.name}</span>
                    {slide.shopNow && (
                      <span className="text-sm text-muted-foreground">
                        Shop Now: {slide.link}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleEdit(slide)}>
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(slide.id)}
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

export default HeroSection;
