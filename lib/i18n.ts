export type Locale = "en" | "ru";

export const translations = {
  en: {
    // Hero
    badge: "Viral Content Prediction Simulator",
    heroTitle1: "Predict Your Viral Potential",
    heroTitle2: "Before Posting",
    heroSubtitle:
      "Analyze your YouTube & TikTok content ideas. Get a viral score, breakdown metrics, and AI-style improvements — instantly.",

    // Tabs
    tabAnalyze: "🚀 Analyze",
    tabCompare: "⚔️ Compare",

    // Form
    videoTitle: "Video Title",
    titlePlaceholder: "e.g. Why This Changed Everything...",
    hookLabel: "Hook (first 1–3 seconds)",
    hookPlaceholder: "What viewers hear/see in the first seconds...",
    thumbnailLabel: "Thumbnail Description",
    optional: "(optional)",
    thumbnailPlaceholder:
      "e.g. Face with shocked expression, red bold text overlay",
    analyzeBtn: "🚀 Analyze Viral Score",
    analyzing: "Analyzing...",

    // Results
    viralScore: "Viral Score",
    ctr: "CTR (Click-Through Rate)",
    retention: "Retention",
    engagement: "Engagement",
    improvedTitles: "✨ Improved Titles",
    improvedHooks: "🎯 Improved Hooks",
    aiTips: "🧠 AI Tips",
    poweredByAI: "Powered by AI",
    benchmarkTitle: "📊 You vs Viral Benchmark",
    metric: "Metric",
    yourScore: "Your Score",
    viralBenchmark: "Viral Benchmark",
    gap: "Gap",
    shareOnX: "🐦 Share on X",
    copyResult: "📋 Copy Result",
    tryAgain: "🔄 Try Again with Improved Version",
    challenge: "⚔️ Challenge a Friend",
    copiedToClipboard: "Copied to clipboard!",

    // Score messages
    shockTop: "🔥 Top 10% viral potential detected!",
    shockGood: "⚡ This could double your views with small tweaks",
    shockMedium: "📈 Solid base — needs stronger hooks",
    shockLow: "⚠️ High risk of low performance. Rework needed.",

    // Compare
    compareTitle: "⚔️ Compare Two Ideas",
    ideaA: "Idea A",
    ideaB: "Idea B",
    titlePlaceholderA: "Title A...",
    titlePlaceholderB: "Title B...",
    hookPlaceholderA: "Hook A...",
    hookPlaceholderB: "Hook B...",
    compareBtn: "⚡ Compare",
    winnerA: "🏆 Idea A wins!",
    winnerB: "🏆 Idea B wins!",
    tie: "🤝 It's a tie!",
    pointsDiff: "points difference",

    // Email Capture
    emailTitle: "📈 Get Weekly Viral Trends",
    emailSubtitle: "Top-performing hooks, titles, and patterns — delivered free.",
    emailPlaceholder: "your@email.com",
    subscribe: "Subscribe",
    subscribed: "✅ You're in! Weekly viral trends coming soon.",

    // Leaderboard
    leaderboardTitle: "🏆 Top Viral Scores",

    // History
    historyTitle: "🕐 Recent Analyses",
    justNow: "just now",
    minAgo: "m ago",
    hAgo: "h ago",
    dAgo: "d ago",

    // Platform
    youtube: "YouTube",
    tiktok: "TikTok",
    reels: "Reels",

    // Paywall
    limitReached: "Daily Limit Reached",
    usedAnalyses: "You've used {used}/{total} free analyses today.",
    proPlan: "Pro Plan",
    proSubtitle: "Unlimited analyses + priority features",
    proFeature1: "Unlimited daily analyses",
    proFeature2: "Advanced scoring metrics",
    proFeature3: "Export results as PDF",
    proFeature4: "Priority support",
    upgradeNow: "Upgrade to Pro →",
    paymentEmail: "Your email for payment",
    payNow: "Pay ₽490 →",
    creatingPayment: "Creating payment...",
    comeBackTomorrow: "Or come back tomorrow for 3 more free analyses",
    maybeLater: "Maybe later",
    paymentError: "Payment creation failed. Try again later.",

    // Pricing
    pricingTitle: "💎 Pricing",
    pricingSubtitle: "Start free. Upgrade when you need more.",
    free: "Free",
    forever: "forever",
    pro: "Pro",
    perMonth: "/month",
    team: "Team",
    mostPopular: "⭐ Most Popular",
    currentPlan: "Current Plan",
    contactUs: "Contact Us",

    // Testimonials
    testimonialsTitle: "💬 What Creators Say",

    // FAQ
    faqTitle: "❓ FAQ",
    faqQ1: "Is this actually AI?",
    faqA1:
      "Yes — when GROQ_API_KEY is configured, we use Llama 3.3 70B for explanations and improvements. The scoring engine itself is rule-based for instant results.",
    faqQ2: "How accurate is the score?",
    faqA2:
      "The scoring system is based on patterns from viral content research. It's a directional tool — use it to compare ideas and identify weak points, not as a guarantee of performance.",
    faqQ3: "What platforms does it support?",
    faqA3:
      "YouTube, TikTok, and Instagram Reels. Each platform has different scoring weights — TikTok prioritizes hooks, YouTube prioritizes thumbnails and titles.",
    faqQ4: "Is my data stored anywhere?",
    faqA4:
      "No. Everything runs in your browser. Your titles, hooks, and scores are stored locally on your device only.",
    faqQ5: "Can I use this for free?",
    faqA5:
      "Yes! You get 3 free analyses per day. Pro users get unlimited access plus advanced features.",

    // Social proof
    trustedBy: "Trusted by 10,000+ creators worldwide",

    // Footer
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    contact: "Contact",
    builtFor: "Built for creators • Not just AI — a viral prediction simulator",
  },
  ru: {
    badge: "Симулятор предсказания вирусности",
    heroTitle1: "Узнай вирусный потенциал",
    heroTitle2: "до публикации",
    heroSubtitle:
      "Анализируй идеи для YouTube и TikTok. Получай скор, метрики и улучшения — мгновенно.",

    tabAnalyze: "🚀 Анализ",
    tabCompare: "⚔️ Сравнить",

    videoTitle: "Заголовок видео",
    titlePlaceholder: "Например: Почему это всё изменило...",
    hookLabel: "Хук (первые 1–3 секунды)",
    hookPlaceholder: "Что зритель видит/слышит в первые секунды...",
    thumbnailLabel: "Описание превью",
    optional: "(необязательно)",
    thumbnailPlaceholder:
      "Например: лицо с шокированным выражением, крупный красный текст",
    analyzeBtn: "🚀 Анализировать",
    analyzing: "Анализируем...",

    viralScore: "Виральный скор",
    ctr: "CTR (кликабельность)",
    retention: "Удержание",
    engagement: "Вовлечённость",
    improvedTitles: "✨ Улучшенные заголовки",
    improvedHooks: "🎯 Улучшенные хуки",
    aiTips: "🧠 AI Советы",
    poweredByAI: "Powered by AI",
    benchmarkTitle: "📊 Ты vs Вирусный бенчмарк",
    metric: "Метрика",
    yourScore: "Твой скор",
    viralBenchmark: "Бенчмарк",
    gap: "Разрыв",
    shareOnX: "🐦 Поделиться в X",
    copyResult: "📋 Копировать результат",
    tryAgain: "🔄 Попробовать с улучшенной версией",
    challenge: "⚔️ Бросить вызов другу",
    copiedToClipboard: "Скопировано!",

    shockTop: "🔥 Топ 10% виральности!",
    shockGood: "⚡ Можно удвоить просмотры небольшими правками",
    shockMedium: "📈 Хорошая база — нужны хуки сильнее",
    shockLow: "⚠️ Высокий риск низких показателей. Нужна доработка.",

    compareTitle: "⚔️ Сравнить две идеи",
    ideaA: "Идея A",
    ideaB: "Идея B",
    titlePlaceholderA: "Заголовок A...",
    titlePlaceholderB: "Заголовок B...",
    hookPlaceholderA: "Хук A...",
    hookPlaceholderB: "Хук B...",
    compareBtn: "⚡ Сравнить",
    winnerA: "🏆 Идея A побеждает!",
    winnerB: "🏆 Идея B побеждает!",
    tie: "🤝 Ничья!",
    pointsDiff: "очков разницы",

    emailTitle: "📈 Тренды вирусности каждую неделю",
    emailSubtitle: "Топ хуки, заголовки и паттерны — бесплатно на email.",
    emailPlaceholder: "your@email.com",
    subscribe: "Подписаться",
    subscribed: "✅ Готово! Скоро пришлём первый выпуск.",

    leaderboardTitle: "🏆 Топ виральных скоров",

    historyTitle: "🕐 Недавние анализы",
    justNow: "только что",
    minAgo: " мин назад",
    hAgo: " ч назад",
    dAgo: " дн назад",

    youtube: "YouTube",
    tiktok: "TikTok",
    reels: "Reels",

    limitReached: "Лимит исчерпан",
    usedAnalyses: "Использовано {used}/{total} бесплатных анализов сегодня.",
    proPlan: "Pro Plan",
    proSubtitle: "Безлимитные анализы + приоритет",
    proFeature1: "Безлимитные анализы",
    proFeature2: "Расширенные метрики",
    proFeature3: "Экспорт в PDF",
    proFeature4: "Приоритетная поддержка",
    upgradeNow: "Перейти на Pro →",
    paymentEmail: "Email для оплаты",
    payNow: "Оплатить ₽490 →",
    creatingPayment: "Создаём платёж...",
    comeBackTomorrow: "Или возвращайся завтра — ещё 3 бесплатных анализа",
    maybeLater: "Позже",
    paymentError: "Ошибка создания платежа. Попробуйте позже.",

    pricingTitle: "💎 Тарифы",
    pricingSubtitle: "Начни бесплатно. Апгрейд когда нужно больше.",
    free: "Free",
    forever: "навсегда",
    pro: "Pro",
    perMonth: "/мес",
    team: "Team",
    mostPopular: "⭐ Популярный",
    currentPlan: "Текущий план",
    contactUs: "Связаться",

    testimonialsTitle: "💬 Что говорят создатели",

    faqTitle: "❓ Частые вопросы",
    faqQ1: "Это реально AI?",
    faqA1:
      "Да — когда настроен GROQ_API_KEY, мы используем Llama 3.3 70B для объяснений и улучшений. Сама система оценки — на правилах для мгновенных результатов.",
    faqQ2: "Насколько точен скор?",
    faqA2:
      "Скоринг построен на паттернах вирусного контента. Это направляющий инструмент — используй для сравнения идей и поиска слабых мест.",
    faqQ3: "Какие платформы поддерживаются?",
    faqA3:
      "YouTube, TikTok и Instagram Reels. У каждой платформы свои веса — TikTok ставит на хук, YouTube на превью и заголовок.",
    faqQ4: "Где хранятся мои данные?",
    faqA4:
      "Нигде. Всё работает в браузере. Заголовки, хуки и скоры сохраняются только локально на твоём устройстве.",
    faqQ5: "Можно использовать бесплатно?",
    faqA5:
      "Да! 3 бесплатных анализа в день. Pro — безлимит и расширенные функции.",

    trustedBy: "Используют 10 000+ создателей по всему миру",

    privacy: "Политика конфиденциальности",
    terms: "Условия использования",
    contact: "Контакты",
    builtFor: "Сделано для создателей • Симулятор виральности",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;

export function t(locale: Locale, key: TranslationKey): string {
  return translations[locale][key] || translations.en[key] || key;
}
