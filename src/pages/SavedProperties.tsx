import AppLayout from "@/components/layout/AppLayout";
import { ArrowLeft, Heart, MapPin, Bed, Bath, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

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
  },
  {
    id: "2",
    title: "Cozy Student Room",
    location: "Pioneerspark, Windhoek",
    price: 3500,
    image: property2,
    bedrooms: 1,
    bathrooms: 1,
  },
];

const SavedProperties = () => {
  return (
    <AppLayout>
      <div className="px-4 pt-4 pb-6">
        <Link to="/profile" className="inline-flex items-center gap-2 text-muted-foreground mb-4">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back</span>
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
            <Heart className="w-6 h-6 text-destructive" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Saved Properties</h1>
            <p className="text-sm text-muted-foreground">{savedProperties.length} saved</p>
          </div>
        </div>

        {savedProperties.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-foreground mb-2">No saved properties</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Tap the heart icon on any listing to save it here
            </p>
            <Button variant="default" asChild>
              <Link to="/search">Browse Properties</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {savedProperties.map((property) => (
              <div
                key={property.id}
                className="bg-card rounded-xl overflow-hidden shadow-card animate-fade-in"
              >
                <div className="flex">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-32 h-28 object-cover"
                  />
                  <div className="flex-1 p-3">
                    <h3 className="font-semibold text-foreground text-sm line-clamp-1">
                      {property.title}
                    </h3>
                    <div className="flex items-center gap-1 text-muted-foreground text-xs mt-1">
                      <MapPin className="w-3 h-3" />
                      <span className="line-clamp-1">{property.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-2">
                      <span className="flex items-center gap-1">
                        <Bed className="w-3 h-3" />
                        {property.bedrooms}
                      </span>
                      <span className="flex items-center gap-1">
                        <Bath className="w-3 h-3" />
                        {property.bathrooms}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-primary font-bold text-sm">
                        N${property.price.toLocaleString()}/mo
                      </span>
                      <button className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
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
