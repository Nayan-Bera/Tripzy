import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const featuredHotels = [
  {
    id: 1,
    name: "Oceanview Resort & Spa",
    location: "Kuta, Bali",
    price: 220,
    rating: 4.8,
    reviews: 321,
    tag: "Top pick",
    image:
      "https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress",
    amenities: ["Free Wi-Fi", "Breakfast", "Pool"],
  },
  {
    id: 2,
    name: "The Parisian Luxe Hotel",
    location: "Paris, France",
    price: 310,
    rating: 4.7,
    reviews: 189,
    tag: "Romantic",
    image:
      "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress",
    amenities: ["City View", "Restaurant", "Bar"],
  },
  {
    id: 3,
    name: "Desert Mirage Suites",
    location: "Dubai, UAE",
    price: 260,
    rating: 4.6,
    reviews: 254,
    tag: "Business friendly",
    image:
      "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress",
    amenities: ["Airport Shuttle", "Gym", "Breakfast"],
  },
];

// Featured Hotels (big card grid)
export const FeaturedHotelsSection: React.FC = () => {
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
        <Button variant="outline" size="sm">
          See all stays
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {featuredHotels.map((hotel) => (
          <Card
            key={hotel.id}
            className="overflow-hidden border-0 bg-background shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative h-40">
              <img
                src={hotel.image}
                alt={hotel.name}
                className="h-full w-full object-cover"
              />
              <Badge className="absolute left-3 top-3 bg-black/70 text-xs text-white">
                {hotel.tag}
              </Badge>
            </div>
            <CardContent className="space-y-3 p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-sm font-semibold">{hotel.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {hotel.location}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-1 text-xs font-semibold">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    {hotel.rating}
                  </div>
                  <span className="text-[10px] text-muted-foreground">
                    {hotel.reviews} reviews
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {hotel.amenities.map((a) => (
                  <Badge
                    key={a}
                    variant="outline"
                    className="rounded-full px-2 py-0.5 text-[10px]"
                  >
                    {a}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between pt-1">
                <div>
                  <span className="text-sm font-semibold">
                    ${hotel.price}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {" "}
                    / night
                  </span>
                </div>
                <Button size="sm" className="text-xs">
                  View details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

