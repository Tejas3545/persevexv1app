# Comprehensive Development & UI/UX Blueprint: Persevex Website Optimization

**Reference Standard:** Aptisure (aptisure.com)

**Objective:** To completely overhaul the Persevex website to achieve a modern, professional, and clean aesthetic, acting as an exact structural and experiential replica of Aptisure, with specific brand customizations.

---

## 1. Global Navigation & Header Adjustments

The navigation must be overhauled for better branding, precise routing, and responsive interaction.

### Logo Refinement

- Remove the redundant text ("persevex") currently typed next to the logo.
- Edit the main logo asset: Remove its sub-heading, enlarge the logo itself, and rely solely on the text embedded within the logo image for brand identity.

### Navigation Links

- Use only the exact links present in the Aptisure navigation bar.
- **Crucial Routing Fix:** Change the architecture from single-page scroll (`scrollTo`) to separate, dedicated pages for each section link in the navbar to match Aptisure's site architecture.

### Programs Dropdown Menu

- **Bug Fix:** Fix the issue where the dropdown menu is cut off from the left edge of the screen.
- **Interaction:** Replicate the exact hover state, transitions, and layout of the Aptisure "Programs" dropdown.

### Search Bar Functionality

- Make the domain search bar fully functional. It must immediately open a dynamic dropdown showing relevant results as the user types their query, directly mirroring the Aptisure search experience.

---

## 2. Homepage Section Sequence & Customizations

The homepage must follow this exact sequence, replicating the layout, spacing, and design logic of Aptisure, with the following customized data.

### 1. Hero Section

- **Fixes:** Recalculate padding to ensure elements are perfectly centered. Adjust the right-side design element—currently, it looks faint and off-center. Make it prominent, clean, and perfectly aligned.

### 2. Learn from the Expert Section

- Include a clean, minimal company carousel.
- Maintain the exact heading and subheading hierarchy from Aptisure.

### 3. Recognition Section

- Exact replica of Aptisure.

### 4. Security Section (Customized)

- Use a two-row alternate moving carousel.
- **Permitted Logos Only:** AWS, Cashfree, Razorpay, Google Cloud, Meta, and Gemini. (Ensure these are high-quality, official vector logos).

### 5. From Enrolment to Portfolio Proof Section

- Exact replica of Aptisure.

### 6. Alumni Network Section

- Exact replica of Aptisure.

### 7. Testimonial Section

- Exact replica of Aptisure.

### 8. Certification Section

- Exact replica of Aptisure.

### 9. Launch Price Section (Customized Tiers)

**Tier 1 (₹6,999):**
- Remove: "Top performers: 100% fee return"
- Remove: "AI-powered LMS + mobile app support"

**Tier 2 (₹8,999):**
- Remove: "Top performers: 100% fee return"
- Remove: "AI-powered LMS + mobile app"
- Add: "Resume Builder"
- Add: "ATS Checker"
- Add: "Placement Support"

> **Note:** Keep all other styling, features, and layout exactly the same as the Aptisure pricing section.

### 10. FAQ Section

- Replicate the exact design and questions/answers of Aptisure, but globally replace the word "Aptisure" with "Persevex".

---

## 3. Dedicated Pages & Feature Overhauls

Beyond the homepage, specific pages and sections require deep overhauls to ensure exact parity with the reference site.

### A. Individual Domain Pages

- **Layout Re-design:** Redesign every single domain page to be an exact replica of Aptisure's domain pages.
- **Project Cards:** Remove all images from the project cards. Replicate the text-based, clean aesthetic that Aptisure uses for its projects. Apply this universally across all domain pages.

### B. Campus Ambassador Section

- **Current State:** Empty.
- **Required Update:** Build a full-page replica of Aptisure's Campus Ambassador section.
- **Form Integration:** Include the detailed application form.
- **Code Architecture:** Write clean, modular, and heavily commented code for the form submission handler. It must be prepared to easily accept a Google Sheets Webhook/Embed URL in the near future so that data flows directly into a spreadsheet.

### C. Reviews Page

- Build a dedicated, standalone Reviews page that acts as a top-to-bottom replica of Aptisure's review page.
- **Required Elements:** Properly spaced testimonials, an outcome section, and other supporting elements.
- **Company Carousel Fix:** The company carousel in the existing reviews section is fainted and visually unappealing. Increase the opacity, fix the contrast, and ensure the logos pop cleanly against the background.

### D. Careers Page

- Build a dedicated Careers section/page mirroring the exact layout, styling, and flow of Aptisure's Careers page.

### E. LMS Access Flow & Registration Form

When a user attempts to access the LMS section, they must be intercepted by a Lead/Access Registration Form before gaining entry, replicating Aptisure's flow.

#### Form UI/UX Requirements (Exact layout needed)

- **Header:** "Register or login" with secondary text "Minimal steps, Secure checkout." and a top-right "Login ↗" button.

**Plan Selection (Toggle cards):**
- Option 1: Advanced (₹4,500)
- Option 2: Foundation (₹3,500)

**Payment Selection (Toggle cards):**
- Option 1: Reserve seat (₹1,500 now) *(Note: Custom adjusted from ₹1,000)*
- Option 2: Pay in full (dynamically showing the price based on the selected plan)

**Form Input Fields:**
- Full name
- Phone (with country code selector, e.g., IN +91)
- Email address
- College name

**Footer/Checkout:**
- Terms agreement text: "By signing up, you agree to our T&C and Privacy Policy"
- **Dynamic Call-to-Action Button:** E.g., "Pay ₹1,500 • Reserve seat" (updating dynamically based on the payment option selected)
- Trust badge text below button: "Secure checkout • Instant access"

#### Authentication, Routing & Cookie Logic (Crucial)

- **Post-Submission Redirect:** Immediately upon successful form submission or login, redirect the user strictly to: `https://persevex.com/login/index.php`
- **Cookie Storage:** Once the user successfully logs in or registers, set a persistent authentication cookie (or local storage token) in their browser.
- **Bypass Logic for Returning Users:** Every time the "LMS" button is clicked, check for this cookie. If the cookie exists, completely bypass the Registration Form and route the user directly to `https://persevex.com/login/index.php`. They should only see the form on their very first visit/interaction.

---

## 4. Global Design, Asset & Quality Guidelines

To achieve the premium, modern, and professional look of Aptisure, the development team must adhere to the following strict guidelines:

- **No AI-Generated Assets:** Strictly prohibit the use of AI-generated SVGs, icons, or logos. They degrade the brand's trust and look unprofessional. Use clean, standardized open-source icon libraries (like Phosphor, Lucide, or standard brand SVGs) or professionally crafted vectors.
- **Animations:** All animations must be smooth, intentional, and performant. Replicate Aptisure's scroll-reveal, hover effects, and carousel speeds exactly. Do not over-animate; prioritize professional subtlety.
- **Spacing and Padding:** Pay meticulous attention to whitespace. Elements must not feel cramped. Standardize margins and paddings across sections to ensure a prominent, uncluttered user interface.
- **Component Visibility:** Ensure no text, logo, or design element is "faint" unless explicitly used as a watermark. High contrast and readability are top priorities.

---

## Executive Summary for Developer Handoff

1. Stop using single-page scroll links — build out individual pages mirroring Aptisure's architecture.
2. Scrub all AI-generated artwork and replace it with clean, professional SVGs.
3. Audit every section against Aptisure side-by-side. If it does not look like an exact replica in terms of layout, padding, and animation, it is not complete.
4. Apply the custom text/pricing data strictly as outlined in Section 2 (Launch Price carousels) and Section 3E (LMS Form with the ₹1,500 Reserve Seat modification, seamless redirection, and cookie bypass logic for returning users).
