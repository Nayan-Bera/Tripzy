import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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

// Deals / Offers
export const DealsSection: React.FC = () => {
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
            className="border-0 bg-linear-to-r from-sky-500 to-teal-500 text-white"
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
