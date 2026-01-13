import { Bell, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="px-4 pt-4 pb-2">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1 text-muted-foreground text-sm mb-0.5">
            <MapPin className="w-3.5 h-3.5" />
            <span>Current Location</span>
          </div>
          <h1 className="text-lg font-bold text-foreground">Windhoek, Namibia</h1>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
          </Button>
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-bold text-primary">JD</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
