"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import ApplicationFormModal from "@/app/components/ApplicationFormModal";
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
  Search,
  X,
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
  stipend?: string; // new optional stipend property for internships or paid roles
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
      "Design and maintain course curricula across our 30+ programs. Work directly with industry mentors to ensure content stays current and project-driven. Help train 10,000+ students per year.",
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
    stipend: "₹15,000",
    description:
      "Run Persevex's LinkedIn, Instagram, and YouTube presence. Create student success stories, reels, and campus outreach campaigns.",
    requirements: [
      "Active understanding of LinkedIn and Instagram growth",
      "Basic video editing skills",
      "Excellent written English",
      "Currently enrolled or recently graduated",
    ],
  },
  {
    id: "hr-exec",
    title: "Human Resource Executive",
    department: "Human Resources",
    type: "Full-time",
    location: "Hybrid (Bangalore / Remote)",
    description:
      "Build and manage our hiring pipeline, onboarding processes, and employee experience. You'll work closely with founders to scale our team from 50+ to 100+.",
    requirements: [
      "2+ years in recruitment or HR operations",
      "Experience with end-to-end hiring cycles",
      "Strong communication and organizational skills",
      "Passion for building team culture",
    ],
  },
  {
    id: "bd-exec",
    title: "Business Development Executive",
    department: "Business Development",
    type: "Full-time",
    location: "Hybrid (Bangalore / India)",
    description:
      "Drive student acquisition and institutional partnerships. Manage outreach campaigns, convert prospects, and be the face of Persevex growth across colleges.",
    requirements: [
      "1+ years in sales or business development",
      "Strong communication and persuasion skills",
      "Ability to work with targets and track metrics",
      "Understanding of EdTech landscape",
    ],
  },
];

// ─── Position Card ────────────────────────────────────────────────────────────
function PositionCard({ 
  position, 
  index, 
  onApply 
}: { 
  position: Position; 
  index: number;
  onApply: (title: string, id: string) => void;
}) {
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
            {position.stipend && (
              <span className="flex items-center gap-1">
                💰 {position.stipend}
              </span>
            )}
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
              {position.stipend && (
                <p className="text-sm font-semibold text-foreground">
                  Stipend: {position.stipend}
                </p>
              )}
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
              <button
                onClick={() => onApply(position.title, position.id)}
                className="inline-flex items-center gap-2 btn-aptisure text-sm mt-2 relative z-10 cursor-pointer"
              >
                Apply for this role <ArrowUpRight size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function CareersPage() {
  const [firmOpen, setFirmOpen] = useState(false);
  const [applicationModalOpen, setApplicationModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<{ title: string; id: string }>({ title: "General Application", id: "general" });
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All Departments");
  const [typeFilter, setTypeFilter] = useState("All Work Types");
  const [locationFilter, setLocationFilter] = useState("All Locations");
  const [remoteOnly, setRemoteOnly] = useState(false);

  // Extract unique values for filters
  const departments = ["All Departments", ...new Set(positions.map((p) => p.department))];
  const types = ["All Work Types", ...new Set(positions.map((p) => p.type))];
  const locations = ["All Locations", ...new Set(positions.map((p) => p.location))];

  // Filter logic
  const filteredPositions = positions.filter((position) => {
    const matchesSearch =
      position.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      position.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      position.department.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDepartment =
      departmentFilter === "All Departments" || position.department === departmentFilter;
    
    const matchesType =
      typeFilter === "All Work Types" || position.type === typeFilter;
    
    const matchesLocation =
      locationFilter === "All Locations" || position.location === locationFilter;
    
    const matchesRemote =
      !remoteOnly || position.location.toLowerCase().includes("remote");

    return (
      matchesSearch &&
      matchesDepartment &&
      matchesType &&
      matchesLocation &&
      matchesRemote
    );
  });

  // Group by department
  const groupedByDepartment = filteredPositions.reduce(
    (acc, position) => {
      if (!acc[position.department]) {
        acc[position.department] = [];
      }
      acc[position.department].push(position);
      return acc;
    },
    {} as Record<string, Position[]>
  );

  const departmentGroups = Object.keys(groupedByDepartment).sort();

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
            to every college student in India. We offer paid internships (₹15,000
            stipend) and an open, fast-paced firm culture — see the "About Firm" button
            above to learn more. If that excites you, we want to meet you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-4 relative z-10"
          >
            <a
              href="#open-roles"
              className="btn-aptisure inline-flex items-center gap-2 cursor-pointer"
            >
              See open roles <ChevronDown size={16} />
            </a>
            <button
              onClick={() => {
                setSelectedJob({ title: "General Application", id: "general" });
                setApplicationModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-border text-sm font-semibold text-foreground hover:bg-muted transition-colors cursor-pointer"
            >
              <Mail size={15} /> Apply Now
            </button>
            <button
              onClick={() => setFirmOpen(true)}
              className="btn-aptisure inline-flex items-center gap-2 cursor-pointer"
            >
              About Firm
            </button>
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
        <div className="max-w-6xl mx-auto px-6 md:px-10">
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
              className="section-title text-foreground mb-2"
            >
              Open <span className="text-primary">Positions</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-sm text-muted-foreground"
            >
              Filter by department, work type, and location. Apply in under a minute.
            </motion.p>
          </div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 bg-white dark:bg-slate-900 border border-border rounded-2xl p-6 space-y-4"
          >
            {/* Search Bar */}
            <div className="relative">
              <Search size={18} className="absolute left-3 top-3 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by title, department, keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">
                  Department
                </label>
                <select
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
                >
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex-1">
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">
                  Work Type
                </label>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
                >
                  {types.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex-1">
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">
                  Location
                </label>
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <label className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-border rounded-lg cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                  <input
                    type="checkbox"
                    checked={remoteOnly}
                    onChange={(e) => setRemoteOnly(e.target.checked)}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <span className="text-sm font-medium text-foreground whitespace-nowrap">
                    Remote only
                  </span>
                </label>
              </div>
            </div>
          </motion.div>

          {/* Results Count */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-muted-foreground mb-6"
          >
            Showing <span className="font-semibold text-foreground">{filteredPositions.length}</span> role{filteredPositions.length !== 1 ? "s" : ""}
          </motion.p>

          {/* Grouped Positions */}
          {filteredPositions.length > 0 ? (
            <div className="space-y-8">
              {departmentGroups.map((dept, deptIndex) => (
                <motion.div
                  key={dept}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: deptIndex * 0.05 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-lg font-bold text-foreground">{dept}</h3>
                    <span className="text-xs bg-secondary text-muted-foreground px-2.5 py-1 rounded-full border border-border">
                      {groupedByDepartment[dept].length} role{groupedByDepartment[dept].length !== 1 ? "s" : ""}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {groupedByDepartment[dept].map((position, posIndex) => (
                      <PositionCard
                        key={position.id}
                        position={position}
                        index={posIndex}
                        onApply={(title, id) => {
                          setSelectedJob({ title, id });
                          setApplicationModalOpen(true);
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-muted-foreground mb-2">No positions match your filters.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setDepartmentFilter("All Departments");
                  setTypeFilter("All Work Types");
                  setLocationFilter("All Locations");
                  setRemoteOnly(false);
                }}
                className="text-primary text-sm font-semibold hover:underline"
              >
                Clear all filters
              </button>
            </motion.div>
          )}

          {/* General Application CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 p-8 bg-white dark:bg-slate-900 border border-border rounded-3xl text-center shadow-sm"
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
            <button
              onClick={() => {
                setSelectedJob({ title: "Open Application", id: "open" });
                setApplicationModalOpen(true);
              }}
              className="btn-aptisure inline-flex items-center gap-2 cursor-pointer"
            >
              <Mail size={15} /> Apply Now
            </button>
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
                { number: "50+", label: "Team members" },
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

      {/* Application Form Modal */}
      <ApplicationFormModal
        isOpen={applicationModalOpen}
        onClose={() => setApplicationModalOpen(false)}
        jobTitle={selectedJob.title}
        jobId={selectedJob.id}
      />

      {/* Firm modal popup - moved to end to avoid z-index conflicts */}
      <AnimatePresence>
        {firmOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-start md:items-center justify-center z-[998] p-4 overflow-y-auto"
            onClick={() => setFirmOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-background rounded-2xl p-6 md:p-8 max-w-lg w-full my-4 md:my-0 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4">About Persevex</h2>
              <p className="mb-4 text-muted-foreground">
                Persevex is a fast-growing edtech firm focused on delivering
                outcome-oriented programs and internship experiences for
                students and early-career professionals. We value clarity,
                ownership, and rapid execution.
              </p>
              <button
                onClick={() => setFirmOpen(false)}
                className="mt-2 px-6 py-3 md:px-4 md:py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors touch-manipulation"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
