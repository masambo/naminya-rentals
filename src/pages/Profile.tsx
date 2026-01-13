import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import {
  User,
  Settings,
  Heart,
  Home,
  MessageCircle,
  Bell,
  HelpCircle,
  LogOut,
  ChevronRight,
  BadgeCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

const menuItems = [
  { icon: Heart, label: "Saved Properties", path: "/saved", count: 5 },
  { icon: Home, label: "My Listings", path: "/my-listings", count: 2 },
  { icon: MessageCircle, label: "Messages", path: "/messages", count: 3 },
  { icon: Bell, label: "Notifications", path: "/notifications" },
  { icon: Settings, label: "Settings", path: "/settings" },
  { icon: HelpCircle, label: "Help & Support", path: "/help" },
];

const Profile = () => {
  return (
    <AppLayout>
      <div className="px-4 pt-6 pb-6">
        {/* Profile Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-10 h-10 text-primary" />
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-foreground">Guest User</h2>
            <p className="text-sm text-muted-foreground">Sign in to save properties</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Button variant="hero" size="lg" className="w-full">
            Sign In
          </Button>
          <Button variant="outline" size="lg" className="w-full">
            Register
          </Button>
        </div>

        {/* Become Agent CTA */}
        <Link to="/become-agent" className="block mb-6">
          <div className="bg-secondary rounded-2xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <BadgeCheck className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">Become an Agent</h3>
              <p className="text-xs text-muted-foreground">
                Apply to become a verified rental agent
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
        </Link>

        {/* Menu Items */}
        <div className="bg-card rounded-2xl overflow-hidden shadow-card">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-4 px-4 py-4 hover:bg-muted/50 transition-colors border-b border-border last:border-0"
              >
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                  <Icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <span className="flex-1 font-medium text-foreground">{item.label}</span>
                {item.count && (
                  <span className="bg-primary text-primary-foreground text-xs font-semibold px-2 py-0.5 rounded-full">
                    {item.count}
                  </span>
                )}
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </Link>
            );
          })}
        </div>

        {/* Logout */}
        <button className="flex items-center gap-4 px-4 py-4 mt-4 w-full rounded-xl hover:bg-destructive/5 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
            <LogOut className="w-5 h-5 text-destructive" />
          </div>
          <span className="font-medium text-destructive">Sign Out</span>
        </button>

        {/* App Version */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          Ndunda v1.0.0 • Made with ❤️ in Namibia
        </p>
      </div>
    </AppLayout>
  );
};

export default Profile;
