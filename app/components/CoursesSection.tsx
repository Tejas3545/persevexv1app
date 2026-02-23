"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Monitor, BarChart, Building, Settings, Cpu } from "lucide-react";
import {
  allDomains,
  type CourseType,
} from "@/app/constants/courseConstant";

const domains: { label: string; icon: React.ReactNode }[] = [
  { label: "CS / IT", icon: <Monitor size={16} /> },
  { label: "Management", icon: <BarChart size={16} /> },
  { label: "Electronics", icon: <Cpu size={16} /> },
  { label: "Mechanical", icon: <Settings size={16} /> },
  { label: "Civil", icon: <Building size={16} /> },
];

export default function CoursesSection() {
  const [activeDomain, setActiveDomain] = useState<string>("CS / IT");
  const router = useRouter();

  // Flatten the allDomains array into a single array of courses
  // and inject the domain name so we can filter by it
  const courseData = allDomains.flatMap((domainGroup) =>
    domainGroup.courses.map((course: CourseType) => ({
      ...course,
      domain: domainGroup.name === "Computer Science" ? "CS / IT" : domainGroup.name
    }))
  );

  const filteredCourses = courseData.filter(
    (course) => course.domain === activeDomain
  );

  const handleCourseClick = (course: CourseType) => {
    router.push(`/courses/${course.slug}`);
  };

  return (
    <section className="section-padding bg-card" id="courses">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="inline-block text-primary text-sm font-bold uppercase tracking-widest mb-3 bg-primary/10 px-4 py-1.5 rounded-full"
          >
            Our Programs
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.1 }}
            className="section-title text-foreground mb-4"
          >
            Explore <span className="text-primary">Industry-Ready</span> Courses
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.2 }}
            className="section-subtitle mx-auto"
          >
            Choose from expertly designed programs across multiple domains, each
            packed with real-world projects and mentorship.
          </motion.p>
        </div>

        {/* Domain Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {domains.map((domain) => (
            <button
              key={domain.label}
              onClick={() => setActiveDomain(domain.label)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${activeDomain === domain.label
                ? "bg-primary text-primary-foreground shadow-md shadow-primary"
                : "bg-muted text-muted-foreground hover:bg-accent"
                }`}
            >
              <span className="mr-1.5">{domain.icon}</span>
              {domain.label}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDomain}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                onClick={() => handleCourseClick(course)}
                className="group bg-white dark:bg-slate-900 rounded-3xl border border-border overflow-hidden card-hover cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-muted">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm text-primary text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                      {course.domain}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {course.description}
                  </p>

                  <div className="flex items-center justify-end pt-3 border-t border-border">
                    <span className="text-primary text-sm font-semibold group-hover:translate-x-1 transition-transform">
                      View Course →
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Coming Soon Courses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-8 p-6 rounded-3xl border border-dashed border-primary/30 bg-primary/5 dark:bg-primary/10"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold text-primary uppercase tracking-wider">Coming Soon</span>
            <div className="h-px flex-1 bg-primary/20" />
          </div>
          <div className="flex flex-wrap gap-3">
            {[
              { name: "Business Law", domain: "Business" },
              { name: "Generative AI & Prompt Engineering", domain: "Technical" },
            ].map((course) => (
              <div
                key={course.name}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-900 shadow-sm border border-border text-sm font-medium text-muted-foreground"
              >
                <span className="w-2 h-2 rounded-full bg-primary/50 animate-pulse" />
                {course.name}
                <span className="text-xs text-primary font-bold">({course.domain})</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <button
            onClick={() => router.push("/explore-courses")}
            className="btn-aptisure inline-flex items-center gap-2 cursor-pointer"
          >
            View All Courses <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
