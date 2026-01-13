import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Camera, Upload, MapPin, DollarSign, Home, Bed, Bath, Square, Info } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Warehouse } from "lucide-react";

const propertyTypes = [
  { id: "room", label: "Room", icon: Home },
  { id: "apartment", label: "Apartment", icon: Home },
  { id: "house", label: "House", icon: Home },
  { id: "mbashu", label: "Mbashu", icon: Warehouse },
];

const AddListing = () => {
  const [selectedType, setSelectedType] = useState("room");
  const [images, setImages] = useState<string[]>([]);

  return (
    <AppLayout>
      <div className="px-4 pt-4 pb-6">
        <h1 className="text-2xl font-bold text-foreground mb-1">Add Listing</h1>
        <p className="text-sm text-muted-foreground mb-6">
          List your property for free
        </p>

        {/* Property Type */}
        <div className="mb-6">
          <label className="text-sm font-semibold text-foreground mb-3 block">
            Property Type
          </label>
          <div className="grid grid-cols-3 gap-3">
            {propertyTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={cn(
                  "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all",
                  selectedType === type.id
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card hover:border-primary/30"
                )}
              >
                <Home
                  className={cn(
                    "w-6 h-6",
                    selectedType === type.id ? "text-primary" : "text-muted-foreground"
                  )}
                />
                <span
                  className={cn(
                    "text-sm font-medium",
                    selectedType === type.id ? "text-primary" : "text-foreground"
                  )}
                >
                  {type.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Photos */}
        <div className="mb-6">
          <label className="text-sm font-semibold text-foreground mb-3 block">
            Photos
          </label>
          <div className="grid grid-cols-3 gap-3">
            <button className="aspect-square rounded-xl border-2 border-dashed border-border bg-muted/50 flex flex-col items-center justify-center gap-2 hover:border-primary/50 transition-colors">
              <Camera className="w-6 h-6 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Add Photo</span>
            </button>
            <button className="aspect-square rounded-xl border-2 border-dashed border-border bg-muted/50 flex flex-col items-center justify-center gap-2 hover:border-primary/50 transition-colors">
              <Upload className="w-6 h-6 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Upload</span>
            </button>
          </div>
        </div>

        {/* Title */}
        <div className="mb-4">
          <label className="text-sm font-semibold text-foreground mb-2 block">
            Title
          </label>
          <input
            type="text"
            placeholder="e.g., Cozy room in Windhoek Central"
            className="w-full px-4 py-3 bg-card border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>

        {/* Location */}
        <div className="mb-4">
          <label className="text-sm font-semibold text-foreground mb-2 block">
            Location
          </label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Area, suburb"
              className="w-full pl-11 pr-4 py-3 bg-card border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="text-sm font-semibold text-foreground mb-2 block">
            Monthly Rent (N$)
          </label>
          <div className="relative">
            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="number"
              placeholder="5000"
              className="w-full pl-11 pr-4 py-3 bg-card border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div>
            <label className="text-xs font-semibold text-foreground mb-2 block">
              Bedrooms
            </label>
            <div className="relative">
              <Bed className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="number"
                placeholder="1"
                className="w-full pl-9 pr-3 py-3 bg-card border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-foreground mb-2 block">
              Bathrooms
            </label>
            <div className="relative">
              <Bath className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="number"
                placeholder="1"
                className="w-full pl-9 pr-3 py-3 bg-card border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-foreground mb-2 block">
              Size (m²)
            </label>
            <div className="relative">
              <Square className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="number"
                placeholder="25"
                className="w-full pl-9 pr-3 py-3 bg-card border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="text-sm font-semibold text-foreground mb-2 block">
            Description
          </label>
          <textarea
            rows={4}
            placeholder="Describe your property..."
            className="w-full px-4 py-3 bg-card border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
          />
        </div>

        {/* Info Box */}
        <div className="bg-secondary rounded-xl p-4 mb-6 flex gap-3">
          <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">Free Listing</p>
            <p className="text-xs text-muted-foreground mt-1">
              Listing your property on Ndunda is completely free. No hidden charges.
            </p>
          </div>
        </div>

        <Button variant="hero" size="xl" className="w-full">
          Publish Listing
        </Button>
      </div>
    </AppLayout>
  );
};

export default AddListing;
