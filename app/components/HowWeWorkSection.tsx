"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiUserPlus, FiTarget, FiBookOpen, FiCreditCard, FiPlay } from "react-icons/fi";

const steps = [
    {
        step: "01",
        title: "Register with Us",
        description: "Create your Persevex account in minutes and join our learning community.",
        icon: <FiUserPlus size={24} />,
    },
    {
        step: "02",
        title: "Share Your Goals",
        description: "Tell us your skills, interests, and dream role so we can personalize your journey.",
        icon: <FiTarget size={24} />,
    },
    {
        step: "03",
        title: "Choose Your Program",
        description: "Pick the internship or job guarantee program that aligns with your future career.",
        icon: <FiBookOpen size={24} />,
    },
    {
        step: "04",
        title: "Secure Your Spot",
        description: "Quick enrollment with flexible options. Unlock content instantly with secure checkout.",
        icon: <FiCreditCard size={24} />,
    },
    {
        step: "05",
        title: "Start Learning",
        description: "Dive into live sessions, complete real-world projects, and build your career portfolio.",
        icon: <FiPlay size={24} />,
    },
];

export default function HowWeWorkSection() {
    return (
        <section className="section-padding bg-card" id="how-we-work">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        className="inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-3"
                    >
                        How We Work
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: 0.1 }}
                        className="section-title text-foreground mb-4"
                    >
                        Your Journey to <span className="gradient-text-blue">Success</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: 0.2 }}
                        className="section-subtitle mx-auto"
                    >
                        A simple 5-step process to transform your career. From signup to landing your dream job.
                    </motion.p>
                </div>

                {/* Steps */}
                <div className="relative">
                    {/* Connector line (desktop) */}
                    <div className="hidden lg:block absolute top-14 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-primary via-primary to-primary" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.step}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-30px" }}
                                transition={{ delay: index * 0.1 }}
                                className="relative flex flex-col items-center text-center group"
                            >
                                {/* Step circle */}
                                <div className="relative z-10 w-[72px] h-[72px] rounded-2xl bg-card border-2 border-border flex items-center justify-center text-primary mb-5 shadow-sm group-hover:border-primary group-hover:shadow-blue transition-all duration-300">
                                    {step.icon}
                                    {/* Step number badge */}
                                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center shadow-md">
                                        {step.step}
                                    </span>
                                </div>

                                <h3 className="text-base font-bold text-foreground mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed max-w-[220px]">
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
