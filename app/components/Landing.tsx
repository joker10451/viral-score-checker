"use client";

import { useLocale } from "@/lib/locale-context";

const testimonials = [
  {
    name: "Alex K.",
    roleEn: "YouTube Creator, 500K subs",
    roleRu: "YouTube создатель, 500K подписчиков",
    textEn:
      "I tested 3 title ideas before posting. The one with the highest score got 2x more views than my average.",
    textRu:
      "Протестировал 3 заголовка перед публикацией. Тот что с самым высоким скором набрал в 2 раза больше просмотров.",
    score: 91,
  },
  {
    name: "Maria S.",
    roleEn: "TikTok Creator",
    roleRu: "TikTok создатель",
    textEn:
      "This tool helped me understand why some hooks work and others don't. My retention went up 40%.",
    textRu:
      "Этот инструмент помог понять почему одни хуки работают, а другие нет. Удержание выросло на 40%.",
    score: 84,
  },
  {
    name: "Jake R.",
    roleEn: "Content Agency",
    roleRu: "Контент-агентство",
    textEn:
      "We use this for every client video now. Quick, simple, and surprisingly accurate.",
    textRu:
      "Используем для каждого клиентского видео. Быстро, просто и удивительно точно.",
    score: 78,
  },
];

export function Testimonials() {
  const { t, locale } = useLocale();

  return (
    <div className="w-full max-w-4xl mt-16">
      <h2 className="text-2xl font-bold text-center mb-8">
        {t("testimonialsTitle")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {testimonials.map((tst, i) => (
          <div
            key={i}
            className="bg-[#141420] p-5 rounded-2xl border border-white/10"
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-medium text-sm">{tst.name}</p>
                <p className="text-xs text-gray-500">
                  {locale === "ru" ? tst.roleRu : tst.roleEn}
                </p>
              </div>
              <span className="text-sm font-bold text-purple-400">
                {tst.score}/100
              </span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              &quot;{locale === "ru" ? tst.textRu : tst.textEn}&quot;
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Pricing() {
  const { t } = useLocale();

  const plans = [
    {
      name: t("free"),
      price: "₽0",
      period: t("forever"),
      featureKeys: ["proFeature1", "proFeature2", "proFeature3"] as const,
      features: ["3 / day", "Basic scoring", "Compare mode"],
      cta: t("currentPlan"),
      highlighted: false,
    },
    {
      name: t("pro"),
      price: "₽490",
      period: t("perMonth"),
      featureKeys: ["proFeature1", "proFeature2", "proFeature3", "proFeature4"] as const,
      features: [],
      cta: t("upgradeNow"),
      highlighted: true,
    },
    {
      name: t("team"),
      price: "₽1490",
      period: t("perMonth"),
      featureKeys: [] as const,
      features: ["Pro +", "5 users", "Bulk analysis"],
      cta: t("contactUs"),
      highlighted: false,
    },
  ];

  return (
    <div className="w-full max-w-4xl mt-16">
      <h2 className="text-2xl font-bold text-center mb-2">
        {t("pricingTitle")}
      </h2>
      <p className="text-gray-400 text-center text-sm mb-8">
        {t("pricingSubtitle")}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan, i) => (
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
                {t("mostPopular")}
              </div>
            )}
            <h3 className="text-lg font-bold">{plan.name}</h3>
            <div className="mt-2">
              <span className="text-3xl font-bold">{plan.price}</span>
              <span className="text-gray-500 text-sm">{plan.period}</span>
            </div>
            <ul className="mt-4 space-y-2">
              {plan.featureKeys.map((key, j) => (
                <li
                  key={j}
                  className="flex items-center gap-2 text-sm text-gray-300"
                >
                  <span className="text-green-400 text-xs">✓</span>
                  {t(key)}
                </li>
              ))}
              {plan.features.map((f, j) => (
                <li
                  key={`extra-${j}`}
                  className="flex items-center gap-2 text-sm text-gray-300"
                >
                  <span className="text-green-400 text-xs">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => {
                if (plan.highlighted) {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
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
  const { t } = useLocale();

  const faqs = [
    { q: t("faqQ1"), a: t("faqA1") },
    { q: t("faqQ2"), a: t("faqA2") },
    { q: t("faqQ3"), a: t("faqA3") },
    { q: t("faqQ4"), a: t("faqA4") },
    { q: t("faqQ5"), a: t("faqA5") },
  ];

  return (
    <div className="w-full max-w-2xl mt-16">
      <h2 className="text-2xl font-bold text-center mb-8">{t("faqTitle")}</h2>
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
