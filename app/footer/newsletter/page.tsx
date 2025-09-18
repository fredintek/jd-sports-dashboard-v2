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
import React, { useState } from "react";

type Newsletter = {
  id: number;
  title: string;
  subtitle: string;
  enabled: boolean;
};

const NewsletterSection = () => {
  const [form, setForm] = useState<Partial<Newsletter>>({ enabled: false });
  const [newsletter, setNewsletter] = useState<Newsletter | null>(null);
  const [editing, setEditing] = useState(false);

  const resetForm = () => {
    setForm({ enabled: false });
    setEditing(false);
  };

  const handleSave = () => {
    if (form.enabled && (!form.title || !form.subtitle)) {
      alert("Please fill in both title and subtitle");
      return;
    }

    const newEntry: Newsletter = {
      id: Date.now(),
      title: form.title || "",
      subtitle: form.subtitle || "",
      enabled: form.enabled || false,
    };

    setNewsletter(newEntry);
    resetForm();
  };

  const handleEdit = () => {
    if (!newsletter) return;
    setForm(newsletter);
    setEditing(true);
  };

  const handleDelete = () => {
    setNewsletter(null);
    resetForm();
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="w-full">
        <Card>
          <CardHeader>
            <CardTitle>Newsletter Section</CardTitle>
            <CardDescription>
              Control whether the newsletter title & subtitle are displayed
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-4">
            <div className="flex items-center gap-2">
              <Label>Enable Newsletter Section</Label>
              <Switch
                checked={form.enabled || false}
                onCheckedChange={(checked) =>
                  setForm({ ...form, enabled: checked })
                }
              />
            </div>

            {form.enabled && (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={form.title || ""}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="subtitle">Subtitle</Label>
                  <Input
                    id="subtitle"
                    value={form.subtitle || ""}
                    onChange={(e) =>
                      setForm({ ...form, subtitle: e.target.value })
                    }
                  />
                </div>
              </>
            )}

            <div className="flex gap-2 mt-2">
              <Button onClick={handleSave}>
                {editing ? "Update" : "Save"}
              </Button>
              <Button variant="outline" onClick={resetForm}>
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* View created newsletter */}
        {newsletter && (
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Created Newsletter</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>
                <strong>Enabled:</strong> {newsletter.enabled ? "Yes" : "No"}
              </p>
              {newsletter.enabled && (
                <>
                  <p>
                    <strong>Title:</strong> {newsletter.title}
                  </p>
                  <p>
                    <strong>Subtitle:</strong> {newsletter.subtitle}
                  </p>
                </>
              )}
              <div className="flex gap-2 mt-2">
                <Button size="sm" onClick={handleEdit}>
                  Edit
                </Button>
                <Button size="sm" variant="destructive" onClick={handleDelete}>
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};

export default NewsletterSection;
