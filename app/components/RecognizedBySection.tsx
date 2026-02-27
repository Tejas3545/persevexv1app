"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiExternalLink, FiCheckCircle, FiX } from "react-icons/fi";

const recognitions = [
  {
    name: "DPIIT Recognized Startup",
    badge: "Startup India",
    pdfSrc: "/DPIIT Recognized Startup.pdf",
    description: "Department for Promotion of Industry & Internal Trade",
  },
  {
    name: "ISO 9001:2015 Certified",
    badge: "ISO Certified",
    pdfSrc: "/ISO 9001 2015 Certified.pdf",
    description: "Quality Management System — UKAFC Accredited",
  },
];

const partnerBadges = [
  { name: "Skill India", image: "/skill.png" },
  { name: "MSME", image: "/msme.png" },
  { name: "AICTE", image: "/aicte.png" },
];

export default function RecognizedBySection() {
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

              {/* PDF embedded as certificate preview */}
              <div className="pt-12 px-5 pb-0">
                <div className="relative w-full rounded-xl overflow-hidden border border-gray-200 dark:border-border bg-white cert-preview-container">
                  <iframe
                    src={`${rec.pdfSrc}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                    className="cert-preview-iframe"
                    title={rec.name}
                  />
                  {/* Invisible overlay to block iframe interaction, click opens modal */}
                  <div
                    className="absolute inset-0 cursor-pointer"
                    onClick={() => setModalPdf(rec.pdfSrc)}
                  />
                </div>
              </div>

              {/* Card footer */}
              <div className="px-5 py-5">
                <button
                  onClick={() => setModalPdf(rec.pdfSrc)}
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors mb-2"
                >
                  <FiExternalLink className="w-3.5 h-3.5" />
                  Click to view
                </button>
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
                  sizes="112px"
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Full-screen PDF Modal */}
      {modalPdf && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          onClick={() => setModalPdf(null)}
        >
          <div
            className="relative w-full max-w-3xl bg-white rounded-2xl overflow-hidden shadow-2xl cert-modal-wrapper"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200">
              <span className="text-sm font-semibold text-gray-700">
                {recognitions.find((r) => r.pdfSrc === modalPdf)?.name}
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={modalPdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-primary hover:underline flex items-center gap-1"
                >
                  <FiExternalLink className="w-3.5 h-3.5" />
                  Open in new tab
                </a>
                <button
                  onClick={() => setModalPdf(null)}
                  title="Close certificate viewer"
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <FiX className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
            <iframe
              src={`${modalPdf}#toolbar=1&navpanes=0`}
              className="w-full cert-modal-iframe"
              title="Certificate viewer"
            />
          </div>
        </div>
      )}
    </section>
  );
}