import AppLayout from "@/components/layout/AppLayout";
import { ArrowLeft, Home, MapPin, Eye, Edit, Trash2, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";

const myListings = [
  {
    id: "1",
    title: "Spacious Family House",
    location: "Olympia, Windhoek",
    price: 25000,
    image: property3,
    status: "active",
    views: 124,
  },
  {
    id: "2",
    title: "Bachelor Flat",
    location: "Eros, Windhoek",
    price: 5500,
    image: property4,
    status: "pending",
    views: 0,
  },
];

const MyListings = () => {
  return (
    <AppLayout>
      <div className="px-4 pt-4 pb-6">
        <Link to="/profile" className="inline-flex items-center gap-2 text-muted-foreground mb-4">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back</span>
        </Link>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Home className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">My Listings</h1>
              <p className="text-sm text-muted-foreground">{myListings.length} properties</p>
            </div>
          </div>
          <Button variant="default" size="icon" asChild>
            <Link to="/add-listing">
              <Plus className="w-5 h-5" />
            </Link>
          </Button>
        </div>

        {myListings.length === 0 ? (
          <div className="text-center py-12">
            <Home className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-foreground mb-2">No listings yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              List your first property for free
            </p>
            <Button variant="default" asChild>
              <Link to="/add-listing">Add Listing</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {myListings.map((listing) => (
              <div
                key={listing.id}
                className="bg-card rounded-xl overflow-hidden shadow-card animate-fade-in"
              >
                <div className="flex">
                  <div className="relative">
                    <img
                      src={listing.image}
                      alt={listing.title}
                      className="w-32 h-32 object-cover"
                    />
                    <span className={cn(
                      "absolute top-2 left-2 text-xs font-semibold px-2 py-1 rounded-full",
                      listing.status === "active" 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-warning text-foreground"
                    )}>
                      {listing.status === "active" ? "Active" : "Pending"}
                    </span>
                  </div>
                  <div className="flex-1 p-3">
                    <h3 className="font-semibold text-foreground text-sm line-clamp-1">
                      {listing.title}
                    </h3>
                    <div className="flex items-center gap-1 text-muted-foreground text-xs mt-1">
                      <MapPin className="w-3 h-3" />
                      <span className="line-clamp-1">{listing.location}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                      <Eye className="w-3 h-3" />
                      <span>{listing.views} views</span>
                    </div>
                    <p className="text-primary font-bold text-sm mt-2">
                      N${listing.price.toLocaleString()}/mo
                    </p>
                    <div className="flex gap-2 mt-3">
                      <button className="flex-1 flex items-center justify-center gap-1 py-2 bg-secondary text-secondary-foreground rounded-lg text-xs font-medium">
                        <Edit className="w-3 h-3" />
                        Edit
                      </button>
                      <button className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default MyListings;
