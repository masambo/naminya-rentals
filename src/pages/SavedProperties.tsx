import AppLayout from "@/components/layout/AppLayout";
import { ArrowLeft, Heart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PropertyCard from "@/components/home/PropertyCard";

import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";

const savedProperties = [
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
    rentalType: "long-term" as const,
  },
];

const SavedProperties = () => {
  return (
    <AppLayout>
      <div className="px-4 pt-4 pb-6 md:px-0 md:pt-8 md:pb-8">
        <Link to="/profile" className="inline-flex items-center gap-2 text-muted-foreground mb-4 md:mb-6">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm md:text-base">Back</span>
        </Link>

        <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-destructive/10 flex items-center justify-center">
            <Heart className="w-6 h-6 md:w-8 md:h-8 text-destructive" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground">Saved Properties</h1>
            <p className="text-sm md:text-base text-muted-foreground">{savedProperties.length} saved</p>
          </div>
        </div>

        {savedProperties.length === 0 ? (
          <div className="text-center py-12 md:py-16">
            <Heart className="w-12 h-12 md:w-16 md:h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-foreground mb-2 md:text-lg">No saved properties</h3>
            <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
              Tap the heart icon on any listing to save it here
            </p>
            <Button variant="default" size="lg" asChild>
              <Link to="/search">Browse Properties</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {savedProperties.map((property) => (
              <div key={property.id} className="relative">
                <PropertyCard
                  id={property.id}
                  title={property.title}
                  location={property.location}
                  price={property.price}
                  image={property.image}
                  bedrooms={property.bedrooms}
                  bathrooms={property.bathrooms}
                  size={property.size}
                  type={property.type}
                  rentalType={property.rentalType}
                />
                {/* Remove Button Overlay */}
                <div className="absolute top-3 right-3 z-10">
                  <button className="p-2 bg-background/90 backdrop-blur-sm rounded-lg shadow-md hover:bg-background transition-colors">
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default SavedProperties;
