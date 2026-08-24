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
    updated: "August 2026",
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
        heading: "4. Identity Verification and Account Opening",
        body: [
          "When you verify your identity, your BVN, selfie, phone number, and bank account details are shared with our licensed verification and banking partners solely to confirm your identity and to open and operate the DubuPay NGN account held in your name. We retain an encrypted record of verification results so that you are not asked to verify the same identity twice.",
          "Verification records may be reused to satisfy a later verification request about the same identity, including one made by another business using DubuPay, but only where that business already holds your identifying details and the check succeeds. We do not operate a directory and your details cannot be looked up by anyone who does not already have them.",
        ],
      },
      {
        heading: "5. Data Security",
        body: [
          "We use 256-bit encryption, PCI DSS compliant infrastructure, and biometric verification to protect your data. All transactions require explicit PIN confirmation before processing.",
        ],
      },
      {
        heading: "6. Data Retention",
        body: [
          "Transaction records are retained for the period required by applicable financial regulations. You may request deletion of non-essential personal data by contacting our support team.",
        ],
      },
      {
        heading: "7. Your Rights",
        body: [
          "You have the right to access, correct, or delete your personal data. You may also withdraw consent for non-essential data processing at any time by messaging Dubu on WhatsApp or contacting us at privacy@dubupay.com.",
        ],
      },
      {
        heading: "8. AI Assistant",
        body: [
          "Dubu is an AI assistant. When you message Dubu on WhatsApp, your message and the account context needed to answer it are sent to our third-party AI model provider, OpenRouter, and the model provider it routes to, so a reply can be generated. Your PIN, BVN and full bank details are never sent to these providers.",
          "The assistant can misunderstand you or be wrong. Every transaction it prepares is shown to you for explicit confirmation, and nothing moves until you confirm it with your PIN. We instruct our model providers not to retain your messages beyond what is needed to return a response, and not to train on them.",
          "You can ask to speak to a human at any time by replying with \"agent\", and you may contact privacy@dubupay.com to object to this processing.",
        ],
      },
      {
        heading: "9. Changes to This Policy",
        body: [
          "We may update this policy from time to time. We will notify you of significant changes through WhatsApp or on our website. Continued use of the service after changes constitutes acceptance.",
        ],
      },
      {
        heading: "10. Contact Us",
        body: ["For privacy-related inquiries, contact us at privacy@dubupay.com or message Dubu on WhatsApp."],
      },
    ],
  },
  terms: {
    title: "Terms of Service",
    updated: "August 2026",
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
        heading: "4. Account Provisioning and Identity Verification",
        body: [
          "To complete identity verification (Tier 1), we are required to submit your Bank Verification Number (BVN), a selfie, your phone number, and a designated Nigerian bank account to our licensed verification and payment partners.",
          "So that we never have to ask you for a separate bank account, we provision a dedicated DubuPay NGN account in your name, through our licensed banking partner, at the point you begin verification. This account is created for you automatically as part of setting up your DubuPay wallet, and its details are submitted to our verification partner to complete your Tier 1 check and to enable funding of your wallet.",
          "By creating a DubuPay account and starting verification, you authorise us and our banking partners to open and operate this account on your behalf. The account belongs to you, is held in your name, and is shown to you in the app once your verification is complete. You may request its closure at any time by contacting support, which will also close your DubuPay wallet.",
          "No funds are moved into or out of this account without your explicit instruction, and we do not use it for any purpose other than operating your DubuPay wallet.",
        ],
      },
      {
        heading: "5. Transaction Confirmation",
        body: [
          "All transactions require your explicit confirmation before processing. Once confirmed, transactions cannot be reversed. You are responsible for verifying recipient details before confirming any transfer.",
        ],
      },
      {
        heading: "6. Fees and Exchange Rates",
        body: [
          "Fees and exchange rates are clearly displayed before each transaction. Rates are locked for 60 seconds from the time they are quoted. We reserve the right to modify fee structures with advance notice.",
        ],
      },
      {
        heading: "7. Prohibited Uses",
        body: [
          "You may not use Dubu for money laundering, terrorist financing, fraud, or any other illegal activity. We reserve the right to suspend or terminate accounts that violate these terms or applicable laws.",
        ],
      },
      {
        heading: "8. Limitation of Liability",
        body: [
          "Dubu is not liable for delays caused by banking networks, incorrect recipient details provided by you, or service interruptions beyond our control. Our liability is limited to the transaction amount in dispute.",
        ],
      },
      {
        heading: "9. Your Content & Copyright",
        body: [
          "You may send images, voice notes and other material to Dubu on WhatsApp. You keep ownership of it, and grant us a limited licence to process and store it only to operate the service for you.",
          "You must have the right to send what you send, and must not send material that infringes anyone's copyright or is otherwise unlawful.",
          "If you believe material processed by our service infringes your copyright, send a notice to legal@dubupay.com identifying the work, where the material appears, your contact details, and a statement that you believe in good faith the use is not authorised and that your notice is accurate. We will remove or disable material subject to a valid notice, give the person who sent it a chance to respond, and terminate the accounts of repeat infringers.",
        ],
      },
      {
        heading: "10. Dispute Resolution",
        body: [
          "These terms are governed by the laws of the Federal Republic of Nigeria.",
          "Talk to us first: before starting formal proceedings, raise the dispute with us at legal@dubupay.com and give us 30 days to resolve it.",
          "If we cannot resolve it, the dispute shall be finally settled by arbitration seated in Lagos, Nigeria, under the Arbitration and Mediation Act 2023, before a single arbitrator, in English.",
          "Class action waiver: disputes must be brought in your individual capacity, and not as a plaintiff or class member in any purported class, collective, consolidated or representative proceeding. The arbitrator may not consolidate more than one person's claims.",
          "Small claims: either of us may instead bring an individual claim in a small claims court. Nothing here removes any mandatory consumer-protection right you have, or your right to complain to the Central Bank of Nigeria or the Nigeria Data Protection Commission.",
        ],
      },
      {
        heading: "11. Changes to Terms",
        body: [
          "We may update these terms at any time. Material changes will be communicated via WhatsApp or our website. Continued use after changes constitutes acceptance.",
        ],
      },
      {
        heading: "12. Contact",
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
