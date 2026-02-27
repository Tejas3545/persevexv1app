"use client";
import React, { Suspense, useState, useRef, FormEvent } from "react";
import Link from "next/link";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxm6EgvULajFkzgPLX0KBKtMWxPseoQCuKEQQ4XArlwE4vPQXWleIRnmj9zMskF46pc/exec";

export default function EnrollPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

      if (result.status === "success") {
        alert("Registration successful! Welcome aboard.");
        formRef.current?.reset();
      } else {
        throw new Error("Submission failed via server response.");
      }
    } catch (error) {
      console.error("Form submission error:", error);

      alert(
        "Note: If the page didn't redirect, please check your connection. (Error: Submission failed)",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen w-full text-foreground bg-background overflow-x-hidden">
      {}
      

      <div className="relative z-10 w-full max-w-6xl mx-auto px-2 md:px-6 md:py-12 sm:py-32">
        <div className="bg-card/20 backdrop-blur-md border border-border rounded-2xl p-6 md:p-6 overflow-hidden">
          {}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl p-4 font-bold text-foreground">
              Student Registration
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Take the next step in your career. Fill out the form below to
              enroll in our programs.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            {}
            <div className="flex flex-col justify-center space-y-8">
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-foreground">
                  Why Enroll With Us?
                </h2>
                <p className="text-muted-foreground">
                  Join a community of innovators. Our curriculum is designed to
                  bridge the gap between academic theory and industry
                  application.
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
                          d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.499 5.24 50.552 50.552 0 00-2.658.813m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        Expert Mentorship
                      </p>
                      <p className="text-muted-foreground text-sm">
                        Learn directly from industry professionals working in
                        top tech domains.
                      </p>
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
                          d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        Hands-on Projects
                      </p>
                      <p className="text-muted-foreground text-sm">
                        Build real-world applications in AI, IoT, Web Dev, and
                        more.
                      </p>
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
                          d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Certification</p>
                      <p className="text-muted-foreground text-sm">
                        Earn a recognized certificate upon successful completion
                        of your domain.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {}
            <div className="bg-background border border-border rounded-2xl p-6 md:p-8">
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                {}
                <div className="space-y-2">
                  <label
                    htmlFor="studentName"
                    className="text-sm font-medium text-muted-foreground"
                  >
                    Student Name
                  </label>
                  <input
                    type="text"
                    name="studentName"
                    id="studentName"
                    required
                    placeholder="Enter your full name"
                    className="w-full bg-card/20 border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                {}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label
                      htmlFor="studentPhone"
                      className="text-sm font-medium text-muted-foreground"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="studentPhone"
                      id="studentPhone"
                      required
                      placeholder="Your mobile number"
                      className="w-full bg-card/20 border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="studentEmail"
                      className="text-sm font-medium text-muted-foreground"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="studentEmail"
                      id="studentEmail"
                      required
                      placeholder="email@example.com"
                      className="w-full bg-card/20 border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>

                {}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label
                      htmlFor="collegeName"
                      className="text-sm font-medium text-muted-foreground"
                    >
                      College Name
                    </label>
                    <input
                      type="text"
                      name="collegeName"
                      id="collegeName"
                      required
                      placeholder="University/Institute Name"
                      className="w-full bg-card/20 border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="yearOfPassout"
                      className="text-sm font-medium text-muted-foreground"
                    >
                      Year of Passout
                    </label>
                    <select
                      name="yearOfPassout"
                      id="yearOfPassout"
                      required
                      className="w-full bg-card/20 border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors appearance-none [&>option]:bg-card [&>option]:text-foreground"
                    >
                      <option value="" className="bg-card text-muted-foreground">
                        Select Year
                      </option>
                      <option value="2027" className="bg-card text-foreground">
                        2027
                      </option>
                      <option value="2028" className="bg-card text-foreground">
                        2028
                      </option>
                      <option value="2029" className="bg-card text-foreground">
                        2029
                      </option>
                      <option value="2030" className="bg-card text-foreground">
                        2030
                      </option>
                    </select>
                  </div>
                </div>

                {}
                <div className="space-y-2">
                  <label
                    htmlFor="domain"
                    className="text-sm font-medium text-muted-foreground"
                  >
                    Interested Domain
                  </label>
                  <select
                    name="domain"
                    id="domain"
                    required
                    className="w-full bg-card/20 border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors appearance-none [&>option]:bg-card [&>option]:text-foreground"
                  >
                    <option value="" className="bg-card text-muted-foreground">
                      Select Domain
                    </option>
                    <option value="AI" className="bg-card text-foreground">
                      AI
                    </option>
                    <option value="ML" className="bg-card text-foreground">
                      ML
                    </option>
                    <option
                      value="Data Science"
                      className="bg-card text-foreground"
                    >
                      Data Science
                    </option>
                    <option
                      value="Web Development"
                      className="bg-card text-foreground"
                    >
                      Web Development
                    </option>
                    <option
                      value="Cybersecurity"
                      className="bg-card text-foreground"
                    >
                      Cybersecurity
                    </option>
                    <option
                      value="Cloud Computing"
                      className="bg-card text-foreground"
                    >
                      Cloud Computing
                    </option>
                    <option
                      value="Embedded System"
                      className="bg-card text-foreground"
                    >
                      Embedded System
                    </option>
                    <option value="IOT" className="bg-card text-foreground">
                      IOT
                    </option>
                    <option value="AutoCAD" className="bg-card text-foreground">
                      AutoCAD
                    </option>
                    <option
                      value="Drone Mechanics"
                      className="bg-card text-foreground"
                    >
                      Drone Mechanics
                    </option>
                    <option value="VLSI" className="bg-card text-foreground">
                      VLSI
                    </option>
                    <option
                      value="Logistics and Supply Chain"
                      className="bg-card text-foreground"
                    >
                      Logistics and Supply Chain
                    </option>
                    <option value="Finance" className="bg-card text-foreground">
                      Finance
                    </option>
                    <option
                      value="Stock Market & Crypto Trading"
                      className="bg-card text-foreground"
                    >
                      Stock Market & Crypto Trading
                    </option>
                    <option
                      value="Digital Marketing"
                      className="bg-card text-foreground"
                    >
                      Digital Marketing
                    </option>
                    <option
                      value="Human Resource"
                      className="bg-card text-foreground"
                    >
                      Human Resource
                    </option>
                  </select>
                </div>

                {}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full font-semibold rounded-xl px-6 py-4 text-primary-foreground transition-all duration-300 flex items-center justify-center mt-2
                    ${
                      isSubmitting
                        ? "bg-muted cursor-not-allowed"
                        : "bg-primary hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
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
                      Submitting...
                    </span>
                  ) : (
                    "Complete Registration"
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
