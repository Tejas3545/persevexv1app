"use client";

import React, { Suspense, ReactNode } from "react";
import Link from "next/link";
import { Code, Users, Megaphone, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import ExploreFooterSection from "@/app/components/ExploreFooterSection";

interface ProgramCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  href: string;
}

function ProgramCard({ icon, title, description, href }: ProgramCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card backdrop-blur-sm border border-border rounded-xl p-8 flex flex-col items-start h-full transition-all duration-300 hover:border-primary/80 hover:shadow-lg hover:shadow-primary/20"
    >
      <div className="bg-primary/10 p-3 rounded-lg text-primary">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-foreground mt-6">{title}</h3>
      <p className="text-muted-foreground mt-2 text-base flex-grow">{description}</p>
      <Link
        href={href}
        className="mt-6 text-primary font-semibold flex items-center gap-2 group"
      >
        Learn More
        <ArrowRight
          size={16}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </Link>
    </motion.div>
  );
}

export default function JobGuaranteeProgramPage() {
  const programs = [
    {
      icon: <Code size={28} />,
      title: "Fullstack Development",
      description:
        "Master both front-end and back-end technologies to build complete web applications from scratch. Become a versatile and in-demand developer.",
      href: "/job-guarantee-program/web-development",
    },
    {
      icon: <Users size={28} />,
      title: "Human Resources",
      description:
        "Learn modern HR practices, from talent acquisition to employee relations and strategic management, to become a vital asset to any organization.",
      href: "/job-guarantee-program/human-resource",
    },
    {
      icon: <Megaphone size={28} />,
      title: "Digital Marketing",
      description:
        "Dive into SEO, SEM, content strategy, and social media marketing to drive growth and build powerful online brands in the digital age.",
      href: "/job-guarantee-program/digital-marketing",
    },
  ];

  return (
    <main>
      {}
      

      {}
      <div className="relative min-h-screen flex flex-col items-center justify- p-4 sm:p-6 lg:p-8">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight"
          >
            Job <span className="text-primary">Guarantee</span> Programs
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Secure your future with our intensive training programs designed to
            land you a job in top tech and business roles.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 w-full max-w-6xl">
          {programs.map((program, index) => (
            <ProgramCard
              key={index}
              icon={program.icon}
              title={program.title}
              description={program.description}
              href={program.href}
            />
          ))}
        </div>
      </div>
      <ExploreFooterSection />
    </main>
  );
}
