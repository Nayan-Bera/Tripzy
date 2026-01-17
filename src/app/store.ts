import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "@/features/auth/authSlice";
import { apiSlice } from "@/app/api/apiSlice";

import authReducer from "@/features/auth/authSlice";
import wishlistReducer from "@/features/wishlist/wishlistApislice";
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    wishlist: wishlistReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
