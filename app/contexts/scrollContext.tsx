"use client";

import React, { createContext, useContext, useState, RefObject } from 'react';

export type SectionKey = 'courses' | 'ourEdge' | 'partners' | 'testimonials' | 'recognizedBy' | 'aboutUs' | 'faq' | 'policy' | 'footer';

interface ScrollContextType {
  sectionRefs: Partial<Record<SectionKey, RefObject<HTMLDivElement>>>;
  setSectionRefs: (refs: Partial<Record<SectionKey, RefObject<HTMLDivElement>>>) => void;
  scrollToSection: (key: SectionKey, options?: { behavior?: ScrollBehavior }) => void;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export const ScrollProvider = ({ children }: { children: React.ReactNode }) => {
  const [sectionRefs, setSectionRefs] = useState<Partial<Record<SectionKey, RefObject<HTMLDivElement>>>>({});

  const scrollToSection = (key: SectionKey, options?: { behavior?: ScrollBehavior }) => {
    const behavior = options?.behavior || 'smooth';
    const ref = sectionRefs[key];

    if (ref?.current) {
      const navbarHeight = 72; // h-18
      const y = ref.current.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({ top: y, behavior });
    } else {
      console.warn(`Ref for section "${key}" not found. Cannot scroll.`);
    }
  };

  const value = { sectionRefs, setSectionRefs, scrollToSection };

  return (
    <ScrollContext.Provider value={value}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = () => {
  const context = useContext(ScrollContext);
  if (context === undefined) {
    throw new Error('useScroll must be used within a ScrollProvider');
  }
  return context;
};
