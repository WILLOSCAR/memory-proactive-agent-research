import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "127.0.0.1:8766";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("127.0.0.1") || host.startsWith("localhost") ? "http" : "https");
  const socialImage = `${protocol}://${host}/og.png`;

  return {
    title: "Auto Research OS | Memory, Proactive & Personalization",
    description:
      "A canonical research control plane connecting Tracks, Sources, Candidates, Specs, Runs, Decisions, and Paper Threads.",
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
    openGraph: {
      title: "Auto Research OS",
      description: "Source pressure → Candidate → Spec → Run → Evidence → Decision",
      images: [{ url: socialImage, width: 1200, height: 630, alt: "Auto Research OS dashboard" }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Auto Research OS",
      description: "Source pressure → Candidate → Spec → Run → Evidence → Decision",
      images: [socialImage],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
