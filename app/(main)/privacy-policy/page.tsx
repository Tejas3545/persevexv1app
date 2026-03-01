"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiShield, FiDatabase, FiEye, FiUsers, FiLock, FiGlobe } from "react-icons/fi";

const sections = [
  {
    id: "overview",
    number: 1,
    title: "Overview",
    content: (
      <>
        <p>
          Thank you for choosing to be part of our community at <strong>PERSEVEX EDUCATION CONSULTANCY LLP</strong> (&quot;Company,&quot; &quot;We,&quot; &quot;Us,&quot; &quot;Persevex,&quot; or &quot;Our&quot;). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice or our practices with regard to your personal information, please contact us at{" "}
          <a href="mailto:support@persevex.com" className="text-primary hover:underline">support@persevex.com</a>.
        </p>
        <p className="mt-3">
          This privacy notice describes how we might use your information if you visit our website at{" "}
          <a href="https://www.persevex.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://www.persevex.com</a>{" "}
          or engage with us in other related ways — including any sales, marketing, or events.
        </p>
        <p className="mt-3">In this privacy notice, if we refer to:</p>
        <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
          <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span><strong>&quot;Website&quot;</strong> — any website of ours that references or links to this policy</span></li>
          <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span><strong>&quot;Platform&quot;</strong> — the Website/Domain created by the Company which provides the Client to avail services through the use of the platform</span></li>
          <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span><strong>&quot;Services&quot;</strong> — our Website, and other related services, including any sales, marketing, or events</span></li>
          <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span><strong>&quot;You&quot;</strong> — natural and legal individuals who use the Platform and who are competent to enter into binding contracts</span></li>
          <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span><strong>&quot;Third Parties&quot;</strong> — any Application, Company or individual apart from the User, Vendor and the creator of this Application</span></li>
        </ul>
        <p className="mt-3">
          By visiting this Platform, providing your information or availing our product/service, you expressly agree to be bound by the terms and conditions of this Privacy Policy, the{" "}
          <Link href="/terms-&-conditions" className="text-primary hover:underline">Terms of Use</Link> and the applicable service/product terms and conditions.
        </p>
      </>
    ),
  },
  {
    id: "applicability",
    number: 2,
    title: "Applicability",
    content: (
      <p>
        This privacy policy (&quot;Policy&quot;) describes our policies and procedures on the collection, use, storage and disclosure of any information including, business or personal information provided by you while using our Website.
      </p>
    ),
  },
  {
    id: "information-collected",
    number: 3,
    title: "What Information Do We Collect?",
    content: (
      <>
        <p>
          Persevex collects personal information that you voluntarily provide to us when you register on the Website, express an interest in obtaining information about us or our products and services, when you participate in activities on the Website or otherwise when you contact us.
        </p>
        <p className="mt-3">
          The personal information we collect may include: Name, Email Id, Mobile number, Institution, Password, Age, Address, and similar identifiers.
        </p>
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800/30 rounded-xl">
          <p className="text-sm font-semibold text-blue-800 dark:text-blue-200 flex items-center gap-2">
            <FiDatabase className="w-4 h-4" />
            Payment Data
          </p>
          <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
            We may collect data necessary to process your payment if you make purchases, such as your payment instrument number (e.g. credit card number) and the security code associated with your payment instrument.
          </p>
        </div>
        <p className="mt-3">
          All personal information that you provide to us must be true, complete and accurate, and you must notify us of any changes. We retain this information as necessary to resolve disputes, provide customer support and troubleshoot problems as permitted by law.
        </p>
        <h4 className="text-sm font-bold text-foreground mt-4 mb-2">Information collected from other sources</h4>
        <p>
          We may obtain information about you from other sources, such as public databases, joint marketing partners, affiliate programs, data providers, as well as from other third parties. This information includes mailing addresses, job titles, email addresses, phone numbers, intent data, IP addresses, social media profiles, for purposes of targeted advertising and event promotion.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use",
    number: 4,
    title: "How Do We Use Your Information?",
    content: (
      <>
        <p>
          We use personal information collected via our Website for a variety of business purposes. We process your personal information in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
        </p>
        <p className="mt-3">We use the information we collect or receive:</p>
        <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
          <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span><strong>Account creation & logon</strong> — facilitate account creation, including linked third-party accounts</span></li>
          <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span><strong>Testimonials</strong> — post testimonials on our Website with your consent</span></li>
          <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span><strong>Feedback & improvement</strong> — request feedback and improve our Website</span></li>
          <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span><strong>Communications</strong> — enable user-to-user communications with consent</span></li>
          <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span><strong>Marketing</strong> — send promotional communications in accordance with your preferences</span></li>
          <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span><strong>Targeted advertising</strong> — develop and display personalized content tailored to your interests</span></li>
          <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span><strong>Legal obligations</strong> — comply with our legal and regulatory obligations</span></li>
        </ul>
        <p className="mt-3">
          We and our affiliates collect and analyse demographic and profile data about our users&apos; activity on our Platform. Your IP address is also used to help identify you and to gather broad demographic information.
        </p>
      </>
    ),
  },
  {
    id: "information-sharing",
    number: 5,
    title: "Will Your Information Be Shared?",
    content: (
      <>
        <p>
          We do not sell, rent, trade or exchange any personally identifying information of our users. We may provide the information to our affiliates and service providers under contract (such as customer care, data analytics) to support the operation of the Website and our Services.
        </p>
        <p className="mt-3">
          We may share your information with third parties with your prior consent. We may disclose your information to service providers involved in operating our business — including payment providers, third-party servers, email service providers and professionals such as accountants and lawyers.
        </p>
        <p className="mt-3">
          We reserve the right to disclose your personal information as required by law and when we believe in good faith that such disclosure is necessary to protect our rights, report suspected illegal activity, or comply with judicial proceedings.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    number: 6,
    title: "Cookies & Tracking Technologies",
    content: (
      <>
        <p>
          A &quot;Cookie&quot; is a small piece of information stored by a web server on a web browser so it can later be traced back from that particular browser. The Website places both permanent and temporary cookies in your computer&apos;s hard drive and web browser, and you hereby expressly consent to the same.
        </p>
        <p className="mt-3">
          The Website uses data collection devices such as cookies to help analyse web page flow, measure promotional effectiveness, and promote trust and safety. Certain features of the Website are only available through the use of such cookies. While you are free to decline cookies if your browser permits, you may consequently be unable to use certain features on the Website.
        </p>
        <p className="mt-3">
          You may encounter cookies or other similar devices on certain pages of the Website that are placed by third parties. The Company does not control the use of such cookies by third parties and is in no way responsible for the same.
        </p>
      </>
    ),
  },
  {
    id: "data-retention",
    number: 7,
    title: "Data Retention",
    content: (
      <>
        <p>
          We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law. No purpose in this notice will require us to keep your personal information for longer than the period of time in which users have an account with us.
        </p>
        <p className="mt-3">
          When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information. We may continue to retain your data in anonymised form for analytical and research purposes.
        </p>
      </>
    ),
  },
  {
    id: "your-choices",
    number: 8,
    title: "Your Choices About Your Information",
    content: (
      <>
        <p>
          You may decline to submit personally identifiable information through the Website, in which case Persevex may not be able to provide certain services to you. You may update or correct your account information at any time by logging in to your account. If you would like us to remove your personally identifiable information from our database, please send a request to{" "}
          <a href="mailto:support@persevex.com" className="text-primary hover:underline">support@persevex.com</a>.
        </p>
      </>
    ),
  },
  {
    id: "security",
    number: 9,
    title: "Security Precautions",
    content: (
      <p>
        We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure. Although we will do our best to protect your personal information, transmission of personal information to and from our Website is at your own risk.
      </p>
    ),
  },
  {
    id: "children",
    number: 10,
    title: "Children Information",
    content: (
      <p>
        We do not knowingly solicit or collect personal information from children under the age of 18. Use of our Platform is available only to persons who can form a legally binding contract under the Indian Contract Act, 1872. If you are under the age of 18, you must use the Platform under the supervision of your parent, legal guardian, or any responsible adult.
      </p>
    ),
  },
  {
    id: "consent",
    number: 11,
    title: "Your Consent",
    content: (
      <>
        <p>
          By visiting our Platform or providing your information, you consent to the collection, use, storage, disclosure and otherwise processing of your information (including sensitive personal information) on the Platform in accordance with this Privacy Policy.
        </p>
        <p className="mt-3">
          You consent to us (including our affiliates, lending partners, technology partners, marketing channels, business partners and other third parties) contacting you through SMS, instant messaging apps, call and/or e-mail for the purposes specified in this Privacy Policy.
        </p>
      </>
    ),
  },
  {
    id: "third-party-links",
    number: 12,
    title: "Links to Third Party Sites",
    content: (
      <p>
        Our Website may contain links to and from the websites of our partner networks, affiliates and other third parties. The inclusion of a link does not imply any endorsement. If you follow a link to any of these websites, please note that these websites may be governed by their own privacy policies and we disclaim all responsibility or liability. Please check these policies before you submit any information to these websites.
      </p>
    ),
  },
  {
    id: "do-not-track",
    number: 13,
    title: "Controls for Do-Not-Track Features",
    content: (
      <p>
        Most web browsers include a Do-Not-Track (&quot;DNT&quot;) feature or setting you can activate to signal your privacy preference. At this stage no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this privacy notice.
      </p>
    ),
  },
  {
    id: "governing-law",
    number: 14,
    title: "Governing Law & Dispute Resolution",
    content: (
      <p>
        This Policy shall be governed by and construed in accordance with the laws of India and the courts at Bengaluru, Karnataka shall have exclusive jurisdiction in relation to any disputes arising out of or in connection with this Policy.
      </p>
    ),
  },
  {
    id: "data-requests",
    number: 15,
    title: "Consent Withdrawal & Data Requests",
    content: (
      <p>
        To withdraw your consent, or to request the download or deletion of your data with us for any or all our products &amp; services at any time, please email{" "}
        <a href="mailto:support@persevex.com" className="text-primary hover:underline">support@persevex.com</a>.
      </p>
    ),
  },
  {
    id: "changes",
    number: 16,
    title: "Changes to This Privacy Policy",
    content: (
      <p>
        We may update this privacy notice from time to time. The updated version will be indicated by an updated &quot;Last updated&quot; date and will be effective as soon as it is accessible. If we make material changes, we may notify you by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this privacy notice frequently.
      </p>
    ),
  },
  {
    id: "contact",
    number: 17,
    title: "Contact Information",
    content: (
      <p>
        For any questions or concerns regarding this Privacy Policy, please contact <strong>PERSEVEX EDUCATION CONSULTANCY LLP</strong> at{" "}
        <a href="mailto:support@persevex.com" className="text-primary hover:underline">support@persevex.com</a>.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative py-20 bg-slate-50 dark:bg-card overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-0 -left-32 w-80 h-80 rounded-full bg-highlight/15 blur-3xl" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 border border-primary/20"
          >
            <FiShield className="w-3.5 h-3.5" />
            Your Data, Your Rights
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-foreground mb-4"
          >
            Privacy Policy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto text-base"
          >
            Last updated: February 2026
          </motion.p>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="border-b border-border bg-card">
        <div className="max-w-4xl mx-auto px-6 md:px-10 py-4">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">Quick navigation</p>
          <div className="flex flex-wrap gap-2">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="text-xs font-medium text-primary hover:underline px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10 transition-colors hover:bg-primary/10">
                {s.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white dark:bg-background">
        <div className="max-w-4xl mx-auto px-6 md:px-10 space-y-16">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              id={section.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.03 }}
              className="scroll-mt-24"
            >
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-3xl font-black text-blue-600 dark:text-primary/50">{section.number}</span>
                <h2 className="text-xl font-bold text-foreground">{section.title}</h2>
              </div>
              <div className="text-sm text-muted-foreground leading-relaxed">
                {section.content}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
