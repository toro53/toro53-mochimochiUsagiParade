import type { Metadata } from "next";
import { Noto_Serif_JP, IM_Fell_English_SC } from "next/font/google";
import "./globals.css";
import { PlayerProvider } from "@/context/PlayerContext";
import AudioPlayer from "@/components/AudioPlayer";

const notoSerifJP = Noto_Serif_JP({
  variable: "--font-serif-jp",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const imFell = IM_Fell_English_SC({
  variable: "--font-fell",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "もちもちうさぎパレード",
  description: "同人音楽サークル「もちもちうさぎパレード」公式サイト",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSerifJP.variable} ${imFell.variable}`}>
      <body className="min-h-screen flex flex-col">
        <PlayerProvider>
          {children}
          <AudioPlayer />
        </PlayerProvider>
      </body>
    </html>
  );
}
