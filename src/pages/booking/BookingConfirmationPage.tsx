import { useParams, useNavigate } from "react-router-dom";
import { CheckCircle, Download, Share2, Home, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetBookingQuery } from "@/features/booking/bookingApiSlice";
import { toast } from "sonner";

export default function BookingConfirmationPage() {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetBookingQuery(bookingId || "");
  const booking = data?.data;

  if (isLoading) {
    return (
      <div className="min-h-screen p-4">
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <h2 className="font-semibold mb-2">Booking not found</h2>
            <Button onClick={() => navigate("/")}>Go home</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleShare = () => {
    const shareText = `I just booked a room on Tripzy! Confirmation #${booking.bookingNumber}`;
    if (navigator.share) {
      navigator.share({
        title: "Booking Confirmation",
        text: shareText,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(
        `${shareText}\n${window.location.href}`
      );
      toast.success("Link copied to clipboard!");
    }
  };

  const handleDownload = () => {
    toast.success("Booking confirmation email sent to " + booking.guests.email);
  };

  const checkInDate = new Date(booking.checkInDate);
  const checkOutDate = new Date(booking.checkOutDate);
  const daysUntilCheckIn = Math.ceil(
    (checkInDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-background py-12 px-4">
      <div className="mx-auto max-w-2xl">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-muted-foreground">
            Your stay has been successfully booked
          </p>
        </div>

        {/* Confirmation Details */}
        <Card className="mb-6 border-green-200">
          <CardHeader className="bg-green-50 border-b border-green-200">
            <CardTitle className="text-lg">Booking Confirmation</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-1">
                    CONFIRMATION NUMBER
                  </p>
                  <p className="text-2xl font-bold">{booking.bookingNumber}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-1">
                    BOOKING DATE
                  </p>
                  <p className="text-lg font-semibold">
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">Property</h3>
                <p className="font-medium">{booking.propertyName}</p>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">Guest Information</h3>
                <div className="space-y-1 text-sm">
                  <p>
                    {booking.guests.firstName} {booking.guests.lastName}
                  </p>
                  <p className="text-muted-foreground">
                    {booking.guests.email}
                  </p>
                  <p className="text-muted-foreground">
                    {booking.guests.phone}
                  </p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Dates
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      CHECK-IN
                    </p>
                    <p className="font-medium">
                      {checkInDate.toLocaleDateString("en-IN", {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {booking.checkInDate.split("T")[0]}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      CHECK-OUT
                    </p>
                    <p className="font-medium">
                      {checkOutDate.toLocaleDateString("en-IN", {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {booking.checkOutDate.split("T")[0]}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">Room Details</h3>
                <div className="space-y-2 text-sm">
                  {booking.rooms.map((room) => (
                    <div key={room.roomId} className="flex justify-between">
                      <span>
                        {room.roomTitle} × {room.quantity}
                      </span>
                      <span className="font-medium">
                        ₹{((room.basePrice ?? 0) * room.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4 bg-muted/50 -mx-6 -mb-6 p-6 rounded-b-lg">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total Amount</span>
                  <span className="text-2xl font-bold">
                    ₹{booking.totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Information */}
        <Card className="mb-6 border-blue-200 bg-blue-50/50">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-3">Important Information</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                ✓ Check-in: {booking.checkInDate.split("T")[0]} (After 2:00 PM)
              </p>
              <p>
                ✓ Check-out: {booking.checkOutDate.split("T")[0]} (Before 11:00 AM)
              </p>
              {daysUntilCheckIn > 0 && (
                <p>✓ Your check-in is in {daysUntilCheckIn} days</p>
              )}
              <p>
                ✓ Free cancellation up to 48 hours before check-in
              </p>
              {booking.specialRequests && (
                <p>
                  ✓ Special requests: {booking.specialRequests}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <Button
              onClick={handleDownload}
              variant="outline"
              className="w-full"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Voucher
            </Button>
            <Button
              onClick={handleShare}
              variant="outline"
              className="w-full"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share Booking
            </Button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Button
              onClick={() => navigate("/profile")}
              variant="outline"
              className="w-full"
            >
              View My Bookings
            </Button>
            <Button
              onClick={() => navigate("/")}
              className="w-full"
            >
              <Home className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>

        {/* Confirmation Email */}
        <Card className="mt-6 bg-muted/50">
          <CardContent className="pt-6">
            <p className="text-xs text-muted-foreground text-center">
              📧 A confirmation email has been sent to{" "}
              <span className="font-medium">{booking.guests.email}</span>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
