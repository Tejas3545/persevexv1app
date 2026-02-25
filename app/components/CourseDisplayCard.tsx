"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CourseType } from "../constants/courseConstant"; 

const CourseDisplayCard = ({ course }: { course: CourseType }) => {
    const Icon = course.icon;

    return (
        <div className="relative flex-shrink-0 w-full max-w-sm mx-auto rounded-xl overflow-hidden 
                       bg-card/90 backdrop-blur-md border border-border
                       transition-all duration-700 ease-out
                       hover:shadow-2xl hover:shadow-accent/25
                       hover:border-accent/50 hover:bg-background/90
                       hover:-translate-y-2 hover:scale-[1.02]
                       group cursor-pointer">
            
            {/* Icon Container */}
            <div className="relative w-full p-6 pb-0 flex items-center justify-start">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-2">
                    <Icon className="w-6 h-6" />
                </div>
            </div>

            {/* Content Container */}
            <div className="relative p-6 pt-4 space-y-3">
                {/* Title */}
                <h3 className="text-lg font-bold text-foreground mb-2 
                               leading-tight tracking-wide
                               group-hover:text-accent transition-colors duration-300">
                    {course.title}
                </h3>
                
                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed 
                              line-clamp-3 group-hover:text-muted-foreground transition-colors duration-300">
                    {course.description}
                </p>

                {/* Bottom Section */}
                <div className="flex items-center justify-between pt-3 border-t border-border">
                    <Link 
                        href={course.route}
                        className="inline-flex items-center space-x-2 text-sm font-semibold 
                                   text-primary hover:text-accent transition-all duration-300
                                   group-hover:scale-105"
                    >
                        <span>View Course</span>
                        <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                             fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                  d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                    
                    {/* Decorative Element */}
                    <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                        <div className="w-1 h-1 bg-accent/60 rounded-full animate-pulse delay-100" />
                        <div className="w-1 h-1 bg-accent/30 rounded-full animate-pulse delay-200" />
                    </div>
                </div>

                {/* Subtle glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-accent to-accent 
                               rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10" />
            </div>
        </div>
    );
};

export default CourseDisplayCard;
