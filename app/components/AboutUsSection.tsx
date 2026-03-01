"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FiTarget, FiHeart, FiStar, FiArrowRight } from "react-icons/fi";
import Link from "next/link";

const cardData = [
  {
    title: "Who We Are",
    imageSrc: "/whoweare.png",
    icon: <FiHeart size={20} />,
    content:
      "At Persevex, we are a collective of educators, innovators and visionaries who believe that learning should be an open journey filled with curiosity and growth. Education for us is not a rigid system but a living experience that adapts to the pace and potential of every learner. With perseverance and passion as our foundation, we are building a platform where knowledge is absorbed deeply, where learners grow into creators, leaders and changemakers who can shape the future.",
    color: "from-blue-500/20 to-purple-500/20",
  },
  {
    title: "Our Story",
    imageSrc: "/ourstory.png",
    icon: <FiStar size={20} />,
    content:
      "The mission of Persevex is to redefine the way education empowers people. We believe that perseverance, when guided by the right tools, can unlock limitless possibilities. Through innovation, meaningful experiences and a focus on real-world application, we are committed to making education accessible to everyone everywhere. Our purpose is not only to teach but to inspire resilience, nurture potential and create a generation of learners who are ready to succeed and ready to lead with knowledge and confidence.",
    color: "from-green-500/20 to-teal-500/20",
  },
  {
    title: "Our Mission",
    imageSrc: "/ourmission.png",
    icon: <FiTarget size={20} />,
    content:
      "The mission of Persevex is to redefine the way education empowers people. We believe that perseverance, when guided by the right tools, can unlock limitless possibilities. Through innovation, meaningful experiences and a focus on real-world application, we are committed to making education accessible to everyone everywhere. Our purpose is not only to teach but to inspire resilience, nurture potential and create a generation of learners who are ready to succeed and ready to lead with knowledge and confidence.",
    color: "from-orange-500/20 to-red-500/20",
  },
];

import { GraduationCap, Briefcase, Trophy, Star } from "lucide-react";

const stats = [
  { number: "10000+", label: "Students Trained", icon: <GraduationCap className="w-6 h-6" /> },
  { number: "100+", label: "Projects Completed", icon: <Briefcase className="w-6 h-6" /> },
  { number: "30+", label: "Programs Offered", icon: <Trophy className="w-6 h-6" /> },
  { number: "10+", label: "Domains Covered", icon: <Star className="w-6 h-6" /> },
];

const milestones = [
  { year: "2025", event: "Persevex Founded", description: "Started with a vision to democratize quality education" },
  { year: "2025", event: "First 500 Students", description: "Reached our first milestone of 500 enrolled students" },
  { year: "2025", event: "NSDC Recognition", description: "Received official recognition from NSDC and AICTE" },
  { year: "2026", event: "10000+ Students", description: "Crossed 10000 students across 20+ courses" },
  { year: "2026", event: "Expanding Domains", description: "Launched new domains including Drone Mechanics and HEVs" },
];

export default function AboutUsSection() {
  return (
    <section className="section-padding bg-slate-50 dark:bg-card" id="aboutUs">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-3"
          >
            About Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.1 }}
            className="section-title text-foreground mb-4"
          >
            Our Story & <span className="gradient-text-blue">Mission</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.2 }}
            className="section-subtitle mx-auto"
          >
            Discover the principles that drive us and the future we&apos;re
            building together — one student at a time.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {cardData.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: index * 0.15 }}
              className="group bg-card rounded-2xl border border-border overflow-hidden card-hover p-8"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  {card.title}
                </h3>
              </div>

              {/* Content */}
              <p className="text-muted-foreground leading-relaxed text-sm">
                {card.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-2xl border border-border p-6 text-center card-hover"
            >
              <div className="text-3xl mb-2 flex justify-center text-primary">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-bold gradient-text-blue mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card rounded-2xl border border-border p-8"
        >
          <h3 className="text-xl font-bold text-foreground mb-8 text-center">
            Our <span className="gradient-text-blue">Journey</span>
          </h3>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={`${milestone.year}-${milestone.event}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex items-start gap-6 md:gap-0 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary border-2 border-card -translate-x-1 md:-translate-x-1.5 mt-1.5 z-10" />

                  {/* Content */}
                  <div
                    className={`ml-12 md:ml-0 md:w-[45%] ${index % 2 === 0 ? "md:pr-10 md:text-right" : "md:pl-10 md:ml-[55%]"
                      }`}
                  >
                    <span className="text-xs font-bold text-primary bg-accent px-2 py-0.5 rounded-full">
                      {milestone.year}
                    </span>
                    <h4 className="text-sm font-bold text-foreground mt-2 mb-1">
                      {milestone.event}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {milestone.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link href="/explore-courses" className="btn-primary inline-flex items-center gap-2">
            Start Your Journey
            <FiArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
