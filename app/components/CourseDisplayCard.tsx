"use client";

import Link from "next/link";
import React from "react";
import { CourseType } from "../constants/courseConstant"; 
import { ArrowRight } from "lucide-react";

const CourseDisplayCard = ({ course }: { course: CourseType }) => {
    const Icon = course.icon;

    return (
        <Link href={course.route} className="block h-full">
            <div className="group relative flex flex-col h-full bg-card rounded-2xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 overflow-hidden">
                
                {/* Top Accent Line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="p-6 flex flex-col flex-grow">
                    {/* Header: Icon & Tag */}
                    <div className="flex items-start justify-between mb-6">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                            <Icon className="w-6 h-6" />
                        </div>
                        <span className="px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full">
                            Program
                        </span>
                    </div>

                    {/* Content */}
                    <div className="flex-grow space-y-3">
                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                            {course.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                            {course.description}
                        </p>
                    </div>

                    {/* Footer */}
                    <div className="pt-6 mt-6 border-t border-border flex items-center justify-between">
                        <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                            Explore Program
                        </span>
                        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300 text-muted-foreground">
                            <ArrowRight className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default CourseDisplayCard;
