import React from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetDiscountedPropertiesQuery } from "@/features/property/propertyApiSlice";

// Deals / Offers - Display discounted properties
export const DealsSection: React.FC = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetDiscountedPropertiesQuery({ limit: 6 });

  if (error) {
    return (
      <section id="deals" className="mx-auto max-w-6xl space-y-6 px-4 py-10">
        <div className="text-center py-10">
          <p className="text-sm text-muted-foreground">
            Failed to load deals. Please try again later.
          </p>
        </div>
      </section>
    );
  }

  const deals = data?.data.properties || [];

  return (
    <section id="deals" className="mx-auto max-w-6xl space-y-6 px-4 py-10">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Exclusive deals</h2>
        <Button variant="ghost" size="sm" onClick={() => navigate("/search")}>
          All offers
        </Button>
      </div>

      {isLoading ? (
        // Skeleton loader
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <Card key={i} className="border-0 bg-muted/40">
              <CardContent className="p-4">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-3" />
                <Skeleton className="h-10 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : deals.length > 0 ? (
        // Render discounted properties as deals
        <div className="grid gap-4 md:grid-cols-2">
          {deals.map((deal) => (
            <Card
              key={deal.id}
              className="border-0 bg-linear-to-r from-orange-500 to-red-500 text-white cursor-pointer transition hover:shadow-lg"
              onClick={() => navigate(`/property/${deal.id}`)}
            >
              <CardContent className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-sm font-semibold">{deal.name}</h3>
                  <p className="text-xs opacity-90 line-clamp-2">
                    {deal.location.city}, {deal.location.state}
                  </p>
                  <p className="mt-1 text-[11px] opacity-80">
                    Limited time offer
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  {deal.discount && (
                    <Badge variant="outline" className="border-white/60 text-xs bg-white/20">
                      Save {deal.discount}%
                    </Badge>
                  )}
                  <div>
                    <div className="text-sm font-semibold">
                      ₹{Math.round(deal.basePrice * (1 - (deal.discount || 0) / 100))}
                    </div>
                    <div className="text-xs opacity-75 line-through">
                      ₹{deal.basePrice}
                    </div>
                  </div>
                  <Button variant="secondary" size="sm">
                    Book now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        // No deals available
        <div className="text-center py-10">
          <p className="text-sm text-muted-foreground">
            No special deals available right now. Check back soon!
          </p>
        </div>
      )}
    </section>
  );
};
