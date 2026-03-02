"use client";

import React, { use, useRef } from 'react';
import { notFound } from 'next/navigation';
import { Clock, Monitor, FolderOpen, Award } from 'lucide-react';
import { faqsData } from '@/app/constants/faqsData';
import CourseHeroAnimation from '@/app/components/CourseHeroAnimation';
import { managementCourses } from '@/app/constants/courseConstant';
import { allDomains, CourseType } from '@/app/constants/courseConstant';
import AboutProgramSection from '@/app/components/AboutProgramSection';
import CurriculumSection from '@/app/components/CurriculumSection';
import ProjectsSection from '@/app/components/ProjectsSection';
import CertificationSection from '@/app/components/CertificationSection';
import TrainingPartners from '@/app/components/TrainingPartners';
import FrequentlyAskedQuestionsSection from '@/app/components/FrequentlyAskedQuestions';
import CourseFooterSection from '@/app/components/CourseFooterSection';
import TrustCards from '@/app/components/TrustCards';
import SkillsAndFeatures from '@/app/components/SkillAndFatures';
import PricingCard from '@/app/components/PricingCard';

export default function IndividualJGPCoursePage({ params }: { params: Promise<{ course: string }> }) {
  const resolvedParams = use(params);

  const allCourses: CourseType[] = allDomains.flatMap(domain => domain.courses);
  const course = allCourses.find(c => c.slug === resolvedParams.course);

  const aboutRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;;
  const curriculumRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;;
  const projectsRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;;
  const certificationRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;;
  const partnersRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;;
  const faqsRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;;
  const footerRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;;
   const pricingRef = useRef<HTMLDivElement>(null);

  if (!course) {
    notFound();
  }

  const domain = allDomains.find(d => d.courses.some(c => c.slug === course?.slug));
  const domainCourses = domain?.courses.slice(0, 4).map(c => c.title) || [];

  const footerLinksToShow = [
    {
      title: "Quick Links",
      links: ["Home", ...domainCourses],
    },
    {
      title: "Our Programs",
      links: domainCourses,
    },
    {
      title: "Get in touch",
      links: ["support@persevex.com", "5a, 1A Cross Rd, Dollar Scheme Colony, 1st Stage, BTM 1st Stage, Bengaluru, Karnataka 560068, India"],
    },
  ];

  const courseFaqs = faqsData[course.slug] || [];

   const handleEnrollClick = () => {
    pricingRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center', // This nicely centers the card in the viewport
    });
  };

  const totalWeeks = course.modules
    ? course.modules.reduce((sum, m) => {
        const n = parseInt(m.duration ?? "1");
        return sum + (isNaN(n) ? 1 : n);
      }, 0)
    : 12;
  const projectCount = course.projects?.length ?? 4;

  return (
    <main className="relative min-h-screen w-full text-foreground bg-background overflow-x-hidden">

      <div className="relative z-10">
        {/* Hero */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5 dark:from-primary/10 dark:to-blue-900/10 pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

              {/* Left: text */}
              <div className="flex flex-col gap-5 items-start text-left">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  Job Guarantee Program
                </span>
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-[-0.03em] text-primary leading-tight">
                  {course.title}
                </h1>
                <p className="text-base text-muted-foreground max-w-xl leading-relaxed">
                  {course.large_description}
                </p>

                {/* Stats row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full mt-1">
                  {[
                    { icon: Clock,      label: "Duration",    value: `${totalWeeks} Weeks` },
                    { icon: Monitor,    label: "Format",      value: "Live + Recorded" },
                    { icon: FolderOpen, label: "Projects",    value: `${projectCount}+ Real` },
                    { icon: Award,      label: "Certificate", value: "Verified" },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex flex-col items-center gap-1 rounded-xl bg-secondary/60 border border-border px-3 py-3 text-center">
                      <Icon size={16} className="text-primary" />
                      <p className="text-xs text-muted-foreground font-medium">{label}</p>
                      <p className="text-sm font-bold text-foreground leading-tight">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={handleEnrollClick}
                    className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold text-base shadow-lg shadow-primary/30 hover:bg-primary/90 transition-colors duration-300"
                  >
                    Enroll Now
                  </button>
                  <a
                    href="#curriculum"
                    className="px-6 py-3 rounded-full border border-border text-foreground font-semibold text-base hover:border-primary/50 hover:text-primary transition-colors duration-300"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    View Curriculum &rarr;
                  </a>
                </div>
              </div>

              {/* Right: orbital animation */}
              <div className="flex justify-center items-center">
                <CourseHeroAnimation slug={course.slug} />
              </div>

            </div>
          </div>
        </div>

        <div ref={aboutRef} id="about">
          <AboutProgramSection course={course} />
        </div>

        {course.modules && course.modules.length > 0 && (
          <div ref={curriculumRef} id="curriculum">
            <CurriculumSection modules={course.modules} />
          </div>
        )}

        {course.projects && course.projects.length > 0 && (
          <div ref={projectsRef}>
            <ProjectsSection projects={course.projects} />
          </div>
        )}
        <div className='flex flex-col'>
          <TrustCards />
          <SkillsAndFeatures 
            skills={course.skillsCovered || []}
            features={course.keyFeatures || []}
          />
        </div>

        <div ref={certificationRef}>
          <CertificationSection />
        </div>

        <div ref={partnersRef}>
          <TrainingPartners />
        </div>

        <div ref={faqsRef}>
          <FrequentlyAskedQuestionsSection faqs={courseFaqs} />
        </div>
        <div ref={pricingRef}>
          <PricingCard />
        </div>

        <div ref={footerRef}>
          <CourseFooterSection links={footerLinksToShow} />
        </div>
      </div>
    </main>
  );
}