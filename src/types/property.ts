/* ================= PROPERTY TYPES ================= */

export type Amenity = {
  id: string;
  name: string;
  icon?: string;
};

export type RoomImage = {
  id: string;
  url: string;
  alt?: string;
};

export type Room = {
  id: string;
  title: string;
  name?: string;
  description?: string;
  type: "single" | "double" | "suite" | "deluxe" | "premium";
  basePrice: number;
  pricePerDay?: number;
  pricePerHour?: number;
  capacity: number;
  beds: number;
  images: RoomImage[];
  amenities: Amenity[];
  available: boolean;
  availableCount?: number;
};

export type PropertyImage = {
  id: string;
  url: string;
  alt?: string;
  type?: "cover" | "gallery" | "room" | "amenity";
};

export type Policy = {
  checkInTime: string;
  checkOutTime: string;
  cancellationPolicy: string;
  refundPolicy: string;
  minStay?: number;
  maxStay?: number;
};

export type PropertyLocation = {
  address: string;
  city: string;
  state: string;
  country: string;
  zip?: string;
  latitude?: number;
  longitude?: number;
};

export type Review = {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  createdAt: string;
  verified?: boolean;
  helpful?: number;
};

export type PropertyDetail = {
  id: string;
  name: string;
  title?: string;
  description: string;
  location: PropertyLocation;
  images: PropertyImage[];
  coverImage: PropertyImage;
  rating: number;
  reviewCount: number;
  minPricePerDay?: number;
  hotel?: {
    id: string;
    name: string;
    contact?: string;
    verified?: boolean;
    status?: string;
  };
  rooms: Room[];
  amenities: Amenity[];
  policies: Policy;
  reviews: Review[];
  verified: boolean;
  featured?: boolean;
  discount?: number;
  tags?: string[];
  createdAt: string;
};

export type PropertyCard = {
  id: string;
  name: string;
  location: {
    city: string;
    state: string;
  };
  coverImage: PropertyImage;
  rating: number;
  reviewCount: number;
  basePrice: number;
  amenities: Amenity[];
  featured?: boolean;
  discount?: number;
  tag?: string;
};

export type SearchFilters = {
  q?: string;
  city?: string;
  state?: string;
  country?: string;
  checkInDate?: string;
  checkOutDate?: string;
  guests?: number;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  amenityIds?: string[];
  roomType?: string;
  sortBy?: "price" | "rating" | "newest" | "popularity";
  limit?: number;
  offset?: number;
};

export type PropertySearchResult = {
  properties: PropertyCard[];
  total: number;
  limit: number;
  offset: number;
};

export type PropertySearchResponse = {
  message: string;
  data: PropertySearchResult;
};

export type PropertyDetailResponse = {
  message: string;
  data: PropertyDetail;
};

export type AmenitiesResponse = {
  message: string;
  data: Amenity[];
};

export type AvailabilityCheck = {
  roomId: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  available: boolean;
  price: number;
};
