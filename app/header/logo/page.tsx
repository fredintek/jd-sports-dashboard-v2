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
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <section className="grid grid-cols-2">
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
                  <Input id="tabs-demo-desktop" type="file" accept="image/*" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Change</Button>
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
                  <Input id="tabs-demo-mobile" type="file" accept="image/*" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Change</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default page;
