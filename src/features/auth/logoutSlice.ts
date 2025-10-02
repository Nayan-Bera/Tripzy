import { apiSlice } from "@/app/api/apiSlice";

export const logoutApislice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        logout: builder.mutation({
            query: (credentials) => ({
                url: "/api/v1/auth/logout",
                method: "POST",
                body: { ...credentials },
            }),
            invalidatesTags: ["User"],
        }),
    }),
});

export const { useLogoutMutation } = logoutApislice;