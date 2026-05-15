import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarDays, MapPin, Search, Users } from "lucide-react";
import { toast } from "sonner";

export const Searchsection: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    city: "",
    checkIn: "",
    checkOut: "",
    guests: "2",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.city.trim()) {
      toast.error("Enter a destination to start searching.");
      return;
    }

    const params = new URLSearchParams();
    params.set("q", formData.city.trim());
    params.set("city", formData.city.trim());
    if (formData.checkIn) params.set("checkIn", formData.checkIn);
    if (formData.checkOut) params.set("checkOut", formData.checkOut);
    params.set("guests", formData.guests);

    navigate(`/search?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="w-full max-w-5xl rounded-lg border bg-white p-2 shadow-xl"
    >
      <div className="grid gap-2 md:grid-cols-[1.4fr_1fr_1fr_.8fr_auto]">
        <label className="flex min-h-16 items-center gap-3 rounded-md border px-3">
          <MapPin className="h-5 w-5 text-muted-foreground" />
          <span className="flex-1 space-y-1">
            <span className="block text-[11px] font-medium uppercase text-muted-foreground">
              Destination
            </span>
            <Input
              placeholder="Goa, Bengaluru, Udaipur..."
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="h-7 border-0 px-0 shadow-none focus-visible:ring-0"
            />
          </span>
        </label>

        <label className="flex min-h-16 items-center gap-3 rounded-md border px-3">
          <CalendarDays className="h-5 w-5 text-muted-foreground" />
          <span className="flex-1 space-y-1">
            <span className="block text-[11px] font-medium uppercase text-muted-foreground">
              Check-in
            </span>
            <Input
              type="date"
              name="checkIn"
              value={formData.checkIn}
              onChange={handleInputChange}
              className="h-7 border-0 px-0 shadow-none focus-visible:ring-0"
            />
          </span>
        </label>

        <label className="flex min-h-16 items-center gap-3 rounded-md border px-3">
          <CalendarDays className="h-5 w-5 text-muted-foreground" />
          <span className="flex-1 space-y-1">
            <span className="block text-[11px] font-medium uppercase text-muted-foreground">
              Check-out
            </span>
            <Input
              type="date"
              name="checkOut"
              value={formData.checkOut}
              onChange={handleInputChange}
              className="h-7 border-0 px-0 shadow-none focus-visible:ring-0"
            />
          </span>
        </label>

        <label className="flex min-h-16 items-center gap-3 rounded-md border px-3">
          <Users className="h-5 w-5 text-muted-foreground" />
          <span className="flex-1 space-y-1">
            <span className="block text-[11px] font-medium uppercase text-muted-foreground">
              Guests
            </span>
            <Input
              type="number"
              name="guests"
              value={formData.guests}
              onChange={handleInputChange}
              min="1"
              max="10"
              className="h-7 border-0 px-0 shadow-none focus-visible:ring-0"
            />
          </span>
        </label>

        <Button type="submit" className="min-h-16 rounded-md px-6" size="lg">
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
      </div>
    </form>
  );
};
