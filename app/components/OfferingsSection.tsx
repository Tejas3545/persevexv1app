"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiFileText, FiLayers, FiArrowRight, FiX, FiMaximize2 } from "react-icons/fi";

interface OfferingCard {
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    url: string;
    gradient: string;
}

const offerings: OfferingCard[] = [
    {
        title: "Resume Builder",
        description:
            "Build an ATS-friendly resume that gets you noticed. Our AI-powered builder creates professional, industry-standard resumes tailored to your skills and experience.",
        icon: <FiFileText size={28} />,
        color: "text-primary",
        url: "https://resumate-create.vercel.app/",
        gradient: "from-primary to-primary",
    },
    {
        title: "Project Hub",
        description:
            "Explore real-world projects, collaborate with peers, and build a portfolio that showcases your expertise. Discover curated projects across multiple domains.",
        icon: <FiLayers size={28} />,
        color: "text-highlight",
        url: "https://projects-hub-platform.vercel.app/",
        gradient: "from-secondary to-primary",
    },
];

export default function OfferingsSection() {
    const [activeIframe, setActiveIframe] = useState<string | null>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);

    return (
        <section className="section-padding bg-slate-50 dark:bg-card" id="offerings">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-14">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        className="inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-3"
                    >
                        Our Offerings
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: 0.1 }}
                        className="section-title text-foreground mb-4"
                    >
                        Tools to Boost <span className="text-primary">Your Career</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: 0.2 }}
                        className="section-subtitle mx-auto"
                    >
                        Access powerful tools designed to make you job-ready and stand out in competitive markets.
                    </motion.p>
                </div>

                {/* Cards Grid */}
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {offerings.map((offering, index) => (
                        <motion.div
                            key={offering.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: index * 0.15 }}
                            className="group relative bg-white dark:bg-slate-900 rounded-3xl border border-border p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                        >
                            {/* Icon */}
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                {offering.icon}
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-bold text-foreground mb-3">
                                {offering.title}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed mb-8 text-sm">
                                {offering.description}
                            </p>

                            {/* Action Button */}
                            <button
                                onClick={() => setActiveIframe(offering.url)}
                                className="inline-flex items-center gap-2 text-sm font-bold text-primary group-hover:gap-3 transition-all duration-300 cursor-pointer"
                            >
                                Open {offering.title}
                                <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Iframe Modal */}
            {activeIframe && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-100 bg-foreground/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            setActiveIframe(null);
                            setIsFullscreen(false);
                        }
                    }}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className={`relative bg-card rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${isFullscreen
                            ? "w-full h-full rounded-none"
                            : "w-full max-w-6xl h-[85vh]"
                            }`}
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-5 py-3 bg-background border-b border-border">
                            <div className="flex items-center gap-3">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-destructive" />
                                    <div className="w-3 h-3 rounded-full bg-highlight" />
                                    <div className="w-3 h-3 rounded-full bg-primary" />
                                </div>
                                <span className="text-xs text-muted-foreground font-mono truncate max-w-[200px] md:max-w-none">
                                    {activeIframe}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setIsFullscreen(!isFullscreen)}
                                    className="p-1.5 hover:bg-accent rounded-lg transition-colors text-muted-foreground"
                                    aria-label="Toggle fullscreen"
                                >
                                    <FiMaximize2 size={16} />
                                </button>
                                <button
                                    onClick={() => {
                                        setActiveIframe(null);
                                        setIsFullscreen(false);
                                    }}
                                    className="p-1.5 hover:bg-accent rounded-lg transition-colors text-muted-foreground"
                                    aria-label="Close"
                                >
                                    <FiX size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Iframe */}
                        <iframe
                            src={activeIframe}
                            className="w-full h-[calc(100%-48px)] border-0"
                            title="Embedded Tool"
                            loading="lazy"
                            allow="clipboard-write"
                            sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-downloads"
                        />
                    </motion.div>
                </motion.div>
            )}
        </section>
    );
}
