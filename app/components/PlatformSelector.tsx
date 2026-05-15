"use client";

import { useLocale } from "@/lib/locale-context";

export type Platform = "youtube" | "tiktok" | "reels";

interface PlatformSelectorProps {
  platform: Platform;
  setPlatform: (p: Platform) => void;
}

const platformIcons: Record<Platform, string> = {
  youtube: "🎬",
  tiktok: "📱",
  reels: "📸",
};

export default function PlatformSelector({
  platform,
  setPlatform,
}: PlatformSelectorProps) {
  const { t } = useLocale();
  const platforms: { id: Platform; labelKey: "youtube" | "tiktok" | "reels" }[] = [
    { id: "youtube", labelKey: "youtube" },
    { id: "tiktok", labelKey: "tiktok" },
    { id: "reels", labelKey: "reels" },
  ];

  return (
    <div className="flex items-center gap-2 w-full max-w-2xl mt-6">
      {platforms.map((p) => (
        <button
          key={p.id}
          onClick={() => setPlatform(p.id)}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-medium transition cursor-pointer border ${
            platform === p.id
              ? "bg-purple-500/20 border-purple-500/50 text-purple-300"
              : "bg-[#141420] border-white/10 text-gray-400 hover:border-white/20"
          }`}
        >
          <span>{platformIcons[p.id]}</span>
          <span>{t(p.labelKey)}</span>
        </button>
      ))}
    </div>
  );
}
