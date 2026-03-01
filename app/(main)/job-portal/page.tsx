"use client";

import React, { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useLmsAccess } from "@/app/components/LmsRegistrationModal";
import {
  Briefcase,
  MapPin,
  Clock,
  ArrowUpRight,
  Flame,
  Building2,
  Search,
  X,
  ChevronDown,
  SlidersHorizontal,
  TrendingUp,
  Users,
  BadgeCheck,
  Send,
  Upload,
  CheckCircle2,
  Loader2,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────
type Domain = "All" | "Tech" | "Data" | "Marketing" | "Finance" | "Management" | "Design";
type JobType = "All" | "Full-time" | "Internship" | "Remote";
type SortKey = "recent" | "hot" | "stipend";

type Job = {
  id: number;
  role: string;
  company: string;
  logo: string;
  accentBg: string;   // Tailwind bg class, e.g. "bg-blue-600"
  accentText: string; // Tailwind text class, e.g. "text-white"
  location: string;
  type: "Full-time" | "Internship" | "Remote";
  domain: Exclude<Domain, "All">;
  stipend: string;
  stipendValue: number; // for sorting
  postedDaysAgo: number;
  hot: boolean;
  skills: string[];
  openings: number;
  description: string;
  applyUrl: string; // real company career portal
};

// ─── Real Job Data with actual company career portal links ───────────────────
const ALL_JOBS: Job[] = [
  {
    id: 1,
    role: "Full Stack Developer",
    company: "TCS",
    logo: "TC",
    accentBg: "bg-blue-600",
    accentText: "text-white",
    location: "Bangalore, IN",
    type: "Full-time",
    domain: "Tech",
    stipend: "₹6–12 LPA",
    stipendValue: 9,
    postedDaysAgo: 2,
    hot: true,
    skills: ["React", "Node.js", "MongoDB", "TypeScript"],
    openings: 12,
    description:
      "Build and maintain scalable web applications within TCS's digital transformation practice. Work with global clients across banking, retail, and logistics.",
    applyUrl: "https://www.tcs.com/careers",
  },
  {
    id: 2,
    role: "Data Analyst",
    company: "Deloitte",
    logo: "DL",
    accentBg: "bg-lime-500",
    accentText: "text-white",
    location: "Remote",
    type: "Internship",
    domain: "Data",
    stipend: "₹20,000/mo",
    stipendValue: 2.4,
    postedDaysAgo: 1,
    hot: true,
    skills: ["Python", "SQL", "Power BI", "Excel"],
    openings: 5,
    description:
      "Support Deloitte's analytics practice by building dashboards and pipelines for consulting engagements. Directly mentored by senior analysts.",
    applyUrl: "https://jobs2.deloitte.com/in/en",
  },
  {
    id: 3,
    role: "Digital Marketing Executive",
    company: "Wipro",
    logo: "WP",
    accentBg: "bg-violet-950",
    accentText: "text-white",
    location: "Hyderabad, IN",
    type: "Full-time",
    domain: "Marketing",
    stipend: "₹4–7 LPA",
    stipendValue: 5.5,
    postedDaysAgo: 3,
    hot: false,
    skills: ["SEO", "Google Ads", "Meta Ads", "Analytics"],
    openings: 8,
    description:
      "Drive digital acquisition campaigns for Wipro's enterprise clients. Manage paid channels, SEO strategy, and weekly performance reporting.",
    applyUrl: "https://careers.wipro.com/",
  },
  {
    id: 4,
    role: "Cloud Engineer",
    company: "Amazon",
    logo: "AM",
    accentBg: "bg-amber-500",
    accentText: "text-white",
    location: "Pune, IN",
    type: "Full-time",
    domain: "Tech",
    stipend: "₹10–18 LPA",
    stipendValue: 14,
    postedDaysAgo: 0,
    hot: true,
    skills: ["AWS", "Kubernetes", "Terraform", "Python"],
    openings: 3,
    description:
      "Design, build, and operate AWS-based cloud infrastructure for Amazon's internal logistics platforms. On-call rotation and ownership mindset required.",
    applyUrl: "https://www.amazon.jobs/en/search?base_query=cloud+engineer&loc_query=India",
  },
  {
    id: 5,
    role: "Finance Analyst",
    company: "EY",
    logo: "EY",
    accentBg: "bg-yellow-300",
    accentText: "text-gray-900",
    location: "Mumbai, IN",
    type: "Full-time",
    domain: "Finance",
    stipend: "₹7–11 LPA",
    stipendValue: 9,
    postedDaysAgo: 4,
    hot: false,
    skills: ["Financial Modeling", "Excel", "Valuation", "Tally"],
    openings: 6,
    description:
      "Work within EY's assurance and advisory practice — financial statement analysis, client engagement support, and internal control evaluation.",
    applyUrl: "https://careers.ey.com/ey/search/#q=india&t=Jobs&sort=relevantz&layout=list&onlyPublic=true",
  },
  {
    id: 6,
    role: "ML Engineer",
    company: "Infosys",
    logo: "IN",
    accentBg: "bg-sky-600",
    accentText: "text-white",
    location: "Chennai, IN",
    type: "Full-time",
    domain: "Data",
    stipend: "₹8–14 LPA",
    stipendValue: 11,
    postedDaysAgo: 1,
    hot: false,
    skills: ["TensorFlow", "Python", "MLOps", "Docker"],
    openings: 7,
    description:
      "Build and deploy ML models within Infosys's InfyAI platform. Collaborate with data science and product teams to ship model APIs to production.",
    applyUrl: "https://career.infosys.com/",
  },
  {
    id: 7,
    role: "HR Management Trainee",
    company: "PwC",
    logo: "PW",
    accentBg: "bg-red-600",
    accentText: "text-white",
    location: "Delhi, IN",
    type: "Internship",
    domain: "Management",
    stipend: "₹15,000/mo",
    stipendValue: 1.8,
    postedDaysAgo: 6,
    hot: false,
    skills: ["HRMS", "Talent Acquisition", "Communication", "HRBP"],
    openings: 4,
    description:
      "Support PwC's people & culture team with recruitment drives, policy documentation, and employee engagement initiatives in a fast-paced consulting environment.",
    applyUrl: "https://jobs.pwc.in/",
  },
  {
    id: 8,
    role: "Cybersecurity Analyst",
    company: "KPMG",
    logo: "KP",
    accentBg: "bg-blue-900",
    accentText: "text-white",
    location: "Remote",
    type: "Remote",
    domain: "Tech",
    stipend: "₹8–13 LPA",
    stipendValue: 10.5,
    postedDaysAgo: 2,
    hot: true,
    skills: ["SIEM", "Penetration Testing", "ISO 27001", "VAPT"],
    openings: 2,
    description:
      "Perform security assessments for KPMG's advisory clients. Identify vulnerabilities, document findings, and present remediation roadmaps to CISOs.",
    applyUrl: "https://jobs.kpmg.in/",
  },
  {
    id: 9,
    role: "Embedded Systems Engineer",
    company: "Harman",
    logo: "HR",
    accentBg: "bg-neutral-900",
    accentText: "text-white",
    location: "Bangalore, IN",
    type: "Full-time",
    domain: "Tech",
    stipend: "₹9–16 LPA",
    stipendValue: 12.5,
    postedDaysAgo: 5,
    hot: false,
    skills: ["C/C++", "RTOS", "CAN Bus", "ARM Cortex"],
    openings: 4,
    description:
      "Work on next-generation automotive infotainment software at Harman. Embedded firmware development for connected vehicle platforms in collaboration with OEM partners.",
    applyUrl: "https://careers.harman.com/",
  },
  {
    id: 10,
    role: "UX Designer",
    company: "Accenture",
    logo: "AC",
    accentBg: "bg-purple-600",
    accentText: "text-white",
    location: "Bangalore, IN",
    type: "Full-time",
    domain: "Design",
    stipend: "₹7–13 LPA",
    stipendValue: 10,
    postedDaysAgo: 1,
    hot: true,
    skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
    openings: 9,
    description:
      "Join Accenture Song to design digital products for Fortune 500 clients. Own end-to-end UX from research workshops to production-ready design handoff.",
    applyUrl: "https://www.accenture.com/in-en/careers",
  },
  {
    id: 11,
    role: "Business Analyst Intern",
    company: "Deloitte",
    logo: "DL",
    accentBg: "bg-lime-500",
    accentText: "text-white",
    location: "Remote",
    type: "Internship",
    domain: "Finance",
    stipend: "₹18,000/mo",
    stipendValue: 2.16,
    postedDaysAgo: 3,
    hot: false,
    skills: ["Excel", "PowerPoint", "Market Research", "SQL"],
    openings: 6,
    description:
      "Work alongside Deloitte consulting teams on strategy and operations engagements. Gather data, build models, and synthesize insights for client presentations.",
    applyUrl: "https://jobs2.deloitte.com/in/en",
  },
  {
    id: 12,
    role: "DevOps Engineer",
    company: "IBM",
    logo: "IB",
    accentBg: "bg-blue-500",
    accentText: "text-white",
    location: "Hyderabad, IN",
    type: "Full-time",
    domain: "Tech",
    stipend: "₹9–15 LPA",
    stipendValue: 12,
    postedDaysAgo: 2,
    hot: false,
    skills: ["Jenkins", "Kubernetes", "Ansible", "Linux"],
    openings: 5,
    description:
      "Maintain and evolve IBM's CI/CD infrastructure for enterprise software delivery pipelines. Drive automation initiatives and reduce deployment cycle times.",
    applyUrl: "https://www.ibm.com/in-en/employment/",
  },
];

const DOMAINS: Domain[] = ["All", "Tech", "Data", "Marketing", "Finance", "Management", "Design"];
const JOB_TYPES: JobType[] = ["All", "Full-time", "Internship", "Remote"];

const TYPE_STYLES: Record<Exclude<JobType, "All">, string> = {
  "Full-time": "text-emerald-700 bg-emerald-50 dark:bg-emerald-950 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
  Internship: "text-violet-700 bg-violet-50 dark:bg-violet-950 dark:text-violet-400 border-violet-200 dark:border-violet-800",
  Remote: "text-sky-700 bg-sky-50 dark:bg-sky-950 dark:text-sky-400 border-sky-200 dark:border-sky-800",
};

const SORT_OPTIONS: { label: string; value: SortKey }[] = [
  { label: "Most Recent", value: "recent" },
  { label: "Trending", value: "hot" },
  { label: "Highest Pay", value: "stipend" },
];

// ─── Application Modal ───────────────────────────────────────────────────────
function ApplicationModal({
  job,
  onClose,
}: {
  job: Job;
  onClose: () => void;
}) {
  const { openLms } = useLmsAccess();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [resume, setResume] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting">("idle");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    // Simulate submission delay
    await new Promise((r) => setTimeout(r, 500));
    // Close modal and open LMS form
    onClose();
    openLms();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-start md:items-center justify-center bg-black/60 backdrop-blur-sm p-4 md:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl my-4 md:my-0 max-h-[95vh] md:max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-5 border-b border-border bg-secondary/30 shrink-0">
          <div className="flex items-center gap-3">
            <div
              className={`${job.accentBg} ${job.accentText} w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black flex-shrink-0`}
            >
              {job.logo}
            </div>
            <div>
              <h3 className="font-bold text-foreground text-sm leading-tight">
                Apply for {job.role}
              </h3>
              <p className="text-xs text-muted-foreground">{job.company} · {job.location}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close application form"
            className="w-9 h-9 md:w-8 md:h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground touch-manipulation"
          >
            <X size={18} className="md:hidden" />
            <X size={16} className="hidden md:block" />
          </button>
        </div>

        {/* Body - Scrollable */}
        <div className="p-4 md:p-5 overflow-y-auto flex-1">
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 md:py-2.5 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all touch-manipulation"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 9876543210"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                  />
                </div>

                {/* Resume Upload */}
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">
                    Upload Resume <span className="text-red-500">*</span>
                  </label>
                  <input
                    ref={fileRef}
                    type="file"
                    required
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setResume(e.target.files?.[0] ?? null)}
                    className="hidden"
                    aria-label="Upload resume file"
                  />
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-dashed border-border bg-secondary/30 hover:border-primary/40 hover:bg-primary/5 transition-all text-sm text-muted-foreground"
                  >
                    <Upload size={16} className="flex-shrink-0" />
                    {resume ? (
                      <span className="text-foreground font-medium truncate">{resume.name}</span>
                    ) : (
                      <span>PDF, DOC, or DOCX (max 5 MB)</span>
                    )}
                  </button>
                </div>

                {/* Cover message */}
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">
                    Cover Message <span className="text-muted-foreground font-normal">(optional)</span>
                  </label>
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Why are you a great fit for this role?"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors shadow-md shadow-primary/25 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      Redirecting to registration...
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      Apply Now
                    </>
                  )}
                </button>
              </motion.form>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Job Card ────────────────────────────────────────────────────────────────
function JobCard({ job, index }: { job: Job; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const { openLms } = useLmsAccess();


  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.3) }}
      className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
    >
      {/* Accent top bar */}
      <div
        className={`${job.accentBg} absolute top-0 inset-x-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`${job.accentBg} ${job.accentText} w-12 h-12 rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0 shadow-sm`}
            >
              {job.logo}
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                {job.role}
              </h3>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <Building2 size={11} className="flex-shrink-0" />
                {job.company}
              </p>
            </div>
          </div>
          {job.hot && (
            <span className="flex-shrink-0 flex items-center gap-1 text-[10px] font-bold text-orange-600 bg-orange-50 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800/50 px-2 py-0.5 rounded-full">
              <Flame size={9} />
              Hot
            </span>
          )}
        </div>

        {/* Meta */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${TYPE_STYLES[job.type]}`}>
            {job.type}
          </span>
          <span className="text-[10px] font-medium text-muted-foreground flex items-center gap-1">
            <MapPin size={9} />
            {job.location}
          </span>
          <span className="text-[10px] font-medium text-muted-foreground flex items-center gap-1">
            <Clock size={9} />
            {job.postedDaysAgo === 0 ? "Today" : `${job.postedDaysAgo}d ago`}
          </span>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {job.skills.map((s) => (
            <span key={s} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-secondary text-foreground border border-border">
              {s}
            </span>
          ))}
        </div>

        {/* Description toggle */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.p
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="text-xs text-muted-foreground leading-relaxed mb-4 overflow-hidden"
            >
              {job.description}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            <p className="text-sm font-black text-foreground">{job.stipend}</p>
            <p className="text-[10px] text-muted-foreground">{job.openings} opening{job.openings > 1 ? "s" : ""}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-[10px] font-semibold text-muted-foreground hover:text-primary underline underline-offset-2 transition-colors flex items-center gap-0.5"
            >
              {expanded ? "Less" : "Details"}
              <ChevronDown size={10} className={`transition-transform ${expanded ? "rotate-180" : ""}`} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); openLms(); }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-colors shadow-sm shadow-primary/30"
            >
              Apply
              <Send size={11} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function JobPortalPage() {
  const [search, setSearch] = useState("");
  const [domainFilter, setDomainFilter] = useState<Domain>("All");
  const [typeFilter, setTypeFilter] = useState<JobType>("All");
  const [sortKey, setSortKey] = useState<SortKey>("recent");
  const [showFilters, setShowFilters] = useState(false);
  const [visibleCount, setVisibleCount] = useState(9);

  const filtered = useMemo(() => {
    let jobs = ALL_JOBS;

    if (search.trim()) {
      const q = search.toLowerCase();
      jobs = jobs.filter(
        (j) =>
          j.role.toLowerCase().includes(q) ||
          j.company.toLowerCase().includes(q) ||
          j.skills.some((s) => s.toLowerCase().includes(q)) ||
          j.location.toLowerCase().includes(q)
      );
    }

    if (domainFilter !== "All") {
      jobs = jobs.filter((j) => j.domain === domainFilter);
    }

    if (typeFilter !== "All") {
      jobs = jobs.filter((j) => j.type === typeFilter);
    }

    switch (sortKey) {
      case "recent":
        jobs = [...jobs].sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
        break;
      case "hot":
        jobs = [...jobs].sort((a, b) => Number(b.hot) - Number(a.hot));
        break;
      case "stipend":
        jobs = [...jobs].sort((a, b) => b.stipendValue - a.stipendValue);
        break;
    }

    return jobs;
  }, [search, domainFilter, typeFilter, sortKey]);

  const visible = filtered.slice(0, visibleCount);
  const hotCount = ALL_JOBS.filter((j) => j.hot).length;

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      {/* ── Hero / Header ────────────────────────────────────────────── */}
      <section className="relative bg-slate-50 dark:bg-slate-950 border-b border-border overflow-hidden">
        {/* Ambient */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-violet-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-14 md:py-20">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-primary/20 mb-6"
          >
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
            Live Opportunities
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground leading-tight mb-4"
          >
            Persevex <span className="text-primary">Job Portal</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14 }}
            className="text-muted-foreground text-base md:text-lg max-w-xl leading-relaxed mb-8"
          >
            Curated openings from verified hiring partners — each one accepting
            applications right now. Click Apply to submit your application
            directly through our platform.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative max-w-xl"
          >
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setVisibleCount(9); }}
              placeholder="Search role, company, skill, or location..."
              className="w-full pl-10 pr-10 py-3.5 rounded-2xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all shadow-sm"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={14} />
              </button>
            )}
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28 }}
            className="flex flex-wrap gap-4 mt-8"
          >
            {[
              { icon: Briefcase, label: `${ALL_JOBS.length} live listings`, color: "text-primary" },
              { icon: Flame, label: `${hotCount} trending`, color: "text-orange-500" },
              { icon: Users, label: "50+ partners", color: "text-violet-500" },
              { icon: BadgeCheck, label: "Verified openings", color: "text-emerald-500" },
            ].map(({ icon: Icon, label, color }) => (
              <span key={label} className={`flex items-center gap-1.5 text-xs font-semibold ${color}`}>
                <Icon size={13} />
                {label}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Filters + Grid ──────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-10">
        {/* Filter bar */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          {/* Mobile filter toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-sm font-semibold text-foreground border border-border px-4 py-2.5 rounded-full hover:border-primary/40 transition-colors md:hidden"
          >
            <SlidersHorizontal size={14} />
            Filters
          </button>

          {/* Domain tabs — hidden on mobile unless expanded */}
          <div className={`flex flex-wrap gap-2 ${showFilters ? "flex" : "hidden md:flex"}`}>
            {DOMAINS.map((d) => {
              const count = d === "All" ? ALL_JOBS.length : ALL_JOBS.filter((j) => j.domain === d).length;
              return (
                <button
                  key={d}
                  onClick={() => { setDomainFilter(d); setVisibleCount(9); }}
                  className={`flex items-center gap-1 px-3.5 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                    domainFilter === d
                      ? "bg-primary text-white shadow-md shadow-primary/25"
                      : "bg-card text-foreground border border-border hover:border-primary/40"
                  }`}
                >
                  {d}
                  <span className={`text-[9px] font-bold px-1 py-0.5 rounded-full ${domainFilter === d ? "bg-white/20 text-white" : "bg-secondary text-muted-foreground"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Type filter */}
          <div className={`flex flex-wrap gap-2 ${showFilters ? "flex" : "hidden md:flex"}`}>
            {JOB_TYPES.filter((t) => t !== "All").map((t) => (
              <button
                key={t}
                onClick={() => { setTypeFilter(typeFilter === t ? "All" : t); setVisibleCount(9); }}
                className={`px-3.5 py-2 rounded-full text-xs font-semibold border transition-all duration-200 ${
                  typeFilter === t
                    ? TYPE_STYLES[t as Exclude<JobType, "All">]
                    : "bg-card text-foreground border-border hover:border-primary/40"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs text-muted-foreground font-medium hidden sm:block">Sort:</span>
            <div className="flex gap-1">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setSortKey(opt.value)}
                  className={`px-3 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                    sortKey === opt.value
                      ? "bg-foreground text-background"
                      : "bg-card text-muted-foreground border border-border hover:text-foreground"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results info */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-bold text-foreground">{Math.min(visibleCount, filtered.length)}</span> of{" "}
            <span className="font-bold text-foreground">{filtered.length}</span> jobs
            {search && (
              <> for <span className="font-bold text-primary">&quot;{search}&quot;</span></>
            )}
          </p>
          {(domainFilter !== "All" || typeFilter !== "All" || search) && (
            <button
              onClick={() => { setSearch(""); setDomainFilter("All"); setTypeFilter("All"); setVisibleCount(9); }}
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
            >
              <X size={11} />
              Clear filters
            </button>
          )}
        </div>

        {/* Job grid */}
        <AnimatePresence mode="popLayout">
          {visible.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
            >
              {visible.map((job, i) => (
                <JobCard key={job.id} job={job} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                <Search size={24} className="text-muted-foreground" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">No jobs found</h3>
              <p className="text-sm text-muted-foreground">Try different keywords or clear the filters.</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Load More */}
        {visibleCount < filtered.length && (
          <div className="text-center mt-10">
            <button
              onClick={() => setVisibleCount((v) => v + 6)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-sm font-semibold text-foreground hover:border-primary/50 hover:bg-primary/5 transition-all"
            >
              Load more jobs
              <ChevronDown size={15} />
            </button>
          </div>
        )}
      </section>

      {/* ── Apply CTA banner ─────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-primary/10 via-violet-500/5 to-transparent border border-primary/20 rounded-3xl p-8 md:p-12 overflow-hidden"
        >
          <div className="absolute inset-0 opacity-[0.025] pointer-events-none bg-grid-pattern" />
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-lg">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp size={16} className="text-primary" />
                <span className="text-xs font-bold uppercase tracking-widest text-primary">92% Placement Rate</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-foreground mb-2">
                Get a Persevex certificate → <span className="text-primary">apply with confidence</span>
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Our hiring partners recognise Persevex-trained candidates. Complete a programme, get certified, and apply to these jobs with a resume that actually gets calls.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Link href="/explore-courses" className="btn-aptisure inline-flex items-center justify-center gap-2 text-sm">
                Explore Programs <ArrowUpRight size={15} />
              </Link>
              <Link
                href="/enroll"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-border text-sm font-semibold text-foreground hover:bg-muted transition-colors"
              >
                Enroll Now
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
