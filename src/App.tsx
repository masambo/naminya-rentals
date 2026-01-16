import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "@/components/ErrorBoundary";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Search from "./pages/Search";
import PropertyView from "./pages/PropertyView";
import Agents from "./pages/Agents";
import AgentView from "./pages/AgentView";
import AddListing from "./pages/AddListing";
import Profile from "./pages/Profile";
import BecomeAgent from "./pages/BecomeAgent";
import SavedProperties from "./pages/SavedProperties";
import MyListings from "./pages/MyListings";
import Messages from "./pages/Messages";
import Chat from "./pages/Chat";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import NearbyScan from "./pages/NearbyScan";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/search" element={<Search />} />
              <Route path="/property/:id" element={<PropertyView />} />
              <Route path="/agents" element={<Agents />} />
              <Route path="/agents/:id" element={<AgentView />} />
              <Route path="/add-listing" element={<AddListing />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/become-agent" element={<BecomeAgent />} />
              <Route path="/saved" element={<SavedProperties />} />
              <Route path="/saved-properties" element={<SavedProperties />} />
              <Route path="/my-listings" element={<MyListings />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/messages/:id" element={<Chat />} />
              <Route path="/messages/new" element={<Chat />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/help" element={<Help />} />
              <Route path="/nearby" element={<NearbyScan />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
