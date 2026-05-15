export type Platform = "youtube" | "tiktok" | "reels";

export interface ScoringInput {
  title: string;
  hook: string;
  thumbnail?: string;
  platform?: Platform;
}

export interface ScoringResult {
  viralScore: number;
  ctrScore: number;
  retentionScore: number;
  engagementScore: number;
  explanation: string;
  improvements: {
    titles: string[];
    hooks: string[];
  };
  tips?: string[];
  aiPowered?: boolean;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function scoreTitle(title: string): number {
  let score = 50;
  const lower = title.toLowerCase();

  // Positive signals
  if (lower.includes("you")) score += 10;
  if (lower.includes("how")) score += 15;
  if (lower.includes("why")) score += 15;
  if (/\d+/.test(title)) score += 10;

  const curiosityPhrases = ["this", "secret", "never", "what happened", "nobody", "everyone"];
  for (const phrase of curiosityPhrases) {
    if (lower.includes(phrase)) {
      score += 15;
      break;
    }
  }

  if (title.length >= 40 && title.length <= 60) score += 10;

  // Negative signals
  if (title.length > 80) score -= 10;

  const genericPhrases = ["my video", "new video", "check this out", "watch this"];
  for (const phrase of genericPhrases) {
    if (lower.includes(phrase)) {
      score -= 10;
      break;
    }
  }

  return clamp(score, 0, 100);
}

function scoreHook(hook: string): number {
  let score = 50;
  const lower = hook.toLowerCase();

  // Positive signals
  if (hook.includes("?")) score += 15;

  const emotionalWords = ["insane", "crazy", "shocking", "unbelievable", "incredible", "mind-blowing", "wild", "terrifying"];
  for (const word of emotionalWords) {
    if (lower.includes(word)) {
      score += 15;
      break;
    }
  }

  const words = hook.split(/\s+/);
  if (words.length < 12) score += 10;

  const conflictWords = ["but", "however", "wrong", "actually", "instead", "problem"];
  for (const word of conflictWords) {
    if (lower.includes(word)) {
      score += 10;
      break;
    }
  }

  // Negative signals
  const vagueIntros = ["hey guys", "what's up", "so today", "in this video", "hello everyone"];
  for (const phrase of vagueIntros) {
    if (lower.startsWith(phrase)) {
      score -= 10;
      break;
    }
  }

  return clamp(score, 0, 100);
}

function scoreThumbnail(thumbnail: string): number {
  if (!thumbnail) return 50;

  let score = 50;
  const lower = thumbnail.toLowerCase();

  if (lower.includes("face") || lower.includes("person") || lower.includes("expression")) score += 10;
  if (lower.includes("contrast") || lower.includes("bold") || lower.includes("bright")) score += 10;
  if (lower.includes("red") || lower.includes("yellow") || lower.includes("orange")) score += 10;
  if (lower.includes("text") || lower.includes("overlay") || lower.includes("title")) score += 10;
  if (lower.includes("clutter") || lower.includes("busy") || lower.includes("messy")) score -= 10;

  return clamp(score, 0, 100);
}

function generateImprovedTitles(title: string): string[] {
  const lower = title.toLowerCase();
  const improvements: string[] = [];

  if (!/\d+/.test(title)) {
    improvements.push(`7 Reasons ${title} (You Won't Believe #3)`);
  } else {
    improvements.push(`Why ${title} Changes Everything`);
  }

  if (!lower.includes("secret") && !lower.includes("never")) {
    improvements.push(`The Secret Behind ${title.length > 30 ? title.substring(0, 30) + "..." : title}`);
  } else {
    improvements.push(`What Nobody Tells You About ${title.length > 25 ? title.substring(0, 25) + "..." : title}`);
  }

  if (!lower.includes("you")) {
    improvements.push(`You Need to See This: ${title.length > 35 ? title.substring(0, 35) + "..." : title}`);
  } else {
    improvements.push(`How ${title} Will Blow Your Mind`);
  }

  return improvements;
}

function generateImprovedHooks(hook: string): string[] {
  const lower = hook.toLowerCase();
  const improvements: string[] = [];

  if (!hook.includes("?")) {
    improvements.push(`What if I told you ${lower}?`);
  } else {
    improvements.push(`Stop. ${hook} Here's why.`);
  }

  if (!lower.includes("but") && !lower.includes("wrong")) {
    improvements.push(`Everyone thinks this is normal, but they're wrong.`);
  } else {
    improvements.push(`This changes everything you thought you knew.`);
  }

  improvements.push(`I can't believe this actually worked...`);

  return improvements;
}

function generateExplanation(ctr: number, retention: number, engagement: number): string {
  const parts: string[] = [];

  if (ctr >= 70) parts.push("Your title and thumbnail have strong click-through potential.");
  else if (ctr >= 50) parts.push("Your title could be more compelling to drive clicks.");
  else parts.push("Your title needs significant improvement to attract viewers.");

  if (retention >= 70) parts.push("Your hook is strong and should keep viewers watching.");
  else if (retention >= 50) parts.push("Your hook is decent but could be more engaging.");
  else parts.push("Your hook may cause early drop-off. Make it more captivating.");

  if (engagement >= 70) parts.push("Good engagement signals — viewers are likely to interact.");
  else if (engagement >= 50) parts.push("Moderate engagement potential. Add more emotional triggers.");
  else parts.push("Low engagement predicted. Add controversy or curiosity elements.");

  return parts.join(" ");
}

// Platform-specific weight multipliers
function getPlatformWeights(platform: Platform) {
  switch (platform) {
    case "tiktok":
      // TikTok: hook is king, thumbnail less important
      return { ctrTitle: 0.7, ctrThumb: 0.3, retentionBoost: 1.2, engTitle: 0.2, engHook: 0.6, engThumb: 0.2 };
    case "reels":
      // Reels: balanced but hook-heavy
      return { ctrTitle: 0.5, ctrThumb: 0.5, retentionBoost: 1.1, engTitle: 0.25, engHook: 0.55, engThumb: 0.2 };
    case "youtube":
    default:
      // YouTube: thumbnail and title are critical
      return { ctrTitle: 0.6, ctrThumb: 0.4, retentionBoost: 1.0, engTitle: 0.3, engHook: 0.5, engThumb: 0.2 };
  }
}

export function analyzeContent(input: ScoringInput): ScoringResult {
  const platform = input.platform || "youtube";
  const weights = getPlatformWeights(platform);

  const titleScore = scoreTitle(input.title);
  const hookScore = scoreHook(input.hook);
  const thumbScore = scoreThumbnail(input.thumbnail || "");

  const ctrScore = Math.round(titleScore * weights.ctrTitle + thumbScore * weights.ctrThumb);
  const retentionScore = Math.round(clamp(hookScore * weights.retentionBoost, 0, 100));
  const engagementScore = Math.round(titleScore * weights.engTitle + hookScore * weights.engHook + thumbScore * weights.engThumb);

  const viralScore = Math.round(ctrScore * 0.4 + retentionScore * 0.3 + engagementScore * 0.3);

  return {
    viralScore: clamp(viralScore, 0, 100),
    ctrScore: clamp(ctrScore, 0, 100),
    retentionScore: clamp(retentionScore, 0, 100),
    engagementScore: clamp(engagementScore, 0, 100),
    explanation: generateExplanation(ctrScore, retentionScore, engagementScore),
    improvements: {
      titles: generateImprovedTitles(input.title),
      hooks: generateImprovedHooks(input.hook),
    },
  };
}
