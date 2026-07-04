export type InfoSlug = "about" | "contact" | "careers";

export type Block =
  | { type: "text"; heading?: string; body: string[] }
  | { type: "note"; heading: string; body: string[] }
  | {
      type: "cards";
      heading?: string;
      items: {
        title: string;
        description?: string;
        action?: { label: string; href: string; platformCta?: boolean };
      }[];
    }
  | {
      type: "jobs";
      heading?: string;
      items: {
        title: string;
        meta: string;
        description: string;
        responsibilities: string[];
        requirements?: string[];
      }[];
    };

interface InfoDoc {
  title: string;
  lead: string;
  blocks: Block[];
}

export const INFO_PAGES: Record<InfoSlug, InfoDoc> = {
  about: {
    title: "About Dubu",
    lead: "Dubu is the first international payment experience built natively for the chat apps you already use — WhatsApp, Telegram, Slack, and Discord. We make it possible to send money worldwide by simply chatting — no apps, no forms, no friction.",
    blocks: [
      {
        type: "text",
        heading: "Our Mission",
        body: [
          "Billions of people live inside chat apps like WhatsApp, Telegram, Slack, and Discord every day. Yet sending money internationally still requires downloading separate apps, navigating complex interfaces, and paying hidden fees. We believe payments should be as simple as sending a message. Dubu brings that vision to life.",
        ],
      },
      {
        type: "cards",
        heading: "What We Value",
        items: [
          {
            title: "Speed",
            description:
              "Money should move as fast as a chat message. We're building payment infrastructure that keeps up with how people actually communicate.",
          },
          {
            title: "Accessibility",
            description:
              "If you can send a text, you can send money. No apps to download, no forms to fill, no barriers to entry.",
          },
          {
            title: "Trust",
            description:
              "Your money never moves without your explicit yes. Every transaction is protected by bank-grade security.",
          },
          {
            title: "Simplicity",
            description:
              "We strip away the complexity of cross-border payments so you can focus on what matters — the people you're sending to.",
          },
        ],
      },
    ],
  },
  contact: {
    title: "Contact Us",
    lead: "Have a question or want to learn more about Dubu? Reach out through any of the channels below.",
    blocks: [
      {
        type: "cards",
        items: [
          {
            title: "Chat with Us",
            description:
              "The fastest way to reach us — right in your favorite chat app.",
            action: {
              label: "Chat with Dubu",
              href: "https://wa.link/6l25x0",
              platformCta: true,
            },
          },
          {
            title: "Email Us",
            description: "For general inquiries, partnerships, or support.",
            action: { label: "support@dubupay.com", href: "mailto:support@dubupay.com" },
          },
        ],
      },
    ],
  },
  careers: {
    title: "Careers",
    lead: "We're building conversational payments for the world. If you're passionate about fintech, AI, and making an impact — we'd love to hear from you.",
    blocks: [
      {
        type: "note",
        heading: "How to Apply",
        body: [
          'Send your resume and cover letter to careers@dubupay.com with the subject line matching the role you\'re applying for (e.g. "Application: Frontend Developer").',
        ],
      },
      {
        type: "jobs",
        heading: "Open Roles",
        items: [
          {
            title: "UI/UX Designer",
            meta: "Full-time / Remote",
            description:
              "We're looking for a UI/UX Designer to shape the visual and interaction design of Dubu's products — from our marketing sites to the conversational payment flows inside chat apps like WhatsApp and Telegram.",
            responsibilities: [
              "Design intuitive user interfaces for web and conversational (chat-based) experiences",
              "Create wireframes, prototypes, and high-fidelity mockups in Figma",
              "Establish and maintain a consistent design system across all Dubu products",
              "Conduct user research and usability testing to validate design decisions",
              "Collaborate with engineering to ensure pixel-perfect implementation",
              "Design responsive layouts for mobile-first experiences",
            ],
            requirements: [
              "2+ years of experience in UI/UX design for digital products",
              "Strong portfolio demonstrating web and mobile design work",
              "Proficiency in Figma and modern prototyping tools",
              "Understanding of design systems, accessibility standards, and responsive design",
              "Experience designing for fintech or conversational interfaces is a plus",
              "Excellent communication and ability to articulate design rationale",
            ],
          },
          {
            title: "Frontend Developer",
            meta: "Full-time / Remote",
            description:
              "We need a Frontend Developer to build and refine Dubu's web experiences — performant marketing sites, dashboards, and interactive components that bring our brand to life.",
            responsibilities: [
              "Build responsive, accessible web applications using Next.js, TypeScript, and Tailwind CSS",
              "Implement smooth animations and micro-interactions with Framer Motion",
              "Integrate with backend APIs and real-time data sources",
              "Optimize for performance (Core Web Vitals, Lighthouse scores)",
              "Write clean, maintainable code with proper TypeScript typing",
              "Collaborate closely with design to translate mockups into production-ready interfaces",
            ],
            requirements: [
              "2+ years of professional frontend development experience",
              "Strong proficiency in React, Next.js, and TypeScript",
              "Experience with Tailwind CSS and CSS-in-JS or utility-first styling",
              "Familiarity with animation libraries (Framer Motion preferred)",
              "Understanding of web accessibility (WCAG) and SEO best practices",
              "Experience with Git workflows and CI/CD pipelines",
            ],
          },
          {
            title: "DevOps Engineer",
            meta: "Full-time / Remote",
            description:
              "We're hiring a DevOps Engineer to build and maintain the infrastructure that powers Dubu's payment platform — ensuring reliability, security, and scalability as we grow.",
            responsibilities: [
              "Design, deploy, and manage cloud infrastructure (AWS, GCP, or similar)",
              "Build and maintain CI/CD pipelines for automated testing and deployment",
              "Implement monitoring, alerting, and incident response systems",
              "Manage containerized workloads with Docker and Kubernetes",
              "Ensure infrastructure security, compliance, and disaster recovery readiness",
              "Optimize system performance and cost efficiency at scale",
            ],
            requirements: [
              "2+ years of experience in DevOps, SRE, or infrastructure engineering",
              "Proficiency with cloud platforms (AWS, GCP, or Azure)",
              "Experience with Docker, Kubernetes, and infrastructure-as-code (Terraform, Pulumi)",
              "Strong understanding of networking, DNS, load balancing, and SSL/TLS",
              "Familiarity with monitoring tools (Grafana, Prometheus, Datadog, or similar)",
              "Experience in fintech or handling PCI/SOC2 compliance is a plus",
            ],
          },
          {
            title: "Marketing Specialist & Strategist",
            meta: "Full-time / Remote",
            description:
              "We're looking for a Marketing Specialist & Strategist to drive Dubu's growth across digital channels — building brand awareness, generating leads, and telling the story of conversational payments.",
            responsibilities: [
              "Develop and execute marketing strategies across social media, email, content, and paid channels",
              "Create compelling copy and content that resonates with our target audiences across Africa and diaspora communities",
              "Plan and manage campaigns for product launches, waitlist growth, and user acquisition",
              "Analyze marketing performance metrics and optimize for ROI",
              "Build partnerships with influencers, communities, and media outlets in the fintech space",
            ],
          },
        ],
      },
    ],
  },
};
