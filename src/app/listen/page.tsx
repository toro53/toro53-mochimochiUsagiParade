import type { Metadata } from "next";
import NewRelease from "@/components/NewRelease";
import Discography from "@/components/Discography";

export const metadata: Metadata = {
  title: "もちもちうさぎパレード — 視聴",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ListenPage() {
  return (
    <main className="min-h-screen bg-bg pt-16 pb-32">
      <div className="text-center py-10 px-8">
        <p className="text-[0.6rem] tracking-[0.25em] text-fg-muted">
          MOCHIMOCHI USAGI PARADE
        </p>
        <h1 className="mt-2 text-[1.1rem] font-bold tracking-[0.12em] text-fg">
          視聴ページ
        </h1>
      </div>
      <NewRelease />
      <Discography />
    </main>
  );
}
