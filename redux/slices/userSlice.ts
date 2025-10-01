import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserRole = "admin" | "editor" | "user";
export type UserStatus = "active" | "inactive";

export type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  image: string;
  status: UserStatus;
  role: UserRole;
};

type UserState = {
  users: User[];
  activeUser: User | null;
};

const initialState: UserState = {
  users: [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice.admin@example.com",
      phone: "+1 555-111-2222",
      status: "active",
      role: "admin",
      image:
        "https://plus.unsplash.com/premium_photo-1689551670902-19b441a6afde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d29tYW58ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob.editor@example.com",
      phone: "+1 555-333-4444",
      status: "active",
      role: "editor",
      image:
        "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFufGVufDB8fDB8fHww",
    },
    {
      id: 3,
      name: "Charlie Davis",
      email: "charlie.user@example.com",
      phone: "+1 555-555-6666",
      status: "inactive",
      role: "user",
      image:
        "https://images.unsplash.com/photo-1615109398623-88346a601842?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFufGVufDB8fDB8fHww",
    },
  ],
  activeUser: {
    id: 1,
    name: "Alice Johnson",
    email: "alice.admin@example.com",
    phone: "+1 555-111-2222",
    status: "active",
    role: "admin",
    image:
      "https://plus.unsplash.com/premium_photo-1689551670902-19b441a6afde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d29tYW58ZW58MHx8MHx8fDA%3D",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<Omit<User, "id">>) => {
      const newId = state.users.length
        ? state.users[state.users.length - 1].id + 1
        : 1;
      state.users.push({ id: newId, ...action.payload });
    },
    updateUser: (state, action: PayloadAction<User>) => {
      state.users = state.users.map((u) =>
        u.id === action.payload.id ? action.payload : u
      );
    },
    deleteUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter((u) => u.id !== action.payload);
    },

    // switch user simulation
    switchUser: (state) => {
      const foundUser =
        state.users[Math.floor(Math.random() * state.users.length)];
      state.activeUser = foundUser ?? null;
    },
  },
});

export const { addUser, updateUser, deleteUser, switchUser } =
  userSlice.actions;

export default userSlice.reducer;
