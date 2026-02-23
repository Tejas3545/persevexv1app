"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { CheckCircle2, Zap } from "lucide-react";

const planData = {
  planName: "Platinum",
  price: 35000,
  features: [
    "Course Duration : 6 months",
    "Live classes : 80 Hours",
    "Video Content : 100 Hours",
    "3 Major + 2 Minor Projects",
    "Program Completion Certificate",
    "Co-branded internship Certificate*",
    "100% Job Guarantee (T&C Applied)",
  ],
  paymentLink: "https://payments.cashfree.com/forms/REG1100",
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function PricingCard() {
  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <motion.div
        className="relative w-full max-w-sm rounded-3xl bg-card border border-primary/30 shadow-2xl shadow-primary/20"
        variants={cardVariant}
        initial="hidden"
        animate="visible"
      >
        {}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 pointer-events-none">
          {}
          <div className="absolute inset-0 border-2 border-primary/20 rounded-full scale-100" />
          <div className="absolute inset-0 border border-primary/20 rounded-full scale-75" />
          <div className="absolute inset-0 border border-primary/20 rounded-full scale-50" />

          {}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full filter blur-md" />

          {}
          <div className="absolute top-[10%] left-[20%] w-6 h-6 bg-gradient-to-br from-primary to-primary rounded-full" />
          <div className="absolute top-[25%] right-[5%] w-8 h-8 bg-gradient-to-br from-muted to-muted rounded-full" />
          <div className="absolute bottom-[15%] left-[5%] w-7 h-7 bg-gradient-to-br from-secondary to-primary rounded-full" />
          <div className="absolute bottom-[5%] right-[25%] w-5 h-5 bg-gradient-to-br from-accent to-accent rounded-full" />
        </div>

        {}
        <div className="relative flex flex-col pt-24 p-8 text-foreground">
          <h2 className="text-center font-bold text-primary tracking-widest uppercase">
            {planData.planName}
          </h2>
          <p className="text-center text-5xl sm:text-6xl font-extrabold text-foreground mt-2">
            ₹{planData.price.toLocaleString("en-IN")}
          </p>

          <ul className="mt-8 space-y-4">
            {planData.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2
                  className="w-5 h-5 text-primary mt-0.5 flex-shrink-0"
                  aria-hidden="true"
                />
                <span className="text-muted">{feature}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <a
              target="_blank"
              href={planData.paymentLink}
              className="group flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-base font-semibold text-foreground shadow-lg shadow-primary/40 transition-all duration-300 hover:bg-primary hover:scale-105"
            >
              <Zap size={18} />
              Select Plan
            </a>
            <p className="mt-2 text-center text-xs text-muted">
              Secured by Razorpay
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
