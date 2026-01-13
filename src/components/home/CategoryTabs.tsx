import { useState } from "react";
import { cn } from "@/lib/utils";
import { Home, Building2, DoorOpen, Building } from "lucide-react";

const categories = [
  { id: "all", label: "All", icon: Building2 },
  { id: "rooms", label: "Rooms", icon: DoorOpen },
  { id: "houses", label: "Houses", icon: Home },
  { id: "apartments", label: "Apartments", icon: Building },
];

const CategoryTabs = () => {
  const [active, setActive] = useState("all");

  return (
    <div className="px-4 py-2">
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = active === category.id;

          return (
            <button
              key={category.id}
              onClick={() => setActive(category.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
              )}
            >
              <Icon className="w-4 h-4" />
              {category.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryTabs;
