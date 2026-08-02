import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Six-Branch Research Idea Forest",
  description:
    "An interactive map of Memory, Proactive Agent, and Personalization research directions.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US">
      <body>{children}</body>
    </html>
  );
}
