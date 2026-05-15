import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/Images/global/background.jpg";
import { Searchsection } from "./Search";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden border-b">
      <img
        src={heroImage}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/55" />
      <div className="relative mx-auto flex min-h-[620px] max-w-6xl flex-col justify-end gap-8 px-4 pb-10 pt-20">
        <div className="max-w-2xl space-y-5 text-white">
          <Badge variant="secondary" className="rounded-full px-3 py-1">
            Verified stays across India
          </Badge>
          <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
            Tripzy
          </h1>
          <p className="max-w-xl text-sm text-white/85 md:text-base">
            Discover verified stays, transparent prices, and flexible
            cancellations in one modern booking experience.
          </p>
        </div>
        <Searchsection />
      </div>
    </section>
  );
};
