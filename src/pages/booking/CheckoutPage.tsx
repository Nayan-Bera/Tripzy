import { useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetPropertyDetailQuery } from "@/features/property/propertyApiSlice";
import { useCreateBookingMutation } from "@/features/booking/bookingApiSlice";
import { useAppSelector } from "@/app/hooks";
import { toast } from "sonner";

// Validation schemas
const guestSchema = z.object({
  firstName: z.string().min(2, "First name required"),
  lastName: z.string().min(2, "Last name required"),
  email: z.string().email("Invalid email"),
  phone: z.string().regex(/^[+]?[0-9]{10,}$/, "Invalid phone number"),
  country: z.string().min(2, "Country required"),
});

const paymentSchema = z.object({
  paymentMethod: z.enum(["card", "upi", "wallet"]),
  cardNumber: z.string().optional(),
  cardholderName: z.string().optional(),
  expiryDate: z.string().optional(),
  cvv: z.string().optional(),
});

type GuestFormData = z.infer<typeof guestSchema>;
type PaymentFormData = z.infer<typeof paymentSchema>;

const steps = [
  { id: 1, title: "Room Details", key: "room" },
  { id: 2, title: "Guest Info", key: "guest" },
  { id: 3, title: "Summary", key: "summary" },
  { id: 4, title: "Payment", key: "payment" },
];

export default function CheckoutPage() {
  const { propertyId } = useParams<{ propertyId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(
    searchParams.get("roomId") || null
  );
  const [roomQuantity, setRoomQuantity] = useState(1);
  const [specialRequests, setSpecialRequests] = useState("");
  const checkInDate =
    searchParams.get("checkIn") ??
    new Date(Date.now() + 86400000).toISOString().slice(0, 10);
  const checkOutDate =
    searchParams.get("checkOut") ??
    new Date(Date.now() + 86400000 * 3).toISOString().slice(0, 10);

  // Get property details
  const { data: propertyData, isLoading: isLoadingProperty, error: propertyError } = useGetPropertyDetailQuery(propertyId || "");
  const property = propertyData?.data;

  // Forms
  const guestForm = useForm<GuestFormData>({
    resolver: zodResolver(guestSchema),
    defaultValues: {
      firstName: user?.name?.split(" ")[0] || "",
      lastName: user?.name?.split(" ")[1] || "",
      email: user?.email || "",
      phone: "",
      country: "India",
    },
  });

  const paymentForm = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      paymentMethod: "card",
    },
  });

  // API mutations
  const [createBooking, { isLoading: isCreatingBooking }] =
    useCreateBookingMutation();

  if (isLoadingProperty) {
    return (
      <div className="min-h-screen p-4">
        <Skeleton className="h-96 w-full mb-6" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (propertyError || !property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="pt-6 text-center">
            <h2 className="font-semibold mb-2">Property not found</h2>
            <Button onClick={() => navigate("/search")}>Go back</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const selectedRoomData = property.rooms.find((r) => r.id === selectedRoom);
  const nightsCount = Math.max(
    1,
    Math.ceil(
      (new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) /
        86400000
    )
  );
  const roomPrice = (selectedRoomData?.basePrice || property.rooms[0]?.basePrice || 0) * roomQuantity;
  const totalPrice = roomPrice * nightsCount;
  const taxes = totalPrice * 0.18; // 18% GST
  const finalPrice = totalPrice + taxes;

  const handleNextStep = async () => {
    if (currentStep === 2) {
      const isValid = await guestForm.trigger();
      if (!isValid) return;
    }
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSubmitBooking = async (paymentData: PaymentFormData) => {
    if (!selectedRoom) {
      toast.error("Please select a room");
      return;
    }

    try {
      const bookingPayload = {
        propertyId: property.id,
        rooms: [
          {
            roomId: selectedRoom,
            quantity: roomQuantity,
          },
        ],
        checkIn: new Date(`${checkInDate}T${property.policies.checkInTime}:00.000Z`).toISOString(),
        checkOut: new Date(`${checkOutDate}T${property.policies.checkOutTime}:00.000Z`).toISOString(),
        paymentMethod: paymentData.paymentMethod,
        specialRequests,
      };

      const bookingResult = await createBooking(bookingPayload).unwrap();
      toast.success("Booking created successfully!");
      navigate(`/booking-confirmation/${bookingResult.data.id}`);
    } catch (error) {
      toast.error("Failed to create booking. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="mx-auto max-w-5xl px-4">
        {/* Stepper */}
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center font-semibold ${
                    currentStep >= step.id
                      ? "bg-primary text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {currentStep > step.id ? "✓" : step.id}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 flex-1 mx-2 ${
                      currentStep > step.id ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            {steps.map((step) => (
              <span key={step.id}>{step.title}</span>
            ))}
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Main Content */}
          <div className="md:col-span-2">
            {/* Step 1: Room Details */}
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Select Room</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {property.rooms.map((room) => (
                    <div
                      key={room.id}
                      onClick={() => setSelectedRoom(room.id)}
                      className={`p-4 border rounded-lg cursor-pointer transition ${
                        selectedRoom === room.id
                          ? "border-primary bg-primary/5"
                          : "border-muted hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{room.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {room.description}
                          </p>
                          <div className="flex gap-4 mt-2 text-xs">
                            <span>👥 {room.capacity} guests</span>
                            <span>🛏️ {room.beds} bed(s)</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold">₹{room.basePrice}</p>
                          <p className="text-xs text-muted-foreground">
                            per night
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {selectedRoom && (
                    <div className="space-y-3 border-t pt-4">
                      <h4 className="font-semibold text-sm">Number of Rooms</h4>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setRoomQuantity(Math.max(1, roomQuantity - 1))
                          }
                        >
                          −
                        </Button>
                        <Input
                          type="number"
                          value={roomQuantity}
                          onChange={(e) =>
                            setRoomQuantity(
                              Math.max(1, parseInt(e.target.value) || 1)
                            )
                          }
                          className="w-16 text-center"
                          min={1}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setRoomQuantity(roomQuantity + 1)}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Step 2: Guest Information */}
            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Guest Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...guestForm}>
                    <form
                      onSubmit={guestForm.handleSubmit(() => {})}
                      className="space-y-4"
                    >
                      <div className="grid gap-4 md:grid-cols-2">
                        <FormField
                          control={guestForm.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={guestForm.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={guestForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={guestForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="+91..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={guestForm.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div>
                        <h4 className="font-semibold text-sm mb-2">
                          Special Requests (Optional)
                        </h4>
                        <Textarea
                          placeholder="Any special requests for your stay?"
                          value={specialRequests}
                          onChange={(e) => setSpecialRequests(e.target.value)}
                          className="text-sm"
                        />
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Summary */}
            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Property</h4>
                    <p className="font-medium">{property.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {property.location.city}, {property.location.state}
                    </p>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-3">Room Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>{selectedRoomData?.title}</span>
                        <span className="font-medium">x {roomQuantity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Check-in</span>
                        <span className="font-medium">
                          {new Date(checkInDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Check-out</span>
                        <span className="font-medium">
                          {new Date(checkOutDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Number of Nights</span>
                        <span className="font-medium">{nightsCount}</span>
                      </div>
                    </div>
                  </div>

                  {specialRequests && (
                    <div className="border-t pt-4">
                      <h4 className="font-semibold mb-2">Special Requests</h4>
                      <p className="text-sm text-muted-foreground">
                        {specialRequests}
                      </p>
                    </div>
                  )}

                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-3">Guest Info</h4>
                    <div className="space-y-1 text-sm">
                      <p>
                        {guestForm.getValues("firstName")}{" "}
                        {guestForm.getValues("lastName")}
                      </p>
                      <p className="text-muted-foreground">
                        {guestForm.getValues("email")}
                      </p>
                      <p className="text-muted-foreground">
                        {guestForm.getValues("phone")}
                      </p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-3">Policies</h4>
                    <div className="space-y-2 text-xs text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Check-in: {property.policies.checkInTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Check-out: {property.policies.checkOutTime}</span>
                      </div>
                      <p>{property.policies.cancellationPolicy}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 4: Payment */}
            {currentStep === 4 && (
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...paymentForm}>
                    <form
                      onSubmit={paymentForm.handleSubmit(
                        handleSubmitBooking
                      )}
                      className="space-y-4"
                    >
                      <FormField
                        control={paymentForm.control}
                        name="paymentMethod"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Select Payment Method</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Choose payment method" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="card">Card</SelectItem>
                                <SelectItem value="upi">UPI</SelectItem>
                                <SelectItem value="wallet">
                                  Digital Wallet
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {["card"].includes(
                        paymentForm.watch("paymentMethod") || ""
                      ) && (
                        <>
                          <FormField
                            control={paymentForm.control}
                            name="cardNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Card Number</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="1234 5678 9012 3456"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={paymentForm.control}
                            name="cardholderName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Cardholder Name</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="grid gap-4 md:grid-cols-2">
                            <FormField
                              control={paymentForm.control}
                              name="expiryDate"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Expiry Date</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="MM/YY"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={paymentForm.control}
                              name="cvv"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>CVV</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="123"
                                      type="password"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </>
                      )}

                      <Button
                        type="submit"
                        className="w-full"
                        size="lg"
                        disabled={isCreatingBooking}
                      >
                        {isCreatingBooking ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          `Complete Booking - ₹${finalPrice.toFixed(2)}`
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            )}

            {/* Navigation buttons */}
            <div className="flex gap-3 mt-8">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back
              </Button>

              {currentStep < 4 && (
                <Button onClick={handleNextStep} className="ml-auto">
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </div>

          {/* Price Summary Sidebar */}
          <div>
            <div className="sticky top-20 space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Price Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>
                        ₹{selectedRoomData?.basePrice || 0} ×{" "}
                        {roomQuantity} room(s) × {nightsCount} nights
                      </span>
                      <span className="font-medium">₹{roomPrice * nightsCount}</span>
                    </div>

                    <div className="flex justify-between text-muted-foreground">
                      <span>Taxes & Fees (18%)</span>
                      <span>₹{taxes.toFixed(2)}</span>
                    </div>

                    <div className="border-t pt-2 flex justify-between font-bold">
                      <span>Total</span>
                      <span className="text-lg">₹{finalPrice.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded p-3 text-xs text-green-700">
                    ✓ Free cancellation until 48 hours before check-in
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-muted/50">
                <CardContent className="pt-6">
                  <p className="text-xs text-muted-foreground">
                    🔒 Your payment information is secure and encrypted
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
