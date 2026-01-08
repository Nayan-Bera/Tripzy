import { apiSlice } from "@/app/api/apiSlice";

/* ================= TYPES ================= */

export interface CreateHotelRequest {
  ownerEmail: string;
  name: string;
  contact: string;
}

export interface CreateHotelResponse {
  message: string;
}

/* ================= API ================= */

export const adminHotelApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createHotel: builder.mutation<
      CreateHotelResponse,
      CreateHotelRequest
    >({
      query: (body) => ({
        url: "/admin/hotel/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Hotel"],
    }),
  }),
});

export const { useCreateHotelMutation } = adminHotelApiSlice;
