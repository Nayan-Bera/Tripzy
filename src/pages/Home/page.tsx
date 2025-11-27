// src/pages/HomePage.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import React from "react";
import { Footer } from "./components/footer";
import { Header } from "./components/Heder";
import { HeroSection } from "./components/HeroSection";
import { HowItWorksSection } from "./components/HowItsWoek";



// ===== MOCK DATA =====


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

const hotelCategories = [
  {
    id: 1,
    label: "Luxury Stays",
    description: "5-star hotels & high-end resorts.",
    icon: "💎",
  },
  {
    id: 2,
    label: "Budget Friendly",
    description: "Best value hotels under $80/night.",
    icon: "💸",
  },
  {
    id: 3,
    label: "Beach Resorts",
    description: "Wake up to ocean views and sunshine.",
    icon: "🏖️",
  },
  {
    id: 4,
    label: "Family Hotels",
    description: "Spacious rooms and kid-friendly amenities.",
    icon: "👨‍👩‍👧‍👦",
  },
];

const deals = [
  {
    id: 1,
    title: "Early Bird 30% Off",
    description: "Book 30 days in advance and save big.",
    code: "EARLY30",
    expiry: "Valid till 31 Dec",
  },
  {
    id: 2,
    title: "Weekend Escape",
    description: "Get 20% off on Fri–Sun bookings.",
    code: "WEEKEND20",
    expiry: "Limited time",
  },
];

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



// ===== COMPONENTS =====



// Popular Destinations (cards with images + hover)
const PopularDestinationsSection: React.FC = () => {
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
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

// Categories (bento-like cards)
const CategoriesSection: React.FC = () => {
  return (
    <section className="mx-auto max-w-6xl space-y-6 px-4 py-10">
      <h2 className="text-xl font-semibold">Stay by category</h2>
      <div className="grid gap-4 md:grid-cols-4">
        {hotelCategories.map((cat) => (
          <Card
            key={cat.id}
            className="border-dashed bg-gradient-to-br from-sky-50 via-white to-teal-50"
          >
            <CardContent className="flex flex-col gap-2 p-4">
              <span className="text-2xl">{cat.icon}</span>
              <h3 className="text-sm font-semibold">{cat.label}</h3>
              <p className="text-xs text-muted-foreground">
                {cat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

// Featured Hotels (big card grid)
const FeaturedHotelsSection: React.FC = () => {
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

// Deals / Offers
const DealsSection: React.FC = () => {
  return (
    <section id="deals" className="mx-auto max-w-6xl space-y-6 px-4 py-10">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Exclusive deals</h2>
        <Button variant="ghost" size="sm">
          All offers
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {deals.map((deal) => (
          <Card
            key={deal.id}
            className="border-0 bg-gradient-to-r from-sky-500 to-teal-500 text-white"
          >
            <CardContent className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-sm font-semibold">{deal.title}</h3>
                <p className="text-xs opacity-90">{deal.description}</p>
                <p className="mt-1 text-[11px] opacity-80">{deal.expiry}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge variant="outline" className="border-white/60 text-xs">
                  Code: {deal.code}
                </Badge>
                <Button variant="secondary" size="sm">
                  Apply offer
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

// Reviews (testimonials)
const ReviewsSection: React.FC = () => {
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


// Footer


// ===== PAGE ROOT =====

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <HeroSection />
      <PopularDestinationsSection />
      <CategoriesSection />
      <FeaturedHotelsSection />
      <DealsSection />
      <ReviewsSection />
      <HowItWorksSection />
      <Footer />
    </div>
  );
};

export default HomePage;
