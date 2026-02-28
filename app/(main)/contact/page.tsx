"use client";
import React, { Suspense, useState, useRef, FormEvent } from "react";
import Link from "next/link";
import Toast from "@/app/components/Toast";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyAYwB174Qk9X9nJYWIAiRC81NkYJOgLJOjJtu9txvHmeaVlz0HraJdPGfgEQwYRfaToQ/exec";

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    isVisible: boolean;
    message: string;
    type: "success" | "error";
  }>({ isVisible: false, message: "", type: "success" });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);

    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.result === "success") {
        setToast({
          isVisible: true,
          message: "Thank you for your message! We will get back to you soon.",
          type: "success",
        });
        formRef.current?.reset();
      } else {
        throw new Error(result.message || "An unknown error occurred.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to send message. Please try again later.";
      setToast({
        isVisible: true,
        message: errorMessage,
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen w-full text-foreground bg-background overflow-x-hidden">
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-2 md:px-6 py-24 sm:py-32">
        <div className="bg-card/20 backdrop-blur-md border border-border rounded-2xl p-6 md:p-12 overflow-hidden">
          {}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Get in Touch
            </h1>
            <p className="text-muted-foreground mt-4 text-lg">
              We'd love to hear from you. Send us a message or reach out via
              email.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            {}
            <div className="flex flex-col justify-center space-y-8">
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-foreground">
                  Contact Information
                </h2>
                <p className="text-muted-foreground">
                  Have questions about our courses, partnerships, or need
                  support? Reach out to the Persevex team directly.
                </p>

                <div className="space-y-4 mt-6">
                  {}
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-background rounded-lg border border-border text-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Email</p>
                      <a
                        href="mailto:support@persevex.com"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        support@persevex.com
                      </a>
                    </div>
                  </div>

                  {}
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-background rounded-lg border border-border text-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S12 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S12 3 12 3m0-18a9 9 0 018.716 6.747M12 3a9 9 0 00-8.716 6.747M12 3v18"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Website</p>
                      <a
                        href="https://www.persevex.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        www.persevex.com
                      </a>
                    </div>
                  </div>

                  {}
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-background rounded-lg border border-border text-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Office</p>
                      <p className="text-muted-foreground">
                        Bangalore, Karnataka, India
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {}
            <div className="bg-background border border-border rounded-2xl p-6 md:p-8">
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                {}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium text-muted-foreground"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      placeholder="John Doe"
                      className="w-full bg-card/20 border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-muted-foreground"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      placeholder="john@example.com"
                      className="w-full bg-card/20 border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>

                {}
                <div className="space-y-2">
                  <label
                    htmlFor="phone"
                    className="text-sm font-medium text-muted-foreground"
                  >
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    placeholder="+1 (555) 123-4567"
                    className="w-full bg-card/20 border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                {}
                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-muted-foreground"
                  >
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    required
                    rows={4}
                    placeholder="How can we help you achieve your goals?"
                    className="w-full bg-card/20 border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted focus:outline-none focus:border-primary transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full font-semibold rounded-xl px-6 py-4 text-primary-foreground transition-all duration-300 flex items-center justify-center
                    ${
                      isSubmitting
                        ? "bg-muted cursor-not-allowed"
                        : "bg-primary hover:bg-primary/90"
                    }
                  `}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5 text-foreground"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>
          </div>

          <div className="w-full flex items-center justify-center mt-16">
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4 cursor-pointer"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
