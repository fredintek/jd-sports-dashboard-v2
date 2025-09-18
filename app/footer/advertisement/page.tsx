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
import { Switch } from "@/components/ui/switch";
import { Trash2 } from "lucide-react";

type Props = {};

type AdCard = {
  id: number;
  title: string;
  price: string;
  image?: File | null;
  imageUrl?: string;
  url: string;
  description: string;
  button?: boolean;
};

const Advertisement = (props: Props) => {
  const [enabled, setEnabled] = useState(false); // Yes / No
  const [cards, setCards] = useState<AdCard[]>([]);
  const [form, setForm] = useState<Partial<AdCard>>({});
  const [editingId, setEditingId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setForm({});
    setEditingId(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
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

  const handleSaveCard = () => {
    if (!form.title || !form.price || !form.url || !form.description) {
      alert("Please fill all fields");
      return;
    }

    if (editingId) {
      setCards((prev) =>
        prev.map((c) =>
          c.id === editingId ? { ...c, ...(form as AdCard) } : c
        )
      );
      setEditingId(null);
    } else {
      setCards((prev) => [...prev, { ...(form as AdCard), id: Date.now() }]);
    }

    resetForm();
  };

  const handleEditCard = (card: AdCard) => {
    setForm(card);
    setEditingId(card.id);
  };

  const handleDeleteCard = (id: number) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
    if (editingId === id) resetForm();
  };

  return (
    <section className="grid grid-cols-1 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Advertisement</CardTitle>
          <CardDescription>
            Enable advertisement and create multiple cards if yes
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-4">
          <div className="flex items-center gap-2">
            <Label>Enable Advertisement</Label>
            <Switch checked={enabled} onCheckedChange={setEnabled} />
          </div>

          {enabled && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={form.title || ""}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    value={form.price || ""}
                    onChange={(e) =>
                      setForm({ ...form, price: e.target.value })
                    }
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

                <div className="flex flex-col gap-1">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={form.description || ""}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                  />
                </div>

                <div className="flex flex-col gap-1">
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

                <div className="flex items-center gap-2 mt-5">
                  <Label>Button</Label>
                  <Switch
                    checked={form.button || false}
                    onCheckedChange={(checked) =>
                      setForm({ ...form, button: checked })
                    }
                  />
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button onClick={handleSaveCard}>
                  {editingId ? "Update Card" : "Add Card"}
                </Button>
                <Button variant="outline" onClick={resetForm}>
                  Reset
                </Button>
              </div>

              {/* Created cards */}
              {cards.length > 0 && (
                <div className="mt-6 space-y-2">
                  <h3 className="font-semibold">Created Cards</h3>
                  {cards.map((card) => (
                    <div
                      key={card.id}
                      className="flex items-center justify-between border rounded px-3 py-2"
                    >
                      <div>
                        <p className="text-sm">
                          <span className="font-semibold">Title:</span>{" "}
                          {card.title}
                        </p>
                        <p className="text-sm">
                          <span className="font-semibold">Price:</span>{" "}
                          {card.price}
                        </p>
                        <p className="text-sm">
                          <span className="font-semibold">Url:</span> {card.url}
                        </p>
                        <p className="text-sm">
                          <span className="font-semibold">Description:</span>{" "}
                          {card.description}
                        </p>
                        <p className="text-sm">
                          {card.button ? (
                            <>
                              <span className="font-semibold">Button: </span>
                              <span>Yes</span>
                            </>
                          ) : (
                            <>
                              <span className="font-semibold">Button: </span>
                              <span>No</span>
                            </>
                          )}
                        </p>
                        {card.image && (
                          <p className="text-sm">Image selected</p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => handleEditCard(card)}>
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteCard(card.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default Advertisement;
