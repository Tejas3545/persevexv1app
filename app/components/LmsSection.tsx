"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiShield, FiCpu, FiDatabase, FiLock, FiServer, FiCloud } from "react-icons/fi";

const features = [
  {
    title: "Enterprise-Grade Security",
    description: "Bank-level encryption and secure data handling to protect your learning progress and personal information.",
    icon: <FiShield size={24} />,
  },
  {
    title: "AI-Powered Learning",
    description: "Smart algorithms adapt to your learning pace, providing personalized recommendations and instant feedback.",
    icon: <FiCpu size={24} />,
  },
  {
    title: "Cloud Infrastructure",
    description: "Built on robust cloud architecture ensuring 99.9% uptime and seamless access from any device, anywhere.",
    icon: <FiCloud size={24} />,
  },
  {
    title: "Real-time Analytics",
    description: "Track your progress with detailed analytics, performance metrics, and skill gap analysis.",
    icon: <FiDatabase size={24} />,
  },
];

export default function LmsSection() {
  return (
    <section className="section-padding bg-white dark:bg-[#000000] relative overflow-hidden border-t border-border/50">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/5 dark:bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] bg-[radial-gradient(circle,#000_1px,transparent_1px)] dark:bg-[radial-gradient(circle,#fff_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6"
            >
              <FiServer size={16} />
              <span>Next-Gen LMS Platform</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight"
            >
              Enterprise-Grade. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                Secure & Reliable.
              </span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground mb-10 leading-relaxed"
            >
              Experience learning on a platform built with the same technologies that power the world's leading tech companies. Fast, secure, and designed for scale.
            </motion.p>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex flex-col gap-3"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="mt-12"
            >
              <a
                href="https://lms.persevex.com/login/index.php"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-primary hover:bg-primary/90 rounded-full transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1"
              >
                Access LMS Portal
              </a>
            </motion.div>
          </div>

          {/* Right Content - Tech Stack Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="aspect-square rounded-full border border-border/50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%]" />
            <div className="aspect-square rounded-full border border-border/30 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%]" />
            
            <div className="relative bg-card border border-border rounded-2xl p-8 shadow-2xl backdrop-blur-sm z-10">
              <div className="flex items-center justify-between mb-8 border-b border-border pb-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="text-xs font-mono text-muted-foreground bg-muted px-3 py-1 rounded-full">
                  lms.persevex.com
                </div>
              </div>
              
              <div className="space-y-6">
                {[
                  { label: "System Status", value: "Operational", color: "text-green-500" },
                  { label: "Uptime", value: "99.99%", color: "text-primary" },
                  { label: "Active Learners", value: "10,000+", color: "text-foreground" },
                  { label: "Security Level", value: "Enterprise", color: "text-purple-500" },
                ].map((stat, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-muted-foreground font-medium">{stat.label}</span>
                    <span className={`font-bold ${stat.color}`}>{stat.value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <div className="flex items-center justify-center gap-6 text-muted-foreground">
                  <FiLock size={24} className="hover:text-primary transition-colors" />
                  <FiDatabase size={24} className="hover:text-primary transition-colors" />
                  <FiCloud size={24} className="hover:text-primary transition-colors" />
                  <FiShield size={24} className="hover:text-primary transition-colors" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
