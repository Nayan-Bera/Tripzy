import { apiSlice } from "@/app/api/apiSlice";

export const roleApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRoles: builder.query<
      { id: string; name: string }[],
      void
    >({
      query: () => "/role/get-role",
    }),
  }),
});

export const { useGetRolesQuery } = roleApiSlice;

