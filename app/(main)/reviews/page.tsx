"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import Link from "next/link";
import { Star, ArrowUpRight, TrendingUp, Users, Building2, Award } from "lucide-react";

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
  colorClass: string;   // Tailwind bg class, e.g. "bg-blue-600"
  logoSrc: string;      // path to company logo in /public/
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
    colorClass: "bg-blue-600",
    logoSrc: "/TCS.png",
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
    colorClass: "bg-violet-600",
    logoSrc: "/companies/deloitte.webp",
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
    colorClass: "bg-emerald-600",
    logoSrc: "/companies/infosys.webp",
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
    colorClass: "bg-amber-600",
    logoSrc: "/companies/wipro.png",
  },
  {
    id: 5,
    name: "Karthik Nair",
    role: "Cloud Engineer",
    company: "Amazon",
    course: "Cloud Computing",
    rating: 5,
    review:
      "Got placed at Amazon after completing the Cloud Computing program. The AWS labs were directly relevant to what I was asked in interviews.",
    category: ["Placement", "Course"],
    initials: "KN",
    colorClass: "bg-red-600",
    logoSrc: "/companies/amazon.webp",
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
    colorClass: "bg-cyan-600",
    logoSrc: "/PwC.png",
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
    colorClass: "bg-violet-600",
    logoSrc: "/harman.png",
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
    colorClass: "bg-blue-600",
    logoSrc: "/kpmg.png",
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
    colorClass: "bg-emerald-600",
    logoSrc: "/ey.png",
  },
];

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

// ─── Ticker Card (jyesta placement style) ────────────────────────────────────
function TickerCard({ t }: { t: Testimonial }) {
  return (
    <div className="flex-shrink-0 w-44 mx-3 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col items-center text-center gap-2">
      {/* Large initial circle */}
      <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white text-lg font-black flex-shrink-0 ${t.colorClass}`}>
        {t.initials}
      </div>
      {/* Name + role */}
      <div>
        <p className="text-sm font-bold text-gray-900 leading-tight">{t.name}</p>
        <p className="text-xs text-gray-500 mt-0.5 leading-tight">{t.role}</p>
      </div>
      {/* Company logo */}
      <div className="mt-auto pt-2 border-t border-gray-100 w-full flex justify-center">
        <div className="relative h-7 w-20">
          <Image src={t.logoSrc} alt={t.company} fill className="object-contain" />
        </div>
      </div>
    </div>
  );
}

// ─── LinkedIn-style Post Card ─────────────────────────────────────────────────
const POST_AGES = ["2w", "1mo", "3mo", "4mo", "6mo", "5mo", "2mo", "8mo", "1mo"];
const REACTION_COUNTS = [47, 83, 61, 129, 94, 72, 38, 115, 56];
const COMMENT_COUNTS = [12, 8, 23, 6, 17, 9, 31, 4, 14];

function LinkedInIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GridCard({ t, index }: { t: Testimonial; index: number }) {
  const [expanded, setExpanded] = React.useState(false);
  const isLong = t.review.length > 180;
  const displayText = isLong && !expanded ? t.review.slice(0, 180) + "…" : t.review;
  const reactions = REACTION_COUNTS[index % REACTION_COUNTS.length];
  const comments = COMMENT_COUNTS[index % COMMENT_COUNTS.length];
  const age = POST_AGES[index % POST_AGES.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="bg-white dark:bg-[#1d2226] border border-[#e0e0e0] dark:border-[#38434f] rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 break-inside-avoid mb-5 overflow-hidden"
    >
      {/* ── Post Header ──────────────────────────────────────────── */}
      <div className="flex items-start justify-between px-4 pt-4 pb-3">
        <div className="flex items-start gap-3">
          {/* Avatar */}
          <div className={`w-11 h-11 rounded-full flex items-center justify-center text-white text-sm font-black flex-shrink-0 ${t.colorClass}`}>
            {t.initials}
          </div>
          <div className="min-w-0">
            {/* Name + 1st badge */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-sm font-bold text-[#000000e6] dark:text-white leading-tight">{t.name}</span>
              <span className="text-[10px] font-semibold text-[#0a66c2] dark:text-[#70b5f9] border border-[#0a66c2] dark:border-[#70b5f9] rounded-sm px-1 leading-4">1st</span>
            </div>
            {/* Role */}
            <p className="text-[11px] text-[#666] dark:text-[#a8b3bb] leading-tight mt-0.5 line-clamp-1">{t.role} at {t.company}</p>
            {/* Post metadata */}
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-[10px] text-[#666] dark:text-[#a8b3bb]">{age}</span>
              <span className="text-[#666] dark:text-[#a8b3bb]">·</span>
              {/* Globe icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-[#666] dark:text-[#a8b3bb]"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
            </div>
          </div>
        </div>
        {/* Follow button */}
        <button className="flex items-center gap-1 text-[#0a66c2] dark:text-[#70b5f9] text-xs font-bold hover:bg-[#0a66c2]/10 px-2.5 py-1.5 rounded-full transition-colors flex-shrink-0">
          <span className="text-lg leading-none">+</span> Follow
        </button>
      </div>

      {/* ── Post Body ─────────────────────────────────────────────── */}
      <div className="px-4 pb-3">
        {/* Course tag */}
        <span className="inline-block mb-2 text-[10px] font-bold uppercase tracking-widest text-[#0a66c2] dark:text-[#70b5f9]">
          #{t.course.replace(/\s+/g, "")}
        </span>
        <p className="text-[13px] text-[#000000cc] dark:text-[#d1d5db] leading-[1.6]">
          {displayText}
          {isLong && (
            <button
              onClick={() => setExpanded((v) => !v)}
              className="ml-1 text-[#666] dark:text-[#a8b3bb] font-semibold hover:underline text-[12px]"
            >
              {expanded ? "see less" : "see more"}
            </button>
          )}
        </p>
      </div>

      {/* ── Reaction Count Bar ────────────────────────────────────── */}
      <div className="px-4 py-2 flex items-center justify-between border-t border-[#e0e0e0] dark:border-[#38434f]">
        <div className="flex items-center gap-1">
          {/* Reaction emoji stack */}
          <div className="flex -space-x-1">
            <span className="text-sm">👍</span>
            <span className="text-sm">❤️</span>
            <span className="text-sm">🙌</span>
          </div>
          <span className="text-[11px] text-[#666] dark:text-[#a8b3bb] ml-1">{reactions}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] text-[#666] dark:text-[#a8b3bb]">{comments} comments</span>
        </div>
      </div>

      {/* ── Action Bar ────────────────────────────────────────────── */}
      <div className="px-2 pb-2 flex items-center justify-around border-t border-[#e0e0e0] dark:border-[#38434f]">
        {[
          { icon: "👍", label: "Like" },
          { icon: "💬", label: "Comment" },
          { icon: "🔁", label: "Repost" },
          { icon: "📤", label: "Send" },
        ].map((action) => (
          <button
            key={action.label}
            className="flex items-center gap-1.5 px-3 py-2.5 rounded-lg hover:bg-[#0000000a] dark:hover:bg-[#ffffff0a] text-[#666] dark:text-[#a8b3bb] transition-colors group"
          >
            <span className="text-sm">{action.icon}</span>
            <span className="text-[11px] font-semibold group-hover:text-foreground transition-colors">{action.label}</span>
          </button>
        ))}
      </div>

      {/* ── Persevex badge ────────────────────────────────────────── */}
      <div className="px-4 py-2.5 bg-[#f3f2f1] dark:bg-[#2d3748] flex items-center gap-2 border-t border-[#e0e0e0] dark:border-[#38434f]">
        <div className="text-[#0a66c2] dark:text-[#70b5f9]">
          <LinkedInIcon size={13} />
        </div>
        <span className="text-[11px] text-[#666] dark:text-[#a8b3bb] flex-1">Verified through <span className="font-bold text-foreground">Persevex</span></span>
        <span className="text-[10px] font-bold uppercase text-[#0a66c2] dark:text-[#70b5f9] bg-[#0a66c2]/10 px-2 py-0.5 rounded-full">
          {t.category[0]}
        </span>
      </div>
    </motion.div>
  );
}

// ─── Alumni Company Logos ────────────────────────────────────────────────────
const alumniCompanies = [
  { name: "TCS",       logo: "/TCS.png" },
  { name: "Infosys",   logo: "/companies/infosys.webp" },
  { name: "Wipro",     logo: "/companies/wipro.png" },
  { name: "Amazon",    logo: "/companies/amazon.webp" },
  { name: "Deloitte",  logo: "/companies/deloitte.webp" },
  { name: "PwC",       logo: "/PwC.png" },
  { name: "KPMG",      logo: "/kpmg.png" },
  { name: "EY",        logo: "/ey.png" },
  { name: "Harman",    logo: "/harman.png" },
  { name: "Accenture", logo: "/companies/accenture.svg" },
  { name: "IBM",       logo: "/companies/ibm.svg" },
  { name: "HCL",       logo: "https://upload.wikimedia.org/wikipedia/commons/6/6a/HCL_Technologies_logo.svg" },
];
const alumniMarqueeItems = [...alumniCompanies, ...alumniCompanies, ...alumniCompanies];

// ─── Main Page ────────────────────────────────────────────────────────────────
const FILTERS: Category[] = ["All", "Placement", "Course", "Mentorship"];

// Split testimonials into two rows for the marquee
const rowA = testimonials.filter((_, i) => i % 2 === 0);
const rowB = testimonials.filter((_, i) => i % 2 !== 0);

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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="flex flex-col items-center gap-3 mb-6"
          >
            <div className="flex items-baseline gap-3">
              <span className="text-7xl md:text-8xl font-black text-foreground tabular-nums leading-none">4.8</span>
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
            Real outcomes, real careers. Every review below is from a student who went through the Persevex program.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-3 justify-center mt-8"
          >
            <Link href="/enroll" className="btn-aptisure inline-flex items-center gap-2 text-sm">
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
            <StatItem target={10000} suffix="+" label="Students Trained" icon={Users} />
            <StatItem target={50} suffix="+" label="Hiring Partners" icon={Building2} />
            <StatItem target={92} suffix="%" label="Satisfied Rate" icon={TrendingUp} />
            <StatItem target={19} suffix="+" label="Programs" icon={Award} />
          </div>
        </div>
      </section>

      {/* ── Auto-scroll Ticker Carousel ──────────────────────────────── */}
      <section className="py-16 bg-slate-50 dark:bg-slate-950 border-b border-border overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 md:px-10 mb-10 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Testimonials</p>
          <h2 className="text-2xl md:text-3xl font-black text-foreground">
            What our students say
          </h2>
        </div>

        {/* Row A — scrolls left */}
        <div className="relative overflow-x-hidden mb-4">
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-slate-50 dark:from-slate-950 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-slate-50 dark:from-slate-950 to-transparent pointer-events-none" />
          <div className="flex animate-marquee items-stretch py-2 whitespace-nowrap">
            {[...rowA, ...rowA, ...rowA].map((t, i) => (
              <TickerCard key={`a-${i}`} t={t} />
            ))}
          </div>
        </div>

        {/* Row B — scrolls right */}
        <div className="relative overflow-x-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-slate-50 dark:from-slate-950 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-slate-50 dark:from-slate-950 to-transparent pointer-events-none" />
          <div className="flex animate-marquee-reverse items-stretch py-2 whitespace-nowrap">
            {[...rowB, ...rowB, ...rowB].map((t, i) => (
              <TickerCard key={`b-${i}`} t={t} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Filter Tabs ──────────────────────────────────────────────── */}
      <section className="pt-16 pb-4 bg-background">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Browse by category</p>
          <div className="flex flex-wrap gap-2 items-center">
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

      {/* ── Filterable Grid ──────────────────────────────────────────── */}
      <section className="pb-20 pt-8 bg-background">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="columns-1 sm:columns-2 lg:columns-3 gap-5"
            >
              {filtered.map((t, i) => (
                <GridCard key={t.id} t={t} index={i} />
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
        <div className="max-w-6xl mx-auto px-6 md:px-10 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Placed at</p>
            <h2 className="text-2xl md:text-3xl font-black text-foreground">
              Our alumni work at world-class companies
            </h2>
          </motion.div>
        </div>

        {/* Scrolling logo marquee */}
        <div className="relative overflow-x-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-slate-50 dark:from-card to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-slate-50 dark:from-card to-transparent pointer-events-none" />
          <div className="flex animate-marquee-slow items-center py-3 whitespace-nowrap gap-4">
            {alumniMarqueeItems.map((c, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-40 h-16 px-6 bg-white border border-gray-100 rounded-2xl shadow-sm flex items-center justify-center hover:shadow-md transition-all duration-200"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.logo}
                  alt={c.name}
                  className="max-h-8 w-full object-contain"
                />
              </div>
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
              Join 1,200+ students who upskilled, built real projects, and got placed through Persevex.
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

