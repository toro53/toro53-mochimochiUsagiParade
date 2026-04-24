import type { Metadata } from "next";
import Link from "next/link";
import NewRelease from "@/components/NewRelease";
import Discography from "@/components/Discography";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "もちもちうさぎパレード — 視聴",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ListenPage() {
  return (
    <>
      <main className="min-h-screen bg-bg pt-16 pb-32">
        <div className="text-center py-10 px-8">
          <Link
            href="/"
            className="text-[0.6rem] tracking-[0.25em] text-fg-muted no-underline hover:text-fg transition-colors"
          >
            MOCHIMOCHI USAGI PARADE
          </Link>
          <h1 className="mt-2 text-[1.1rem] font-bold tracking-[0.12em] text-fg">
            視聴ページ
          </h1>
        </div>
        <NewRelease />
        <Discography />
        <div className="text-center py-16">
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-fg text-bg font-semibold rounded-full hover:bg-fg-muted transition-colors"
          >
            TOPへ
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
