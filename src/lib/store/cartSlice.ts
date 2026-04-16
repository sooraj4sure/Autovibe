import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, Product } from "@/types";
import { calculateCartTotals } from "@/lib/utils";

interface CartState {
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  isOpen: boolean;
}

const initialState: CartState = {
  items: [],
  subtotal: 0,
  tax: 0,
  shipping: 0,
  total: 0,
  isOpen: false,
};

function recalculate(items: CartItem[]): Omit<CartState, "items" | "isOpen"> {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  return calculateCartTotals(subtotal);
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<{ product: Product; quantity?: number }>) {
      const { product, quantity = 1 } = action.payload;
      const existing = state.items.find((item) => item.product._id === product._id);

      if (existing) {
        existing.quantity = Math.min(existing.quantity + quantity, product.stock);
      } else {
        state.items.push({ product, quantity: Math.min(quantity, product.stock) });
      }

      const totals = recalculate(state.items);
      Object.assign(state, totals);
    },

    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.product._id !== action.payload);
      const totals = recalculate(state.items);
      Object.assign(state, totals);
    },

    updateQuantity(state, action: PayloadAction<{ productId: string; quantity: number }>) {
      const { productId, quantity } = action.payload;
      const item = state.items.find((i) => i.product._id === productId);

      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter((i) => i.product._id !== productId);
        } else {
          item.quantity = Math.min(quantity, item.product.stock);
        }
      }

      const totals = recalculate(state.items);
      Object.assign(state, totals);
    },

    clearCart(state) {
      state.items = [];
      state.subtotal = 0;
      state.tax = 0;
      state.shipping = 0;
      state.total = 0;
    },

    toggleCart(state) {
      state.isOpen = !state.isOpen;
    },

    openCart(state) {
      state.isOpen = true;
    },

    closeCart(state) {
      state.isOpen = false;
    },

    // Rehydrate cart from localStorage
    hydrateCart(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
      const totals = recalculate(action.payload);
      Object.assign(state, totals);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
  openCart,
  closeCart,
  hydrateCart,
} = cartSlice.actions;

export default cartSlice.reducer;
