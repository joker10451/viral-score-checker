"use client";

interface ScoreCardProps {
  viralScore: number;
  ctrScore: number;
  retentionScore: number;
  engagementScore: number;
  explanation: string;
}

function ScoreCircle({ score }: { score: number }) {
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (score / 100) * circumference;

  const getColor = (s: number) => {
    if (s >= 75) return "#22c55e";
    if (s >= 50) return "#a855f7";
    if (s >= 30) return "#f59e0b";
    return "#ef4444";
  };

  return (
    <div className="relative w-36 h-36 mx-auto animate-score-reveal">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r="54"
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="8"
        />
        <circle
          cx="60"
          cy="60"
          r="54"
          fill="none"
          stroke={getColor(score)}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold">{score}</span>
        <span className="text-xs text-gray-400">/100</span>
      </div>
    </div>
  );
}

function ScoreBar({
  label,
  value,
  color,
  delay,
}: {
  label: string;
  value: number;
  color: string;
  delay: string;
}) {
  return (
    <div className={`animate-fade-up opacity-0 ${delay}`}>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-300">{label}</span>
        <span className="text-gray-400">{value}%</span>
      </div>
      <div className="h-2.5 bg-white/5 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full animate-bar-grow ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export default function ScoreCard({
  viralScore,
  ctrScore,
  retentionScore,
  engagementScore,
  explanation,
}: ScoreCardProps) {
  const shockMessage =
    viralScore >= 80
      ? "🔥 Top 10% viral potential detected!"
      : viralScore >= 60
        ? "⚡ This could double your views with small tweaks"
        : viralScore >= 40
          ? "📈 Solid base — needs stronger hooks"
          : "⚠️ High risk of low performance. Rework needed.";

  return (
    <div className="bg-[#141420] p-6 rounded-2xl border border-white/10 animate-pulse-glow">
      <h2 className="text-xl font-semibold text-center mb-4">Viral Score</h2>

      <ScoreCircle score={viralScore} />

      <p className="text-center mt-4 text-sm font-medium text-purple-300">
        {shockMessage}
      </p>

      <div className="mt-6 space-y-4">
        <ScoreBar
          label="CTR (Click-Through Rate)"
          value={ctrScore}
          color="bg-blue-500"
          delay="delay-100"
        />
        <ScoreBar
          label="Retention"
          value={retentionScore}
          color="bg-purple-500"
          delay="delay-200"
        />
        <ScoreBar
          label="Engagement"
          value={engagementScore}
          color="bg-pink-500"
          delay="delay-300"
        />
      </div>

      <p className="text-gray-400 mt-5 text-sm leading-relaxed">
        {explanation}
      </p>
    </div>
  );
}
