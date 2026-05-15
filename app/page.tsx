"use client";

import { useState } from "react";
import InputForm from "./components/InputForm";
import Results from "./components/Results";
import History, { addToHistory } from "./components/History";
import Leaderboard, { addToLeaderboard } from "./components/Leaderboard";
import PlatformSelector, { Platform } from "./components/PlatformSelector";
import CompareMode from "./components/CompareMode";
import EmailCapture from "./components/EmailCapture";
import Paywall, { canAnalyze, incrementUsage } from "./components/Paywall";
import { Testimonials, Pricing, FAQ } from "./components/Landing";
import { ScoringResult } from "@/lib/scoring";

type Tab = "analyze" | "compare";

export default function Page() {
  const [title, setTitle] = useState("");
  const [hook, setHook] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [result, setResult] = useState<ScoringResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [historyKey, setHistoryKey] = useState(0);
  const [platform, setPlatform] = useState<Platform>("youtube");
  const [tab, setTab] = useState<Tab>("analyze");
  const [showPaywall, setShowPaywall] = useState(false);

  const analyze = async () => {
    if (!title && !hook) return;

    // Check daily limit
    if (!canAnalyze()) {
      setShowPaywall(true);
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, hook, thumbnail, platform }),
      });

      const data: ScoringResult = await res.json();
      setResult(data);

      incrementUsage();
      addToHistory(title, hook, data.viralScore);
      addToLeaderboard(title, data.viralScore);
      setHistoryKey((k) => k + 1);
    } catch (err) {
      console.error("Analysis failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleTryAgain = () => {
    if (result) {
      setTitle(result.improvements.titles[0] || title);
      setHook(result.improvements.hooks[0] || hook);
      setResult(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSelectHistory = (t: string, h: string) => {
    setTitle(t);
    setHook(h);
    setResult(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#0b0b12] text-white flex flex-col items-center p-6">
      {/* Paywall Modal */}
      {showPaywall && <Paywall onClose={() => setShowPaywall(false)} />}

      {/* Hero */}
      <div className="text-center mt-12 max-w-3xl">
        <div className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium mb-4">
          Viral Content Prediction Simulator
        </div>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Predict Your Viral Potential
          </span>
          <br />
          <span className="text-white">Before Posting</span>
        </h1>
        <p className="text-gray-400 mt-4 text-lg max-w-xl mx-auto">
          Analyze your YouTube & TikTok content ideas. Get a viral score,
          breakdown metrics, and AI-style improvements — instantly.
        </p>
      </div>

      {/* Platform Selector */}
      <PlatformSelector platform={platform} setPlatform={setPlatform} />

      {/* Tab Switcher */}
      <div className="flex items-center gap-2 mt-6 bg-[#141420] p-1 rounded-xl border border-white/10">
        <button
          onClick={() => setTab("analyze")}
          className={`px-5 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${
            tab === "analyze"
              ? "bg-purple-500/20 text-purple-300"
              : "text-gray-400 hover:text-gray-200"
          }`}
        >
          🚀 Analyze
        </button>
        <button
          onClick={() => setTab("compare")}
          className={`px-5 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${
            tab === "compare"
              ? "bg-purple-500/20 text-purple-300"
              : "text-gray-400 hover:text-gray-200"
          }`}
        >
          ⚔️ Compare
        </button>
      </div>

      {/* Analyze Tab */}
      {tab === "analyze" && (
        <>
          <InputForm
            title={title}
            setTitle={setTitle}
            hook={hook}
            setHook={setHook}
            thumbnail={thumbnail}
            setThumbnail={setThumbnail}
            onAnalyze={analyze}
            loading={loading}
          />

          {!result && (
            <History key={historyKey} onSelect={handleSelectHistory} />
          )}

          {result && (
            <Results
              result={result}
              onTryAgain={handleTryAgain}
              title={title}
            />
          )}
        </>
      )}

      {/* Compare Tab */}
      {tab === "compare" && <CompareMode platform={platform} />}

      {/* Email Capture */}
      {!result && <EmailCapture />}

      {/* Leaderboard */}
      <Leaderboard key={historyKey + 100} />

      {/* Testimonials */}
      <Testimonials />

      {/* Pricing */}
      <Pricing />

      {/* FAQ */}
      <FAQ />

      {/* Social Proof */}
      {!result && tab === "analyze" && (
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm">
            Trusted by 10,000+ creators worldwide
          </p>
          <div className="flex items-center justify-center gap-6 mt-4 text-gray-600 text-xs">
            <span>🎬 YouTube</span>
            <span>📱 TikTok</span>
            <span>📸 Instagram Reels</span>
            <span>🎵 Shorts</span>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-20 pb-8 text-center w-full max-w-4xl border-t border-white/5 pt-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Viral Score Checker
          </div>
          <div className="flex items-center gap-6 text-xs text-gray-500">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Contact</span>
          </div>
          <p className="text-gray-600 text-xs">
            © 2025 Viral Score Checker
          </p>
        </div>
      </footer>
    </div>
  );
}
