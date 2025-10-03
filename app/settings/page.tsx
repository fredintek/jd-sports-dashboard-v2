"use client";
import React, { useState } from "react";
import Rbac from "./_ui/RBAC/Rbac";
import Permissions from "./_ui/RBAC/Perm";
import { permissions } from "./_ui/RBAC/data";

type Props = {};

const page = (props: Props) => {
  const [allPermissions, setAllPermissions] = useState(permissions);
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="w-full">
        <Rbac permissions={allPermissions} setPermissions={setAllPermissions} />
      </div>
      <div className="w-full">
        <Permissions
          permissions={allPermissions}
          setPermissions={setAllPermissions}
        />
      </div>
    </section>
  );
};

export default page;
