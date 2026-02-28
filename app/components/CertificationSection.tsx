"use client";

import React, { useState } from "react";
import { Award, Star, FileCheck } from "lucide-react";

const certificateData = [
  {
    icon: FileCheck,
    title: "Course Completion Certificate",
    description: "Awarded upon successful completion of the course curriculum.",
  },
  {
    icon: Award,
    title: "Internship Certificate",
    description:
      "Awarded after gaining practical work experience by successful completion of the capstone projects.",
  },
  {
    icon: Star,
    title: "Outstanding Performance Certificate",
    description:
      "Awarded to recognize exceptional performance and contributions during the program.",
  },
];

export default function CertificationSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="text-foreground flex flex-col items-center justify-center py-16 px-4">
      <div className="text-center mb-10">
        <div className="inline-flex mb-4 items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 backdrop-blur-sm">
          <span className="text-primary text-sm font-medium">
            Certificates
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold">CERTIFICATIONS</h1>
        <p className="max-w-3xl mt-4 mx-auto text-md md:text-lg text-muted-foreground">
          On completion of a program each participant gets a course completion,
          internship and outstanding performance certificates.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 w-full max-w-7xl px-4 sm:px-6 lg:px-12">
        {certificateData.map((cert, index) => {
          const IconComponent = cert.icon;
          return (
            <div key={index} className="w-full max-w-md mx-auto">
              <div
                className="group relative cursor-pointer overflow-hidden rounded-xl border-4 border-white shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 bg-gradient-to-br from-primary/10 to-secondary/10 aspect-video flex items-center justify-center"
                onClick={() => handleCardClick(index)}
              >
                <IconComponent className="w-24 h-24 text-primary opacity-80 group-hover:opacity-100 transition-opacity" />
                <div
                  className={`absolute inset-0 flex flex-col backdrop-blur-sm bg-card/80 items-center justify-center text-center p-6 transition-opacity duration-300 ${
                    activeIndex === index
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }`}
                >
                  <h3 className="text-foreground text-xl md:text-2xl font-semibold">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-foreground max-w-xs mt-2">
                    {cert.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
