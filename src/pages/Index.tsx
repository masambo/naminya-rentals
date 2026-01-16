import AppLayout from "@/components/layout/AppLayout";
import Header from "@/components/home/Header";
import AccommodationTypes from "@/components/home/AccommodationTypes";
import FeaturedAgents from "@/components/home/FeaturedAgents";
import PropertyCard from "@/components/home/PropertyCard";
import { ChevronRight, Navigation } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";

const featuredListings = [
  {
    id: "1",
    title: "Modern 2BR Apartment",
    location: "Kleine Kuppe, Windhoek",
    price: 12500,
    image: property1,
    bedrooms: 2,
    bathrooms: 1,
    size: 75,
    type: "apartment" as const,
    isNew: true,
    rentalType: "long-term" as const,
  },
  {
    id: "2",
    title: "Cozy Student Room",
    location: "Pioneerspark, Windhoek",
    price: 3500,
    image: property2,
    bedrooms: 1,
    bathrooms: 1,
    size: 18,
    type: "room" as const,
    isNew: false,
    rentalType: "long-term" as const,
  },
  {
    id: "5",
    title: "Luxury Guest House",
    location: "Kleine Kuppe, Windhoek",
    price: 2500,
    image: property1,
    bedrooms: 3,
    bathrooms: 2,
    size: 120,
    type: "guesthouse" as const,
    isNew: true,
    rentalType: "short-term" as const,
    pricingModel: {
      daily: 2500,
      weekly: 15000,
    },
  },
  {
    id: "3",
    title: "Spacious Family House",
    location: "Olympia, Windhoek",
    price: 25000,
    image: property3,
    bedrooms: 4,
    bathrooms: 2,
    size: 180,
    type: "house" as const,
    isNew: true,
    rentalType: "long-term" as const,
  },
];

const Index = () => {
  return (
    <AppLayout>
      <div className="md:hidden">
        <Header />
      </div>
      
      {/* Accommodation Types */}
      <AccommodationTypes />
      
      {/* Nearby Scan CTA */}
      <div className="px-4 py-3 md:px-0 md:py-6">
        <Link to="/nearby">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-4 md:p-6 border border-primary/20 flex items-center gap-3 hover:shadow-card transition-all">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
              <Navigation className="w-6 h-6 md:w-8 md:h-8 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground text-sm md:text-lg">Scan Nearby</h3>
              <p className="text-xs md:text-sm text-muted-foreground">
                Find properties near your location
              </p>
            </div>
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-muted-foreground" />
          </div>
        </Link>
      </div>

      <FeaturedAgents />

      <section className="px-4 py-4 md:px-0 md:py-8">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground">Featured Listings</h2>
          <Link
            to="/search"
            className="flex items-center gap-1.5 text-base md:text-lg font-medium text-primary hover:text-primary/80 transition-colors"
          >
            View all
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {featuredListings.map((listing, index) => (
            <div
              key={listing.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <PropertyCard {...listing} />
            </div>
          ))}
        </div>
      </section>

      <div className="h-8" />
    </AppLayout>
  );
};

export default Index;
