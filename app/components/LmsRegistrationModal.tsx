"use client";

/**
 * LmsRegistrationModal
 * ──────────────────────────────────────────────────────────────────────────────
 * Intercepts the "Persevex LMS" button click:
 *   • If the user has already registered (cookie exists) → direct redirect.
 *   • Otherwise → show this modal, collect lead data, then redirect on submit.
 *
 * Cookie key  : "pvx_lms_access"
 * Redirect URL: https://persevex.com/login/index.php
 *
 * To integrate: import { useLmsAccess } from "./LmsRegistrationModal" in
 * Appbar and call openLms() on the LMS button click.
 * ──────────────────────────────────────────────────────────────────────────────
 */

import React, { useState, useEffect, createContext, useContext, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowUpRight, Shield, CheckCircle2 } from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────
const LMS_REDIRECT_URL = "https://lms.persevex.com/login/index.php";
const STORAGE_KEY = "pvx_lms_access";
const STORAGE_DAYS = 365;

// ─── Plan / Payment data ──────────────────────────────────────────────────────
const PLANS = [
  { id: "foundation", label: "Foundation", price: 3500, reserveSeat: 1000 },
  { id: "advanced", label: "Advanced", price: 4500, reserveSeat: 1500 },
  { id: "premium", label: "Premium", price: 6999, reserveSeat: 1500 },
  { id: "elite", label: "Elite", price: 8999, reserveSeat: 1500 },
] as const;

type PlanId = (typeof PLANS)[number]["id"];

// Payment link mapping
const PAYMENT_LINKS: Record<number, string> = {
  1000: "https://payments.cashfree.com/forms/REGS1450",
  1500: "https://payments.cashfree.com/forms/PERSEVEX500",
  3500: "https://payments.cashfree.com/forms/PERSEVEXREGISS",
  4500: "https://payments.cashfree.com/forms/advanc",
  6999: "https://payments.cashfree.com/forms/found",
  8999: "https://payments.cashfree.com/forms/ADDV",
};

// Google Sheet submission URL
const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbwd0FKuHde2dPvjv9gXamF2TPraJWvAm3f4aQX3rko0SOe-_m3Bjj2L-qKj8GTm_5Vc/exec";

// ─── localStorage helpers ────────────────────────────────────────────────────
function setLmsAccess() {
  if (typeof localStorage === "undefined") return;
  const data = {
    submitted: true,
    submittedAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + STORAGE_DAYS * 864e5).toISOString()
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function hasLmsAccess(): boolean {
  if (typeof localStorage === "undefined") return false;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return false;
    
    const data = JSON.parse(stored);
    const expiresAt = new Date(data.expiresAt);
    
    // Check if expired
    if (new Date() > expiresAt) {
      localStorage.removeItem(STORAGE_KEY);
      return false;
    }
    
    return data.submitted === true;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return false;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────
interface LmsContextValue {
  openLms: () => void;
}

const LmsContext = createContext<LmsContextValue>({ openLms: () => {} });

export function useLmsAccess() {
  return useContext(LmsContext);
}

// ─── Provider + Modal ────────────────────────────────────────────────────────
export function LmsAccessProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Prevent body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  /**
   * openLms — called whenever the "Persevex LMS" button is clicked.
   * Always show the form (no cache check).
   */
  const openLms = useCallback(() => {
    setIsOpen(true);
  }, []);

  return (
    <LmsContext.Provider value={{ openLms }}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <LmsModal onClose={() => setIsOpen(false)} />
        )}
      </AnimatePresence>
    </LmsContext.Provider>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────
function LmsModal({ onClose }: { onClose: () => void }) {
  // Form state
  const [selectedPlan, setSelectedPlan] = useState<PlanId>("advanced");
  const [payFull, setPayFull] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", college: "" });
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const selectedPlanObj = PLANS.find((p) => p.id === selectedPlan)!;
  const payableAmount = payFull ? selectedPlanObj.price : selectedPlanObj.reserveSeat;
  const paymentLabel = payFull ? "Pay in full" : "Reserve seat";

  // ── Validation ─────────────────────────────────────────────────────────────
  function validate() {
    const errs: Partial<typeof form> = {};
    if (!form.name.trim()) errs.name = "Full name is required";
    if (!form.phone.trim() || !/^\d{7,15}$/.test(form.phone.replace(/\s/g, "")))
      errs.phone = "Enter a valid phone number";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Enter a valid email";
    if (!form.college.trim()) errs.college = "College name is required";
    return errs;
  }

  // ── Submit ─────────────────────────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitting(true);

    // Get the selected plan object
    const selectedPlanObj = PLANS.find((p) => p.id === selectedPlan)!;
    const finalAmount = payFull ? selectedPlanObj.price : selectedPlanObj.reserveSeat;

    // Prepare form data for Google Sheet
    const formData = {
      fullName: form.name,
      email: form.email,
      phone: "+91 " + form.phone,
      collegeName: form.college,
      plan: selectedPlanObj.label,
      paymentOption: payFull ? "Pay in full" : "Reserve seat",
      amount: finalAmount.toString(),
    };

    // 1. Submit to Google Sheet and show realtime feedback
    try {
      const response = await fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        body: JSON.stringify(formData),
        // using no-cors avoids preflight failures with Google Scripts
        mode: "no-cors",
      });
      // response.ok is unreliable in no-cors mode, so just assume success if no exception
      console.log("Form submitted to Google Sheet (or attempted) successfully");
      setSubmitMessage("Data sent! Redirecting...");
    } catch (error) {
      console.error("Error submitting to Google Sheet:", error);
      setSubmitMessage("Failed to send to sheet, continuing...");
    }

    // 2. Open Cashfree payment link in new tab
    const paymentLink = PAYMENT_LINKS[finalAmount];
    if (paymentLink) {
      window.open(paymentLink, "_blank");
    }

    // 3. Close the modal after successful submission
    setTimeout(() => {
      setSubmitting(false);
      onClose();
    }, 1000);
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    // Backdrop
    <motion.div
      className="fixed inset-0 z-[200] flex items-start md:items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Panel - Mobile: Full height with scroll, Desktop: Max height centered */}
      <motion.div
        className="relative w-full max-w-md bg-card border border-border rounded-3xl shadow-2xl my-4 md:my-0 flex flex-col max-h-[95vh] md:max-h-[90vh]"
        initial={{ scale: 0.95, y: 24, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 24, opacity: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 32 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Fixed at top */}
        <div className="flex items-center justify-between px-4 md:px-6 pt-4 md:pt-6 pb-3 md:pb-4 border-b border-border shrink-0">
          <div>
            <h2 className="text-lg md:text-xl font-black text-foreground tracking-tight">Register or login</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Minimal steps, Secure checkout.</p>
          </div>
          <div className="flex items-center gap-1 md:gap-2">
            <a
              href={LMS_REDIRECT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-primary hover:underline flex items-center gap-0.5 whitespace-nowrap"
            >
              Login <ArrowUpRight size={12} />
            </a>
            <button
              onClick={onClose}
              aria-label="Close"
              className="ml-1 md:ml-2 p-2 md:p-1.5 rounded-full hover:bg-muted text-muted-foreground transition-colors touch-manipulation"
            >
              <X size={20} className="md:hidden" />
              <X size={16} className="hidden md:block" />
            </button>
          </div>
        </div>

        {/* Scrollable form content */}
        <form onSubmit={handleSubmit} className="px-4 md:px-6 py-4 md:py-5 space-y-4 md:space-y-5 overflow-y-auto flex-1">

          {/* ── Plan Selection ─────────────────────────────────────────── */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2.5">Select Plan</p>
            <div className="grid grid-cols-2 gap-2.5 md:gap-2">
              {PLANS.map((plan) => (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`relative flex flex-col items-start p-3 md:p-2.5 rounded-xl border-2 transition-all duration-200 text-left touch-manipulation ${
                    selectedPlan === plan.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/40 bg-secondary/50"
                  }`}
                >
                  {selectedPlan === plan.id && (
                    <CheckCircle2 size={14} className="absolute top-2 right-2 text-primary md:top-1.5 md:right-1.5 md:w-3 md:h-3" />
                  )}
                  <span className="text-xs md:text-xs font-bold text-foreground">{plan.label}</span>
                  <span className="text-base md:text-base font-black text-primary mt-0.5">₹{plan.price.toLocaleString("en-IN")}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ── Payment Selection ──────────────────────────────────────── */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2.5">Payment Option</p>
            <div className="grid grid-cols-2 gap-2.5 md:gap-2">
              {/* Reserve Seat */}
              <button
                type="button"
                onClick={() => setPayFull(false)}
                className={`flex flex-col items-start p-4 md:p-3.5 rounded-xl border-2 transition-all duration-200 text-left relative touch-manipulation ${
                  !payFull ? "border-primary bg-primary/5" : "border-border hover:border-primary/40 bg-secondary/50"
                }`}
              >
                {!payFull && <CheckCircle2 size={16} className="absolute top-2.5 right-2.5 text-primary md:w-3.5 md:h-3.5" />}
                <span className="text-sm font-bold text-foreground">Reserve seat</span>
                <span className="text-lg font-black text-primary mt-0.5">₹{selectedPlanObj.reserveSeat.toLocaleString("en-IN")}</span>
                <span className="text-xs text-muted-foreground mt-0.5">Pay now</span>
              </button>
              {/* Pay in Full */}
              <button
                type="button"
                onClick={() => setPayFull(true)}
                className={`flex flex-col items-start p-4 md:p-3.5 rounded-xl border-2 transition-all duration-200 text-left relative touch-manipulation ${
                  payFull ? "border-primary bg-primary/5" : "border-border hover:border-primary/40 bg-secondary/50"
                }`}
              >
                {payFull && <CheckCircle2 size={16} className="absolute top-2.5 right-2.5 text-primary md:w-3.5 md:h-3.5" />}
                <span className="text-sm font-bold text-foreground">Pay in full</span>
                <span className="text-lg font-black text-primary mt-0.5">₹{selectedPlanObj.price.toLocaleString("en-IN")}</span>
                <span className="text-xs text-muted-foreground mt-0.5">Best value</span>
              </button>
            </div>
          </div>

          {/* ── Form Fields ────────────────────────────────────────────── */}
          <div className="space-y-3.5 md:space-y-3">
            {/* Full Name */}
            <div>
              <input
                type="text"
                placeholder="Full name"
                value={form.name}
                onChange={(e) => { setForm((f) => ({ ...f, name: e.target.value })); setErrors((er) => ({ ...er, name: "" })); }}
                className={`w-full px-4 py-3.5 md:py-3 rounded-xl border text-sm font-medium bg-background text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors touch-manipulation ${errors.name ? "border-red-400 focus:border-red-400" : "border-border focus:border-primary"}`}
              />
              {errors.name && <p className="text-xs text-red-500 mt-1.5">{errors.name}</p>}
            </div>

            {/* Phone */}
            <div>
              <div className={`flex rounded-xl border overflow-hidden bg-background transition-colors ${errors.phone ? "border-red-400" : "border-border focus-within:border-primary"}`}>
                <div className="flex items-center gap-1.5 px-3 py-3.5 md:py-3 bg-muted border-r border-border text-sm font-semibold text-muted-foreground shrink-0">
                  🇮🇳 <span>+91</span>
                </div>
                <input
                  type="tel"
                  placeholder="Phone number"
                  value={form.phone}
                  onChange={(e) => { setForm((f) => ({ ...f, phone: e.target.value })); setErrors((er) => ({ ...er, phone: "" })); }}
                  className="flex-1 px-3 py-3.5 md:py-3 text-sm font-medium bg-transparent text-foreground placeholder:text-muted-foreground/60 outline-none touch-manipulation"
                />
              </div>
              {errors.phone && <p className="text-xs text-red-500 mt-1.5">{errors.phone}</p>}
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={(e) => { setForm((f) => ({ ...f, email: e.target.value })); setErrors((er) => ({ ...er, email: "" })); }}
                className={`w-full px-4 py-3.5 md:py-3 rounded-xl border text-sm font-medium bg-background text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors touch-manipulation ${errors.email ? "border-red-400 focus:border-red-400" : "border-border focus:border-primary"}`}
              />
              {errors.email && <p className="text-xs text-red-500 mt-1.5">{errors.email}</p>}
            </div>

            {/* College */}
            <div>
              <input
                type="text"
                placeholder="College name"
                value={form.college}
                onChange={(e) => { setForm((f) => ({ ...f, college: e.target.value })); setErrors((er) => ({ ...er, college: "" })); }}
                className={`w-full px-4 py-3.5 md:py-3 rounded-xl border text-sm font-medium bg-background text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors touch-manipulation ${errors.college ? "border-red-400 focus:border-red-400" : "border-border focus:border-primary"}`}
              />
              {errors.college && <p className="text-xs text-red-500 mt-1.5">{errors.college}</p>}
            </div>
          </div>

          {/* ── Footer / CTA ───────────────────────────────────────────── */}
          <div className="pt-1 pb-2 md:pb-0">
            <p className="text-[11px] text-muted-foreground text-center mb-3">
              By signing up, you agree to our{" "}
              <a href="/terms-&-conditions" className="underline hover:text-foreground">T&amp;C</a>{" "}
              and{" "}
              <a href="/privacy-policy" className="underline hover:text-foreground">Privacy Policy</a>
            </p>

            {/* Dynamic CTA */}
            <button
              type="submit"
              disabled={submitting}
              className="btn-aptisure w-full flex items-center justify-center gap-2 text-sm md:text-sm font-black py-4 md:py-3 disabled:opacity-60 disabled:cursor-not-allowed touch-manipulation"
            >
              {submitting ? (
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <>
                  Pay ₹{payableAmount.toLocaleString("en-IN")} &bull; {paymentLabel}
                </>
              )}
            </button>

            {/* feedback message */}
            {submitMessage && (
              <p className="text-center text-sm mt-2 text-primary">{submitMessage}</p>
            )}

            {/* Trust badge */}
            <p className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground mt-2.5">
              <Shield size={11} />
              Secure checkout &bull; Instant access
            </p>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
