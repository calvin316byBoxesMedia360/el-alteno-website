import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Gallery from "@/components/sections/Gallery";

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <Gallery />
      </main>
      <Footer />
    </>
  );
}
