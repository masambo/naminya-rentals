import { Heart, MapPin, Bed, Bath, Square } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface PropertyCardProps {
  id: string;
  title: string;
  location: string;
  price: number;
  image: string;
  bedrooms: number;
  bathrooms: number;
  size: number;
  type: "room" | "house" | "apartment";
  isNew?: boolean;
}

const PropertyCard = ({
  title,
  location,
  price,
  image,
  bedrooms,
  bathrooms,
  size,
  isNew,
}: PropertyCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="bg-card rounded-2xl overflow-hidden shadow-card transition-all duration-300 hover:shadow-lifted animate-fade-in">
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-44 object-cover"
        />
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className={cn(
            "absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200",
            isFavorite
              ? "bg-destructive text-primary-foreground"
              : "bg-card/80 backdrop-blur-sm text-foreground hover:bg-card"
          )}
        >
          <Heart
            className={cn("w-4 h-4", isFavorite && "fill-current")}
          />
        </button>
        {isNew && (
          <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-semibold px-2.5 py-1 rounded-full">
            New
          </span>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-foreground line-clamp-1">{title}</h3>
        </div>

        <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-3">
          <MapPin className="w-3.5 h-3.5" />
          <span className="line-clamp-1">{location}</span>
        </div>

        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Bed className="w-3.5 h-3.5" />
            <span>{bedrooms} Bed</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-3.5 h-3.5" />
            <span>{bathrooms} Bath</span>
          </div>
          <div className="flex items-center gap-1">
            <Square className="w-3.5 h-3.5" />
            <span>{size}m²</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-primary">N${price.toLocaleString()}</span>
            <span className="text-sm text-muted-foreground">/month</span>
          </div>
          <button className="px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium hover:bg-primary/20 transition-colors">
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
