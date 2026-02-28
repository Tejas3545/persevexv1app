"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiRefreshCw, FiAlertCircle } from "react-icons/fi";

const sections = [
  {
    id: "overview",
    number: 1,
    title: "Overview",
    content: (
      <>
        <p>
          <strong>PERSEVEX EDUCATION CONSULTANCY LLP</strong> (&quot;Persevex&quot;) believes in helping its customers. This policy governs cancellations, course changes, rescheduling, and refunds for purchases made on persevex.com.
        </p>
        <p className="mt-3">
          This policy should be read alongside our{" "}
          <Link href="/refund-policy" className="text-primary hover:underline">Refund Policy</Link>,{" "}
          <Link href="/terms-&-conditions" className="text-primary hover:underline">Terms &amp; Conditions</Link>, and{" "}
          <Link href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>.
        </p>
      </>
    ),
  },
  {
    id: "no-returns",
    number: 2,
    title: "No Returns",
    content: (
      <>
        <p>
          Persevex Education Consultancy LLP <strong>does not accept returns under any circumstances</strong> for any course or service purchased via{" "}
          <a href="https://www.persevex.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.persevex.com</a>.
        </p>
        <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30 rounded-xl">
          <p className="text-sm font-semibold text-amber-800 dark:text-amber-200 flex items-center gap-2">
            <FiAlertCircle className="w-4 h-4" />
            Important
          </p>
          <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
            All payments made towards course enrollment, registration, or reservation of seats are final and non-refundable. Please review all program details carefully before making a payment.
          </p>
        </div>
      </>
    ),
  },
  {
    id: "course-change",
    number: 3,
    title: "Course Change",
    content: (
      <>
        <p>
          Course change is allowed <strong>only once</strong> and must be requested at least 7 days prior to the original course start date. The new course must have available seats and should be completed within 30 days of the original course&apos;s end date.
        </p>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2"><span className="text-primary mt-1">&bull;</span><span>If switching to a higher-value course, the learner must pay the difference</span></li>
          <li className="flex items-start gap-2"><span className="text-primary mt-1">&bull;</span><span>No refund will be issued if switching to a lower-value course</span></li>
          <li className="flex items-start gap-2"><span className="text-primary mt-1">&bull;</span><span>A non-refundable processing fee of ₹500 must be paid within 3 days of approval, failing which the request will be canceled</span></li>
          <li className="flex items-start gap-2"><span className="text-primary mt-1">&bull;</span><span>To request a course change, email <a href="mailto:support@persevex.com" className="text-primary hover:underline">support@persevex.com</a>. Once approved, submit the &quot;Course Change Form&quot; within 3 business days and pay the required fees. Confirmation will be sent within 5–7 business days.</span></li>
        </ul>
      </>
    ),
  },
  {
    id: "rescheduling",
    number: 4,
    title: "Rescheduling",
    content: (
      <>
        <p>
          Learners may request rescheduling at least <strong>10 business days</strong> before the course start date. The new course must start within 90 days and is subject to seat availability. Rescheduling does not permit course changes.
        </p>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2"><span className="text-primary mt-1">&bull;</span><span>A non-refundable rescheduling fee of ₹500 must be paid within 5 business days from approval</span></li>
          <li className="flex items-start gap-2"><span className="text-primary mt-1">&bull;</span><span>The reschedule request will be canceled if payment is not made within this period</span></li>
          <li className="flex items-start gap-2"><span className="text-primary mt-1">&bull;</span><span>To request rescheduling, email <a href="mailto:support@persevex.com" className="text-primary hover:underline">support@persevex.com</a>. Once approved, submit the &quot;Reschedule Course Form&quot; and the fee payment receipt within 3 business days. Confirmation will be sent within 5–7 business days.</span></li>
        </ul>
      </>
    ),
  },
  {
    id: "cancellation-by-persevex",
    number: 5,
    title: "Cancellation by Persevex",
    content: (
      <>
        <p>
          Persevex reserves the right to cancel any session due to instructor unavailability, insufficient participants, or force majeure events (natural disasters, protests, strikes, etc.).
        </p>
        <p className="mt-3">
          If Persevex reschedules a course due to delays or unforeseen circumstances, learners may request a full refund or enroll in a different batch/course. Reimbursements will only cover the course fee. Any personal expenses are not refundable.
        </p>
      </>
    ),
  },
  {
    id: "refund-conditions",
    number: 6,
    title: "Refund Conditions",
    content: (
      <>
        <p>
          Refunds will only be processed if Persevex fails to deliver the course within 30 days of the scheduled start date. <strong>No refunds will be provided under any other condition.</strong>
        </p>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2"><span className="text-primary mt-1">&bull;</span><span>All refund requests must be submitted exclusively via email to <a href="mailto:support@persevex.com" className="text-primary hover:underline">support@persevex.com</a> at least 7 days prior to the commencement of the selected month</span></li>
          <li className="flex items-start gap-2"><span className="text-primary mt-1">&bull;</span><span>Refund requests cannot be raised over phone calls</span></li>
          <li className="flex items-start gap-2"><span className="text-primary mt-1">&bull;</span><span>Refunds will be issued to the original payment method within 1–2 business days after approval</span></li>
          <li className="flex items-start gap-2"><span className="text-primary mt-1">&bull;</span><span>No cash refunds. Payments made via card, bank transfer, or platforms like PhonePe, Google Pay, etc., will be refunded to the same source.</span></li>
        </ul>
      </>
    ),
  },
  {
    id: "contact",
    number: 7,
    title: "Contact",
    content: (
      <p>
        For any queries related to returns, course changes, rescheduling, or refunds, please email{" "}
        <a href="mailto:support@persevex.com" className="text-primary hover:underline">support@persevex.com</a>.
      </p>
    ),
  },
];

export default function CancellationRefundPage() {
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
            <FiRefreshCw className="w-3.5 h-3.5" />
            Returns &amp; Cancellation
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-foreground mb-4"
          >
            Cancellation &amp; Return Policy
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
              transition={{ delay: index * 0.03 }}
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
