export type LegalSlug = "privacy" | "terms" | "cookies";

interface LegalSection {
  heading: string;
  body: string[];
}
interface LegalDoc {
  title: string;
  updated: string;
  sections: LegalSection[];
}

export const LEGAL_PAGES: Record<LegalSlug, LegalDoc> = {
  privacy: {
    title: "Privacy Policy",
    updated: "May 2026",
    sections: [
      {
        heading: "1. Information We Collect",
        body: [
          "We collect information you provide directly when using Dubu through WhatsApp, including your phone number, name, transaction details, and payment information. We also collect usage data such as interaction timestamps and device information to improve our service.",
        ],
      },
      {
        heading: "2. How We Use Your Information",
        body: [
          "Your information is used to process transactions, verify your identity, prevent fraud, comply with legal requirements, and improve our services. We do not sell your personal data to third parties.",
        ],
      },
      {
        heading: "3. Data Sharing",
        body: [
          "We share data only with payment processors (such as Interswitch), banking partners, and regulatory authorities as required by law. All partners are bound by strict data protection agreements.",
        ],
      },
      {
        heading: "4. Data Security",
        body: [
          "We use 256-bit encryption, PCI DSS compliant infrastructure, and biometric verification to protect your data. All transactions require explicit PIN confirmation before processing.",
        ],
      },
      {
        heading: "5. Data Retention",
        body: [
          "Transaction records are retained for the period required by applicable financial regulations. You may request deletion of non-essential personal data by contacting our support team.",
        ],
      },
      {
        heading: "6. Your Rights",
        body: [
          "You have the right to access, correct, or delete your personal data. You may also withdraw consent for non-essential data processing at any time by messaging Dubu on WhatsApp or contacting us at privacy@dubupay.com.",
        ],
      },
      {
        heading: "7. Changes to This Policy",
        body: [
          "We may update this policy from time to time. We will notify you of significant changes through WhatsApp or on our website. Continued use of the service after changes constitutes acceptance.",
        ],
      },
      {
        heading: "8. Contact Us",
        body: ["For privacy-related inquiries, contact us at privacy@dubupay.com or message Dubu on WhatsApp."],
      },
    ],
  },
  terms: {
    title: "Terms of Service",
    updated: "May 2026",
    sections: [
      {
        heading: "1. Acceptance of Terms",
        body: [
          "By using Dubu's services through WhatsApp or any other channel, you agree to these Terms of Service. If you do not agree, please do not use our services.",
        ],
      },
      {
        heading: "2. Eligibility",
        body: [
          "You must be at least 18 years old and legally capable of entering into binding agreements in your jurisdiction. You must provide accurate identification and personal information as requested.",
        ],
      },
      {
        heading: "3. Services",
        body: [
          "Dubu provides international money transfer services via WhatsApp. We facilitate transfers between supported countries and currencies. Exchange rates and fees are displayed before each transaction and must be confirmed by you.",
        ],
      },
      {
        heading: "4. Transaction Confirmation",
        body: [
          "All transactions require your explicit confirmation before processing. Once confirmed, transactions cannot be reversed. You are responsible for verifying recipient details before confirming any transfer.",
        ],
      },
      {
        heading: "5. Fees and Exchange Rates",
        body: [
          "Fees and exchange rates are clearly displayed before each transaction. Rates are locked for 60 seconds from the time they are quoted. We reserve the right to modify fee structures with advance notice.",
        ],
      },
      {
        heading: "6. Prohibited Uses",
        body: [
          "You may not use Dubu for money laundering, terrorist financing, fraud, or any other illegal activity. We reserve the right to suspend or terminate accounts that violate these terms or applicable laws.",
        ],
      },
      {
        heading: "7. Limitation of Liability",
        body: [
          "Dubu is not liable for delays caused by banking networks, incorrect recipient details provided by you, or service interruptions beyond our control. Our liability is limited to the transaction amount in dispute.",
        ],
      },
      {
        heading: "8. Dispute Resolution",
        body: [
          "Any disputes arising from these terms shall be resolved through mediation first. If mediation fails, disputes shall be settled under the laws of the Federal Republic of Nigeria.",
        ],
      },
      {
        heading: "9. Changes to Terms",
        body: [
          "We may update these terms at any time. Material changes will be communicated via WhatsApp or our website. Continued use after changes constitutes acceptance.",
        ],
      },
      {
        heading: "10. Contact",
        body: ["For questions about these terms, contact us at legal@dubupay.com or message Dubu on WhatsApp."],
      },
    ],
  },
  cookies: {
    title: "Cookie Policy",
    updated: "May 2026",
    sections: [
      {
        heading: "1. What Are Cookies",
        body: [
          "Cookies are small text files stored on your device when you visit our website. They help us provide a better experience by remembering your preferences and understanding how you use our site.",
        ],
      },
      {
        heading: "2. Cookies We Use",
        body: [
          "Essential cookies: Required for the website to function properly. These cannot be disabled.",
          "Analytics cookies: Help us understand how visitors interact with our website so we can improve the experience.",
          "Preference cookies: Remember your settings and choices to personalize your experience.",
        ],
      },
      {
        heading: "3. WhatsApp Service",
        body: [
          "Our core service operates through WhatsApp and does not use cookies. This policy applies only to the dubupay.com website. Your WhatsApp interactions are governed by our Privacy Policy and WhatsApp's own policies.",
        ],
      },
      {
        heading: "4. Managing Cookies",
        body: [
          "You can control cookies through your browser settings. Most browsers allow you to block or delete cookies. Note that disabling essential cookies may affect website functionality.",
        ],
      },
      {
        heading: "5. Third-Party Cookies",
        body: [
          "We may use third-party analytics services that set their own cookies. These third parties have their own privacy policies governing data collection.",
        ],
      },
      {
        heading: "6. Changes to This Policy",
        body: ["We may update this cookie policy periodically. Changes will be posted on this page with an updated revision date."],
      },
      {
        heading: "7. Contact",
        body: ["For questions about our cookie practices, contact us at privacy@dubupay.com."],
      },
    ],
  },
};
