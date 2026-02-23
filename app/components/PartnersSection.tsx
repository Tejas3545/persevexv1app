"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// Hiring/placement partners
const hiringPartners = [
  { name: "Accenture", logo: "/Accenture.png" },
  { name: "Amazon", logo: "/amazon.png" },
  { name: "TCS", logo: "/tcs.png" },
  { name: "Infosys", logo: "/infosys.png" },
];

// Certification/recognition partners
const certPartners = [
  { name: "NSDC", logo: "/nsdc.png" },
  { name: "Skill India", logo: "/skill.png" },
  { name: "AICTE", logo: "/aicte.png" },
  { name: "ISO", logo: "/iso.png" },
  { name: "MSME", logo: "/msme.png" },
  { name: "Startup India", logo: "/startup.png" },
];

function LogoCarousel({ partners }: { partners: typeof hiringPartners }) {
  const doubled = [...partners, ...partners];
  return (
    <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-border shadow-sm py-6">
      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-24 bg-linear-to-r from-white dark:from-slate-900 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-linear-to-l from-white dark:from-slate-900 to-transparent z-10 pointer-events-none" />

      <div className="flex items-center animate-scroll-partners hover:paused">
        {doubled.map((partner, index) => (
          <div
            key={`${partner.name}-${index}`}
            className="shrink-0 w-36 sm:w-44 px-6 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
          >
            <div className="relative h-14 w-full flex items-center justify-center">
              <Image
                src={partner.logo}
                alt={partner.name}
                fill
                className="object-contain"
                sizes="144px"
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                }}
              />
              <span className="absolute text-lg font-bold text-gray-700 dark:text-gray-300 opacity-0">{partner.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PartnersSection() {
  return (
    <section className="section-padding bg-slate-50 dark:bg-card" id="partners">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="inline-block text-primary text-sm font-bold uppercase tracking-widest mb-3 bg-primary/10 px-4 py-1.5 rounded-full"
          >
            Our Network
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.1 }}
            className="section-title text-foreground mb-4"
          >
            Backed by <span className="text-primary">Industry Leaders</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.2 }}
            className="section-subtitle mx-auto"
          >
            Our students get placed at top companies and our programs are
            recognized by leading industry bodies.
          </motion.p>
        </div>

        {/* Hiring Partners */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider pl-4">
              Hiring Partners
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>
          <LogoCarousel partners={hiringPartners} />
        </motion.div>

        {/* Certification Partners */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-3 mb-4 mt-12">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider pl-4">
              Certification Partners
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>
          <LogoCarousel partners={certPartners} />
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
        >
          {[
            { number: "50+", label: "Hiring Partners" },
            { number: "6+", label: "Certifications" },
            { number: "5000+", label: "Students Placed" },
            { number: "95%", label: "Placement Rate" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="bg-white dark:bg-slate-900 shadow-sm rounded-3xl border border-border p-6 text-center hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="text-3xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
