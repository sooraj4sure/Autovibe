import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types";

interface WishlistState {
  items: Product[];
}

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist(state, action: PayloadAction<Product>) {
      const exists = state.items.find((item) => item._id === action.payload._id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFromWishlist(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    toggleWishlist(state, action: PayloadAction<Product>) {
      const index = state.items.findIndex((item) => item._id === action.payload._id);
      if (index === -1) {
        state.items.push(action.payload);
      } else {
        state.items.splice(index, 1);
      }
    },
    hydrateWishlist(state, action: PayloadAction<Product[]>) {
      state.items = action.payload;
    },
  },
});

export const { addToWishlist, removeFromWishlist, toggleWishlist, hydrateWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
