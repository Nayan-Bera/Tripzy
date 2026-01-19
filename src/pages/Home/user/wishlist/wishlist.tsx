"use client";

import { ReactNode, useState } from "react";
import {
  Heart,
  Trash2,
  MapPin,
  Star,
  BedDouble,
  Users,
  Wifi,
  Coffee,
  ParkingCircle,
  Waves,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/* ----------------------------------
   Types (API-ready)
-----------------------------------*/
type Amenity =
  | "wifi"
  | "breakfast"
  | "pool"
  | "parking";

type WishlistItem = {
  id: string;
  name: string;
  location: string;
  pricePerNight: number;
  image: string;
  isWishlisted: boolean;

  rating: number;
  rooms: number;
  maxGuests: number;
  amenities: Amenity[];
};

/* ----------------------------------
   Fake Data
-----------------------------------*/
const initialWishlist: WishlistItem[] = [
  {
    id: "1",
    name: "Mountain Escape Hotel",
    location: "Manali, India",
    pricePerNight: 3500,
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
    isWishlisted: true,
    rating: 4.4,
    rooms: 1,
    maxGuests: 2,
    amenities: ["wifi", "breakfast", "pool"],
  },
  {
    id: "2",
    name: "Ocean View Resort",
    location: "Goa, India",
    pricePerNight: 4200,
    image:
      "https://images.unsplash.com/photo-1501117716987-c8e1ecb2102b",
    isWishlisted: true,
    rating: 4.6,
    rooms: 2,
    maxGuests: 4,
    amenities: ["wifi", "pool", "parking"],
  },
  {
    id: "3",
    name: "Royal Heritage Palace",
    location: "Jaipur, India",
    pricePerNight: 5200,
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
    isWishlisted: true,
    rating: 4.8,
    rooms: 3,
    maxGuests: 6,
    amenities: ["wifi", "breakfast", "parking"],
  },
  {
    id: "4",
    name: "Lakeside Retreat",
    location: "Udaipur, India",
    pricePerNight: 4800,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    isWishlisted: true,
    rating: 4.5,
    rooms: 2,
    maxGuests: 4,
    amenities: ["wifi", "breakfast", "pool"],
  },
  {
    id: "5",
    name: "City Lights Boutique Hotel",
    location: "Mumbai, India",
    pricePerNight: 6100,
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
    isWishlisted: true,
    rating: 4.3,
    rooms: 1,
    maxGuests: 2,
    amenities: ["wifi", "parking"],
  },
  {
    id: "6",
    name: "Serene Valley Stay",
    location: "Coorg, India",
    pricePerNight: 3900,
    image:
      "https://images.unsplash.com/photo-1502673530728-f79b4cab31b1",
    isWishlisted: true,
    rating: 4.7,
    rooms: 2,
    maxGuests: 4,
    amenities: ["wifi", "breakfast"],
  },
  {
    id: "7",
    name: "Snow Peak Lodge",
    location: "Gulmarg, India",
    pricePerNight: 4500,
    image:
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd",
    isWishlisted: true,
    rating: 4.6,
    rooms: 1,
    maxGuests: 3,
    amenities: ["wifi", "breakfast", "parking"],
  },
  {
    id: "8",
    name: "Palm Breeze Resort",
    location: "Kovalam, India",
    pricePerNight: 4300,
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
    isWishlisted: true,
    rating: 4.5,
    rooms: 2,
    maxGuests: 4,
    amenities: ["wifi", "pool", "breakfast"],
  },
];

/* ----------------------------------
   Amenity Icon Map
-----------------------------------*/
const amenityMap: Record<
  Amenity,
  { label: string; icon: ReactNode  }
> = {
  wifi: {
    label: "Free Wi-Fi",
    icon: <Wifi className="h-4 w-4" />,
  },
  breakfast: {
    label: "Breakfast",
    icon: <Coffee className="h-4 w-4" />,
  },
  pool: {
    label: "Pool",
    icon: <Waves className="h-4 w-4" />,
  },
  parking: {
    label: "Parking",
    icon: <ParkingCircle className="h-4 w-4" />,
  },
};

export default function WishlistPage() {
  const [wishlist, setWishlist] =
    useState<WishlistItem[]>(initialWishlist);

  const toggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.map((i) =>
        i.id === id
          ? { ...i, isWishlisted: !i.isWishlisted }
          : i
      )
    );
  };

  const removeFromWishlist = (id: string) => {
    setWishlist((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {wishlist.map((item) => (
          <Card
            key={item.id}
            className="overflow-hidden rounded-2xl border shadow-sm"
          >
            {/* Image */}
            <CardHeader className="relative p-0">
              <img
                src={item.image}
                alt={item.name}
                className="h-52 w-full object-cover"
              />

              <button
                onClick={() => toggleWishlist(item.id)}
                className="absolute right-3 top-3 rounded-full bg-white p-2 shadow"
              >
                <Heart className="h-5 w-5 fill-red-500 text-red-500" />
              </button>
            </CardHeader>

            {/* Content */}
            <CardContent className="space-y-3 p-4">
              <h3 className="text-lg font-semibold">
                {item.name}
              </h3>

              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {item.location}
              </div>

              <Badge variant="secondary">
                ₹{item.pricePerNight} / night
              </Badge>

              {/* Amenities */}
              <div className="flex flex-wrap gap-3 pt-1 text-xs text-muted-foreground">
                {item.amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="flex items-center gap-1"
                  >
                    {amenityMap[amenity].icon}
                    {amenityMap[amenity].label}
                  </span>
                ))}
              </div>
            </CardContent>

            {/* Footer */}
            <CardFooter className="flex items-center justify-between p-4 pt-2">
              <Button variant="outline" size="sm">
                View Details
              </Button>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="font-medium">
                    {item.rating}
                  </span>
                </span>

                <span className="flex items-center gap-1">
                  <BedDouble className="h-4 w-4 text-indigo-500" />
                  {item.rooms}
                </span>

                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-purple-500" />
                  {item.maxGuests}
                </span>

                <button
                  onClick={() =>
                    removeFromWishlist(item.id)
                  }
                  className="rounded-md p-1 text-red-500 transition hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
