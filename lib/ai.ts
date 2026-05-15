/**
 * Groq AI Integration (Free Tier)
 *
 * Бесплатно: 14,400 req/day, 30 req/min
 * Модель: llama-3.3-70b-versatile
 *
 * Получи API ключ: https://console.groq.com → API Keys → Create
 */

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";

interface AIAnalysis {
  explanation: string;
  titles: string[];
  hooks: string[];
  tips: string[];
}

export async function getAIAnalysis(
  title: string,
  hook: string,
  viralScore: number,
  ctrScore: number,
  retentionScore: number,
  engagementScore: number
): Promise<AIAnalysis | null> {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return null; // Fallback to rule-based if no API key
  }

  const prompt = `You are a viral content expert. Analyze this YouTube/TikTok content idea and provide actionable feedback.

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
}`;

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
          {
            role: "system",
            content:
              "You are a viral content strategist. Always respond with valid JSON only. No markdown formatting.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      console.error("Groq API error:", response.status);
      return null;
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) return null;

    // Parse JSON from response
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
