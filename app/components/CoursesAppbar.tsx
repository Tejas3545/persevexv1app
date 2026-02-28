"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { CourseSectionKey, useCourseScroll } from '../(course-pages)/contexts/courseScrollContext';
import ProgramsMegaMenu from './ProgramsMegaMenu';
import { ThemeToggle } from './ThemeToggle';

type ProgramItem = { key: string, name: string; href: string; };
type ProgramCategory = { branch: string; items: ProgramItem[]; };

export default function CoursePageNavbar() {
  const { scrollToSection } = useCourseScroll();
  const [isDesktopDropdownOpen, setIsDesktopDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileProgramsOpen, setIsMobileProgramsOpen] = useState(false);

  // 1. Renamed original data to be specific to internships

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
      branch: 'Job Guarantee Programs',
      items: [
        { key: "j1", name: 'Fullstack Development', href: '/job-guarantee-program/web-development' },
        { key: "j2", name: 'Human Resources', href: '/job-guarantee-program/human-resource' },
        { key: "j3", name: 'Digital Marketing', href: '/job-guarantee-program/digital-marketing' },
      ]
    }
  ];



  const scrollLinks: { name: string; key: CourseSectionKey }[] = [
    { name: 'Curriculum', key: 'curriculum' },
    { name: 'Projects', key: 'projects' },
    { name: 'Certification', key: 'certification' },
    { name: 'FAQs', key: 'faqs' },
  ];

  const handleMobileLinkClick = (key: CourseSectionKey) => {
    scrollToSection(key);
    setIsMobileMenuOpen(false);
  };

  const mobileMenuVariants: Variants = {
    hidden: { opacity: 0, transition: { duration: 0.3, ease: "easeOut" } },
    visible: { opacity: 1, transition: { duration: 0.3, ease: "easeIn", staggerChildren: 0.07 } },
  };

  const mobileLinkVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
  };

  return (
    <>
      <header className="sticky top-0 left-0 right-0 z-50 h-16 flex items-center justify-between p-6 md:p-8 text-foreground bg-card/90 backdrop-blur-md border-b border-border">
        <div className='flex items-center justify-center gap-4'>
          <Link href="/" className="cursor-pointer flex items-center">
            <Image
              src="/persevex.png"
              alt="Persevex"
              width={44}
              height={44}
              className="h-11 w-auto object-contain"
              priority
            />
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-8 lg:gap-12">
          <div
            className="relative"
            onMouseEnter={() => setIsDesktopDropdownOpen(true)}
            onMouseLeave={() => setIsDesktopDropdownOpen(false)}
          >
            <Link href="/explore-courses" className="text-base font-medium hover:text-primary transition-colors duration-300 cursor-pointer flex items-center gap-1">
              Programs
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
            </Link>
            <AnimatePresence>
              {isDesktopDropdownOpen && (
                // 3. Pass the correct props to the component
                <ProgramsMegaMenu
                  internshipData={internshipProgramCategories}
                  placementData={placementProgramCategories}
                  onClose={() => setIsDesktopDropdownOpen(false)}
                />
              )}
            </AnimatePresence>
          </div>

          {scrollLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.key)}
              className="text-base font-medium hover:text-primary transition-colors duration-300"
            >
              {link.name}
            </button>
          ))}
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 md:hidden z-50">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-foreground p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isMobileMenuOpen ? <line x1="18" y1="6" x2="6" y2="18" /> : <line x1="3" y1="12" x2="21" y2="12" />}
              {isMobileMenuOpen ? <line x1="6" y1="6" x2="18" y2="18" /> : <line x1="3" y1="6" x2="21" y2="6" />}
              {!isMobileMenuOpen && <line x1="3" y1="18" x2="21" y2="18" />}
            </svg>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-card flex flex-col items-center justify-start pt-24 text-foreground overflow-y-auto"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div variants={mobileLinkVariants} className="text-center w-full">
              <button
                onClick={() => setIsMobileProgramsOpen(!isMobileProgramsOpen)}
                className="text-xl font-semibold py-3 flex items-center justify-center w-full gap-2"
              >
                Programs
                <motion.svg animate={{ rotate: isMobileProgramsOpen ? 180 : 0 }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></motion.svg>
              </button>
              <AnimatePresence>
                {isMobileProgramsOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden "
                  >
                    <div className="pt-2 pb-4 flex flex-col gap-1">
                      <div>
                        <h4 className="text-primary font-semibold mt-2 mb-1 px-4 text-center text-sm uppercase tracking-wider">Internship Programs</h4>
                        {internshipProgramCategories.flatMap(cat => cat.items).map(item => (
                          <Link
                            key={item.key}
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block py-2 px-6 text-base text-muted-foreground hover:text-primary hover:bg-accent text-center rounded-lg transition-colors"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>

                      <div className="mt-4">
                        <h4 className="text-primary font-semibold mt-2 mb-1 px-4 text-center text-sm uppercase tracking-wider">Job Guarantee Programs</h4>
                        {placementProgramCategories.flatMap(cat => cat.items).map(item => (
                          <Link
                            key={item.key}
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block py-2 px-6 text-base text-muted-foreground hover:text-primary hover:bg-accent text-center rounded-lg transition-colors"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {scrollLinks.map((link) => (
              <motion.button
                key={link.name}
                variants={mobileLinkVariants}
                onClick={() => handleMobileLinkClick(link.key)}
                className="text-xl font-semibold py-3 hover:text-primary transition-colors"
              >
                {link.name}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
