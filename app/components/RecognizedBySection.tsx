"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiShield, FiAward } from "react-icons/fi";

const recognitions = [
  {
    name: "NSDC",
    logo: "/nsdc.png",
    description: "National Skill Development Corporation",
    type: "Government",
  },
  {
    name: "Skill India",
    logo: "/skill.png",
    description: "Ministry of Skill Development",
    type: "Government",
  },
  {
    name: "AICTE",
    logo: "/aicte.png",
    description: "All India Council for Technical Education",
    type: "Regulatory",
  },
  {
    name: "ISO 9001:2015",
    logo: "/iso.png",
    description: "International Quality Standard",
    type: "International",
  },
  {
    name: "MSME",
    logo: "/msme.png",
    description: "Ministry of MSME, Govt. of India",
    type: "Government",
  },
  {
    name: "Startup India",
    logo: "/startup.png",
    description: "DPIIT Recognized Startup",
    type: "Government",
  },
];

const typeColors: Record<string, string> = {
  Government: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  Regulatory: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  International: "bg-green-500/10 text-green-600 dark:text-green-400",
};

export default function RecognizedBySection() {
  return (
    <section className="section-padding bg-card" id="recognized-by">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-3"
          >
            Recognition & Accreditation
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.1 }}
            className="section-title text-foreground mb-4"
          >
            Recognized & <span className="gradient-text-blue">Certified</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.2 }}
            className="section-subtitle mx-auto"
          >
            Our programs are backed by government bodies and international
            standards, ensuring your certificate carries real weight.
          </motion.p>
        </div>

        {/* Trust Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-6 mb-12 p-6 bg-gradient-to-r from-primary/5 via-accent to-primary/5 rounded-2xl border border-border"
        >
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <FiShield size={18} className="text-primary" />
            Government Recognized
          </div>
          <div className="w-px h-5 bg-border hidden sm:block" />
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <FiAward size={18} className="text-primary" />
            ISO 9001:2015 Certified
          </div>
          <div className="w-px h-5 bg-border hidden sm:block" />
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <FiShield size={18} className="text-primary" />
            NSDC & AICTE Approved
          </div>
          <div className="w-px h-5 bg-border hidden sm:block" />
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <FiAward size={18} className="text-primary" />
            Startup India Recognized
          </div>
        </motion.div>

        {/* Logos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 max-w-5xl mx-auto">
          {recognitions.map((rec, index) => (
            <motion.div
              key={rec.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="flex flex-col items-center gap-3 p-5 rounded-2xl border border-border bg-white hover:border-primary/30 hover:shadow-md transition-all duration-300 group cursor-default"
            >
              <div className="w-16 h-16 relative grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 transition-all duration-300">
                <Image
                  src={rec.logo}
                  alt={rec.name}
                  fill
                  className="object-contain"
                  sizes="64px"
                />
              </div>
              <div className="text-center">
                <span className="text-xs font-bold text-gray-700 block mb-1">
                  {rec.name}
                </span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${typeColors[rec.type]}`}
                >
                  {rec.type}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
