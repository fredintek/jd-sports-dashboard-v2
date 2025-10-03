import { Role } from "@/types/rbac";

export const permissions = [
  "manage_users",
  "manage_roles",
  "view_reports",
  "edit_content",
  "delete_content",
  "handle_support",
  "moderate_content",
  "access_developer_tools",
];

export const mockRoles: Role[] = [
  {
    id: "1",
    name: "Super Admin",
    permissions: [
      "manage_users",
      "manage_roles",
      "view_reports",
      "edit_content",
      "delete_content",
      "handle_support",
      "moderate_content",
      "access_developer_tools",
    ],
  },
  {
    id: "2",
    name: "Admin",
    permissions: [
      "manage_users",
      "view_reports",
      "edit_content",
      "delete_content",
    ],
  },
  {
    id: "3",
    name: "Editor / Manager",
    permissions: ["edit_content", "delete_content"],
  },
  {
    id: "4",
    name: "Viewer / Analyst",
    permissions: ["view_reports"],
  },
  {
    id: "5",
    name: "Support Agent",
    permissions: ["handle_support"],
  },
  {
    id: "6",
    name: "Moderator",
    permissions: ["moderate_content"],
  },
  {
    id: "7",
    name: "Developer",
    permissions: ["access_developer_tools"],
  },
];
