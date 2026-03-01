"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Search,
  Briefcase,
  Code2,
  Cpu,
  Wrench,
  Building2,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Star,
  BadgeCheck,
  MoreHorizontal,
  MessageCircle,
} from "lucide-react";
import { allDomains, DomainView, CourseType } from "../../constants/courseConstant";
import ExploreFooterSection from "@/app/components/ExploreFooterSection";
import { searchPages } from "@/app/constants/searchIndex";

const domainMeta: Record<string, { icon: React.ReactNode; subtitle: string; label: string }> = {
  management: { icon: <Briefcase size={18} />, subtitle: "Business tracks - Real projects", label: "Management" },
  technical:  { icon: <Code2 size={18} />,     subtitle: "Software - AI - Cloud - Security", label: "Computer Science" },
  electronics:{ icon: <Cpu size={18} />,        subtitle: "IoT - Embedded builds - Evaluation", label: "Electronics" },
  mechanical: { icon: <Wrench size={18} />,     subtitle: "Design tools - EVs - Portfolio", label: "Mechanical" },
  civil:      { icon: <Building2 size={18} />,  subtitle: "CAD - Planning - Expert review", label: "Civil" },
};

const advantages = [
  "Expert-led live cohorts + recorded sessions",
  "Real projects - portfolio proof",
  "Strict rubrics + proper evaluation",
  "Mentor-reviewed capstone projects",
];

const sidebarVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};
const sidebarItemVariants = {
  hidden: { opacity: 0, x: -14 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.25 } },
};
const gridVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
  exit:   { opacity: 0, transition: { duration: 0.15 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.27 } },
};
const rightPanelVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, delay: 0.2 } },
};

export default function ExploreCoursesPage() {
  const [activeView, setActiveView] = useState<DomainView>("management");
  const [searchQuery, setSearchQuery] = useState("");
  const [showMore, setShowMore] = useState(false);

  // Handle URL hash navigation
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    const validDomains = ['management', 'technical', 'electronics', 'mechanical', 'civil'];
    if (hash && validDomains.includes(hash)) {
      setActiveView(hash as DomainView);
    }
  }, []);

  const activeDomain = allDomains.find((d) => d.view === activeView)!;
  const meta = domainMeta[activeView];

  const showingSearch = searchQuery.length > 1;

  const allSearchResults: (CourseType & { domainLabel: string })[] = showingSearch
    ? (() => {
        // Get matching courses from allDomains
        const courseMatches = allDomains.flatMap((d) =>
          d.courses
            .filter(
              (c) =>
                c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (c.description ?? "").toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((c) => ({ ...c, domainLabel: domainMeta[d.view]?.label ?? d.name }))
        );

        // Get results from searchIndex (for additional course matches)
        const indexResults = searchPages(searchQuery);
        
        // Only use course-specific matches from searchIndex, not domain-level entries
        const additionalMatches = indexResults
          .filter(item => 
            // Exclude domain-level aggregation pages
            !item.id.startsWith('domain-') &&
            // Only include actual course pages
            (item.path.includes('/courses/') || item.path.includes('/job-guarantee-program/'))
          );

        // Add any unique courses from searchIndex that aren't already in courseMatches
        const courseMatchPaths = new Set(courseMatches.map(c => c.route || c.slug));
        
        return courseMatches;
      })()
    : [];

  const filteredCourses = activeDomain.courses.filter(
    (c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.description ?? "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const coursesToDisplay: (CourseType & { domainLabel?: string })[] = showingSearch
    ? allSearchResults
    : filteredCourses;

  const totalPrograms = allDomains.reduce((s, d) => s + d.courses.length, 0);

  return (
    <main className="relative min-h-screen w-full bg-background text-foreground overflow-x-hidden">

      {/* PAGE HEADER */}
      <motion.div
        className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-40"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
              <Code2 size={12} />
              Choose a Domain
              <ChevronRight size={12} />
              Pick a Program
            </p>
            <h1 className="text-2xl font-extrabold tracking-tight mt-0.5">Programs</h1>
            <p className="text-sm text-muted-foreground">Expert-led &bull; Real projects &bull; Rubric evaluation</p>
          </div>
          <div className="relative w-full sm:w-72 lg:w-80">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search programs or domains..."
              className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-border bg-secondary/40 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
            />
          </div>
        </div>
      </motion.div>

      {/* THREE-COLUMN BODY */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-28">
        <div className="flex gap-6 items-start">

          {/* LEFT SIDEBAR */}
          <motion.aside
            className="hidden lg:flex flex-col gap-1 w-60 flex-shrink-0 sticky top-[88px]"
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
          >
            <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground px-3 mb-2">Domains</p>
            {allDomains.filter((d) => d.enabled).map((domain) => {
              const dm = domainMeta[domain.view];
              const isActive = domain.view === activeView && !showingSearch;
              return (
                <motion.button
                  key={domain.view}
                  variants={sidebarItemVariants}
                  onClick={() => { setActiveView(domain.view as DomainView); setSearchQuery(""); }}
                  className={`relative w-full flex items-center gap-3 rounded-xl px-3 py-3 text-left transition-all duration-200 group ${
                    isActive ? "bg-primary/10 text-primary" : "text-foreground hover:bg-secondary"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="domain-active-bar"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-7 rounded-full bg-primary"
                    />
                  )}
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                    isActive ? "bg-primary text-white" : "bg-secondary text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                  }`}>
                    {dm?.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold leading-tight truncate">{dm?.label ?? domain.name}</p>
                    <p className="text-[11px] text-muted-foreground truncate mt-px">{dm?.subtitle}</p>
                  </div>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${
                    isActive ? "bg-primary text-white" : "bg-secondary text-muted-foreground"
                  }`}>
                    {domain.courses.length}
                  </span>
                </motion.button>
              );
            })}
          </motion.aside>

          {/* CENTER: COURSE GRID */}
          <div className="flex-1 min-w-0">
            {/* Mobile tabs */}
            <div className="flex lg:hidden gap-2 overflow-x-auto pb-2 mb-4">
              {allDomains.filter((d) => d.enabled).map((domain) => {
                const dm = domainMeta[domain.view];
                return (
                  <button
                    key={domain.view}
                    onClick={() => { setActiveView(domain.view as DomainView); setSearchQuery(""); }}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold whitespace-nowrap border transition-all flex-shrink-0 ${
                      domain.view === activeView ? "bg-primary text-white border-primary" : "bg-secondary text-foreground border-border hover:border-primary/40"
                    }`}
                  >
                    {dm?.icon}
                    {dm?.label ?? domain.name}
                  </button>
                );
              })}
            </div>

            {/* Section heading */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`heading-${activeView}-${showingSearch}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="mb-5"
              >
                {showingSearch ? (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Search Results</p>
                    <h2 className="text-lg font-extrabold mt-0.5">
                      {allSearchResults.length} program{allSearchResults.length !== 1 ? "s" : ""} matching{" "}
                      <span className="text-primary">&quot;{searchQuery}&quot;</span>
                    </h2>
                  </div>
                ) : (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{meta?.label ?? activeDomain.name} Programs</p>
                    <h2 className="text-lg font-extrabold mt-0.5">
                      {filteredCourses.length} program{filteredCourses.length !== 1 ? "s" : ""}
                    </h2>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`grid-${activeView}-${searchQuery}`}
                variants={gridVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {coursesToDisplay.length === 0 ? (
                  <motion.div variants={cardVariants} className="col-span-2 text-center py-20 text-muted-foreground">
                    <Search size={36} className="mx-auto mb-3 opacity-30" />
                    <p className="text-lg font-semibold">No programs found</p>
                    <p className="text-sm mt-1">Try a different search or domain</p>
                  </motion.div>
                ) : (
                  coursesToDisplay.map((course) => {
                    const Icon = course.icon;
                    const projectCount = course.projects?.length ?? 4;
                    return (
                      <motion.div key={`${course.id}-${(course as CourseType & { domainLabel?: string }).domainLabel ?? ""}`} variants={cardVariants}>
                        <Link href={course.route} className="block group h-full">
                          <div className="relative h-full rounded-2xl border border-border bg-card hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-250 overflow-hidden p-5">
                            {/* top accent on hover */}
                            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary to-blue-400 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

                            <div className="flex items-start gap-3 mb-3">
                              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-250 flex-shrink-0">
                                <Icon className="w-5 h-5" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <h3 className="font-bold text-sm leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
                                  {course.title}
                                </h3>
                                {(course as CourseType & { domainLabel?: string }).domainLabel && (
                                  <span className="text-[10px] font-semibold text-primary/70 uppercase tracking-wider">
                                    {(course as CourseType & { domainLabel?: string }).domainLabel}
                                  </span>
                                )}
                              </div>
                            </div>

                            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-4">{course.description}</p>

                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-secondary text-foreground border border-border">
                                <BadgeCheck size={11} className="text-primary" />
                                Certification
                              </span>
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-secondary text-foreground border border-border">
                                <Star size={11} className="text-yellow-500" />
                                Expert-led
                              </span>
                              {projectCount > 0 && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-primary/10 text-primary border border-primary/20">
                                  {projectCount}+ Projects
                                </span>
                              )}
                              <span className="ml-auto text-muted-foreground group-hover:text-primary transition-colors">
                                <ArrowRight size={14} />
                              </span>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT PANEL */}
          <motion.aside
            className="hidden xl:flex flex-col gap-4 w-72 flex-shrink-0 sticky top-[88px]"
            variants={rightPanelVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Persevex Advantage</p>
                <button
                  onClick={() => setShowMore((v) => !v)}
                  aria-label={showMore ? "Show fewer benefits" : "Show more benefits"}
                  className="text-muted-foreground hover:text-foreground transition"
                >
                  <MoreHorizontal size={16} aria-hidden="true" />
                </button>
              </div>
              <p className="text-base font-extrabold tracking-tight mb-3">Outcomes you can verify</p>
              <div className="space-y-2.5">
                {(showMore ? advantages : advantages.slice(0, 3)).map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 size={15} className="text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground leading-snug">{item}</span>
                  </div>
                ))}
              </div>
              {!showMore && (
                <button onClick={() => setShowMore(true)} className="mt-3 text-xs font-semibold text-primary hover:underline">+ More benefits</button>
              )}
              <p className="mt-4 text-[11px] text-muted-foreground border-t border-border pt-3">Mentor-supported learning with structured milestones.</p>
            </div>

            <a
              href="https://wa.me/918660128339"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition shadow-lg shadow-primary/20"
            >
              <MessageCircle size={16} />
              Talk to Career Expert
            </a>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Programs", value: `${totalPrograms}+` },
                { label: "Students", value: "10000+" },
                { label: "Projects", value: "50+" },
                { label: "Domains",  value: `${allDomains.filter((d) => d.enabled).length}` },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl border border-border bg-secondary/40 p-3 text-center">
                  <p className="text-xl font-extrabold text-primary">{stat.value}</p>
                  <p className="text-[11px] text-muted-foreground font-medium mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.aside>
        </div>
      </div>

      {/* BOTTOM STICKY BAR */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-md px-4 py-3"
        initial={{ y: 60 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 300, damping: 28 }}
      >
        <div className="max-w-screen-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-center sm:text-left">
            <Link href="/fees" className="text-primary font-bold hover:underline">Enroll Now.</Link>{" "}
            <span className="text-muted-foreground">
              We handle training{" "}
              <span className="font-semibold text-foreground">&#8594;</span> internship{" "}
              <span className="font-semibold text-foreground">&#8594;</span> projects{" "}
              <span className="font-semibold text-foreground">&#8594;</span> evaluations{" "}
              <span className="font-semibold text-foreground">&#8594;</span>{" "}
              <span className="text-primary font-semibold">Placement Ready</span>
            </span>
          </p>
          <a
            href="https://wa.me/918660128339"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-full font-semibold text-sm hover:bg-primary/90 transition shadow-lg shadow-primary/20"
          >
            <MessageCircle size={15} />
            Talk to Career Expert
          </a>
        </div>
      </motion.div>

      <ExploreFooterSection />
    </main>
  );
}
