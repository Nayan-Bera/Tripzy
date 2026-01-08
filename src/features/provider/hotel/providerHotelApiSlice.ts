import { apiSlice } from "@/app/api/apiSlice"

/* ================= TYPES ================= */

export type ProviderHotel = {
  id: string
  name: string
  country: string
  state: string
  city: string
  contact: string
  verified: boolean
  totalRooms: number
  totalBookings: number
  status: "active" | "inactive"
}

export type GetProviderHotelsResponse = {
  message: string
  data: ProviderHotel[]
}

/* ================= API SLICE ================= */

export const providerHotelApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProviderHotels: builder.query<GetProviderHotelsResponse, void>({
      query: () => ({
        url: "/provider/my-hotels",
        method: "GET",
      }),
      providesTags: ["Hotel"],
    }),
  }),
})

export const { useGetProviderHotelsQuery } = providerHotelApiSlice
