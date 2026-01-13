import AppLayout from "@/components/layout/AppLayout";
import { BadgeCheck, Star, Phone, MessageCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const agents = [
  {
    id: "1",
    name: "Sarah Muller",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
    listings: 12,
    rating: 4.9,
    reviews: 28,
    verified: true,
    speciality: "Apartments & Houses",
    location: "Windhoek Central",
  },
  {
    id: "2",
    name: "John Kaputjaza",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    listings: 8,
    rating: 4.7,
    reviews: 15,
    verified: true,
    speciality: "Rooms & Bachelor Flats",
    location: "Khomasdal",
  },
  {
    id: "3",
    name: "Maria Nghidishange",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    listings: 15,
    rating: 5.0,
    reviews: 42,
    verified: true,
    speciality: "Family Homes",
    location: "Kleine Kuppe",
  },
  {
    id: "4",
    name: "David Tjiveze",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
    listings: 6,
    rating: 4.8,
    reviews: 11,
    verified: true,
    speciality: "Student Accommodation",
    location: "Pioneerspark",
  },
];

const Agents = () => {
  return (
    <AppLayout>
      <div className="px-4 pt-4 pb-2">
        <h1 className="text-2xl font-bold text-foreground mb-1">Verified Agents</h1>
        <p className="text-sm text-muted-foreground mb-4">
          Trusted professionals to help you find rentals
        </p>

        <Link
          to="/become-agent"
          className="block bg-secondary rounded-xl p-4 mb-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground text-sm">Become an Agent</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Join our network of verified rental agents
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-primary" />
          </div>
        </Link>
      </div>

      <div className="px-4 pb-6 space-y-4">
        {agents.map((agent, index) => (
          <div
            key={agent.id}
            className="bg-card rounded-2xl p-4 shadow-card animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex gap-4">
              <div className="relative">
                <img
                  src={agent.image}
                  alt={agent.name}
                  className="w-20 h-20 rounded-xl object-cover"
                />
                {agent.verified && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <BadgeCheck className="w-3.5 h-3.5 text-primary-foreground" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">{agent.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {agent.speciality}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 bg-warning/10 text-warning px-2 py-1 rounded-lg">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="text-xs font-semibold">{agent.rating}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                  <span>{agent.listings} listings</span>
                  <span>{agent.reviews} reviews</span>
                  <span>{agent.location}</span>
                </div>

                <div className="flex gap-2 mt-3">
                  <Button variant="soft" size="sm" className="flex-1">
                    <Phone className="w-3.5 h-3.5" />
                    Call
                  </Button>
                  <Button variant="default" size="sm" className="flex-1">
                    <MessageCircle className="w-3.5 h-3.5" />
                    Message
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
};

export default Agents;
