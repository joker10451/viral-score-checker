import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}): Promise<Metadata> {
  const params = await searchParams;
  const title = (params?.title as string) || "Check your viral potential";
  const score = (params?.score as string) || "0";

  const ogUrl = `/api/og?score=${encodeURIComponent(score)}&title=${encodeURIComponent(title)}`;

  return {
    title: `Viral Score: ${score}/100 — ${title}`,
    description: `This content scored ${score}/100 on the Viral Score Checker. Test your own content ideas!`,
    openGraph: {
      title: `My Viral Score: ${score}/100 🔥`,
      description: `"${title}" scored ${score}/100. Can you beat it?`,
      images: [{ url: ogUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `My Viral Score: ${score}/100 🔥`,
      description: `"${title}" scored ${score}/100. Can you beat it?`,
      images: [ogUrl],
    },
  };
}

export default function ResultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
