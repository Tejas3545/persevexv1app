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
          className="flex flex-col items-center justify-center gap-4 mb-12 p-8 bg-gradient-to-r from-primary/5 via-accent to-primary/5 rounded-2xl border border-border text-center"
        >
          <div className="flex items-center gap-3 text-lg md:text-xl font-bold text-foreground">
            <FiShield size={24} className="text-primary" />
            We are an GOVERNMENT AUTHORISED PLATFORM
          </div>
          <p className="text-muted-foreground max-w-3xl leading-relaxed">
            If anyone needs any type of clarification kindly go through this Government website and search with <span className="font-bold text-foreground">DIPP206131</span> this number, your doubts will be clarified or you can ask me for further guidance.
            <br /><br />
            Go to the LINK Scroll down and select Certificate OF Recognition and then type the NUMBER GIVEN. Thank you.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
            <a 
              href="https://www.startupindia.gov.in/content/sih/en/startupgov/validate-startup-recognition.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-[#0a0a0a] border border-border text-foreground rounded-full font-semibold hover:bg-muted transition-colors"
            >
              <FiShield size={18} />
              Validate on Startup India
            </a>
            <a 
              href="/DOC-20250722-WA0013.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors"
            >
              <FiAward size={18} />
              View Authorization Certificate
            </a>
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
              className="flex flex-col items-center gap-3 p-5 rounded-2xl border border-border bg-white dark:bg-[#0a0a0a] hover:border-primary/30 hover:shadow-md transition-all duration-300 group cursor-default"
            >
              <div className="w-16 h-16 relative transition-all duration-300">
                <Image
                  src={rec.logo}
                  alt={rec.name}
                  fill
                  className="object-contain"
                  sizes="64px"
                />
              </div>
              <div className="text-center">
                <span className="text-xs font-bold text-gray-500 dark:text-gray-400 group-hover:text-primary transition-colors duration-300 block mb-1">
                  {rec.name}
                </span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-medium transition-all duration-300 ${typeColors[rec.type]}`}
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
