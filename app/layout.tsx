import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Viral Score Checker — Predict Your Viral Potential",
  description:
    "A viral content prediction simulator for creators. Analyze your YouTube/TikTok content ideas and get a viral score before posting.",
  openGraph: {
    title: "Viral Score Checker",
    description: "Predict your content's viral potential before posting",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
