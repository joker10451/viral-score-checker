"use client";

import { useEffect, useState } from "react";

const FREE_LIMIT = 3;
const STORAGE_KEY = "viral-daily-uses";

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

export function canAnalyze(): boolean {
  return getUsageCount() < FREE_LIMIT;
}

interface PaywallProps {
  onClose: () => void;
}

export default function Paywall({ onClose }: PaywallProps) {
  const [usageCount, setUsageCount] = useState(0);

  useEffect(() => {
    setUsageCount(getUsageCount());
  }, []);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#141420] p-8 rounded-2xl border border-white/10 max-w-md w-full animate-score-reveal">
        <div className="text-center">
          <div className="text-4xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold">Daily Limit Reached</h2>
          <p className="text-gray-400 mt-2">
            You&apos;ve used {usageCount}/{FREE_LIMIT} free analyses today.
          </p>

          <div className="mt-6 space-y-3">
            {/* Pro Plan */}
            <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-5 rounded-xl border border-purple-500/30">
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <p className="font-semibold text-purple-300">Pro Plan</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Unlimited analyses + priority features
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-white">₽490</p>
                  <p className="text-xs text-gray-500">/мес</p>
                </div>
              </div>

              <ul className="mt-4 space-y-2 text-sm text-gray-300 text-left">
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span> Unlimited daily analyses
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span> Advanced scoring metrics
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span> Export results as PDF
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span> Priority support
                </li>
              </ul>

              <button className="w-full mt-4 p-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 transition font-semibold cursor-pointer">
                Upgrade to Pro →
              </button>
            </div>

            <p className="text-xs text-gray-500">
              Or come back tomorrow for 3 more free analyses
            </p>
          </div>

          <button
            onClick={onClose}
            className="mt-4 text-sm text-gray-500 hover:text-gray-300 transition cursor-pointer"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
