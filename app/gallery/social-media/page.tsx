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

type SocialMedia = {
  id: number;
  image?: File | null;
  imageUrl?: string;
  likeCount: number;
  commentCount: number;
};

type SectionButton = {
  title: string;
  url: string;
};

const SocialMediaSection = () => {
  const [form, setForm] = useState<Partial<SocialMedia>>({
    likeCount: 0,
    commentCount: 0,
  });
  const [socials, setSocials] = useState<SocialMedia[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [sectionButton, setSectionButton] = useState<SectionButton | null>(
    null
  );
  const [buttonForm, setButtonForm] = useState<SectionButton>({
    title: "",
    url: "",
  });

  const resetForm = () => {
    setForm({ likeCount: 0, commentCount: 0 });
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

  const handleSave = () => {
    if (!form.image) {
      alert("Please upload an image");
      return;
    }

    if (editingId) {
      setSocials((prev) =>
        prev.map((s) =>
          s.id === editingId ? { ...s, ...(form as SocialMedia) } : s
        )
      );
      setEditingId(null);
    } else {
      setSocials((prev) => [
        ...prev,
        { ...(form as SocialMedia), id: Date.now() },
      ]);
    }

    resetForm();
  };

  const handleEdit = (item: SocialMedia) => {
    setForm(item);
    setEditingId(item.id);
  };

  const handleDelete = (id: number) => {
    setSocials((prev) => prev.filter((item) => item.id !== id));
    if (editingId === id) resetForm();
  };

  const handleButtonSave = () => {
    if (!buttonForm.title || !buttonForm.url) return;
    setSectionButton(buttonForm);
    setButtonForm({ title: "", url: "" });
  };

  const handleButtonDelete = () => {
    setSectionButton(null);
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Social Media Section</CardTitle>
            <CardDescription>
              Upload images, set like/comment counts, and configure section
              button
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

            {/* Like / Comment */}
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <Label>Like Count</Label>
                <Input
                  type="number"
                  value={form.likeCount || 0}
                  onChange={(e) =>
                    setForm({ ...form, likeCount: Number(e.target.value) })
                  }
                />
              </div>

              <div className="flex flex-col gap-1">
                <Label>Comment Count</Label>
                <Input
                  type="number"
                  value={form.commentCount || 0}
                  onChange={(e) =>
                    setForm({ ...form, commentCount: Number(e.target.value) })
                  }
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-2">
              <Label>Section Button</Label>
              {sectionButton ? (
                <div className="flex items-center justify-between border rounded-md p-2">
                  <div>
                    <p className="font-medium">{sectionButton.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {sectionButton.url}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => setButtonForm(sectionButton)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={handleButtonDelete}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="grid gap-2">
                  <Input
                    placeholder="Button Title"
                    value={buttonForm.title}
                    onChange={(e) =>
                      setButtonForm({ ...buttonForm, title: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Button URL"
                    value={buttonForm.url}
                    onChange={(e) =>
                      setButtonForm({ ...buttonForm, url: e.target.value })
                    }
                  />
                  <Button
                    className="w-fit"
                    size="sm"
                    onClick={handleButtonSave}
                  >
                    Save Button
                  </Button>
                </div>
              )}
            </div>

            {/* Save / Reset */}
            <div className="flex gap-2">
              <Button onClick={handleSave}>
                {editingId ? "Update Social Media" : "Save Social Media"}
              </Button>
              <Button variant="outline" onClick={resetForm}>
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Created Items Preview */}
        {socials.length > 0 && (
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Created Social Media Items</CardTitle>
              <CardDescription>Preview, edit or delete</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {socials.map((item) => (
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
                        👍 Likes: {item.likeCount}
                      </p>
                      <p className="font-semibold">
                        💬 Comments: {item.commentCount}
                      </p>
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

export default SocialMediaSection;
