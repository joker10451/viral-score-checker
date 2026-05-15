import { NextRequest, NextResponse } from "next/server";
import { analyzeContent, ScoringInput } from "@/lib/scoring";
import { getAIAnalysis, AILocale } from "@/lib/ai";

interface RequestBody extends ScoringInput {
  locale?: AILocale;
}

export async function POST(request: NextRequest) {
  try {
    const body: RequestBody = await request.json();

    if (!body.title && !body.hook) {
      return NextResponse.json(
        { error: "Title or hook is required" },
        { status: 400 }
      );
    }

    const result = analyzeContent({
      title: body.title || "",
      hook: body.hook || "",
      thumbnail: body.thumbnail || "",
      platform: body.platform || "youtube",
    });

    const aiResult = await getAIAnalysis(
      body.title || "",
      body.hook || "",
      result.viralScore,
      result.ctrScore,
      result.retentionScore,
      result.engagementScore,
      body.locale || "en"
    );

    if (aiResult) {
      return NextResponse.json({
        ...result,
        explanation: aiResult.explanation || result.explanation,
        improvements: {
          titles:
            aiResult.titles.length > 0
              ? aiResult.titles
              : result.improvements.titles,
          hooks:
            aiResult.hooks.length > 0
              ? aiResult.hooks
              : result.improvements.hooks,
        },
        tips: aiResult.tips,
        aiPowered: true,
      });
    }

    return NextResponse.json({
      ...result,
      tips: [],
      aiPowered: false,
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
