"use client";

import { useLocale } from "@/lib/locale-context";

export default function LocaleSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="fixed top-4 right-4 z-40 flex items-center gap-1 bg-[#141420] p-1 rounded-lg border border-white/10 backdrop-blur">
      <button
        onClick={() => setLocale("en")}
        className={`px-3 py-1 rounded text-xs font-medium transition cursor-pointer ${
          locale === "en"
            ? "bg-purple-500/20 text-purple-300"
            : "text-gray-400 hover:text-gray-200"
        }`}
      >
        🇬🇧 EN
      </button>
      <button
        onClick={() => setLocale("ru")}
        className={`px-3 py-1 rounded text-xs font-medium transition cursor-pointer ${
          locale === "ru"
            ? "bg-purple-500/20 text-purple-300"
            : "text-gray-400 hover:text-gray-200"
        }`}
      >
        🇷🇺 RU
      </button>
    </div>
  );
}
