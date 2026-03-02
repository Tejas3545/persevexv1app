"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FiInstagram, FiLinkedin, FiYoutube, FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { FaXTwitter, FaWhatsapp } from "react-icons/fa6";
import { useScroll, SectionKey } from "../contexts/scrollContext";
import { motion } from "framer-motion";
import { allDomains } from "../constants/courseConstant";
import { useLmsAccess } from "./LmsRegistrationModal";
import NewsletterSubscription from "./NewsletterSubscription";

const companyLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Courses", href: "/explore-courses" },
  { name: "Reviews", href: "/reviews" },
  { name: "Contact Us", href: "/contact" },
  { name: "Campus Ambassador", href: "/campus-ambassador" },
];

const supportLinks = [
  { name: "Open Support Ticket", href: "/support" },
  { name: "Persevex LMS", href: "#", isLms: true }, 
];

const legalLinks = [
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms & Conditions", href: "/terms-&-conditions" },
  { name: "Refund Policy", href: "/refund-policy" }, 
  { name: "Return Policy", href: "/return-policy" },
];

const socialLinks = [
  { name: "Instagram", icon: <FiInstagram size={20} />, href: "https://www.instagram.com/persevex/" },
  { name: "LinkedIn", icon: <FiLinkedin size={20} />, href: "https://www.linkedin.com/company/persevex/" },
  { name: "WhatsApp", icon: <FaWhatsapp size={20} />, href: "https://wa.me/918660128339" },
  { name: "YouTube", icon: <FiYoutube size={20} />, href: "https://www.youtube.com/@persevex" },
  { name: "X", icon: <FaXTwitter size={20} />, href: "https://twitter.com/persevex" },
];

export default function FooterSection() {
  const { scrollToSection } = useScroll();
  const router = useRouter();
  const { openLms } = useLmsAccess();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isLms?: boolean) => {
    if (isLms) {
      e.preventDefault();
      openLms();
      return;
    }
    
    if (href.startsWith("/#")) {
      e.preventDefault();
      const sectionId = href.replace("/#", "");
      if (typeof window !== "undefined") {
        if (window.location.pathname !== "/") {
          router.push("/");
          setTimeout(() => {
            scrollToSection(sectionId as SectionKey);
          }, 500);
        } else {
          scrollToSection(sectionId as SectionKey);
        }
      }
    }
  };

  return (
    <footer className="bg-card text-foreground border-t border-border pt-16 pb-8 md:pb-8 pb-32" id="footer">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Top 5 Columns - Aptisure Style with Newsletter */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* COMPANY */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-6 text-foreground">
              COMPANY
            </h4>
            <ul className="space-y-4">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  {link.href.startsWith("/#") ? (
                    <Link
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer block py-2 md:py-0"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <NewsletterSubscription />
          </div>

          {/* SUPPORT */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-6 text-foreground">
              SUPPORT
            </h4>
            <ul className="space-y-4">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  {(link as any).isLms ? (
                    <button
                      onClick={() => openLms()}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer bg-transparent border-none p-0 font-inherit text-left block py-2 md:py-0"
                    >
                      {link.name}
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors block py-2 md:py-0"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* LEGAL */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-6 text-foreground">
              LEGAL
            </h4>
            <ul className="space-y-4">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-6 text-foreground">
              CONTACT
            </h4>
            <div className="space-y-6">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground/70 font-semibold mb-1">Call</p>
                <a
                  href="tel:+918660128339"
                  className="text-sm block text-muted-foreground hover:text-primary transition-colors font-medium"
                >
                  +91 8660 128339
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground/70 font-semibold mb-1">Email</p>
                <a
                  href="mailto:support@persevex.com"
                  className="text-sm block text-muted-foreground hover:text-primary transition-colors font-medium"
                >
                  support@persevex.com
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground/70 font-semibold mb-1">Address</p>
                <p className="text-sm text-muted-foreground font-medium">
                  5a, 1A Cross Rd, Dollar Scheme Colony,<br/>
                  1st Stage, BTM 1st Stage,<br/>
                  Bengaluru, Karnataka 560068, India
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border mb-12"></div>

        {/* PROGRAMS SECTION - Aptisure Style */}
        <div className="mb-16 relative z-10">
          <h3 className="text-2xl font-bold text-foreground mb-2">
            PROGRAMS
          </h3>
          <p className="text-sm text-muted-foreground mb-10">
            Explore every track, grouped by domain.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
            {allDomains.map((domain) => (
              <div key={domain.view}>
                <h4 className="text-sm font-bold mb-6 text-foreground flex items-center gap-2">
                  {domain.name} <span className="text-muted-foreground font-normal">({domain.courses.length})</span>
                </h4>
                <ul className="space-y-4">
                  {domain.courses.map((course) => (
                    <li key={course.slug}>
                      <Link
                        href={`/courses/${course.slug}`}
                        onClick={(e) => {
                          // Force scroll to top on navigation
                          setTimeout(() => {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }, 100);
                        }}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors block py-2 md:py-0"
                      >
                        {course.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider + Bottom Area with Social Links */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-muted-foreground font-medium">
            Copyright © {new Date().getFullYear()} Persevex. All Rights Reserved.
          </p>
          
          {/* Social Links */}
          <div className="flex gap-4 flex-wrap items-center">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-muted-foreground font-medium">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy</Link>
            <span className="hidden md:inline text-border">/</span>
            <Link href="/terms-&-conditions" className="hover:text-primary transition-colors">Terms</Link>
            <span className="hidden md:inline text-border">/</span>
            <Link href="/support" className="hover:text-primary transition-colors">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}