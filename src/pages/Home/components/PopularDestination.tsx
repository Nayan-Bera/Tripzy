import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetPopularDestinationsQuery } from "@/features/property/propertyApiSlice";

// Popular Destinations (cards with images + hover)
export const PopularDestinationsSection: React.FC = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetPopularDestinationsQuery();

  if (error) {
    return (
      <section
        id="destinations"
        className="mx-auto max-w-6xl space-y-6 px-4 py-10"
      >
        <div className="text-center py-10">
          <p className="text-sm text-muted-foreground">
            Failed to load popular destinations. Please try again later.
          </p>
        </div>
      </section>
    );
  }

  const destinations = data?.data || [];

  const handleExplore = (city: string, state: string) => {
    navigate(`/search?city=${encodeURIComponent(city)}&state=${encodeURIComponent(state)}`);
  };

  const destinationImages: Record<string, string> = {
    goa: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
    bengaluru: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80",
    udaipur: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
    manali: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
    kolkata: "https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=800&q=80",
  };

  return (
    <section
      id="destinations"
      className="mx-auto max-w-6xl space-y-6 px-4 py-10"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Popular destinations</h2>
          <p className="text-sm text-muted-foreground">
            Explore the most booked places this week.
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => navigate("/search")}>
          View all
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        {isLoading
          ? // Skeleton loader
            Array.from({ length: 4 }).map((_, i) => (
              <Card
                key={i}
                className="overflow-hidden border-0 bg-muted/40"
              >
                <Skeleton className="h-32 w-full" />
                <CardContent className="space-y-1 p-3">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </CardContent>
              </Card>
            ))
          : // Render destinations
            destinations.map((dest) => (
              <Card
                key={`${dest.city}-${dest.state}`}
                className="group overflow-hidden border bg-background transition hover:-translate-y-1 hover:shadow-lg cursor-pointer"
                onClick={() => handleExplore(dest.city, dest.state)}
              >
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={
                      destinationImages[dest.city.toLowerCase()] ??
                      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=80"
                    }
                    alt={`${dest.city}, ${dest.state}`}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
                </div>
                <CardContent className="space-y-1 p-3">
                  <h3 className="text-sm font-semibold">
                    {dest.city}, {dest.state}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {dest.count} properties
                  </p>
                </CardContent>
              </Card>
            ))}
      </div>
    </section>
  );
};
