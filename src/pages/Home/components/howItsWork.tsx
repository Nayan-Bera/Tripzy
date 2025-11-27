import { Card, CardContent } from "@/components/ui/card";

const howItWorksSteps = [
  {
    id: 1,
    title: "Search",
    description: "Enter your destination, dates, and guests.",
  },
  {
    id: 2,
    title: "Compare",
    description: "Filter by price, rating, and amenities.",
  },
  {
    id: 3,
    title: "Book",
    description: "Securely pay and get instant confirmation.",
  },
  {
    id: 4,
    title: "Enjoy",
    description: "Check in and enjoy your stay.",
  },
];
// How it works
export const HowItWorksSection: React.FC = () => {
  return (
    <section
      id="support"
      className="mx-auto max-w-6xl space-y-6 px-4 py-10 pb-16"
    >
      <h2 className="text-xl font-semibold">How booking works</h2>
      <div className="grid gap-4 md:grid-cols-4">
        {howItWorksSteps.map((step) => (
          <Card
            key={step.id}
            className="border-0 bg-background shadow-sm md:shadow-none"
          >
            <CardContent className="space-y-2 p-4">
              <div className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-sky-100 text-xs font-semibold text-sky-700">
                {step.id}
              </div>
              <h3 className="text-sm font-semibold">{step.title}</h3>
              <p className="text-xs text-muted-foreground">
                {step.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
