"use client";

import React, { useState, memo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiExternalLink, FiCheckCircle, FiX, FiFileText } from "react-icons/fi";

const recognitions = [
  {
    name: "DPIIT Recognized Startup",
    badge: "Startup India",
    pdfSrc: "/DPIIT Recognized Startup.pdf",
    previewImage: "/startup.png",
    description: "Department for Promotion of Industry & Internal Trade",
  },
  {
    name: "ISO 9001:2015 Certified",
    badge: "ISO Certified",
    pdfSrc: "/ISO 9001 2015 Certified.pdf",
    previewImage: "/iso.png",
    description: "Quality Management System — UKAFC Accredited",
  },
];

const partnerBadges = [
  { name: "Skill India", image: "/skill.png" },
  { name: "MSME", image: "/msme.png" },
  { name: "AICTE", image: "/aicte.png" },
];

function RecognizedBySection() {
  const [modalPdf, setModalPdf] = useState<string | null>(null);

  return (
    <section className="py-14 bg-slate-50 dark:bg-background" id="recognized-by">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-4">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-primary text-sm font-bold tracking-widest mb-3 border border-primary/30 bg-white dark:bg-card px-4 py-2 rounded-full"
          >
            <FiCheckCircle className="w-4 h-4" />
            Recognized &amp; Certified
          </motion.span>
        </div>

        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
          >
            Our <span className="text-primary">Recognitions</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Persevex is a DPIIT-recognized startup and ISO 9001:2015 certified company, ensuring quality-driven education technology services.
          </motion.p>
        </div>

        {/* Recognition Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {recognitions.map((rec, index) => (
            <motion.div
              key={rec.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative bg-white dark:bg-card rounded-2xl overflow-hidden border border-border shadow-sm"
            >
              {/* Badge strip at top */}
              <div className="absolute top-0 left-0 right-0 flex items-center z-10">
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-primary px-4 py-2 rounded-br-xl">
                  <FiCheckCircle className="w-4 h-4" />
                  {rec.badge}
                </span>
                <div className="flex-1 h-[3px] bg-gradient-to-r from-primary via-amber-400 to-transparent" />
              </div>

              {/* Certificate preview - using image for cross-browser/mobile compatibility */}
              <div className="pt-12 px-5 pb-0">
                <div
                  className="relative w-full h-[320px] rounded-xl overflow-hidden border border-gray-200 dark:border-border bg-white flex flex-col items-center justify-center cursor-pointer"
                  onClick={() => setModalPdf(rec.pdfSrc)}
                >
                  {/* Badge/logo image preview */}
                  <div className="relative w-32 h-32 mb-4">
                    <Image
                      src={rec.previewImage}
                      alt={rec.name}
                      fill
                      loading="lazy"
                      sizes="128px"
                      className="object-contain"
                    />
                  </div>
                  {/* PDF file indicator */}
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <FiFileText className="w-5 h-5" />
                    <span className="text-sm font-medium">{rec.name}</span>
                  </div>
                  <span className="mt-2 text-xs text-primary font-semibold">Click to view certificate</span>
                </div>
              </div>

              {/* Card footer */}
              <div className="px-5 py-5">
                <a
                  href={rec.pdfSrc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors mb-2"
                >
                  <FiExternalLink className="w-3.5 h-3.5" />
                  Click to view
                </a>
                <h3 className="text-xl font-bold text-foreground mb-1">{rec.name}</h3>
                <p className="text-sm text-muted-foreground">{rec.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Also Partnered With */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-[0.2em] mb-8">
            ALSO PARTNERED WITH
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16">
            {partnerBadges.map((badge) => (
              <div key={badge.name} className="relative w-28 h-20">
                <Image
                  src={badge.image}
                  alt={badge.name}
                  fill
                  loading="lazy"
                  sizes="112px"
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Full-screen PDF Modal - using Google Docs viewer for universal compatibility */}
      {modalPdf && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-start md:items-center justify-center p-2 md:p-4 overflow-y-auto"
          onClick={() => setModalPdf(null)}
        >
          <div
            className="relative w-full max-w-3xl bg-white rounded-2xl overflow-hidden shadow-2xl cert-modal-wrapper my-2 md:my-0 max-h-[95vh] md:max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-3 md:px-5 py-2.5 md:py-3 border-b border-gray-200 shrink-0">
              <span className="text-xs md:text-sm font-semibold text-gray-700 truncate">
                {recognitions.find((r) => r.pdfSrc === modalPdf)?.name}
              </span>
              <div className="flex items-center gap-2 md:gap-3 shrink-0">
                <a
                  href={modalPdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-primary hover:underline flex items-center gap-1 whitespace-nowrap"
                >
                  <FiExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Open PDF</span>
                </a>
                <button
                  onClick={() => setModalPdf(null)}
                  title="Close certificate viewer"
                  className="w-9 h-9 md:w-8 md:h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors touch-manipulation"
                >
                  <FiX className="w-5 h-5 md:w-4 md:h-4 text-gray-600" />
                </button>
              </div>
            </div>
            <iframe
              src={`https://docs.google.com/gview?url=${typeof window !== "undefined" ? window.location.origin : ""}${modalPdf}&embedded=true`}
              className="w-full cert-modal-iframe flex-1"
              title="Certificate viewer"
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default memo(RecognizedBySection);