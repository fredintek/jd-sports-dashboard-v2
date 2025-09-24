import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { unassignCategory } from "./productSlice";

export type Category = {
  id: number;
  name: string;
  description: string;
};

type CategoryState = {
  categories: Category[];
};

const initialState: CategoryState = {
  categories: [
    {
      id: 1,
      name: "Shoes",
      description: "All kinds of shoes including sneakers, boots, and more",
    },
    {
      id: 2,
      name: "Clothing",
      description: "T-shirts, jackets, pants, and more",
    },
  ],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<Omit<Category, "id">>) => {
      state.categories.push({
        id: state.categories.length + 1,
        ...action.payload,
      });
    },
    updateCategory: (state, action: PayloadAction<Category>) => {
      state.categories = state.categories.map((c) =>
        c.id === action.payload.id ? action.payload : c
      );
    },
    deleteCategory: (state, action: PayloadAction<number>) => {
      state.categories = state.categories.filter(
        (c) => c.id !== action.payload
      );
    },
  },
});

// thunk-like action to delete category & clean products
export const deleteCategoryAndUnassign =
  (id: number, name: string) => (dispatch: any) => {
    dispatch(categorySlice.actions.deleteCategory(id));
    dispatch(unassignCategory(name)); // clean up products
  };

export const { addCategory, updateCategory, deleteCategory } =
  categorySlice.actions;

export default categorySlice.reducer;
