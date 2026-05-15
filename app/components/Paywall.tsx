"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/lib/locale-context";

const FREE_LIMIT = 3;
const STORAGE_KEY = "viral-daily-uses";
const PRO_KEY = "viral-pro-user";

interface DailyUse {
  date: string;
  count: number;
}

function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

export function getUsageCount(): number {
  if (typeof window === "undefined") return 0;
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return 0;
    const usage: DailyUse = JSON.parse(data);
    if (usage.date !== getToday()) return 0;
    return usage.count;
  } catch {
    return 0;
  }
}

export function incrementUsage(): void {
  if (typeof window === "undefined") return;
  const current = getUsageCount();
  const usage: DailyUse = { date: getToday(), count: current + 1 };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(usage));
}

export function isProUser(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(PRO_KEY) === "true";
}

export function activatePro(): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(PRO_KEY, "true");
}

export function canAnalyze(): boolean {
  if (isProUser()) return true;
  return getUsageCount() < FREE_LIMIT;
}

interface PaywallProps {
  onClose: () => void;
}

export default function Paywall({ onClose }: PaywallProps) {
  const { t } = useLocale();
  const [usageCount, setUsageCount] = useState(0);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showEmail, setShowEmail] = useState(false);

  useEffect(() => {
    setUsageCount(getUsageCount());

    const params = new URLSearchParams(window.location.search);
    if (params.get("payment") === "success") {
      activatePro();
      window.history.replaceState({}, "", window.location.pathname);
      onClose();
    }
  }, [onClose]);

  const handleUpgrade = async () => {
    if (!email) {
      setShowEmail(true);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/payment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, plan: "pro" }),
      });

      const data = await res.json();

      if (data.url) {
        localStorage.setItem("viral-pending-order", data.orderId);
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("Payment error:", err);
      alert(t("paymentError"));
    } finally {
      setLoading(false);
    }
  };

  const usedText = t("usedAnalyses")
    .replace("{used}", String(usageCount))
    .replace("{total}", String(FREE_LIMIT));

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#141420] p-8 rounded-2xl border border-white/10 max-w-md w-full animate-score-reveal">
        <div className="text-center">
          <div className="text-4xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold">{t("limitReached")}</h2>
          <p className="text-gray-400 mt-2">{usedText}</p>

          <div className="mt-6 space-y-3">
            <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-5 rounded-xl border border-purple-500/30">
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <p className="font-semibold text-purple-300">
                    {t("proPlan")}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {t("proSubtitle")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-white">₽490</p>
                  <p className="text-xs text-gray-500">{t("perMonth")}</p>
                </div>
              </div>

              <ul className="mt-4 space-y-2 text-sm text-gray-300 text-left">
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span> {t("proFeature1")}
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span> {t("proFeature2")}
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span> {t("proFeature3")}
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span> {t("proFeature4")}
                </li>
              </ul>

              {showEmail && (
                <input
                  type="email"
                  placeholder={t("paymentEmail")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full mt-4 p-3 rounded-lg bg-[#0b0b12] border border-white/10 focus:outline-none focus:border-purple-500 transition text-white placeholder-gray-600 text-sm"
                />
              )}

              <button
                onClick={handleUpgrade}
                disabled={loading}
                className="w-full mt-4 p-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 transition font-semibold cursor-pointer disabled:opacity-50"
              >
                {loading
                  ? t("creatingPayment")
                  : showEmail
                    ? t("payNow")
                    : t("upgradeNow")}
              </button>
            </div>

            <p className="text-xs text-gray-500">{t("comeBackTomorrow")}</p>
          </div>

          <button
            onClick={onClose}
            className="mt-4 text-sm text-gray-500 hover:text-gray-300 transition cursor-pointer"
          >
            {t("maybeLater")}
          </button>
        </div>
      </div>
    </div>
  );
}
