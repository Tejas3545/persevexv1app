"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";

const recognitions = [
  {
    name: "DPIIT Recognized Startup",
    image: "/startup.png",
    link: "https://www.startupindia.gov.in/content/sih/en/startupgov/validate-startup-recognition.html",
    description: "Recognized by the Department for Promotion of Industry and Internal Trade, Government of India.",
  },
  {
    name: "ISO 9001:2015 Certified",
    image: "/iso.png",
    link: "/DOC-20250722-WA0013.pdf",
    description: "Certified for Quality Management Systems, ensuring high standards in our services.",
  },
  {
    name: "MSME Registered",
    image: "/msme.png",
    link: "#",
    description: "Registered under the Ministry of Micro, Small and Medium Enterprises, Government of India.",
  },
  {
    name: "AICTE Approved",
    image: "/aicte.png",
    link: "#",
    description: "Approved by the All India Council for Technical Education.",
  },
];

export default function RecognizedBySection() {
  return (
    <section className="py-20 bg-white dark:bg-[#0a0a0a]" id="recognized-by">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
          >
            Our <span className="text-primary">Recognitions</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            We are recognized by the Government of India and ISO 9001:2015 certified.
          </motion.p>
        </div>

        {/* Recognition Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {recognitions.map((rec, index) => (
            <motion.div
              key={rec.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 dark:bg-[#111] rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 group flex flex-col"
            >
              <div className="relative h-48 w-full bg-white dark:bg-white/5 p-6 flex items-center justify-center border-b border-border">
                <div className="relative w-full h-full">
                  <Image
                    src={rec.image}
                    alt={rec.name}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-foreground mb-2">{rec.name}</h3>
                <p className="text-sm text-muted-foreground mb-6 flex-grow">{rec.description}</p>
                <a
                  href={rec.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground rounded-xl font-semibold transition-colors duration-300"
                >
                  Click to view
                  <FiExternalLink />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
