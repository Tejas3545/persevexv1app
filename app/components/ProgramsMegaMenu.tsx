"use client";

import React, { useState } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Briefcase,
  FileBadge,
  ChevronRight,
  ArrowRight,
  ArrowDown,
} from "lucide-react";
import { useRouter } from "next/navigation";

const MotionLink = motion.create(Link);

type ProgramItem = { key: string; name: string; href: string };
type ProgramCategory = { branch: string; items: ProgramItem[] };

interface ProgramsMegaMenuProps {
  internshipData: ProgramCategory[];
  placementData: ProgramCategory[];
  onClose: () => void;
}


const megaMenuVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -10,
    scale: 0.98,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 400, damping: 30 },
  },
};

const domainItemVariants: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.2, ease: "easeOut" } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.15, ease: "easeIn" } },
};

export default function ProgramsMegaMenu({
  internshipData,
  placementData,
  onClose,
}: ProgramsMegaMenuProps) {
  const router = useRouter();
  const [activeProgram, setActiveProgram] = useState<
    "Internship Program" | "Placement Provision Program"
  >("Internship Program");

  const currentCategories =
    activeProgram === "Internship Program" ? internshipData : placementData;

  const [activeTopic, setActiveTopic] = useState(
    currentCategories[0]?.branch || ""
  );

  const programs = [
    {
      name: "Internship Program",
      label: "INTERNSHIP PROGRAM",
      icon: <Briefcase size={22} />,
    },
    {
      name: "Placement Provision Program",
      label: "PLACEMENT PROVISION PROGRAM",
      icon: <FileBadge size={22} />,
    },
  ];

  const activeCourses =
    currentCategories.find((cat) => cat.branch === activeTopic)?.items || [];

  const handleProgramChange = (
    programName: "Internship Program" | "Placement Provision Program"
  ) => {
    setActiveProgram(programName);
    if (programName === "Internship Program") {
      setActiveTopic(internshipData[0]?.branch || "");
    } else {
      setActiveTopic(placementData[0]?.branch || "");
    }
  };

  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 500, damping: 40 }}
      className="absolute top-full left-0 mt-4 w-[900px] rounded-3xl bg-card shadow-2xl shadow-blue-900/5 dark:shadow-none border border-border z-10 text-foreground overflow-hidden"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={megaMenuVariants}
    >
      <div className="grid grid-cols-3">
        {/* Column 1: Program Type */}
        <div className="p-5 border-r border-border">
          <h3 className="text-xs font-bold text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
            Program <ArrowRight size={14} className="text-primary" />
          </h3>
          <div className="space-y-2">
            {programs.map((prog) => {
              const isActive = activeProgram === prog.name;
              return (
                <button
                  key={prog.name}
                  onClick={() =>
                    handleProgramChange(
                      prog.name as
                      | "Internship Program"
                      | "Placement Provision Program"
                    )
                  }
                  className={`relative cursor-pointer w-full p-3.5 rounded-xl text-left transition-all duration-300 flex items-center gap-3 ${isActive
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary font-semibold"
                    : "text-muted-foreground hover:bg-background"
                    }`}
                >
                  {prog.icon}
                  <span className="text-xs tracking-wide">{prog.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Column 2: Topics/Branches */}
        <div className="p-5 border-r border-border">
          <h3 className="text-xs font-bold text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
            Topic <ArrowRight size={14} className="text-primary" />
          </h3>
          <div className="space-y-1">
            {currentCategories.map((category) => {
              const isActive = activeTopic === category.branch;
              return (
                <button
                  key={category.branch}
                  onMouseEnter={() => setActiveTopic(category.branch)}
                  onClick={() => {
                    if (activeProgram === "Placement Provision Program") {
                      router.push("/job-guarantee-program");
                      onClose();
                    }
                  }}
                  className={`w-full cursor-pointer p-3 rounded-lg text-left transition-colors duration-200 flex items-center justify-between text-sm ${isActive
                    ? "bg-accent text-primary font-semibold"
                    : "text-muted-foreground hover:bg-background"
                    }`}
                >
                  <span>{category.branch}</span>
                  {!isActive && (
                    <ChevronRight size={14} className="text-muted-foreground" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Column 3: Courses */}
        <div className="p-5">
          <h3 className="text-xs font-bold text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
            Course <ArrowDown size={14} className="text-primary" />
          </h3>
          <div className="flex flex-col gap-0.5">
            <AnimatePresence mode="wait">
              {activeCourses.map((item) => (
                <MotionLink
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground rounded-lg px-3 py-2.5 text-sm transition-colors duration-200 hover:text-primary hover:bg-accent"
                  onClick={onClose}
                  variants={domainItemVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  layout
                >
                  {item.name}
                </MotionLink>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border bg-background px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">recognized by</span>
          <div className="px-3 py-1 bg-accent rounded text-primary text-xs font-bold">
            #startupindia
          </div>
        </div>
        <Link
          href="/explore-courses"
          onClick={onClose}
          className="text-xs font-semibold text-primary hover:text-primary transition-colors flex items-center gap-1"
        >
          View All Courses <ArrowRight size={12} />
        </Link>
      </div>
    </motion.div>
  );
}
