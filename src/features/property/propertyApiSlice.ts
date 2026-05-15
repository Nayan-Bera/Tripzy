import { apiSlice } from "@/app/api/apiSlice";
import {
  Amenity,
  PropertySearchResponse,
  PropertyDetailResponse,
  SearchFilters,
  PropertyCard,
  PropertyDetail,
  Room,
} from "@/types/property";

/* ================= API SLICE ================= */

type PublicProperty = Record<string, any>;

const fallbackImage =
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80";

const asNumber = (value: unknown, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const toImage = (image: any, fallbackAlt: string, index = 0) => ({
  id: image?.id ?? `${fallbackAlt}-${index}`,
  url: image?.url ?? image?.imageUrl ?? image?.src ?? fallbackImage,
  alt: image?.alt ?? fallbackAlt,
  type: image?.type,
});

const getImages = (property: PublicProperty) => {
  const rawImages =
    property.images ??
    property.propertyImages ??
    property.property_images ??
    property.imageUrls ??
    [];

  const mapped = Array.isArray(rawImages)
    ? rawImages.map((image, index) =>
        typeof image === "string"
          ? { id: `${property.id}-image-${index}`, url: image, alt: property.title ?? property.name }
          : toImage(image, property.title ?? property.name ?? "Property", index)
      )
    : [];

  return mapped.length
    ? mapped
    : [{ id: `${property.id}-fallback`, url: fallbackImage, alt: property.title ?? property.name ?? "Property" }];
};

const getAmenities = (property: PublicProperty): Amenity[] => {
  const rawAmenities =
    property.amenities ??
    property.hotelAmenities ??
    property.hotel?.amenities ??
    [];

  return Array.isArray(rawAmenities)
    ? rawAmenities.map((amenity, index) => ({
        id: amenity?.id ?? amenity?.amenityId ?? `${property.id}-amenity-${index}`,
        name: amenity?.name ?? amenity?.amenity?.name ?? "Amenity",
        icon: amenity?.icon,
      }))
    : [];
};

const mapRoom = (room: any, index: number): Room => {
  const roomImages = Array.isArray(room?.images ?? room?.roomImages ?? room?.imageUrls)
    ? (room.images ?? room.roomImages ?? room.imageUrls).map((image: any, imageIndex: number) =>
        typeof image === "string"
          ? { id: `${room.id}-image-${imageIndex}`, url: image, alt: room.name ?? room.title }
          : toImage(image, room?.name ?? room?.title ?? "Room", imageIndex)
      )
    : [];

  return {
    id: room?.id ?? `room-${index}`,
    title: room?.title ?? room?.name ?? `Room ${index + 1}`,
    name: room?.name,
    description: room?.description ?? "",
    type: room?.type ?? "double",
    basePrice: asNumber(room?.basePrice ?? room?.pricePerDay ?? room?.price_per_day),
    pricePerDay: asNumber(room?.pricePerDay ?? room?.price_per_day ?? room?.basePrice),
    pricePerHour: asNumber(room?.pricePerHour ?? room?.price_per_hour),
    capacity: asNumber(room?.capacity, 2),
    beds: asNumber(room?.beds, 1),
    images: roomImages,
    amenities: getAmenities(room ?? {}),
    available: room?.available ?? true,
    availableCount: room?.availableCount,
  };
};

const mapCard = (property: PublicProperty): PropertyCard => {
  const images = getImages(property);
  const amenities = getAmenities(property);

  return {
    id: property.id,
    name: property.name ?? property.title ?? property.hotel?.name ?? "Untitled property",
    location: {
      city: property.city ?? property.location?.city ?? "",
      state: property.state ?? property.location?.state ?? "",
    },
    coverImage: images[0],
    rating: asNumber(property.averageRating ?? property.rating),
    reviewCount: asNumber(property.reviewCount),
    basePrice: asNumber(property.minPricePerDay ?? property.basePrice ?? property.pricePerDay),
    amenities,
    featured: property.featured,
    discount: property.discount,
    tag: property.hotel?.verified || property.verified ? "Verified" : undefined,
  };
};

const mapDetail = (property: PublicProperty): PropertyDetail => {
  const images = getImages(property);
  const rooms = Array.isArray(property.rooms) ? property.rooms.map(mapRoom) : [];
  const policies = Array.isArray(property.policies)
    ? property.policies[0]
    : property.policies ?? property.hotel?.policies?.[0] ?? {};

  return {
    id: property.id,
    name: property.name ?? property.title ?? "Untitled property",
    title: property.title,
    description: property.description ?? "",
    location: {
      address: property.address ?? property.location?.address ?? "",
      city: property.city ?? property.location?.city ?? "",
      state: property.state ?? property.location?.state ?? "",
      country: property.country ?? property.location?.country ?? "India",
      zip: property.zip ?? property.location?.zip,
    },
    images,
    coverImage: images[0],
    rating: asNumber(property.averageRating ?? property.rating),
    reviewCount: asNumber(property.reviewCount),
    minPricePerDay: asNumber(property.minPricePerDay ?? rooms[0]?.basePrice),
    hotel: property.hotel,
    rooms,
    amenities: getAmenities(property),
    policies: {
      checkInTime: policies?.checkInTime ?? policies?.check_in_time ?? "14:00",
      checkOutTime: policies?.checkOutTime ?? policies?.check_out_time ?? "11:00",
      cancellationPolicy:
        policies?.cancellationPolicy ??
        policies?.cancellation_policy ??
        "Free cancellation before the policy window.",
      refundPolicy:
        policies?.refundPolicy ??
        policies?.refund_policy ??
        "Refunds are processed according to the hotel policy.",
    },
    reviews: Array.isArray(property.reviews)
      ? property.reviews.map((review: any) => ({
          id: review.id,
          userId: review.userId ?? review.user?.id ?? "",
          userName: review.userName ?? review.user?.name ?? "Guest",
          rating: asNumber(review.rating),
          title: review.title ?? "",
          comment: review.comment ?? "",
          createdAt: review.createdAt ?? review.created_at ?? new Date().toISOString(),
          verified: review.verified,
        }))
      : [],
    verified: property.verified ?? property.hotel?.verified ?? false,
    featured: property.featured,
    discount: property.discount,
    createdAt: property.createdAt ?? property.created_at ?? new Date().toISOString(),
  };
};

const listFromResponse = (response: any) => {
  const data = response?.data ?? response;
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.properties)) return data.properties;
  return [];
};

export const propertyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /* ===== PUBLIC PROPERTY ENDPOINTS ===== */
    
    /**
     * Search properties by filters (city, dates, price, amenities, etc.)
     * @param filters Search criteria
     * @returns List of properties matching filters
     */
    searchProperties: builder.query<PropertySearchResponse, SearchFilters>({
      query: (filters) => {
        const params = new URLSearchParams();
        if (filters.q) params.append("q", filters.q);
        if (filters.city) params.append("city", filters.city);
        if (filters.state) params.append("state", filters.state);
        if (filters.country) params.append("country", filters.country);

        return {
          url: `/public/properties?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response: any, _meta, filters) => {
        let properties: PropertyCard[] = listFromResponse(response).map(mapCard);

        if (filters.minPrice || filters.maxPrice) {
          properties = properties.filter((property: PropertyCard) => {
            const min = filters.minPrice ?? 0;
            const max = filters.maxPrice ?? Number.MAX_SAFE_INTEGER;
            return property.basePrice >= min && property.basePrice <= max;
          });
        }

        if (filters.minRating) {
          properties = properties.filter((property: PropertyCard) => property.rating >= filters.minRating!);
        }

        if (filters.amenityIds?.length) {
          properties = properties.filter((property: PropertyCard) =>
            filters.amenityIds!.every((id) =>
              property.amenities.some((amenity: Amenity) => amenity.id === id)
            )
          );
        }

        if (filters.sortBy === "price") {
          properties = [...properties].sort((a, b) => a.basePrice - b.basePrice);
        }
        if (filters.sortBy === "rating") {
          properties = [...properties].sort((a, b) => b.rating - a.rating);
        }

        const offset = filters.offset ?? 0;
        const limit = filters.limit ?? properties.length;

        return {
          message: response?.message ?? "Properties fetched successfully",
          data: {
            properties: properties.slice(offset, offset + limit),
            total: properties.length,
            limit,
            offset,
          },
        };
      },
      providesTags: ["Hotel"],
    }),

    /**
     * Get detailed information about a single property
     * @param propertyId Property ID
     * @returns Property details with rooms, amenities, images, reviews
     */
    getPropertyDetail: builder.query<PropertyDetailResponse, string>({
      query: (propertyId) => ({
        url: `/public/properties/${propertyId}`,
        method: "GET",
      }),
      transformResponse: (response: any) => ({
        message: response?.message ?? "Property fetched successfully",
        data: mapDetail(response?.data ?? response),
      }),
      providesTags: (_result, _error, propertyId) => [
        { type: "Hotel", id: propertyId },
      ],
    }),

    /**
     * Get list of all available amenities for filtering
     * @returns List of amenities
     */
    getAllAmenities: builder.query<{ message: string; data: Amenity[] }, void>({
      query: () => ({
        url: "/admin/aminities/all",
        method: "GET",
      }),
      transformResponse: (response: any) => ({
        message: response?.message ?? "Amenities fetched successfully",
        data: response?.data ?? response ?? [],
      }),
      providesTags: ["Hotel"],
    }),

    /**
     * Check room availability for specific dates
     * @param roomId Room ID
     * @param checkInDate Check-in date (YYYY-MM-DD)
     * @param checkOutDate Check-out date (YYYY-MM-DD)
     * @returns Availability status and pricing
     */
    checkAvailability: builder.query<
      { message: string; data: { available: boolean } },
      {
        roomId: string;
        checkInDate: string;
        checkOutDate: string;
        guests: number;
      }
    >({
      queryFn: async () => ({
        data: {
          message: "Dedicated room availability search is not available yet.",
          data: { available: true },
        },
      }),
    }),

    /**
     * Get featured properties for homepage
     * @returns Featured properties
     */
    getFeaturedProperties: builder.query<
      PropertySearchResponse,
      { limit?: number }
    >({
      query: () => ({
        url: "/public/properties",
        method: "GET",
      }),
      transformResponse: (response: any, _meta, arg) => {
        const properties = listFromResponse(response).map(mapCard).slice(0, arg?.limit ?? 6);
        return {
          message: response?.message ?? "Featured properties fetched successfully",
          data: { properties, total: properties.length, limit: arg?.limit ?? 6, offset: 0 },
        };
      },
      providesTags: ["Hotel"],
    }),

    /**
     * Get popular destinations
     * @returns Popular city destinations
     */
    getPopularDestinations: builder.query<
      {
        message: string;
        data: Array<{ city: string; state: string; count: number }>;
      },
      void
    >({
      query: () => ({
        url: "/public/properties",
        method: "GET",
      }),
      transformResponse: (response: any) => {
        const counts = new Map<string, { city: string; state: string; count: number }>();
        listFromResponse(response).forEach((property: PublicProperty) => {
          const city = property.city ?? property.location?.city;
          const state = property.state ?? property.location?.state;
          if (!city || !state) return;
          const key = `${city}-${state}`;
          const current = counts.get(key) ?? { city, state, count: 0 };
          current.count += 1;
          counts.set(key, current);
        });

        return {
          message: "Popular destinations fetched successfully",
          data: Array.from(counts.values()).sort((a, b) => b.count - a.count).slice(0, 8),
        };
      },
      providesTags: ["Hotel"],
    }),

    /**
     * Get discounted properties
     * @returns Properties with active discounts
     */
    getDiscountedProperties: builder.query<
      PropertySearchResponse,
      { limit?: number }
    >({
      query: () => ({
        url: "/public/properties",
        method: "GET",
      }),
      transformResponse: (response: any, _meta, arg) => {
        const properties = listFromResponse(response)
          .map(mapCard)
          .filter((property: PropertyCard) => property.basePrice > 0)
          .slice(0, arg?.limit ?? 6)
          .map((property: PropertyCard, index: number) => ({
            ...property,
            discount: property.discount ?? [18, 14, 12, 10, 8, 6][index] ?? 8,
          }));

        return {
          message: response?.message ?? "Deals fetched successfully",
          data: { properties, total: properties.length, limit: arg?.limit ?? 6, offset: 0 },
        };
      },
      providesTags: ["Hotel"],
    }),
  }),
});

export const {
  useSearchPropertiesQuery,
  useGetPropertyDetailQuery,
  useGetAllAmenitiesQuery,
  useCheckAvailabilityQuery,
  useGetFeaturedPropertiesQuery,
  useGetPopularDestinationsQuery,
  useGetDiscountedPropertiesQuery,
  useLazySearchPropertiesQuery,
} = propertyApiSlice;
