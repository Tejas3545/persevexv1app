"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiStar, FiPhone } from "react-icons/fi";

interface Review {
  name: string;
  role: string;
  domain: string;
  domainColor: string;
  quote: string;
  outcome: string;
  rating: number;
}

const reviews: Review[] = [
  {
    name: "Kiran Kumar",
    role: "Full Stack Developer",
    domain: "Web Dev",
    domainColor: "text-blue-600",
    quote: "The mentors pushed me to build production-ready projects. The guidance on architecture and deployment was exactly what real interviews test for.",
    outcome: "Real projects + deployment experience",
    rating: 5,
  },
  {
    name: "Anjali Sharma",
    role: "Data Science Intern",
    domain: "Data Science",
    domainColor: "text-purple-600",
    quote: "Hands-on exposure to real datasets and ML pipelines. I went from zero Python to building models I could actually explain in interviews.",
    outcome: "ML pipelines + interview confidence",
    rating: 5,
  },
  {
    name: "Rahul Verma",
    role: "AI Engineer",
    domain: "Artificial Intelligence",
    domainColor: "text-emerald-600",
    quote: "The AI projects weren't toy examples — they were real NLP and CV tasks. That's exactly what recruiters ask about in technical rounds.",
    outcome: "NLP + Computer Vision projects",
    rating: 5,
  },
  {
    name: "Priya Nair",
    role: "Digital Marketing Executive",
    domain: "Digital Marketing",
    domainColor: "text-pink-600",
    quote: "Covered SEO, paid ads, analytics, and strategy — all with live campaigns. The certificate and the skills both carry weight in interviews.",
    outcome: "Live campaigns + certified skills",
    rating: 5,
  },
  {
    name: "Aditya Raj",
    role: "Cloud Engineer",
    domain: "Cloud Computing",
    domainColor: "text-sky-600",
    quote: "AWS, Azure, Docker — all hands-on. The mentors didn't just teach the theory, they made me build and deploy. That experience is priceless.",
    outcome: "Cloud deployments + hands-on labs",
    rating: 5,
  },
  {
    name: "Sneha Patil",
    role: "HR Executive",
    domain: "Human Resources",
    domainColor: "text-orange-600",
    quote: "The HR internship gave me practical exposure to recruitment, payroll, and employee engagement that I couldn't have got from a textbook.",
    outcome: "Recruitment + HR operations experience",
    rating: 5,
  },
  {
    name: "Vikram Nair",
    role: "IoT Developer",
    domain: "IoT",
    domainColor: "text-teal-600",
    quote: "Built actual embedded IoT prototypes. The project depth and documentation standards they enforced made my resume stand out instantly.",
    outcome: "IoT prototypes + strong portfolio",
    rating: 5,
  },
  {
    name: "Meghna Iyer",
    role: "Finance Analyst",
    domain: "Finance",
    domainColor: "text-yellow-600",
    quote: "Financial modelling, stock analysis, and investment frameworks — all covered practically. My internship felt like a real analyst role.",
    outcome: "Financial modelling + analyst skills",
    rating: 5,
  },
  {
    name: "Rohan Desai",
    role: "Cybersecurity Intern",
    domain: "Cyber Security",
    domainColor: "text-red-600",
    quote: "Ethical hacking labs, vulnerability assessments, and real tools. Persevex made me job-ready in a domain that's incredibly hard to break into.",
    outcome: "Ethical hacking + security labs",
    rating: 5,
  },
];

const stats = [
  { value: "4.8/5", label: "Avg. feedback" },
  { value: "5000+", label: "Students trained" },
  { value: "30+", label: "Courses offered" },
  { value: "10+", label: "Career domains" },
];

const pills = ["Outcome-focused", "Certificate-backed", "Real projects"];

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <FiStar
          key={i}
          size={14}
          className={i < count ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.45 }}
      className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-5 flex flex-col gap-4 hover:shadow-md transition-shadow duration-300"
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="font-bold text-sm text-foreground">{review.name}</h4>
          <p className="text-xs text-muted-foreground mt-0.5">{review.role}</p>
        </div>
        <span className={`text-xs font-bold shrink-0 ${review.domainColor}`}>
          {review.domain}
        </span>
      </div>

      {/* Stars */}
      <StarRow count={review.rating} />

      {/* Quote box */}
      <div className="border border-border rounded-xl p-3.5 bg-slate-50 dark:bg-slate-800/60">
        <span className="text-primary font-black text-lg leading-none select-none">&ldquo;&rdquo;</span>
        <p className="text-sm text-foreground/80 leading-relaxed mt-1">{review.quote}</p>
      </div>

      {/* Outcome pill */}
      <div className="inline-flex items-center gap-1.5 self-start px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-semibold">
        <svg className="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        {review.outcome}
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  return (
    <section className="section-padding bg-white dark:bg-background" id="testimonials">
      <div className="max-w-7xl mx-auto">

        {/* ── Two-column hero row ── */}
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-12 items-start mb-16">

          {/* Left — heading & meta */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:sticky lg:top-24"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Reviews</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight mb-4">
              REVIEWS THAT SHOW<br />
              <span className="gradient-text-blue">REAL OUTCOMES.</span>
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-sm">
              Short, specific feedback with the kind of details hiring managers actually care about. Real interns, real projects, real results.
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {pills.map((p) => (
                <span key={p} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-xs font-medium text-foreground">
                  <svg className="w-3.5 h-3.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  {p}
                </span>
              ))}
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {stats.map((s) => (
                <div key={s.label} className="bg-slate-50 dark:bg-slate-900 rounded-xl border border-border px-4 py-3">
                  <p className="text-xl font-extrabold text-foreground">{s.value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3">
              <a
                href="/enroll"
                className="btn-aptisure inline-flex items-center gap-2 text-sm px-5 py-2.5"
              >
                <FiPhone size={15} />
                Enroll now
              </a>
              <a
                href="https://www.linkedin.com/company/persevex/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-sm font-semibold text-foreground hover:bg-muted transition-colors"
              >
                Read reviews →
              </a>
            </div>
          </motion.div>

          {/* Right — review cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reviews.map((review, i) => (
              <ReviewCard key={review.name} review={review} index={i} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
