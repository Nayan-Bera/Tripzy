import { apiSlice } from "@/app/api/apiSlice";

export const roleApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRoles: builder.query<
      { id: string; name: string }[],
      void
    >({
      query: () => "/role/get-role",

      transformResponse: (response: {
        status: number;
        message: string;
        data: { id: string; name: string }[];
      }) => response.data,
    }),
  }),
});

export const { useGetRolesQuery } = roleApiSlice;
