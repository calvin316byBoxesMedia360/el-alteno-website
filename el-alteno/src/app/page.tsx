import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import MenuSection from "@/components/sections/MenuSection";
import Events from "@/components/sections/Events";
import Cocktails from "@/components/sections/Cocktails";
import Location from "@/components/sections/Location";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <div className="zigzag-border" />
        <MenuSection />
        <div className="zigzag-border" />
        <Events />
        <Cocktails />
        <Location />
      </main>
      <Footer />
    </>
  );
}
