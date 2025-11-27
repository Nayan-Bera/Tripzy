import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";


const popularDestinations = [
  {
    id: 1,
    name: "Bali, Indonesia",
    subtitle: "324 stays",
    image:
      "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress",
  },
  {
    id: 2,
    name: "Paris, France",
    subtitle: "210 stays",
    image:
      "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress",
  },
  {
    id: 3,
    name: "Dubai, UAE",
    subtitle: "187 stays",
    image:
      "https://images.pexels.com/photos/325193/pexels-photo-325193.jpeg?auto=compress",
  },
  {
    id: 4,
    name: "Maldives",
    subtitle: "98 stays",
    image:
      "https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg?auto=compress",
  },
];
// Popular Destinations (cards with images + hover)
export const PopularDestinationsSection: React.FC = () => {
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
        <Button variant="ghost" size="sm">
          View all
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        {popularDestinations.map((dest) => (
          <Card
            key={dest.id}
            className="group overflow-hidden border-0 bg-muted/40 transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative h-32 overflow-hidden">
              <img
                src={dest.image}
                alt={dest.name}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
            </div>
            <CardContent className="space-y-1 p-3">
              <h3 className="text-sm font-semibold">{dest.name}</h3>
              <p className="text-xs text-muted-foreground">{dest.subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
