"use client";

import React from "react";
import { motion } from "framer-motion";

const companies = [
  {
    name: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  },
  {
    name: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  },
  {
    name: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
  },
  {
    name: "Meta",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
  },
  {
    name: "IBM",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
  },
  {
    name: "Infosys",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg",
  },
  {
    name: "Deloitte",
    logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 260 56'%3E%3Ccircle cx='16' cy='38' r='14' fill='%2386BC25'/%3E%3Ctext x='36' y='50' font-family='Arial,Helvetica,sans-serif' font-size='36' fill='%2300A3E0' font-weight='300'%3Edeloitte%3C/text%3E%3C/svg%3E",
    noInvert: true,
  },
  {
    name: "TCS",
    logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 56'%3E%3Ctext x='6' y='48' font-family='Arial,Helvetica,sans-serif' font-size='44' fill='%23003087' font-weight='700'%3ETCS%3C/text%3E%3C/svg%3E",
    noInvert: true,
  },
  {
    name: "Wipro",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg",
  },
];

const stats = [
  { value: "50+", label: "Expert Mentors" },
  { value: "10+", label: "Domains" },
  { value: "4.8★", label: "Avg Mentor Rating" },
];

// Triple for seamless infinite loop
const marqueeItems = [...companies, ...companies, ...companies];

export default function LearnFromExpertSection() {
  return (
    <section className="py-14 bg-slate-50 dark:bg-slate-950 border-t border-border/40">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
            Expert Profile
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4 leading-tight">
            Learn from professionals at<br />
            <span className="text-primary">world-class companies</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base leading-relaxed">
            Our mentors are real engineers, analysts, and managers actively working at top firms —
            not educators who only teach, but practitioners who also do.
          </p>
        </motion.div>
      </div>

      {/* Full-width logo marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden mb-14"
      >
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-28 z-10 bg-gradient-to-r from-slate-50 to-transparent dark:from-slate-950" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-28 z-10 bg-gradient-to-l from-slate-50 to-transparent dark:from-slate-950" />

        <div className="flex animate-marquee-slow w-max">
          {marqueeItems.map((c, i) => (
            <div
              key={`${c.name}-${i}`}
              className="mx-4 flex items-center justify-center bg-white dark:bg-slate-900 border border-border rounded-2xl shadow-sm shrink-0 w-44 h-20 px-7"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.logo}
                alt={c.name}
                className={`max-h-9 w-full object-contain ${
                  c.noInvert ? "" : "dark:brightness-0 dark:invert"
                }`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Stats row */}
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-12"
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-4xl font-black text-primary">{s.value}</p>
              <p className="text-sm text-muted-foreground font-medium mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
