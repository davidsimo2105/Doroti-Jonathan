import type { Metadata, Viewport } from "next";
import { Cardo, Pinyon_Script } from "next/font/google";
import LoadingScreen from "./loading-screen";
import "./globals.css";

const serif = Cardo({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const script = Pinyon_Script({
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
