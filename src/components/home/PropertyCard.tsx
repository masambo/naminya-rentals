import { Heart, MapPin, Bed, Bath, Square } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
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
  type: "room" | "house" | "apartment" | "guesthouse" | "hotel" | "lodge" | "camp" | "lodges-camps" | "commercial" | "airbnb" | "mbashu";
  isNew?: boolean;
  rentalType?: "long-term" | "short-term";
  pricingModel?: {
    daily?: number;
    weekly?: number;
    monthly?: number;
  };
}

const PropertyCard = ({
  id,
  title,
  location,
  price,
  image,
  bedrooms,
  bathrooms,
  size,
  isNew,
  rentalType = "long-term",
  pricingModel,
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

      <div className="p-4 md:p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-base md:text-lg font-semibold text-foreground line-clamp-1">{title}</h3>
        </div>

        <div className="flex items-center gap-1.5 text-muted-foreground text-sm md:text-base mb-3">
          <MapPin className="w-4 h-4" />
          <span className="line-clamp-1">{location}</span>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4" />
            <span>{bedrooms} Bed</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4" />
            <span>{bathrooms} Bath</span>
          </div>
          <div className="flex items-center gap-1">
            <Square className="w-4 h-4" />
            <span>{size}m²</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            {rentalType === "short-term" && pricingModel?.daily ? (
              <>
                <span className="text-xl md:text-2xl font-bold text-primary">
                  N${pricingModel.daily.toLocaleString()}
                </span>
                <span className="text-sm md:text-base text-muted-foreground">/night</span>
              </>
            ) : (
              <>
                <span className="text-xl md:text-2xl font-bold text-primary">
                  N${price.toLocaleString()}
                </span>
                <span className="text-sm md:text-base text-muted-foreground">/month</span>
              </>
            )}
          </div>
          <Link
            to={`/property/${id}`}
            className="px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm md:text-base font-medium hover:bg-primary/20 transition-colors"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
