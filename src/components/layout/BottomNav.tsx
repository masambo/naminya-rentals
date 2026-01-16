import { Home, Search, Plus, Users, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Search, label: "Search", path: "/search" },
  { icon: Plus, label: "List", path: "/add-listing", isCenter: true },
  { icon: Users, label: "Agents", path: "/agents" },
  { icon: User, label: "Profile", path: "/profile", isIconOnly: true },
];

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-effect border-t border-border">
      <div className="max-w-md mx-auto px-2 py-3 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            if (item.isCenter) {
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative -mt-6"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-primary shadow-lifted flex items-center justify-center transition-transform duration-200 hover:scale-105 active:scale-95">
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <span className="text-xs mt-1 font-medium text-muted-foreground">
                      {item.label}
                    </span>
                  </div>
                </Link>
              );
            }

            if (item.isIconOnly) {
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex flex-col items-center py-2 px-4 rounded-xl transition-all duration-200",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <div
                    className={cn(
                      "p-2.5 rounded-xl transition-all duration-200",
                      isActive && "bg-primary/10"
                    )}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                </Link>
              );
            }

            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center py-2 px-4 rounded-xl transition-all duration-200",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <div
                  className={cn(
                    "p-2.5 rounded-xl transition-all duration-200",
                    isActive && "bg-primary/10"
                  )}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs mt-0.5 font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
