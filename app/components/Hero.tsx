"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

// Animated counter hook
function useCounter(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, end, duration]);

  return { count, start: () => setStarted(true) };
}

const stats = [
  { number: 5000, suffix: "+", label: "Students Enrolled" },
  { number: 20, suffix: "+", label: "Industry Courses" },
  { number: 95, suffix: "%", label: "Satisfaction Rate" },
  { number: 50, suffix: "+", label: "Hiring Partners" },
];

function StatCounter({ stat, delay }: { stat: typeof stats[0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { count, start } = useCounter(stat.number, 2000);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          start();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted, start]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      <div className="text-2xl md:text-3xl font-bold gradient-text-blue">
        {count}{stat.suffix}
      </div>
      <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
    </motion.div>
  );
}

// Floating particle component
function FloatingParticle({ x, y, size, delay, duration }: {
  x: number; y: number; size: number; delay: number; duration: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full bg-primary/20"
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size }}
      animate={{
        y: [0, -30, 0],
        x: [0, 15, 0],
        opacity: [0.2, 0.6, 0.2],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

const particles = [
  { x: 10, y: 20, size: 6, delay: 0, duration: 4 },
  { x: 85, y: 15, size: 10, delay: 0.5, duration: 5 },
  { x: 70, y: 60, size: 8, delay: 1, duration: 6 },
  { x: 20, y: 70, size: 5, delay: 1.5, duration: 4.5 },
  { x: 50, y: 85, size: 7, delay: 0.8, duration: 5.5 },
  { x: 90, y: 80, size: 4, delay: 2, duration: 3.5 },
  { x: 35, y: 40, size: 9, delay: 0.3, duration: 7 },
  { x: 60, y: 30, size: 5, delay: 1.2, duration: 4 },
];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const textVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: i * 0.15, ease: "easeOut" as const },
    }),
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-[95vh] flex items-center bg-slate-50 dark:bg-card overflow-hidden"
    >
      {/* Clean Background Details */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Soft highlight orb */}
        <motion.div
          className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl"
          animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.4, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle,#0052cc_1px,transparent_1px)] bg-size-[40px_40px]" />

        {/* Animated line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full py-20"
      >
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            custom={0}
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.span
              className="inline-flex items-center gap-2 bg-accent text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-6 border border-border"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <motion.span
                className="w-2 h-2 rounded-full bg-primary"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              Empowering Careers Since 2023
            </motion.span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            custom={1}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="section-title text-foreground mb-6 leading-tight"
          >
            Empowering the Next{" "}
            <br className="hidden md:block" />
            Generation with{" "}
            <span className="gradient-text-blue relative">
              Real-World Skills
              <motion.span
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-linear-to-r from-primary to-blue-400"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
              />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            custom={2}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="section-subtitle mb-10 max-w-2xl"
          >
            Experience hands-on learning with AI guidance, expert-curated
            projects, and career-ready outcomes. Join thousands of students
            building their future with Persevex.
          </motion.p>

          {/* Aptisure-Style Search Bar */}
          <motion.div
            custom={3}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="max-w-2xl mb-8 border border-border bg-white dark:bg-slate-900 rounded-full p-2 flex items-center shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="pl-4 text-muted-foreground mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
            <input
              type="text"
              placeholder="Search any program (AI, DSA, DevOps, Finance...)"
              className="flex-1 bg-transparent py-2 px-2 text-foreground outline-none text-base placeholder:text-muted-foreground"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  window.location.href = '/explore-courses';
                }
              }}
            />
            <Link href="/explore-courses" className="btn-aptisure py-3! px-6! mx-1 whitespace-nowrap hidden sm:flex items-center gap-2">
              Explore <span className="hidden sm:inline">Programs</span> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
            </Link>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            custom={4}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-4"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link href="/enroll" className="btn-aptisure text-base inline-flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                Talk to Career Expert
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link href="/campus-ambassador" className="btn-outline rounded-full! text-base bg-white dark:bg-slate-900 border-border text-foreground hover:bg-muted">
                Campus Ambassador
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-8 mt-14 pt-8 border-t border-border"
          >
            {stats.map((stat, i) => (
              <StatCounter key={stat.label} stat={stat} delay={0.7 + i * 0.1} />
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-xs text-muted-foreground">Scroll to explore</span>
        <motion.div
          className="w-5 h-8 rounded-full border-2 border-border flex items-start justify-center pt-1.5"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 rounded-full bg-primary"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
