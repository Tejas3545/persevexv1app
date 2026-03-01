"use client";

import React from "react";
import { Facebook } from "lucide-react";
import Image from "next/image";
import { FiMail, FiMapPin, FiInstagram, FiLinkedin } from "react-icons/fi";
import { useLmsAccess } from "./LmsRegistrationModal";

type FooterLink = {
  text: string;
  href: string;
  icon?: React.ReactNode;
  isLms?: boolean;
};

type FooterColumn = {
  title: string;
  links: FooterLink[];
};

type SocialLink = {
  name: string;
  href: string;
  icon: React.ReactNode;
};

const exploreFooterLinkColumns: FooterColumn[] = [
  {
    title: "Quick Links",
    links: [
      { text: "LMS", href: "#", isLms: true },
      { text: "Blogs", href: "/blogs" },
    ],
  },
  {
    title: "Our Courses",
    links: [
      { text: "Management", href: "/explore-courses" },
      { text: "Technical", href: "/explore-courses" },
      { text: "Electronics", href: "/explore-courses" },
      { text: "Mechanical", href: "/explore-courses" },
      { text: "Civil", href: "/explore-courses" },
    ],
  },
  {
    title: "Get in Touch",
    links: [
      {
        text: "support@persevex.com",
        href: "mailto:support@persevex.com",
        icon: <FiMail />,
      },
      { text: "5a, 1A Cross Rd, Dollar Scheme Colony, 1st Stage, BTM 1st Stage, Bengaluru, Karnataka 560068", href: "#", icon: <FiMapPin /> },
    ],
  },
];

const socialLinks: SocialLink[] = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/persevex_llp/",
    icon: <FiInstagram size={20} />,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61574597387622#",
    icon: <Facebook size={20} />,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/persevex/posts/?feedView=all",
    icon: <FiLinkedin size={20} />,
  },
];

export default function ExploreFooterSection() {
  const { openLms } = useLmsAccess();

  return (
    <footer className="relative w-full text-foreground overflow-hidden py-8 md:py-16 mt-12 ">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <Image
                src="/persevex.png"
                alt="Persevex"
                width={56}
                height={56}
                className="h-14 w-auto object-contain"
              />
            </div>
            <p className="text-muted-foreground max-w-sm">
              Elevate your career with our cutting-edge courses.
            </p>
          </div>

          <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-8">
            {exploreFooterLinkColumns.map((column) => (
              <div key={column.title}>
                <h3 className="font-bold text-sm uppercase tracking-wider text-[#F9C47D] mb-5">
                  {column.title}
                </h3>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link.text}>
                      {link.isLms ? (
                        <button
                          onClick={openLms}
                          className="text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center gap-2 group break-all bg-transparent border-none p-0 font-inherit cursor-pointer text-left"
                        >
                          {link.icon && (
                            <span className="group-hover:text-[#F9C47D] transition-colors">
                              {link.icon}
                            </span>
                          )}
                          <span className="group-hover:translate-x-1 transition-transform duration-300 ease-out inline-block">
                            {link.text}
                          </span>
                        </button>
                      ) : (
                        <a
                          target={
                            link.href.startsWith("http") ? "_blank" : "_self"
                          }
                          rel="noopener noreferrer"
                          href={link.href}
                          className="text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center gap-2 group break-all"
                        >
                          {link.icon && (
                            <span className="group-hover:text-[#F9C47D] transition-colors">
                              {link.icon}
                            </span>
                          )}
                          <span className="group-hover:translate-x-1 transition-transform duration-300 ease-out inline-block">
                            {link.text}
                          </span>
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Persevex. All Rights Reserved.
          </p>
          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => (
              <a
                target="_blank"
                rel="noopener noreferrer"
                key={social.name}
                href={social.href}
                aria-label={social.name}
                className="text-muted-foreground hover:text-[#F9C47D] transition-colors duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
