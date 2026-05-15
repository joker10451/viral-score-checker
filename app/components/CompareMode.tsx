"use client";

import { useState } from "react";
import { analyzeContent, ScoringResult, Platform } from "@/lib/scoring";

interface CompareModeProps {
  platform: Platform;
}

function MiniScoreCircle({ score }: { score: number }) {
  const color =
    score >= 75
      ? "#22c55e"
      : score >= 50
        ? "#a855f7"
        : score >= 30
          ? "#f59e0b"
          : "#ef4444";

  return (
    <div className="text-center">
      <div className="text-3xl font-bold" style={{ color }}>
        {score}
      </div>
      <div className="text-xs text-gray-500">/100</div>
    </div>
  );
}

function CompareBar({
  label,
  valueA,
  valueB,
  color,
}: {
  label: string;
  valueA: number;
  valueB: number;
  color: string;
}) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-gray-400">
        <span>{label}</span>
        <span>
          {valueA} vs {valueB}
        </span>
      </div>
      <div className="flex gap-1">
        <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${color}`}
            style={{ width: `${valueA}%` }}
          />
        </div>
        <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${color} opacity-50`}
            style={{ width: `${valueB}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default function CompareMode({ platform }: CompareModeProps) {
  const [titleA, setTitleA] = useState("");
  const [hookA, setHookA] = useState("");
  const [titleB, setTitleB] = useState("");
  const [hookB, setHookB] = useState("");
  const [resultA, setResultA] = useState<ScoringResult | null>(null);
  const [resultB, setResultB] = useState<ScoringResult | null>(null);

  const compare = () => {
    if (!titleA && !hookA && !titleB && !hookB) return;

    const a = analyzeContent({ title: titleA, hook: hookA, platform });
    const b = analyzeContent({ title: titleB, hook: hookB, platform });
    setResultA(a);
    setResultB(b);
  };

  const winner =
    resultA && resultB
      ? resultA.viralScore > resultB.viralScore
        ? "A"
        : resultA.viralScore < resultB.viralScore
          ? "B"
          : "TIE"
      : null;

  return (
    <div className="w-full max-w-4xl mt-10">
      <div className="bg-[#141420] p-6 rounded-2xl border border-white/10">
        <h2 className="text-xl font-semibold mb-6 text-center">
          ⚔️ Compare Two Ideas
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Idea A */}
          <div className="space-y-3">
            <div className="text-sm font-medium text-purple-400">Idea A</div>
            <input
              className="w-full p-3 rounded-lg bg-[#0b0b12] border border-white/10 focus:outline-none focus:border-purple-500 transition text-white placeholder-gray-600 text-sm"
              placeholder="Title A..."
              value={titleA}
              onChange={(e) => setTitleA(e.target.value)}
            />
            <textarea
              className="w-full p-3 rounded-lg bg-[#0b0b12] border border-white/10 focus:outline-none focus:border-purple-500 transition text-white placeholder-gray-600 text-sm resize-none"
              rows={2}
              placeholder="Hook A..."
              value={hookA}
              onChange={(e) => setHookA(e.target.value)}
            />
          </div>

          {/* Idea B */}
          <div className="space-y-3">
            <div className="text-sm font-medium text-blue-400">Idea B</div>
            <input
              className="w-full p-3 rounded-lg bg-[#0b0b12] border border-white/10 focus:outline-none focus:border-blue-500 transition text-white placeholder-gray-600 text-sm"
              placeholder="Title B..."
              value={titleB}
              onChange={(e) => setTitleB(e.target.value)}
            />
            <textarea
              className="w-full p-3 rounded-lg bg-[#0b0b12] border border-white/10 focus:outline-none focus:border-blue-500 transition text-white placeholder-gray-600 text-sm resize-none"
              rows={2}
              placeholder="Hook B..."
              value={hookB}
              onChange={(e) => setHookB(e.target.value)}
            />
          </div>
        </div>

        <button
          onClick={compare}
          disabled={!titleA && !hookA && !titleB && !hookB}
          className="w-full mt-5 p-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          ⚡ Compare
        </button>

        {/* Results */}
        {resultA && resultB && (
          <div className="mt-6 space-y-6 animate-fade-up">
            {/* Winner Banner */}
            {winner && (
              <div
                className={`text-center p-4 rounded-xl ${
                  winner === "A"
                    ? "bg-purple-500/10 border border-purple-500/30"
                    : winner === "B"
                      ? "bg-blue-500/10 border border-blue-500/30"
                      : "bg-white/5 border border-white/10"
                }`}
              >
                <span className="text-lg font-bold">
                  {winner === "TIE"
                    ? "🤝 It's a tie!"
                    : `🏆 Idea ${winner} wins!`}
                </span>
                <span className="text-sm text-gray-400 ml-2">
                  ({Math.abs(resultA.viralScore - resultB.viralScore)} points
                  difference)
                </span>
              </div>
            )}

            {/* Score Comparison */}
            <div className="grid grid-cols-3 items-center gap-4">
              <div className="text-center">
                <div className="text-xs text-purple-400 mb-2">Idea A</div>
                <MiniScoreCircle score={resultA.viralScore} />
              </div>
              <div className="text-center text-2xl text-gray-600">VS</div>
              <div className="text-center">
                <div className="text-xs text-blue-400 mb-2">Idea B</div>
                <MiniScoreCircle score={resultB.viralScore} />
              </div>
            </div>

            {/* Metric Bars */}
            <div className="space-y-3">
              <CompareBar
                label="CTR"
                valueA={resultA.ctrScore}
                valueB={resultB.ctrScore}
                color="bg-blue-500"
              />
              <CompareBar
                label="Retention"
                valueA={resultA.retentionScore}
                valueB={resultB.retentionScore}
                color="bg-purple-500"
              />
              <CompareBar
                label="Engagement"
                valueA={resultA.engagementScore}
                valueB={resultB.engagementScore}
                color="bg-pink-500"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
