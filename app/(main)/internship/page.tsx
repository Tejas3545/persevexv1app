"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock, CheckCircle2, ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function UserLoginPage() {
  const [isLoginView, setIsLoginView] = useState(false);
  
  // Login state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // Registration state
  const [plan, setPlan] = useState<"advanced" | "foundation">("advanced");
  const [payment, setPayment] = useState<"reserve" | "full">("reserve");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [college, setCollege] = useState("");

  // ─── COOKIE / TOKEN BYPASS LOGIC ─────────────────────────────────────────
  // Every time the LMS page loads, check for an existing auth token.
  // If a token is present, the user has already registered/logged in before.
  // Skip the form entirely and redirect them straight to the LMS.
  // ─────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const lmsToken = localStorage.getItem("persevex_lms_token");
    if (lmsToken) {
      window.location.href = "https://persevex.com/login/index.php";
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      router.push(`/internship/${data.id}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ─── STORE AUTH TOKEN ──────────────────────────────────────────────────
      // Set a persistent token in localStorage so returning users bypass this
      // registration form and are sent directly to the LMS on their next visit.
      // ──────────────────────────────────────────────────────────────────────
      const tokenData = {
        email,
        name: fullName,
        plan,
        payment,
        registeredAt: new Date().toISOString(),
      };
      localStorage.setItem("persevex_lms_token", JSON.stringify(tokenData));

      // ─── REDIRECT TO LMS ───────────────────────────────────────────────────
      // Immediately redirect to the Persevex LMS login page after registration.
      // ──────────────────────────────────────────────────────────────────────
      window.location.href = "https://persevex.com/login/index.php";
    } catch (err) {
      console.error("Registration error:", err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full flex items-center justify-center bg-background p-4 md:p-8 font-sans">
      <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Column - Value Proposition */}
        <div className="space-y-8 hidden lg:block pr-4">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground border-l-4 border-primary pl-3 py-1">
              Career-focused training
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-primary bg-primary/10 px-4 py-1.5 rounded-full">
              <Sparkles className="w-4 h-4" />
              Placement-Focused
            </div>
          </div>

          <div className="space-y-6">
            <h1 className="text-5xl xl:text-6xl font-bold text-foreground leading-[1.15] tracking-tight">
              Pioneering Career Focused Education with <span className="text-primary">Expert-Led</span> Mentor-Driven Training.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              Get a personalised roadmap, smart checkpoints, and AI-assisted practice then prove skills through mentor-reviewed, internship-grade projects inside a clean, secure LMS.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2 max-w-xl">
            <div className="border border-border rounded-2xl p-5 flex items-start gap-3 bg-card/30 hover:bg-card/80 transition-colors">
              <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">AI-assisted learning</h3>
                <p className="text-sm text-muted-foreground">Certification + checkpoints</p>
              </div>
            </div>
            <div className="border border-border rounded-2xl p-5 flex items-start gap-3 bg-card/30 hover:bg-card/80 transition-colors">
              <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Secure payments & access</h3>
                <p className="text-sm text-muted-foreground">Trusted checkout + protected LMS</p>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3.5 border-2 border-border rounded-xl font-semibold text-foreground hover:bg-muted transition-colors"
            >
              Explore persevex.com <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Right Column - Forms */}
        <div className="w-full max-w-lg mx-auto lg:ml-auto">
          {!isLoginView ? (
            /* Registration Card */
            <div className="bg-card border border-border rounded-3xl shadow-xl p-6 md:p-8">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-xl font-bold text-foreground">Register or login</h2>
                  <p className="text-sm text-muted-foreground mt-1">Minimal steps, Secure checkout.</p>
                </div>
                <button 
                  onClick={() => setIsLoginView(true)}
                  className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-semibold hover:bg-muted transition-colors"
                >
                  Login <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleRegister}>
                {/* Plan Selection */}
                <div className="space-y-3 mb-6">
                  <label className="text-sm font-medium text-muted-foreground">Plan</label>
                  <div className="grid grid-cols-2 gap-3">
                    <div 
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${plan === 'advanced' ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:border-primary/50 bg-background'}`} 
                      onClick={() => setPlan('advanced')}
                    >
                      <div className="font-semibold mb-1">Advanced</div>
                      <div className={`text-sm ${plan === 'advanced' ? 'text-primary-foreground/90' : 'text-muted-foreground'}`}>₹4,500</div>
                    </div>
                    <div 
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${plan === 'foundation' ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:border-primary/50 bg-background'}`} 
                      onClick={() => setPlan('foundation')}
                    >
                      <div className="font-semibold mb-1">Foundation</div>
                      <div className={`text-sm ${plan === 'foundation' ? 'text-primary-foreground/90' : 'text-muted-foreground'}`}>₹3,500</div>
                    </div>
                  </div>
                </div>

                {/* Payment Selection */}
                <div className="space-y-3 mb-6">
                  <label className="text-sm font-medium text-muted-foreground">Payment</label>
                  <div className="grid grid-cols-2 gap-3">
                    <div 
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${payment === 'reserve' ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:border-primary/50 bg-background'}`} 
                      onClick={() => setPayment('reserve')}
                    >
                      <div className="font-semibold mb-1">Reserve seat</div>
                      <div className={`text-sm ${payment === 'reserve' ? 'text-primary-foreground/90' : 'text-muted-foreground'}`}>₹1,000 now</div>
                    </div>
                    <div 
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${payment === 'full' ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:border-primary/50 bg-background'}`} 
                      onClick={() => setPayment('full')}
                    >
                      <div className="font-semibold mb-1">Pay in full</div>
                      <div className={`text-sm ${payment === 'full' ? 'text-primary-foreground/90' : 'text-muted-foreground'}`}>₹{plan === 'advanced' ? '4,500' : '3,500'}</div>
                    </div>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-muted-foreground">Full name</label>
                    <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Your full name" className="w-full p-3 bg-background border border-input rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-sm" required />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-muted-foreground">Phone</label>
                    <div className="flex gap-2">
                      <select aria-label="Country code" className="p-3 bg-background border border-input rounded-xl focus:ring-2 focus:ring-primary/50 outline-none w-[85px] text-sm">
                        <option>IN +91</option>
                      </select>
                      <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="10-digit number" className="w-full p-3 bg-background border border-input rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-sm" required />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email address" className="w-full p-3 bg-background border border-input rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-sm" required />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-muted-foreground">College</label>
                    <input type="text" value={college} onChange={(e) => setCollege(e.target.value)} placeholder="Your college name" className="w-full p-3 bg-background border border-input rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-sm" required />
                  </div>
                </div>

                {/* Submit Area */}
                <div className="text-center space-y-4 pt-2">
                  <p className="text-xs text-muted-foreground">
                    By signing up, you agree to our <Link href="/terms-&-conditions" className="text-foreground font-semibold hover:underline">T&C</Link> and <Link href="/privacy-policy" className="text-foreground font-semibold hover:underline">Privacy Policy</Link>
                  </p>
                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-[#4F81FF] hover:bg-[#3b6ceb] text-white font-semibold rounded-xl transition-all shadow-md flex justify-center items-center gap-2"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : `Pay ${payment === 'reserve' ? '₹1,000 • Reserve seat' : `₹${plan === 'advanced' ? '4,500' : '3,500'} • Pay in full`}`}
                  </button>
                  <p className="text-xs text-muted-foreground font-medium">Secure checkout • Instant access</p>
                </div>
              </form>
            </div>
          ) : (
            /* Login Card */
            <div className="bg-card border border-border rounded-3xl shadow-xl p-8 max-w-md mx-auto">
              <div className="text-center mb-8">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </div>
                <h2 className="text-2xl font-bold text-foreground">Sign in to Persevex Learning</h2>
                <p className="text-sm text-muted-foreground mt-2">Welcome back! Please sign in to continue</p>
              </div>

              <button className="w-full py-2.5 px-4 bg-background border border-border rounded-xl flex items-center justify-center gap-3 font-medium hover:bg-muted transition-colors mb-6 shadow-sm">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 h-px bg-border"></div>
                <span className="text-xs text-muted-foreground uppercase font-medium">or</span>
                <div className="flex-1 h-px bg-border"></div>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Email address or username</label>
                  <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Enter email or username" 
                    className="w-full p-3 bg-background border border-input rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-sm" 
                    required 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Password</label>
                  <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Enter password" 
                    className="w-full p-3 bg-background border border-input rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-sm" 
                    required 
                  />
                </div>

                {error && (
                  <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-xl">
                    {error}
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={loading} 
                  className="w-full py-3 mt-2 bg-[#2D3142] hover:bg-[#1f222e] dark:bg-primary dark:hover:bg-primary/90 text-white font-semibold rounded-xl transition-all shadow-md flex justify-center items-center gap-2"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Continue"}
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-border text-center space-y-4">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <button onClick={() => setIsLoginView(false)} className="text-foreground font-semibold hover:underline">
                    Sign up
                  </button>
                </p>
                <p className="text-xs text-muted-foreground flex items-center justify-center gap-1.5">
                  Secured by <Lock className="w-3 h-3" /> Persevex
                </p>
              </div>
            </div>
          )}

          {/* Help Text Below Card */}
          {!isLoginView && (
            <div className="text-center mt-6">
              <p className="text-sm font-medium text-muted-foreground">
                Need help? <a href="tel:+919187376576" className="text-foreground font-bold hover:underline">+91 91873 76576</a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
