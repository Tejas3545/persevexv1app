"use client";

import React, { use, useEffect, useRef } from 'react';
import { notFound } from 'next/navigation';
import { faqsData } from '@/app/constants/faqsData';
import { managementCourses } from '@/app/constants/courseConstant';
import { allDomains, CourseType } from '@/app/constants/courseConstant';
import AboutProgramSection from '@/app/components/AboutProgramSection';
import CurriculumSection from '@/app/components/CurriculumSection';
import ProjectsSection from '@/app/components/ProjectsSection';
import CertificationSection from '@/app/components/CertificationSection';
import TrainingPartners from '@/app/components/TrainingPartners';
import FrequentlyAskedQuestionsSection from '@/app/components/FrequentlyAskedQuestions';
import CourseFooterSection from '@/app/components/CourseFooterSection';
import CourseHeroAnimation from '@/app/components/CourseHeroAnimation';
import { useCourseScroll } from '../../contexts/courseScrollContext';
import Link from 'next/link';
import { Clock, Monitor, FolderOpen, Award } from 'lucide-react';

export default function CoursePage({ params }: { params: Promise<{ course: string }> }) {
  const resolvedParams = use(params);
  const { setSectionRefs } = useCourseScroll();

  const allCourses: CourseType[] = allDomains.flatMap(domain => domain.courses);
  const course = allCourses.find(c => c.slug === resolvedParams.course);

  const aboutRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;;
  const curriculumRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;;
  const projectsRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;;
  const certificationRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;;
  const partnersRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;;
  const faqsRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;;
  const footerRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;;

  useEffect(() => {
    setSectionRefs({
      about: aboutRef,
      curriculum: curriculumRef,
      projects: projectsRef,
      certification: certificationRef,
      partners: partnersRef,
      faqs: faqsRef,
      footer: footerRef,
    });
  }, [setSectionRefs]);

  if (!course) {
    notFound();
  }

  const domain = allDomains.find(d => d.courses.some(c => c.slug === course?.slug));
  const domainCourses = domain?.courses.slice(0, 4) || [];

  const footerLinksToShow = [
    {
      title: "Quick Links",
      links: ["Home", ...domainCourses.map(c => ({ title: c.title, slug: c.slug }))],
    },
    {
      title: "Our Programs",
      links: domainCourses.map(c => ({ title: c.title, slug: c.slug })),
    },
    {
      title: "Get in touch",
      links: ["support@persevex.com", "5a, 1A Cross Rd, Dollar Scheme Colony, 1st Stage, BTM 1st Stage, Bengaluru, Karnataka 560068"],
    },
  ];

  const courseFaqs = faqsData[course.slug] || [];

  // Derive stats
  const projectCount = course.projects?.length ?? 4;
  const totalWeeks = course.modules?.reduce((sum, m) => {
    const match = m.duration?.match(/(\d+)/);
    return sum + (match ? parseInt(match[1]) : 2);
  }, 0) ?? 12;
  const durationLabel = `${totalWeeks}-Week Program`;

  return (
    <main className="relative min-h-screen w-full text-foreground bg-background overflow-x-hidden">

      {/* Hero Section */}
      <section className="relative z-10 overflow-hidden">
        {/* Subtle hero bg tint */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-background to-background dark:from-blue-950/20 dark:via-background dark:to-background pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-10 items-center">

            {/* Left: Content */}
            <div className="flex flex-col gap-5 order-2 lg:order-1 items-center text-center lg:items-start lg:text-left">

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-sm font-semibold tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Most Popular Program
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-[-0.03em] text-primary leading-[1.05]">
                {course.title}
              </h1>

              {/* Description */}
              <p className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
                {course.large_description}
              </p>

              {/* Stats row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-xl mt-1">
                {[
                  { icon: <Clock size={16} />, label: "Duration", value: durationLabel },
                  { icon: <Monitor size={16} />, label: "Format", value: "Expert-Led + LMS" },
                  { icon: <FolderOpen size={16} />, label: "Projects", value: `${projectCount}+ Live Projects` },
                  { icon: <Award size={16} />, label: "Certificate", value: "Industry Verified" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="flex flex-col gap-1.5 p-3 rounded-xl bg-card border border-border"
                  >
                    <div className="flex items-center gap-1.5 text-primary">
                      {stat.icon}
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {stat.label}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-foreground leading-tight">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mt-2 justify-center lg:justify-start">
                <Link
                  href="/fees"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold text-base shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all duration-200 hover:scale-[1.02]"
                >
                  Enroll Now
                </Link>
                <a
                  href="#curriculum"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-8 py-3 border-2 border-primary text-primary rounded-full font-semibold text-base hover:bg-primary/5 transition-all duration-200"
                >
                  View Curriculum →
                </a>
              </div>
            </div>

            {/* Right: Orbital Animation */}
            <div className="flex justify-center items-center order-1 lg:order-2">
              <div className="relative">
                <CourseHeroAnimation slug={course.slug} />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Remaining sections */}
      <div id="about" ref={aboutRef}>
        <AboutProgramSection course={course} />
      </div>

      {course.modules && course.modules.length > 0 && (
        <div id="curriculum" ref={curriculumRef}>
          <CurriculumSection modules={course.modules} />
        </div>
      )}

      {course.projects && course.projects.length > 0 && (
        <div ref={projectsRef}>
          <ProjectsSection projects={course.projects} />
        </div>
      )}

      <div ref={certificationRef}>
        <CertificationSection />
      </div>

      <div ref={partnersRef}>
        <TrainingPartners />
      </div>

      <div ref={faqsRef}>
        <FrequentlyAskedQuestionsSection faqs={courseFaqs} />
      </div>

      <div ref={footerRef}>
        <CourseFooterSection links={footerLinksToShow} />
      </div>
    </main>
  );
}





