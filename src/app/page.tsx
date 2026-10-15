import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import News from "@/components/News";
import Discography from "@/components/Discography";
import LiveVideos from "@/components/LiveVideos";
import About from "@/components/About";
import Footer from "@/components/Footer";
import { homeJsonLd, toJsonLdString } from "@/data/structuredData";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLdString(homeJsonLd) }}
      />
      <Nav />
      <main>
        <Hero />
        <News />
        <LiveVideos />
        <Discography />
        <About />
      </main>
      <Footer />
    </>
  );
}
