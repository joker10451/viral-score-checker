/**
 * Groq AI Integration (Free Tier)
 *
 * Бесплатно: 14,400 req/day, 30 req/min
 * Модель: llama-3.3-70b-versatile
 */

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";

export type AILocale = "en" | "ru";

interface AIAnalysis {
  explanation: string;
  titles: string[];
  hooks: string[];
  tips: string[];
}

function getPrompt(
  title: string,
  hook: string,
  viralScore: number,
  ctrScore: number,
  retentionScore: number,
  engagementScore: number,
  locale: AILocale
): { system: string; user: string } {
  if (locale === "ru") {
    return {
      system:
        "Ты эксперт по вирусному контенту. Отвечай ТОЛЬКО валидным JSON, без markdown и без обёртки. Все строки на русском языке.",
      user: `Проанализируй идею для YouTube/TikTok видео.

Заголовок: "${title}"
Хук: "${hook}"

Оценки (0-100):
- Виральный скор: ${viralScore}
- CTR (кликабельность): ${ctrScore}
- Удержание: ${retentionScore}
- Вовлечённость: ${engagementScore}

Ответь ТОЛЬКО в JSON формате (без markdown):
{
  "explanation": "2-3 предложения почему этот контент станет/не станет вирусным. Конкретно укажи что работает, а что нет.",
  "titles": ["3 улучшенных варианта заголовка"],
  "hooks": ["3 улучшенных варианта хука для удержания зрителя"],
  "tips": ["3 конкретных совета как улучшить контент"]
}`,
    };
  }

  return {
    system:
      "You are a viral content strategist. Always respond with valid JSON only. No markdown formatting.",
    user: `You are a viral content expert. Analyze this YouTube/TikTok content idea and provide actionable feedback.

Title: "${title}"
Hook: "${hook}"

Scores (0-100):
- Viral Score: ${viralScore}
- CTR: ${ctrScore}
- Retention: ${retentionScore}
- Engagement: ${engagementScore}

Respond in JSON format ONLY (no markdown, no code blocks):
{
  "explanation": "2-3 sentences explaining why this content will or won't go viral. Be specific about what works and what doesn't.",
  "titles": ["3 improved title alternatives that would score higher"],
  "hooks": ["3 improved hook alternatives that would retain viewers better"],
  "tips": ["3 specific actionable tips to improve this content"]
}`,
  };
}

export async function getAIAnalysis(
  title: string,
  hook: string,
  viralScore: number,
  ctrScore: number,
  retentionScore: number,
  engagementScore: number,
  locale: AILocale = "en"
): Promise<AIAnalysis | null> {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) return null;

  const { system, user } = getPrompt(
    title,
    hook,
    viralScore,
    ctrScore,
    retentionScore,
    engagementScore,
    locale
  );

  try {
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
        temperature: 0.7,
        max_tokens: 600,
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      console.error("Groq API error:", response.status);
      return null;
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) return null;

    const parsed = JSON.parse(content);

    return {
      explanation: parsed.explanation || "",
      titles: Array.isArray(parsed.titles) ? parsed.titles.slice(0, 3) : [],
      hooks: Array.isArray(parsed.hooks) ? parsed.hooks.slice(0, 3) : [],
      tips: Array.isArray(parsed.tips) ? parsed.tips.slice(0, 3) : [],
    };
  } catch (error) {
    console.error("AI analysis failed:", error);
    return null;
  }
}
