"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiCheck, FiX, FiArrowRight } from "react-icons/fi";
import Link from "next/link";

type Feature = { text: string; included: boolean };
type Plan = {
  title: string;
  price: string;
  tagline: string;
  popular: boolean;
  paymentLink: string;
  features: Feature[];
};

const plans: Plan[] = [
  {
    title: "Foundation",
    price: "6,999",
    tagline: "Launch your portfolio with real projects.",
    popular: false,
    paymentLink: "https://payments.cashfree.com/forms/PERSEVE_REGISTRATION",
    features: [
      { text: "24 Hours Recorded Sessions", included: true },
      { text: "Real-Time Projects", included: true },
      { text: "8 Hours of Live Sessions", included: true },
      { text: "Certifications", included: true },
      { text: "One-on-One Doubt Sessions", included: true },
      { text: "Mentor Support", included: true },
      { text: "Resume Builder", included: false },
      { text: "ATS Checker", included: false },
      { text: "Placement Support", included: false },
    ],
  },
  {
    title: "Advanced",
    price: "8,999",
    tagline: "Full placement stack — from learning to offer letter.",
    popular: true,
    paymentLink: "https://payments.cashfree.com/forms/ADVANCE_REGS",
    features: [
      { text: "24 Hours Recorded Sessions", included: true },
      { text: "Real-Time Projects", included: true },
      { text: "8 Hours of Live Sessions", included: true },
      { text: "One-on-One Doubt Sessions", included: true },
      { text: "Certifications", included: true },
      { text: "Mentor Support", included: true },
      { text: "Resume Builder", included: true },
      { text: "ATS Checker", included: true },
      { text: "Placement Support", included: true },
    ],
  },
];

export default function HomePricingSection() {
  return (
    <section className="py-14 bg-slate-50 dark:bg-slate-950 border-t border-border/40">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Pricing</p>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
            Simple, honest pricing.
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-base">
            One-time payment. No hidden fees. Pick the track that fits your goal.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className={`relative rounded-3xl p-8 border transition-all duration-300 ${
                plan.popular
                  ? "bg-primary text-primary-foreground border-primary shadow-2xl shadow-primary/30 scale-[1.02]"
                  : "bg-white dark:bg-slate-900 border-border hover:border-primary/30 hover:shadow-lg"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1.5 bg-white text-primary text-xs font-black rounded-full shadow-md">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className={`text-lg font-black mb-1 ${plan.popular ? "text-primary-foreground" : "text-foreground"}`}>
                  {plan.title}
                </h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className={`text-sm font-semibold ${plan.popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>₹</span>
                  <span className={`text-5xl font-black tracking-tight ${plan.popular ? "text-primary-foreground" : "text-foreground"}`}>
                    {plan.price}
                  </span>
                </div>
                <p className={`text-sm ${plan.popular ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                  {plan.tagline}
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f.text} className="flex items-center gap-3 text-sm">
                    {f.included ? (
                      <FiCheck className={`flex-shrink-0 w-4 h-4 ${plan.popular ? "text-primary-foreground" : "text-primary"}`} />
                    ) : (
                      <FiX className={`flex-shrink-0 w-4 h-4 ${plan.popular ? "text-primary-foreground/40" : "text-muted-foreground/40"}`} />
                    )}
                    <span className={`${!f.included ? "opacity-50" : ""} ${plan.popular ? "text-primary-foreground" : "text-foreground"}`}>
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={plan.paymentLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl font-bold text-sm transition-all duration-200 ${
                  plan.popular
                    ? "bg-white text-primary hover:bg-white/90 shadow-md"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
              >
                Enroll Now <FiArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs text-muted-foreground mt-8"
        >
          Need help choosing?{" "}
          <Link href="/contact" className="text-primary font-semibold hover:underline">
            Talk to an advisor →
          </Link>
        </motion.p>
      </div>
    </section>
  );
}
