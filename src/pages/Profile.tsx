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
  Mail,
  Phone,
  Edit,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useUserProfile, useUserStats } from "@/hooks/useUserProfile";
import { toast } from "sonner";
import { useState } from "react";
import EditProfileDialog from "@/components/profile/EditProfileDialog";

const menuItems = [
  { icon: Heart, label: "Saved Properties", path: "/saved-properties", countKey: "savedProperties" as const },
  { icon: Home, label: "My Listings", path: "/my-listings", countKey: "listings" as const },
  { icon: MessageCircle, label: "Contact Agents", path: "/messages" },
  { icon: Bell, label: "Notifications", path: "/notifications" },
  { icon: Settings, label: "Settings", path: "/settings" },
  { icon: HelpCircle, label: "Help & Support", path: "/help" },
];

const Profile = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const { profile, loading: profileLoading, refetch: refetchProfile } = useUserProfile(user?.id);
  const { stats, refetch: refetchStats } = useUserStats(user?.id);
  const navigate = useNavigate();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await signOut();
      toast.success("Signed out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to sign out");
      console.error("Sign out error:", error);
    } finally {
      setIsSigningOut(false);
    }
  };

  const displayName = profile?.full_name || user?.email?.split("@")[0] || "Guest User";
  const userEmail = user?.email || "";
  const userPhone = profile?.phone || "";
  const avatarUrl = profile?.avatar_url || "";

  if (authLoading || profileLoading) {
    return (
      <AppLayout>
        <div className="px-4 pt-6 pb-6">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="px-4 pt-6 pb-6 md:px-0 md:pt-8 md:pb-8 md:container md:max-w-4xl md:mx-auto">
        {user ? (
          <>
            {/* Profile Header */}
            <div className="flex items-center gap-4 mb-6 md:mb-8">
              <div className="relative">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={displayName}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-2 border-primary/20"
                  />
                ) : (
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20">
                    <User className="w-10 h-10 md:w-12 md:h-12 text-primary" />
                  </div>
                )}
                {profile?.role === "agent" && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 md:w-7 md:h-7 bg-primary rounded-full flex items-center justify-center border-2 border-background">
                    <BadgeCheck className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl md:text-2xl font-bold text-foreground">{displayName}</h2>
                  {profile?.role === "agent" && (
                    <BadgeCheck className="w-5 h-5 text-primary" />
                  )}
                </div>
                {userEmail && (
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-1">
                    <Mail className="w-3.5 h-3.5" />
                    <span>{userEmail}</span>
                  </div>
                )}
                {userPhone && (
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Phone className="w-3.5 h-3.5" />
                    <span>{userPhone}</span>
                  </div>
                )}
              </div>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full"
                onClick={() => setIsEditDialogOpen(true)}
              >
                <Edit className="w-4 h-4" />
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
              <div className="bg-card rounded-xl p-3 md:p-4 border border-border text-center">
                <p className="text-2xl md:text-3xl font-bold text-primary">{stats.savedProperties}</p>
                <p className="text-xs md:text-sm text-muted-foreground mt-1">Saved</p>
              </div>
              <div className="bg-card rounded-xl p-3 md:p-4 border border-border text-center">
                <p className="text-2xl md:text-3xl font-bold text-primary">{stats.listings}</p>
                <p className="text-xs md:text-sm text-muted-foreground mt-1">Listings</p>
              </div>
              <div className="bg-card rounded-xl p-3 md:p-4 border border-border text-center">
                <p className="text-2xl md:text-3xl font-bold text-primary">{stats.bookings}</p>
                <p className="text-xs md:text-sm text-muted-foreground mt-1">Bookings</p>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Guest Profile Header */}
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
              <Link to="/login" className="w-full">
                <Button variant="hero" size="lg" className="w-full">
                  Sign In
                </Button>
              </Link>
              <Link to="/login" className="w-full">
                <Button variant="outline" size="lg" className="w-full">
                  Register
                </Button>
              </Link>
            </div>
          </>
        )}

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
          {menuItems.map((item) => {
            const Icon = item.icon;
            const count = item.countKey ? stats[item.countKey] : undefined;
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
                {count !== undefined && count > 0 && (
                  <span className="bg-primary text-primary-foreground text-xs font-semibold px-2 py-0.5 rounded-full">
                    {count}
                  </span>
                )}
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </Link>
            );
          })}
        </div>

        {/* Logout - Only show if user is logged in */}
        {user && (
          <button
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="flex items-center gap-4 px-4 py-4 mt-4 w-full rounded-xl hover:bg-destructive/5 transition-colors disabled:opacity-50"
          >
            <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
              <LogOut className="w-5 h-5 text-destructive" />
            </div>
            <span className="font-medium text-destructive">
              {isSigningOut ? "Signing out..." : "Sign Out"}
            </span>
          </button>
        )}

        {/* App Version */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          Ndunda v1.0.0 • Made with ❤️ in Namibia
        </p>

        {/* Edit Profile Dialog */}
        {user && profile && (
          <EditProfileDialog
            open={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
            profile={{
              full_name: profile.full_name,
              phone: profile.phone,
              avatar_url: profile.avatar_url,
            }}
            onProfileUpdate={() => {
              refetchProfile();
              refetchStats();
            }}
          />
        )}
      </div>
    </AppLayout>
  );
};

export default Profile;
