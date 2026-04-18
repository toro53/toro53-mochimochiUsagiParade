import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import News from "@/components/News";
import Discography from "@/components/Discography";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <News />
        <Discography />
        <About />
      </main>
      <Footer />
    </>
  );
}
