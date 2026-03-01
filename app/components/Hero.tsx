"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { 
  Code2, Database, Cpu, Globe, Layout, Smartphone, 
  Server, Shield, Terminal, Wifi, Cloud, Blocks,
  CheckCircle2, Briefcase, Wrench, Building2
} from "lucide-react";
import { searchPages } from "@/app/constants/searchIndex";

// Program suggestions data
const programSuggestions = [
  { name: "Artificial Intelligence", category: "Program • Computer Science", href: "/courses/artificial-intelligence" },
  { name: "Full Stack Web Development", category: "Program • Computer Science", href: "/courses/web-development" },
  { name: "Cyber Security", category: "Program • Computer Science", href: "/courses/cybersecurity" },
  { name: "Data Science", category: "Program • Computer Science", href: "/courses/data-science" },
  { name: "Digital Marketing", category: "Program • Management", href: "/courses/digital-marketing" },
  { name: "Machine Learning", category: "Program • Computer Science", href: "/courses/machine-learning" },
  { name: "Cloud Computing", category: "Program • Computer Science", href: "/courses/cloud-computing" },
  { name: "Human Resources", category: "Program • Management", href: "/courses/human-resource" },
  { name: "Finance", category: "Program • Management", href: "/courses/finance" },
  { name: "Business Analytics", category: "Program • Management", href: "/courses/business-analytics" },
  { name: "IoT (Internet of Things)", category: "Program • Electronics", href: "/courses/iot" },
  { name: "Embedded Systems", category: "Program • Electronics", href: "/courses/embedded-systems" },
];

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
  { number: 10000, suffix: "+", label: "Students Enrolled" },
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
      className="absolute rounded-full bg-primary/40 dark:bg-primary/60 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size }}
      animate={{
        y: [0, -40, 0],
        x: [0, 20, 0],
        opacity: [0.3, 0.8, 0.3],
        scale: [1, 1.5, 1],
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
  { x: 15, y: 45, size: 7, delay: 0.7, duration: 5 },
  { x: 80, y: 40, size: 6, delay: 1.8, duration: 6.5 },
  { x: 45, y: 15, size: 8, delay: 0.2, duration: 4.8 },
  { x: 25, y: 85, size: 5, delay: 1.1, duration: 5.2 },
];

function OrbitIcon({ icon: Icon, color, radius, initialAngle, duration, reverse = false, size = 48 }: any) {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      initial={{ rotate: initialAngle }}
      animate={{ rotate: initialAngle + (reverse ? -360 : 360) }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
      style={{ width: radius * 2, height: radius * 2, marginLeft: -radius, marginTop: -radius }}
    >
      <motion.div
        className="absolute flex items-center justify-center"
        style={{ 
          width: size, 
          height: size, 
          left: '50%', 
          top: 0, 
          marginLeft: -size / 2, 
          marginTop: -size / 2,
        }}
        initial={{ rotate: -initialAngle }}
        animate={{ rotate: -(initialAngle + (reverse ? -360 : 360)) }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {/* Glowing background */}
        <div className={`absolute inset-0 rounded-full opacity-20 blur-md bg-current ${color}`} />
        {/* Glassmorphism container */}
        <div className="relative w-full h-full bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-sm border border-border/50 rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(255,255,255,0.05)]">
          <Icon className={`w-1/2 h-1/2 ${color}`} />
        </div>
      </motion.div>
    </motion.div>
  );
}

function OrbitingAnimation() {
  return (
    <div className="relative w-full max-w-[600px] aspect-square flex items-center justify-center mx-auto">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl" />

      {/* Central Core */}
      <div className="absolute z-20 flex items-center justify-center">
        {/* Pulsing rings */}
        <motion.div 
          className="absolute w-32 h-32 rounded-full border-2 border-primary/30"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute w-32 h-32 rounded-full border-2 border-primary/20"
          animate={{ scale: [1, 2, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        
        {/* Core Logo */}
        <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.5)]">
          <div className="absolute inset-1 rounded-full bg-white/10 backdrop-blur-sm" />
          <span className="relative text-5xl font-bold text-white drop-shadow-lg">P</span>
        </div>
      </div>

      {/* SVG Connecting Lines (Static background pattern) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20 dark:opacity-30" viewBox="0 0 600 600">
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="currentColor" className="text-primary" stopOpacity="1" />
            <stop offset="100%" stopColor="currentColor" className="text-primary" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="300" cy="300" r="110" fill="none" stroke="url(#glow)" strokeWidth="1" strokeDasharray="4 8" />
        <circle cx="300" cy="300" r="180" fill="none" stroke="url(#glow)" strokeWidth="1" strokeDasharray="4 12" />
        <circle cx="300" cy="300" r="250" fill="none" stroke="url(#glow)" strokeWidth="1" strokeDasharray="4 16" />
        
        {/* Cross lines */}
        <line x1="300" y1="50" x2="300" y2="550" stroke="url(#glow)" strokeWidth="1" strokeDasharray="4 12" />
        <line x1="50" y1="300" x2="550" y2="300" stroke="url(#glow)" strokeWidth="1" strokeDasharray="4 12" />
        <line x1="123" y1="123" x2="477" y2="477" stroke="url(#glow)" strokeWidth="1" strokeDasharray="4 12" />
        <line x1="123" y1="477" x2="477" y2="123" stroke="url(#glow)" strokeWidth="1" strokeDasharray="4 12" />
      </svg>

      {/* Orbit 1 - Inner */}
      <motion.div 
        className="absolute w-[220px] h-[220px] rounded-full border border-primary/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-0 left-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent -translate-x-1/2" />
      </motion.div>
      <OrbitIcon icon={Code2} color="text-blue-500" radius={110} initialAngle={0} duration={20} size={44} />
      <OrbitIcon icon={Database} color="text-green-500" radius={110} initialAngle={120} duration={20} size={44} />
      <OrbitIcon icon={Layout} color="text-purple-500" radius={110} initialAngle={240} duration={20} size={44} />

      {/* Orbit 2 - Middle */}
      <motion.div 
        className="absolute w-[360px] h-[360px] rounded-full border border-primary/15"
        animate={{ rotate: -360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute bottom-0 left-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent -translate-x-1/2" />
      </motion.div>
      <OrbitIcon icon={Globe} color="text-cyan-500" radius={180} initialAngle={45} duration={30} reverse size={52} />
      <OrbitIcon icon={Smartphone} color="text-pink-500" radius={180} initialAngle={135} duration={30} reverse size={52} />
      <OrbitIcon icon={Server} color="text-orange-500" radius={180} initialAngle={225} duration={30} reverse size={52} />
      <OrbitIcon icon={Shield} color="text-red-500" radius={180} initialAngle={315} duration={30} reverse size={52} />

      {/* Orbit 3 - Outer */}
      <motion.div 
        className="absolute w-[500px] h-[500px] rounded-full border border-primary/10"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-1/2 right-0 w-64 h-[1px] bg-gradient-to-r from-transparent via-purple-400 to-transparent -translate-y-1/2 origin-right rotate-90" />
      </motion.div>
      <OrbitIcon icon={Terminal} color="text-emerald-500" radius={250} initialAngle={30} duration={40} size={56} />
      <OrbitIcon icon={Wifi} color="text-indigo-500" radius={250} initialAngle={102} duration={40} size={56} />
      <OrbitIcon icon={Cloud} color="text-sky-500" radius={250} initialAngle={174} duration={40} size={56} />
      <OrbitIcon icon={Blocks} color="text-yellow-500" radius={250} initialAngle={246} duration={40} size={56} />
      <OrbitIcon icon={Cpu} color="text-rose-500" radius={250} initialAngle={318} duration={40} size={56} />
    </div>
  );
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.location.href = `/explore-courses?search=${encodeURIComponent(searchQuery.trim())}`;
    } else {
      window.location.href = '/explore-courses';
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
    if (e.key === 'Escape') {
      setShowSuggestions(false);
      setIsFocused(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowSuggestions(true);
  };

  const handleFocus = () => {
    setIsFocused(true);
    setShowSuggestions(true);
  };

  // Get category icon based on category name
  const getCategoryIcon = (category: string) => {
    switch(category.toLowerCase()) {
      case 'management': return <Briefcase size={14} className="text-purple-500" />;
      case 'technical': return <Code2 size={14} className="text-blue-500" />;
      case 'computer science': return <Code2 size={14} className="text-blue-500" />;
      case 'electronics': return <Cpu size={14} className="text-amber-500" />;
      case 'mechanical': return <Wrench size={14} className="text-orange-500" />;
      case 'civil': return <Building2 size={14} className="text-green-500" />;
      default: return null;
    }
  };

  // Filter programs and domain pages based on search query
  const filteredPrograms = searchQuery.trim() 
    ? (() => {
        // Get results from searchIndex (domains + all pages)
        const indexResults = searchPages(searchQuery);
        
        // Get matching programs from programSuggestions
        const programMatches = programSuggestions.filter(program => 
          program.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          program.category.toLowerCase().includes(searchQuery.toLowerCase())
        );

        // Merge and deduplicate results
        const merged = [
          ...indexResults.map(item => ({
            name: item.title,
            category: item.category,
            href: item.path,
          })),
          ...programMatches
        ];

        // Remove duplicates based on href
        const seen = new Set();
        return merged.filter(item => {
          if (seen.has(item.href)) return false;
          seen.add(item.href);
          return true;
        });
      })()
    : programSuggestions;

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
      className="relative min-h-screen flex items-center bg-white dark:bg-[#000000] overflow-visible"
    >
      {/* Interactive Premium Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Mouse following glow */}
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full bg-primary/15 dark:bg-primary/20 blur-[120px] -translate-x-1/2 -translate-y-1/2"
          animate={{
            x: mousePosition.x,
            y: mousePosition.y,
          }}
          transition={{ type: "tween", ease: "easeOut", duration: 1.5 }}
        />
        
        {/* Static ambient orbs */}
        <motion.div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-blue-500/10 dark:bg-blue-600/15 blur-[120px]"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-purple-500/10 dark:bg-purple-600/15 blur-[120px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] bg-[radial-gradient(circle,#000_1px,transparent_1px)] dark:bg-[radial-gradient(circle,#fff_1px,transparent_1px)] bg-[size:32px_32px]" />

        {/* Glowing Lines */}
        <motion.div
          className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-2/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"
          animate={{ x: ["100%", "-100%"] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-3/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-400/30 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />

        {/* Floating Particles */}
        {particles.map((p, i) => (
          <FloatingParticle key={i} {...p} />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
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
                Empowering Careers Since 2025
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
              className="section-subtitle mb-10 max-w-xl"
            >
              Experience hands-on learning with AI guidance, expert-curated
              projects, and career-ready outcomes. Join thousands of students
              building their future with Persevex.
            </motion.p>

            {/* Aptisure-Style Search Bar with Suggestions */}
            <motion.div
              custom={3}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="max-w-xl mb-8 relative z-[99999]"
              ref={searchContainerRef}
            >
              <div className="relative border border-border bg-white dark:bg-[#0a0a0a] rounded-full p-2 flex items-center shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="pl-4 text-muted-foreground mr-2 group-focus-within:text-primary transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleInputChange}
                  onFocus={handleFocus}
                  placeholder="Search any program (AI, DSA, DevOps, Finance...)"
                  className="flex-1 bg-transparent py-2 px-2 text-foreground outline-none text-base placeholder:text-muted-foreground w-full border-none focus:ring-0"
                  style={{ boxShadow: 'none' }}
                  onKeyDown={handleKeyPress}
                />
                <button 
                  onClick={handleSearch}
                  className="btn-aptisure py-3 px-6 mx-1 whitespace-nowrap hidden sm:flex items-center gap-2"
                >
                  {searchQuery.trim() ? 'Search' : 'Explore'} <span className="hidden sm:inline">Programs</span> 
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                </button>
              </div>

              {/* Suggestions Dropdown */}
              <AnimatePresence>
                {showSuggestions && isFocused && filteredPrograms.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full mt-3 w-full bg-white dark:bg-[#0a0a0a] rounded-3xl shadow-2xl border border-border z-[99999]"
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="max-h-[400px] overflow-y-auto rounded-3xl" style={{ 
                      scrollbarWidth: 'thin',
                      scrollbarColor: 'rgba(0,0,0,0.2) transparent'
                    }}>
                      {filteredPrograms.slice(0, 12).map((program, index) => (
                        <Link
                          key={index}
                          href={program.href}
                          onClick={() => {
                            setShowSuggestions(false);
                            setIsFocused(false);
                          }}
                          className="flex items-center justify-between px-6 py-4 hover:bg-accent transition-colors group border-b border-border/30 last:border-b-0"
                        >
                          <div className="flex-1 flex items-start gap-3">
                            {getCategoryIcon(program.category)}
                            <div>
                              <div className="font-semibold text-foreground text-base group-hover:text-primary transition-colors">
                                {program.name}
                              </div>
                              <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5">
                                {program.category}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-primary text-sm font-medium">
                            Open
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="m9 18 6-6-6-6" />
                            </svg>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Mobile Search Button */}
              <button 
                onClick={handleSearch}
                className="btn-aptisure w-full mt-3 sm:hidden flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                Search Programs
              </button>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              custom={4}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap items-center gap-4"
            >
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link href="/enroll" className="btn-aptisure text-base inline-flex items-center justify-center gap-2 px-6 py-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  Talk to Career Expert
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link href="/campus-ambassador" className="btn-outline rounded-full! text-base bg-white dark:bg-[#0a0a0a] border-border text-foreground hover:bg-muted px-6 py-3 inline-flex items-center justify-center">
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

          {/* Right Column - Orbiting Animation */}
          <motion.div 
            className="hidden lg:flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          >
            <OrbitingAnimation />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
