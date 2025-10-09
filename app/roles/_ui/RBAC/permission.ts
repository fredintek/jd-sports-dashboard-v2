import { Permission } from "./data";

export const defaultPermissions: Permission[] = [
  // Dashboard
  { id: "dashboard-view", group: "Dashboard", action: "view" },

  // Users
  { id: "users-view", group: "Users", action: "view" },
  { id: "users-create", group: "Users", action: "create" },
  { id: "users-edit", group: "Users", action: "edit" },
  { id: "users-delete", group: "Users", action: "delete" },

  // Category
  { id: "category-view", group: "Category", action: "view" },
  { id: "category-create", group: "Category", action: "create" },
  { id: "category-edit", group: "Category", action: "edit" },
  { id: "category-delete", group: "Category", action: "delete" },

  // Products
  { id: "products-view", group: "Products", action: "view" },
  { id: "products-create", group: "Products", action: "create" },
  { id: "products-edit", group: "Products", action: "edit" },
  { id: "products-delete", group: "Products", action: "delete" },

  // Orders
  { id: "orders-view", group: "Orders", action: "view" },
  { id: "orders-create", group: "Orders", action: "create" },
  { id: "orders-edit", group: "Orders", action: "edit" },
  { id: "orders-delete", group: "Orders", action: "delete" },

  // Customers
  { id: "customers-view", group: "Customers", action: "view" },
  { id: "customers-create", group: "Customers", action: "create" },
  { id: "customers-edit", group: "Customers", action: "edit" },
  { id: "customers-delete", group: "Customers", action: "delete" },

  // Report & Analysis
  { id: "report-view", group: "Report&Analysis", action: "view" },
  { id: "report-create", group: "Report&Analysis", action: "create" },
  { id: "report-edit", group: "Report&Analysis", action: "edit" },
  { id: "report-delete", group: "Report&Analysis", action: "delete" },

  // Transactions
  { id: "transactions-view", group: "Transactions", action: "view" },
  { id: "transactions-create", group: "Transactions", action: "create" },
  { id: "transactions-edit", group: "Transactions", action: "edit" },
  { id: "transactions-delete", group: "Transactions", action: "delete" },

  // Content System
  { id: "content-view", group: "Content System", action: "view" },
  { id: "content-create", group: "Content System", action: "create" },
  { id: "content-edit", group: "Content System", action: "edit" },
  { id: "content-delete", group: "Content System", action: "delete" },

  // Role System
  { id: "role-view", group: "Role", action: "view" },
  { id: "role-create", group: "Role", action: "create" },
  { id: "role-edit", group: "Role", action: "edit" },
  { id: "role-delete", group: "Role", action: "delete" },
];
