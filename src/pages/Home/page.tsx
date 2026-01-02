import React from "react";
import { DealsSection } from "./components/Deals";
import { FeaturedHotelsSection } from "./components/FeaturedHotels";
import { HeroSection } from "./components/HeroSection";
import { CategoriesSection } from "./components/HotelsCategories";
import { HowItWorksSection } from "./components/HowItsWoek";
import { PopularDestinationsSection } from "./components/PopularDestination";
import { ReviewsSection } from "./components/Review";


const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <PopularDestinationsSection />
      <CategoriesSection />
      <FeaturedHotelsSection />
      <DealsSection />
      <ReviewsSection />
      <HowItWorksSection />

    </div>
  );
};

export default HomePage;
