import { Permission, Role } from "@/app/roles/_ui/RBAC/data";
import { defaultPermissions } from "@/app/roles/_ui/RBAC/permission";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

interface RoleState {
  roles: Role[];
}

// const adminPermissions = defaultPermissions;

// const editorPermissions = defaultPermissions.filter((p) =>
//   [
//     "Dashboard",
//     "Category",
//     "Products",
//     "Content System",
//     "Report&Analysis",
//   ].includes(p.group)
// );

export const initialState: RoleState = {
  // roles: [
  //   {
  //     id: "admin-role-id",
  //     name: "Admin",
  //     permissions: adminPermissions,
  //   },
  //   {
  //     id: "editor-role-id",
  //     name: "Editor",
  //     permissions: editorPermissions.filter((p) => p.action !== "delete"),
  //   },
  // ],
  roles: [],
};

const roleSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    addRole: (
      state,
      action: PayloadAction<{ name: string; permissions: Permission[] }>
    ) => {
      state.roles.push({
        id: nanoid(),
        name: action.payload.name,
        permissions: action.payload.permissions,
      });
    },
    updateRole: (
      state,
      action: PayloadAction<{
        id: string;
        name: string;
        permissions: Permission[];
      }>
    ) => {
      const index = state.roles.findIndex((r) => r.id === action.payload.id);
      if (index !== -1) state.roles[index] = { ...action.payload };
    },
    deleteRole: (state, action: PayloadAction<string>) => {
      state.roles = state.roles.filter((r) => r.id !== action.payload);
    },
  },
});

export const { addRole, updateRole, deleteRole } = roleSlice.actions;
export default roleSlice.reducer;
