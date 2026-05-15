"use client";

import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { analyzeContent, ScoringResult } from "@/lib/scoring";

const Results = dynamic(() => import("../components/Results"), { ssr: false });

function ResultContent() {
  const searchParams = useSearchParams();
  const [result, setResult] = useState<ScoringResult | null>(null);

  const title = searchParams.get("title") || "";
  const hook = searchParams.get("hook") || "";
  const thumbnail = searchParams.get("thumbnail") || "";

  useEffect(() => {
    if (title || hook) {
      const data = analyzeContent({ title, hook, thumbnail });
      setResult(data);
    }
  }, [title, hook, thumbnail]);

  const handleTryAgain = () => {
    window.location.href = "/";
  };

  if (!result) {
    return (
      <div className="min-h-screen bg-[#0b0b12] text-white flex items-center justify-center">
        <p className="text-gray-400">Loading result...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0b12] text-white flex flex-col items-center p-6">
      <div className="text-center mt-12">
        <div className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium mb-4">
          Shared Result
        </div>
        <h1 className="text-3xl md:text-4xl font-bold">
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Viral Score Result
          </span>
        </h1>
        {title && (
          <p className="text-gray-400 mt-2 text-lg">
            &quot;{title}&quot;
          </p>
        )}
      </div>

      <Results result={result} onTryAgain={handleTryAgain} title={title} />

      <footer className="mt-20 pb-8 text-center">
        <a
          href="/"
          className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 transition font-semibold"
        >
          🚀 Check Your Own Content
        </a>
      </footer>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0b0b12] text-white flex items-center justify-center">
          <p className="text-gray-400">Loading...</p>
        </div>
      }
    >
      <ResultContent />
    </Suspense>
  );
}
