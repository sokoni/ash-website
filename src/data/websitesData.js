export const WEBSITE_TEMPLATES = [
  {
    id: "web-nexus-saas",
    name: "Nexus SaaS Pro",
    tagline: "High-Converting AI SaaS Landing & Dashboard Template",
    category: "SaaS & AI",
    price: 49,
    proPrice: 149,
    rating: 4.9,
    reviewsCount: 48,
    techStack: ["React 18", "Tailwind CSS", "Vite", "Lucide", "Framer Motion"],
    features: [
      "Dark & Light Mode Support",
      "Interactive Analytics Charts",
      "Stripe Pricing & Checkout Ready",
      "Sign In / Sign Up Auth UI",
      "100% Responsive & SEO Optimized"
    ],
    description: "Nexus SaaS Pro is engineered for founders wanting to launch their software or AI startup in hours. Packed with modern UI components, landing page hero, pricing tables, and user dashboard.",
    previewUrl: "https://example.com/preview/nexus",
    bgGradient: "from-blue-900/40 to-slate-900/60",
    badge: "Bestseller",
    badgeColor: "bg-[#A0C4FF]/20 text-[#A0C4FF] border-[#A0C4FF]/30",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    demoCode: `// Sample Website Component Structure
import { useState } from 'react';
export default function SaaSHeader() {
  return <header className="bg-slate-900 text-pastel-blue">Nexus SaaS</header>;
}`
  },
  {
    id: "web-novacommerce",
    name: "NovaCommerce Storefront",
    tagline: "Ultra-Fast E-Commerce Shop & Product Showcase",
    category: "E-Commerce",
    price: 69,
    proPrice: 199,
    rating: 4.8,
    reviewsCount: 36,
    techStack: ["React", "Tailwind CSS", "Context API", "Lucide Icons"],
    features: [
      "Slide-over Shopping Cart",
      "Instant Search & Category Filter",
      "Product Gallery & Zoom Modal",
      "Multi-Currency Toggle Support",
      "3 Payment Checkout Integration"
    ],
    description: "Build your online brand fast. NovaCommerce features a modern shop layout, slide-out cart drawer, customer review section, and streamlined payment processing.",
    previewUrl: "https://example.com/preview/novacommerce",
    bgGradient: "from-sky-900/40 to-slate-900/60",
    badge: "Popular",
    badgeColor: "bg-sky-500/20 text-sky-300 border-sky-500/30",
    image: "https://images.unsplash.com/photo-1556742049-0a6756595316?auto=format&fit=crop&w=800&q=80",
    demoCode: `// E-Commerce Cart Logic
export function CartDrawer({ items }) {
  return items.map(item => <div key={item.id}>{item.name}</div>);
}`
  },
  {
    id: "web-aura-portfolio",
    name: "Aura Creative Portfolio",
    tagline: "Minimalist Modern Agency & Freelancer Portfolio",
    category: "Portfolio & Agency",
    price: 39,
    proPrice: 129,
    rating: 5.0,
    reviewsCount: 29,
    techStack: ["React 18", "Vanilla CSS", "Smooth Scroll"],
    features: [
      "Grid & Masonry Project Showcase",
      "Interactive Case Study Pages",
      "Contact Form with Toast Alert",
      "Client Testimonial Carousel",
      "Ultra-Fast 100/100 Lighthouse Score"
    ],
    description: "Designed for designers, developers, and creative agencies looking for a high-end portfolio that wins clients immediately.",
    previewUrl: "https://example.com/preview/aura",
    bgGradient: "from-slate-800/60 to-slate-900/80",
    badge: "Top Rated",
    badgeColor: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    demoCode: `// Portfolio Showcase Grid
export function PortfolioGrid() {
  return <div className="grid grid-cols-2">Work Showcase</div>;
}`
  },
  {
    id: "web-pulse-ai",
    name: "Pulse AI Workspace",
    tagline: "Next-Gen AI Prompt & Chat Assistant Web Application UI",
    category: "SaaS & AI",
    price: 79,
    proPrice: 249,
    rating: 4.9,
    reviewsCount: 52,
    techStack: ["React", "Tailwind CSS", "API Client Setup", "Vite"],
    features: [
      "ChatGPT-Style Conversational UI",
      "Prompt Template Library",
      "Sidebar Session History Drawer",
      "Token Counter & Model Selector",
      "User Account Profile & Billing"
    ],
    description: "The complete frontend solution for launching your AI wrapper or custom LLM app. Fully responsive chat interface with sidebar history and model controls.",
    previewUrl: "https://example.com/preview/pulseai",
    bgGradient: "from-blue-950/60 to-slate-900/90",
    badge: "Trending AI",
    badgeColor: "bg-blue-400/20 text-blue-200 border-blue-400/30",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    demoCode: `// AI Chat Message Component
export function ChatMessage({ role, content }) {
  return <div className={role === 'user' ? 'text-right' : ''}>{content}</div>;
}`
  },
  {
    id: "web-zenith-dining",
    name: "Zenith Dining & Hospitality",
    tagline: "Restaurant, Bar & Event Booking Web App",
    category: "Hospitality & Business",
    price: 45,
    proPrice: 139,
    rating: 4.7,
    reviewsCount: 19,
    techStack: ["React", "CSS Modules", "Google Maps Embed API"],
    features: [
      "Interactive Digital Menu with Filters",
      "Table Reservation Form & Picker",
      "Customer Reviews & Chef Specials",
      "Opening Hours & Location Widget",
      "Online Order Pickup Modal"
    ],
    description: "Elevate any culinary business with Zenith. Features an elegant digital menu, reservation system, and promotional banner manager.",
    previewUrl: "https://example.com/preview/zenith",
    bgGradient: "from-cyan-950/50 to-slate-900/80",
    badge: "New Release",
    badgeColor: "bg-teal-500/20 text-teal-300 border-teal-500/30",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    demoCode: `// Menu Item Component
export function MenuItem({ title, price }) {
  return <div className="flex justify-between"><span>{title}</span><span>\${price}</span></div>;
}`
  },
  {
    id: "web-vanguard-app",
    name: "Vanguard Mobile Showcase",
    tagline: "Sleek iOS & Android App Landing Page & Web Portal",
    category: "Mobile & Apps",
    price: 39,
    proPrice: 119,
    rating: 4.9,
    reviewsCount: 31,
    techStack: ["React", "Tailwind CSS", "SVG Motion"],
    features: [
      "3D Phone Frame Mockups",
      "App Store & Google Play Badges",
      "Interactive Feature Tour",
      "FAQ Accordion Component",
      "Newsletter Signup Form"
    ],
    description: "Showcase your mobile application to thousands of potential users. Vanguard comes with floating phone mockups, interactive feature tabs, and fast download callouts.",
    previewUrl: "https://example.com/preview/vanguard",
    bgGradient: "from-sky-950/60 to-slate-900/90",
    badge: "High Conversion",
    badgeColor: "bg-sky-400/20 text-sky-200 border-sky-400/30",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
    demoCode: `// App Store Links
export function AppBadges() {
  return <div className="flex gap-4"><button>Download iOS</button></div>;
}`
  }
];

export const PAYMENT_OPTIONS = [
  {
    id: "card",
    name: "Credit / Debit Card",
    subtext: "Instant activation via Stripe Secure Gateway",
    iconName: "CreditCard",
    badge: "Most Popular",
    fee: "0% Fee"
  },
  {
    id: "paypal",
    name: "PayPal & Apple Pay",
    subtext: "1-Click checkout with buyer protection",
    iconName: "Wallet",
    badge: "Instant",
    fee: "0% Fee"
  },
  {
    id: "crypto",
    name: "Crypto Payment (USDT / ETH)",
    subtext: "Web3 wallet connect or direct QR transfer",
    iconName: "Coins",
    badge: "Web3",
    fee: "5% Discount"
  }
];

export const PRICING_TIERS = [
  {
    id: "starter",
    name: "Starter License",
    price: "$49",
    period: "one-time",
    description: "Ideal for developers and creators wanting full source code to customize and host themselves.",
    features: [
      "Complete Source Code (React + Vite)",
      "Standard Documentation & Setup Guide",
      "Commercial License for 1 Website",
      "Lifetime Security Updates",
      "Community Forum Support"
    ],
    ctaText: "Get Starter Code",
    recommended: false,
    badgeText: "Single Site"
  },
  {
    id: "pro",
    name: "Pro Launchpad",
    price: "$149",
    period: "one-time",
    description: "The complete automated solution with GitHub repo push, Vercel hosting setup, and domain connection.",
    features: [
      "Everything in Starter License",
      "Automated GitHub Repository Setup",
      "1-Click Vercel Deployment Connection",
      "Custom Domain & SSL Setup Assistance",
      "3 Commercial Licenses included",
      "30 Days Priority Email Support"
    ],
    ctaText: "Launch with Pro",
    recommended: true,
    badgeText: "Most Popular Option"
  },
  {
    id: "custom",
    name: "Custom Empire Build",
    price: "$499",
    period: "one-time",
    description: "Full-service done-for-you customization, custom branding, API integration, and ongoing managed hosting.",
    features: [
      "Everything in Pro Launchpad",
      "Dedicated Senior Full-Stack Developer",
      "Tailored Branding & Graphic Assets",
      "Custom Backend API & Database Setup",
      "Unlimited Commercial Licenses",
      "1-on-1 Strategy Call & Managed Deployment"
    ],
    ctaText: "Order Custom Build",
    recommended: false,
    badgeText: "Done-For-You"
  }
];
