import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const score = searchParams.get("score") || "0";
  const title = searchParams.get("title") || "Untitled";

  const numScore = parseInt(score, 10);
  const color =
    numScore >= 75
      ? "#22c55e"
      : numScore >= 50
        ? "#a855f7"
        : numScore >= 30
          ? "#f59e0b"
          : "#ef4444";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0b0b12 0%, #1a1a2e 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "40px",
          }}
        >
          <div
            style={{
              fontSize: "24px",
              color: "#a78bfa",
              marginBottom: "20px",
              fontWeight: 600,
            }}
          >
            Viral Score Checker
          </div>

          <div
            style={{
              fontSize: "96px",
              fontWeight: 800,
              color: color,
              marginBottom: "10px",
            }}
          >
            {score}/100
          </div>

          <div
            style={{
              fontSize: "20px",
              color: "#9ca3af",
              maxWidth: "500px",
              textAlign: "center",
              marginTop: "10px",
            }}
          >
            &quot;{title.length > 50 ? title.substring(0, 50) + "..." : title}&quot;
          </div>

          <div
            style={{
              marginTop: "30px",
              fontSize: "16px",
              color: "#6b7280",
            }}
          >
            Check your viral potential → viralscorer.vercel.app
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
