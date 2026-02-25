"use client";
import React, { Suspense } from "react";
import Link from "next/link";

export default function DataDeletionInstructionsPage() {
  return (
    <main className="relative min-h-screen w-full text-foreground bg-background overflow-x-hidden">
      

      <div className="relative z-10 w-full max-w-6xl mx-auto px-2 md:px-6 py-24 sm:py-32">
        <div className="bg-card/20 backdrop-blur-md border border-border rounded-2xl p-4 md:p-12">
          
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-white to-muted bg-clip-text text-transparent leading-tight">
              Data Deletion Instructions
            </h1>
            <h2 className="text-xl md:text-2xl font-semibold text-muted-foreground mt-2">
              Persevex Education Consultancy LLP
            </h2>
            <p className="text-muted-foreground italic mt-4">
              Last Updated: November 25, 2025
            </p>
          </div>
          <div className="prose prose-invert prose-lg max-w-none text-muted-foreground space-y-6">
            <p>
              At Persevex Education Consultancy LLP, we are committed to protecting the privacy and personal data of our users. In accordance with Meta (Facebook) Platform Policies, this page explains how users can request the deletion of their data collected through our applications, services, or integrations such as WhatsApp Business API.
            </p>

            <h3 className="text-foreground text-2xl font-semibold mt-8">1. What Data We Collect</h3>
            <p>Depending on the service you use, we may collect:</p>
            <ul className="list-disc list-outside pl-6 space-y-2">
              <li>Name, email address, or phone number</li>
              <li>Messages sent through WhatsApp automation systems</li>
              <li>Course enrollment details</li>
              <li>Contact information submitted on our website</li>
              <li>Any information manually provided by the user</li>
            </ul>
            <p className="text-muted-foreground italic">We never store unnecessary personal information.</p>

            <h3 className="text-foreground text-2xl font-semibold mt-8">2. Reasons We Store Data</h3>
            <p>We store data only for:</p>
            <ul className="list-disc list-outside pl-6 space-y-2">
              <li>Providing educational services</li>
              <li>Offering customer support</li>
              <li>Sending course updates</li>
              <li>Processing WhatsApp or API-based communication</li>
              <li>Internal analytics and reporting</li>
            </ul>
            <p className="text-muted-foreground italic">We never sell or misuse user data.</p>

            <h3 className="text-foreground text-2xl font-semibold mt-8">3. How to Request Data Deletion</h3>
            <p>If you wish to have your data deleted from our systems, you can make a request using any of the following methods:</p>

            <div className="pl-4 border-l-2 border-primary/50 space-y-6 my-6">
              <div>
                <strong className="text-foreground block text-xl mb-2">📧 Email Request</strong>
                <p className="mb-2">Send an email to: <a href="mailto:support@persevex.com" className="text-primary hover:text-primary/80 underline">support@persevex.com</a></p>
                <p className="mb-2">Subject line: <strong>“Request for Data Deletion”</strong></p>
                <p>Include the following:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Your full name</li>
                  <li>Registered phone number or email ID</li>
                  <li>Platform where you interacted with us (Website, WhatsApp, etc.)</li>
                </ul>
              </div>

              <div>
                <p>You can mail us on <a href="mailto:support@persevex.com" className="text-primary hover:text-primary/80 underline">support@persevex.com</a></p>
              </div>

              <div>
                <strong className="text-foreground block text-xl mb-2">🌐 Contact Form Submission</strong>
                <p>Submit your request through our website: <a href="/contact" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 underline">https://www.persevex.com/contact</a></p>
              </div>
            </div>

            <h3 className="text-foreground text-2xl font-semibold mt-8">4. What Happens After You Submit a Request</h3>
            <p>Once we receive your request:</p>
            <ul className="list-disc list-outside pl-6 space-y-2">
              <li>We will verify your identity.</li>
              <li>We will locate all your associated data.</li>
              <li>We will delete your data from our systems within <strong>7–15 working days</strong>.</li>
              <li>You will receive a confirmation message once the process is completed.</li>
            </ul>
            <p className="text-sm text-muted-foreground mt-2">
              *Some data may be retained if required by law (GST billing, financial records, etc.) but will not be used for any other purpose.
            </p>

            <h3 className="text-foreground text-2xl font-semibold mt-8">5. Contact Information</h3>
            <p>For any questions regarding data privacy or security, contact:</p>
            <div className="bg-background p-4 rounded-lg mt-2">
              <p className="font-semibold text-foreground">Persevex Education Consultancy LLP</p>
              <p>Email: <a href="mailto:support@persevex.com" className="text-primary hover:underline">support@persevex.com</a></p>
              <p>Website: <a href="https://www.persevex.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://www.persevex.com</a></p>
            </div>
          </div>

          <div className="w-full flex items-center justify-center">
            <Link 
              href="/?scrollTo=policy" 
              className="bg-primary hover:bg-primary/90 transition-colors duration-300 text-xl cursor-pointer rounded-2xl px-6 py-3 text-primary-foreground font-medium mt-24"
            >
              Back to policies
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
