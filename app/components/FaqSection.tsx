"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiArrowRight } from "react-icons/fi";
import Link from "next/link";

const faqs = [
  {
    question: "What courses does Persevex offer?",
    answer:
      "Persevex offers a wide range of industry-ready courses across multiple domains including Technical (Full Stack Web Development, Cloud Computing, Machine Learning, AI, Data Science, CyberSecurity), Electronics & Electrical (IoT, Embedded Systems, VLSI), Management & Commerce (HR, Digital Marketing, Finance, Logistics, Business Analytics, Stock Market), Civil & Mechanical (AutoCAD, Drone Mechanics, HEVs), and more.",
  },
  {
    question: "Are the courses online or offline?",
    answer:
      "Persevex offers both online and hybrid learning options. Most courses are conducted online via live sessions with expert mentors. Some programs offer in-person workshops and lab sessions. You can learn from anywhere in India with our flexible online format.",
  },
  {
    question: "Will I receive a certificate after completing the course?",
    answer:
      "Yes! Upon successful completion of your course and projects, you will receive an industry-recognized certificate from Persevex. Our certificates are backed by NSDC, AICTE, and ISO 9001:2015 certifications, making them highly valued by employers.",
  },
  {
    question: "Is an internship included with the course?",
    answer:
      "Yes, most of our courses include a virtual internship component where you work on real-world industry projects. You'll receive an internship certificate upon completion, which adds significant value to your resume and LinkedIn profile.",
  },
  {
    question: "What is the fee structure and are there EMI options?",
    answer:
      "Our course fees are competitive and vary by program. We offer flexible payment options including one-time payment, installment plans, and 0% EMI through partner banks. Visit our Fees page for detailed pricing or contact us for personalized guidance.",
  },
  {
    question: "How does the placement assistance work?",
    answer:
      "Our placement assistance includes resume building, LinkedIn profile optimization, mock interviews, and direct referrals to our 50+ hiring partner companies. We have a dedicated placement team that works with you until you land your desired role.",
  },
  {
    question: "What is the duration of each course?",
    answer:
      "Course durations vary by program. Technical courses typically run 4-8 weeks, management courses 6-10 weeks, and specialized programs like Drone Mechanics or VLSI may run 8-12 weeks. Each course page lists the exact duration and schedule.",
  },
  {
    question: "Can I switch courses after enrollment?",
    answer:
      "Yes, you can switch courses within the first 7 days of enrollment at no extra charge. After 7 days, a nominal switching fee may apply. Contact our support team at info@persevex.com to initiate a course switch.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section-padding bg-slate-50 dark:bg-card" id="faq">
      <div className="max-w-4xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="inline-block text-primary text-sm font-bold uppercase tracking-widest mb-3 bg-primary/10 px-4 py-1.5 rounded-full"
          >
            FAQ
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.1 }}
            className="section-title text-foreground mb-4"
          >
            Frequently Asked{" "}
            <span className="text-primary">Questions</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.2 }}
            className="section-subtitle mx-auto"
          >
            Got questions? We&apos;ve got answers. Find everything you need to
            know about our programs and services.
          </motion.p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-border shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer group"
              >
                <span className="text-sm font-bold text-foreground pr-4 group-hover:text-primary transition-colors">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0"
                >
                  <FiChevronDown
                    size={18}
                    className={`transition-colors ${openIndex === index
                        ? "text-primary"
                        : "text-muted-foreground"
                      }`}
                  />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* More Questions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12 p-8 bg-white dark:bg-slate-900 rounded-3xl border border-border shadow-sm"
        >
          <p className="text-sm font-medium text-muted-foreground mb-6">
            Still have questions? Our support team is here to help.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/support"
              className="btn-aptisure text-sm inline-flex items-center gap-2"
            >
              Visit Support Center
              <FiArrowRight size={14} />
            </Link>
            <a
              href="mailto:info@persevex.com"
              className="btn-outline rounded-full text-sm bg-white dark:bg-slate-900 text-foreground border border-border hover:bg-muted"
            >
              Email Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
