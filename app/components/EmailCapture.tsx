"use client";

import { useState } from "react";
import { useLocale } from "@/lib/locale-context";

export default function EmailCapture() {
  const { t } = useLocale();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const emails = JSON.parse(localStorage.getItem("viral-emails") || "[]");
    emails.push({ email, timestamp: Date.now() });
    localStorage.setItem("viral-emails", JSON.stringify(emails));

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="w-full max-w-2xl mt-10 bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-6 rounded-2xl border border-purple-500/20 text-center">
        <p className="text-purple-300 font-medium">{t("subscribed")}</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mt-10 bg-[#141420] p-6 rounded-2xl border border-white/10">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold">{t("emailTitle")}</h3>
        <p className="text-gray-400 text-sm mt-1">{t("emailSubtitle")}</p>
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          required
          placeholder={t("emailPlaceholder")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 p-3 rounded-lg bg-[#0b0b12] border border-white/10 focus:outline-none focus:border-purple-500 transition text-white placeholder-gray-600 text-sm"
        />
        <button
          type="submit"
          className="px-5 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 transition font-semibold text-sm cursor-pointer whitespace-nowrap"
        >
          {t("subscribe")}
        </button>
      </form>
    </div>
  );
}
