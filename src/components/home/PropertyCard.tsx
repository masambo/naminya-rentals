import { Heart, MapPin, Bed, Bath, Square } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/property/${id}`);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="bg-card rounded-xl overflow-hidden shadow-card transition-all duration-300 hover:shadow-lifted animate-fade-in cursor-pointer"
    >
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-32 md:h-36 object-cover"
        />
        <button
          onClick={handleFavoriteClick}
          className={cn(
            "absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 z-10",
            isFavorite
              ? "bg-destructive text-primary-foreground"
              : "bg-card/80 backdrop-blur-sm text-foreground hover:bg-card"
          )}
        >
          <Heart
            className={cn("w-3.5 h-3.5", isFavorite && "fill-current")}
          />
        </button>
        {isNew && (
          <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-semibold px-2 py-0.5 rounded-full">
            New
          </span>
        )}
      </div>

      <div className="p-3 md:p-4">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="text-sm md:text-base font-semibold text-foreground line-clamp-1">{title}</h3>
        </div>

        <div className="flex items-center gap-1.5 text-muted-foreground text-xs md:text-sm mb-2">
          <MapPin className="w-3 h-3" />
          <span className="line-clamp-1">{location}</span>
        </div>

        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Bed className="w-3 h-3" />
            <span>{bedrooms} Bed</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-3 h-3" />
            <span>{bathrooms} Bath</span>
          </div>
          <div className="flex items-center gap-1">
            <Square className="w-3 h-3" />
            <span>{size}m²</span>
          </div>
        </div>

        <div>
          {rentalType === "short-term" && pricingModel?.daily ? (
            <>
              <span className="text-lg md:text-xl font-bold text-primary">
                N${pricingModel.daily.toLocaleString()}
              </span>
              <span className="text-xs md:text-sm text-muted-foreground">/night</span>
            </>
          ) : (
            <>
              <span className="text-lg md:text-xl font-bold text-primary">
                N${price.toLocaleString()}
              </span>
              <span className="text-xs md:text-sm text-muted-foreground">/month</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
