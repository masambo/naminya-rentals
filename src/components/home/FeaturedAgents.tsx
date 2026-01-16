import { BadgeCheck, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const agents = [
  {
    id: "1",
    name: "Sarah M.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    listings: 12,
    verified: true,
  },
  {
    id: "2",
    name: "John K.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    listings: 8,
    verified: true,
  },
  {
    id: "3",
    name: "Maria N.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    listings: 15,
    verified: true,
  },
  {
    id: "4",
    name: "David T.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    listings: 6,
    verified: true,
  },
];

const FeaturedAgents = () => {
  return (
    <section className="px-4 py-4 md:px-0 md:py-8">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground">Verified Agents</h2>
        <Link
          to="/agents"
          className="flex items-center gap-1.5 text-base md:text-lg font-medium text-primary hover:text-primary/80 transition-colors"
        >
          View all
          <ChevronRight className="w-5 h-5" />
        </Link>
      </div>

      <div className="flex gap-4 md:gap-6 overflow-x-auto hide-scrollbar pb-2">
        {agents.map((agent) => (
          <Link
            key={agent.id}
            to={`/agents/${agent.id}`}
            className="flex flex-col items-center shrink-0 hover:opacity-80 transition-opacity"
          >
            <div className="relative mb-3">
              <img
                src={agent.image}
                alt={agent.name}
                className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-2 border-primary/20"
              />
              {agent.verified && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 md:w-7 md:h-7 bg-primary rounded-full flex items-center justify-center border-2 border-background">
                  <BadgeCheck className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground" />
                </div>
              )}
            </div>
            <span className="text-sm md:text-base font-semibold text-foreground mb-1">{agent.name}</span>
            <span className="text-xs md:text-sm text-muted-foreground">{agent.listings} listings</span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedAgents;
