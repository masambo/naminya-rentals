import { useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock agent data (should match AgentView)
const mockAgents: Record<string, any> = {
  "1": {
    id: "1",
    name: "Sarah Muller",
    phone: "+264 81 123 4567",
  },
  "2": {
    id: "2",
    name: "John Kaputjaza",
    phone: "+264 81 234 5678",
  },
  "3": {
    id: "3",
    name: "Maria Nghidishange",
    phone: "+264 81 345 6789",
  },
  "4": {
    id: "4",
    name: "David Tjiveze",
    phone: "+264 81 456 7890",
  },
};

const Chat = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const agentId = searchParams.get("agentId");
  const conversationId = id || agentId || "1";
  
  // Get agent data
  const agent = agentId ? mockAgents[agentId] : mockAgents[conversationId] || mockAgents["1"];

  // Redirect to WhatsApp
  useEffect(() => {
    if (agent?.phone) {
      const phoneNumber = agent.phone.replace(/\s+/g, "").replace(/\+/g, "");
      const message = encodeURIComponent(`Hi ${agent.name}! I'm interested in your properties.`);
      window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
      // Navigate back after a short delay
      setTimeout(() => {
        navigate(-1);
      }, 500);
    }
  }, [agent, navigate]);

  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <MessageCircle className="w-16 h-16 text-primary mb-4" />
        <h2 className="text-xl font-bold text-foreground mb-2">Opening WhatsApp...</h2>
        <p className="text-sm text-muted-foreground text-center mb-6">
          Redirecting you to WhatsApp to contact {agent?.name || "the agent"}
        </p>
        <Button onClick={() => navigate(-1)} variant="outline">
          Go Back
        </Button>
      </div>
    </AppLayout>
  );
};

export default Chat;
