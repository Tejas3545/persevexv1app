import React from 'react';
import { CourseType } from '../constants/courseConstant'; 

interface AboutProgramSectionProps {
  course: CourseType;
}

export default function AboutProgramSection({ course }: AboutProgramSectionProps) {
  return (
    <div className="mt-24 px-2 md:px-0 py-16">
      <div className="text-center  max-w-4xl mx-auto">
         <div className="inline-flex mb-4 w-fit items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 backdrop-blur-sm">
          <span className="text-primary text-sm font-medium">Programs</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
          About The Program
        </h2>
        <p className="text-lg text-muted-foreground md:text-lg">

          {course.description}
        </p>
      </div>

      {course.programCardsHeading && course.programCardsHeading.length > 0 && (
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5  px-4 gap-6 lg:px-24 text-center">
          {course.programCardsHeading.map((heading, index) => (
            <div
              key={index}
              className="bg-background border border-border rounded-xl p-6 text-center flex items-center justify-center backdrop-blur-sm min-h-[120px] transition-all duration-300 hover:bg-background hover:border-border"
            >
              <h3 className="font-semibold text-base md:text-lg">
                {heading}
              </h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}