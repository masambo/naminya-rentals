import { useState } from "react";
import { cn } from "@/lib/utils";
import { Home, Building2, DoorOpen, Building, Warehouse, Hotel, TreePine, Store } from "lucide-react";

const categories = [
  { id: "all", label: "All", icon: Building2 },
  { id: "rooms", label: "Rooms", icon: DoorOpen },
  { id: "houses", label: "Houses", icon: Home },
  { id: "apartments", label: "Apartments", icon: Building },
  { id: "mbashu", label: "Mbashu", icon: Warehouse },
  { id: "commercial", label: "Commercial", icon: Store },
  // Short-term categories
  { id: "guesthouses", label: "Guest Houses", icon: Hotel },
  { id: "lodges-camps", label: "Lodges & Camps", icon: TreePine },
];

const CategoryTabs = () => {
  const [active, setActive] = useState("all");

  return (
    <div className="px-4 py-2 md:px-0 md:py-4">
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1 md:flex-wrap md:overflow-x-visible md:justify-center">
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
