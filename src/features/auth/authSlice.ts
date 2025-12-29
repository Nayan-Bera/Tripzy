import { RootState } from "@/app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/* ================= TYPES ================= */

export type HotelAccess = {
  hotelId: string;
  hotelName: string;
  role: string;
};

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  platformRole: "USER" | "ADMIN" | "SUPER_ADMIN";
  email_verified: boolean;
};

export type AuthState = {
  user: AuthUser | null;
  hotelAccess: HotelAccess[];
  access_token: string | null;
  refresh_token: string | null;
};

/* ================= INITIAL STATE ================= */

// Load persisted auth safely
const storedAuth = localStorage.getItem("auth");
const parsedAuth: AuthState | null = storedAuth
  ? JSON.parse(storedAuth)
  : null;

const initialState: AuthState = {
  user: parsedAuth?.user ?? null,
  hotelAccess: parsedAuth?.hotelAccess ?? [],
  access_token: parsedAuth?.access_token ?? null,
  refresh_token: parsedAuth?.refresh_token ?? null,
};

/* ================= HELPERS ================= */

const saveAuthToStorage = (state: AuthState) => {
  localStorage.setItem("auth", JSON.stringify(state));
};

/* ================= SLICE ================= */

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Login (full state)
    setCredentials: (
      state,
      action: PayloadAction<{
        user: AuthUser;
        hotelAccess: HotelAccess[];
        access_token: string;
        refresh_token: string;
      }>
    ) => {
      state.user = action.payload.user;
      state.hotelAccess = action.payload.hotelAccess;
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;
      saveAuthToStorage(state);
    },

    // Refresh token ONLY
    updateTokens: (
      state,
      action: PayloadAction<{
        access_token: string;
        refresh_token: string;
      }>
    ) => {
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;
      saveAuthToStorage(state);
    },

    logout: (state) => {
      state.user = null;
      state.hotelAccess = [];
      state.access_token = null;
      state.refresh_token = null;
      localStorage.removeItem("auth");
    },
  },
});

/* ================= EXPORTS ================= */

export const { setCredentials, updateTokens, logout } =
  authSlice.actions;

export default authSlice.reducer;

export const selectCurrentAuth = (state: RootState) => state.auth;
