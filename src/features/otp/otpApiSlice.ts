
import { apiSlice } from "@/app/api/apiSlice";

export const otpApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "/api/v1/auth/verify-otp",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useVerifyOtpMutation } = otpApiSlice;
