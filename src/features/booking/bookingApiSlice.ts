import { apiSlice } from "@/app/api/apiSlice";
import {
  Booking,
  BookingPayload,
  BookingResponse,
  BookingListResponse,
  PaymentPayload,
  PaymentResponse,
} from "@/types/booking";

/* ================= API SLICE ================= */

const asNumber = (value: unknown, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const mapBooking = (booking: any): Booking => {
  const property = booking?.property ?? {};
  const rooms = booking?.rooms ?? booking?.bookingRooms ?? [];
  const payments = booking?.payments ?? [];
  const firstPayment = payments[0];

  return {
    id: booking?.id,
    bookingNumber: booking?.bookingNumber ?? booking?.booking_number ?? booking?.id,
    userId: booking?.userId ?? booking?.user_id ?? "",
    propertyId: booking?.propertyId ?? booking?.property_id ?? property?.id ?? "",
    propertyName: booking?.propertyName ?? property?.title ?? property?.name ?? "Booked property",
    rooms: Array.isArray(rooms)
      ? rooms.map((room: any) => ({
          roomId: room?.roomId ?? room?.room_id ?? room?.id,
          roomTitle: room?.roomTitle ?? room?.room?.name ?? room?.room?.title ?? "Room",
          quantity: asNumber(room?.quantity, 1),
          basePrice: asNumber(room?.basePrice ?? room?.room?.pricePerDay ?? room?.room?.price_per_day),
          totalPrice: asNumber(room?.totalPrice ?? room?.amount),
        }))
      : [],
    checkInDate: booking?.checkInDate ?? booking?.checkIn ?? booking?.check_in,
    checkOutDate: booking?.checkOutDate ?? booking?.checkOut ?? booking?.check_out,
    guests:
      booking?.guests ?? {
        firstName: booking?.user?.name?.split(" ")[0] ?? "Guest",
        lastName: booking?.user?.name?.split(" ").slice(1).join(" ") ?? "",
        email: booking?.user?.email ?? "",
        phone: booking?.user?.phone_number ?? "",
        country: "India",
      },
    status: booking?.status ?? "pending",
    totalPrice: asNumber(booking?.totalPrice ?? booking?.total_price ?? firstPayment?.amount),
    numberOfNights: asNumber(booking?.numberOfNights ?? booking?.number_of_nights, 1),
    specialRequests: booking?.specialRequests ?? booking?.special_requests,
    payments: Array.isArray(payments)
      ? payments.map((payment: any) => ({
          id: payment?.id,
          amount: asNumber(payment?.amount),
          method: payment?.method ?? payment?.paymentMethod,
          status: payment?.status ?? "pending",
        }))
      : [],
    createdAt: booking?.createdAt ?? booking?.created_at ?? new Date().toISOString(),
    updatedAt: booking?.updatedAt ?? booking?.updated_at ?? new Date().toISOString(),
  };
};

export const bookingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Create a new booking
     * @param payload Booking details
     * @returns Booking confirmation with ID
     */
    createBooking: builder.mutation<BookingResponse, BookingPayload>({
      query: (payload) => ({
        url: "/bookings",
        method: "POST",
        body: {
          propertyId: payload.propertyId,
          checkIn: payload.checkIn ?? payload.checkInDate,
          checkOut: payload.checkOut ?? payload.checkOutDate,
          paymentMethod: payload.paymentMethod,
          rooms: payload.rooms.map((room) => ({
            roomId: room.roomId,
            quantity: room.quantity,
          })),
        },
      }),
      transformResponse: (response: any) => ({
        message: response?.message ?? "Booking created successfully",
        data: mapBooking(response?.data ?? response),
      }),
      invalidatesTags: ["Hotel"],
    }),

    /**
     * Get booking details by ID
     * @param bookingId Booking ID
     * @returns Booking details
     */
    getBooking: builder.query<BookingResponse, string>({
      query: (bookingId) => ({
        url: `/bookings/${bookingId}`,
        method: "GET",
      }),
      transformResponse: (response: any) => ({
        message: response?.message ?? "Booking fetched successfully",
        data: mapBooking(response?.data ?? response),
      }),
    }),

    /**
     * Get all bookings for logged-in user
     * @returns List of user's bookings
     */
    getUserBookings: builder.query<BookingListResponse, void>({
      query: () => ({
        url: "/bookings",
        method: "GET",
      }),
      transformResponse: (response: any) => ({
        message: response?.message ?? "Bookings fetched successfully",
        data: (response?.data ?? response ?? []).map(mapBooking),
      }),
      providesTags: ["Hotel"],
    }),

    /**
     * Get upcoming bookings for user
     * @returns List of upcoming bookings
     */
    getUpcomingBookings: builder.query<BookingListResponse, void>({
      query: () => ({
        url: "/bookings",
        method: "GET",
      }),
      transformResponse: (response: any) => ({
        message: response?.message ?? "Bookings fetched successfully",
        data: (response?.data ?? response ?? [])
          .map(mapBooking)
          .filter((booking: Booking) => new Date(booking.checkInDate).getTime() >= Date.now()),
      }),
      providesTags: ["Hotel"],
    }),

    /**
     * Get past bookings for user
     * @returns List of past bookings
     */
    getPastBookings: builder.query<BookingListResponse, void>({
      query: () => ({
        url: "/bookings",
        method: "GET",
      }),
      transformResponse: (response: any) => ({
        message: response?.message ?? "Bookings fetched successfully",
        data: (response?.data ?? response ?? [])
          .map(mapBooking)
          .filter((booking: Booking) => new Date(booking.checkOutDate).getTime() < Date.now()),
      }),
      providesTags: ["Hotel"],
    }),

    /**
     * Cancel a booking
     * @param bookingId Booking ID to cancel
     * @returns Updated booking with cancelled status
     */
    cancelBooking: builder.mutation<
      BookingResponse,
      { bookingId: string; reason?: string }
    >({
      query: ({ bookingId, reason }) => ({
        url: `/bookings/${bookingId}/cancel`,
        method: "PUT",
        body: reason ? { reason } : undefined,
      }),
      transformResponse: (response: any) => ({
        message: response?.message ?? "Booking cancelled successfully",
        data: mapBooking(response?.data ?? response),
      }),
      invalidatesTags: ["Hotel"],
    }),

    /**
     * Update booking details
     * @param bookingId Booking ID
     * @param updates Updated booking fields
     * @returns Updated booking
     */
    updateBooking: builder.mutation<
      BookingResponse,
      {
        bookingId: string;
        specialRequests?: string;
      }
    >({
      query: ({ bookingId, ...updates }) => ({
        url: `/bookings/${bookingId}`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: ["Hotel"],
    }),

    /**
     * Process payment for booking
     * @param payload Payment details
     * @returns Payment status
     */
    processPayment: builder.mutation<PaymentResponse, PaymentPayload>({
      query: (payload) => ({
        url: "/bookings",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Hotel"],
    }),

    /**
     * Get payment status
     * @param paymentId Payment ID
     * @returns Payment details
     */
    getPaymentStatus: builder.query<
      { message: string; data: { status: string } },
      string
    >({
      query: (paymentId) => ({
        url: `/payments/${paymentId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetBookingQuery,
  useGetUserBookingsQuery,
  useGetUpcomingBookingsQuery,
  useGetPastBookingsQuery,
  useCancelBookingMutation,
  useUpdateBookingMutation,
  useProcessPaymentMutation,
  useGetPaymentStatusQuery,
} = bookingApiSlice;
