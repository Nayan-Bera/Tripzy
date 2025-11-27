import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";


const reviews = [
  {
    id: 1,
    name: "Alex Johnson",
    avatar:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress",
    text: "Booking was seamless and the hotel was exactly as shown. Loved the experience!",
    rating: 5,
    stay: "Oceanview Resort, Bali",
  },
  {
    id: 2,
    name: "Priya Mehta",
    avatar:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress",
    text: "Great filters and very transparent pricing. Found the perfect family stay.",
    rating: 4,
    stay: "Family Suites, Paris",
  },
];

// Reviews (testimonials)
export const ReviewsSection: React.FC = () => {
  return (
    <section className="mx-auto max-w-6xl space-y-6 px-4 py-10">
      <h2 className="text-xl font-semibold">Loved by travelers</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {reviews.map((review) => (
          <Card key={review.id} className="border-0 bg-muted/40">
            <CardContent className="space-y-3 p-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={review.avatar} />
                  <AvatarFallback>
                    {review.name[0]}
                    {review.name.split(" ")[1]?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold">{review.name}</p>
                  <p className="text-[11px] text-muted-foreground">
                    Stayed at {review.stay}
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{review.text}</p>
              <div className="flex items-center gap-1 text-xs">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-3 w-3 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
