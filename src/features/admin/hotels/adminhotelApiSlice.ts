import { apiSlice } from "@/app/api/apiSlice"

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /* ================= SEARCH USER ================= */

    searchUserByEmail: builder.query<
      { users: { id: string; name: string; email: string }[] },
      string
    >({
      query: (email) => `/admin/users/search?email=${email}`,
    }),

    /* ================= CREATE HOTEL ================= */

    createHotel: builder.mutation<
      { success: boolean },
      {
        ownerId: string
        name: string
        contact: string
      }
    >({
      query: (body) => ({
        url: "/admin/hotels",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Hotel"],
    }),
  }),
})

export const {
  useLazySearchUserByEmailQuery,
  useCreateHotelMutation,
} = adminApiSlice
