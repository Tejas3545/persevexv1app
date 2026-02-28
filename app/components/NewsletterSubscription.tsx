"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Mail } from "lucide-react";

interface NewsletterSubscriptionProps {
  className?: string;
}

export default function NewsletterSubscription({ className = "" }: NewsletterSubscriptionProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Simulate API call - you can replace this with actual newsletter API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store in localStorage for persistence
      localStorage.setItem("newsletter_subscription", JSON.stringify({
        email: email,
        subscribedAt: new Date().toISOString()
      }));
      
      setIsSubscribed(true);
      setEmail("");
    } catch (error) {
      setError("Failed to subscribe. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubscribed) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg ${className}`}
      >
        <div className="flex-shrink-0">
          <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <p className="text-sm font-medium text-green-800 dark:text-green-300">
            Successfully subscribed!
          </p>
          <p className="text-xs text-green-600 dark:text-green-400">
            Thank you for joining our newsletter. You'll receive updates on new courses and opportunities.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className={className}>
      <div className="mb-4">
        <h4 className="text-sm font-bold uppercase tracking-wider mb-2 text-foreground flex items-center gap-2">
          <Mail className="w-4 h-4" />
          STAY UPDATED
        </h4>
        <p className="text-xs text-muted-foreground">
          Get the latest updates on new courses, opportunities, and career insights.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            disabled={isSubmitting}
          />
          {error && (
            <p className="text-xs text-red-500 mt-1">{error}</p>
          )}
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
    </div>
  );
}