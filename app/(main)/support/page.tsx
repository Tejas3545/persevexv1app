"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiChevronDown,
  FiMail,
  FiPhone,
  FiMessageCircle,
  FiBook,
  FiHelpCircle,
  FiSend,
  FiCheckCircle,
  FiClock,
  FiZap,
} from "react-icons/fi";
import Link from "next/link";

const supportFaqs = [
  {
    category: "Enrollment & Courses",
    questions: [
      {
        question: "How do I enroll in a course?",
        answer:
          "You can enroll by visiting our Enroll page, selecting your desired course, and completing the registration form. Our team will contact you within 24 hours to confirm your enrollment and provide payment details.",
      },
      {
        question: "Can I switch courses after enrollment?",
        answer:
          "Yes, you can switch courses within the first 7 days of enrollment. Please contact our support team at support@persevex.com or call us at +91 74004 84725 to initiate the switch.",
      },
      {
        question: "Are the courses available online or offline?",
        answer:
          "Persevex offers both online and hybrid learning options. Most courses are conducted online via live sessions, with some programs offering in-person workshops. Check individual course pages for specific details.",
      },
      {
        question: "What is the duration of each course?",
        answer:
          "Course durations vary by program. Technical courses typically run 4-8 weeks, while management and specialized courses may range from 6-12 weeks. Each course page lists the exact duration.",
      },
    ],
  },
  {
    category: "Certificates & Internships",
    questions: [
      {
        question: "Will I receive a certificate upon completion?",
        answer:
          "Yes! Upon successful completion of your course and projects, you will receive an industry-recognized certificate from Persevex. This certificate is backed by our NSDC, AICTE, and ISO certifications.",
      },
      {
        question: "How do I verify my certificate?",
        answer:
          "You can verify your certificate using our Certificate Verification tool available on our website. Enter your certificate ID to instantly verify its authenticity.",
      },
      {
        question: "Is an internship included with the course?",
        answer:
          "Yes, most of our courses include a virtual internship component where you work on real-world projects. Some programs also offer placement assistance with our partner companies.",
      },
    ],
  },
  {
    category: "Payments & Refunds",
    questions: [
      {
        question: "What payment methods are accepted?",
        answer:
          "We accept UPI, net banking, credit/debit cards, and EMI options. For EMI, we partner with leading banks to offer 0% interest plans for eligible students.",
      },
      {
        question: "What is the refund policy?",
        answer:
          "We offer a 7-day money-back guarantee. If you are not satisfied with the course within the first 7 days, you can request a full refund. Please refer to our Return Policy page for complete details.",
      },
      {
        question: "Are there any scholarships available?",
        answer:
          "Yes, we offer merit-based scholarships and financial assistance for deserving students. Contact our admissions team to learn about current scholarship opportunities.",
      },
    ],
  },
  {
    category: "Technical Support",
    questions: [
      {
        question: "I cannot access the LMS portal. What should I do?",
        answer:
          "First, try clearing your browser cache and cookies. If the issue persists, try a different browser. If you still cannot access the portal, contact us at support@persevex.com with your enrollment ID.",
      },
      {
        question: "How do I reset my LMS password?",
        answer:
          "Go to the LMS login page and click on 'Forgot Password'. Enter your registered email address and follow the instructions sent to your inbox. If you don't receive the email, check your spam folder.",
      },
    ],
  },
];

const contactOptions = [
  {
    icon: <FiMail size={24} />,
    title: "Email Support",
    description: "Get a response within 24 hours",
    contact: "support@persevex.com",
    href: "mailto:support@persevex.com",
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    icon: <FiPhone size={24} />,
    title: "Phone Support",
    description: "Mon-Sat, 9 AM - 6 PM IST",
    contact: "+91 74004 84725",
    href: "tel:+917400484725",
    color: "bg-green-500/10 text-green-500",
  },
  {
    icon: <FiMessageCircle size={24} />,
    title: "WhatsApp",
    description: "Quick responses on WhatsApp",
    contact: "Chat with us",
    href: "https://wa.me/918660128339",
    color: "bg-emerald-500/10 text-emerald-500",
  },
];

const supportFeatures = [
  {
    icon: <FiZap size={20} />,
    title: "Fast Response",
    description: "We respond to all queries within 24 hours",
  },
  {
    icon: <FiClock size={20} />,
    title: "Extended Hours",
    description: "Support available Mon-Sat, 9 AM to 6 PM",
  },
  {
    icon: <FiBook size={20} />,
    title: "Knowledge Base",
    description: "Comprehensive FAQs and guides available",
  },
  {
    icon: <FiHelpCircle size={20} />,
    title: "Dedicated Team",
    description: "Expert support team ready to help you",
  },
];

function FaqAccordion({ questions }: { questions: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {questions.map((faq, index) => (
        <div
          key={index}
          className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-border overflow-hidden"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer"
          >
            <span className="text-sm font-semibold text-foreground pr-4">
              {faq.question}
            </span>
            <motion.div
              animate={{ rotate: openIndex === index ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="shrink-0"
            >
              <FiChevronDown
                size={16}
                className={openIndex === index ? "text-primary" : "text-muted-foreground"}
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
                <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-border pt-3">
                  {faq.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

export default function SupportPage() {
  const [ticketData, setTicketData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmitted(true);
    setIsSubmitting(false);
  };

  return (
    <main className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative py-20 bg-slate-50 dark:bg-card overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-0 -left-32 w-80 h-80 rounded-full bg-highlight/15 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 border border-primary/20"
          >
            <FiHelpCircle size={14} />
            Help Center
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="section-title text-foreground mb-4"
          >
            How Can We <span className="text-primary">Help You?</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="section-subtitle mx-auto mb-10"
          >
            Find answers to common questions, contact our support team, or
            submit a support ticket.
          </motion.p>
        </div>
      </section>

      {/* Support Features */}
      <section className="py-12 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-accent text-primary flex items-center justify-center shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="section-padding bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-title text-foreground mb-4"
            >
              Contact <span className="text-primary">Options</span>
            </motion.h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {contactOptions.map((option, index) => (
              <motion.a
                key={option.title}
                href={option.href}
                target={option.href.startsWith("http") ? "_blank" : undefined}
                rel={option.href.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-slate-50 dark:bg-card rounded-3xl border border-border p-8 text-center shadow-sm hover:shadow-md transition-all duration-300 block group"
              >
                <div
                  className={`w-14 h-14 rounded-2xl ${option.color} flex items-center justify-center mx-auto mb-4`}
                >
                  {option.icon}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-1">
                  {option.title}
                </h3>
                <p className="text-xs text-muted-foreground mb-3">
                  {option.description}
                </p>
                <span className="text-sm font-semibold text-primary">
                  {option.contact}
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-slate-50 dark:bg-background">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <div className="text-center mb-12">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block text-primary text-sm font-bold uppercase tracking-widest mb-3 bg-primary/10 px-4 py-1.5 rounded-full"
            >
              FAQ
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="section-title text-foreground mb-4"
            >
              Frequently Asked{" "}
              <span className="text-primary">Questions</span>
            </motion.h2>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-3 mb-8 justify-center">
            {supportFaqs.map((cat, index) => (
              <button
                key={cat.category}
                onClick={() => setActiveCategory(index)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${activeCategory === index
                  ? "bg-primary text-white shadow-md"
                  : "bg-muted text-muted-foreground hover:bg-accent"
                  }`}
              >
                {cat.category}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <FaqAccordion questions={supportFaqs[activeCategory].questions} />
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Submit Ticket */}
      <section id="support-form" className="scroll-mt-20 section-padding bg-white dark:bg-slate-900">
        <div className="max-w-2xl mx-auto px-6 md:px-10">
          <div className="text-center mb-12">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block text-primary text-sm font-bold uppercase tracking-widest mb-3 bg-primary/10 px-4 py-1.5 rounded-full"
            >
              Support Ticket
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="section-title text-foreground mb-4"
            >
              Submit a <span className="text-primary">Support Ticket</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="section-subtitle mx-auto"
            >
              Can&apos;t find what you&apos;re looking for? Submit a ticket and
              our team will get back to you.
            </motion.p>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-border p-12 text-center shadow-sm"
            >
              <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                <FiCheckCircle size={32} className="text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Ticket Submitted!
              </h3>
              <p className="font-medium text-muted-foreground mb-6">
                Your support ticket has been submitted. We&apos;ll respond to
                your query within 24 hours.
              </p>
              <Link href="/" className="btn-aptisure inline-block">
                Back to Home
              </Link>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-border p-8 shadow-sm space-y-6"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={ticketData.name}
                    onChange={(e) =>
                      setTicketData({ ...ticketData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={ticketData.email}
                    onChange={(e) =>
                      setTicketData({ ...ticketData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
                  Category *
                </label>
                <select
                  required
                  title="Support category"
                  value={ticketData.category}
                  onChange={(e) =>
                    setTicketData({ ...ticketData, category: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                >
                  <option value="">Select a category</option>
                  <option value="enrollment">Enrollment & Courses</option>
                  <option value="certificate">Certificates & Internships</option>
                  <option value="payment">Payments & Refunds</option>
                  <option value="technical">Technical Support</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
                  Subject *
                </label>
                <input
                  type="text"
                  required
                  value={ticketData.subject}
                  onChange={(e) =>
                    setTicketData({ ...ticketData, subject: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Brief description of your issue"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
                  Message *
                </label>
                <textarea
                  required
                  value={ticketData.message}
                  onChange={(e) =>
                    setTicketData({ ...ticketData, message: e.target.value })
                  }
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                  placeholder="Describe your issue in detail..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-aptisure w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Ticket
                    <FiSend size={16} />
                  </>
                )}
              </button>
            </motion.form>
          )}
        </div>
      </section>
    </main>
  );
}
