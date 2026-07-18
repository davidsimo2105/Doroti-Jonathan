import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Alex_Brush } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const script = Alex_Brush({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Doroti & Jonatán — Esküvő",
  description: "Doroti és Jonatán esküvői meghívója — 2026.10.11.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu" className={`${cormorant.variable} ${script.variable}`}>
      <body>{children}</body>
    </html>
  );
}
