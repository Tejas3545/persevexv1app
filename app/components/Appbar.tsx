"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useScroll, SectionKey } from "../contexts/scrollContext";
import { motion, AnimatePresence, Variants } from "framer-motion";
import ProgramsMegaMenu from "./ProgramsMegaMenu";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";

type ProgramItem = { key: string; name: string; href: string };
type ProgramCategory = { branch: string; items: ProgramItem[] };

export default function Navbar() {
  const { scrollToSection } = useScroll();
  const router = useRouter();
  const pathname = usePathname();

  const [isDesktopDropdownOpen, setIsDesktopDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileProgramsOpen, setIsMobileProgramsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isHomePage = pathname === "/";

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
      branch: "CSE / IT",
      items: [
        { key: "c1", name: "Machine Learning", href: "/courses/machine-learning" },
        { key: "c2", name: "Web Development", href: "/courses/web-development" },
        { key: "c3", name: "Artificial Intelligence", href: "/courses/artificial-intelligence" },
        { key: "c4", name: "Cyber Security", href: "/courses/cybersecurity" },
        { key: "c5", name: "Data Science", href: "/courses/data-science" },
        { key: "c6", name: "Cloud Computing", href: "/courses/cloud-computing" },
      ],
    },
    {
      branch: "Business & Finance",
      items: [
        { key: "b1", name: "Finance", href: "/courses/finance" },
        { key: "b2", name: "Digital Marketing", href: "/courses/digital-marketing" },
        { key: "b3", name: "Human Resources", href: "/courses/human-resource" },
        { key: "b4", name: "Stock Market & Cryptocurrency", href: "/courses/stock-market-crypto" },
        { key: "b5", name: "Logistics & Supply Chain", href: "/courses/logistics-supply-chain" },
        { key: "b6", name: "Business Analytics", href: "/courses/business-analytics" },
      ],
    },
    {
      branch: "ECE / EEE",
      items: [
        { key: "e1", name: "Embedded Systems", href: "/courses/embedded-systems" },
        { key: "e2", name: "Internet of Things(IOT)", href: "/courses/iot" },
        { key: "e3", name: "Very Large Scale Integration (VLSI) Design", href: "/courses/vlsi-design" },
      ],
    },
    {
      branch: "Mechanical",
      items: [
        { key: "m1", name: "AutoCAD: 2D & 3D Design", href: "/courses/autocad" },
        { key: "m2", name: "Drone Mechanics", href: "/courses/drone-mechanics" },
        { key: "m3", name: "Hybrid Electric Vehicles (HEVs)", href: "/courses/hev" },
      ],
    },
    {
      branch: "Civil",
      items: [
        { key: "ci1", name: "AutoCAD: 2D & 3D Design", href: "/courses/autocad" },
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

  const scrollButtons: { name: string; key: SectionKey }[] = [
    { name: "Our Edge", key: "ourEdge" },
    { name: "Partners", key: "partners" },
    { name: "Reviews", key: "testimonials" },
  ];

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
          className="flex items-center gap-2.5 cursor-pointer"
          onClick={handleGoHome}
        >
          <Image
            src="/whitelogo.png"
            alt="Persevex Logo"
            width={36}
            height={36}
            className="rounded-lg"
            priority
          />
          <span className="text-xl md:text-2xl font-bold tracking-wide text-primary">
            PERSEVEX
          </span>
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

          {scrollButtons.map((button) => (
            <button
              key={button.name}
              onClick={() => handleNavigationAndScroll(button.key)}
              className="text-sm font-semibold text-foreground hover:bg-white hover:shadow-sm dark:hover:bg-slate-800 transition-all duration-300 cursor-pointer px-4 py-2.5 rounded-full"
            >
              {button.name}
            </button>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3 xl:gap-4">
          <Link
            href="https://lms.persevex.com/login/index.php"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-aptisure flex items-center gap-2"
          >
            Persevex LMS <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          </Link>

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
                href="https://lms.persevex.com/login/index.php"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-semibold text-foreground block"
              >
                LMS
              </Link>
            </motion.div>

            {scrollButtons.map((button) => (
              <motion.button
                key={button.name}
                variants={mobileLinkVariants}
                onClick={() => handleNavigationAndScroll(button.key)}
                className="text-lg font-semibold text-foreground py-3 text-left border-b border-border w-full"
              >
                {button.name}
              </motion.button>
            ))}

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
