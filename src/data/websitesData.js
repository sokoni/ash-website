export const WEBSITE_TEMPLATES = [
  {
    id: "belay-diagnostics",
    name: "Belay Diagnostics",
    tagline: "Genomic Science Digital Transformation & Growth Platform",
    category: "Healthcare / Biotech",
    role: "Digital Marketing Manager",
    rating: 5.0,
    reviewsCount: 64,
    challenge: "Communicate highly technical genomic science in ways physicians, researchers, patients, and commercial partners could quickly understand.",
    servicesProvided: [
      "Website Strategy",
      "Product Launches",
      "Content Marketing",
      "HubSpot Marketing Setup",
      "Marketing Automation",
      "Webinars",
      "SEO",
      "Analytics",
      "Sales Enablement",
      "Scientific Publications",
      "Conference Marketing",
      "Cross-functional Project Management"
    ],
    impact: [
      "Supported multiple product launches",
      "Created scalable marketing systems",
      "Improved commercial enablement",
      "Strengthened physician education"
    ],
    techStack: ["HubSpot Automation", "React", "SEO Architecture", "GA4 Analytics"],
    features: [
      "Website Strategy",
      "Product Launches",
      "HubSpot Automation",
      "SEO & Analytics",
      "Sales Enablement"
    ],
    description: "Communicate highly technical genomic science in ways physicians, researchers, patients, and commercial partners could quickly understand.",
    previewUrl: "https://example.com/preview/belay-diagnostics",
    bgGradient: "from-teal-900/60 to-slate-900/80",
    badge: "Featured Case Study",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "d-johnson-funeral-services",
    name: "D. Johnson Funeral Services",
    tagline: "Compassionate Digital Experience & Brand Elevation",
    category: "Funeral Services",
    role: "Brand & Web Strategist",
    rating: 4.9,
    reviewsCount: 42,
    challenge: "Create a modern digital experience reflecting compassion, professionalism, and trust.",
    servicesProvided: [
      "Website Strategy",
      "Website Design",
      "Content Strategy",
      "Brand Messaging",
      "Gallery Organization",
      "Contact Experience",
      "Social Assets"
    ],
    impact: [
      "Stronger online presence reflecting core values",
      "Improved site usability and client trust",
      "Streamlined family contact & consultation booking",
      "Enhanced digital brand credibility"
    ],
    techStack: ["Website Strategy", "Website Design", "Brand Messaging", "Content Strategy"],
    features: [
      "Website Strategy",
      "Website Design",
      "Content Strategy",
      "Brand Messaging",
      "Contact Experience"
    ],
    description: "Create a modern digital experience reflecting compassion, professionalism, and trust.",
    previewUrl: "https://example.com/preview/d-johnson-funeral-services",
    bgGradient: "from-[#0E1420] to-[#070A0F]",
    badge: "Case Study",
    badgeColor: "bg-[#A0C4FF]/20 text-[#A0C4FF] border-[#A0C4FF]/30",
    image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "web-aura-portfolio",
    name: "Aura Creative Portfolio",
    tagline: "Minimalist Modern Agency & Executive Portfolio",
    category: "Portfolio & Agency",
    rating: 5.0,
    reviewsCount: 29,
    techStack: ["React 18", "Vanilla CSS", "Smooth Scroll"],
    features: [
      "Grid & Masonry Project Showcase",
      "Interactive Case Study Pages",
      "Custom Contact & Inquiry Workflows",
      "Client Testimonial Layouts",
      "Ultra-Fast 100/100 Lighthouse Performance"
    ],
    description: "Designed for high-end agencies, executives, and creators looking for a signature digital presence that commands authority.",
    previewUrl: "https://example.com/preview/aura",
    bgGradient: "from-slate-800/60 to-slate-900/80",
    badge: "Top Rated",
    badgeColor: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    demoCode: `// Custom Agency Showcase
export function PortfolioGrid() {
  return <div className="grid grid-cols-2">Custom Executive Showcase</div>;
}`
  },
  {
    id: "web-pulse-ai",
    name: "Pulse AI Workspace",
    tagline: "Next-Gen AI Prompt & Chat Assistant Enterprise UI",
    category: "SaaS & AI",
    rating: 4.9,
    reviewsCount: 52,
    techStack: ["React", "Tailwind CSS", "API Client Setup", "Vite"],
    features: [
      "ChatGPT-Style Conversational UI",
      "Prompt Template Library Scope",
      "Sidebar Session History Drawer",
      "Token Counter & Model Selector",
      "User Account Profile & Org Management"
    ],
    description: "The complete frontend scope for custom AI wrappers and enterprise LLM applications. Book a strategy call to plan your AI roadmap.",
    previewUrl: "https://example.com/preview/pulseai",
    bgGradient: "from-blue-950/60 to-slate-900/90",
    badge: "AI Strategy",
    badgeColor: "bg-blue-400/20 text-blue-200 border-blue-400/30",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    demoCode: `// AI Chat Consultation Scope
export function ChatMessage({ role, content }) {
  return <div className={role === 'user' ? 'text-right' : ''}>{content}</div>;
}`
  },
  {
    id: "web-zenith-dining",
    name: "Zenith Hospitality & Events",
    tagline: "Luxury Hospitality, Dining & Venue Booking System",
    category: "Hospitality & Business",
    rating: 4.7,
    reviewsCount: 19,
    techStack: ["React", "CSS Modules", "Google Maps Embed API"],
    features: [
      "Interactive Digital Menu & Catalog",
      "Table Reservation Form & Booking Scope",
      "Customer Experience Showcase",
      "Venue Location & Maps Integration",
      "VIP Event Reservation System"
    ],
    description: "Elevate your venue or dining enterprise with Zenith. Schedule a consultation to review reservation workflows and custom brand styling.",
    previewUrl: "https://example.com/preview/zenith",
    bgGradient: "from-cyan-950/50 to-slate-900/80",
    badge: "Hospitality Scope",
    badgeColor: "bg-teal-500/20 text-teal-300 border-teal-500/30",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    demoCode: `// Reservation Consultation Scope
export function MenuItem({ title, price }) {
  return <div className="flex justify-between"><span>{title}</span><span>\${price}</span></div>;
}`
  },
  {
    id: "web-vanguard-app",
    name: "Vanguard Mobile Portal",
    tagline: "Sleek iOS & Android App Product Showcase & Web Portal",
    category: "Mobile & Apps",
    rating: 4.9,
    reviewsCount: 31,
    techStack: ["React", "Tailwind CSS", "SVG Motion"],
    features: [
      "3D Interactive Mobile Mockups",
      "App Store & Android Badges",
      "Interactive Feature Tour Scope",
      "Executive FAQ Accordions",
      "Lead Capture & Consultation Form"
    ],
    description: "Showcase your mobile application to millions. Book a consultation to craft a high-converting web landing page for your mobile launch.",
    previewUrl: "https://example.com/preview/vanguard",
    bgGradient: "from-sky-950/60 to-slate-900/90",
    badge: "High Conversion",
    badgeColor: "bg-sky-400/20 text-sky-200 border-sky-400/30",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
    demoCode: `// Mobile App Launch Scope
export function AppBadges() {
  return <div className="flex gap-4"><button>Download iOS</button></div>;
}`
  }
];

export const CONSULTATION_TYPES = [
  {
    id: "strategy-call",
    name: "1-on-1 Web Strategy Call",
    subtext: "30-Min session with Senior Web Architect to review goals & technical roadmap",
    iconName: "Calendar",
    badge: "Complimentary",
    fee: "Free"
  },
  {
    id: "custom-build-consult",
    name: "Full Custom Build Scope",
    subtext: "Comprehensive consultation covering design systems, tech stack, and timeline",
    iconName: "UserCheck",
    badge: "Popular",
    fee: "Free"
  },
  {
    id: "code-audit-consult",
    name: "Architecture & Security Audit",
    subtext: "Technical review of your existing web app performance, UI/UX, and scalability",
    iconName: "ShieldCheck",
    badge: "Technical Review",
    fee: "Free"
  }
];

export const CONSULTATION_PACKAGES = [
  {
    id: "discovery",
    name: "Discovery & Strategy Call",
    price: "Free",
    period: "30 min video session",
    description: "Ideal for founders and team leaders looking to clarify project requirements and technical architecture.",
    features: [
      "30-Minute 1-on-1 Video Session",
      "Technical Feasibility Assessment",
      "UI/UX Design Framework Review",
      "Custom Quote & Timeline Estimate",
      "No-Obligation Summary Brief"
    ],
    ctaText: "Schedule Strategy Call",
    recommended: false,
    badgeText: "Complimentary"
  },
  {
    id: "full-build-consult",
    name: "Custom Web Build Consultation",
    price: "Free",
    period: "60 min strategy session",
    description: "Deep-dive strategy session for full-service custom design, development, and system integration.",
    features: [
      "Everything in Discovery Session",
      "Full Project Requirements Workshop",
      "Interactive Prototype & Layout Review",
      "API & Database Integration Scope",
      "Dedicated Senior Lead Consultant",
      "Priority Follow-Up Proposal within 24h"
    ],
    ctaText: "Book Custom Build Call",
    recommended: true,
    badgeText: "Most Requested"
  },
  {
    id: "enterprise-audit",
    name: "Enterprise Digital Audit",
    price: "Custom",
    period: "Dedicated advisory",
    description: "Comprehensive advisory for scaling existing web platforms, security compliance, and team mentoring.",
    features: [
      "Complete Codebase & UI/UX Audit",
      "Performance & Lighthouse Optimization Plan",
      "Security & Vulnerability Assessment",
      "Custom Enterprise SLA Roadmap",
      "Executive Board Presentation Deck",
      "Ongoing Technical Advisory"
    ],
    ctaText: "Request Enterprise Advisory",
    recommended: false,
    badgeText: "Enterprise Advisory"
  }
];
