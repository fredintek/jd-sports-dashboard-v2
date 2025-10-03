// types/roles.ts
export type Permission =
  | "manage_users"
  | "manage_roles"
  | "view_reports"
  | "edit_content"
  | "delete_content"
  | "handle_support"
  | "moderate_content"
  | "access_developer_tools";

export interface Role {
  id: string;
  name: string;
  permissions: string[];
}
