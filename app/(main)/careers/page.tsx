"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Zap,
  Heart,
  Globe,
  Laptop,
  BookOpen,
  Coffee,
  ChevronDown,
  ArrowUpRight,
  MapPin,
  Clock,
  Briefcase,
  Mail,
} from "lucide-react";

// ─── Perks Data ──────────────────────────────────────────────────────────────
const perks = [
  {
    icon: Zap,
    title: "Impact from Day One",
    description:
      "Every role at Persevex directly shapes how thousands of students learn and grow. You're not a cog — you're an architect.",
    color: "#f59e0b",
  },
  {
    icon: Globe,
    title: "Remote-First Culture",
    description:
      "Work from wherever you're most productive. We run async-first and value output over hours-logged.",
    color: "#2563eb",
  },
  {
    icon: Laptop,
    title: "Modern Tech Stack",
    description:
      "We don't duct-tape legacy systems. Next.js, TypeScript, Prisma, Framer Motion — you'll love the codebase.",
    color: "#7c3aed",
  },
  {
    icon: BookOpen,
    title: "Learning Budget",
    description:
      "₹20,000/year for courses, books, or conferences of your choosing. We practice what we teach.",
    color: "#059669",
  },
  {
    icon: Heart,
    title: "Ownership & Autonomy",
    description:
      "You'll own your projects end-to-end — architecture, shipping, iteration. Minimal bureaucracy, maximum trust.",
    color: "#ef4444",
  },
  {
    icon: Coffee,
    title: "Flat Hierarchy",
    description:
      "Founders are reachable on Slack. No gatekeeping, no politics. The best ideas win regardless of who pitched them.",
    color: "#0891b2",
  },
];

// ─── Open Positions ───────────────────────────────────────────────────────────
type Position = {
  id: string;
  title: string;
  department: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship";
  location: string;
  description: string;
  requirements: string[];
};

const positions: Position[] = [
  {
    id: "fe-dev",
    title: "Frontend Developer",
    department: "Engineering",
    type: "Full-time",
    location: "Remote (India)",
    description:
      "Build and maintain the Persevex web platform using Next.js, TypeScript, and Framer Motion. You'll work on student-facing pages, dashboards, and interactive UI components.",
    requirements: [
      "2+ years with React / Next.js",
      "Strong TypeScript fundamentals",
      "Experience with Tailwind CSS",
      "Eye for detail and animation",
    ],
  },
  {
    id: "content-lead",
    title: "Curriculum Content Lead",
    department: "Education",
    type: "Full-time",
    location: "Remote (India)",
    description:
      "Design and maintain course curricula across our 30+ programs. Work directly with industry mentors to ensure content stays current and project-driven.",
    requirements: [
      "3+ years in EdTech or curriculum design",
      "Experience with technical subjects (CS, AI, or Engineering)",
      "Strong writing and structuring skills",
      "Passion for education",
    ],
  },
  {
    id: "placement-exec",
    title: "Placement Executive",
    department: "Careers",
    type: "Full-time",
    location: "Hybrid (Pune / Remote)",
    description:
      "Build and manage relationships with hiring partners. Facilitate mock interviews, resume reviews, and direct referrals for our student community.",
    requirements: [
      "1+ years in placement / talent acquisition",
      "Strong network in IT / business domains",
      "Excellent communication skills",
      "Comfort with targets",
    ],
  },
  {
    id: "social-intern",
    title: "Social Media & Marketing Intern",
    department: "Marketing",
    type: "Internship",
    location: "Remote",
    description:
      "Run Persevex's LinkedIn, Instagram, and YouTube presence. Create student success stories, reels, and campus outreach campaigns.",
    requirements: [
      "Active understanding of LinkedIn and Instagram growth",
      "Basic video editing skills",
      "Excellent written English",
      "Currently enrolled or recently graduated",
    ],
  },
];

// ─── Position Card ────────────────────────────────────────────────────────────
function PositionCard({ position, index }: { position: Position; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  const typeColors: Record<string, string> = {
    "Full-time": "text-emerald-600 bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-800",
    "Part-time": "text-blue-600 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800",
    Contract: "text-amber-600 bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800",
    Internship: "text-violet-600 bg-violet-50 dark:bg-violet-950 border-violet-200 dark:border-violet-800",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Header row */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full text-left px-6 py-5 flex items-start justify-between gap-4 cursor-pointer"
      >
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span
              className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${typeColors[position.type]}`}
            >
              {position.type}
            </span>
            <span className="text-xs text-muted-foreground font-medium bg-secondary px-2.5 py-0.5 rounded-full border border-border">
              {position.department}
            </span>
          </div>
          <h3 className="text-lg font-bold text-foreground">{position.title}</h3>
          <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin size={12} /> {position.location}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} /> {position.type}
            </span>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.22 }}
          className="flex-shrink-0 mt-1"
        >
          <ChevronDown size={20} className="text-muted-foreground" />
        </motion.div>
      </button>

      {/* Expanded details */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t border-border pt-5 space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {position.description}
              </p>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-foreground mb-2">
                  Requirements
                </p>
                <ul className="space-y-1.5">
                  {position.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href={`mailto:careers@persevex.com?subject=Application: ${position.title}`}
                className="inline-flex items-center gap-2 btn-aptisure text-sm mt-2"
              >
                Apply for this role <ArrowUpRight size={14} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function CareersPage() {
  return (
    <main className="overflow-x-hidden bg-background">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] flex items-center bg-slate-50 dark:bg-card overflow-hidden py-24">
        {/* Background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/4" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl -translate-x-1/4 translate-y-1/4" />
          {/* Dot grid */}
          <div className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04] bg-[radial-gradient(circle,#2563eb_1px,transparent_1px)] [background-size:36px_36px]" />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 md:px-10 w-full">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-primary/20 mb-7"
          >
            <Briefcase size={13} />
            Join the Team
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-foreground leading-[1.1] tracking-tight mb-6"
          >
            Help students{" "}
            <span className="text-primary">launch careers</span>.
            <br />
            Build yours here.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl leading-relaxed mb-10"
          >
            Persevex is on a mission to make quality, outcome-focused education accessible
            to every college student in India. If that excites you, we want to meet you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#open-roles"
              className="btn-aptisure inline-flex items-center gap-2"
            >
              See open roles <ChevronDown size={16} />
            </a>
            <a
              href="mailto:careers@persevex.com"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-border text-sm font-semibold text-foreground hover:bg-muted transition-colors"
            >
              <Mail size={15} /> Email us
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Why Work Here ────────────────────────────────────────────── */}
      <section className="section-padding bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="text-center mb-14">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block text-primary text-xs font-bold uppercase tracking-widest mb-3 bg-primary/10 px-4 py-1.5 rounded-full"
            >
              Benefits
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="section-title text-foreground mb-4"
            >
              Why build at <span className="text-primary">Persevex</span>?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="section-subtitle mx-auto"
            >
              We're a small team that ships big things. Here's what working with us looks like.
            </motion.p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {perks.map((perk, i) => {
              const Icon = perk.icon;
              return (
                <motion.div
                  key={perk.title}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.45 }}
                  whileHover={{ y: -4, transition: { duration: 0.18 } }}
                  className="group bg-slate-50 dark:bg-card border border-border rounded-3xl p-7 hover:shadow-lg transition-all duration-300"
                >
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${perk.color}18` }}
                  >
                    <Icon size={20} style={{ color: perk.color }} />
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-2">
                    {perk.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {perk.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Open Roles ───────────────────────────────────────────────── */}
      <section className="section-padding bg-slate-50 dark:bg-card" id="open-roles">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <div className="text-center mb-12">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block text-primary text-xs font-bold uppercase tracking-widest mb-3 bg-primary/10 px-4 py-1.5 rounded-full"
            >
              Now Hiring
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="section-title text-foreground mb-4"
            >
              Open <span className="text-primary">Positions</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="section-subtitle mx-auto"
            >
              Click any role to expand the details and apply directly.
            </motion.p>
          </div>

          <div className="space-y-4">
            {positions.map((position, index) => (
              <PositionCard key={position.id} position={position} index={index} />
            ))}
          </div>

          {/* General Application CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 p-8 bg-white dark:bg-slate-900 border border-border rounded-3xl text-center shadow-sm"
          >
            <p className="text-sm font-semibold text-muted-foreground mb-1">
              Don&apos;t see your role?
            </p>
            <h3 className="text-xl font-bold text-foreground mb-3">
              Send us an open application
            </h3>
            <p className="text-sm text-muted-foreground mb-5 max-w-md mx-auto">
              We hire on culture fit and skill first. If you're exceptional at what you do and
              passionate about education — let us know.
            </p>
            <a
              href="mailto:careers@persevex.com?subject=Open Application"
              className="btn-aptisure inline-flex items-center gap-2"
            >
              <Mail size={15} /> careers@persevex.com
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Culture / Values ─────────────────────────────────────────── */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block text-primary text-xs font-bold uppercase tracking-widest mb-4 bg-primary/10 px-4 py-1.5 rounded-full">
                Culture
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-5">
                We ship, learn, and<br />
                <span className="text-primary">repeat together.</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We're early-stage, which means you'll wear multiple hats and see your
                work go live fast. We default to transparency — team updates,
                revenue metrics, and product decisions happen in the open.
              </p>
              <div className="space-y-3">
                {[
                  "Weekly all-hands — no secrets, just progress",
                  "Monthly retrospectives where everyone speaks up",
                  "Celebrate learning from failures, not just wins",
                  "Direct feedback culture — kind but honest",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Stats column */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { number: "15+", label: "Team members" },
                { number: "30+", label: "Programs live" },
                { number: "100%", label: "Remote-friendly" },
                { number: "3yr+", label: "Company tenure" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-slate-50 dark:bg-card border border-border rounded-3xl p-6 text-center"
                >
                  <p className="text-3xl font-black text-primary mb-1">{stat.number}</p>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
