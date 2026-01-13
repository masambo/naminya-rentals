import AppLayout from "@/components/layout/AppLayout";
import { ArrowLeft, MessageCircle, Search } from "lucide-react";
import { Link } from "react-router-dom";

const conversations = [
  {
    id: "1",
    name: "Sarah Muller",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    lastMessage: "Hi! Is the apartment still available?",
    time: "2m ago",
    unread: 2,
    isAgent: true,
  },
  {
    id: "2",
    name: "John Kaputjaza",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    lastMessage: "I can arrange a viewing for tomorrow",
    time: "1h ago",
    unread: 0,
    isAgent: true,
  },
  {
    id: "3",
    name: "Property Owner",
    avatar: null,
    lastMessage: "Thank you for your interest!",
    time: "Yesterday",
    unread: 1,
    isAgent: false,
  },
];

const Messages = () => {
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
            <h1 className="text-xl font-bold text-foreground">Messages</h1>
            <p className="text-sm text-muted-foreground">{conversations.length} conversations</p>
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3 mb-4">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search messages..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>

        {conversations.length === 0 ? (
          <div className="text-center py-12">
            <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-foreground mb-2">No messages yet</h3>
            <p className="text-sm text-muted-foreground">
              Contact landlords or agents to start a conversation
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {conversations.map((convo) => (
              <Link
                key={convo.id}
                to={`/messages/${convo.id}`}
                className="flex items-center gap-3 p-3 bg-card rounded-xl hover:bg-muted/50 transition-colors"
              >
                {convo.avatar ? (
                  <img
                    src={convo.avatar}
                    alt={convo.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-sm font-semibold text-muted-foreground">
                      {convo.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground text-sm">{convo.name}</span>
                      {convo.isAgent && (
                        <span className="bg-primary/10 text-primary text-[10px] font-semibold px-1.5 py-0.5 rounded">
                          Agent
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">{convo.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-1">{convo.lastMessage}</p>
                </div>
                {convo.unread > 0 && (
                  <span className="w-5 h-5 bg-primary text-primary-foreground text-xs font-semibold rounded-full flex items-center justify-center">
                    {convo.unread}
                  </span>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Messages;
