import { logout, setCredentials } from "@/features/auth/authSlice";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

interface RefreshResponse {
	access_token: string;
	refresh_token: string;
}

const baseQuery = fetchBaseQuery({
	baseUrl: import.meta.env.VITE_API_BASE_URL,
	prepareHeaders: (headers, { getState }) => {
		const token = (getState() as RootState).auth.access_token;
		if (token) {
			headers.set("Authorization", `Bearer ${token}`);
		}
		return headers;
	},
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
	let result = await baseQuery(args, api, extraOptions);

	if (result?.error?.status === 401 && args.url !== "/auth/refresh") {
		const refreshToken = (api.getState() as RootState).auth.refresh_token;

		if (!refreshToken) {
			api.dispatch(logout());
			return result;
		}

		const refreshResult = await baseQuery(
			{
				url: "/auth/refresh",
				method: "POST",
				body: { refresh_token: refreshToken },
			},
			api,
			extraOptions
		);

		if (refreshResult?.data) {
			const { access_token, refresh_token } =
				refreshResult.data as RefreshResponse;

			const user = (api.getState() as RootState).auth;

			api.dispatch(
				setCredentials({
					...user,
					access_token,
					refresh_token,
				})
			);

			result = await baseQuery(args, api, extraOptions);
		} else {
			api.dispatch(logout());
		}
	}

	return result;
};

export const apiSlice = createApi({
	baseQuery: baseQueryWithReauth,
	refetchOnFocus: true,
	refetchOnReconnect: true,
	tagTypes: ["User"],
	endpoints: () => ({}),
});
