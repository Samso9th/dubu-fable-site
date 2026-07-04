export const WAITLIST_URL = "https://wa.link/6l25x0";

export const SOCIALS = [
  { label: "Twitter / X", href: "https://x.com/dubupay" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/dubupay/" },
  { label: "Instagram", href: "https://www.instagram.com/dubupay" },
];

export const NAV_LINKS = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Moments", href: "#moments" },
  { label: "Security", href: "#security" },
  { label: "FAQ", href: "#faq" },
];

export const TICKER_ITEMS = [
  "WhatsApp · Telegram · Slack · Discord",
  "$0 setup cost",
  "One word to confirm",
  "Text · Voice · Photo",
  "50+ countries",
  "Dubu never sleeps",
  "60–80% cheaper than banks",
  "Receive & send USD from $1",
  "USD: $1 under $300 · $2.50 to $1k · 0.4% above",
  "Rates locked at send time",
];

export type ChatMessage = {
  from: "user" | "dubu";
  text?: string;
  voice?: string;
  image?: boolean;
  imageCaption?: string;
  card?: string[];
  success?: boolean;
  time?: string;
};

export const HERO_CHAT: ChatMessage[] = [
  { from: "user", text: "I want to send $200 to Mama", time: "10:31" },
  { from: "user", voice: "0:03", time: "10:31" },
  {
    from: "dubu",
    text: "Send $200 to Mama — GTBank ····6789.\nRate locked: ₦1,580/$.\nDoes that look right?",
    time: "10:31",
  },
  { from: "user", text: "Yes, send it!", time: "10:32" },
  { from: "dubu", text: "Sent to Mama · $200.00", success: true, time: "10:32" },
];

export type DemoTab = {
  id: string;
  label: string;
  headline: string;
  blurb: string;
  messages: ChatMessage[];
};

export const DEMO_TABS: DemoTab[] = [
  {
    id: "send",
    label: "Send money",
    headline: "Plain words, real money",
    blurb:
      "“Abeg send $100 go Lagos” works just fine. Dubu sorts the rate, the fee, and the delivery — you only confirm.",
    messages: [
      { from: "user", text: "Abeg help me send $100 go Lagos" },
      { from: "dubu", text: "Sure! Who should I send it to?" },
      { from: "user", text: "My sister Amina, GTBank" },
      {
        from: "dubu",
        card: [
          "You send: $100.00",
          "Rate: 1 USD = ₦1,580",
          "Amina receives: ₦158,000",
          "Fee: $0",
        ],
        text: "Should I proceed?",
      },
      { from: "user", voice: "0:02" },
      {
        from: "dubu",
        text: "Done! Amina will get ₦158,000 in her GTBank account within minutes.",
        success: true,
      },
    ],
  },
  {
    id: "rate",
    label: "Check rates",
    headline: "Rates that beat your bank",
    blurb:
      "Ask for today's rates any time. They lock for 60 seconds when you send — no hidden markups, no surprises.",
    messages: [
      { from: "user", text: "What's the rate for GBP to NGN?" },
      {
        from: "dubu",
        card: ["1 GBP = ₦2,015.50", "1 USD = ₦1,580.00", "1 EUR = ₦1,720.30"],
        text: "Rates are locked for 60 seconds when you send.",
      },
      { from: "user", text: "Nice! That's better than my bank" },
      {
        from: "dubu",
        text: "We're typically 60–80% cheaper than traditional banks. Ready to send?",
      },
    ],
  },
  {
    id: "photo",
    label: "Snap a bill",
    headline: "A photo is an instruction",
    blurb:
      "Send a picture of a bill, invoice, or account number. Dubu reads it and handles the payment for you.",
    messages: [
      { from: "user", image: true, imageCaption: "Pay this for me" },
      {
        from: "dubu",
        card: ["GTBank · 0123456789", "Olu Adeyemi"],
        text: "Send ₦8,500 to this account?",
      },
      { from: "user", text: "Yes" },
      {
        from: "dubu",
        text: "₦8,500 sent to Olu Adeyemi (GTBank). Receipt saved.",
        success: true,
      },
    ],
  },
];

export const OLD_WAY = [
  "Download another app",
  "Create an account & verify ID",
  "Navigate confusing menus",
  "Enter card details manually",
  "Wait 3–5 business days",
  "Pay hidden fees",
];

export const NEW_WAY = (platformName: string) => [
  { text: `Open ${platformName}`, from: "user" as const },
  { text: "“Send $200 to Mama”", from: "user" as const },
  { text: "Done. She receives it in minutes.", from: "dubu" as const },
];

export const PIDGIN_LINE =
  "Money don enter! Dem go see am sharp-sharp ✅";

export type Moment = {
  category: string;
  situation: string;
  before: string;
  reply: string;
};

export const MOMENTS: Moment[] = [
  {
    category: "Family",
    situation: "You've been meaning to send something to your parents. It's been a week.",
    before: "Open app. Find account. Transfer. Hope it worked.",
    reply: "Send $200 to Mama — GTBank. Confirm?",
  },
  {
    category: "On the road",
    situation: "POS man on the street. Rush hour. You need to move fast.",
    before: "Scramble for cash or wait for your app to load.",
    reply: "Your virtual card is ready. Tap and go.",
  },
  {
    category: "Market",
    situation: "Seller reads out an account number. You're juggling bags.",
    before: "Type it carefully, one digit at a time.",
    reply: "Snap the receipt. Dubu reads it and pays.",
  },
  {
    category: "Data · Airtime",
    situation: "Data finished in the middle of something. Always at the worst time.",
    before: "Open an app. Navigate. Buy. Wait.",
    reply: "Recharge 10GB MTN — ₦3,500. Do it?",
  },
  {
    category: "Crypto",
    situation: "You've got USDT on Binance and rent is due.",
    before: "Open P2P. Find a seller. Bargain rate. Pray they don't ghost.",
    reply: "Sell 50 USDT at ₦1,540 — ₦77,000 to your wallet. Confirm?",
  },
  {
    category: "Bills",
    situation: "DSTV expired. You found out when your family called at 9PM.",
    before: "Open app. Billers. Smart card number. Which package?",
    reply: "DSTV is due tomorrow — ₦8,500. Shall I sort it?",
  },
  {
    category: "Friends",
    situation: "Chidi needs ₦15k urgently. Every app is timing out.",
    before: "Try Opay. Try GTBank. Network down. Try again.",
    reply: "Sent. ₦15,000 to Chidi. You have ₦28,200 left.",
  },
  {
    category: "Salary day",
    situation: "₦185,000 just landed. Everyone needs something at once.",
    before: "Eight transfers one by one. Forget to save. Exhausted.",
    reply: "Salary just landed. Split it the usual way?",
  },
];

export const STEPS = (platformName: string) => [
  {
    num: "01",
    title: platformName === "WhatsApp" ? "Save our number" : "Add Dubu",
    body: `Add Dubu to your ${platformName} contacts. One contact for all your international transfers.`,
  },
  {
    num: "02",
    title: "Start a chat",
    body: "Say “hi” or send money instructions naturally. Dubu understands what you need.",
  },
  {
    num: "03",
    title: "Send globally",
    body: "Money moves instantly to bank accounts or mobile wallets across 50+ countries.",
  },
];

export const FEATURES = (platformName: string) => [
  {
    title: "Chat to send",
    body: "Save Dubu as a contact. Send money by simply chatting — like texting a friend.",
  },
  {
    title: "Instant receipts",
    body: `Real-time updates on rates, transfers, and receipts delivered to your ${platformName} chat.`,
  },
  {
    title: "Contact sync",
    body: "Send to anyone in your phonebook. They don't need any app to receive money.",
  },
  {
    title: "Smart exchange",
    body: "Competitive rates locked in at send time. No hidden fees, no surprises.",
  },
];

export const PARTNERS = [
  {
    title: "Powered by Dubu Business API",
    body: "Built on Dubu's own payment infrastructure — the same API trusted by merchants across Africa.",
    logos: ["/icon.png"],
  },
  {
    title: "Interswitch & Daya partners",
    body: "Payments are processed through Interswitch, Africa's leading payment technology company.",
    logos: ["/interswich_logo.png", "/daya_logo.png"],
  },
  {
    title: "NDIC-insured deposits",
    body: "Your funds are held in NDIC-insured accounts via Interswitch — the same statutory protection as any Nigerian bank deposit.",
    logos: ["/ndic-cbn.png"],
  },
];

export const TRUST_POINTS = [
  "256-bit encryption",
  "PCI DSS compliant",
  "Biometric verification",
  "PIN per transaction",
];

export const FAQS = [
  {
    q: "Do recipients need to install Dubu?",
    a: "No! Recipients receive money directly to their bank account or mobile wallet. They don't need to download any app or create an account. Just provide their banking details, and the money arrives safely.",
  },
  {
    q: "Is Dubu available in my country?",
    a: "We currently support sending from the UK, US, Canada, and major European countries. You can send to over 50 countries including Nigeria, Ghana, Kenya, South Africa, Uganda, Tanzania, India, Philippines, and more. We're expanding rapidly!",
  },
  {
    q: "How fast are transfers?",
    a: "Most transfers arrive within minutes. Bank transfers typically complete in 5–30 minutes depending on the destination. Mobile wallet transfers are usually instant. You'll receive real-time updates in your chat.",
  },
  {
    q: "Is my chat data private?",
    a: "Absolutely. Your conversations with Dubu are end-to-end encrypted. We can only see the transaction details necessary to process your transfer — never your personal messages. We never share or sell your data.",
  },
  {
    q: "What are the fees?",
    a: "We believe in transparent pricing. You'll always see the exact amount your recipient will get before you confirm. Our fees are typically 60–80% lower than traditional banks, with competitive exchange rates and no hidden markups.",
  },
  {
    q: "How do I track my transfer?",
    a: "Just ask! Send a message like “Where's my transfer?” and we'll give you real-time status updates. You'll also receive automatic notifications when your money is sent, in transit, and delivered.",
  },
];

export const FLAGS = ["🇳🇬", "🇬🇭", "🇰🇪", "🇿🇦", "🇬🇧", "🇺🇸"];
