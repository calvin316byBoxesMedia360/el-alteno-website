import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import MenuSection from "@/components/sections/MenuSection";
import Events from "@/components/sections/Events";
import Cocktails from "@/components/sections/Cocktails";
import Location from "@/components/sections/Location";
import ScrollGuide from "@/components/ui/ScrollGuide";

export default function Home() {
  return (
    <>
      <Navbar />
      <ScrollGuide />
      <main>
        <Hero />
        <About />
        <div className="zigzag-border" />
        <MenuSection />
        <div className="zigzag-border" />
        {/* Cocktails reads as part of the menu, so it follows it. Events is the
            booking ask and belongs after someone has seen the food. */}
        <Cocktails />
        <Events />
        <Location />
      </main>
      <Footer />
    </>
  );
}
