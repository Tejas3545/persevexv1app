"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";
import { FiStar, FiPhone } from "react-icons/fi";

interface Review {
  name: string;
  role: string;
  company: string;
  domain: string;
  avatarColor: string;
  quote: string;
  rating: number;
}

const reviews: Review[] = [
  {
    name: "Kiran Kumar",
    role: "Full Stack Developer",
    company: "Infosys",
    domain: "Web Dev",
    avatarColor: "bg-blue-500",
    quote: "The mentors pushed me to build production-ready projects. The guidance on architecture and deployment was exactly what real interviews test for.",
    rating: 5,
  },
  {
    name: "Anjali Sharma",
    role: "Data Science Intern",
    company: "Wipro",
    domain: "Data Science",
    avatarColor: "bg-purple-500",
    quote: "Hands-on exposure to real datasets and ML pipelines. I went from zero Python to building models I could actually explain in interviews.",
    rating: 5,
  },
  {
    name: "Rahul Verma",
    role: "AI Engineer",
    company: "TCS",
    domain: "Artificial Intelligence",
    avatarColor: "bg-emerald-500",
    quote: "The AI projects weren't toy examples — they were real NLP and CV tasks. That's exactly what recruiters ask about in technical rounds.",
    rating: 5,
  },
  {
    name: "Priya Nair",
    role: "Digital Marketing Executive",
    company: "Amazon",
    domain: "Digital Marketing",
    avatarColor: "bg-pink-500",
    quote: "Covered SEO, paid ads, analytics, and strategy — all with live campaigns. The certificate and the skills both carry weight in interviews.",
    rating: 5,
  },
  {
    name: "Aditya Raj",
    role: "Cloud Engineer",
    company: "Google",
    domain: "Cloud Computing",
    avatarColor: "bg-sky-500",
    quote: "AWS, Azure, Docker — all hands-on. The mentors didn't just teach the theory, they made me build and deploy. That experience is priceless.",
    rating: 5,
  },
  {
    name: "Sneha Patil",
    role: "HR Executive",
    company: "Deloitte",
    domain: "Human Resources",
    avatarColor: "bg-orange-500",
    quote: "The HR internship gave me practical exposure to recruitment, payroll, and employee engagement that I couldn't have got from a textbook.",
    rating: 5,
  },
  {
    name: "Vikram Nair",
    role: "IoT Developer",
    company: "Microsoft",
    domain: "IoT",
    avatarColor: "bg-teal-500",
    quote: "Built actual embedded IoT prototypes. The project depth and documentation standards they enforced made my resume stand out instantly.",
    rating: 5,
  },
  {
    name: "Meghna Iyer",
    role: "Finance Analyst",
    company: "IBM",
    domain: "Finance",
    avatarColor: "bg-yellow-500",
    quote: "Financial modelling, stock analysis, and investment frameworks — all covered practically. My internship felt like a real analyst role.",
    rating: 5,
  },
  {
    name: "Rohan Desai",
    role: "Cybersecurity Analyst",
    company: "Meta",
    domain: "Cyber Security",
    avatarColor: "bg-red-500",
    quote: "Ethical hacking labs, vulnerability assessments, and real tools. Persevex made me job-ready in a domain that's incredibly hard to break into.",
    rating: 5,
  },
  {
    name: "Divya Menon",
    role: "ML Engineer",
    company: "Accenture",
    domain: "Machine Learning",
    avatarColor: "bg-indigo-500",
    quote: "From Python basics to deploying ML models in production — the curriculum was intense but worth every hour. Landed my first ML role in 4 months.",
    rating: 5,
  },
  {
    name: "Arjun Mehta",
    role: "Backend Developer",
    company: "Capgemini",
    domain: "Web Dev",
    avatarColor: "bg-cyan-500",
    quote: "Real API design, database optimization, and system design practice — Persevex covered it all. My interview skills improved dramatically.",
    rating: 5,
  },
  {
    name: "Pooja Singh",
    role: "Business Analyst",
    company: "HCL",
    domain: "Business Analytics",
    avatarColor: "bg-rose-500",
    quote: "The case studies were real, the mentors were sharp, and the feedback was brutally honest. That's exactly what you need to grow fast.",
    rating: 5,
  },
];

const stats = [
  { value: "4.8/5", label: "Avg. feedback" },
  { value: "10000+", label: "Students trained" },
  { value: "30+", label: "Courses offered" },
  { value: "10+", label: "Career domains" },
];

const pills = ["Outcome-focused", "Certificate-backed", "Real projects"];

// Split into two marquee rows
const row1 = reviews.slice(0, 6);
const row2 = reviews.slice(6);

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <FiStar
          key={i}
          size={13}
          className={i < count ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const initials = review.name.split(" ").map((n) => n[0]).join("").toUpperCase();
  return (
    <div className="w-72 shrink-0 bg-white dark:bg-slate-900 rounded-2xl border border-border p-5 flex flex-col gap-3 shadow-sm mx-2">
      {/* Avatar + name + company */}
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-black shrink-0 ${review.avatarColor}`}>
          {initials}
        </div>
        <div>
          <p className="text-sm font-bold text-foreground leading-tight">{review.name}</p>
          <p className="text-xs text-primary font-semibold">@{review.company}</p>
        </div>
      </div>

      {/* Stars + domain */}
      <div className="flex items-center justify-between">
        <StarRow count={review.rating} />
        <span className="text-[10px] font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
          {review.domain}
        </span>
      </div>

      {/* Quote */}
      <p className="text-xs text-foreground/75 leading-relaxed line-clamp-4">
        &ldquo;{review.quote}&rdquo;
      </p>
    </div>
  );
}

// Duplicate 3× for seamless infinite scroll
function MarqueeRow({ items, reverse = false }: { items: Review[]; reverse?: boolean }) {
  const tripled = [...items, ...items, ...items];
  return (
    <div className="overflow-hidden w-full">
      <div className={`flex w-max ${reverse ? "animate-marquee-reverse-slow" : "animate-marquee-slow"}`}>
        {tripled.map((r, i) => (
          <ReviewCard key={`${r.name}-${i}`} review={r} />
        ))}
      </div>
    </div>
  );
}

function Testimonials() {
  return (
    <section className="section-padding bg-white dark:bg-background" id="testimonials">
      <div className="max-w-7xl mx-auto">

        {/* ── Two-column hero row ── */}
        <div className="grid lg:grid-cols-[1fr_1.8fr] gap-12 items-start">

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
              LOVED BY THOUSANDS<br />
              <span className="gradient-text-blue">OF STUDENTS.</span>
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-sm">
              Real interns, real projects, real results. Hear from students who turned their Persevex experience into careers at top companies.
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

          {/* Right — scrolling marquee rows */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4 overflow-hidden"
          >
            <MarqueeRow items={row1} />
            <MarqueeRow items={row2} reverse />
          </motion.div>
        </div>

      </div>
    </section>
  );
}

export default memo(Testimonials);
