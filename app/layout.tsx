import type { Metadata, Viewport } from "next";
import { Prata, Great_Vibes } from "next/font/google";
import LoadingScreen from "./loading-screen";
import "./globals.css";

const serif = Prata({
  variable: "--font-serif",
  subsets: ["latin", "latin-ext"],
  weight: "400",
  style: ["normal"],
});

const script = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Doroti & Jonatán",
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
    <html lang="hu" className={`${serif.variable} ${script.variable}`}>
      <body>
        <LoadingScreen />
        {children}
      </body>
    </html>
  );
}
