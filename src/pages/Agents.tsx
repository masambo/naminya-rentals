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
      <div className="px-4 pt-4 pb-2 md:px-0 md:pt-8 md:pb-4 md:container md:max-w-7xl md:mx-auto">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-2">Verified Agents</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Trusted professionals to help you find rentals
          </p>
        </div>

        <Link
          to="/become-agent"
          className="block bg-secondary rounded-xl p-4 md:p-6 mb-6 md:mb-8 hover:bg-secondary/80 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground text-sm md:text-base">Become an Agent</h3>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">
                Join our network of verified rental agents
              </p>
            </div>
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-primary" />
          </div>
        </Link>
      </div>

      {/* Mobile Layout - Vertical List */}
      <div className="px-4 pb-6 md:hidden space-y-4">
        {agents.map((agent, index) => (
          <div
            key={agent.id}
            className="bg-card rounded-2xl p-4 shadow-card animate-slide-up hover:shadow-lifted transition-all"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex gap-4">
              <Link to={`/agents/${agent.id}`} className="relative shrink-0">
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
              </Link>

              <div className="flex-1 min-w-0">
                <Link to={`/agents/${agent.id}`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-foreground hover:text-primary transition-colors">{agent.name}</h3>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {agent.speciality}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 bg-warning/10 text-warning px-2.5 py-1.5 rounded-lg">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-semibold">{agent.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                    <span>{agent.listings} listings</span>
                    <span>{agent.reviews} reviews</span>
                    <span>{agent.location}</span>
                  </div>
                </Link>

                <div className="flex gap-2 mt-3">
                  <Button 
                    variant="soft" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => window.location.href = `tel:+264811234567`}
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Call
                  </Button>
                  <Link to={`/agents/${agent.id}`} className="flex-1">
                    <Button variant="default" size="sm" className="w-full">
                      <MessageCircle className="w-3.5 h-3.5" />
                      View Profile
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Layout - Grid */}
      <div className="hidden md:block px-0 pb-8 md:container md:max-w-7xl md:mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {agents.map((agent, index) => (
            <div
              key={agent.id}
              className="bg-card rounded-2xl p-6 shadow-card hover:shadow-lifted transition-all border border-border"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col">
                <div className="flex items-start gap-4 mb-4">
                  <Link to={`/agents/${agent.id}`} className="relative shrink-0">
                    <img
                      src={agent.image}
                      alt={agent.name}
                      className="w-24 h-24 md:w-28 md:h-28 rounded-xl object-cover border-2 border-primary/20"
                    />
                    {agent.verified && (
                      <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-primary rounded-full flex items-center justify-center border-2 border-background">
                        <BadgeCheck className="w-4 h-4 text-primary-foreground" />
                      </div>
                    )}
                  </Link>

                  <div className="flex-1 min-w-0">
                    <Link to={`/agents/${agent.id}`}>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-lg text-foreground hover:text-primary transition-colors mb-1">{agent.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {agent.speciality}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 bg-warning/10 text-warning px-3 py-1.5 rounded-lg">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="text-sm font-semibold">{agent.rating}</span>
                        </div>
                      </div>
                    </Link>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{agent.listings} listings</span>
                      <span>•</span>
                      <span>{agent.reviews} reviews</span>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {agent.location}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-4">
                  <Button 
                    variant="outline" 
                    size="default" 
                    className="flex-1"
                    onClick={() => window.location.href = `tel:+264811234567`}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </Button>
                  <Link to={`/agents/${agent.id}`} className="flex-1">
                    <Button variant="default" size="default" className="w-full">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      View Profile
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Agents;
