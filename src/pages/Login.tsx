import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { userProfileService } from "@/services/userProfile";

const Login = () => {
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    const { error } = await signIn(loginForm.email, loginForm.password);
    setIsLoading(false);

    if (error) {
      toast.error(error.message || "Failed to sign in. Please check your credentials.");
      return;
    }

    toast.success("Login successful!");
    // Wait a bit for auth state to update
    setTimeout(() => {
      navigate("/");
    }, 100);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupForm.name || !signupForm.email || !signupForm.phone || !signupForm.password) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (signupForm.password !== signupForm.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (signupForm.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    const { error, data } = await signUp(signupForm.email, signupForm.password, {
      full_name: signupForm.name,
      phone: signupForm.phone,
    });
    
    if (error) {
      setIsLoading(false);
      toast.error(error.message || "Failed to create account. Please try again.");
      return;
    }

    // Create user profile if signup was successful
    if (data?.user) {
      try {
        await userProfileService.upsertProfile(data.user.id, {
          full_name: signupForm.name,
          phone: signupForm.phone,
          role: 'customer',
        });
      } catch (profileError) {
        console.error("Error creating user profile:", profileError);
        // Don't fail the signup if profile creation fails
      }
    }

    setIsLoading(false);
    toast.success("Account created successfully! Please check your email to verify your account.");
    setActiveTab("login");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Logo Header */}
      <div className="flex justify-center items-center pt-8 pb-4 px-4">
        <img
          src="/Ndunda_logo.png"
          alt="Ndunda Logo"
          className="h-16 w-auto object-contain"
        />
      </div>

      <div className="flex-1 flex items-center justify-center px-4 pb-8">
        <div className="w-full max-w-md">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login">
              <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-2">Welcome Back</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Sign in to continue to Ndunda
                </p>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="Enter your email"
                        value={loginForm.email}
                        onChange={(e) =>
                          setLoginForm({ ...loginForm, email: e.target.value })
                        }
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={loginForm.password}
                        onChange={(e) =>
                          setLoginForm({ ...loginForm, password: e.target.value })
                        }
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      <span className="text-muted-foreground">Remember me</span>
                    </label>
                    <Link
                      to="/forgot-password"
                      className="text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <button
                      onClick={() => setActiveTab("signup")}
                      className="text-primary font-semibold hover:underline"
                    >
                      Sign up
                    </button>
                  </p>
                </div>
              </div>
            </TabsContent>

            {/* Signup Tab */}
            <TabsContent value="signup">
              <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-2">Create Account</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Join Ndunda to find or list properties
                </p>

                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="Enter your full name"
                        value={signupForm.name}
                        onChange={(e) =>
                          setSignupForm({ ...signupForm, name: e.target.value })
                        }
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="Enter your email"
                        value={signupForm.email}
                        onChange={(e) =>
                          setSignupForm({ ...signupForm, email: e.target.value })
                        }
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="signup-phone"
                        type="tel"
                        placeholder="+264 81 123 4567"
                        value={signupForm.phone}
                        onChange={(e) =>
                          setSignupForm({ ...signupForm, phone: e.target.value })
                        }
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={signupForm.password}
                        onChange={(e) =>
                          setSignupForm({ ...signupForm, password: e.target.value })
                        }
                        className="pl-10 pr-10"
                        required
                        minLength={6}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Must be at least 6 characters
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="signup-confirm-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={signupForm.confirmPassword}
                        onChange={(e) =>
                          setSignupForm({ ...signupForm, confirmPassword: e.target.value })
                        }
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 text-sm">
                    <input
                      type="checkbox"
                      className="mt-1 rounded"
                      required
                    />
                    <label className="text-muted-foreground">
                      I agree to the{" "}
                      <Link to="/terms" className="text-primary hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link to="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <button
                      onClick={() => setActiveTab("login")}
                      className="text-primary font-semibold hover:underline"
                    >
                      Sign in
                    </button>
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Continue as Guest */}
          <div className="mt-4 text-center">
            <Link
              to="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Continue as guest
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
