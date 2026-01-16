import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Camera, Upload, MapPin, DollarSign, Home, Bed, Bath, Square, Info, Hotel, TreePine, Building2, Store } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Warehouse } from "lucide-react";
import { toast } from "sonner";

const propertyTypes = [
  // Long-term rentals
  { id: "room", label: "Room", icon: Home, category: "long-term" },
  { id: "apartment", label: "Apartment", icon: Home, category: "long-term" },
  { id: "house", label: "House", icon: Home, category: "long-term" },
  { id: "mbashu", label: "Mbashu", icon: Warehouse, category: "long-term" },
  { id: "commercial", label: "Commercial", icon: Store, category: "long-term" },
  // Short-term rentals
  { id: "guesthouse", label: "Guest House", icon: Hotel, category: "short-term" },
  { id: "hotel", label: "Hotel", icon: Building2, category: "short-term" },
  { id: "lodges-camps", label: "Lodges & Camps", icon: TreePine, category: "short-term" },
  { id: "airbnb", label: "Vacation Rental", icon: Home, category: "short-term" },
];

const AddListing = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState("room");
  const [rentalType, setRentalType] = useState<"long-term" | "short-term">("long-term");
  const [images, setImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    size: "",
    description: "",
  });
  const [shortTermData, setShortTermData] = useState({
    dailyPrice: "",
    weeklyPrice: "",
    monthlyPrice: "",
    minimumStay: "1",
    maxGuests: "",
    cleaningFee: "",
    checkInTime: "14:00",
    checkOutTime: "11:00",
    instantBook: false,
    cancellationPolicy: "moderate" as "flexible" | "moderate" | "strict",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newImages: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            newImages.push(e.target.result as string);
            setImages((prev) => [...prev, ...newImages]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title.trim()) {
      toast.error("Please enter a title");
      return;
    }
    if (!formData.location.trim()) {
      toast.error("Please enter a location");
      return;
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      toast.error("Please enter a valid price");
      return;
    }
    if (images.length === 0) {
      toast.error("Please add at least one photo");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Listing published successfully!");
      // Reset form
      setFormData({
        title: "",
        location: "",
        price: "",
        bedrooms: "",
        bathrooms: "",
        size: "",
        description: "",
      });
      setImages([]);
      navigate("/my-listings");
    }, 1500);
  };

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
            {propertyTypes.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => {
                    setSelectedType(type.id);
                    setRentalType(type.category as "long-term" | "short-term");
                  }}
                  className={cn(
                    "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all",
                    selectedType === type.id
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card hover:border-primary/30"
                  )}
                >
                  <Icon
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
              );
            })}
          </div>
        </div>

        {/* Photos */}
        <div className="mb-6">
          <label className="text-sm font-semibold text-foreground mb-3 block">
            Photos {images.length > 0 && `(${images.length})`}
          </label>
          <div className="grid grid-cols-3 gap-3">
            {images.map((image, index) => (
              <div key={index} className="relative aspect-square rounded-xl overflow-hidden border-2 border-border">
                <img src={image} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setImages(images.filter((_, i) => i !== index))}
                  className="absolute top-1 right-1 w-6 h-6 bg-destructive text-primary-foreground rounded-full flex items-center justify-center text-xs hover:bg-destructive/90"
                >
                  ×
                </button>
              </div>
            ))}
            {images.length < 6 && (
              <label className="aspect-square rounded-xl border-2 border-dashed border-border bg-muted/50 flex flex-col items-center justify-center gap-2 hover:border-primary/50 transition-colors cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Camera className="w-6 h-6 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Add Photo</span>
              </label>
            )}
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
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            className="w-full px-4 py-3 bg-card border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            required
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
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-card border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              required
            />
          </div>
        </div>

        {/* Price - Different for long-term vs short-term */}
        {rentalType === "long-term" ? (
          <div className="mb-4">
            <label className="text-sm font-semibold text-foreground mb-2 block">
              Monthly Rent (N$)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="number"
                placeholder="5000"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                min="0"
                step="100"
                className="w-full pl-11 pr-4 py-3 bg-card border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                required
              />
            </div>
          </div>
        ) : (
          <div className="mb-4">
            <label className="text-sm font-semibold text-foreground mb-2 block">
              Pricing (N$)
            </label>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Daily</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                  <input
                    type="number"
                    placeholder="500"
                    value={shortTermData.dailyPrice}
                    onChange={(e) => setShortTermData({...shortTermData, dailyPrice: e.target.value})}
                    min="0"
                    className="w-full pl-8 pr-3 py-2 bg-card border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Weekly</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                  <input
                    type="number"
                    placeholder="3000"
                    value={shortTermData.weeklyPrice}
                    onChange={(e) => setShortTermData({...shortTermData, weeklyPrice: e.target.value})}
                    min="0"
                    className="w-full pl-8 pr-3 py-2 bg-card border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Monthly</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                  <input
                    type="number"
                    placeholder="10000"
                    value={shortTermData.monthlyPrice}
                    onChange={(e) => setShortTermData({...shortTermData, monthlyPrice: e.target.value})}
                    min="0"
                    className="w-full pl-8 pr-3 py-2 bg-card border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

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
                value={formData.bedrooms}
                onChange={(e) => handleInputChange("bedrooms", e.target.value)}
                min="0"
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
                value={formData.bathrooms}
                onChange={(e) => handleInputChange("bathrooms", e.target.value)}
                min="0"
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
                value={formData.size}
                onChange={(e) => handleInputChange("size", e.target.value)}
                min="0"
                className="w-full pl-9 pr-3 py-3 bg-card border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        </div>

        {/* Short-term specific fields */}
        {rentalType === "short-term" && (
          <div className="mb-6 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-semibold text-foreground mb-2 block">
                  Minimum Stay (nights)
                </label>
                <input
                  type="number"
                  min="1"
                  placeholder="1"
                  value={shortTermData.minimumStay}
                  onChange={(e) => setShortTermData({...shortTermData, minimumStay: e.target.value})}
                  className="w-full px-4 py-3 bg-card border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-foreground mb-2 block">
                  Max Guests
                </label>
                <input
                  type="number"
                  min="1"
                  placeholder="4"
                  value={shortTermData.maxGuests}
                  onChange={(e) => setShortTermData({...shortTermData, maxGuests: e.target.value})}
                  className="w-full px-4 py-3 bg-card border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-semibold text-foreground mb-2 block">
                  Check-in Time
                </label>
                <input
                  type="time"
                  value={shortTermData.checkInTime}
                  onChange={(e) => setShortTermData({...shortTermData, checkInTime: e.target.value})}
                  className="w-full px-4 py-3 bg-card border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-foreground mb-2 block">
                  Check-out Time
                </label>
                <input
                  type="time"
                  value={shortTermData.checkOutTime}
                  onChange={(e) => setShortTermData({...shortTermData, checkOutTime: e.target.value})}
                  className="w-full px-4 py-3 bg-card border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block">
                Cleaning Fee (N$)
              </label>
              <input
                type="number"
                min="0"
                placeholder="500"
                value={shortTermData.cleaningFee}
                onChange={(e) => setShortTermData({...shortTermData, cleaningFee: e.target.value})}
                className="w-full px-4 py-3 bg-card border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block">
                Cancellation Policy
              </label>
              <select
                value={shortTermData.cancellationPolicy}
                onChange={(e) => setShortTermData({...shortTermData, cancellationPolicy: e.target.value as "flexible" | "moderate" | "strict"})}
                className="w-full px-4 py-3 bg-card border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="flexible">Flexible - Full refund 1 day before</option>
                <option value="moderate">Moderate - Full refund 5 days before</option>
                <option value="strict">Strict - 50% refund up to 1 week before</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="instantBook"
                checked={shortTermData.instantBook}
                onChange={(e) => setShortTermData({...shortTermData, instantBook: e.target.checked})}
                className="rounded"
              />
              <label htmlFor="instantBook" className="text-sm text-foreground">
                Enable instant booking (guests can book without approval)
              </label>
            </div>
          </div>
        )}

        {/* Description */}
        <div className="mb-6">
          <label className="text-sm font-semibold text-foreground mb-2 block">
            Description
          </label>
          <textarea
            rows={4}
            placeholder="Describe your property..."
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
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

        <form onSubmit={handleSubmit}>
          <Button 
            type="submit" 
            variant="hero" 
            size="xl" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Publishing..." : "Publish Listing"}
          </Button>
        </form>
      </div>
    </AppLayout>
  );
};

export default AddListing;
