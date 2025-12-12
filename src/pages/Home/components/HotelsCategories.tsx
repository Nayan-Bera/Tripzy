import { Card, CardContent } from "@/components/ui/card";

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

export const CategoriesSection: React.FC = () => {
  return (
    <section className="mx-auto max-w-6xl space-y-6 px-4 py-10">
      <h2 className="text-xl font-semibold">Stay by category</h2>
      <div className="grid gap-4 md:grid-cols-4">
        {hotelCategories.map((cat) => (
          <Card
            key={cat.id}
            className="border-dashed bg-linear-to-br from-sky-50 via-white to-teal-50"
          >
            <CardContent className="flex flex-col gap-2 p-4">
              <span className="text-2xl">{cat.icon}</span>
              <h3 className="text-sm font-semibold">{cat.label}</h3>
              <p className="text-xs text-muted-foreground">{cat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
