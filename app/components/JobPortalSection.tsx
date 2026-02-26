"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Briefcase,
  MapPin,
  Clock,
  ArrowUpRight,
  Flame,
  Zap,
  Building2,
  Star,
  ChevronRight,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

type Domain =
  | "All"
  | "Tech"
  | "Data"
  | "Marketing"
  | "Finance"
  | "Management";

type Job = {
  id: number;
  role: string;
  company: string;
  logo: string; // initials
  logoColor: string;
  location: string;
  type: "Full-time" | "Internship" | "Remote";
  domain: Domain;
  stipend: string;
  postedAgo: string;
  hot: boolean;
  skills: string[];
  openings: number;
};

const JOBS: Job[] = [
  {
    id: 1,
    role: "Full Stack Developer",
    company: "TCS",
    logo: "TC",
    logoColor: "#2563eb",
    location: "Bangalore",
    type: "Full-time",
    domain: "Tech",
    stipend: "₹6–12 LPA",
    postedAgo: "2 days ago",
    hot: true,
    skills: ["React", "Node.js", "MongoDB"],
    openings: 12,
  },
  {
    id: 2,
    role: "Data Analyst Intern",
    company: "Deloitte",
    logo: "DL",
    logoColor: "#7c3aed",
    location: "Remote",
    type: "Internship",
    domain: "Data",
    stipend: "₹20,000/mo",
    postedAgo: "1 day ago",
    hot: true,
    skills: ["Python", "SQL", "Power BI"],
    openings: 5,
  },
  {
    id: 3,
    role: "Digital Marketing Executive",
    company: "Wipro",
    logo: "WP",
    logoColor: "#059669",
    location: "Hyderabad",
    type: "Full-time",
    domain: "Marketing",
    stipend: "₹4–7 LPA",
    postedAgo: "3 days ago",
    hot: false,
    skills: ["SEO", "Google Ads", "Meta Ads"],
    openings: 8,
  },
  {
    id: 4,
    role: "Cloud Engineer",
    company: "Amazon",
    logo: "AM",
    logoColor: "#ea580c",
    location: "Pune",
    type: "Full-time",
    domain: "Tech",
    stipend: "₹10–18 LPA",
    postedAgo: "5 hrs ago",
    hot: true,
    skills: ["AWS", "Kubernetes", "Terraform"],
    openings: 3,
  },
  {
    id: 5,
    role: "Finance Analyst",
    company: "EY",
    logo: "EY",
    logoColor: "#ca8a04",
    location: "Mumbai",
    type: "Full-time",
    domain: "Finance",
    stipend: "₹7–11 LPA",
    postedAgo: "4 days ago",
    hot: false,
    skills: ["Excel", "Financial Modeling", "Tally"],
    openings: 6,
  },
  {
    id: 6,
    role: "ML Engineer",
    company: "Infosys",
    logo: "IN",
    logoColor: "#0891b2",
    location: "Chennai",
    type: "Full-time",
    domain: "Data",
    stipend: "₹8–14 LPA",
    postedAgo: "1 day ago",
    hot: false,
    skills: ["TensorFlow", "Python", "MLOps"],
    openings: 7,
  },
  {
    id: 7,
    role: "HR Management Trainee",
    company: "PwC",
    logo: "PW",
    logoColor: "#dc2626",
    location: "Delhi",
    type: "Internship",
    domain: "Management",
    stipend: "₹15,000/mo",
    postedAgo: "6 days ago",
    hot: false,
    skills: ["HRMS", "Recruitment", "Communication"],
    openings: 4,
  },
  {
    id: 8,
    role: "Cybersecurity Analyst",
    company: "KPMG",
    logo: "KP",
    logoColor: "#7c3aed",
    location: "Remote",
    type: "Remote",
    domain: "Tech",
    stipend: "₹8–13 LPA",
    postedAgo: "2 days ago",
    hot: true,
    skills: ["SIEM", "Penetration Testing", "ISO 27001"],
    openings: 2,
  },
];

const DOMAINS: Domain[] = ["All", "Tech", "Data", "Marketing", "Finance", "Management"];

const TYPE_COLORS: Record<Job["type"], string> = {
  "Full-time": "text-emerald-600 bg-emerald-50 dark:bg-emerald-950 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
  Internship: "text-violet-600 bg-violet-50 dark:bg-violet-950 dark:text-violet-400 border-violet-200 dark:border-violet-800",
  Remote: "text-sky-600 bg-sky-50 dark:bg-sky-950 dark:text-sky-400 border-sky-200 dark:border-sky-800",
};

// ─── Ticker ───────────────────────────────────────────────────────────────────
const TickerMegaphoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 11 19-9-9 19-2-8-8-2z"/>
  </svg>
);
const TickerFireIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3z"/>
  </svg>
);
const TickerCheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);
const TickerRocketIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
  </svg>
);
const TickerBriefcaseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="14" x="2" y="7" rx="2"/>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
  </svg>
);

type TickerItem = { icon: React.ComponentType; text: string };
const tickerItems: TickerItem[] = [
  { icon: TickerMegaphoneIcon, text: "Amazon hiring Cloud Engineers" },
  { icon: TickerFireIcon, text: "12 new jobs added today" },
  { icon: TickerBriefcaseIcon, text: "Deloitte Data Internship – Apply now" },
  { icon: TickerCheckIcon, text: "92% placement rate this quarter" },
  { icon: TickerRocketIcon, text: "TCS Full Stack openings – Limited seats" },
  { icon: TickerBriefcaseIcon, text: "KPMG Cybersecurity – Remote OK" },
  { icon: TickerCheckIcon, text: "50+ verified hiring partners" },
];

function Ticker() {
  return (
    <div className="relative overflow-hidden bg-primary/5 border-y border-primary/15 py-2.5">
      <motion.div
        animate={{ x: [0, "-50%"] }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap gap-12"
      >
        {[...tickerItems, ...tickerItems].map((item, i) => (
          <span key={i} className="text-xs font-semibold text-primary/80 flex-shrink-0 flex items-center gap-1.5">
            <span className="text-primary/60"><item.icon /></span>
            {item.text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─── Job Card ────────────────────────────────────────────────────────────────
function JobCard({ job, index }: { job: Job; index: number }) {
  return (
    <Link href="/job-portal">
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -3, transition: { duration: 0.18 } }}
      className="group relative bg-card border border-border rounded-2xl p-5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-pointer flex flex-col gap-4 overflow-hidden"
    >
      {/* Top shimmer on hover */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Company logo */}
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-black text-white flex-shrink-0 shadow-sm"
            style={{ backgroundColor: job.logoColor }}
          >
            {job.logo}
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors truncate">
              {job.role}
            </h3>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
              <Building2 size={10} />
              {job.company}
            </p>
          </div>
        </div>

        {/* Hot badge */}
        {job.hot && (
          <span className="flex-shrink-0 flex items-center gap-1 text-[10px] font-bold text-orange-500 bg-orange-50 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800/50 px-2 py-0.5 rounded-full">
            <Flame size={9} />
            Hot
          </span>
        )}
      </div>

      {/* Meta row */}
      <div className="flex flex-wrap gap-2">
        <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${TYPE_COLORS[job.type]}`}>
          {job.type}
        </span>
        <span className="text-[10px] font-medium text-muted-foreground flex items-center gap-1">
          <MapPin size={9} />
          {job.location}
        </span>
        <span className="text-[10px] font-medium text-muted-foreground flex items-center gap-1">
          <Clock size={9} />
          {job.postedAgo}
        </span>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5">
        {job.skills.map((s) => (
          <span
            key={s}
            className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-secondary text-foreground border border-border"
          >
            {s}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-1 border-t border-border">
        <div>
          <p className="text-sm font-black text-foreground">{job.stipend}</p>
          <p className="text-[10px] text-muted-foreground">{job.openings} openings</p>
        </div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-200"
        >
          <ArrowUpRight size={14} />
        </motion.div>
      </div>
    </motion.div>
    </Link>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────
export default function JobPortalSection() {
  const [activeFilter, setActiveFilter] = useState<Domain>("All");

  const filtered =
    activeFilter === "All" ? JOBS : JOBS.filter((j) => j.domain === activeFilter);

  const hotCount = JOBS.filter((j) => j.hot).length;

  return (
    <section className="relative overflow-hidden bg-slate-50 dark:bg-slate-950 py-20 md:py-28">
      {/* Ambient glow blobs */}
      <div className="absolute top-20 left-1/3 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-violet-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">

        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-primary/20 mb-5"
            >
              <Zap size={11} fill="currentColor" />
              Persevex Job Portal
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground leading-tight"
            >
              Real jobs.{" "}
              <span className="text-primary">Right after</span>
              <br className="hidden md:block" /> your program.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-muted-foreground text-sm md:text-base mt-4 max-w-lg leading-relaxed"
            >
              Persevex alumni get exclusive early access to curated job openings
              from our hiring partners — before they go public.
            </motion.p>
          </div>

          {/* Live stats pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-3"
          >
            <div className="flex items-center gap-2 bg-card border border-border rounded-2xl px-4 py-3 shadow-sm">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-xs font-bold text-foreground">
                {JOBS.length} live listings
              </span>
            </div>
            <div className="flex items-center gap-2 bg-card border border-border rounded-2xl px-4 py-3 shadow-sm">
              <Flame size={13} className="text-orange-500" />
              <span className="text-xs font-bold text-foreground">
                {hotCount} trending now
              </span>
            </div>
            <div className="flex items-center gap-2 bg-card border border-border rounded-2xl px-4 py-3 shadow-sm">
              <Star size={13} className="text-amber-500" fill="currentColor" />
              <span className="text-xs font-bold text-foreground">
                50+ hiring partners
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Live ticker */}
      <div className="mb-10">
        <Ticker />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {DOMAINS.map((d) => {
            const count = d === "All" ? JOBS.length : JOBS.filter((j) => j.domain === d).length;
            return (
              <button
                key={d}
                onClick={() => setActiveFilter(d)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeFilter === d
                    ? "bg-primary text-white shadow-md shadow-primary/30"
                    : "bg-card text-foreground border border-border hover:border-primary/40 hover:bg-primary/5"
                }`}
              >
                {d}
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    activeFilter === d
                      ? "bg-white/20 text-white"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Job grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {filtered.map((job, i) => (
              <JobCard key={job.id} job={job} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 relative rounded-3xl overflow-hidden border border-primary/20 bg-gradient-to-br from-primary/8 via-violet-500/5 to-transparent p-8 md:p-12 text-center"
        >
          {/* decorative grid */}
          <div className="absolute inset-0 opacity-[0.03] bg-grid-pattern" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-primary/20 mb-5">
              <Briefcase size={10} />
              Exclusive Access
            </span>
            <h3 className="text-2xl md:text-3xl font-black text-foreground mb-3">
              Complete a Persevex program → <span className="text-primary">unlock</span> these jobs
            </h3>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto mb-7 leading-relaxed">
              Our hiring partners source from Persevex alumni first. Finish your
              program, get a verified certificate, and step into the job queue
              before anyone else.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/job-portal"
                className="btn-aptisure inline-flex items-center gap-2 text-sm"
              >
                View All Jobs <ChevronRight size={15} />
              </Link>
              <Link
                href="/explore-courses"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-border text-sm font-semibold text-foreground hover:bg-muted transition-colors"
              >
                Explore Programs
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
