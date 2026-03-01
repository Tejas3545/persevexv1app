"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useScroll, SectionKey } from "../contexts/scrollContext";
import { motion, AnimatePresence, Variants } from "framer-motion";
import ProgramsMegaMenu from "./ProgramsMegaMenu";
import { ThemeToggle } from "./ThemeToggle";
import { useLmsAccess } from "./LmsRegistrationModal";
import { searchPages, SearchItem } from "@/app/constants/searchIndex";

type ProgramItem = { key: string; name: string; href: string };
type ProgramCategory = { branch: string; items: ProgramItem[] };

export default function Navbar() {
  const { scrollToSection } = useScroll();
  const router = useRouter();
  const pathname = usePathname();
  const { openLms } = useLmsAccess();

  const [isDesktopDropdownOpen, setIsDesktopDropdownOpen] = useState(false);
  const [isDesktopOfferingsOpen, setIsDesktopOfferingsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileProgramsOpen, setIsMobileProgramsOpen] = useState(false);
  const [isMobileOfferingsOpen, setIsMobileOfferingsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);

  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isSearchOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

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
        { key: 'm1', name: 'AutoCAD', href: '/courses/autocad' },
        { key: 'm2', name: 'Drone Mechanics', href: '/courses/drone-mechanics' },
        { key: 'm3', name: 'HEVs', href: '/courses/hev' },
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
        className={`sticky top-0 left-0 right-0 z-[999] h-16 md:h-18 flex items-center justify-between px-4 md:px-10 transition-all duration-300 ${isScrolled
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
            width={180}
            height={56}
            priority
            className="h-11 w-auto dark:brightness-[1.8] dark:contrast-[1.1] transition-[filter] duration-300"
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

          <div
            className="relative"
            onMouseEnter={() => setIsDesktopOfferingsOpen(true)}
            onMouseLeave={() => setIsDesktopOfferingsOpen(false)}
          >
            <button
              className="text-sm font-semibold text-foreground hover:bg-white hover:shadow-sm dark:hover:bg-slate-800 transition-all duration-300 cursor-pointer flex items-center gap-1 px-4 py-2.5 rounded-full"
            >
              Offerings
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${isDesktopOfferingsOpen ? 'rotate-180' : ''}`}>
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            <AnimatePresence>
              {isDesktopOfferingsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 top-full mt-2 w-48 bg-card border border-border rounded-2xl shadow-xl overflow-hidden z-50"
                >
                  <Link
                    href="https://projects-hub-platform.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-accent text-sm text-foreground hover:text-primary transition-colors border-b border-border/40"
                    onClick={() => setIsDesktopOfferingsOpen(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
                    Project Hub
                  </Link>
                  <Link
                    href="https://resumate-create.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-accent text-sm text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsDesktopOfferingsOpen(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/><circle cx="10" cy="12" r="2"/><path d="M14 12h.01"/></svg>
                    Resume Builder
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/job-portal"
            className="text-sm font-semibold text-foreground hover:bg-white hover:shadow-sm dark:hover:bg-slate-800 transition-all duration-300 cursor-pointer px-4 py-2.5 rounded-full flex items-center gap-1.5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
            Job Portal
          </Link>
        </nav>

        <div className="hidden lg:flex items-center gap-3 xl:gap-4">
          <button
            onClick={openLms}
            className="btn-aptisure flex items-center gap-2"
          >
            Persevex LMS <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          </button>

          {/* Global Search Button */}
          <div className="relative" ref={searchRef}>
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2.5 rounded-lg hover:bg-muted transition-colors border border-border/50"
              aria-label="Search site"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </button>

            <AnimatePresence>
              {isSearchOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-[400px] bg-background border border-border rounded-lg shadow-xl overflow-hidden"
                  style={{ zIndex: 99999 }}
                >
                  <div className="p-3 border-b border-border">
                    <input
                      type="text"
                      placeholder="Search courses, domains, pages..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-3 py-2 bg-muted rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      autoFocus
                    />
                  </div>
                  <div className="max-h-[400px] overflow-y-auto">
                    {searchQuery.trim() === "" ? (
                      <div className="p-4 text-center text-sm text-muted-foreground">
                        Start typing to search...
                      </div>
                    ) : (
                      (() => {
                        const results = searchPages(searchQuery);
                        if (results.length === 0) {
                          return (
                            <div className="p-4 text-center text-sm text-muted-foreground">
                              No results found for "{searchQuery}"
                            </div>
                          );
                        }
                        return (
                          <div className="py-2">
                            {results.map((result: SearchItem, index: number) => (
                              <Link
                                key={index}
                                href={result.path}
                                onClick={() => {
                                  setIsSearchOpen(false);
                                  setSearchQuery("");
                                }}
                                className="block px-4 py-2.5 hover:bg-muted transition-colors border-b border-border/30 last:border-b-0"
                              >
                                <div className="flex items-start gap-3">
                                  <div className="flex-1">
                                    <div className="font-medium text-sm">{result.title}</div>
                                    {result.description && (
                                      <div className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                                        {result.description}
                                      </div>
                                    )}
                                    <div className="text-xs text-primary/70 mt-1">{result.category}</div>
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        );
                      })()
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <ThemeToggle />
        </div>

        {/* Mobile Menu Toggle - Clean with LMS Button */}
        <div className="flex items-center gap-2 lg:hidden z-50">
          <button
            onClick={openLms}
            className="btn-aptisure flex items-center gap-1.5 text-xs font-semibold px-3 py-2 whitespace-nowrap"
          >
            LMS
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </button>
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2.5 rounded-lg hover:bg-muted transition-colors"
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground">
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
            className="fixed inset-0 z-[998] bg-card flex flex-col pt-20 px-6 pb-8 overflow-y-auto"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {/* Search in Mobile Menu */}
            <motion.div variants={mobileLinkVariants} className="mb-6">
              <button
                onClick={() => {
                  setIsSearchOpen(!isSearchOpen);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-border bg-muted/30 hover:bg-muted transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
                <span className="text-sm text-muted-foreground">Search courses, pages...</span>
              </button>
            </motion.div>

            {/* Home Link */}
            <motion.div variants={mobileLinkVariants} className="border-b border-border">
              <Link
                href="/"
                onClick={handleGoHome}
                className="text-lg font-semibold text-foreground block py-4"
              >
                Home
              </Link>
            </motion.div>

            {/* Programs Dropdown */}
            <motion.div variants={mobileLinkVariants} className="border-b border-border">
              <button
                onClick={() => setIsMobileProgramsOpen(!isMobileProgramsOpen)}
                className="text-lg font-semibold text-foreground flex items-center justify-between w-full py-4"
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

            {/* Explore All Courses */}
            <motion.div variants={mobileLinkVariants} className="border-b border-border">
              <Link
                href="/explore-courses"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-bold text-primary hover:text-primary/90 transition-colors flex items-center gap-2 py-4"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="7" height="7" x="3" y="3" rx="1"/>
                  <rect width="7" height="7" x="14" y="3" rx="1"/>
                  <rect width="7" height="7" x="14" y="14" rx="1"/>
                  <rect width="7" height="7" x="3" y="14" rx="1"/>
                </svg>
                Explore All Courses
              </Link>
            </motion.div>

            <motion.div variants={mobileLinkVariants} className="border-b border-border">
              <Link
                href="/enroll"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-semibold text-foreground block py-4"
              >
                Enroll Now
              </Link>
            </motion.div>

            <motion.div variants={mobileLinkVariants} className="border-b border-border">
              <Link
                href="/campus-ambassador"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-semibold text-foreground block py-4"
              >
                Campus Ambassador
              </Link>
            </motion.div>

            <motion.div variants={mobileLinkVariants} className="border-b border-border">
              <Link
                href="/support"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-semibold text-foreground block py-4"
              >
                Support
              </Link>
            </motion.div>

            <motion.div variants={mobileLinkVariants} className="border-b border-border">
              <Link
                href="/reviews"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-semibold text-foreground block py-4"
              >
                Reviews
              </Link>
            </motion.div>

            <motion.div variants={mobileLinkVariants} className="border-b border-border">
              <Link
                href="/careers"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-semibold text-foreground block py-4"
              >
                Careers
              </Link>
            </motion.div>

            <motion.div variants={mobileLinkVariants} className="w-full border-b border-border">
              <button
                onClick={() => setIsMobileOfferingsOpen(!isMobileOfferingsOpen)}
                className="text-lg font-semibold text-foreground py-4 flex items-center justify-between w-full"
              >
                Offerings
                <motion.svg
                  animate={{ rotate: isMobileOfferingsOpen ? 180 : 0 }}
                  xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"
                >
                  <path d="m6 9 6 6 6-6" />
                </motion.svg>
              </button>

              <AnimatePresence>
                {isMobileOfferingsOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pt-2 pb-4 flex flex-col gap-1">
                      <Link
                        href="https://projects-hub-platform.vercel.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-2 py-2 px-3 text-sm text-muted-foreground hover:text-primary hover:bg-accent rounded-lg transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
                        Project Hub
                      </Link>
                      <Link
                        href="https://resumate-create.vercel.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-2 py-2 px-3 text-sm text-muted-foreground hover:text-primary hover:bg-accent rounded-lg transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/><circle cx="10" cy="12" r="2"/><path d="M14 12h.01"/></svg>
                        Resume Builder
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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

            <motion.div variants={mobileLinkVariants} className="mt-6">
              <Link
                href="/contact"
                className="btn-primary w-full text-center rounded-full block!"
              >
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-background/95 backdrop-blur-sm lg:hidden flex items-start justify-center pt-20 px-4"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md bg-card border border-border rounded-lg shadow-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-border">
                <input
                  type="text"
                  placeholder="Search courses, domains, pages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 bg-muted rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  autoFocus
                />
              </div>
              <div className="max-h-[400px] overflow-y-auto">
                {searchQuery.trim() === "" ? (
                  <div className="p-6 text-center text-sm text-muted-foreground">
                    Start typing to search...
                  </div>
                ) : (
                  (() => {
                    const results = searchPages(searchQuery);
                    if (results.length === 0) {
                      return (
                        <div className="p-6 text-center text-sm text-muted-foreground">
                          No results found for "{searchQuery}"
                        </div>
                      );
                    }
                    return (
                      <div className="py-2">
                        {results.map((result: SearchItem, index: number) => (
                          <Link
                            key={index}
                            href={result.path}
                            onClick={() => {
                              setIsSearchOpen(false);
                              setSearchQuery("");
                            }}
                            className="block px-4 py-3 hover:bg-muted transition-colors border-b border-border/30 last:border-b-0"
                          >
                            <div className="font-medium text-sm">{result.title}</div>
                            {result.description && (
                              <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                {result.description}
                              </div>
                            )}
                            <div className="text-xs text-primary/70 mt-1.5">{result.category}</div>
                          </Link>
                        ))}
                      </div>
                    );
                  })()
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
