/* ================= BOOKING TYPES ================= */

export type Guest = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
};

export type BookingRoom = {
  roomId: string;
  roomTitle?: string;
  quantity: number;
  basePrice?: number;
  totalPrice?: number;
};

export type BookingPayload = {
  propertyId: string;
  rooms: BookingRoom[];
  checkIn?: string;
  checkOut?: string;
  checkInDate?: string;
  checkOutDate?: string;
  guests?: Guest;
  paymentMethod: "card" | "upi" | "wallet";
  specialRequests?: string;
  totalPrice?: number;
  numberOfNights?: number;
};

export type Booking = {
  id: string;
  bookingNumber: string;
  userId: string;
  propertyId: string;
  propertyName: string;
  rooms: BookingRoom[];
  checkInDate: string;
  checkOutDate: string;
  guests: Guest;
  status: "confirmed" | "pending" | "cancelled" | "completed";
  totalPrice: number;
  numberOfNights: number;
  specialRequests?: string;
  payments?: Array<{
    id: string;
    amount: number;
    method?: string;
    status: string;
  }>;
  createdAt: string;
  updatedAt: string;
};

export type BookingResponse = {
  message: string;
  data: Booking;
};

export type BookingListResponse = {
  message: string;
  data: Booking[];
};

export type PaymentMethod = "credit_card" | "debit_card" | "upi" | "wallet";

export type PaymentPayload = {
  bookingId: string;
  amount: number;
  paymentMethod: PaymentMethod;
  cardDetails?: {
    cardNumber: string;
    cardholderName: string;
    expiryDate: string;
    cvv: string;
  };
};

export type PaymentResponse = {
  message: string;
  data: {
    paymentId: string;
    status: "pending" | "success" | "failed";
    bookingId: string;
  };
};
