import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  MapPin,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useSearchPropertiesQuery,
  useGetAllAmenitiesQuery,
} from "@/features/property/propertyApiSlice";
import { PropertyCard } from "@/components/PropertyCard";
import { SearchFilters } from "@/types/property";

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [minRating, setMinRating] = useState(0);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"price" | "rating" | "newest" | "popularity">("popularity");
  const [offset, setOffset] = useState(0);

  // Get search params
  const city = searchParams.get("city") || "";
  const state = searchParams.get("state") || "";
  const checkInDate = searchParams.get("checkIn") || "";
  const checkOutDate = searchParams.get("checkOut") || "";
  const guests = parseInt(searchParams.get("guests") || "2", 10);

  // Build search filters
  const filters: SearchFilters = {
    city,
    state,
    checkInDate,
    checkOutDate,
    guests,
    minPrice: priceRange[0],
    maxPrice: priceRange[1],
    minRating,
    amenityIds: selectedAmenities,
    sortBy,
    limit: 12,
    offset,
  };

  // Fetch search results and amenities
  const { data: searchData, isLoading: isSearching, error: searchError } = useSearchPropertiesQuery(filters);
  const { data: amenitiesData, isLoading: isLoadingAmenities } = useGetAllAmenitiesQuery();

  const properties = searchData?.data.properties || [];
  const total = searchData?.data.total || 0;
  const amenities = amenitiesData?.data || [];

  // Handle amenity toggle
  const handleToggleAmenity = (amenityId: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenityId)
        ? prev.filter((id) => id !== amenityId)
        : [...prev, amenityId]
    );
    setOffset(0);
  };

  // Handle price range change
  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
    setOffset(0);
  };

  // Handle rating filter
  const handleRatingChange = (rating: number) => {
    setMinRating(rating);
    setOffset(0);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Search bar sticky at top */}
      <div className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-3">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center gap-2 flex-wrap">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="font-semibold">{city}</span>
            {checkInDate && checkOutDate && (
              <>
                <span className="text-sm text-muted-foreground">•</span>
                <span className="text-sm">
                  {new Date(checkInDate).toLocaleDateString()} -{" "}
                  {new Date(checkOutDate).toLocaleDateString()}
                </span>
              </>
            )}
            {guests && (
              <>
                <span className="text-sm text-muted-foreground">•</span>
                <span className="text-sm">{guests} guest(s)</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-6 md:grid-cols-4">
          {/* ===== LEFT SIDEBAR: FILTERS ===== */}
          <div className="md:col-span-1">
            <div className="sticky top-20 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Filters</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setPriceRange([0, 10000]);
                    setMinRating(0);
                    setSelectedAmenities([]);
                    setSortBy("popularity");
                    setOffset(0);
                  }}
                >
                  Clear all
                </Button>
              </div>

              {/* Price Range Filter */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold">Price per night</h4>
                <div className="space-y-3">
                  <Slider
                    value={priceRange}
                    onValueChange={handlePriceChange}
                    min={0}
                    max={10000}
                    step={100}
                    className="cursor-pointer"
                  />
                  <div className="flex gap-2 text-sm">
                    <Input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) =>
                        handlePriceChange([
                          parseInt(e.target.value) || 0,
                          priceRange[1],
                        ])
                      }
                      min={0}
                      placeholder="Min"
                      className="h-8"
                    />
                    <Input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) =>
                        handlePriceChange([
                          priceRange[0],
                          parseInt(e.target.value) || 10000,
                        ])
                      }
                      max={10000}
                      placeholder="Max"
                      className="h-8"
                    />
                  </div>
                </div>
              </div>

              {/* Rating Filter */}
              <div className="space-y-3 border-t pt-6">
                <h4 className="text-sm font-semibold">Rating</h4>
                <div className="space-y-2">
                  {[5, 4, 3].map((rating) => (
                    <label
                      key={rating}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Checkbox
                        checked={minRating === rating}
                        onCheckedChange={() => handleRatingChange(rating)}
                      />
                      <span className="text-sm">
                        {rating}+ ⭐ {rating === 5 ? "(Best)" : rating === 4 ? "(Very Good)" : "(Good)"}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Amenities Filter */}
              <div className="space-y-3 border-t pt-6">
                <h4 className="text-sm font-semibold">Amenities</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {isLoadingAmenities ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <Skeleton key={i} className="h-4 w-24" />
                    ))
                  ) : amenities.length > 0 ? (
                    amenities.map((amenity) => (
                      <label
                        key={amenity.id}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <Checkbox
                          checked={selectedAmenities.includes(amenity.id)}
                          onCheckedChange={() =>
                            handleToggleAmenity(amenity.id)
                          }
                        />
                        <span className="text-sm">{amenity.name}</span>
                      </label>
                    ))
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      No amenities available
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ===== RIGHT SECTION: RESULTS ===== */}
          <div className="md:col-span-3">
            {/* Sort bar */}
            <div className="mb-6 flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {total > 0 ? (
                  <>
                    Showing <strong>{offset + 1}-{Math.min(offset + 12, total)}</strong> of{" "}
                    <strong>{total}</strong> results
                  </>
                ) : (
                  "No results found"
                )}
              </div>

              <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Popularity</SelectItem>
                  <SelectItem value="price">Price: Low to High</SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Results Grid */}
            {isSearching ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="overflow-hidden border-0 bg-background">
                    <Skeleton className="h-40 w-full" />
                    <CardContent className="space-y-3 p-4">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                      <Skeleton className="h-8 w-full" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : searchError ? (
              <div className="py-12 text-center">
                <p className="text-muted-foreground">
                  Error loading properties. Please try again.
                </p>
              </div>
            ) : properties.length > 0 ? (
              <>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {properties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      variant="search"
                    />
                  ))}
                </div>

                {/* Pagination */}
                {total > offset + 12 && (
                  <div className="mt-8 flex justify-center">
                    <Button
                      onClick={() => setOffset(offset + 12)}
                      variant="outline"
                    >
                      Load more
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="py-12 text-center">
                <Search className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                <h3 className="font-semibold">No properties found</h3>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your filters or search criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
