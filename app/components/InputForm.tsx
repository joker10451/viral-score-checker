"use client";

interface InputFormProps {
  title: string;
  setTitle: (v: string) => void;
  hook: string;
  setHook: (v: string) => void;
  thumbnail: string;
  setThumbnail: (v: string) => void;
  onAnalyze: () => void;
  loading: boolean;
}

export default function InputForm({
  title,
  setTitle,
  hook,
  setHook,
  thumbnail,
  setThumbnail,
  onAnalyze,
  loading,
}: InputFormProps) {
  return (
    <div className="w-full max-w-2xl mt-10 bg-[#141420] p-6 rounded-2xl shadow-xl border border-white/10">
      <label className="text-sm text-gray-400 font-medium">Video Title</label>
      <input
        className="w-full mt-2 p-3 rounded-lg bg-[#0b0b12] border border-white/10 focus:outline-none focus:border-purple-500 transition text-white placeholder-gray-600"
        placeholder="e.g. Why This Changed Everything..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label className="text-sm text-gray-400 font-medium mt-4 block">
        Hook (first 1–3 seconds)
      </label>
      <textarea
        className="w-full mt-2 p-3 rounded-lg bg-[#0b0b12] border border-white/10 focus:outline-none focus:border-purple-500 transition text-white placeholder-gray-600 resize-none"
        rows={3}
        placeholder="What viewers hear/see in the first seconds..."
        value={hook}
        onChange={(e) => setHook(e.target.value)}
      />

      <label className="text-sm text-gray-400 font-medium mt-4 block">
        Thumbnail Description{" "}
        <span className="text-gray-600">(optional)</span>
      </label>
      <input
        className="w-full mt-2 p-3 rounded-lg bg-[#0b0b12] border border-white/10 focus:outline-none focus:border-purple-500 transition text-white placeholder-gray-600"
        placeholder="e.g. Face with shocked expression, red bold text overlay"
        value={thumbnail}
        onChange={(e) => setThumbnail(e.target.value)}
      />

      <button
        onClick={onAnalyze}
        disabled={loading || (!title && !hook)}
        className="w-full mt-5 p-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Analyzing...
          </span>
        ) : (
          "🚀 Analyze Viral Score"
        )}
      </button>
    </div>
  );
}
