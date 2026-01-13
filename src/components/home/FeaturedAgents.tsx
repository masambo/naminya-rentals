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
    <section className="px-4 py-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-foreground">Verified Agents</h2>
        <Link
          to="/agents"
          className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          View all
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
        {agents.map((agent) => (
          <Link
            key={agent.id}
            to={`/agents/${agent.id}`}
            className="flex flex-col items-center shrink-0"
          >
            <div className="relative mb-2">
              <img
                src={agent.image}
                alt={agent.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
              />
              {agent.verified && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                  <BadgeCheck className="w-3 h-3 text-primary-foreground" />
                </div>
              )}
            </div>
            <span className="text-xs font-medium text-foreground">{agent.name}</span>
            <span className="text-[10px] text-muted-foreground">{agent.listings} listings</span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedAgents;
