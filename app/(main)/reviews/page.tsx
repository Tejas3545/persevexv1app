"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import Link from "next/link";
import { Star, Quote, ArrowUpRight, TrendingUp, Users, Building2, Award } from "lucide-react";

// ─── Testimonial Data ────────────────────────────────────────────────────────
type Category = "All" | "Placement" | "Course" | "Mentorship";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  course: string;
  rating: number;
  review: string;
  category: Category[];
  initials: string;
  accentColor: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Arjun Sharma",
    role: "Full Stack Developer",
    company: "TCS",
    course: "Full Stack Web Development",
    rating: 5,
    review:
      "Persevex completely transformed my career trajectory. The live sessions were hands-on and the projects I built actually got me placed. My resume stood out because I had real work to show.",
    category: ["Placement", "Course"],
    initials: "AS",
    accentColor: "#2563eb",
  },
  {
    id: 2,
    name: "Priya Mehta",
    role: "Data Analyst",
    company: "Deloitte",
    course: "Data Science",
    rating: 5,
    review:
      "The mentorship here is exceptional. My mentor reviewed my projects personally and pushed me beyond the curriculum. I joined with zero Python knowledge and got placed within 3 months.",
    category: ["Mentorship", "Placement"],
    initials: "PM",
    accentColor: "#7c3aed",
  },
  {
    id: 3,
    name: "Rahul Verma",
    role: "ML Engineer",
    company: "Infosys",
    course: "Machine Learning",
    rating: 5,
    review:
      "The curriculum is genuinely industry-aligned. Every module felt purposeful. NSDC backing and the internship certificate gave my resume serious credibility.",
    category: ["Course"],
    initials: "RV",
    accentColor: "#059669",
  },
  {
    id: 4,
    name: "Sneha Patel",
    role: "Digital Marketing Executive",
    company: "Wipro",
    course: "Digital Marketing",
    rating: 4,
    review:
      "I was skeptical about online learning but Persevex proved me wrong. The live doubt sessions meant I was never stuck. My mentor was available even on weekends!",
    category: ["Mentorship", "Course"],
    initials: "SP",
    accentColor: "#d97706",
  },
  {
    id: 5,
    name: "Karthik Nair",
    role: "Cloud Engineer",
    company: "Amazon",
    course: "Cloud Computing",
    rating: 5,
    review:
      "Got placed at Amazon after completing the Cloud Computing program. The AWS labs inside Persevex LMS were directly relevant to what I was asked in interviews.",
    category: ["Placement", "Course"],
    initials: "KN",
    accentColor: "#dc2626",
  },
  {
    id: 6,
    name: "Ananya Gupta",
    role: "HR Associate",
    company: "PwC",
    course: "Human Resource Management",
    rating: 5,
    review:
      "The HR course at Persevex is incredibly practical. Case studies, role-plays, and a mentor who actually worked in MNC HR. Nothing theoretical-for-its-own-sake.",
    category: ["Course", "Mentorship"],
    initials: "AG",
    accentColor: "#0891b2",
  },
  {
    id: 7,
    name: "Dev Prajapati",
    role: "Embedded Systems Engineer",
    company: "Harman",
    course: "Embedded Systems",
    rating: 5,
    review:
      "One of the few platforms that covers niche domains like Embedded Systems seriously. The projects moved from basic to genuinely complex. My portfolio got me the Harman interview.",
    category: ["Placement", "Course"],
    initials: "DP",
    accentColor: "#7c3aed",
  },
  {
    id: 8,
    name: "Ishita Roy",
    role: "Cybersecurity Analyst",
    company: "KPMG",
    course: "Cyber Security",
    rating: 4,
    review:
      "The placement support team was amazing. Mock interviews, resume tweaks, LinkedIn guidance — they're invested in your success, not just your enrollment fee.",
    category: ["Placement", "Mentorship"],
    initials: "IR",
    accentColor: "#2563eb",
  },
  {
    id: 9,
    name: "Mohammed Akhtar",
    role: "Finance Analyst",
    company: "EY",
    course: "Finance",
    rating: 5,
    review:
      "The Finance program content is thorough. We covered real financial modeling, not just theory. My Excel skills went from average to professional grade.",
    category: ["Course"],
    initials: "MA",
    accentColor: "#059669",
  },
];

// ─── Stats Item ───────────────────────────────────────────────────────────────
function StatItem({ target, suffix, label, icon: Icon }: { target: number; suffix: string; label: string; icon: React.ComponentType<{ size?: number }> }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center text-center"
    >
      <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-3">
        <Icon size={22} />
      </div>
      <p className="text-4xl font-black text-foreground tabular-nums">
        <CountUp end={target} duration={2} enableScrollSpy scrollSpyOnce />
        {suffix}
      </p>
      <p className="text-sm text-muted-foreground mt-1 font-medium">{label}</p>
    </motion.div>
  );
}

// ─── Star Rating ─────────────────────────────────────────────────────────────
function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={size}
          className={s <= rating ? "text-amber-400" : "text-muted-foreground/30"}
          fill={s <= rating ? "currentColor" : "none"}
        />
      ))}
    </div>
  );
}

// ─── Testimonial Card ─────────────────────────────────────────────────────────
function TestimonialCard({ t, index }: { t: Testimonial; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative bg-card border border-border rounded-3xl p-6 shadow-sm hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20 transition-shadow duration-300 overflow-hidden"
    >
      {/* Colored left accent bar */}
      <div
        className="absolute left-0 top-6 bottom-6 w-1 rounded-full"
        style={{ backgroundColor: t.accentColor }}
      />

      {/* Quote icon */}
      <Quote
        size={20}
        className="absolute top-5 right-5 opacity-10 group-hover:opacity-20 transition-opacity"
        style={{ color: t.accentColor }}
      />

      <div className="pl-4">
        {/* Rating */}
        <StarRating rating={t.rating} size={13} />

        {/* Review text */}
        <p className="text-sm text-muted-foreground leading-relaxed mt-3 mb-5 line-clamp-4">
          &ldquo;{t.review}&rdquo;
        </p>

        {/* Author */}
        <div className="flex items-center gap-3 pt-4 border-t border-border">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
            style={{ backgroundColor: t.accentColor }}
          >
            {t.initials}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-foreground truncate">{t.name}</p>
            <p className="text-xs text-muted-foreground truncate">
              {t.role} · {t.company}
            </p>
          </div>
        </div>

        {/* Course tag */}
        <div className="mt-3">
          <span
            className="text-xs font-medium px-2.5 py-1 rounded-full"
            style={{
              backgroundColor: `${t.accentColor}15`,
              color: t.accentColor,
              border: `1px solid ${t.accentColor}25`,
            }}
          >
            {t.course}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
const FILTERS: Category[] = ["All", "Placement", "Course", "Mentorship"];

export default function ReviewsPage() {
  const [activeFilter, setActiveFilter] = useState<Category>("All");

  const filtered =
    activeFilter === "All"
      ? testimonials
      : testimonials.filter((t) => t.category.includes(activeFilter));

  return (
    <main className="overflow-x-hidden bg-background">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative py-20 md:py-28 bg-slate-50 dark:bg-card overflow-hidden">
        {/* Subtle ambient glow */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/6 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-6 md:px-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-primary/20 mb-7"
          >
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
            Student Reviews
          </motion.span>

          {/* Aggregate rating display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="flex flex-col items-center gap-3 mb-6"
          >
            <div className="flex items-baseline gap-3">
              <span className="text-7xl md:text-8xl font-black text-foreground tabular-nums leading-none">
                4.8
              </span>
              <span className="text-3xl font-bold text-muted-foreground">/5</span>
            </div>
            <StarRating rating={5} size={28} />
            <p className="text-muted-foreground text-sm font-medium">
              Based on 1,200+ verified student reviews
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl md:text-5xl font-black text-foreground mb-4 leading-tight"
          >
            Stories from students who{" "}
            <span className="text-primary">levelled up</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Real outcomes, real careers. Every review below is from a student who
            went through the Persevex program — placements, projects, and all.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-3 justify-center mt-8"
          >
            <Link
              href="/enroll"
              className="btn-aptisure inline-flex items-center gap-2 text-sm"
            >
              Start your story <ArrowUpRight size={15} />
            </Link>
            <Link
              href="/explore-courses"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-border text-sm font-semibold text-foreground hover:bg-muted transition-colors"
            >
              Explore programs
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Outcome Stats ────────────────────────────────────────────── */}
      <section className="py-16 bg-white dark:bg-slate-900 border-y border-border">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            <StatItem target={1200} suffix="+" label="Students Trained" icon={Users} />
            <StatItem target={50} suffix="+" label="Hiring Partners" icon={Building2} />
            <StatItem target={92} suffix="%" label="Placement Rate" icon={TrendingUp} />
            <StatItem target={30} suffix="+" label="Domains Covered" icon={Award} />
          </div>
        </div>
      </section>

      {/* ── Filter Tabs ──────────────────────────────────────────────── */}
      <section className="pt-16 pb-4 bg-background">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mr-2">
              Filter:
            </span>
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeFilter === filter
                    ? "bg-primary text-white shadow-md shadow-primary/30"
                    : "bg-secondary text-foreground hover:bg-muted border border-border"
                }`}
              >
                {filter}
                {filter !== "All" && (
                  <span className={`ml-1.5 text-xs ${activeFilter === filter ? "text-white/75" : "text-muted-foreground"}`}>
                    ({testimonials.filter((t) => t.category.includes(filter)).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials Grid ────────────────────────────────────────── */}
      <section className="pb-20 pt-8 bg-background">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5"
            >
              {filtered.map((t, i) => (
                <div key={t.id} className="break-inside-avoid">
                  <TestimonialCard t={t} index={i} />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              No reviews in this category yet.
            </div>
          )}
        </div>
      </section>

      {/* ── Alumni Companies ─────────────────────────────────────────── */}
      <section className="py-16 bg-slate-50 dark:bg-card border-t border-border overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
              Placed at
            </p>
            <h2 className="text-2xl md:text-3xl font-black text-foreground">
              Our alumni work at world-class companies
            </h2>
          </motion.div>

          {/* Company name cards — text-based, clean */}
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "TCS", "Infosys", "Wipro", "Amazon", "Deloitte",
              "PwC", "KPMG", "EY", "Harman", "Accenture", "IBM", "HCL",
            ].map((company, i) => (
              <motion.div
                key={company}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="px-5 py-2.5 bg-white dark:bg-slate-900 border border-border rounded-2xl text-sm font-bold text-foreground shadow-sm hover:border-primary/40 hover:shadow-md transition-all duration-200"
              >
                {company}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            <h2 className="text-3xl md:text-4xl font-black text-foreground">
              Ready to write <span className="text-primary">your story?</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Join 1,200+ students who upskilled, built real projects, and got
              placed through Persevex.
            </p>
            <div className="flex flex-wrap gap-3 justify-center pt-2">
              <Link href="/enroll" className="btn-aptisure inline-flex items-center gap-2">
                Enroll Now <ArrowUpRight size={15} />
              </Link>
              <Link
                href="/explore-courses"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-border text-sm font-semibold text-foreground hover:bg-muted transition-colors"
              >
                Browse Programs
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
