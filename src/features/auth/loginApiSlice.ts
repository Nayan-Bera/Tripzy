import { apiSlice } from "@/app/api/apiSlice";

/* ================= TYPES ================= */

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  platformRole: "USER" | "ADMIN" | "SUPER_ADMIN";
  email_verified: boolean;
}

export interface HotelAccess {
  hotelId: string;
  hotelName: string;
  role: string;
}

export interface LoginResponse {
  status: number;
  message: string;
  data: {
    user: AuthUser;
    hotelAccess: HotelAccess[];
    access_token: string;
    refresh_token: string;
  };
}

/* ================= API ================= */

export const loginApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useLoginMutation } = loginApiSlice;
