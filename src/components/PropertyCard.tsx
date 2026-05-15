import React from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Star } from "lucide-react";
import { PropertyCard as PropertyCardType } from "@/types/property";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/features/wishlist/wishlistApislice";

interface PropertyCardProps {
  property: PropertyCardType;
  variant?: "featured" | "search" | "compact";
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  variant = "featured",
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const wishlist = useAppSelector((state) => state.wishlist.items);
  const isInWishlist = wishlist.some((item) => item.id === property.id);

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInWishlist) {
      dispatch(removeFromWishlist(property.id));
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

  const handleViewDetails = () => {
    navigate(`/property/${property.id}`);
  };

  if (variant === "compact") {
    return (
      <Card className="overflow-hidden border-0 bg-background shadow-sm transition hover:-translate-y-1 hover:shadow-lg cursor-pointer">
        <div
          className="relative h-32"
          onClick={handleViewDetails}
        >
          <img
            src={property.coverImage.url}
            alt={property.name}
            className="h-full w-full object-cover"
          />
          {property.discount && (
            <Badge className="absolute left-3 top-3 bg-red-600 text-xs text-white">
              -{property.discount}% OFF
            </Badge>
          )}
          <button
            onClick={handleToggleWishlist}
            className="absolute right-2 top-2 rounded-full bg-white/80 p-1.5 hover:bg-white"
          >
            <Heart
              className={`h-4 w-4 ${
                isInWishlist
                  ? "fill-red-500 text-red-500"
                  : "text-gray-600"
              }`}
            />
          </button>
        </div>
        <CardContent className="space-y-2 p-3">
          <h3 className="line-clamp-1 text-sm font-semibold">{property.name}</h3>
          <p className="line-clamp-1 text-xs text-muted-foreground">
            {property.location.city}, {property.location.state}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs font-semibold">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              {property.rating}
              <span className="text-muted-foreground">
                ({property.reviewCount})
              </span>
            </div>
            <span className="text-sm font-semibold">₹{property.basePrice}</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      onClick={handleViewDetails}
      className="overflow-hidden border-0 bg-background shadow-sm transition hover:-translate-y-1 hover:shadow-lg cursor-pointer"
    >
      <div className="relative h-40">
        <img
          src={property.coverImage.url}
          alt={property.name}
          className="h-full w-full object-cover"
        />
        {property.tag && (
          <Badge className="absolute left-3 top-3 bg-black/70 text-xs text-white">
            {property.tag}
          </Badge>
        )}
        {property.discount && (
          <Badge className="absolute right-3 top-3 bg-red-600 text-xs text-white">
            -{property.discount}% OFF
          </Badge>
        )}
        <button
          onClick={handleToggleWishlist}
          className="absolute right-2 bottom-2 rounded-full bg-white/80 p-2 hover:bg-white"
        >
          <Heart
            className={`h-5 w-5 ${
              isInWishlist ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </button>
      </div>
      <CardContent className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="line-clamp-1 text-sm font-semibold">
              {property.name}
            </h3>
            <p className="line-clamp-1 text-xs text-muted-foreground">
              {property.location.city}, {property.location.state}
            </p>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 text-xs font-semibold">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              {property.rating}
            </div>
            <span className="text-[10px] text-muted-foreground">
              {property.reviewCount} reviews
            </span>
          </div>
        </div>

        {property.amenities.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {property.amenities.slice(0, 3).map((amenity) => (
              <Badge
                key={amenity.id}
                variant="outline"
                className="rounded-full px-2 py-0.5 text-[10px]"
              >
                {amenity.name}
              </Badge>
            ))}
            {property.amenities.length > 3 && (
              <Badge
                variant="outline"
                className="rounded-full px-2 py-0.5 text-[10px]"
              >
                +{property.amenities.length - 3}
              </Badge>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-1">
          <div>
            <span className="text-sm font-semibold">₹{property.basePrice}</span>
            <span className="text-xs text-muted-foreground"> / night</span>
          </div>
          <Button size="sm" className="text-xs">
            View details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
