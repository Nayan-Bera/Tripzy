import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type WishlistItem = {
  id: string;
  name: string;
  location: string;
  image: string;
  pricePerNight: number;
};

type WishlistState = {
  items: WishlistItem[];
};

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist(state, action: PayloadAction<WishlistItem[]>) {
      state.items = action.payload;
    },

    toggleWishlist(state, action: PayloadAction<WishlistItem>) {
      const exists = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (exists) {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        state.items.push(action.payload);
      }
    },

    removeFromWishlist(state, action: PayloadAction<string>) {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    },

    clearWishlist(state) {
      state.items = [];
    },
  },
});

export const {
  setWishlist,
  toggleWishlist,
  removeFromWishlist,
  clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
