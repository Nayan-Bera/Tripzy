import { Badge } from "@/components/ui/badge";
import { Searchsection } from "./Search";

// Hero + Search (Aceternity-style subtle spotlight + floating card)
export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden border-b bg-linear-to-b from-sky-50 via-white to-white">
      {/* background grid / glow feel */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,#0ea5e966,transparent_60%)] opacity-40" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-16 pt-12 md:flex-row md:items-center">
        <div className="max-w-xl space-y-5">
          <Badge variant="outline" className="rounded-full px-3 py-1">
            ✨ New: Smart price alerts
          </Badge>
          <h1 className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
            Instantly book{" "}
            <span className="bg-linear-to-r from-orange-500 to-teal-500 bg-clip-text text-transparent">
              hotels you love
            </span>
            , at prices you&apos;ll love more.
          </h1>
          <p className="text-sm text-muted-foreground md:text-base">
            Discover verified stays, transparent prices, and flexible
            cancellations in one modern booking experience.
          </p>
        </div>
        <Searchsection />
      </div>
    </section>
  );
};
