import AppLayout from "@/components/layout/AppLayout";
import { 
  ArrowLeft, 
  HelpCircle, 
  MessageCircle, 
  Phone, 
  Mail,
  ChevronDown,
  ChevronUp,
  FileText
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "How do I list my property?",
    answer: "Tap the '+' button in the bottom navigation, fill in your property details, upload photos, and submit. Listing is completely free!",
  },
  {
    question: "How do I become a verified agent?",
    answer: "Go to Profile > Become an Agent. Submit your application with ID documents. After admin approval, pay the registration fee to activate your agent profile.",
  },
  {
    question: "Is there a fee for tenants?",
    answer: "No! Using Ndunda is completely free for tenants. You can browse listings, contact landlords, and request agent assistance at no cost.",
  },
  {
    question: "How do virtual viewings work?",
    answer: "Request a virtual viewing from the property page. The landlord or agent will schedule a video call via WhatsApp or Google Meet to show you the property remotely.",
  },
  {
    question: "How can I report a suspicious listing?",
    answer: "Tap the flag icon on any listing to report it. Our team reviews all reports and takes action to maintain platform safety.",
  },
];

const Help = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <AppLayout>
      <div className="px-4 pt-4 pb-6">
        <Link to="/profile" className="inline-flex items-center gap-2 text-muted-foreground mb-4">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back</span>
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <HelpCircle className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Help & Support</h1>
            <p className="text-sm text-muted-foreground">We're here to help</p>
          </div>
        </div>

        {/* Contact Options */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <a
            href="https://wa.me/264811234567"
            className="flex flex-col items-center gap-2 p-4 bg-card rounded-xl shadow-card hover:bg-muted/50 transition-colors"
          >
            <MessageCircle className="w-6 h-6 text-primary" />
            <span className="text-xs font-medium text-foreground">WhatsApp</span>
          </a>
          <a
            href="tel:+264811234567"
            className="flex flex-col items-center gap-2 p-4 bg-card rounded-xl shadow-card hover:bg-muted/50 transition-colors"
          >
            <Phone className="w-6 h-6 text-primary" />
            <span className="text-xs font-medium text-foreground">Call Us</span>
          </a>
          <a
            href="mailto:support@ndunda.na"
            className="flex flex-col items-center gap-2 p-4 bg-card rounded-xl shadow-card hover:bg-muted/50 transition-colors"
          >
            <Mail className="w-6 h-6 text-primary" />
            <span className="text-xs font-medium text-foreground">Email</span>
          </a>
        </div>

        {/* FAQs */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-card rounded-xl overflow-hidden shadow-card"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <span className="font-medium text-foreground text-sm pr-4">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
                  )}
                </button>
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-200",
                    openFaq === index ? "max-h-40" : "max-h-0"
                  )}
                >
                  <p className="px-4 pb-4 text-sm text-muted-foreground">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Terms & Privacy */}
        <div className="space-y-2">
          <Link
            to="/terms"
            className="flex items-center gap-3 p-4 bg-card rounded-xl shadow-card"
          >
            <FileText className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Terms of Service</span>
          </Link>
          <Link
            to="/privacy"
            className="flex items-center gap-3 p-4 bg-card rounded-xl shadow-card"
          >
            <FileText className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Privacy Policy</span>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
};

export default Help;
