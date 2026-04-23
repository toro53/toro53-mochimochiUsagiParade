import type { Metadata } from "next";
import { Noto_Serif_JP, IM_Fell_English_SC, Klee_One } from "next/font/google";
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

const kleeOne = Klee_One({
  variable: "--font-klee",
  subsets: ["latin"],
  weight: "600",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mochimochi-usagi-parade.vercel.app"),
  title: "もちもちうさぎパレード",
  description: "同人音楽サークル もちもちうさぎパレード。M3・ボーマス等のイベントに参加するロック系同人サークルです。",
  keywords: ["もちもちうさぎパレード", "同人音楽", "M3", "ボーマス", "同人サークル", "ロック"],
  openGraph: {
    title: "もちもちうさぎパレード",
    description: "同人音楽サークル もちもちうさぎパレード。M3・ボーマス等のイベントに参加するロック系同人サークルです。",
    url: "https://mochimochi-usagi-parade.vercel.app",
    siteName: "もちもちうさぎパレード",
    images: [
      {
        url: "/Music/clear-sky-one-bird/jacket.png",
        width: 600,
        height: 600,
        alt: "もちもちうさぎパレード",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "もちもちうさぎパレード",
    description: "同人音楽サークル もちもちうさぎパレード",
    site: "@mochiusaparade",
    creator: "@mochiusaparade",
    images: ["/Music/clear-sky-one-bird/jacket.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSerifJP.variable} ${imFell.variable} ${kleeOne.variable}`}>
      <body className="min-h-screen flex flex-col">
        <PlayerProvider>
          {children}
          <AudioPlayer />
        </PlayerProvider>
      </body>
    </html>
  );
}
