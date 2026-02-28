"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FiInstagram, FiLinkedin, FiYoutube, FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { FaXTwitter, FaWhatsapp } from "react-icons/fa6";
import { useScroll, SectionKey } from "../contexts/scrollContext";
import { motion } from "framer-motion";

const quickLinks: { name: string; key: SectionKey }[] = [
  { name: "Courses", key: "courses" },
  { name: "Why Choose Us", key: "ourEdge" },
  { name: "About Us", key: "aboutUs" },
  { name: "FAQ", key: "faq" },
  { name: "Contact Us", key: "contactUs" },
];

const programLinks = [
  { name: "Full Stack Web Dev", href: "/courses/web-development" },
  { name: "Machine Learning", href: "/courses/machine-learning" },
  { name: "Data Science", href: "/courses/data-science" },
  { name: "Digital Marketing", href: "/courses/digital-marketing" },
  { name: "Cyber Security", href: "/courses/cybersecurity" },
  { name: "Cloud Computing", href: "/courses/cloud-computing" },
];

const companyLinks = [
  { name: "Campus Ambassador", href: "/campus-ambassador" },
  { name: "Support", href: "/support" },
  { name: "Internship", href: "/internship" },
  { name: "Blogs", href: "/blogs" },
  { name: "Fees", href: "/fees" },
];

const toolLinks = [
  { name: "Resume Builder", href: "https://resumate-create.vercel.app/", external: true },
  { name: "Project Hub", href: "https://projects-hub-platform.vercel.app/", external: true },
  { name: "LMS Portal", href: "/internship", external: false },
];

const socialLinks = [
  { name: "Instagram", icon: <FiInstagram size={18} />, href: "https://www.instagram.com/persevex/" },
  { name: "LinkedIn", icon: <FiLinkedin size={18} />, href: "https://www.linkedin.com/company/persevex/" },
  { name: "YouTube", icon: <FiYoutube size={18} />, href: "https://www.youtube.com/@persevex" },
  { name: "X", icon: <FaXTwitter size={18} />, href: "https://twitter.com/persevex" },
  { name: "WhatsApp", icon: <FaWhatsapp size={18} />, href: "https://wa.me/918660128339" },
];

const legalLinks = [
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms & Conditions", href: "/terms-&-conditions" },
  { name: "Return Policy", href: "/return-policy" },
  { name: "Refund Policy", href: "/refund-policy" },
  { name: "Data Deletion", href: "/data-deletion" },
];

export default function FooterSection() {
  const { scrollToSection } = useScroll();

  return (
    <footer className="bg-card text-foreground border-t border-border" id="footer">
      {/* Newsletter Banner */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Stay Updated with Persevex
              </h3>
              <p className="text-sm text-muted-foreground">
                Get the latest course updates, career tips, and industry insights.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-72 px-5 py-3 rounded-full bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
              <button className="px-8 py-3 bg-primary text-white rounded-full text-sm font-bold shadow-md hover:shadow-primary/20 hover:-translate-y-0.5 transition-all whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2 mb-4 lg:mb-0">
            <Link href="/" className="mb-4 inline-flex">
              <Image
                src="/persevex.png"
                alt="Persevex"
                width={48}
                height={48}
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-xs">
              Empowering the next generation with real-world skills, expert
              mentorship, and career-ready outcomes. Join 10000+ students
              building their future.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 mb-6">
              <a
                href="mailto:support@persevex.com"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <FiMail size={14} />
                support@persevex.com
              </a>
              <a
                href="tel:+918660128339"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <FiPhone size={14} />
                +91 86601 28339
              </a>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FiMapPin size={14} />
                Greater Noida, UP, India
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 flex-wrap">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary transition-colors text-muted-foreground hover:text-white"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-5 text-foreground">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.key)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-5 text-foreground">
              Programs
            </h4>
            <ul className="space-y-3">
              {programLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-5 text-foreground">
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-5 text-foreground">
              Tools
            </h4>
            <ul className="space-y-3">
              {toolLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* Recognition badges */}
            <div className="mt-8">
              <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-foreground">
                Recognized By
              </h4>
              <div className="flex flex-wrap gap-2">
                {["NSDC", "AICTE", "ISO", "MSME"].map((badge) => (
                  <span
                    key={badge}
                    className="text-xs font-medium px-3 py-1.5 rounded-full bg-secondary text-muted-foreground border border-border hover:bg-accent hover:text-foreground transition-colors cursor-default"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider + Copyright */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Persevex. All rights reserved. Empowering careers since 2025.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            {legalLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
