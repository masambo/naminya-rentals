import AppLayout from "@/components/layout/AppLayout";
import Header from "@/components/home/Header";
import SearchBar from "@/components/home/SearchBar";
import CategoryTabs from "@/components/home/CategoryTabs";
import FeaturedAgents from "@/components/home/FeaturedAgents";
import PropertyCard from "@/components/home/PropertyCard";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

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
  },
  {
    id: "4",
    title: "Bachelor Flat",
    location: "Eros, Windhoek",
    price: 5500,
    image: property4,
    bedrooms: 1,
    bathrooms: 1,
    size: 35,
    type: "apartment" as const,
    isNew: false,
  },
];

const Index = () => {
  return (
    <AppLayout>
      <Header />
      <SearchBar />
      <CategoryTabs />
      <FeaturedAgents />

      <section className="px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground">Featured Listings</h2>
          <Link
            to="/search"
            className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            View all
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4">
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
