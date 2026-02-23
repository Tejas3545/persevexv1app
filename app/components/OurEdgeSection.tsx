"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FiAward,
  FiUsers,
  FiBriefcase,
  FiCode,
  FiBookOpen,
  FiTrendingUp,
  FiCheckCircle,
  FiGlobe,
  FiZap,
} from "react-icons/fi";

const edges = [
  {
    title: "Real-World Projects",
    description:
      "Work on genuine industry problems, not toy exercises. Build portfolio-worthy projects mentored by professionals from top companies.",
    icon: <FiCode size={24} />,
    highlight: "80% Practical",
  },
  {
    title: "Expert Mentorship",
    description:
      "Learn directly from industry experts who bring years of experience across top companies like Infosys, TCS, Wipro, and more.",
    icon: <FiUsers size={24} />,
    highlight: "20+ Mentors",
  },
  {
    title: "Industry Certifications",
    description:
      "Earn NSDC, AICTE, and ISO-recognized certificates that validate your skills and significantly boost your resume.",
    icon: <FiAward size={24} />,
    highlight: "NSDC Certified",
  },
  {
    title: "Career Support",
    description:
      "Resume building, mock interviews, LinkedIn optimization, and placement assistance to help you land your dream job.",
    icon: <FiBriefcase size={24} />,
    highlight: "Placement Assist",
  },
  {
    title: "Hands-On Learning",
    description:
      "80% practical curriculum with live sessions, coding labs, interactive assignments, and real-time feedback from mentors.",
    icon: <FiBookOpen size={24} />,
    highlight: "Live Sessions",
  },
  {
    title: "Proven Results",
    description:
      "95% satisfaction rate with students placed at leading organizations across industries including IT, Finance, and Marketing.",
    icon: <FiTrendingUp size={24} />,
    highlight: "95% Success",
  },
  {
    title: "Internship Included",
    description:
      "Every course includes a virtual internship component with real projects, giving you the experience employers look for.",
    icon: <FiCheckCircle size={24} />,
    highlight: "Internship Cert",
  },
  {
    title: "Global Curriculum",
    description:
      "Curriculum designed in alignment with global industry standards, keeping you ahead of the curve in a rapidly evolving job market.",
    icon: <FiGlobe size={24} />,
    highlight: "Industry Aligned",
  },
  {
    title: "Fast-Track Learning",
    description:
      "Intensive, focused programs designed to get you job-ready in weeks, not years. Learn at your own pace with lifetime access.",
    icon: <FiZap size={24} />,
    highlight: "4-12 Weeks",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function OurEdgeSection() {
  return (
    <section className="section-padding bg-slate-50 dark:bg-card" id="our-edge">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-3"
          >
            Why Choose Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.1 }}
            className="section-title text-foreground mb-4"
          >
            The Persevex <span className="gradient-text-blue">Edge</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.2 }}
            className="section-subtitle mx-auto"
          >
            What makes us different? A commitment to practical excellence,
            genuine career outcomes, and industry-recognized credentials.
          </motion.p>
        </div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {edges.map((edge) => (
            <motion.div
              key={edge.title}
              variants={cardVariants}
              className="group bg-card rounded-2xl border border-border p-7 card-hover relative overflow-hidden"
            >
              {/* Highlight badge */}
              <div className="absolute top-4 right-4">
                <span className="text-xs font-semibold text-primary bg-accent px-2 py-0.5 rounded-full">
                  {edge.highlight}
                </span>
              </div>

              <div className="w-12 h-12 rounded-xl bg-accent text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300 group-hover:scale-110">
                {edge.icon}
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {edge.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {edge.description}
              </p>

              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-3 bg-card border border-border rounded-2xl px-8 py-5">
            <div className="flex -space-x-2">
              {["/c2.webp", "/c3.webp", "/c4.webp", "/c5.webp"].map((img, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-card overflow-hidden"
                >
                  <img src={img} alt="Student" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="text-left">
              <div className="text-sm font-bold text-foreground">
                Join 5000+ Students
              </div>
              <div className="text-xs text-muted-foreground">
                Already building their careers with Persevex
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
