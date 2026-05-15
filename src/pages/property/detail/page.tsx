import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Heart,
  MapPin,
  Star,
  Share2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useGetPropertyDetailQuery } from "@/features/property/propertyApiSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/features/wishlist/wishlistApislice";

export default function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const wishlist = useAppSelector((state) => state.wishlist.items);
  const [imageCarouselIndex, setImageCarouselIndex] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  if (!id) {
    return <div className="text-center py-10">Property not found</div>;
  }

  const { data, isLoading, error } = useGetPropertyDetailQuery(id);
  const property = data?.data;
  const isInWishlist = wishlist.some((item) => item.id === id);

  if (isLoading) {
    return (
      <div className="min-h-screen space-y-6 p-4">
        <Skeleton className="h-96 w-full rounded-lg" />
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <Skeleton className="h-12 w-1/2 mb-4" />
            <Skeleton className="h-6 w-1/3" />
          </div>
          <Skeleton className="h-64" />
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <h2 className="font-semibold mb-2">Property not found</h2>
            <p className="text-sm text-muted-foreground mb-4">
              The property you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate("/search")}>Go back</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const images = property.images || [];
  const currentImage = images[imageCarouselIndex] || property.coverImage;

  const handleToggleWishlist = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(id));
    } else {
      dispatch(
        addToWishlist({
          id: property.id,
          name: property.name,
          location: property.location,
          cover: property.coverImage.url,
          rating: property.rating,
        })
      );
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.name,
        text: `Check out ${property.name} on Tripzy`,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const handleBookNow = () => {
    if (selectedRoom) {
      navigate(`/checkout/${property.id}?roomId=${selectedRoom}`);
    } else {
      navigate(`/checkout/${property.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Image Gallery */}
      <div className="relative h-96 w-full bg-muted overflow-hidden">
        <img
          src={currentImage.url}
          alt={currentImage.alt || property.name}
          className="h-full w-full object-cover"
        />

        {/* Image navigation */}
        {images.length > 1 && (
          <>
            <button
              onClick={() =>
                setImageCarouselIndex((i) =>
                  i === 0 ? images.length - 1 : i - 1
                )
              }
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white p-2"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() =>
                setImageCarouselIndex((i) =>
                  i === images.length - 1 ? 0 : i + 1
                )
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white p-2"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded text-xs">
            {imageCarouselIndex + 1} / {images.length}
          </div>
        )}

        {/* Action buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/80 hover:bg-white"
            onClick={handleToggleWishlist}
          >
            <Heart
              className={`h-5 w-5 ${
                isInWishlist ? "fill-red-500 text-red-500" : ""
              }`}
            />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/80 hover:bg-white"
            onClick={handleShare}
          >
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h1 className="text-3xl font-bold">{property.name}</h1>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <MapPin className="h-4 w-4" />
                    <span>
                      {property.location.address}, {property.location.city}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{property.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({property.reviewCount} reviews)
                  </span>
                </div>
                {property.verified && (
                  <Badge>✓ Verified</Badge>
                )}
                {property.featured && (
                  <Badge variant="outline">⭐ Featured</Badge>
                )}
              </div>
            </div>

            {/* Description */}
            {property.description && (
              <div>
                <h2 className="text-lg font-semibold mb-3">About</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {property.description}
                </p>
              </div>
            )}

            {/* Tabs */}
            <Tabs defaultValue="rooms" className="w-full">
              <TabsList>
                <TabsTrigger value="rooms">Rooms</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="policies">Policies</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              {/* Rooms Tab */}
              <TabsContent value="rooms" className="space-y-4 mt-6">
                {property.rooms.length > 0 ? (
                  property.rooms.map((room) => (
                    <Card
                      key={room.id}
                      className={`cursor-pointer transition ${
                        selectedRoom === room.id
                          ? "border-primary bg-primary/5"
                          : ""
                      }`}
                      onClick={() => setSelectedRoom(room.id)}
                    >
                      <CardContent className="p-6">
                        <div className="grid gap-4 md:grid-cols-3">
                          <div>
                            <h3 className="font-semibold mb-2">{room.title}</h3>
                            <p className="text-sm text-muted-foreground mb-3">
                              {room.description}
                            </p>
                            <div className="flex gap-4 text-xs">
                              <span>👥 {room.capacity} guests</span>
                              <span>🛏️ {room.beds} bed(s)</span>
                            </div>
                          </div>

                          <div>
                            <p className="text-xs font-semibold text-muted-foreground mb-2">
                              Amenities
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {room.amenities.slice(0, 4).map((amenity) => (
                                <Badge key={amenity.id} variant="outline" className="text-xs">
                                  {amenity.name}
                                </Badge>
                              ))}
                              {room.amenities.length > 4 && (
                                <Badge variant="outline" className="text-xs">
                                  +{room.amenities.length - 4}
                                </Badge>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-col items-end justify-between">
                            <div>
                              <p className="text-xs text-muted-foreground">
                                from
                              </p>
                              <p className="text-2xl font-bold">
                                ₹{room.basePrice}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                per night
                              </p>
                            </div>
                            <Button
                              size="sm"
                              variant={
                                selectedRoom === room.id ? "default" : "outline"
                              }
                            >
                              {selectedRoom === room.id ? "Selected" : "Select"}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No rooms available
                  </p>
                )}
              </TabsContent>

              {/* Amenities Tab */}
              <TabsContent value="amenities" className="mt-6">
                <div className="grid gap-4 md:grid-cols-3">
                  {property.amenities.length > 0 ? (
                    property.amenities.map((amenity) => (
                      <div key={amenity.id} className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          ✓
                        </div>
                        <span className="text-sm">{amenity.name}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No amenities listed
                    </p>
                  )}
                </div>
              </TabsContent>

              {/* Policies Tab */}
              <TabsContent value="policies" className="space-y-4 mt-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Check-in Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="font-semibold">
                        {property.policies.checkInTime}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Check-out Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="font-semibold">
                        {property.policies.checkOutTime}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="md:col-span-2">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">
                        Cancellation Policy
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {property.policies.cancellationPolicy}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="md:col-span-2">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Refund Policy</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {property.policies.refundPolicy}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Reviews Tab */}
              <TabsContent value="reviews" className="space-y-4 mt-6">
                {property.reviews.length > 0 ? (
                  property.reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-semibold text-sm">
                              {review.userName}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold text-sm">
                              {review.rating}
                            </span>
                          </div>
                        </div>
                        <p className="font-medium text-sm mb-1">
                          {review.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {review.comment}
                        </p>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No reviews yet
                  </p>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sticky Sidebar: Booking Card */}
          <div className="md:col-span-1">
            <div className="sticky top-20 space-y-4">
              <Card className="border-2">
                <CardContent className="p-6 space-y-4">
                  {/* Price Display */}
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground">
                      from
                    </p>
                    <p className="text-3xl font-bold">
                      ₹{Math.min(...property.rooms.map((r) => r.basePrice))}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      per night
                    </p>
                  </div>

                  {/* Summary */}
                  <div className="space-y-2 border-t pt-4 text-sm">
                    <div className="flex justify-between">
                      <span>Check-in</span>
                      <span className="font-medium">
                        {new Date().toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Check-out</span>
                      <span className="font-medium">
                        {new Date(Date.now() + 86400000).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="space-y-2 border-t pt-4">
                    {/* <p className="text-xs font-semibold text-muted-foreground">
                      Contact Property
                    </p> */}
                    {/* <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span>{property.location.address}</span>
                      </div>
                    </div> */}
                  </div>

                  {/* CTA */}
                  <Button
                    onClick={handleBookNow}
                    className="w-full mt-4"
                    size="lg"
                  >
                    Book Now
                  </Button>

                  <p className="text-[11px] text-center text-muted-foreground">
                    🔒 No hidden fees · Free cancellation
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
