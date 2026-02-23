"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ModuleType } from "../constants/courseConstant";
import { Check, ChevronDown } from "lucide-react";

interface CurriculumSectionProps {
  modules: ModuleType[];
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

const CurriculumSection: React.FC<CurriculumSectionProps> = ({ modules }) => {
  const [expanded, setExpanded] = useState<number | null>();

  return (
    <div className="py-24 px-4">
      <div className="text-center flex flex-col items-center justify-center max-w-4xl mx-auto">
        <div className="inline-flex mb-4 w-fit items-center px-4 py-2 rounded-full bg-accent border border-border backdrop-blur-sm">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">
            Curriculum
          </span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 text-foreground">
          Course Curriculum
        </h2>
        <p className="mb-12 text-muted-foreground md:text-lg">
          Comprehensive learning path designed by industry experts
        </p>
      </div>

      <motion.div
        className="max-w-5xl mx-auto flex flex-col gap-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {modules.map((module, index) => {
          const isExpanded = index === expanded;

          return (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-card border border-border rounded-2xl shadow-lg shadow-primary/5 overflow-hidden"
            >
              {}
              <motion.header
                initial={false}
                onClick={() => setExpanded(isExpanded ? null : index)}
                className={`flex justify-between items-center p-6 cursor-pointer transition-colors duration-300 ${
                  isExpanded ? "bg-accent" : "hover:bg-accent"
                }`}
              >
                <h3 className="text-xl font-bold text-foreground">
                  Module {index + 1}: {module.title}
                </h3>
                <div className="flex items-center gap-6">
                  <div className="hidden sm:flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{module.duration}</span>
                    <span>&bull;</span>
                    <span>{module.lessons} lessons</span>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <ChevronDown className="w-6 h-6 text-primary" />
                  </motion.div>
                </div>
              </motion.header>

              {}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.section
                    key="content"
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { opacity: 1, height: "auto" },
                      collapsed: { opacity: 0, height: 0 },
                    }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-4">
                      <p className="text-muted-foreground mb-6">
                        {module.description}
                      </p>
                      <ul className="space-y-3">
                        {module.topics.map((topic, topicIndex) => (
                          <li
                            key={topicIndex}
                            className="flex items-center gap-3"
                          >
                            <Check className="w-5 h-5 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.section>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default CurriculumSection;
