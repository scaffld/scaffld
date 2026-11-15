/**
 * SCAFFLD site content — all copy and contact data, separate from presentation.
 * No prices are published on the site; quotes are given after consultation.
 */
const WHATSAPP_NUMBER = "6285123637703";
export const WHATSAPP_DISPLAY = "+62 851-2363-7703";

export const waLink = (text = "") =>
  `https://wa.me/${WHATSAPP_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const brand = {
  name: "SCAFFLD",
  version: "V.01",
  year: "2026",
  tagline: "Websites for every kind of business",
  support: "Online fast, built to sell",
  principle: "Good websites. Clear solutions. No unnecessary complexity.",
};

/** Primary navigation (routes). `count` renders as a superscript, like an index. */
export const nav = [
  { to: "/", label: "Index" },
  { to: "/services", label: "Services", count: 5 },
  { to: "/about", label: "About" },
];

/** Social profiles. WhatsApp is linked separately through `waLink`. */
export const social = [
  { label: "Instagram", href: "https://www.instagram.com/oriri/" },
  { label: "TikTok", href: "https://www.tiktok.com/@oriri" },
];

export const home = {
  intro:
    "is a web studio building websites and digital solutions for every kind of business. We don't limit ourselves to particular industries or website types — from straightforward landing pages to complex web applications, every project is built around what the business actually needs, designed with care and developed properly.",
  approach:
    "Some businesses need a simple online presence. Others need a complete digital system. We help you find the right solution and build it properly — online fast, built to sell.",
};

export const services = [
  {
    key: "web",
    title: "Website Development",
    short: "Websites",
    value:
      "A professional home for your business online — clear, fast and easy to find.",
    items: [
      "Landing pages",
      "Company profile websites",
      "Corporate websites",
      "Portfolio websites",
      "Product & service websites",
      "Campaign websites",
      "Custom multi-page websites",
    ],
  },
  {
    key: "app",
    title: "Web Application Development",
    short: "Web apps",
    value:
      "Software shaped around how your team actually works — replacing spreadsheets and manual steps.",
    items: [
      "Custom web applications",
      "Admin dashboards",
      "Internal management systems",
      "Workflow management",
      "Client portals",
      "Custom business platforms",
    ],
  },
  {
    key: "shop",
    title: "E-commerce & Digital Platforms",
    short: "E-commerce",
    value:
      "Let customers browse, order, book and pay — without leaving your website.",
    items: [
      "Online stores",
      "Product catalogs",
      "Ordering systems",
      "Booking & reservation platforms",
      "Payment integrations",
      "Custom digital platforms",
    ],
  },
  {
    key: "design",
    title: "UI/UX & Website Design",
    short: "UI/UX design",
    value:
      "Interfaces that make sense at first glance and look like your brand on every screen.",
    items: [
      "Website redesign",
      "Interface design",
      "User experience optimization",
      "Responsive layouts",
      "Wireframes & prototypes",
      "Design systems",
    ],
  },
  {
    key: "care",
    title: "Maintenance & Optimization",
    short: "Maintenance",
    value:
      "Keep an existing site fast, secure, findable and up to date after launch.",
    items: [
      "Website maintenance",
      "Technical SEO",
      "Performance optimization",
      "Hosting & deployment",
      "Website migration",
      "Security improvements",
      "Bug fixes & ongoing support",
    ],
  },
];

/** Standard website packages — scope only, prices are quoted on request. */
export const packages = [
  {
    name: "Starter",
    summary: "One focused page that gets you found and contacted.",
    features: ["1 page", "WhatsApp button", "Gallery & Maps"],
    days: 5,
  },
  {
    name: "Business",
    summary: "A complete multi-page website for a growing business.",
    features: ["6 pages", "2 languages", "Contact form", "Google + SEO"],
    days: 14,
  },
  {
    name: "Premium",
    summary: "Sell or take bookings online, with payment built in.",
    features: ["Booking / shop & online payment", "Advanced SEO"],
    days: 21,
  },
];

export const included = [
  "Domain + hosting for 1 year",
  "SSL certificate",
  "30-day warranty",
];

export const extras = [
  "Monthly maintenance",
  "Website redesign",
  "Google Business + SEO",
  "Extra pages",
  "Extra languages",
];

export const customNote =
  "Need something more specific? We also build custom websites and web applications based on your requirements.";

export const process = [
  {
    title: "Discovery",
    text: "Understand the business, goals, audience and requirements.",
  },
  {
    title: "Planning",
    text: "Determine the right structure, features and technology.",
  },
  {
    title: "Design",
    text: "Create the interface and establish the visual direction.",
  },
  {
    title: "Development",
    text: "Build the website and integrate the required functionality.",
  },
  { title: "Launch", text: "Deploy, test, optimise and deliver the website." },
  {
    title: "Support",
    text: "Maintenance and assistance whenever you need it.",
  },
];

export const why = [
  {
    title: "Built for your requirements",
    text: "Scope follows what your business needs — not a template we sell to everyone.",
  },
  {
    title: "Design & development, one team",
    text: "The people who design the site are the people who build it. Nothing gets lost in a handoff.",
  },
  {
    title: "Responsive on every device",
    text: "Phones first, then tablets, laptops and large screens.",
  },
  {
    title: "Maintainable code",
    text: "Organised, readable code that can grow with the business.",
  },
  {
    title: "Performance-conscious",
    text: "Optimised images, lean pages and fast loading as a default.",
  },
  {
    title: "Transparent scope",
    text: "A written scope, agreed before any work starts.",
  },
  {
    title: "Direct communication",
    text: "Talk to the people doing the work — over WhatsApp, not ticket queues.",
  },
];

export const faqs = [
  {
    q: "What information do I need to prepare before starting?",
    a: "Your logo, basic business information, the text you want on the site, photos, and a few websites you like. Missing some of it? We'll guide you through what's needed.",
  },
  {
    q: "How long does website development take?",
    a: "Our standard packages are estimated at 5 days (Starter), 14 days (Business) and 21 days (Premium). Custom projects are scheduled after consultation. Timelines depend on how quickly content and feedback come in.",
  },
  {
    q: "How much does a website cost?",
    a: "It depends on the scope. Tell us what you need on WhatsApp or through the inquiry form and we'll send a clear quote before any work starts.",
  },
  {
    q: "Can I request a custom website?",
    a: "Yes. The packages cover common needs; custom websites, web applications and integrations are quoted separately after we understand your requirements.",
  },
  {
    q: "Can you redesign my existing website?",
    a: "Yes. We'll review the current site, agree what needs to change, and quote the redesign based on its size and scope.",
  },
  {
    q: "Can I update the website myself?",
    a: "If you want to manage content yourself, tell us early. We can build an editable setup when the project calls for it — it's agreed as part of the scope.",
  },
  {
    q: "Are domain and hosting included?",
    a: "Yes. Every package includes a domain and hosting for one year, plus SSL.",
  },
  {
    q: "Do you provide maintenance?",
    a: "Yes. Every package includes a 30-day warranty, and ongoing monthly maintenance is available afterwards.",
  },
  {
    q: "Can you integrate payment systems?",
    a: "Yes. The Premium package includes a booking or shop flow with online payment. Other payment integrations are scoped per project.",
  },
  {
    q: "How does the payment process work?",
    a: "Work begins after the scope is agreed and a deposit (typically 50%) is paid. The remaining balance is due before final delivery or launch. Full details are in our Terms of Service.",
  },
];

export const contact = {
  heading: "Let's build something useful.",
  copy: "Have a project in mind? Tell us what you need. We'll help determine the right solution.",
  projectTypes: [
    "Landing page",
    "Company profile",
    "E-commerce",
    "Web application",
    "Website redesign",
    "Custom digital solution",
    "Other",
  ],
};
