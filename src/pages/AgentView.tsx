import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import {
  ArrowLeft,
  BadgeCheck,
  Star,
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  Home,
  Calendar,
  CheckCircle2,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import PropertyCard from "@/components/home/PropertyCard";

import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";

// Mock agent data
const mockAgents: Record<string, any> = {
  "1": {
    id: "1",
    name: "Sarah Muller",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
    listingsCount: 12,
    rating: 4.9,
    reviews: 28,
    verified: true,
    speciality: "Apartments & Houses",
    location: "Windhoek Central",
    phone: "+264 81 123 4567",
    email: "sarah.m@naminya.com",
    joinedDate: "2024-01-15",
    bio: "With over 5 years of experience in the Windhoek rental market, I specialize in helping clients find their perfect home. I'm committed to providing exceptional service and making the rental process as smooth as possible.",
    languages: ["English", "Afrikaans", "German"],
    responseTime: "Usually responds within 2 hours",
    listings: [
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
        rentalType: "long-term" as const,
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
        rentalType: "long-term" as const,
      },
    ],
    agentReviews: [
      {
        id: "1",
        user: "John D.",
        rating: 5,
        date: "2026-01-10",
        comment: "Sarah was extremely helpful and professional. She found us the perfect apartment within a week!",
        property: "Modern 2BR Apartment",
        verified: true,
      },
      {
        id: "2",
        user: "Maria K.",
        rating: 5,
        date: "2025-12-20",
        comment: "Best agent I've worked with. Very responsive and knowledgeable about the area.",
        property: "Spacious Family House",
        verified: true,
      },
      {
        id: "3",
        user: "Peter S.",
        rating: 4,
        date: "2025-11-15",
        comment: "Great service, helped me find a good place. Would recommend!",
        property: "Cozy Studio",
        verified: false,
      },
    ],
  },
  "2": {
    id: "2",
    name: "John Kaputjaza",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    listingsCount: 8,
    rating: 4.7,
    reviews: 15,
    verified: true,
    speciality: "Rooms & Bachelor Flats",
    location: "Khomasdal",
    phone: "+264 81 234 5678",
    email: "john.k@naminya.com",
    joinedDate: "2024-03-20",
    bio: "Specializing in affordable student and bachelor accommodation in Khomasdal and surrounding areas.",
    languages: ["English", "Oshiwambo"],
    responseTime: "Usually responds within 1 hour",
    listings: [
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
        rentalType: "long-term" as const,
      },
    ],
    agentReviews: [
      {
        id: "1",
        user: "Student A.",
        rating: 5,
        date: "2026-01-05",
        comment: "Found me a great room near campus. Very affordable!",
        property: "Cozy Student Room",
        verified: true,
      },
    ],
  },
  "3": {
    id: "3",
    name: "Maria Nghidishange",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    listingsCount: 15,
    rating: 5.0,
    reviews: 42,
    verified: true,
    speciality: "Family Homes",
    location: "Kleine Kuppe",
    phone: "+264 81 345 6789",
    email: "maria.n@naminya.com",
    joinedDate: "2023-06-10",
    bio: "Experienced agent specializing in family homes and luxury properties in Kleine Kuppe and Olympia.",
    languages: ["English", "Afrikaans", "Oshiwambo"],
    responseTime: "Usually responds within 30 minutes",
    listings: [
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
        rentalType: "long-term" as const,
      },
    ],
    agentReviews: [
      {
        id: "1",
        user: "Family M.",
        rating: 5,
        date: "2025-12-28",
        comment: "Maria helped us find our dream home. Professional and caring throughout the process.",
        property: "Spacious Family House",
        verified: true,
      },
    ],
  },
  "4": {
    id: "4",
    name: "David Tjiveze",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
    listingsCount: 6,
    rating: 4.8,
    reviews: 11,
    verified: true,
    speciality: "Student Accommodation",
    location: "Pioneerspark",
    phone: "+264 81 456 7890",
    email: "david.t@naminya.com",
    joinedDate: "2024-08-01",
    bio: "Focused on helping students find safe and affordable accommodation in Windhoek.",
    languages: ["English", "Oshiwambo"],
    responseTime: "Usually responds within 3 hours",
    listings: [
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
        rentalType: "long-term" as const,
      },
    ],
    agentReviews: [
      {
        id: "1",
        user: "Student B.",
        rating: 5,
        date: "2025-11-10",
        comment: "Great help finding student accommodation. Very understanding of student budgets.",
        property: "Bachelor Flat",
        verified: true,
      },
    ],
  },
};

const AgentView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const agent = mockAgents[id || ""];

  if (!agent) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <h2 className="text-2xl font-bold text-foreground mb-2">Agent Not Found</h2>
          <p className="text-muted-foreground mb-6">The agent you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/agents")}>Back to Agents</Button>
        </div>
      </AppLayout>
    );
  }

  const averageRating = agent.agentReviews.length > 0
    ? agent.agentReviews.reduce((acc: number, review: any) => acc + review.rating, 0) / agent.agentReviews.length
    : 0;

  const handleContact = (method: "phone" | "email" | "whatsapp") => {
    if (method === "phone") {
      window.location.href = `tel:${agent.phone}`;
    } else if (method === "email") {
      window.location.href = `mailto:${agent.email}?subject=Inquiry about properties`;
    } else if (method === "whatsapp") {
      // Format phone number for WhatsApp (remove spaces, +, etc.)
      const phoneNumber = agent.phone.replace(/\s+/g, "").replace(/\+/g, "");
      const message = encodeURIComponent(`Hi ${agent.name}! I'm interested in your properties. Can you help me?`);
      window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${agent.name} - Rental Agent`,
          text: `Check out ${agent.name}'s listings on Naminya Rentals`,
          url,
        });
        toast.success("Shared successfully");
      } catch (error) {
        // User cancelled
      }
    } else {
      navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard");
    }
  };

  return (
    <AppLayout>
      {/* Header - Mobile Only */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
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

      {/* Agent Profile */}
      <div className="px-4 py-6 md:px-0 md:py-8 space-y-6 md:container md:max-w-7xl md:mx-auto">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
          <div className="flex items-start gap-4 md:flex-col">
            <div className="relative">
              <img
                src={agent.image}
                alt={agent.name}
                className="w-24 h-24 md:w-40 md:h-40 rounded-2xl object-cover border-2 border-primary/20"
              />
              {agent.verified && (
                <div className="absolute -bottom-1 -right-1 w-7 h-7 md:w-10 md:h-10 bg-primary rounded-full flex items-center justify-center border-2 border-background">
                  <BadgeCheck className="w-4 h-4 md:w-6 md:h-6 text-primary-foreground" />
                </div>
              )}
            </div>
            {/* Desktop Share Button */}
            <div className="hidden md:block">
              <Button
                variant="outline"
                size="icon"
                onClick={handleShare}
                className="rounded-full"
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground">{agent.name}</h1>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <Star className="w-5 h-5 md:w-6 md:h-6 text-yellow-500 fill-current" />
              <span className="font-semibold text-lg md:text-xl">{agent.rating}</span>
              <span className="text-sm md:text-base text-muted-foreground">
                ({agent.reviews} review{agent.reviews !== 1 ? "s" : ""})
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground text-sm md:text-base mb-4">
              <MapPin className="w-4 h-4 md:w-5 md:h-5" />
              <span>{agent.location}</span>
            </div>
            {/* Desktop Contact Buttons */}
            <div className="hidden md:flex gap-3">
              <Button
                variant="default"
                className="flex-1"
                onClick={() => handleContact("phone")}
              >
                <Phone className="w-4 h-4 mr-2" />
                Call
              </Button>
              <Button
                variant="default"
                className="flex-1"
                onClick={() => handleContact("whatsapp")}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 md:gap-6">
          <div className="bg-card rounded-xl p-4 md:p-6 border border-border text-center">
            <p className="text-3xl md:text-4xl font-bold text-primary">{agent.listingsCount}</p>
            <p className="text-xs md:text-sm text-muted-foreground mt-2">Listings</p>
          </div>
          <div className="bg-card rounded-xl p-4 md:p-6 border border-border text-center">
            <p className="text-3xl md:text-4xl font-bold text-primary">{agent.rating}</p>
            <p className="text-xs md:text-sm text-muted-foreground mt-2">Rating</p>
          </div>
          <div className="bg-card rounded-xl p-4 md:p-6 border border-border text-center">
            <p className="text-3xl md:text-4xl font-bold text-primary">{agent.reviews}</p>
            <p className="text-xs md:text-sm text-muted-foreground mt-2">Reviews</p>
          </div>
        </div>

        {/* Contact Buttons - Mobile Only */}
        <div className="flex gap-3 md:hidden">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => handleContact("phone")}
          >
            <Phone className="w-4 h-4 mr-2" />
            Call
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => handleContact("whatsapp")}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            WhatsApp
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:max-w-md">
            <TabsTrigger value="about" className="text-sm md:text-base">About</TabsTrigger>
            <TabsTrigger value="listings" className="text-sm md:text-base">
              Listings ({agent.listings.length})
            </TabsTrigger>
            <TabsTrigger value="reviews" className="text-sm md:text-base">
              Reviews ({agent.agentReviews.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="mt-6 space-y-4 md:space-y-6">
            <div className="bg-card rounded-xl p-4 md:p-6 border border-border">
              <h3 className="font-semibold text-foreground mb-3 md:text-lg">Bio</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {agent.bio}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="bg-card rounded-xl p-4 md:p-6 border border-border">
                <h3 className="font-semibold text-foreground mb-3 md:text-lg">Speciality</h3>
                <Badge className="bg-primary/10 text-primary text-sm md:text-base px-3 py-1">
                  {agent.speciality}
                </Badge>
              </div>

              <div className="bg-card rounded-xl p-4 md:p-6 border border-border">
                <h3 className="font-semibold text-foreground mb-3 md:text-lg">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {agent.languages.map((lang: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-sm">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="bg-card rounded-xl p-4 md:p-6 border border-border">
                <h3 className="font-semibold text-foreground mb-2 md:text-lg">Response Time</h3>
                <p className="text-sm md:text-base text-muted-foreground">{agent.responseTime}</p>
              </div>

              <div className="bg-card rounded-xl p-4 md:p-6 border border-border">
                <h3 className="font-semibold text-foreground mb-2 md:text-lg">Member Since</h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  {new Date(agent.joinedDate).toLocaleDateString('en-US', { 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="listings" className="mt-6">
            {agent.listings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {agent.listings.map((listing: any) => (
                  <PropertyCard key={listing.id} {...listing} rentalType={listing.rentalType || "long-term"} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 md:py-16">
                <Home className="w-16 h-16 md:w-20 md:h-20 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-sm md:text-base text-muted-foreground">No listings available</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            {/* Reviews Summary */}
            <div className="bg-card rounded-xl p-4 md:p-6 border border-border mb-6">
              <div className="flex items-center gap-4">
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
                    Based on {agent.agentReviews.length} review{agent.agentReviews.length !== 1 ? "s" : ""}
                  </p>
                </div>
                <div className="flex-1 space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => {
                    const count = agent.agentReviews.filter((r: any) => r.rating === rating).length;
                    const percentage = agent.agentReviews.length > 0 ? (count / agent.agentReviews.length) * 100 : 0;
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
              {agent.agentReviews.map((review: any) => (
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
                      {new Date(review.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </span>
                  </div>
                  {review.property && (
                    <p className="text-xs text-muted-foreground mb-2">
                      Review for: <span className="font-medium">{review.property}</span>
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default AgentView;
