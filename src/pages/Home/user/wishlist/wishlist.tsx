"use client";

import  { useState } from "react";
import { Heart, Trash2, MapPin } from "lucide-react";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/* ----------------------------------
   Types (API-ready)
-----------------------------------*/
type WishlistItem = {
  id: string;
  name: string;
  location: string;
  pricePerNight: number;
  image: string;
  isWishlisted: boolean;
};

/* ----------------------------------
   Fake Data (replace with API later)
-----------------------------------*/
const initialWishlist: WishlistItem[] = [
  {
    id: "1",
    name: "Ocean View Resort",
    location: "Goa, India",
    pricePerNight: 4200,
    image:
      "https://images.unsplash.com/photo-1501117716987-c8e1ecb2102b",
    isWishlisted: true,
  },
  {
    id: "2",
    name: "Mountain Escape Hotel",
    location: "Manali, India",
    pricePerNight: 3500,
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
    isWishlisted: true,
  },
];

/* ----------------------------------
   Wishlist Page
-----------------------------------*/
export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>(initialWishlist);

  /* Toggle wishlist (heart click) */
  const toggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, isWishlisted: !item.isWishlisted }
          : item
      )
    );

    // 🔗 API later:
    // await api.post(`/wishlist/toggle/${id}`)
  };

  /* Remove item completely */
  const removeFromWishlist = (id: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));

    // 🔗 API later:
    // await api.delete(`/wishlist/${id}`)
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Your Wishlist</h1>
        <p className="text-muted-foreground">
          Hotels and stays you’ve saved ❤️
        </p>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          Your wishlist is empty.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <CardHeader className="p-0 relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-48 w-full object-cover"
                />

                {/* Heart Button */}
                <button
                  onClick={() => toggleWishlist(item.id)}
                  className="absolute top-3 right-3 bg-white/90 rounded-full p-2 shadow"
                >
                  <Heart
                    className={`h-5 w-5 transition-colors ${
                      item.isWishlisted
                        ? "fill-red-500 text-red-500"
                        : "text-gray-500"
                    }`}
                  />
                </button>
              </CardHeader>

              <CardContent className="p-4 space-y-2">
                <h3 className="font-semibold text-lg">{item.name}</h3>

                <div className="flex items-center text-sm text-muted-foreground gap-1">
                  <MapPin className="h-4 w-4" />
                  {item.location}
                </div>

                <Badge variant="secondary">
                  ₹{item.pricePerNight} / night
                </Badge>
              </CardContent>

              <CardFooter className="p-4 flex justify-between">
                <Button variant="outline">View Details</Button>

                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}


