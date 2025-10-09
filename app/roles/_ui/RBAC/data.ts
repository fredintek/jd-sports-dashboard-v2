export type PermissionAction = "view" | "create" | "edit" | "delete";

export type PermissionGroup =
  | "Dashboard"
  | "Users"
  | "Category"
  | "Products"
  | "Orders"
  | "Customers"
  | "Report&Analysis"
  | "Transactions"
  | "Content System"
  | "Role";

export interface Permission {
  id: string;
  group: PermissionGroup;
  action: PermissionAction;
}

export interface Role {
  id: string;
  name: string;
  permissions: Permission[];
}
