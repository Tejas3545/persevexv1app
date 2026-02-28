"use client";

import React from "react";
import AboutUsSection from "@/app/components/AboutUsSection";
import FooterSection from "@/app/components/FooterSection";

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* Spacer for navbar */}
      <div className="h-18" />
      
      {/* About Us Content */}
      <AboutUsSection />
      
      {/* Footer */}
      <FooterSection />
    </main>
  );
}
