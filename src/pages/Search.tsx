import AppLayout from "@/components/layout/AppLayout";
import { Search as SearchIcon, SlidersHorizontal, MapPin, Bed, Bath } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";

const filters = [
  { id: "price", label: "Price" },
  { id: "beds", label: "Beds" },
  { id: "type", label: "Type" },
  { id: "verified", label: "Verified Only" },
];

const allListings = [
  {
    id: "1",
    title: "Modern 2BR Apartment",
    location: "Kleine Kuppe",
    price: 12500,
    image: property1,
    bedrooms: 2,
    bathrooms: 1,
  },
  {
    id: "2",
    title: "Cozy Student Room",
    location: "Pioneerspark",
    price: 3500,
    image: property2,
    bedrooms: 1,
    bathrooms: 1,
  },
  {
    id: "3",
    title: "Spacious Family House",
    location: "Olympia",
    price: 25000,
    image: property3,
    bedrooms: 4,
    bathrooms: 2,
  },
  {
    id: "4",
    title: "Bachelor Flat",
    location: "Eros",
    price: 5500,
    image: property4,
    bedrooms: 1,
    bathrooms: 1,
  },
];

const Search = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const toggleFilter = (id: string) => {
    setActiveFilters((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  return (
    <AppLayout>
      <div className="px-4 pt-4 pb-2">
        <h1 className="text-2xl font-bold text-foreground mb-4">Find Your Space</h1>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3 shadow-card">
            <SearchIcon className="w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Location, property name..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <Button variant="secondary" size="iconLg">
            <SlidersHorizontal className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => toggleFilter(filter.id)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                activeFilters.includes(filter.id)
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground"
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 py-4">
        <p className="text-sm text-muted-foreground mb-4">
          {allListings.length} properties found
        </p>

        <div className="space-y-3">
          {allListings.map((listing) => (
            <div
              key={listing.id}
              className="flex gap-4 bg-card rounded-xl p-3 shadow-card animate-fade-in"
            >
              <img
                src={listing.image}
                alt={listing.title}
                className="w-28 h-24 rounded-lg object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground text-sm line-clamp-1">
                  {listing.title}
                </h3>
                <div className="flex items-center gap-1 text-muted-foreground text-xs mt-1">
                  <MapPin className="w-3 h-3" />
                  <span>{listing.location}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-2">
                  <span className="flex items-center gap-1">
                    <Bed className="w-3 h-3" />
                    {listing.bedrooms}
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath className="w-3 h-3" />
                    {listing.bathrooms}
                  </span>
                </div>
                <p className="text-primary font-bold text-sm mt-2">
                  N${listing.price.toLocaleString()}/mo
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Search;
