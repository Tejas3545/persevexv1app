// Comprehensive search index for all website pages
export interface SearchItem {
  id: string;
  title: string;
  description: string;
  path: string;
  category: string;
  keywords: string[];
}

export const searchIndex: SearchItem[] = [
  // Domain Categories (for browsing by domain)
  {
    id: "domain-management",
    title: "Management Courses",
    description: "Browse all Management and Commerce courses",
    path: "/explore-courses",
    category: "Management",
    keywords: ["management", "commerce", "business", "mba", "bba", "bcom", "m"],
  },
  {
    id: "domain-technical",
    title: "Computer Science Courses",
    description: "Browse all Technical and Computer Science courses",
    path: "/explore-courses",
    category: "Technical",
    keywords: ["technical", "computer", "science", "cse", "it", "software", "programming", "coding", "t", "c"],
  },
  {
    id: "domain-electronics",
    title: "Electronics Courses",
    description: "Browse all Electronics and Electrical courses",
    path: "/explore-courses",
    category: "Electronics",
    keywords: ["electronics", "electrical", "ece", "eee", "circuits", "e"],
  },
  {
    id: "domain-mechanical",
    title: "Mechanical Courses",
    description: "Browse all Mechanical Engineering courses",
    path: "/explore-courses",
    category: "Mechanical",
    keywords: ["mechanical", "engineering", "mech", "automobile", "manufacturing", "m"],
  },
  {
    id: "domain-civil",
    title: "Civil Engineering Courses",
    description: "Browse all Civil Engineering courses",
    path: "/explore-courses",
    category: "Civil",
    keywords: ["civil", "engineering", "construction", "structural", "architecture", "c"],
  },

  // Main Pages
  {
    id: "home",
    title: "Home",
    description: "Persevex homepage - Learn, grow, and build your career",
    path: "/",
    category: "Main",
    keywords: ["home", "main", "index", "landing"],
  },
  {
    id: "about",
    title: "About Us",
    description: "Learn about Persevex and our mission",
    path: "/about",
    category: "Main",
    keywords: ["about", "mission", "vision", "company", "who we are"],
  },
  {
    id: "explore-courses",
    title: "Explore Courses",
    description: "Browse all available courses and programs",
    path: "/explore-courses",
    category: "Main",
    keywords: ["explore", "courses", "programs", "all courses", "browse"],
  },
  {
    id: "enroll",
    title: "Enroll Now",
    description: "Enroll in our programs and start learning",
    path: "/enroll",
    category: "Main",
    keywords: ["enroll", "register", "sign up", "join", "admission"],
  },
  {
    id: "campus-ambassador",
    title: "Campus Ambassador",
    description: "Become a Campus Ambassador",
    path: "/campus-ambassador",
    category: "Main",
    keywords: ["campus", "ambassador", "student", "representative", "program"],
  },
  {
    id: "support",
    title: "Support",
    description: "Get help and support",
    path: "/support",
    category: "Main",
    keywords: ["support", "help", "assistance", "ticket", "customer service"],
  },
  {
    id: "reviews",
    title: "Reviews",
    description: "Student reviews and testimonials",
    path: "/reviews",
    category: "Main",
    keywords: ["reviews", "testimonials", "feedback", "ratings", "student experience"],
  },
  {
    id: "careers",
    title: "Careers",
    description: "Join our team",
    path: "/careers",
    category: "Main",
    keywords: ["careers", "jobs", "opportunities", "hiring", "work with us"],
  },
  {
    id: "contact",
    title: "Contact Us",
    description: "Get in touch with us",
    path: "/contact",
    category: "Main",
    keywords: ["contact", "reach", "email", "phone", "address", "get in touch"],
  },
  {
    id: "job-portal",
    title: "Job Portal",
    description: "Find job opportunities",
    path: "/job-portal",
    category: "Main",
    keywords: ["job", "portal", "opportunities", "placements", "recruitment"],
  },
  {
    id: "blogs",
    title: "Blogs",
    description: "Read our latest articles and insights",
    path: "/blogs",
    category: "Main",
    keywords: ["blog", "articles", "news", "insights", "posts"],
  },
  {
    id: "fees",
    title: "Fees",
    description: "Course fees and payment information",
    path: "/fees",
    category: "Main",
    keywords: ["fees", "pricing", "cost", "payment", "tuition"],
  },
  {
    id: "internship",
    title: "Internship",
    description: "Internship opportunities and programs",
    path: "/internship",
    category: "Main",
    keywords: ["internship", "intern", "training", "work experience"],
  },
  {
    id: "add-projects",
    title: "Add Projects",
    description: "Submit your projects",
    path: "/add-projects",
    category: "Main",
    keywords: ["projects", "submit", "upload", "portfolio"],
  },

  // Technical Courses - CSE/IT
  {
    id: "web-development",
    title: "Full Stack Web Development",
    description: "Master full stack web development with modern technologies",
    path: "/courses/web-development",
    category: "Technical",
    keywords: ["web", "development", "fullstack", "full", "stack", "react", "node", "javascript", "frontend", "backend", "cse", "it", "computer", "w", "f"],
  },
  {
    id: "cloud-computing",
    title: "Cloud Computing",
    description: "Learn AWS, Azure, and modern cloud technologies",
    path: "/courses/cloud-computing",
    category: "Technical",
    keywords: ["cloud", "computing", "aws", "azure", "devops", "infrastructure", "server", "cse", "it", "computer", "c"],
  },
  {
    id: "machine-learning",
    title: "Machine Learning",
    description: "Master ML algorithms and applications",
    path: "/courses/machine-learning",
    category: "Technical",
    keywords: ["machine", "learning", "ml", "algorithms", "ai", "artificial", "data", "model", "cse", "it", "computer", "m"],
  },
  {
    id: "artificial-intelligence",
    title: "Artificial Intelligence",
    description: "Explore AI technologies and applications",
    path: "/courses/artificial-intelligence",
    category: "Technical",
    keywords: ["artificial", "intelligence", "ai", "deep", "learning", "neural", "networks", "chatgpt", "cse", "it", "computer", "a"],
  },
  {
    id: "data-science",
    title: "Data Science",
    description: "Analyze data and build predictive models",
    path: "/courses/data-science",
    category: "Technical",
    keywords: ["data", "science", "analytics", "statistics", "python", "visualization", "analysis", "cse", "it", "computer", "d"],
  },
  {
    id: "cybersecurity",
    title: "Cyber Security",
    description: "Learn security best practices and ethical hacking",
    path: "/courses/cybersecurity",
    category: "Technical",
    keywords: ["cyber", "security", "cybersecurity", "hacking", "ethical", "network", "protection", "infosec", "cse", "it", "computer", "c", "s"],
  },

  // Electronics and Electrical
  {
    id: "iot",
    title: "IoT (Internet of Things)",
    description: "Build connected devices and IoT systems",
    path: "/courses/iot",
    category: "Electronics",
    keywords: ["iot", "internet", "things", "connected", "devices", "sensors", "arduino", "raspberry", "electronics", "electrical", "i", "e"],
  },
  {
    id: "embedded-systems",
    title: "Embedded Systems",
    description: "Design and program embedded systems",
    path: "/courses/embedded-systems",
    category: "Electronics",
    keywords: ["embedded", "systems", "microcontroller", "programming", "hardware", "firmware", "electronics", "electrical", "e"],
  },
  {
    id: "vlsi-design",
    title: "VLSI Design",
    description: "Learn VLSI chip design and verification",
    path: "/courses/vlsi-design",
    category: "Electronics",
    keywords: ["vlsi", "chip", "design", "semiconductor", "verification", "ic", "circuit", "electronics", "electrical", "v"],
  },

  // Civil Courses
  {
    id: "autocad-civil",
    title: "AutoCAD: 2D & 3D Design (Civil)",
    description: "Master 2D drafting and 3D modeling with industry-standard design software for civil engineering",
    path: "/courses/autocad",
    category: "Civil",
    keywords: ["autocad", "cad", "design", "drafting", "civil", "drawing", "architectural", "floor", "plan", "site", "building", "construction", "2d", "3d", "a", "c"],
  },

  // Mechanical Courses
  {
    id: "autocad-mechanical",
    title: "AutoCAD (Mechanical)",
    description: "Master CAD design and drafting for mechanical engineering",
    path: "/courses/autocad",
    category: "Mechanical",
    keywords: ["autocad", "cad", "design", "drafting", "mechanical", "drawing", "parts", "assembly", "solidworks", "a", "m"],
  },
  {
    id: "drone-mechanics",
    title: "Drone Mechanics",
    description: "Learn drone assembly, operation and maintenance",
    path: "/courses/drone-mechanics",
    category: "Mechanical",
    keywords: ["drone", "drones", "uav", "mechanics", "assembly", "flight", "mechanical", "aerial", "quadcopter", "d", "m"],
  },
  {
    id: "hev",
    title: "HEVs (Hybrid Electric Vehicles)",
    description: "Understand hybrid and electric vehicle technology",
    path: "/courses/hev",
    category: "Mechanical",
    keywords: ["hev", "hybrid", "electric", "vehicle", "vehicles", "automotive", "car", "mechanical", "ev", "battery", "tesla", "h", "e", "m"],
  },

  // Management and Commerce Courses
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    description: "Master SEO, SEM, and social media marketing",
    path: "/courses/digital-marketing",
    category: "Management",
    keywords: ["digital", "marketing", "seo", "sem", "social", "media", "ads", "google", "facebook", "management", "commerce", "d", "m"],
  },
  {
    id: "human-resource",
    title: "Human Resources (HR)",
    description: "Learn HR management and strategies",
    path: "/courses/human-resource",
    category: "Management",
    keywords: ["hr", "human", "resource", "resources", "management", "recruitment", "talent", "hiring", "people", "commerce", "h"],
  },
  {
    id: "finance",
    title: "Finance",
    description: "Master financial management and analysis",
    path: "/courses/finance",
    category: "Management",
    keywords: ["finance", "financial", "accounting", "investment", "money", "banking", "management", "commerce", "f"],
  },
  {
    id: "logistics-supply-chain",
    title: "Logistics and Supply Chain",
    description: "Optimize logistics and supply chain operations",
    path: "/courses/logistics-supply-chain",
    category: "Management",
    keywords: ["logistics", "supply", "chain", "operations", "warehouse", "distribution", "shipping", "management", "commerce", "l", "s"],
  },
  {
    id: "business-analytics",
    title: "Business Analytics",
    description: "Analyze business data for better decisions",
    path: "/courses/business-analytics",
    category: "Management",
    keywords: ["business", "analytics", "data", "analysis", "insights", "reporting", "bi", "management", "commerce", "b", "a"],
  },
  {
    id: "stock-market-crypto",
    title: "Stock Market and Crypto Currency",
    description: "Learn trading and investment strategies",
    path: "/courses/stock-market-crypto",
    category: "Management",
    keywords: ["stock", "market", "crypto", "cryptocurrency", "bitcoin", "trading", "investment", "shares", "equity", "management", "commerce", "s", "c"],
  },

  // Job Guarantee Programs
  {
    id: "jgp-web-development",
    title: "Job Guarantee - Fullstack Development",
    description: "Guaranteed job placement in fullstack development",
    path: "/job-guarantee-program/web-development",
    category: "Job Guarantee",
    keywords: ["job", "guarantee", "placement", "fullstack", "web", "development"],
  },
  {
    id: "jgp-human-resource",
    title: "Job Guarantee - Human Resources",
    description: "Guaranteed job placement in HR",
    path: "/job-guarantee-program/human-resource",
    category: "Job Guarantee",
    keywords: ["job", "guarantee", "placement", "hr", "human", "resource"],
  },
  {
    id: "jgp-digital-marketing",
    title: "Job Guarantee - Digital Marketing",
    description: "Guaranteed job placement in digital marketing",
    path: "/job-guarantee-program/digital-marketing",
    category: "Job Guarantee",
    keywords: ["job", "guarantee", "placement", "digital", "marketing"],
  },

  // Policy Pages
  {
    id: "privacy-policy",
    title: "Privacy Policy",
    description: "Our privacy policy and data protection",
    path: "/privacy-policy",
    category: "Policy",
    keywords: ["privacy", "policy", "data", "protection", "gdpr"],
  },
  {
    id: "terms-conditions",
    title: "Terms & Conditions",
    description: "Terms and conditions of use",
    path: "/terms-&-conditions",
    category: "Policy",
    keywords: ["terms", "conditions", "agreement", "legal"],
  },
  {
    id: "refund-policy",
    title: "Refund Policy",
    description: "Course refund policy",
    path: "/refund-policy",
    category: "Policy",
    keywords: ["refund", "policy", "money back", "cancellation"],
  },
  {
    id: "return-policy",
    title: "Return Policy",
    description: "Product return policy",
    path: "/return-policy",
    category: "Policy",
    keywords: ["return", "policy", "exchange"],
  },
  {
    id: "data-deletion",
    title: "Data Deletion",
    description: "Request data deletion",
    path: "/data-deletion",
    category: "Policy",
    keywords: ["data", "deletion", "remove", "delete", "privacy"],
  },
];

// Helper function to search the index
export function searchPages(query: string): SearchItem[] {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const lowercaseQuery = query.toLowerCase().trim();
  
  return searchIndex.filter((item) => {
    // Search in title
    if (item.title.toLowerCase().includes(lowercaseQuery)) {
      return true;
    }
    // Search in description
    if (item.description.toLowerCase().includes(lowercaseQuery)) {
      return true;
    }
    // Search in keywords
    if (item.keywords.some((keyword) => keyword.toLowerCase().includes(lowercaseQuery))) {
      return true;
    }
    // Search in category
    if (item.category.toLowerCase().includes(lowercaseQuery)) {
      return true;
    }
    return false;
  }).sort((a, b) => {
    // Prioritize title matches
    const aInTitle = a.title.toLowerCase().startsWith(lowercaseQuery);
    const bInTitle = b.title.toLowerCase().startsWith(lowercaseQuery);
    
    if (aInTitle && !bInTitle) return -1;
    if (!aInTitle && bInTitle) return 1;
    
    return a.title.localeCompare(b.title);
  });
}
