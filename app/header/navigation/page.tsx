"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import MainNavLink from "./_ui/MainNavLink";
import SubNavLink from "./_ui/SubNavLink";

type Props = {};

const page = (props: Props) => {
  return (
    <section className="grid grid-cols-2">
      <div className="w-full">
        <Tabs defaultValue="main">
          <TabsList>
            <TabsTrigger value="main">Main Nav Links</TabsTrigger>
            <TabsTrigger value="sub">Sub Nav Links</TabsTrigger>
          </TabsList>
          <MainNavLink />

          <SubNavLink />
        </Tabs>
      </div>
    </section>
  );
};

export default page;
