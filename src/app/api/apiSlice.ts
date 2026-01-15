import { logout, updateTokens } from "@/features/auth/authSlice";
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

const baseQueryWithReauth = async (
  args: any,
  api: any,
  extraOptions: any
) => {
  let result = await baseQuery(args, api, extraOptions);

  // Access token expired
  if (result?.error?.status === 401 && args.url !== "/api/auth/refresh") {
    const refreshToken = (api.getState() as RootState).auth.refresh_token;

    // No refresh token → logout
    if (!refreshToken) {
      api.dispatch(logout());
      return result;
    }

    // Try refreshing
    const refreshResult = await baseQuery(
      {
        url: "/api/auth/refresh",
        method: "POST",
        body: { refresh_token: refreshToken },
      },
      api,
      extraOptions
    );

    // ✅ Refresh success
    if (refreshResult?.data) {
      const { access_token, refresh_token } =
        refreshResult.data as RefreshResponse;

      api.dispatch(updateTokens({ access_token, refresh_token }));

      // Retry original request with new token
      return await baseQuery(args, api, extraOptions);
    }

    // Refresh token expired or invalid → LOGOUT
    api.dispatch(logout());
  }

  return result;
};


export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ["User", "Hotel"],
  endpoints: () => ({}),
});
