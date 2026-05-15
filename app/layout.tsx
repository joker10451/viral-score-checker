import type { Metadata } from "next";
import "./globals.css";
import { LocaleProvider } from "@/lib/locale-context";
import LocaleSwitcher from "./components/LocaleSwitcher";

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
      <body className="antialiased">
        <LocaleProvider>
          <LocaleSwitcher />
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
