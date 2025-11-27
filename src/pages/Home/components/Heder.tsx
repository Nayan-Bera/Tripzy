// Header (shadcn + tailwind, inspired by Aceternity minimal nav)

import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Hotels", href: "#hotels" },
  { label: "Destinations", href: "#destinations" },
  { label: "Deals", href: "#deals" },
  { label: "Support", href: "#support" },
];

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-linear-to-tr from-sky-500 to-teal-400 text-lg font-bold text-white">
            HB
          </span>
          <span className="text-lg font-semibold tracking-tight">
            HotelBooker
          </span>
        </div>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-muted-foreground transition hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Become a Host
          </Button>
          <Button size="sm">Sign In</Button>
        </div>
      </div>
    </header>
  );
};