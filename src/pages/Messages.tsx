import AppLayout from "@/components/layout/AppLayout";
import { ArrowLeft, MessageCircle, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const contacts = [
  {
    id: "1",
    name: "Sarah Muller",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    phone: "+264811234567",
    isAgent: true,
  },
  {
    id: "2",
    name: "John Kaputjaza",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    phone: "+264812345678",
    isAgent: true,
  },
  {
    id: "3",
    name: "Maria Nghidishange",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    phone: "+264813456789",
    isAgent: true,
  },
  {
    id: "4",
    name: "David Tjiveze",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    phone: "+264814567890",
    isAgent: true,
  },
];

const Messages = () => {
  const handleWhatsApp = (phone: string, name: string) => {
    const phoneNumber = phone.replace(/\s+/g, "").replace(/\+/g, "");
    const message = encodeURIComponent(`Hi ${name}! I'm interested in your properties.`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <AppLayout>
      <div className="px-4 pt-4 pb-6">
        <Link to="/profile" className="inline-flex items-center gap-2 text-muted-foreground mb-4">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back</span>
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Contact Agents</h1>
            <p className="text-sm text-muted-foreground">Reach out via WhatsApp or call</p>
          </div>
        </div>

        {contacts.length === 0 ? (
          <div className="text-center py-12">
            <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-foreground mb-2">No contacts yet</h3>
            <p className="text-sm text-muted-foreground">
              Contact agents or property owners to start a conversation
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="bg-card rounded-xl p-4 border border-border hover:shadow-lifted transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  {contact.avatar ? (
                    <img
                      src={contact.avatar}
                      alt={contact.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-sm font-semibold text-muted-foreground">
                        {contact.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground text-sm">{contact.name}</span>
                      {contact.isAgent && (
                        <span className="bg-primary/10 text-primary text-[10px] font-semibold px-1.5 py-0.5 rounded">
                          Agent
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{contact.phone}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleWhatsApp(contact.phone, contact.name)}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleCall(contact.phone)}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Messages;
