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
  { id: "mbashu", label: "Mbashu", icon: Warehouse, color: "text-indigo-600" },
];

const AccommodationTypes = () => {
  const navigate = useNavigate();

  const handleTypeClick = (typeId: string) => {
    navigate(`/search?type=${typeId}`);
  };

  return (
    <div className="px-4 py-4 md:px-0 md:py-6">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3 md:gap-4">
        {accommodationTypes.map((type) => {
          const Icon = type.icon;
          return (
            <button
              key={type.id}
              onClick={() => handleTypeClick(type.id)}
              className={cn(
                "flex flex-col items-center justify-center gap-2 p-3 md:p-4 bg-card rounded-xl border-2 border-border transition-all duration-200 hover:border-primary hover:shadow-card group"
              )}
            >
              <div className={cn(
                "w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center transition-all duration-200 group-hover:bg-primary/20 group-hover:scale-110",
                type.color
              )}>
                <Icon className={cn("w-5 h-5 md:w-6 md:h-6", type.color)} />
              </div>
              <span className="text-sm md:text-base font-semibold text-foreground">
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
