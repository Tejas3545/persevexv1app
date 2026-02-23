"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight, FiLinkedin, FiExternalLink } from "react-icons/fi";

interface LinkedInReview {
  name: string;
  title: string;
  company: string;
  image: string;
  quote: string;
  linkedinUrl?: string;
  rating: number;
  date: string;
}

const linkedInReviews: LinkedInReview[] = [
  {
    name: "Pramod C A",
    title: "AI/ML Engineer",
    company: "Infosys",
    image: "/c2.webp",
    quote:
      "Persevex's Artificial Intelligence course helped me shift careers confidently. The hands-on projects, live sessions, and mentor support made learning enjoyable and effective. I now build and deploy AI models independently. Highly recommend to anyone looking to break into AI!",
    linkedinUrl: "https://www.linkedin.com/company/persevex/",
    rating: 5,
    date: "Jan 2025",
  },
  {
    name: "Samarth M N",
    title: "Data Scientist",
    company: "Cognizant",
    image: "/c4.webp",
    quote:
      "Persevex's internship and training in data science gave me hands-on experience and the technical skills needed to succeed in the field. If you're aiming to upskill and gain real-world exposure, this is the place to start. The mentors are incredibly supportive.",
    linkedinUrl: "https://www.linkedin.com/company/persevex/",
    rating: 5,
    date: "Dec 2024",
  },
  {
    name: "Ravi K",
    title: "Financial Analyst",
    company: "Xavier's Institute",
    image: "/c3.webp",
    quote:
      "The Finance program at Persevex helped me land a role as an Analyst. The learning was top-notch, the internship was valuable, and the support was great throughout. Highly recommended for anyone serious about finance.",
    linkedinUrl: "https://www.linkedin.com/company/persevex/",
    rating: 5,
    date: "Nov 2024",
  },
  {
    name: "Virat S R",
    title: "HR Manager",
    company: "PurpleMerit",
    image: "/c5.webp",
    quote:
      "Persevex's HR course helped me improve my understanding of people management and workplace dynamics. Their structured content and helpful mentors gave me a clear path to grow in my HR career. The certificate added great value to my profile.",
    linkedinUrl: "https://www.linkedin.com/company/persevex/",
    rating: 5,
    date: "Oct 2024",
  },
  {
    name: "Aryan Mehta",
    title: "Digital Marketing Strategist",
    company: "EY",
    image: "/c6.webp",
    quote:
      "Joined Persevex's Digital Marketing course and it exceeded my expectations. From SEO to social media strategy, everything was taught in-depth and practically. I'm now working as a marketing strategist and it's all thanks to the solid foundation built here.",
    linkedinUrl: "https://www.linkedin.com/company/persevex/",
    rating: 5,
    date: "Sep 2024",
  },
  {
    name: "David K",
    title: "Portfolio Manager",
    company: "Goldman Sachs",
    image: "/c2.webp",
    quote:
      "The Portfolio Management course provided me with a structured approach to asset allocation and risk management. My clients have seen consistent returns even in volatile markets. The curriculum is world-class and the mentors are industry veterans.",
    linkedinUrl: "https://www.linkedin.com/company/persevex/",
    rating: 5,
    date: "Aug 2024",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const visibleCount = 3;
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + 1 >= linkedInReviews.length - visibleCount + 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(linkedInReviews.length - visibleCount, 0) : prev - 1
    );
  };

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(nextSlide, 4000);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying, currentIndex]);

  const visibleReviews = linkedInReviews.slice(
    currentIndex,
    currentIndex + visibleCount
  );

  // Handle wrap-around
  const displayReviews =
    visibleReviews.length < visibleCount
      ? [
        ...visibleReviews,
        ...linkedInReviews.slice(0, visibleCount - visibleReviews.length),
      ]
      : visibleReviews;

  return (
    <section className="section-padding bg-slate-50 dark:bg-card" id="testimonials">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-3"
          >
            LinkedIn Reviews
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.1 }}
            className="section-title text-foreground mb-4"
          >
            What Our <span className="gradient-text-blue">Students Say</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.2 }}
            className="section-subtitle mx-auto"
          >
            Real reviews from our students on LinkedIn. Verified experiences
            from professionals who transformed their careers with Persevex.
          </motion.p>

          {/* LinkedIn badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-2 mt-4"
          >
            <FiLinkedin size={18} className="text-[#0077B5]" />
            <span className="text-sm text-muted-foreground">
              Verified LinkedIn Reviews
            </span>
          </motion.div>
        </div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card border border-border shadow-sm items-center justify-center text-muted-foreground hover:bg-accent hover:text-primary transition-colors hidden md:flex cursor-pointer"
            aria-label="Previous review"
          >
            <FiChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card border border-border shadow-sm items-center justify-center text-muted-foreground hover:bg-accent hover:text-primary transition-colors hidden md:flex cursor-pointer"
            aria-label="Next review"
          >
            <FiChevronRight size={20} />
          </button>

          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.35 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {displayReviews.map((review, index) => (
                  <motion.div
                    key={`${review.name}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-card rounded-2xl border border-border p-6 card-hover flex flex-col"
                  >
                    {/* LinkedIn Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#0077B5]/30 shrink-0">
                          <Image
                            src={review.image}
                            alt={review.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-foreground">
                            {review.name}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {review.title}
                          </p>
                          <p className="text-xs text-primary font-medium">
                            {review.company}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <FiLinkedin size={18} className="text-[#0077B5]" />
                        {review.linkedinUrl && (
                          <a
                            href={review.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View ${review.name}'s LinkedIn profile`}
                            className="text-muted-foreground hover:text-primary transition-colors"
                          >
                            <FiExternalLink size={14} />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center justify-between mb-3">
                      <StarRating rating={review.rating} />
                      <span className="text-xs text-muted-foreground">
                        {review.date}
                      </span>
                    </div>

                    {/* Quote */}
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-5">
                      &ldquo;{review.quote}&rdquo;
                    </p>

                    {/* LinkedIn CTA */}
                    <div className="mt-4 pt-4 border-t border-border">
                      <a
                        href={review.linkedinUrl || "https://www.linkedin.com/company/persevex/"}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${review.name}'s review on LinkedIn`}
                        className="flex items-center gap-2 text-xs text-[#0077B5] hover:underline font-medium"
                      >
                        <FiLinkedin size={12} />
                        View on LinkedIn
                      </a>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({
              length: linkedInReviews.length - visibleCount + 1,
            }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${currentIndex === i
                  ? "bg-primary w-6"
                  : "bg-muted hover:bg-muted-foreground/50 w-2"
                  }`}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* LinkedIn CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <a
            href="https://www.linkedin.com/company/persevex/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#0077B5]/30 text-[#0077B5] hover:bg-[#0077B5]/10 transition-colors text-sm font-semibold"
          >
            <FiLinkedin size={16} />
            Follow us on LinkedIn
          </a>
        </motion.div>
      </div>
    </section>
  );
}
