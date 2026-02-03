import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import {
  Heart,
  MapPin,
  Bed,
  Bath,
  Square,
  ArrowLeft,
  Share2,
  Phone,
  Mail,
  Calendar,
  Wifi,
  Car,
  Shield,
  Coffee,
  Home,
  Building,
  CheckCircle2,
  Star,
  Camera,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { format } from "date-fns";
import PropertyCard from "@/components/home/PropertyCard";
import BookingWidget from "@/components/booking/BookingWidget";

import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";

// Mock property data - in real app, this would come from an API
const mockProperties: Record<string, any> = {
  "1": {
    id: "1",
    title: "Modern 2BR Apartment",
    location: "Kleine Kuppe, Windhoek",
    fullAddress: "123 Independence Avenue, Kleine Kuppe, Windhoek",
    latitude: -22.5609,
    longitude: 17.0658,
    price: 12500,
    images: [property1, property2, property3, property4],
    bedrooms: 2,
    bathrooms: 1,
    size: 75,
    type: "apartment",
    isNew: true,
    verified: true,
    description: `
      Beautiful modern 2-bedroom apartment located in the heart of Kleine Kuppe, Windhoek. 
      This spacious unit features an open-plan living area, fully fitted kitchen, and private balcony 
      with stunning city views. The apartment includes secure parking, 24/7 security, and is within 
      walking distance to shopping centers, restaurants, and schools. Perfect for professionals or 
      small families seeking a comfortable and convenient lifestyle.
      
      The property comes with modern finishes, tiled floors throughout, and large windows that allow 
      plenty of natural light. The master bedroom has an en-suite bathroom, and both bedrooms have 
      built-in wardrobes. The complex features a swimming pool, gym facilities, and landscaped gardens.
    `,
    amenities: [
      { icon: Wifi, label: "WiFi Ready" },
      { icon: Car, label: "Parking" },
      { icon: Shield, label: "Security" },
      { icon: Coffee, label: "Kitchen" },
      { icon: Home, label: "Furnished" },
      { icon: Building, label: "Elevator" },
    ],
    agent: {
      id: "1",
      name: "Sarah M.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
      phone: "+264 81 123 4567",
      email: "sarah.m@naminya.com",
      verified: true,
      rating: 4.8,
      listings: 12,
    },
    availableFrom: "2026-02-01",
    deposit: 25000,
    leaseTerm: "12 months",
    petsAllowed: false,
    furnished: true,
  },
  "2": {
    id: "2",
    title: "Cozy Student Room",
    location: "Pioneerspark, Windhoek",
    fullAddress: "456 Main Street, Pioneerspark, Windhoek",
    latitude: -22.5714,
    longitude: 17.0836,
    price: 3500,
    images: [property2, property3, property4, property1],
    bedrooms: 1,
    bathrooms: 1,
    size: 18,
    type: "room",
    isNew: false,
    verified: true,
    rentalType: "long-term" as const,
    description: `
      Affordable and cozy student room in a shared house in Pioneerspark. Perfect for students 
      looking for budget-friendly accommodation near campus. The room is fully furnished and includes 
      access to shared kitchen, bathroom, and living areas. WiFi and utilities included in rent.
    `,
    amenities: [
      { icon: Wifi, label: "WiFi Included" },
      { icon: Coffee, label: "Shared Kitchen" },
      { icon: Home, label: "Furnished" },
    ],
    agent: {
      id: "2",
      name: "John K.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      phone: "+264 81 234 5678",
      email: "john.k@naminya.com",
      verified: true,
      rating: 4.6,
      listings: 8,
    },
    availableFrom: "2026-01-15",
    deposit: 7000,
    leaseTerm: "6-12 months",
    petsAllowed: false,
    furnished: true,
  },
  "3": {
    id: "3",
    title: "Spacious Family House",
    location: "Olympia, Windhoek",
    fullAddress: "789 Hill Street, Olympia, Windhoek",
    latitude: -22.5556,
    longitude: 17.0722,
    price: 25000,
    images: [property3, property4, property1, property2],
    bedrooms: 4,
    bathrooms: 2,
    size: 180,
    type: "house",
    isNew: true,
    verified: true,
    rentalType: "long-term" as const,
    description: `
      Stunning family home in prestigious Olympia area. This spacious 4-bedroom, 2-bathroom house 
      features a large open-plan living area, modern kitchen, separate dining room, and private garden. 
      Perfect for families seeking comfort and space. The property includes a double garage, security 
      system, and is located in a quiet, family-friendly neighborhood.
    `,
    amenities: [
      { icon: Wifi, label: "WiFi Ready" },
      { icon: Car, label: "Double Garage" },
      { icon: Shield, label: "Security System" },
      { icon: Coffee, label: "Modern Kitchen" },
      { icon: Home, label: "Garden" },
    ],
    agent: {
      id: "3",
      name: "Maria N.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      phone: "+264 81 345 6789",
      email: "maria.n@naminya.com",
      verified: true,
      rating: 4.9,
      listings: 15,
    },
    availableFrom: "2026-02-15",
    deposit: 50000,
    leaseTerm: "24 months",
    petsAllowed: true,
    furnished: false,
  },
  "4": {
    id: "4",
    title: "Bachelor Flat",
    location: "Eros, Windhoek",
    fullAddress: "321 Valley Road, Eros, Windhoek",
    price: 5500,
    images: [property4, property1, property2, property3],
    bedrooms: 1,
    bathrooms: 1,
    size: 35,
    type: "apartment",
    isNew: false,
    verified: true,
    rentalType: "long-term" as const,
    description: `
      Modern bachelor flat perfect for young professionals. Compact yet functional space with 
      open-plan kitchen and living area. Located in vibrant Eros area with easy access to city center 
      and amenities.
    `,
    amenities: [
      { icon: Wifi, label: "WiFi Ready" },
      { icon: Car, label: "Street Parking" },
      { icon: Coffee, label: "Kitchenette" },
    ],
    agent: {
      id: "4",
      name: "David T.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      phone: "+264 81 456 7890",
      email: "david.t@naminya.com",
      verified: true,
      rating: 4.7,
      listings: 6,
    },
    availableFrom: "2026-01-20",
    deposit: 11000,
    leaseTerm: "12 months",
    petsAllowed: false,
    furnished: false,
  },
  "5": {
    id: "5",
    title: "Luxury Guest House",
    location: "Kleine Kuppe, Windhoek",
    fullAddress: "456 Luxury Lane, Kleine Kuppe, Windhoek",
    price: 0, // Not used for short-term
    images: [property1, property2, property3, property4],
    bedrooms: 3,
    bathrooms: 2,
    size: 120,
    type: "guesthouse",
    isNew: true,
    verified: true,
    rentalType: "short-term" as const,
    pricingModel: {
      daily: 2500,
      weekly: 15000,
      monthly: 50000,
    },
    minimumStay: 2,
    maxGuests: 6,
    cleaningFee: 500,
    checkInTime: "14:00",
    checkOutTime: "11:00",
    instantBook: true,
    cancellationPolicy: "moderate",
    availability: {
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      blockedDates: [],
    },
    description: `
      Beautiful luxury guest house perfect for short stays. Located in the heart of Kleine Kuppe, 
      this spacious 3-bedroom, 2-bathroom property offers all the comforts of home. Perfect for families, 
      business travelers, or groups visiting Windhoek. Fully furnished with modern amenities, WiFi, 
      and secure parking.
    `,
    amenities: [
      { icon: Wifi, label: "Free WiFi" },
      { icon: Car, label: "Parking" },
      { icon: Shield, label: "Security" },
      { icon: Coffee, label: "Fully Equipped Kitchen" },
      { icon: Home, label: "Fully Furnished" },
    ],
    agent: {
      id: "1",
      name: "Sarah M.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
      phone: "+264 81 123 4567",
      email: "sarah.m@naminya.com",
      verified: true,
      rating: 4.8,
      listings: 12,
    },
    availableFrom: new Date().toISOString().split('T')[0],
    deposit: 5000,
    leaseTerm: "Flexible",
    petsAllowed: true,
    furnished: true,
  },
  "6": {
    id: "6",
    title: "Safari Lodge - Etosha",
    location: "Etosha National Park",
    fullAddress: "Etosha Safari Lodge, Etosha National Park",
    price: 0,
    images: [property3, property4, property1, property2],
    bedrooms: 4,
    bathrooms: 3,
    size: 200,
    type: "lodge",
    isNew: true,
    verified: true,
    rentalType: "short-term" as const,
    pricingModel: {
      daily: 5000,
      weekly: 30000,
    },
    minimumStay: 3,
    maxGuests: 8,
    cleaningFee: 1000,
    checkInTime: "15:00",
    checkOutTime: "10:00",
    instantBook: false,
    cancellationPolicy: "strict",
    availability: {
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      blockedDates: [],
    },
    description: `
      Experience the beauty of Namibia at this stunning safari lodge near Etosha National Park. 
      Perfect for wildlife enthusiasts and nature lovers. The lodge features 4 bedrooms, 3 bathrooms, 
      a large living area, and outdoor deck with stunning views. Includes game drives and guided tours.
    `,
    amenities: [
      { icon: Wifi, label: "WiFi" },
      { icon: Car, label: "Parking" },
      { icon: Shield, label: "Security" },
      { icon: Home, label: "Fully Furnished" },
    ],
    agent: {
      id: "3",
      name: "Maria N.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      phone: "+264 81 345 6789",
      email: "maria.n@naminya.com",
      verified: true,
      rating: 4.9,
      listings: 15,
    },
    availableFrom: new Date().toISOString().split('T')[0],
    deposit: 10000,
    leaseTerm: "Flexible",
    petsAllowed: false,
    furnished: true,
  },
  "7": {
    id: "7",
    title: "Desert Camp - Sossusvlei",
    location: "Sossusvlei, Namibia",
    fullAddress: "Desert Camp, Sossusvlei Area",
    price: 0,
    images: [property2, property3, property4, property1],
    bedrooms: 2,
    bathrooms: 1,
    size: 50,
    type: "camp",
    isNew: false,
    verified: true,
    rentalType: "short-term" as const,
    pricingModel: {
      daily: 1500,
      weekly: 9000,
    },
    minimumStay: 1,
    maxGuests: 4,
    cleaningFee: 300,
    checkInTime: "14:00",
    checkOutTime: "11:00",
    instantBook: true,
    cancellationPolicy: "flexible",
    availability: {
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      blockedDates: [],
    },
    description: `
      Authentic desert camp experience near the famous Sossusvlei dunes. Perfect for adventure seekers 
      and those wanting to experience the Namib Desert. The camp includes 2 bedrooms, shared bathroom, 
      and outdoor cooking area. Wake up to stunning desert sunrises.
    `,
    amenities: [
      { icon: Home, label: "Camping Equipment" },
      { icon: Coffee, label: "Outdoor Kitchen" },
    ],
    agent: {
      id: "4",
      name: "David T.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      phone: "+264 81 456 7890",
      email: "david.t@naminya.com",
      verified: true,
      rating: 4.7,
      listings: 6,
    },
    availableFrom: new Date().toISOString().split('T')[0],
    deposit: 3000,
    leaseTerm: "Flexible",
    petsAllowed: false,
    furnished: true,
  },
};

const PropertyView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [api, setApi] = useState<any>(null);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const propertyId = id || "";
  const property = mockProperties[propertyId];
  
  // Get similar properties (excluding current property)
  const similarProperties = property && propertyId
    ? Object.values(mockProperties)
        .filter((p: any) => p.id !== propertyId && (p.type === property.type || p.location.includes(property.location.split(",")[0])))
        .slice(0, 3)
    : [];
  
  // Mock reviews data
  const reviews = property ? [
    {
      id: "1",
      user: "John D.",
      rating: 5,
      date: "2026-01-10",
      comment: "Great property! Very clean and well-maintained. The agent was very professional and helpful.",
      verified: true,
    },
    {
      id: "2",
      user: "Sarah K.",
      rating: 4,
      date: "2026-01-05",
      comment: "Nice location and good value for money. Would recommend!",
      verified: true,
    },
    {
      id: "3",
      user: "Mike T.",
      rating: 5,
      date: "2025-12-28",
      comment: "Excellent property management. Very responsive to maintenance requests.",
      verified: false,
    },
  ] : [];
  
  const averageRating = reviews.length > 0
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    : 0;

  useEffect(() => {
    // Load favorite status from localStorage or API
    if (!propertyId) return;
    const savedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(savedFavorites.includes(propertyId));
  }, [propertyId]);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setSelectedImageIndex(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    onSelect();

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  if (!property) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <h2 className="text-2xl font-bold text-foreground mb-2">Property Not Found</h2>
          <p className="text-muted-foreground mb-6">The property you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/search")}>Back to Search</Button>
        </div>
      </AppLayout>
    );
  }

  const handleFavorite = () => {
    if (!propertyId) return;
    const savedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (isFavorite) {
      const newFavorites = savedFavorites.filter((favId: string) => favId !== propertyId);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      setIsFavorite(false);
      toast.success("Removed from saved properties");
    } else {
      localStorage.setItem("favorites", JSON.stringify([...savedFavorites, propertyId]));
      setIsFavorite(true);
      toast.success("Saved to favorites");
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: property.title,
          text: `Check out this property: ${property.title}`,
          url,
        });
        toast.success("Shared successfully");
      } catch (error) {
        // User cancelled or error occurred
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard");
    }
  };

  const handleContactAgent = (method: "phone" | "email" | "whatsapp") => {
    if (method === "phone") {
      window.location.href = `tel:${property.agent.phone}`;
    } else if (method === "email") {
      window.location.href = `mailto:${property.agent.email}?subject=Inquiry about ${property.title}`;
    } else if (method === "whatsapp") {
      // Format phone number for WhatsApp (remove spaces, +, etc.)
      const phoneNumber = property.agent.phone.replace(/\s+/g, "").replace(/\+/g, "");
      const message = encodeURIComponent(`Hi! I'm interested in ${property.title}. Is it still available?`);
      window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
    }
  };

  const handleScheduleViewing = () => {
    setScheduleOpen(true);
  };

  const handleSubmitSchedule = () => {
    if (!selectedDate || !selectedTime || !name || !email || !phone) {
      toast.error("Please fill in all required fields");
      return;
    }
    // In real app, submit to API
    toast.success(`Viewing scheduled for ${format(selectedDate, "PPP")} at ${selectedTime}`);
    setScheduleOpen(false);
    setSelectedDate(undefined);
    setSelectedTime("");
    setName("");
    setEmail("");
    setPhone("");
    setNotes("");
  };

  const availableTimeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ];

  const handleImageThumbnailClick = (index: number) => {
    if (api) {
      api.scrollTo(index);
    }
  };

  return (
    <AppLayout>
      {/* Header with back button */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleFavorite}
              className={cn("rounded-full", isFavorite && "text-destructive")}
            >
              <Heart className={cn("w-5 h-5", isFavorite && "fill-current")} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleShare}
              className="rounded-full"
            >
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="relative md:rounded-lg md:overflow-hidden md:border md:border-border">
        <Carousel className="w-full" setApi={setApi}>
          <CarouselContent>
            {property.images.map((image: string, index: number) => (
              <CarouselItem key={index}>
                <div className="relative aspect-[4/3] md:aspect-[16/9] w-full">
                  <img
                    src={image}
                    alt={`${property.title} - Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 md:left-6" />
          <CarouselNext className="right-4 md:right-6" />
        </Carousel>

        {/* Image counter */}
        <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
          {selectedImageIndex + 1} / {property.images.length}
        </div>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {property.isNew && (
            <Badge className="bg-primary text-primary-foreground">New Listing</Badge>
          )}
          {property.verified && (
            <Badge className="bg-green-600 text-white">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Verified
            </Badge>
          )}
        </div>
      </div>

      {/* Image Thumbnails */}
      {property.images.length > 1 && (
        <div className="px-4 py-3 md:px-0 md:py-4 bg-card border-b border-border">
          <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2 md:justify-center md:overflow-x-visible">
            {property.images.map((image: string, index: number) => (
              <button
                key={index}
                onClick={() => handleImageThumbnailClick(index)}
                className={cn(
                  "relative shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border-2 transition-all",
                  selectedImageIndex === index
                    ? "border-primary ring-2 ring-primary ring-offset-2"
                    : "border-border hover:border-primary/50"
                )}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Property Details */}
      <div className="px-4 py-6 md:px-0 md:py-8">
        {/* Desktop Layout: Side-by-side */}
        <div className="md:grid md:grid-cols-3 md:gap-8 md:items-start">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Title and Location */}
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">{property.title}</h1>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span className="text-sm md:text-base">{property.fullAddress}</span>
              </div>
            </div>

            {/* Price */}
        <div className="flex items-baseline gap-2">
          {property.rentalType === "short-term" && property.pricingModel?.daily ? (
            <>
              <span className="text-3xl font-bold text-primary">
                N${property.pricingModel.daily.toLocaleString()}
              </span>
              <span className="text-muted-foreground">/night</span>
              {property.pricingModel.weekly && (
                <span className="text-sm text-muted-foreground ml-2">
                  • Weekly: N${property.pricingModel.weekly.toLocaleString()}
                </span>
              )}
            </>
          ) : (
            <>
              <span className="text-3xl font-bold text-primary">
                N${property.price.toLocaleString()}
              </span>
              <span className="text-muted-foreground">/month</span>
            </>
          )}
        </div>

        {/* Key Features */}
        <div className="flex items-center gap-6 py-4 border-y border-border">
          <div className="flex items-center gap-2">
            <Bed className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm font-medium">{property.bedrooms} Bed{property.bedrooms !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center gap-2">
            <Bath className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm font-medium">{property.bathrooms} Bath{property.bathrooms !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center gap-2">
            <Square className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm font-medium">{property.size}m²</span>
          </div>
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-2 gap-4">
          {property.rentalType === "short-term" ? (
            <>
              <div className="bg-card rounded-lg p-3 border border-border">
                <p className="text-xs text-muted-foreground mb-1">Check-in</p>
                <p className="text-sm font-semibold">{property.checkInTime || "14:00"}</p>
              </div>
              <div className="bg-card rounded-lg p-3 border border-border">
                <p className="text-xs text-muted-foreground mb-1">Check-out</p>
                <p className="text-sm font-semibold">{property.checkOutTime || "11:00"}</p>
              </div>
              {property.maxGuests && (
                <div className="bg-card rounded-lg p-3 border border-border">
                  <p className="text-xs text-muted-foreground mb-1">Max Guests</p>
                  <p className="text-sm font-semibold">{property.maxGuests}</p>
                </div>
              )}
              {property.minimumStay && (
                <div className="bg-card rounded-lg p-3 border border-border">
                  <p className="text-xs text-muted-foreground mb-1">Min Stay</p>
                  <p className="text-sm font-semibold">{property.minimumStay} nights</p>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="bg-card rounded-lg p-3 border border-border">
                <p className="text-xs text-muted-foreground mb-1">Deposit</p>
                <p className="text-sm font-semibold">N${property.deposit.toLocaleString()}</p>
              </div>
              <div className="bg-card rounded-lg p-3 border border-border">
                <p className="text-xs text-muted-foreground mb-1">Available From</p>
                <p className="text-sm font-semibold">
                  {new Date(property.availableFrom).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
              <div className="bg-card rounded-lg p-3 border border-border">
                <p className="text-xs text-muted-foreground mb-1">Lease Term</p>
                <p className="text-sm font-semibold">{property.leaseTerm}</p>
              </div>
              <div className="bg-card rounded-lg p-3 border border-border">
                <p className="text-xs text-muted-foreground mb-1">Furnished</p>
                <p className="text-sm font-semibold">{property.furnished ? "Yes" : "No"}</p>
              </div>
            </>
          )}
        </div>

        {/* Action Buttons - Only show for long-term rentals */}
        {property.rentalType === "long-term" && (
          <div className="md:col-span-2">
          <div className="flex gap-3">
            <Dialog open={scheduleOpen} onOpenChange={setScheduleOpen}>
              <DialogTrigger asChild>
                <Button
                  className="flex-1"
                  onClick={handleScheduleViewing}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Viewing
                </Button>
              </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Schedule a Viewing</DialogTitle>
                <DialogDescription>
                  Choose a date and time that works for you. The agent will confirm the appointment.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Select Date *</Label>
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date()}
                    className="rounded-md border"
                  />
                  {selectedDate && (
                    <p className="text-sm text-muted-foreground">
                      Selected: {format(selectedDate, "PPP")}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Select Time *</Label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a time" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableTimeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Your Name *</Label>
                  <Input
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email *</Label>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Phone Number *</Label>
                  <Input
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Additional Notes (Optional)</Label>
                  <Textarea
                    placeholder="Any specific questions or requests..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setScheduleOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button onClick={handleSubmitSchedule} className="flex-1">
                  Confirm Viewing
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => handleContactAgent("phone")}
          >
            <Phone className="w-4 h-4 mr-2" />
            Call Agent
          </Button>
          </div>
          </div>
        )}

            {/* Booking Widget for Short-term Rentals - Mobile */}
            {property.rentalType === "short-term" && (
              <div className="md:hidden mb-6">
                <BookingWidget property={property} />
              </div>
            )}

            {/* Tabs */}
          <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="amenities">Amenities</TabsTrigger>
            <TabsTrigger value="location">Location</TabsTrigger>
            <TabsTrigger value="reviews">
              Reviews ({reviews.length})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-4">
            <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
              {property.description}
            </p>
          </TabsContent>
          <TabsContent value="amenities" className="mt-4">
            <div className="grid grid-cols-2 gap-3">
              {property.amenities.map((amenity: any, index: number) => {
                const Icon = amenity.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border"
                  >
                    <Icon className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium">{amenity.label}</span>
                  </div>
                );
              })}
            </div>
          </TabsContent>
          <TabsContent value="location" className="mt-4">
            <div className="bg-card rounded-lg p-4 border border-border mb-4">
              <p className="text-sm font-medium mb-2">Full Address</p>
              <p className="text-sm text-muted-foreground">{property.fullAddress}</p>
            </div>
            {/* Google Street View Integration */}
            <div className="aspect-video bg-muted rounded-lg overflow-hidden border border-border mb-4 relative">
              {property.latitude && property.longitude ? (
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps/embed/v1/streetview?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY'}&location=${property.latitude},${property.longitude}&heading=210&pitch=0&fov=90`}
                  title="Property Street View"
                />
              ) : (
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps/embed/v1/streetview?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY'}&location=${encodeURIComponent(property.fullAddress || property.location)}&heading=210&pitch=0&fov=90`}
                  title="Property Street View"
                />
              )}
              {/* Fallback if no API key */}
              {!import.meta.env.VITE_GOOGLE_MAPS_API_KEY && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted/95 backdrop-blur-sm">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">Street View</p>
                    <p className="text-xs text-muted-foreground">Add VITE_GOOGLE_MAPS_API_KEY to enable Street View</p>
                  </div>
                </div>
              )}
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                window.open(
                  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(property.fullAddress)}`,
                  "_blank"
                );
              }}
            >
              <MapPin className="w-4 h-4 mr-2" />
              Get Directions
            </Button>
          </TabsContent>
          <TabsContent value="reviews" className="mt-4">
            {/* Reviews Summary */}
            <div className="bg-card rounded-lg p-4 border border-border mb-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground mb-1">
                    {averageRating.toFixed(1)}
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={cn(
                          "w-4 h-4",
                          star <= Math.round(averageRating)
                            ? "text-yellow-500 fill-current"
                            : "text-muted-foreground"
                        )}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Based on {reviews.length} review{reviews.length !== 1 ? "s" : ""}
                  </p>
                </div>
                  <div className="flex-1 space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => {
                    const count = reviews.filter((r) => r.rating === rating).length;
                    const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                    return (
                      <div key={rating} className="flex items-center gap-2">
                        <span className="text-xs w-3">{rating}</span>
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground w-6 text-right">
                          {count}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-card rounded-lg p-4 border border-border"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">
                          {review.user.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold">{review.user}</p>
                          {review.verified && (
                            <Badge variant="outline" className="text-xs">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-1 mt-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={cn(
                                "w-3 h-3",
                                star <= review.rating
                                  ? "text-yellow-500 fill-current"
                                  : "text-muted-foreground"
                              )}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(review.date), "MMM d, yyyy")}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
          </div>

          {/* Desktop Sidebar - Booking Widget for Short-term */}
          {property.rentalType === "short-term" && (
            <div className="hidden md:block md:col-span-1 md:sticky md:top-20">
              <BookingWidget property={property} />
            </div>
          )}
        </div>

        {/* Similar Properties */}
        {similarProperties.length > 0 && (
          <div className="mt-6 md:mt-8">
            <h2 className="text-lg md:text-2xl font-bold text-foreground mb-4 md:mb-6">Similar Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {similarProperties.map((similarProperty: any) => (
                <PropertyCard key={similarProperty.id} {...similarProperty} />
              ))}
            </div>
          </div>
        )}

        {/* Agent Card */}
        <div className="bg-card rounded-xl p-4 md:p-6 border border-border mt-6">
          <div className="flex items-start gap-4 mb-4">
            <img
              src={property.agent.image}
              alt={property.agent.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-foreground">{property.agent.name}</h3>
                {property.agent.verified && (
                  <Badge variant="outline" className="text-xs">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium">{property.agent.rating}</span>
                <span className="text-xs text-muted-foreground">
                  ({property.agent.listings} listings)
                </span>
              </div>
              <Link
                to={`/agents/${property.agent.id}`}
                className="text-xs text-primary hover:underline"
              >
                View all listings
              </Link>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => handleContactAgent("phone")}
            >
              <Phone className="w-4 h-4 mr-2" />
              Call
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => handleContactAgent("whatsapp")}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp
            </Button>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Action Bar - Only for long-term rentals (Mobile only) */}
      {property.rentalType === "long-term" && (
        <div className="md:hidden sticky bottom-0 bg-background/95 backdrop-blur-sm border-t border-border px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Price</p>
              <p className="text-lg font-bold text-primary">
                N${property.price.toLocaleString()}/mo
              </p>
            </div>
            <Dialog open={scheduleOpen} onOpenChange={setScheduleOpen}>
              <DialogTrigger asChild>
                <Button
                  className="flex-1"
                  onClick={handleScheduleViewing}
                >
                  Schedule Viewing
                </Button>
              </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Schedule a Viewing</DialogTitle>
                <DialogDescription>
                  Choose a date and time that works for you. The agent will confirm the appointment.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Select Date *</Label>
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date()}
                    className="rounded-md border"
                  />
                  {selectedDate && (
                    <p className="text-sm text-muted-foreground">
                      Selected: {format(selectedDate, "PPP")}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Select Time *</Label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a time" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableTimeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Your Name *</Label>
                  <Input
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email *</Label>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Phone Number *</Label>
                  <Input
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Additional Notes (Optional)</Label>
                  <Textarea
                    placeholder="Any specific questions or requests..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setScheduleOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button onClick={handleSubmitSchedule} className="flex-1">
                  Confirm Viewing
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      )}
    </AppLayout>
  );
};

export default PropertyView;