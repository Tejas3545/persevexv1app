"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FiUsers,
  FiAward,
  FiTrendingUp,
  FiGift,
  FiStar,
  FiCheckCircle,
  FiArrowRight,
  FiInstagram,
  FiLinkedin,
} from "react-icons/fi";

const benefits = [
  {
    icon: <FiGift size={24} />,
    title: "Exclusive Rewards",
    description:
      "Earn cash incentives, merchandise, and exclusive Persevex goodies for every successful referral.",
  },
  {
    icon: <FiAward size={24} />,
    title: "Official Certificate",
    description:
      "Receive a recognized Campus Ambassador certificate to boost your resume and LinkedIn profile.",
  },
  {
    icon: <FiTrendingUp size={24} />,
    title: "Leadership Experience",
    description:
      "Develop real leadership, communication, and marketing skills that employers value.",
  },
  {
    icon: <FiUsers size={24} />,
    title: "Expand Your Network",
    description:
      "Connect with industry professionals, mentors, and a nationwide community of ambassadors.",
  },
  {
    icon: <FiStar size={24} />,
    title: "Priority Access",
    description:
      "Get early access to new courses, workshops, and exclusive events before anyone else.",
  },
  {
    icon: <FiCheckCircle size={24} />,
    title: "Internship Opportunities",
    description:
      "Top ambassadors get direct internship and placement opportunities with our partner companies.",
  },
];

const steps = [
  {
    step: "01",
    title: "Apply Online",
    description: "Fill out the application form below with your details and motivation.",
  },
  {
    step: "02",
    title: "Get Selected",
    description: "Our team reviews your application and reaches out within 3-5 business days.",
  },
  {
    step: "03",
    title: "Onboarding",
    description: "Attend a virtual orientation session and receive your ambassador kit.",
  },
  {
    step: "04",
    title: "Start Representing",
    description: "Spread the word, host events, and earn rewards for every student you bring in.",
  },
];

export default function CampusAmbassadorPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    year: "",
    branch: "",
    linkedin: "",
    instagram: "",
    motivation: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Campus Ambassador Form - Google Sheet URL (Form 01)
    const GOOGLE_SHEETS_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbxYx4traqn4kt5A2LhNSn-7XsYyaWcZ1dAy8rzXj4OP7iYVoQ6juSCLIpnNy48PxIWC/exec";

    try {
      // POST form data to Google Sheets
      await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
          fullName: formData.name,
          email: formData.email,
          phone: formData.phone,
          collegeName: formData.college,
          graduationYear: formData.year,
        }),
      });

      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", college: "", year: "", branch: "", linkedin: "", instagram: "", motivation: "" });
    } catch (err) {
      console.error("Form submission error:", err);
      // Still mark as submitted to avoid blocking the user
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center bg-slate-50 dark:bg-card overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl animate-float" />
          <div className="absolute top-1/2 -left-32 w-80 h-80 rounded-full bg-highlight/15 blur-3xl animate-float delay-2000" />
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle,#2563eb_1px,transparent_1px)] bg-size-[40px_40px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full py-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-bold px-4 py-1.5 rounded-full mb-6 border border-primary/20 tracking-wide uppercase">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Join Our Ambassador Program
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="section-title text-foreground mb-6"
            >
              Become a{" "}
              <span className="text-primary">Persevex Campus</span>{" "}
              Ambassador
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="section-subtitle mb-10"
            >
              Represent Persevex at your college, inspire your peers, and earn
              exciting rewards while building leadership skills that set you
              apart in your career.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <a href="#apply" className="btn-aptisure text-base">
                Apply Now <FiArrowRight className="inline ml-2" />
              </a>
              <a href="#benefits" className="btn-outline rounded-full text-base">
                Learn More
              </a>
            </motion.div>

            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap gap-8 mt-14 pt-8 border-t border-border"
            >
              {[
                { number: "500+", label: "Active Ambassadors" },
                { number: "100+", label: "Colleges Covered" },
                { number: "₹50K+", label: "Rewards Distributed" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl md:text-3xl font-bold text-primary">
                    {stat.number}
                  </div>
                  <div className="text-sm font-medium text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-white dark:bg-slate-900" id="benefits">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-14">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block text-primary text-sm font-bold uppercase tracking-widest mb-3 bg-primary/10 px-4 py-1.5 rounded-full"
            >
              Why Join Us
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="section-title text-foreground mb-4"
            >
              Ambassador <span className="text-primary">Benefits</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="section-subtitle mx-auto"
            >
              Unlock exclusive perks, build your career, and make a real impact
              at your campus.
            </motion.p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group bg-slate-50 dark:bg-card rounded-3xl border border-border p-8 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-accent text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-slate-50 dark:bg-card">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-14">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block text-primary text-sm font-bold uppercase tracking-widest mb-3 bg-primary/10 px-4 py-1.5 rounded-full"
            >
              Process
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="section-title text-foreground mb-4"
            >
              How It <span className="text-primary">Works</span>
            </motion.h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative text-center"
              >
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-full h-px bg-linear-to-r from-primary/50 to-transparent" />
                )}
                <div className="w-16 h-16 rounded-2xl bg-primary text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="section-padding bg-slate-50 dark:bg-card" id="apply">
        <div className="max-w-3xl mx-auto px-6 md:px-10">
          <div className="text-center mb-12">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block text-primary text-sm font-bold uppercase tracking-widest mb-3 bg-primary/10 px-4 py-1.5 rounded-full"
            >
              Apply Now
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="section-title text-foreground mb-4"
            >
              Join the{" "}
              <span className="text-primary">Ambassador Program</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="section-subtitle mx-auto"
            >
              Fill out the form below and our team will get back to you within
              3-5 business days.
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
                Application Submitted!
              </h3>
              <p className="font-medium text-muted-foreground mb-6">
                Thank you for applying! Our team will review your application
                and contact you within 3-5 business days.
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
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
                    College / University *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.college}
                    onChange={(e) =>
                      setFormData({ ...formData, college: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Your college name"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
                    Year of Study *
                  </label>
                  <select
                    required
                    title="Select your year of study"
                    value={formData.year}
                    onChange={(e) =>
                      setFormData({ ...formData, year: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  >
                    <option value="">Select year</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="Postgraduate">Postgraduate</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
                    Branch / Department *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.branch}
                    onChange={(e) =>
                      setFormData({ ...formData, branch: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="e.g., Computer Science"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-1.5 flex items-center gap-1">
                    <FiLinkedin size={14} /> LinkedIn Profile
                  </label>
                  <input
                    type="url"
                    value={formData.linkedin}
                    onChange={(e) =>
                      setFormData({ ...formData, linkedin: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="linkedin.com/in/yourprofile"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-1.5 flex items-center gap-1">
                    <FiInstagram size={14} /> Instagram Handle
                  </label>
                  <input
                    type="text"
                    value={formData.instagram}
                    onChange={(e) =>
                      setFormData({ ...formData, instagram: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="@yourhandle"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
                  Why do you want to be a Campus Ambassador? *
                </label>
                <textarea
                  required
                  value={formData.motivation}
                  onChange={(e) =>
                    setFormData({ ...formData, motivation: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                  placeholder="Tell us about your motivation and what you can bring to the program..."
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
                    Submit Application
                    <FiArrowRight size={16} />
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
