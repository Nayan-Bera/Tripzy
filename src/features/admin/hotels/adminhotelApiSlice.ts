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
export interface HotelListItem {
  id: string;
  name: string;
  contact: string;
  verified: boolean;
  owner: {
    id: string;
    email: string;
    name: string;
  };
  totalRooms: number;
  totalBookings: number;
  status: "active" | "inactive";
}

export interface GetHotelsResponse {
  hotels: HotelListItem[];
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
     getHotels: builder.query<
      { message: string; data: HotelListItem[] },
      void
    >({
      query: () => "/admin/hotel/all",
      providesTags: ["Hotel"],
    }),
  }),
});

export const { useCreateHotelMutation, useGetHotelsQuery } = adminHotelApiSlice;
