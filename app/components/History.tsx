"use client";

import { useEffect, useState } from "react";

interface HistoryEntry {
  title: string;
  hook: string;
  score: number;
  timestamp: number;
}

const STORAGE_KEY = "viral-history";

export function addToHistory(title: string, hook: string, score: number) {
  if (typeof window === "undefined") return;

  const existing = getHistory();
  existing.unshift({ title, hook, score, timestamp: Date.now() });

  // Keep last 10
  const trimmed = existing.slice(0, 10);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

interface HistoryProps {
  onSelect: (title: string, hook: string) => void;
}

export default function History({ onSelect }: HistoryProps) {
  const [entries, setEntries] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    setEntries(getHistory());
  }, []);

  if (entries.length === 0) return null;

  const timeAgo = (ts: number) => {
    const diff = Date.now() - ts;
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="w-full max-w-2xl mt-6 bg-[#141420] p-5 rounded-2xl border border-white/10">
      <h3 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2">
        🕐 Recent Analyses
      </h3>
      <div className="space-y-2">
        {entries.slice(0, 5).map((entry, i) => (
          <button
            key={i}
            onClick={() => onSelect(entry.title, entry.hook)}
            className="w-full flex items-center justify-between p-3 bg-[#0b0b12] rounded-lg border border-white/5 hover:border-purple-500/30 transition cursor-pointer text-left"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-200 truncate">{entry.title}</p>
              <p className="text-xs text-gray-500 mt-0.5">{timeAgo(entry.timestamp)}</p>
            </div>
            <span
              className={`ml-3 font-bold text-sm ${
                entry.score >= 75
                  ? "text-green-400"
                  : entry.score >= 50
                    ? "text-purple-400"
                    : "text-yellow-400"
              }`}
            >
              {entry.score}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
