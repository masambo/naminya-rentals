import { useNavigate } from "react-router-dom";
import { Home, Building, DoorOpen, Warehouse, Hotel, TreePine, Building2, Store } from "lucide-react";
import { cn } from "@/lib/utils";

const accommodationTypes = [
  { id: "houses", label: "Houses", icon: Home, color: "text-blue-600" },
  { id: "apartments", label: "Apartments", icon: Building, color: "text-green-600" },
  { id: "rooms", label: "Rooms", icon: DoorOpen, color: "text-purple-600" },
  { id: "guesthouses", label: "Guest Houses", icon: Hotel, color: "text-orange-600" },
  { id: "hotels", label: "Hotels", icon: Building2, color: "text-red-600" },
  { id: "lodges-camps", label: "Lodges & Camps", icon: TreePine, color: "text-emerald-600" },
  { id: "commercial", label: "Commercial", icon: Store, color: "text-teal-600" },
  { id: "mbashu", label: "Ghetto/Mbashu", icon: Warehouse, color: "text-indigo-600" },
];

const AccommodationTypes = () => {
  const navigate = useNavigate();

  const handleTypeClick = (typeId: string) => {
    navigate(`/search?type=${typeId}`);
  };

  return (
    <div className="px-4 py-4 md:px-0 md:py-6">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-2 md:gap-3">
        {accommodationTypes.map((type) => {
          const Icon = type.icon;
          return (
            <button
              key={type.id}
              onClick={() => handleTypeClick(type.id)}
              className={cn(
                "flex flex-col items-center justify-center gap-1.5 p-2 md:p-2.5 bg-card rounded-lg border border-border transition-all duration-200 hover:border-primary hover:shadow-card group"
              )}
            >
              <div className={cn(
                "w-8 h-8 md:w-9 md:h-9 rounded-lg bg-primary/10 flex items-center justify-center transition-all duration-200 group-hover:bg-primary/20 group-hover:scale-110",
                type.color
              )}>
                <Icon className={cn("w-4 h-4 md:w-4 md:h-4", type.color)} />
              </div>
              <span className="text-xs md:text-sm font-medium text-foreground">
                {type.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AccommodationTypes;
