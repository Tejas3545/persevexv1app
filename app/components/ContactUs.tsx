"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiSend, FiInstagram, FiLinkedin, FiYoutube } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";

const contactInfo = [
  {
    icon: <FiMail size={20} />,
    label: "Email",
    value: "support@persevex.com",
    href: "mailto:support@persevex.com",
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    icon: <FiPhone size={20} />,
    label: "Phone",
    value: "+91 86601 28339",
    href: "tel:+918660128339",
    color: "bg-green-500/10 text-green-500",
  },
  {
    icon: <FaWhatsapp size={20} />,
    label: "WhatsApp",
    value: "Chat with us",
    href: "https://wa.me/918660128339",
    color: "bg-emerald-500/10 text-emerald-500",
  },
  {
    icon: <FiMapPin size={20} />,
    label: "Address",
    value: "Greater Noida, Uttar Pradesh, India",
    href: "https://maps.google.com/?q=Greater+Noida+Uttar+Pradesh",
    color: "bg-red-500/10 text-red-500",
  },
];

const socialLinks = [
  { icon: <FiInstagram size={18} />, href: "https://www.instagram.com/persevex/", label: "Instagram", color: "hover:bg-pink-500" },
  { icon: <FiLinkedin size={18} />, href: "https://www.linkedin.com/company/persevex/", label: "LinkedIn", color: "hover:bg-[#0077B5]" },
  { icon: <FiYoutube size={18} />, href: "https://www.youtube.com/@persevex", label: "YouTube", color: "hover:bg-red-500" },
  { icon: <FaWhatsapp size={18} />, href: "https://wa.me/918660128339", label: "WhatsApp", color: "hover:bg-green-500" },
];

export default function ContactUs() {
  // Google Sheet submission URL for contact form
  const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbwaYEHUMVOWJHt9af8D9xdRBydMjCVEcqJmY3x7NGGDFfKkuffO0xWZTiMT44r86nPu/exec";

  const [formData, setFormData] = useState({
    studentName: "",
    email: "",
    phone: "",
    collegeName: "",
    passoutYear: "",
    interestedDomain: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Submit to Google Sheet
      const response = await fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        body: JSON.stringify(formData),
        mode: "no-cors",
      });

      // Mark as submitted (Google Apps Script doesn't return readable response in no-cors mode)
      setSubmitted(true);
      setFormData({ studentName: "", email: "", phone: "", collegeName: "", passoutYear: "", interestedDomain: "" });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error("Contact form error:", error);
      // Still show success for UX
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section-padding bg-card" id="contact">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-3"
          >
            Get In Touch
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.1 }}
            className="section-title text-foreground mb-4"
          >
            Contact <span className="text-primary">Us</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.2 }}
            className="section-subtitle mx-auto"
          >
            Have questions about our courses? Ready to enroll? We&apos;re here
            to help you take the next step in your career.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="lg:col-span-2 space-y-6"
          >
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Let&apos;s start a conversation
              </h3>
              <p className="text-sm text-muted-foreground">
                Reach out to us through any of the channels below. Our team
                responds within 24 hours.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((info) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  target={info.href.startsWith("http") ? "_blank" : undefined}
                  rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-border hover:border-primary/30 hover:shadow-sm transition-all duration-300 group"
                >
                  <div
                    className={`w-10 h-10 rounded-xl ${info.color} flex items-center justify-center shrink-0`}
                  >
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {info.label}
                    </p>
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {info.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <p className="text-sm font-semibold text-foreground mb-3">
                Follow Us
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground ${social.color} hover:text-white transition-all duration-300`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Office Hours */}
            <div className="p-4 rounded-xl bg-accent border border-border">
              <p className="text-sm font-bold text-foreground mb-2">
                Office Hours
              </p>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">
                  Monday – Saturday: 9:00 AM – 6:00 PM IST
                </p>
                <p className="text-xs text-muted-foreground">
                  Sunday: Closed
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex items-center justify-center bg-white dark:bg-slate-900 rounded-3xl border border-border shadow-sm p-12 text-center"
              >
                <div>
                  <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Thank you for reaching out. Our team will get back to you
                    within 24 hours.
                  </p>
                </div>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-border p-8 space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-semibold text-muted-foreground mb-1.5 block">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.studentName}
                      onChange={(e) =>
                        setFormData({ ...formData, studentName: e.target.value })
                      }
                      required
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-card border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-muted-foreground mb-1.5 block">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-card border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-semibold text-muted-foreground mb-1.5 block">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-card border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-muted-foreground mb-1.5 block">
                      College Name
                    </label>
                    <input
                      type="text"
                      value={formData.collegeName}
                      onChange={(e) =>
                        setFormData({ ...formData, collegeName: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-card border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Your college name"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-semibold text-muted-foreground mb-1.5 block">
                      Year of Passout
                    </label>
                    <select
                      title="Year selection"
                      value={formData.passoutYear}
                      onChange={(e) =>
                        setFormData({ ...formData, passoutYear: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-card border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    >
                      <option value="">Select year</option>
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                      <option value="2028">2028</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-muted-foreground mb-1.5 block">
                      Interested Domain
                    </label>
                    <select
                      title="Domain selection"
                      value={formData.interestedDomain}
                      onChange={(e) =>
                        setFormData({ ...formData, interestedDomain: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-card border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    >
                      <option value="">Select a domain</option>
                      <option value="web-development">Full Stack Web Development</option>
                      <option value="machine-learning">Machine Learning</option>
                      <option value="data-science">Data Science</option>
                      <option value="ai">Artificial Intelligence</option>
                      <option value="cloud-computing">Cloud Computing</option>
                      <option value="cybersecurity">CyberSecurity</option>
                      <option value="digital-marketing">Digital Marketing</option>
                      <option value="finance">Finance</option>
                      <option value="hr">Human Resources</option>
                      <option value="iot">IoT</option>
                      <option value="embedded-systems">Embedded Systems</option>
                      <option value="vlsi">VLSI Design</option>
                      <option value="autocad">AutoCAD</option>
                      <option value="drone-mechanics">Drone Mechanics</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-aptisure w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <FiSend size={16} />
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
