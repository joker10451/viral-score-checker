"use client";

import { ScoringResult } from "@/lib/scoring";
import { useLocale } from "@/lib/locale-context";
import ScoreCard from "./ScoreCard";

interface ResultsProps {
  result: ScoringResult;
  onTryAgain: () => void;
  title: string;
}

function ShareCard({ score }: { score: number }) {
  const { t } = useLocale();
  return (
    <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-6 rounded-2xl text-white w-full">
      <h2 className="text-lg font-bold">{t("viralScore")}</h2>
      <div className="text-4xl font-bold mt-3">{score}/100</div>
      <p className="mt-2 text-sm opacity-90">{t("heroSubtitle")}</p>
      <div className="mt-4 bg-black/20 p-3 rounded-lg text-xs">
        &quot;Higher score = higher chance of going viral&quot;
      </div>
    </div>
  );
}

export default function Results({ result, onTryAgain, title }: ResultsProps) {
  const { t } = useLocale();

  const getShareUrl = () => {
    const base = window.location.origin;
    const params = new URLSearchParams({
      title,
      hook: "",
      score: result.viralScore.toString(),
    });
    return `${base}/result?${params.toString()}`;
  };

  const handleShare = () => {
    const url = getShareUrl();
    const text = encodeURIComponent(
      `My Viral Score: ${result.viralScore}/100 🔥\n\n${url}`
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
  };

  const handleCopy = () => {
    const url = getShareUrl();
    navigator.clipboard.writeText(
      `My Viral Score: ${result.viralScore}/100 🔥\nTitle: "${title}"\n\n${url}`
    );
    alert(t("copiedToClipboard"));
  };

  return (
    <div className="w-full max-w-4xl mt-10 animate-fade-up">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ScoreCard
          viralScore={result.viralScore}
          ctrScore={result.ctrScore}
          retentionScore={result.retentionScore}
          engagementScore={result.engagementScore}
          explanation={result.explanation}
        />

        <div className="space-y-6">
          <div className="bg-[#141420] p-6 rounded-2xl border border-white/10">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              {t("improvedTitles")}
            </h2>
            <div className="mt-3 space-y-2">
              {result.improvements.titles.map((tt, i) => (
                <div
                  key={i}
                  className={`p-3 bg-[#0b0b12] rounded-lg border border-white/10 text-sm text-gray-200 animate-fade-up opacity-0 delay-${(i + 1) * 100}`}
                >
                  {tt}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#141420] p-6 rounded-2xl border border-white/10">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              {t("improvedHooks")}
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

      {/* AI Tips */}
      {result.tips && result.tips.length > 0 && (
        <div className="mt-6 bg-gradient-to-r from-purple-500/5 to-blue-500/5 p-6 rounded-2xl border border-purple-500/20">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            {t("aiTips")}
            {result.aiPowered && (
              <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full">
                {t("poweredByAI")}
              </span>
            )}
          </h2>
          <div className="space-y-2">
            {result.tips.map((tip, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 bg-[#0b0b12] rounded-lg border border-white/5"
              >
                <span className="text-purple-400 mt-0.5">💡</span>
                <p className="text-sm text-gray-300">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Benchmark */}
      <div className="mt-6 bg-[#141420] p-6 rounded-2xl border border-white/10">
        <h2 className="text-xl font-semibold mb-4">{t("benchmarkTitle")}</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-400 border-b border-white/10">
                <th className="text-left py-2">{t("metric")}</th>
                <th className="text-center py-2">{t("yourScore")}</th>
                <th className="text-center py-2">{t("viralBenchmark")}</th>
                <th className="text-center py-2">{t("gap")}</th>
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
                <td className="py-2 text-gray-300">{t("retention")}</td>
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
                <td className="py-2 text-gray-300">{t("engagement")}</td>
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

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <ShareCard score={result.viralScore} />

        <div className="flex flex-col gap-3 justify-center">
          <button
            onClick={handleShare}
            className="w-full p-3 rounded-lg bg-[#1DA1F2] hover:opacity-90 transition font-semibold cursor-pointer"
          >
            {t("shareOnX")}
          </button>
          <button
            onClick={handleCopy}
            className="w-full p-3 rounded-lg bg-white/10 hover:bg-white/15 transition font-semibold border border-white/10 cursor-pointer"
          >
            {t("copyResult")}
          </button>
          <button
            onClick={onTryAgain}
            className="w-full p-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 transition font-semibold cursor-pointer"
          >
            {t("tryAgain")}
          </button>
          <button
            onClick={() => {
              const url = getShareUrl();
              const text = encodeURIComponent(
                `I scored ${result.viralScore}/100 🔥\n\nCan you beat me? 👇\n${url}`
              );
              window.open(
                `https://twitter.com/intent/tweet?text=${text}`,
                "_blank"
              );
            }}
            className="w-full p-3 rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 hover:opacity-90 transition font-semibold cursor-pointer"
          >
            {t("challenge")}
          </button>
        </div>
      </div>
    </div>
  );
}
