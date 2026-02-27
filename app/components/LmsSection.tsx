"use client";

import React from "react";
import { motion } from "framer-motion";

// ── Brand Logo SVG Components ─────────────────────────────────────────────────

function AwsLogo() {
  return (
    <svg viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto">
      <text x="0" y="26" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="26" fill="#232F3E">aws</text>
      <path d="M4 32 Q40 44 76 32" stroke="#FF9900" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
      <polygon points="74,29 78,32 74,35" fill="#FF9900"/>
    </svg>
  );
}

function CashfreeLogo() {
  return (
    <svg viewBox="0 0 120 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-7 w-auto">
      <rect x="0" y="4" width="28" height="28" rx="6" fill="#00CFB4"/>
      <text x="2" y="24" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="18" fill="white">cf</text>
      <text x="34" y="26" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="18" fill="#1A1A2E">cashfree</text>
    </svg>
  );
}

function RazorpayLogo() {
  return (
    <svg viewBox="0 0 130 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-7 w-auto">
      <polygon points="8,28 18,4 24,4 14,28" fill="#3395FF"/>
      <polygon points="16,18 26,4 32,4 20,20" fill="#072654"/>
      <text x="36" y="26" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="18" fill="#072654">razorpay</text>
    </svg>
  );
}

function GoogleCloudLogo() {
  return (
    <svg viewBox="0 0 150 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-7 w-auto">
      {/* Simplified colorful G */}
      <circle cx="18" cy="18" r="14" fill="none" stroke="#EA4335" strokeWidth="5"/>
      <path d="M18 18 h14" stroke="#4285F4" strokeWidth="5" strokeLinecap="round"/>
      <path d="M18 4 a14 14 0 0 1 10 4" stroke="#FBBC04" strokeWidth="5" strokeLinecap="round"/>
      <path d="M28 8 a14 14 0 0 1 4 10" stroke="#34A853" strokeWidth="5" strokeLinecap="round"/>
      <text x="38" y="15" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="11" fill="#5F6368">Google</text>
      <text x="38" y="28" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="11" fill="#4285F4">Cloud</text>
    </svg>
  );
}

function MetaLogo() {
  return (
    <svg viewBox="0 0 100 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-7 w-auto">
      {/* Infinity / figure-8 */}
      <path d="M8 18 C8 10 16 6 22 12 C26 16 30 20 36 20 C42 20 48 16 48 10 C48 4 42 0 36 6 C30 12 26 16 22 16 C16 16 8 12 8 18 Z" 
            fill="url(#metaGrad)" strokeWidth="0"/>
      <defs>
        <linearGradient id="metaGrad" x1="8" y1="10" x2="48" y2="26" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0082FB"/>
          <stop offset="1" stopColor="#00B4FF"/>
        </linearGradient>
      </defs>
      <text x="56" y="24" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="20" fill="#0082FB">Meta</text>
    </svg>
  );
}

function GeminiLogo() {
  return (
    <svg viewBox="0 0 110 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-7 w-auto">
      {/* 4-pointed star */}
      <path d="M18 4 C18 4 16 14 8 18 C16 22 18 32 18 32 C18 32 20 22 28 18 C20 14 18 4 18 4Z" fill="url(#gemGrad)"/>
      <defs>
        <linearGradient id="gemGrad" x1="8" y1="4" x2="28" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4285F4"/>
          <stop offset="0.5" stopColor="#9C27B0"/>
          <stop offset="1" stopColor="#F44336"/>
        </linearGradient>
      </defs>
      <text x="36" y="25" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="19" fill="#1A1A2E">Gemini</text>
    </svg>
  );
}

// ── Logo chip wrapper ─────────────────────────────────────────────────────────
function LogoChip({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-6 md:mx-10 flex-shrink-0 px-7 py-3.5 rounded-2xl select-none shadow-sm border border-black/8 bg-white flex items-center justify-center min-w-[120px]">
      {children}
    </div>
  );
}

const rowOne = [
  { id: "aws", logo: <AwsLogo /> },
  { id: "cashfree", logo: <CashfreeLogo /> },
  { id: "razorpay", logo: <RazorpayLogo /> },
];

const rowTwo = [
  { id: "gcloud", logo: <GoogleCloudLogo /> },
  { id: "meta", logo: <MetaLogo /> },
  { id: "gemini", logo: <GeminiLogo /> },
];

export default function LmsSection() {
  return (
    <section className="py-14 bg-white dark:bg-[#0a0a0a] border-t border-border/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Powered by</p>
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6 tracking-tight uppercase">
            ENTERPRISE-GRADE.<br />
            <span className="text-primary">SECURE &amp; RELIABLE.</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Built on industry-leading infrastructure — secure, stable, and always on.
          </p>
        </motion.div>

        {/* Row 1 — scrolls left */}
        <div className="relative overflow-x-hidden mb-6">
          <div className="absolute top-0 bottom-0 left-0 w-32 z-10 bg-gradient-to-r from-white dark:from-[#0a0a0a] to-transparent pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-32 z-10 bg-gradient-to-l from-white dark:from-[#0a0a0a] to-transparent pointer-events-none" />
          <div className="flex animate-marquee items-center py-4 whitespace-nowrap">
            {[...rowOne, ...rowOne, ...rowOne].map((item, i) => (
              <LogoChip key={`r1-${i}`}>{item.logo}</LogoChip>
            ))}
          </div>
        </div>

        {/* Row 2 — scrolls right */}
        <div className="relative overflow-x-hidden">
          <div className="absolute top-0 bottom-0 left-0 w-32 z-10 bg-gradient-to-r from-white dark:from-[#0a0a0a] to-transparent pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-32 z-10 bg-gradient-to-l from-white dark:from-[#0a0a0a] to-transparent pointer-events-none" />
          <div className="flex animate-marquee-reverse items-center py-4 whitespace-nowrap">
            {[...rowTwo, ...rowTwo, ...rowTwo].map((item, i) => (
              <LogoChip key={`r2-${i}`}>{item.logo}</LogoChip>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

