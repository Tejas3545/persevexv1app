"use client";

import React, { Suspense } from "react";
import Image from "next/image";
import { CourseType } from "../constants/courseConstant";

export default function CourseClientUI({ course }: { course: CourseType }) {
  return (
    <main className="relative min-h-screen w-full text-foreground bg-background overflow-hidden">
      {}
      

      {}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {}
          <div className="flex flex-col gap-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight">
              {course.title}
            </h1>
            <div className="w-1/2 h-0.5 bg-card/80" />
            <p className="text-lg md:text-xl text-muted max-w-xl">
              {}
              {course.description}
            </p>

            {}
            <div className="mt-6">
              <div className="relative w-fit">
                <button className="relative z-10 px-10 py-3 bg-primary text-primary-foreground rounded-full font-semibold text-lg shadow-lg shadow-primary/30 hover:bg-blue-700 transition-colors duration-300">
                  Enroll Now
                </button>
                <div className="absolute inset-0 bg-blue-900 rounded-full transform translate-x-1 translate-y-1"></div>
              </div>
            </div>
          </div>

          {}
          <div className="flex justify-center items-center">
            <Image
              src={course.image}
              alt={course.title}
              width={500}
              height={500}
              className="rounded-lg object-contain w-full h-auto max-w-[400px]"
              priority
            />
          </div>
        </div>
      </div>
    </main>
  );
}
