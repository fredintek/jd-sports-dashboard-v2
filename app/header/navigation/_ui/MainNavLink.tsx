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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { TabsContent } from "@/components/ui/tabs";
import { Trash2 } from "lucide-react";
import React, { useState } from "react";

type Props = {};

type NavLink = {
  id: number;
  label: string;
  url: string;
};

const MainNavLink = (props: Props) => {
  const [links, setLinks] = useState<NavLink[]>([
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
  ]);

  const [editing, setEditing] = useState<NavLink | null>(null);
  const [form, setForm] = useState({ label: "", url: "" });

  const handleSave = () => {
    if (!form.label || !form.url) return;

    if (editing) {
      // update existing link
      setLinks((prev) =>
        prev.map((l) =>
          l.id === editing.id ? { ...l, label: form.label, url: form.url } : l
        )
      );
      setEditing(null);
    } else {
      // create new link
      const newLink: NavLink = {
        id: Date.now(),
        label: form.label,
        url: form.url,
      };
      setLinks((prev) => [...prev, newLink]);
    }
    setForm({ label: "", url: "" });
  };

  const handleEdit = (link: NavLink) => {
    setEditing(link);
    setForm({ label: link.label, url: link.url });
  };

  const handleDelete = (id: number) => {
    setLinks((prev) => prev.filter((link) => link.id !== id));
    if (editing?.id === id) {
      setEditing(null);
      setForm({ label: "", url: "" });
    }
  };

  const resetEdit = () => {
    setEditing(null);
    setForm({ label: "", url: "" });
  };

  return (
    <TabsContent value="main">
      <Card>
        <CardHeader className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <CardTitle>Nav Links</CardTitle>
            <CardDescription>
              Fill the input fields to add new nav links
            </CardDescription>
          </div>

          <Button variant="outline" size="sm" onClick={() => resetEdit()}>
            Reset
          </Button>
        </CardHeader>

        <CardContent className="grid gap-6">
          {/* Form for create/edit */}
          <div className="grid gap-3">
            <Label htmlFor="label">Label</Label>
            <Input
              id="label"
              value={form.label}
              onChange={(e) => setForm({ ...form, label: e.target.value })}
            />

            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
            />

            <Button className="w-fit" onClick={handleSave}>
              {editing ? "Update Link" : "Save Link"}
            </Button>
          </div>
          {/* List of existing links */}
          <div className="space-y-2">
            {links.map((link) => (
              <div
                key={link.id}
                className="flex items-center justify-between border rounded p-2"
              >
                <span>
                  {link.label} –{" "}
                  <span className="text-muted-foreground">{link.url}</span>
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(link)}
                  >
                    Edit
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete the nav link
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(link.id)}
                        >
                          Confirm
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default MainNavLink;
