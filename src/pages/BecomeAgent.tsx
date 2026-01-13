import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { 
  BadgeCheck, 
  Upload, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  FileText,
  CheckCircle,
  ArrowLeft
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, title: "Apply", description: "Submit your details" },
  { id: 2, title: "Review", description: "Admin reviews application" },
  { id: 3, title: "Pay", description: "Pay registration fee" },
  { id: 4, title: "Active", description: "Start helping tenants" },
];

const BecomeAgent = () => {
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  return (
    <AppLayout>
      <div className="px-4 pt-4 pb-6">
        <Link to="/profile" className="inline-flex items-center gap-2 text-muted-foreground mb-4">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back</span>
        </Link>

        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <BadgeCheck className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Become a Verified Agent</h1>
          <p className="text-sm text-muted-foreground">
            Join Ndunda's network of trusted rental agents
          </p>
        </div>

        {/* Steps */}
        <div className="flex items-center justify-between mb-8 px-2">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold mb-1",
                index === 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              )}>
                {step.id}
              </div>
              <span className="text-[10px] text-muted-foreground text-center">{step.title}</span>
            </div>
          ))}
        </div>

        {/* Benefits */}
        <div className="bg-secondary rounded-xl p-4 mb-6">
          <h3 className="font-semibold text-foreground mb-3">Benefits</h3>
          <div className="space-y-2">
            {[
              "Verified badge on your profile",
              "Access to tenant requests",
              "Keep 100% of your earnings",
              "Featured in agents directory",
            ].map((benefit, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span className="text-sm text-foreground">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Application Form */}
        <div className="space-y-4 mb-6">
          <h3 className="font-semibold text-foreground">Application Details</h3>
          
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Your full name"
                className="w-full pl-11 pr-4 py-3 bg-card border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="tel"
                placeholder="+264 81 xxx xxxx"
                className="w-full pl-11 pr-4 py-3 bg-card border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full pl-11 pr-4 py-3 bg-card border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Location/Area</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Where do you operate?"
                className="w-full pl-11 pr-4 py-3 bg-card border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">ID Document</label>
            <button className="w-full flex items-center justify-center gap-2 py-4 border-2 border-dashed border-border rounded-xl text-muted-foreground hover:border-primary/50 transition-colors">
              <Upload className="w-5 h-5" />
              <span className="text-sm">Upload ID or Passport</span>
            </button>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Why do you want to be an agent?</label>
            <textarea
              rows={3}
              placeholder="Tell us about your experience..."
              className="w-full px-4 py-3 bg-card border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 resize-none"
            />
          </div>
        </div>

        {/* Terms */}
        <label className="flex items-start gap-3 mb-6">
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="mt-1 w-4 h-4 rounded border-border text-primary focus:ring-primary"
          />
          <span className="text-sm text-muted-foreground">
            I agree to the terms and conditions and understand that a registration fee is required after approval
          </span>
        </label>

        <Button variant="hero" size="xl" className="w-full" disabled={!agreedToTerms}>
          Submit Application
        </Button>

        <p className="text-xs text-muted-foreground text-center mt-4">
          Registration fee: N$500 (paid after approval)
        </p>
      </div>
    </AppLayout>
  );
};

export default BecomeAgent;
