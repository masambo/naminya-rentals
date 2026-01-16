import { Search, SlidersHorizontal, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center gap-3 px-4 py-3">
      <div className="flex-1 flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3 shadow-card transition-shadow hover:shadow-soft focus-within:ring-2 focus-within:ring-primary/20">
        <Search className="w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search rooms, houses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>
      <div className="flex gap-2 shrink-0">
        <Button 
          type="button"
          variant="secondary" 
          size="icon" 
          className="h-12 w-12 rounded-xl"
          onClick={() => navigate("/nearby")}
          title="Scan nearby properties"
        >
          <Navigation className="w-5 h-5" />
        </Button>
        <Button 
          type="button"
          variant="secondary" 
          size="icon" 
          className="h-12 w-12 rounded-xl"
          onClick={() => navigate("/search")}
          title="Filters"
        >
          <SlidersHorizontal className="w-5 h-5" />
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
