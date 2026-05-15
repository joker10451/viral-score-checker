"use client";

import { ScoringResult } from "@/lib/scoring";
import ScoreCard from "./ScoreCard";

interface ResultsProps {
  result: ScoringResult;
  onTryAgain: () => void;
  title: string;
}

function ShareCard({ score }: { score: number }) {
  return (
    <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-6 rounded-2xl text-white w-full">
      <h2 className="text-lg font-bold">My Viral Score Result</h2>
      <div className="text-4xl font-bold mt-3">{score}/100</div>
      <p className="mt-2 text-sm opacity-90">
        Predicted viral potential before posting.
      </p>
      <div className="mt-4 bg-black/20 p-3 rounded-lg text-xs">
        &quot;Higher score = higher chance of going viral&quot;
      </div>
    </div>
  );
}

export default function Results({ result, onTryAgain, title }: ResultsProps) {
  const getShareUrl = () => {
    const base = window.location.origin;
    const params = new URLSearchParams({
      title,
      hook: "",
      score: result.viralScore.toString(),
    });
    return `${base}/result?${params.toString()}`;
  };

  const shareText = `I just tested my content idea 🔥\n\nMy Viral Score: ${result.viralScore}/100\n\nTry it yourself 👇`;

  const handleShare = () => {
    const url = getShareUrl();
    const text = encodeURIComponent(`${shareText}\n${url}`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
  };

  const handleCopy = () => {
    const url = getShareUrl();
    navigator.clipboard.writeText(
      `My Viral Score: ${result.viralScore}/100 🔥\nTitle: "${title}"\n\nCheck yours at ${url}`
    );
    alert("Copied to clipboard!");
  };

  return (
    <div className="w-full max-w-4xl mt-10 animate-fade-up">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Score Card */}
        <ScoreCard
          viralScore={result.viralScore}
          ctrScore={result.ctrScore}
          retentionScore={result.retentionScore}
          engagementScore={result.engagementScore}
          explanation={result.explanation}
        />

        {/* Improvements */}
        <div className="space-y-6">
          <div className="bg-[#141420] p-6 rounded-2xl border border-white/10">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              ✨ Improved Titles
            </h2>
            <div className="mt-3 space-y-2">
              {result.improvements.titles.map((t, i) => (
                <div
                  key={i}
                  className={`p-3 bg-[#0b0b12] rounded-lg border border-white/10 text-sm text-gray-200 animate-fade-up opacity-0 delay-${(i + 1) * 100}`}
                >
                  {t}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#141420] p-6 rounded-2xl border border-white/10">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              🎯 Improved Hooks
            </h2>
            <div className="mt-3 space-y-2">
              {result.improvements.hooks.map((h, i) => (
                <div
                  key={i}
                  className={`p-3 bg-[#0b0b12] rounded-lg border border-white/10 text-sm text-gray-200 animate-fade-up opacity-0 delay-${(i + 1) * 100}`}
                >
                  {h}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Viral Benchmark Comparison */}
      <div className="mt-6 bg-[#141420] p-6 rounded-2xl border border-white/10">
        <h2 className="text-xl font-semibold mb-4">
          📊 You vs Viral Benchmark
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-400 border-b border-white/10">
                <th className="text-left py-2">Metric</th>
                <th className="text-center py-2">Your Score</th>
                <th className="text-center py-2">Viral Benchmark</th>
                <th className="text-center py-2">Gap</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/5">
                <td className="py-2 text-gray-300">CTR</td>
                <td className="text-center">{result.ctrScore}%</td>
                <td className="text-center text-green-400">85%</td>
                <td className="text-center">
                  <span
                    className={
                      result.ctrScore >= 85
                        ? "text-green-400"
                        : "text-red-400"
                    }
                  >
                    {result.ctrScore >= 85 ? "+" : ""}
                    {result.ctrScore - 85}%
                  </span>
                </td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-2 text-gray-300">Retention</td>
                <td className="text-center">{result.retentionScore}%</td>
                <td className="text-center text-green-400">80%</td>
                <td className="text-center">
                  <span
                    className={
                      result.retentionScore >= 80
                        ? "text-green-400"
                        : "text-red-400"
                    }
                  >
                    {result.retentionScore >= 80 ? "+" : ""}
                    {result.retentionScore - 80}%
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-2 text-gray-300">Engagement</td>
                <td className="text-center">{result.engagementScore}%</td>
                <td className="text-center text-green-400">78%</td>
                <td className="text-center">
                  <span
                    className={
                      result.engagementScore >= 78
                        ? "text-green-400"
                        : "text-red-400"
                    }
                  >
                    {result.engagementScore >= 78 ? "+" : ""}
                    {result.engagementScore - 78}%
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Share Card */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <ShareCard score={result.viralScore} />

        <div className="flex flex-col gap-3 justify-center">
          <button
            onClick={handleShare}
            className="w-full p-3 rounded-lg bg-[#1DA1F2] hover:opacity-90 transition font-semibold cursor-pointer"
          >
            🐦 Share on X
          </button>
          <button
            onClick={handleCopy}
            className="w-full p-3 rounded-lg bg-white/10 hover:bg-white/15 transition font-semibold border border-white/10 cursor-pointer"
          >
            📋 Copy Result
          </button>
          <button
            onClick={onTryAgain}
            className="w-full p-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 transition font-semibold cursor-pointer"
          >
            🔄 Try Again with Improved Version
          </button>
          <button
            onClick={() => {
              const url = getShareUrl();
              const text = encodeURIComponent(
                `I scored ${result.viralScore}/100 on Viral Score Checker 🔥\n\nCan you beat me? 👇\n${url}`
              );
              window.open(
                `https://twitter.com/intent/tweet?text=${text}`,
                "_blank"
              );
            }}
            className="w-full p-3 rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 hover:opacity-90 transition font-semibold cursor-pointer"
          >
            ⚔️ Challenge a Friend
          </button>
        </div>
      </div>
    </div>
  );
}
