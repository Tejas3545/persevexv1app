"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const techLogos = [
  { name: "Amazon", logo: "/amazon.png" },
  { name: "Dell", logo: "/Dell.png" },
  { name: "Deloitte", logo: "/Deloitte.png" },
  { name: "EY", logo: "/ey.png" },
  { name: "Harman", logo: "/harman.png" },
  { name: "Infosys", logo: "/infosys.png" },
  { name: "KPMG", logo: "/kpmg.png" },
  { name: "PwC", logo: "/PwC.png" },
  { name: "TCS", logo: "/TCS.png" },
  { name: "Walmart", logo: "/wal.png" },
  { name: "Wipro", logo: "/wip.png" },
];

export default function LmsSection() {
  return (
    <section className="py-24 bg-white dark:bg-[#0a0a0a] border-t border-border/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6 tracking-tight uppercase">
            ENTERPRISE-GRADE.<br />
            <span className="text-primary">SECURE & RELIABLE.</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Built for security, stability, and uninterrupted learning.
          </p>
        </motion.div>

        {/* Marquee Container */}
        <div className="relative flex overflow-x-hidden group">
          {/* Gradient Masks */}
          <div className="absolute top-0 bottom-0 left-0 w-32 z-10 bg-gradient-to-r from-white dark:from-[#0a0a0a] to-transparent pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-32 z-10 bg-gradient-to-l from-white dark:from-[#0a0a0a] to-transparent pointer-events-none" />

          {/* Scrolling Content */}
          <div className="flex animate-marquee whitespace-nowrap py-8 items-center">
            {[...techLogos, ...techLogos, ...techLogos].map((tech, index) => (
              <div
                key={`${tech.name}-${index}`}
                className="mx-8 md:mx-12 flex items-center justify-center opacity-85 hover:opacity-100 transition-opacity duration-300"
              >
                <div className="relative h-12 w-32 md:h-16 md:w-40">
                  <Image
                    src={tech.logo}
                    alt={tech.name}
                    fill
                    sizes="(max-width: 768px) 128px, 160px"
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
