import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import PropertyCard from "@/components/home/PropertyCard";
import {
  MapPin,
  Navigation,
  Loader2,
  AlertCircle,
  RefreshCw,
  Map,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";

// Property data with coordinates (Windhoek, Namibia approximate coordinates)
const allProperties = [
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
    // Kleine Kuppe coordinates
    latitude: -22.5609,
    longitude: 17.0658,
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
    // Pioneerspark coordinates
    latitude: -22.5714,
    longitude: 17.0836,
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
    // Olympia coordinates
    latitude: -22.5556,
    longitude: 17.0722,
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
    // Eros coordinates
    latitude: -22.5681,
    longitude: 17.0814,
  },
];

// Haversine formula to calculate distance between two coordinates in kilometers
const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

interface UserLocation {
  latitude: number;
  longitude: number;
}

interface PropertyWithDistance {
  property: typeof allProperties[0];
  distance: number;
}

const NearbyScan = () => {
  const navigate = useNavigate();
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nearbyProperties, setNearbyProperties] = useState<PropertyWithDistance[]>([]);
  const [maxDistance, setMaxDistance] = useState(10); // Default 10km radius

  const getCurrentLocation = () => {
    setIsLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setIsLoading(false);
      toast.error("Location services not available");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setUserLocation(location);
        setIsLoading(false);
        toast.success("Location found!");
        findNearbyProperties(location);
      },
      (err) => {
        setIsLoading(false);
        let errorMessage = "Unable to get your location";
        switch (err.code) {
          case err.PERMISSION_DENIED:
            errorMessage = "Location access denied. Please enable location permissions.";
            break;
          case err.POSITION_UNAVAILABLE:
            errorMessage = "Location information unavailable.";
            break;
          case err.TIMEOUT:
            errorMessage = "Location request timed out.";
            break;
        }
        setError(errorMessage);
        toast.error(errorMessage);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const findNearbyProperties = (location: UserLocation) => {
    const propertiesWithDistance: PropertyWithDistance[] = allProperties
      .map((property) => {
        const distance = calculateDistance(
          location.latitude,
          location.longitude,
          property.latitude,
          property.longitude
        );
        return {
          property,
          distance,
        };
      })
      .filter((item) => item.distance <= maxDistance)
      .sort((a, b) => a.distance - b.distance);

    setNearbyProperties(propertiesWithDistance);
  };

  useEffect(() => {
    if (userLocation) {
      findNearbyProperties(userLocation);
    }
  }, [maxDistance]);

  const formatDistance = (distance: number): string => {
    if (distance < 1) {
      return `${Math.round(distance * 1000)}m away`;
    }
    return `${distance.toFixed(1)}km away`;
  };

  return (
    <AppLayout>
      <div className="px-4 pt-4 pb-6 md:px-0 md:pt-8 md:pb-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Navigation className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Scan Nearby</h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Find properties near your location
              </p>
            </div>
          </div>
        </div>

        {/* Location Status */}
        {!userLocation && !isLoading && (
          <div className="bg-card rounded-xl p-6 md:p-8 border border-border mb-6 text-center">
            <MapPin className="w-16 h-16 md:w-20 md:h-20 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
              Find Properties Near You
            </h3>
            <p className="text-base md:text-lg text-muted-foreground mb-4 md:mb-6">
              Allow location access to discover nearby rooms, houses, and apartments
            </p>
            <Button onClick={getCurrentLocation} size="lg" className="w-full">
              <Navigation className="w-5 h-5 mr-2" />
              Scan for Nearby Properties
            </Button>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="bg-card rounded-xl p-6 md:p-8 border border-border mb-6 text-center">
            <Loader2 className="w-12 h-12 md:w-16 md:h-16 text-primary mx-auto mb-4 animate-spin" />
            <p className="text-base md:text-lg text-muted-foreground">
              Getting your location...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-base md:text-lg font-medium text-destructive mb-1">Error</p>
                <p className="text-base md:text-lg text-muted-foreground">{error}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3"
                  onClick={getCurrentLocation}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Location Found */}
        {userLocation && !isLoading && (
          <>
            {/* Distance Filter */}
            <div className="bg-card rounded-xl p-4 md:p-6 border border-border mb-4 md:mb-6">
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <div>
                  <p className="text-base md:text-lg font-semibold text-foreground">
                    Search Radius
                  </p>
                  <p className="text-sm md:text-base text-muted-foreground">
                    Maximum distance: {maxDistance}km
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={getCurrentLocation}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>
              <div className="flex gap-2">
                {[5, 10, 15, 20, 25].map((distance) => (
                  <button
                    key={distance}
                    onClick={() => setMaxDistance(distance)}
                    className={cn(
                      "flex-1 px-3 py-2.5 md:py-3 rounded-lg text-base md:text-lg font-medium transition-all",
                      maxDistance === distance
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    )}
                  >
                    {distance}km
                  </button>
                ))}
              </div>
            </div>

            {/* Results */}
            {nearbyProperties.length > 0 ? (
              <>
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <p className="text-base md:text-lg text-muted-foreground">
                    Found {nearbyProperties.length}{" "}
                    {nearbyProperties.length === 1 ? "property" : "properties"} within{" "}
                    {maxDistance}km
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const mapUrl = `https://www.google.com/maps?q=${userLocation.latitude},${userLocation.longitude}`;
                      window.open(mapUrl, "_blank");
                    }}
                  >
                    <Map className="w-4 h-4 mr-2" />
                    View on Map
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                  {nearbyProperties.map((item) => (
                    <div key={item.property.id} className="relative">
                      <PropertyCard {...item.property} />
                      <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm rounded-full px-3 py-1.5 md:px-4 md:py-2 border border-border">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-primary" />
                          <span className="text-sm font-semibold text-foreground">
                            {formatDistance(item.distance)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-card rounded-xl p-8 md:p-12 border border-border text-center">
                <MapPin className="w-16 h-16 md:w-20 md:h-20 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                  No properties found
                </h3>
                <p className="text-base md:text-lg text-muted-foreground mb-4 md:mb-6">
                  No properties found within {maxDistance}km. Try increasing the search radius.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setMaxDistance(25)}
                >
                  Increase Radius
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </AppLayout>
  );
};

export default NearbyScan;
