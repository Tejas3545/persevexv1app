"use client";
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const courses = [
  {
    title: "AI-Powered Web Development",
    description:
      "Build intelligent, responsive websites using the latest in AI.",
    color: "from-primary to-accent",
  },
  {
    title: "Advanced React & Framer Motion",
    description: "Create stunning, fluid user interfaces and animations.",
    color: "from-accent to-destructive",
  },
  {
    title: "Three.js & 3D Web Experiences",
    description: "Bring your websites to life with interactive 3D graphics.",
    color: "from-primary to-lime-400",
  },
  {
    title: "Full-Stack AI Application Design",
    description: "Master the end-to-end development of AI-driven applications.",
    color: "from-highlight to-highlight",
  },
];

export default function Courses() {
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const watermarkOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const watermarkY = useTransform(scrollYProgress, [0.1, 0.3], [100, 0]);

  const contentOpacity = useTransform(scrollYProgress, [0.3, 0.4], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.3, 0.4], [50, 0]);

  return (
    <section ref={targetRef} className="relative h-[200vh]">
      {}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        {}
        <motion.h2
          className="absolute text-[24vw] md:text-[20vw] lg:text-[18rem] font-black uppercase text-transparent select-none leading-none z-0"
          style={{
            opacity: watermarkOpacity,
            y: watermarkY,
            WebkitTextStroke: "1px rgba(255,255,255,0.4)",
          }}
        >
          Courses
        </motion.h2>

        {}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="relative z-10 flex flex-col items-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center">
            Explore Our Curriculum
          </h2>
          <p className="text-lg md:text-xl text-center mt-4 max-w-2xl opacity-80">
            From foundational concepts to advanced specializations, find the
            right path for your career.
          </p>

          {}
          <div className="mt-12 relative h-[400px] w-[300px] md:h-[450px] md:w-[350px]">
            {courses.map((course, index) => {
              const start = 0.5 + index * 0.08;
              const end = 0.6 + index * 0.08;
              const scale = useTransform(
                scrollYProgress,
                [start, end],
                [1, 0.85 - index * 0.05]
              );
              const y = useTransform(
                scrollYProgress,
                [start, end],
                [0, -40 * (index + 1)]
              );

              return (
                <motion.div
                  key={course.title}
                  style={{
                    scale,
                    y,
                    zIndex: courses.length - index,

                    background: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
                  }}
                  className={`absolute top-0 left-0 w-full h-full p-6 rounded-2xl shadow-2xl flex flex-col justify-between bg-gradient-to-br ${course.color}`}
                >
                  <h3 className="text-2xl font-bold">{course.title}</h3>
                  <p className="text-md opacity-90">{course.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
