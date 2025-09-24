import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  stock: number;
  status: string;
  image: string;
}

interface ProductState {
  products: Product[];
  productStats: {
    label: string;
    value: number | string;
    icon: any;
    color: string;
  }[];
}

function calculateStats(products: Product[]) {
  const total = products.length;
  const inStock = products.filter((p) => p.stock > 0).length;
  const outOfStock = total - inStock;

  return [
    {
      label: "Total Products",
      value: total,
      icon: "package",
      color: "text-blue-500",
    },
    {
      label: "In Stock",
      value: inStock,
      icon: "check-circle",
      color: "text-green-500",
    },
    {
      label: "Out of Stock",
      value: outOfStock,
      icon: "x-circle",
      color: "text-red-500",
    },
    {
      label: "Revenue",
      value: "$23,450",
      icon: "dollar-sign",
      color: "text-orange-500",
    },
  ];
}

const initialProducts = [
  {
    id: 1,
    name: "Nike Air Max",
    category: "Shoes",
    price: "120",
    stock: 34,
    status: "In Stock",
    image:
      "https://www.jdsports.cy/2767528-product_horizontal/on-cloudtilt.jpg",
  },
  {
    id: 2,
    name: "Adidas Ultraboost",
    category: "Shoes",
    price: "95",
    stock: 0,
    status: "Out of Stock",
    image:
      "https://www.jdsports.cy/2698124-product_horizontal/nike-air-force-1-07.jpg",
  },
  {
    id: 3,
    name: "Puma RS-X",
    category: "Shoes",
    price: "110",
    stock: 12,
    status: "In Stock",
    image:
      "https://www.jdsports.cy/2768050-product_medium/adidas-originals-superstar-ii.jpg",
  },
];

const initialState: ProductState = {
  products: initialProducts,
  productStats: calculateStats(initialProducts),
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: (
      state,
      action: PayloadAction<Omit<Product, "id" | "status">>
    ) => {
      const newId = state.products.length + 1;
      const newProduct: Product = {
        ...action.payload,
        id: newId,
        stock: Number(action.payload.stock),
        status: Number(action.payload.stock) > 0 ? "In Stock" : "Out of Stock",
      };
      state.products.push(newProduct);
      state.productStats = calculateStats(state.products);
    },
    editProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = {
          ...action.payload,
          stock: Number(action.payload.stock),
          status:
            Number(action.payload.stock) > 0 ? "In Stock" : "Out of Stock",
        };
      }
      state.productStats = calculateStats(state.products);
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
      state.productStats = calculateStats(state.products);
    },

    unassignCategory: (state, action: PayloadAction<string>) => {
      const categoryName = action.payload;
      state.products = state.products.map((p) =>
        p.category === categoryName ? { ...p, category: "Uncategorized" } : p
      );
      state.productStats = calculateStats(state.products);
    },
  },
});

export const { addProduct, editProduct, deleteProduct, unassignCategory } =
  productSlice.actions;
export default productSlice.reducer;
