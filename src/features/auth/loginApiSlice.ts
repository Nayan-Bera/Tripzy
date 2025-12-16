import { apiSlice } from "@/app/api/apiSlice";

interface LoginRequest {
	email: string;
	password: string;
}

export interface LoginResponse {
	data: {
		email_verified: boolean;
		role: string;
		access_token: string;
		refresh_token: string;
	};
}

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
