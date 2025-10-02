import { apiSlice } from "@/app/api/apiSlice";

export const loginApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: "/api/v1/auth/login",
                method: "POST",
                body: { ...credentials },
            }),
            invalidatesTags: ["User"],
        }),
    }),
});

export const { useLoginMutation } = loginApiSlice;