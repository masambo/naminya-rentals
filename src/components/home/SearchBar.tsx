import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

const SearchBar = () => {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <div className="flex-1 flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3 shadow-card transition-shadow hover:shadow-soft focus-within:ring-2 focus-within:ring-primary/20">
        <Search className="w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search rooms, houses..."
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>
      <Button variant="secondary" size="icon" className="h-12 w-12 rounded-xl shrink-0">
        <SlidersHorizontal className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default SearchBar;
