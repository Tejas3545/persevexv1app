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
const CoursesSection = dynamic(() => import("./CoursesSection"), {
  loading: () => <SectionSkeleton />,
});
const OurEdgeSection = dynamic(() => import("./OurEdgeSection"), {
  loading: () => <SectionSkeleton />,
});
const PartnersSection = dynamic(() => import("./PartnersSection"), {
  loading: () => <SectionSkeleton />,
});
const Testimonials = dynamic(() => import("./Testimonials"), {
  loading: () => <SectionSkeleton />,
});
const RecognizedBySection = dynamic(() => import("./RecognizedBySection"), {
  loading: () => <SectionSkeleton />,
});
const AboutUsSection = dynamic(() => import("./AboutUsSection"), {
  loading: () => <SectionSkeleton />,
});
const FaqSection = dynamic(() => import("./FaqSection"), {
  loading: () => <SectionSkeleton />,
});
const ContactUs = dynamic(() => import("./ContactUs"), {
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
  const coursesRef = useRef<HTMLDivElement>(null!);
  const ourEdgeRef = useRef<HTMLDivElement>(null!);
  const partnersRef = useRef<HTMLDivElement>(null!);
  const testimonialsRef = useRef<HTMLDivElement>(null!);
  const recognizedByRef = useRef<HTMLDivElement>(null!);
  const aboutUsRef = useRef<HTMLDivElement>(null!);
  const faqRef = useRef<HTMLDivElement>(null!);
  const contactUsRef = useRef<HTMLDivElement>(null!);
  const footerRef = useRef<HTMLDivElement>(null!);

  // Register section refs with scroll context
  useEffect(() => {
    setSectionRefs({
      courses: coursesRef,
      ourEdge: ourEdgeRef,
      partners: partnersRef,
      testimonials: testimonialsRef,
      recognizedBy: recognizedByRef,
      aboutUs: aboutUsRef,
      faq: faqRef,
      contactUs: contactUsRef,
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

      {/* Courses */}
      <div ref={coursesRef}>
        <CoursesSection />
      </div>

      {/* Our Edge */}
      <div ref={ourEdgeRef}>
        <OurEdgeSection />
      </div>

      {/* Partners */}
      <div ref={partnersRef}>
        <PartnersSection />
      </div>

      {/* Testimonials */}
      <div ref={testimonialsRef}>
        <Testimonials />
      </div>

      {/* Recognized By */}
      <div ref={recognizedByRef}>
        <RecognizedBySection />
      </div>

      {/* About Us */}
      <div ref={aboutUsRef}>
        <AboutUsSection />
      </div>

      {/* FAQ */}
      <div ref={faqRef}>
        <FaqSection />
      </div>

      {/* Contact Us */}
      <div ref={contactUsRef}>
        <ContactUs />
      </div>

      {/* Footer */}
      <div ref={footerRef}>
        <FooterSection />
      </div>
    </main>
  );
}