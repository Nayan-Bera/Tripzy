import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetFeaturedPropertiesQuery } from "@/features/property/propertyApiSlice";
import { PropertyCard } from "@/components/PropertyCard";

// Featured Hotels (big card grid)
export const FeaturedHotelsSection: React.FC = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetFeaturedPropertiesQuery({ limit: 6 });

  if (error) {
    return (
      <section
        id="hotels"
        className="mx-auto max-w-6xl space-y-6 px-4 py-10 bg-muted/40 rounded-3xl my-6"
      >
        <div className="text-center py-10">
          <p className="text-sm text-muted-foreground">
            Failed to load featured hotels. Please try again later.
          </p>
        </div>
      </section>
    );
  }

  const hotels = data?.data.properties || [];

  return (
    <section
      id="hotels"
      className="mx-auto max-w-6xl space-y-6 px-4 py-10 bg-muted/40 rounded-3xl my-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Featured hotels</h2>
          <p className="text-sm text-muted-foreground">
            Handpicked stays loved by our guests.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => navigate("/search")}>
          See all stays
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {isLoading
          ? // Skeleton loader
            Array.from({ length: 3 }).map((_, i) => (
              <Card
                key={i}
                className="overflow-hidden border-0 bg-background shadow-sm"
              >
                <Skeleton className="h-40 w-full" />
                <CardContent className="space-y-3 p-4">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                  <div className="flex gap-1">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                  <Skeleton className="h-8 w-full" />
                </CardContent>
              </Card>
            ))
          : // Render featured properties
            hotels.map((hotel) => (
              <PropertyCard key={hotel.id} property={hotel} variant="featured" />
            ))}
      </div>
    </section>
  );
};
