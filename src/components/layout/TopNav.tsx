import { Link, useLocation } from "react-router-dom";
import { Home, Search, PlusCircle, Heart, User, Menu, Bell, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const TopNav = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/search", label: "Search", icon: Search },
    { path: "/add-listing", label: "List Property", icon: PlusCircle },
    { path: "/agents", label: "Agents", icon: Users },
    { path: "/saved-properties", label: "Saved", icon: Heart },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/Ndunda_logo.png"
              alt="Ndunda"
              className="h-12 w-auto"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
              }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-2 px-5 py-2.5 rounded-lg text-base font-medium transition-colors",
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/notifications">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "relative w-11 h-11",
                  location.pathname === "/notifications" && "bg-primary/10 text-primary"
                )}
              >
                <Bell className="w-6 h-6" />
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-destructive rounded-full" />
              </Button>
            </Link>
            <Link to="/profile">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "w-11 h-11",
                  location.pathname === "/profile" && "bg-primary/10 text-primary"
                )}
              >
                <User className="w-6 h-6" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <nav className="flex flex-col gap-2 mt-8">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors",
                        active
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
                {/* Notifications in mobile menu */}
                <Link
                  to="/notifications"
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors",
                    location.pathname === "/notifications"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <Bell className="w-5 h-5" />
                  <span>Notifications</span>
                </Link>
                {/* Profile in mobile menu */}
                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors",
                    location.pathname === "/profile"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <User className="w-5 h-5" />
                  <span>Profile</span>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
