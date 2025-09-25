"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";

type Props = {};

const page = (props: Props) => {
  const [desktopImgPreview, setDesktopImgPreview] = useState("");
  const [mobileImgPreview, setMobileImgPreview] = useState("");

  const handleDesktopImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setDesktopImgPreview(URL.createObjectURL(file));
    }
  };

  const handleMobileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setMobileImgPreview(URL.createObjectURL(file));
    }
  };

  const resetDesktopLogo = () => {
    setDesktopImgPreview("");
  };

  const resetMobileLogo = () => {
    setMobileImgPreview("");
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-2">
      <div className="w-full">
        <Tabs defaultValue="desktop">
          <TabsList>
            <TabsTrigger value="desktop">Desktop Logo</TabsTrigger>
            <TabsTrigger value="mobile">Mobile Logo</TabsTrigger>
          </TabsList>
          <TabsContent value="desktop">
            <Card>
              <CardHeader>
                <CardTitle>Logo</CardTitle>
                <CardDescription>
                  Please upload company logo for desktop version
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-desktop">Image</Label>
                  <Input
                    id="tabs-demo-desktop"
                    type="file"
                    accept="image/*"
                    onChange={handleDesktopImageChange}
                  />
                  {desktopImgPreview && (
                    <img
                      src={desktopImgPreview}
                      alt="preview"
                      className="h-32 w-32 object-cover rounded"
                    />
                  )}
                </div>
              </CardContent>
              <CardFooter className="gap-2">
                <Button>Save Change</Button>
                <Button variant="outline" onClick={resetDesktopLogo}>
                  Reset
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="mobile">
            <Card>
              <CardHeader>
                <CardTitle>Logo</CardTitle>
                <CardDescription>
                  Please upload company logo for mobile version
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-mobile">Image</Label>
                  <Input
                    id="tabs-demo-mobile"
                    type="file"
                    accept="image/*"
                    onChange={handleMobileImageChange}
                  />
                  {mobileImgPreview && (
                    <img
                      src={mobileImgPreview}
                      alt="preview"
                      className="h-32 w-32 object-cover rounded"
                    />
                  )}
                </div>
              </CardContent>
              <CardFooter className="gap-2">
                <Button>Save Change</Button>
                <Button variant="outline" onClick={resetMobileLogo}>
                  Reset
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default page;
