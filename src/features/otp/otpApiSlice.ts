
import { apiSlice } from "@/app/api/apiSlice";

export const otpApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "otp/verify-otp",
        method: "POST",
        body: data,
      }),
    }),
         resendOtp: builder.mutation({
      query: (data) => ({
        url: "otp/resend-otp",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useVerifyOtpMutation, useResendOtpMutation } = otpApiSlice;
