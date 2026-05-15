"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/lib/locale-context";

interface LeaderboardEntry {
  title: string;
  score: number;
  timestamp: number;
}

const STORAGE_KEY = "viral-leaderboard";

export function addToLeaderboard(title: string, score: number) {
  if (typeof window === "undefined") return;

  const existing = getLeaderboard();
  existing.push({ title, score, timestamp: Date.now() });

  existing.sort((a, b) => b.score - a.score);
  const top = existing.slice(0, 20);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(top));
}

export function getLeaderboard(): LeaderboardEntry[] {
  if (typeof window === "undefined") return [];

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export default function Leaderboard() {
  const { t } = useLocale();
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    setEntries(getLeaderboard());
  }, []);

  if (entries.length === 0) return null;

  const getMedal = (index: number) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return `#${index + 1}`;
  };

  return (
    <div className="w-full max-w-2xl mt-10 bg-[#141420] p-6 rounded-2xl border border-white/10">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        {t("leaderboardTitle")}
      </h2>
      <div className="space-y-2">
        {entries.slice(0, 10).map((entry, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-3 bg-[#0b0b12] rounded-lg border border-white/5"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg w-8">{getMedal(i)}</span>
              <span className="text-sm text-gray-300 truncate max-w-[200px] md:max-w-[350px]">
                {entry.title}
              </span>
            </div>
            <span
              className={`font-bold text-sm ${
                entry.score >= 75
                  ? "text-green-400"
                  : entry.score >= 50
                    ? "text-purple-400"
                    : "text-yellow-400"
              }`}
            >
              {entry.score}/100
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
