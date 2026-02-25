"use client";

import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useScroll, SectionKey } from "../contexts/scrollContext";
import Hero from "./Hero";

// Lazy-load below-fold sections for performance
const OfferingsSection = dynamic(() => import("./OfferingsSection"), {
  loading: () => <SectionSkeleton />,
});
const HowWeWorkSection = dynamic(() => import("./HowWeWorkSection"), {
  loading: () => <SectionSkeleton />,
});
const OurEdgeSection = dynamic(() => import("./OurEdgeSection"), {
  loading: () => <SectionSkeleton />,
});
const PartnersSection = dynamic(() => import("./PartnersSection"), {
  loading: () => <SectionSkeleton />,
});
const LmsSection = dynamic(() => import("./LmsSection"), {
  loading: () => <SectionSkeleton />,
});
const Testimonials = dynamic(() => import("./Testimonials"), {
  loading: () => <SectionSkeleton />,
});
const RecognizedBySection = dynamic(() => import("./RecognizedBySection"), {
  loading: () => <SectionSkeleton />,
});
const FaqSection = dynamic(() => import("./FaqSection"), {
  loading: () => <SectionSkeleton />,
});
const FooterSection = dynamic(() => import("./FooterSection"), {
  loading: () => <SectionSkeleton height="h-48" />,
});

function SectionSkeleton({ height = "h-96" }: { height?: string }) {
  return (
    <div className={`w-full ${height} flex items-center justify-center`}>
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-border border-t-primary animate-spin" />
        <div className="w-48 h-3 skeleton rounded-full" />
      </div>
    </div>
  );
}

export default function LandingPage() {
  const searchParams = useSearchParams();
  const { setSectionRefs, scrollToSection } = useScroll();

  // Section refs
  const ourEdgeRef = useRef<HTMLDivElement>(null!);
  const partnersRef = useRef<HTMLDivElement>(null!);
  const testimonialsRef = useRef<HTMLDivElement>(null!);
  const recognizedByRef = useRef<HTMLDivElement>(null!);
  const faqRef = useRef<HTMLDivElement>(null!);
  const footerRef = useRef<HTMLDivElement>(null!);

  // Register section refs with scroll context
  useEffect(() => {
    setSectionRefs({
      ourEdge: ourEdgeRef,
      partners: partnersRef,
      testimonials: testimonialsRef,
      recognizedBy: recognizedByRef,
      faq: faqRef,
      footer: footerRef,
    });
  }, [setSectionRefs]);

  // Handle scroll-to on navigation (from other pages)
  useEffect(() => {
    const scrollTo = searchParams.get("scrollTo") as SectionKey | null;
    if (scrollTo) {
      const timer = setTimeout(() => {
        scrollToSection(scrollTo);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [searchParams, scrollToSection]);

  return (
    <main className="overflow-x-hidden">
      {/* Hero */}
      <Hero />

      {/* Offerings — Resume Builder & Project Hub */}
      <OfferingsSection />

      {/* How We Work — 5-step process */}
      <HowWeWorkSection />

      {/* Explore Programs CTA */}
      <section className="section-padding bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Programs</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4">
            30+ Internship &amp; Certification Programs<br />
            <span className="gradient-text-blue">across 10+ Domains.</span>
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-xl mx-auto">
            From Full Stack Development and AI to Digital Marketing and Finance — pick a track, build real projects, and earn a certificate that carries proof.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="/explore-courses"
              className="btn-aptisure inline-flex items-center gap-2 px-6 py-3 text-sm"
            >
              Explore all programs &rarr;
            </a>
            <a
              href="/enroll"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-sm font-semibold text-foreground hover:bg-muted transition-colors"
            >
              Talk to an advisor
            </a>
          </div>
        </div>
      </section>

      {/* Our Edge */}
      <div ref={ourEdgeRef}>
        <OurEdgeSection />
      </div>

      {/* Partners */}
      <div ref={partnersRef}>
        <PartnersSection />
      </div>

      {/* LMS Section */}
      <LmsSection />

      {/* Testimonials */}
      <div ref={testimonialsRef}>
        <Testimonials />
      </div>

      {/* Recognized By */}
      <div ref={recognizedByRef}>
        <RecognizedBySection />
      </div>

      {/* FAQ */}
      <div ref={faqRef}>
        <FaqSection />
      </div>

      {/* Footer */}
      <div ref={footerRef}>
        <FooterSection />
      </div>
    </main>
  );
}
