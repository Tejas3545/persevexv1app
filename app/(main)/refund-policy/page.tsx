"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiAlertCircle, FiMail, FiClock, FiUsers, FiCreditCard, FiSend } from "react-icons/fi";

const sections = [
  {
    id: "overview",
    number: 1,
    title: "Overview",
    content: (
      <>
        <p>
          This Policy explains how <strong>Persevex Education Consultancy LLP</strong> (&quot;Persevex&quot;, &quot;we&quot;, &quot;us&quot;, &quot;our&quot;)
          handles cancellations, refunds, and duplicate payments for purchases made on persevex.com.
        </p>
        <p className="mt-3">
          When you purchase any program, course, or service from Persevex, you agree to this Refund Policy, along with our{" "}
          <Link href="/terms-&-conditions" className="text-primary hover:underline">Terms &amp; Conditions</Link> and{" "}
          <Link href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>.
          This Policy is designed to keep seat allocation, mentor scheduling, and operations reliable for all learners.
        </p>
      </>
    ),
  },
  {
    id: "no-refunds",
    number: 2,
    title: "Cancellations & Refunds",
    content: (
      <>
        <p>
          Unless explicitly stated on the checkout page for a specific program,{" "}
          <strong>payments are non-refundable</strong> once successfully processed.
        </p>
        <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30 rounded-xl">
          <p className="text-sm font-semibold text-amber-800 dark:text-amber-200 flex items-center gap-2">
            <FiAlertCircle className="w-4 h-4" />
            Important
          </p>
          <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
            All payments made towards course enrollment, registration, or reservation of seats are final and non-refundable.
            Please review all program details carefully before making a payment.
          </p>
        </div>
      </>
    ),
  },
  {
    id: "why",
    number: 3,
    title: "Why Refunds Are Restricted",
    content: (
      <>
        <p className="mb-4">
          We restrict refunds because programs are delivered with limited seats and pre-allocated resources.
          Once you enroll, multiple costs are committed upfront.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { icon: <FiUsers className="w-5 h-5" />, title: "Limited seats", desc: "Programs have fixed capacity. Mid-program withdrawals disrupt seat planning." },
            { icon: <FiClock className="w-5 h-5" />, title: "Resource allocation", desc: "Mentor time, evaluation bandwidth, and platform resources are reserved per learner." },
            { icon: <FiCreditCard className="w-5 h-5" />, title: "Operational costs", desc: "Payment processing, onboarding, and support operations incur immediate costs." },
            { icon: <FiSend className="w-5 h-5" />, title: "Delivery starts early", desc: "Access to materials, guidance, and scheduling often begins right after enrollment." },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-3 p-4 rounded-xl bg-secondary/50 border border-border">
              <div className="text-primary mt-0.5">{item.icon}</div>
              <div>
                <h4 className="text-sm font-bold text-foreground">{item.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: "duplicate",
    number: 4,
    title: "Refunds for Duplicate Payments",
    content: (
      <>
        <p>
          If you are charged twice for the same order, we will process a refund for the duplicate amount after verification.
        </p>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Email <a href="mailto:support@persevex.com" className="text-primary hover:underline">support@persevex.com</a> with your transaction reference(s) and registered email/phone.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>After verification, refunds are processed to the original payment method where possible (or via an alternative method based on payment partner constraints).</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Typical processing timelines depend on the payment gateway and banking network (usually 1-5 business days).</span>
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "contact",
    number: 5,
    title: "Contact & Requests",
    content: (
      <>
        <p>
          For refund-related queries (including duplicate payments), contact{" "}
          <a href="mailto:support@persevex.com" className="text-primary hover:underline">support@persevex.com</a> with:
        </p>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span>Your full name</span></li>
          <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span>Registered email / phone</span></li>
          <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span>Program name</span></li>
          <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span>Transaction ID(s) / payment reference</span></li>
        </ul>
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800/30 rounded-xl">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            <strong>Note:</strong> Payments are non-refundable once processed, except in cases of verified duplicate payment or where a program page explicitly states a cancellation window.
          </p>
        </div>
      </>
    ),
  },
];

export default function RefundPolicyPage() {
  return (
    <main className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative py-20 bg-slate-50 dark:bg-card overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-0 -left-32 w-80 h-80 rounded-full bg-highlight/15 blur-3xl" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 border border-primary/20"
          >
            Refunds &amp; Payments
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-foreground mb-4"
          >
            Refund Policy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto text-base"
          >
            Last updated: February 2026
          </motion.p>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="border-b border-border bg-card">
        <div className="max-w-4xl mx-auto px-6 md:px-10 py-4">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">Quick navigation</p>
          <div className="flex flex-wrap gap-2">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="text-xs font-medium text-primary hover:underline px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10 transition-colors hover:bg-primary/10">
                {s.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white dark:bg-background">
        <div className="max-w-4xl mx-auto px-6 md:px-10 space-y-16">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              id={section.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="scroll-mt-24"
            >
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-3xl font-black text-primary/20">{section.number}</span>
                <h2 className="text-xl font-bold text-foreground">{section.title}</h2>
              </div>
              <div className="text-sm text-muted-foreground leading-relaxed">
                {section.content}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
