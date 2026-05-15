import { NextRequest, NextResponse } from "next/server";
import { analyzeContent, ScoringInput } from "@/lib/scoring";

export async function POST(request: NextRequest) {
  try {
    const body: ScoringInput = await request.json();

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

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
