"use client";

const testimonials = [
  {
    name: "Alex K.",
    role: "YouTube Creator, 500K subs",
    text: "I tested 3 title ideas before posting. The one with the highest score got 2x more views than my average.",
    score: 91,
  },
  {
    name: "Maria S.",
    role: "TikTok Creator",
    text: "This tool helped me understand why some hooks work and others don't. My retention went up 40%.",
    score: 84,
  },
  {
    name: "Jake R.",
    role: "Content Agency",
    text: "We use this for every client video now. Quick, simple, and surprisingly accurate for a rule-based system.",
    score: 78,
  },
];

const faqs = [
  {
    q: "Is this actually AI?",
    a: "No. This is a rule-based viral prediction simulator. It uses proven content patterns from top-performing videos to score your ideas. No AI APIs, no hallucinations — just data-driven rules.",
  },
  {
    q: "How accurate is the score?",
    a: "The scoring system is based on patterns from viral content research. It's a directional tool — use it to compare ideas and identify weak points, not as a guarantee of performance.",
  },
  {
    q: "What platforms does it support?",
    a: "YouTube, TikTok, and Instagram Reels. Each platform has different scoring weights — TikTok prioritizes hooks, YouTube prioritizes thumbnails and titles.",
  },
  {
    q: "Is my data stored anywhere?",
    a: "No. Everything runs in your browser. Your titles, hooks, and scores are stored locally on your device only. Nothing is sent to any server beyond the scoring calculation.",
  },
  {
    q: "Can I use this for free?",
    a: "Yes! You get 3 free analyses per day. Pro users get unlimited access plus advanced features.",
  },
];

const pricingPlans = [
  {
    name: "Free",
    price: "₽0",
    period: "навсегда",
    features: [
      "3 analyses per day",
      "Basic scoring",
      "Title & hook improvements",
      "Compare mode",
    ],
    cta: "Current Plan",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "₽490",
    period: "/мес",
    features: [
      "Unlimited analyses",
      "Advanced metrics",
      "Export as PDF",
      "Priority support",
      "Trend reports",
      "API access",
    ],
    cta: "Upgrade Now",
    highlighted: true,
  },
  {
    name: "Team",
    price: "₽1490",
    period: "/мес",
    features: [
      "Everything in Pro",
      "5 team members",
      "Shared leaderboard",
      "Brand presets",
      "Bulk analysis",
      "Dedicated support",
    ],
    cta: "Contact Us",
    highlighted: false,
  },
];

export function Testimonials() {
  return (
    <div className="w-full max-w-4xl mt-16">
      <h2 className="text-2xl font-bold text-center mb-8">
        💬 What Creators Say
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="bg-[#141420] p-5 rounded-2xl border border-white/10"
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-medium text-sm">{t.name}</p>
                <p className="text-xs text-gray-500">{t.role}</p>
              </div>
              <span className="text-sm font-bold text-purple-400">
                {t.score}/100
              </span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              &quot;{t.text}&quot;
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Pricing() {
  return (
    <div className="w-full max-w-4xl mt-16">
      <h2 className="text-2xl font-bold text-center mb-2">💎 Pricing</h2>
      <p className="text-gray-400 text-center text-sm mb-8">
        Start free. Upgrade when you need more.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {pricingPlans.map((plan, i) => (
          <div
            key={i}
            className={`p-6 rounded-2xl border ${
              plan.highlighted
                ? "bg-gradient-to-b from-purple-500/10 to-blue-500/10 border-purple-500/30"
                : "bg-[#141420] border-white/10"
            }`}
          >
            {plan.highlighted && (
              <div className="text-xs font-medium text-purple-300 mb-2">
                ⭐ Most Popular
              </div>
            )}
            <h3 className="text-lg font-bold">{plan.name}</h3>
            <div className="mt-2">
              <span className="text-3xl font-bold">{plan.price}</span>
              <span className="text-gray-500 text-sm">{plan.period}</span>
            </div>
            <ul className="mt-4 space-y-2">
              {plan.features.map((f, j) => (
                <li
                  key={j}
                  className="flex items-center gap-2 text-sm text-gray-300"
                >
                  <span className="text-green-400 text-xs">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <button
              className={`w-full mt-5 p-2.5 rounded-lg font-medium text-sm transition cursor-pointer ${
                plan.highlighted
                  ? "bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90"
                  : "bg-white/5 border border-white/10 hover:bg-white/10"
              }`}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FAQ() {
  return (
    <div className="w-full max-w-2xl mt-16">
      <h2 className="text-2xl font-bold text-center mb-8">❓ FAQ</h2>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <details
            key={i}
            className="bg-[#141420] rounded-xl border border-white/10 group"
          >
            <summary className="p-4 cursor-pointer text-sm font-medium text-gray-200 flex items-center justify-between list-none">
              {faq.q}
              <span className="text-gray-500 group-open:rotate-180 transition-transform">
                ▼
              </span>
            </summary>
            <div className="px-4 pb-4 text-sm text-gray-400 leading-relaxed">
              {faq.a}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
