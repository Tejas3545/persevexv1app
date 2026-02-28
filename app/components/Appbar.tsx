"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useScroll, SectionKey } from "../contexts/scrollContext";
import { motion, AnimatePresence, Variants } from "framer-motion";
import ProgramsMegaMenu from "./ProgramsMegaMenu";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";
import { useLmsAccess } from "./LmsRegistrationModal";

type ProgramItem = { key: string; name: string; href: string };
type ProgramCategory = { branch: string; items: ProgramItem[] };

export default function Navbar() {
  const { scrollToSection } = useScroll();
  const router = useRouter();
  const pathname = usePathname();
  const { openLms } = useLmsAccess();

  const [isDesktopDropdownOpen, setIsDesktopDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileProgramsOpen, setIsMobileProgramsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const isHomePage = pathname === "/";

  // Close search on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
        setSearchQuery("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus input when search opens
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  const openSearch = useCallback(() => {
    setIsSearchOpen(true);
    setSearchQuery("");
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigationAndScroll = (key: SectionKey) => {
    setIsMobileMenuOpen(false);
    if (isHomePage) {
      scrollToSection(key);
    } else {
      router.push(`/?scrollTo=${key}`);
    }
  };

  const handleGoHome = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (isHomePage) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/");
    }
  };

  const internshipProgramCategories: ProgramCategory[] = [
    {
      branch: 'CSE / IT',
      items: [
        { key: 'c2', name: 'Full Stack Web Development', href: '/courses/web-development' },
        { key: 'c6', name: 'Cloud Computing', href: '/courses/cloud-computing' },
        { key: 'c1', name: 'Machine Learning', href: '/courses/machine-learning' },
        { key: 'c3', name: 'Artificial Intelligence', href: '/courses/artificial-intelligence' },
        { key: 'c5', name: 'Data Science', href: '/courses/data-science' },
        { key: 'c4', name: 'Cyber Security', href: '/courses/cybersecurity' },
        { key: 'c7', name: 'Generative (Gen) AI and Prompt Engineering', href: '/coming-soon' },
      ],
    },
    {
      branch: 'Civil',
      items: [
        { key: 'ci1', name: 'AutoCAD', href: '/courses/autocad' }
      ]
    },
    {
      branch: 'Mechanical',
      items: [
        { key: 'm1', name: 'AutoCAD', href: '/courses/autocad ' },
        { key: 'm2', name: 'Drone Mechanics', href: '/courses/drone-mechanics' },
        { key: 'm3', name: 'HEVs', href: '/courses/hev' },
      ]
    },
    {
      branch: 'Business Law',
      items: [
        { key: 'bl1', name: 'Coming Soon', href: '/coming-soon' }
      ]
    },
    {
      branch: 'Electronics and Electrical',
      items: [
        { key: 'e2', name: 'IOT (internet of things)', href: '/courses/iot' },
        { key: 'e1', name: 'Embedded Systems', href: '/courses/embedded-systems' },
        { key: 'e3', name: 'VLSI', href: '/courses/vlsi-design' },
      ],
    },
    {
      branch: 'Management and Commerce',
      items: [
        { key: 'b3', name: 'HR', href: '/courses/human-resource' },
        { key: 'b2', name: 'Digital Marketing', href: '/courses/digital-marketing' },
        { key: 'b1', name: 'Finance', href: '/courses/finance' },
        { key: 'b5', name: 'Logistics and Supply Chain', href: '/courses/logistics-supply-chain' },
        { key: 'b6', name: 'Business Analytics', href: '/courses/business-analytics' },
        { key: 'b4', name: 'Stock Market and Crypto Currency', href: '/courses/stock-market-crypto' }
      ],
    },
  ];

  const placementProgramCategories: ProgramCategory[] = [
    {
      branch: "Job Guarantee Programs",
      items: [
        { key: "j1", name: "Fullstack Development", href: "/job-guarantee-program/web-development" },
        { key: "j2", name: "Human Resources", href: "/job-guarantee-program/human-resource" },
        { key: "j3", name: "Digital Marketing", href: "/job-guarantee-program/digital-marketing" },
      ],
    },
  ];

  // Dedicated page navigation links (replaces old scrollTo architecture)
  // Each section is now reachable as its own standalone page.

  /** All searchable course items (internship + placement) */
  const allCourseItems = [
    ...internshipProgramCategories.flatMap((cat) => cat.items),
    ...placementProgramCategories.flatMap((cat) => cat.items),
  ].filter((item) => item.name !== "Coming Soon");

  const searchResults =
    searchQuery.trim().length > 0
      ? (() => {
          const q = searchQuery.toLowerCase();
          // Check if query matches a domain/branch name
          const matchedBranch = internshipProgramCategories.find(
            (cat) => cat.branch.toLowerCase().includes(q)
          );
          if (matchedBranch) {
            return matchedBranch.items.filter((i) => i.name !== "Coming Soon").slice(0, 8);
          }
          // Otherwise filter by individual course name
          return allCourseItems.filter((item) =>
            item.name.toLowerCase().includes(q)
          ).slice(0, 8);
        })()
      : [];

  /** Domain suggestions shown when search is focused but empty */
  const domainSuggestions = internshipProgramCategories.map((cat) => ({
    branch: cat.branch,
    count: cat.items.filter((i) => i.name !== "Coming Soon").length,
    firstHref: cat.items[0]?.href ?? "#",
    items: cat.items.filter((i) => i.name !== "Coming Soon"),
  }));

  const mobileMenuVariants: Variants = {
    hidden: { opacity: 0, x: "100%", transition: { duration: 0.3, ease: "easeOut" } },
    visible: {
      opacity: 1,
      x: "0%",
      transition: { duration: 0.3, ease: "easeIn", staggerChildren: 0.05 },
    },
  };

  const mobileLinkVariants: Variants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  return (
    <>
      <header
        className={`sticky top-0 left-0 right-0 z-50 h-16 md:h-18 flex items-center justify-between px-6 md:px-10 transition-all duration-300 ${isScrolled
          ? "navbar-glass shadow-sm"
          : "bg-card/60 backdrop-blur-sm"
          }`}
      >
        <Link
          href="/"
          className="flex items-center cursor-pointer"
          onClick={handleGoHome}
        >
          <Image
            src="/persevex.png"
            alt="Persevex"
            width={44}
            height={44}
            className="h-11 w-auto object-contain"
            priority
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-2 xl:gap-3 bg-secondary/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-border">
          <div
            className="relative"
            onMouseEnter={() => setIsDesktopDropdownOpen(true)}
            onMouseLeave={() => setIsDesktopDropdownOpen(false)}
          >
            <Link
              href="/explore-courses"
              className="text-sm font-semibold text-foreground hover:bg-white hover:shadow-sm dark:hover:bg-slate-800 transition-all duration-300 cursor-pointer flex items-center gap-1 px-4 py-2.5 rounded-full"
            >
              Programs
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${isDesktopDropdownOpen ? 'rotate-180' : ''}`}>
                <path d="m6 9 6 6 6-6" />
              </svg>
            </Link>
            <AnimatePresence>
              {isDesktopDropdownOpen && (
                <ProgramsMegaMenu
                  internshipData={internshipProgramCategories}
                  placementData={placementProgramCategories}
                  onClose={() => setIsDesktopDropdownOpen(false)}
                />
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/campus-ambassador"
            className="text-sm font-semibold text-foreground hover:bg-white hover:shadow-sm dark:hover:bg-slate-800 transition-all duration-300 cursor-pointer px-4 py-2.5 rounded-full"
          >
            Campus Ambassador
          </Link>

          <Link
            href="/support"
            className="text-sm font-semibold text-foreground hover:bg-white hover:shadow-sm dark:hover:bg-slate-800 transition-all duration-300 cursor-pointer px-4 py-2.5 rounded-full"
          >
            Support
          </Link>

          <Link
            href="/reviews"
            className="text-sm font-semibold text-foreground hover:bg-white hover:shadow-sm dark:hover:bg-slate-800 transition-all duration-300 cursor-pointer px-4 py-2.5 rounded-full"
          >
            Reviews
          </Link>
          <Link
            href="/careers"
            className="text-sm font-semibold text-foreground hover:bg-white hover:shadow-sm dark:hover:bg-slate-800 transition-all duration-300 cursor-pointer px-4 py-2.5 rounded-full"
          >
            Careers
          </Link>
          <Link
            href="/job-portal"
            className="text-sm font-semibold text-foreground hover:bg-white hover:shadow-sm dark:hover:bg-slate-800 transition-all duration-300 cursor-pointer px-4 py-2.5 rounded-full flex items-center gap-1.5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
            Job Portal
          </Link>
        </nav>

        <div className="hidden lg:flex items-center gap-3 xl:gap-4">
          {/* ── Search ─────────────────────────────────────────── */}
          <div className="relative" ref={searchContainerRef}>
            <AnimatePresence mode="wait">
              {isSearchOpen ? (
                <motion.div
                  key="search-input"
                  initial={{ width: 32, opacity: 0 }}
                  animate={{ width: 260, opacity: 1 }}
                  exit={{ width: 32, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="flex items-center gap-2 bg-background border border-border rounded-full px-3 py-2 shadow-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground shrink-0"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search programs..."
                    className="flex-1 text-sm font-medium bg-transparent text-foreground placeholder:text-muted-foreground/60 outline-none min-w-0"
                    onKeyDown={(e) => {
                      if (e.key === "Escape") { setIsSearchOpen(false); setSearchQuery(""); }
                      if (e.key === "Enter" && searchResults.length > 0) {
                        router.push(searchResults[0].href);
                        setIsSearchOpen(false); setSearchQuery("");
                      }
                    }}
                  />
                  <button aria-label="Clear search" onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }} className="text-muted-foreground hover:text-foreground transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </button>
                </motion.div>
              ) : (
                <motion.button
                  key="search-icon"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={openSearch}
                  className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Search programs"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                </motion.button>
              )}
            </AnimatePresence>

            {/* Search Dropdown Results */}
            <AnimatePresence>
              {isSearchOpen && searchQuery.trim().length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-80 bg-card border border-border rounded-2xl shadow-xl overflow-hidden z-50"
                >
                  <div className="px-4 py-2.5 border-b border-border/60">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Browse by Domain</p>
                  </div>
                  {domainSuggestions.map((domain) => (
                    <button
                      key={domain.branch}
                      onClick={() => setSearchQuery(domain.branch)}
                      className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-accent text-sm text-foreground hover:text-primary transition-colors border-b border-border/20 last:border-0"
                    >
                      <span className="font-medium">{domain.branch}</span>
                      <span className="text-[10px] font-semibold text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">{domain.count} courses</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {isSearchOpen && searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-72 bg-card border border-border rounded-2xl shadow-xl overflow-hidden z-50"
                >
                  {searchResults.map((item) => (
                    <Link
                      key={item.key}
                      href={item.href}
                      onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-accent text-sm text-foreground hover:text-primary transition-colors border-b border-border/40 last:border-0"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground shrink-0"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                      {item.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Empty state */}
            <AnimatePresence>
              {isSearchOpen && searchQuery.trim().length > 1 && searchResults.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute right-0 top-full mt-2 w-72 bg-card border border-border rounded-2xl shadow-xl z-50 px-4 py-5 text-center"
                >
                  <p className="text-sm text-muted-foreground">No programs found for &ldquo;{searchQuery}&rdquo;</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={openLms}
            className="btn-aptisure flex items-center gap-2"
          >
            Persevex LMS <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          </button>

          <ThemeToggle />
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-2 lg:hidden z-50">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
              {isMobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-card flex flex-col pt-20 px-6 overflow-y-auto"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div variants={mobileLinkVariants} className="w-full border-b border-border pb-3">
              <button
                onClick={() => setIsMobileProgramsOpen(!isMobileProgramsOpen)}
                className="text-lg font-semibold text-foreground py-3 flex items-center justify-between w-full"
              >
                Programs
                <motion.svg
                  animate={{ rotate: isMobileProgramsOpen ? 180 : 0 }}
                  xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"
                >
                  <path d="m6 9 6 6 6-6" />
                </motion.svg>
              </button>

              <AnimatePresence>
                {isMobileProgramsOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pt-2 pb-4 flex flex-col gap-1">
                      <h4 className="text-primary font-semibold mt-2 mb-1 text-xs uppercase tracking-wider">
                        Internship Programs
                      </h4>
                      {internshipProgramCategories
                        .flatMap((cat) => cat.items)
                        .map((item) => (
                          <Link
                            key={item.key}
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block py-2 px-3 text-sm text-muted-foreground hover:text-primary hover:bg-accent rounded-lg transition-colors"
                          >
                            {item.name}
                          </Link>
                        ))}

                      <h4 className="text-primary font-semibold mt-4 mb-1 text-xs uppercase tracking-wider">
                        Job Guarantee Programs
                      </h4>
                      {placementProgramCategories
                        .flatMap((cat) => cat.items)
                        .map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block py-2 px-3 text-sm text-muted-foreground hover:text-primary hover:bg-accent rounded-lg transition-colors"
                          >
                            {item.name}
                          </Link>
                        ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div variants={mobileLinkVariants} className="border-b border-border py-3">
              <Link
                href="/enroll"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-semibold text-foreground block"
              >
                Enroll Now
              </Link>
            </motion.div>

            <motion.div variants={mobileLinkVariants} className="border-b border-border py-3">
              <Link
                href="/campus-ambassador"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-semibold text-foreground block"
              >
                Campus Ambassador
              </Link>
            </motion.div>

            <motion.div variants={mobileLinkVariants} className="border-b border-border py-3">
              <Link
                href="/support"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-semibold text-foreground block"
              >
                Support
              </Link>
            </motion.div>

            <motion.div variants={mobileLinkVariants} className="border-b border-border py-3">
              <Link
                href="/reviews"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-semibold text-foreground block"
              >
                Reviews
              </Link>
            </motion.div>

            <motion.div variants={mobileLinkVariants} className="border-b border-border py-3">
              <Link
                href="/careers"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-semibold text-foreground block"
              >
                Careers
              </Link>
            </motion.div>

            <motion.div variants={mobileLinkVariants} className="border-b border-border py-3">
              <Link
                href="/job-portal"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-bold text-primary flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                Job Portal
              </Link>
            </motion.div>

            <motion.div variants={mobileLinkVariants} className="border-b border-border py-3">
              <button
                onClick={() => { setIsMobileMenuOpen(false); openLms(); }}
                className="text-lg font-semibold text-foreground block w-full text-left"
              >
                LMS
              </button>
            </motion.div>

            <motion.div variants={mobileLinkVariants} className="mt-6">
              <button
                onClick={() => handleNavigationAndScroll("contactUs")}
                className="btn-primary w-full text-center rounded-full!"
              >
                Contact Us
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
