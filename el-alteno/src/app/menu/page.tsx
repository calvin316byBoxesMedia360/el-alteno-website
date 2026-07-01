import Image from "next/image";
import Link from "next/link";
import { categories, menuItems } from "@/data/menu";
import { Badge } from "@/components/ui/badge";

const categoryPlaceholders: Record<string, string> = {
  seafood: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&q=80",
  specialties: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&q=80",
  appetizers: "https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?w=500&q=80",
  enchiladas: "https://images.unsplash.com/photo-1534790566855-4cb788d389ec?w=500&q=80",
  burritos: "https://images.unsplash.com/photo-1626700051175-6518c4793f4f?w=500&q=80",
  fajitas: "https://images.unsplash.com/photo-1534939561126-855b8675edd7?w=500&q=80",
  vegetarian: "https://images.unsplash.com/photo-1582234375422-57ed544850d5?w=500&q=80",
  cocktails: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500&q=80",
  salads: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80",
  breakfast: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=500&q=80",
  lunch: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&q=80",
};

export default function QRMenuPage() {
  return (
    <div className="min-h-screen bg-[#FAF6EF] text-[#2E2620] pb-16 font-sans">
      {/* Sticky Clean Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-[#E5D9C5] py-3 px-4 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="text-xs font-bold uppercase tracking-wider text-[#C65D3B] hover:text-[#A84A2C] transition-colors flex items-center gap-1"
          >
            ← Home
          </Link>
          <div className="relative w-24 h-12">
            <Image
              src="/images/logo/logo.png"
              alt="El Alteño"
              fill
              className="object-contain"
              priority
            />
          </div>
          <a
            href="tel:8317689876"
            className="text-xs font-bold bg-[#C65D3B] text-white px-3 py-1.5 rounded-full hover:bg-[#A84A2C] transition-colors"
          >
            Call
          </a>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 pt-6">
        <div className="text-center mb-8">
          <h1
            className="text-3xl md:text-4xl font-bold text-[#2E2620] mb-2"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Digital Menu / Menú Digital
          </h1>
          <p className="text-xs text-[#8A7E6F] max-w-md mx-auto">
            Bilingual tableside menu. Hand-made tortillas available with every dish.
            <br />
            Menú bilingüe. Tortillas hechas a mano disponibles con cada platillo.
          </p>
        </div>

        {/* Quick Jump Anchors */}
        <div className="overflow-x-auto pb-3 mb-8 -mx-4 px-4 sticky top-[60px] bg-[#FAF6EF]/90 backdrop-blur-md py-2 z-20 border-b border-[#E5D9C5]/40">
          <div className="flex gap-2 min-w-max">
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-white text-[#8A7E6F] border border-[#E5D9C5] hover:border-[#C65D3B] hover:text-[#C65D3B] transition-all shadow-sm"
              >
                {cat.label} / {cat.labelEs}
              </a>
            ))}
          </div>
        </div>

        {/* Menu Sections */}
        <div className="space-y-12">
          {categories.map((cat) => {
            const items = menuItems.filter((item) => item.category === cat.id && item.available);
            if (items.length === 0) return null;

            return (
              <section key={cat.id} id={cat.id} className="scroll-mt-24">
                <div className="flex items-center gap-4 mb-6">
                  <h2
                    className="text-2xl font-bold text-[#C65D3B] whitespace-nowrap"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {cat.label} <span className="text-sm font-medium text-[#8A7E6F] font-sans">/ {cat.labelEs}</span>
                  </h2>
                  <div className="h-px bg-[#E5D9C5] w-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-xl border border-[#E5D9C5] overflow-hidden shadow-sm flex"
                    >
                      {/* Image side */}
                      <div className="relative w-24 sm:w-32 h-auto min-h-[96px] bg-[#F0E6D6] shrink-0">
                        <Image
                          src={item.image || categoryPlaceholders[item.category] || "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&q=80"}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Content side */}
                      <div className="p-3 flex flex-col justify-between flex-1">
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h3
                              className="font-bold text-[#2E2620] text-sm leading-tight"
                              style={{ fontFamily: "var(--font-playfair)" }}
                            >
                              {item.name} <span className="text-[#8A7E6F] font-sans font-normal text-xs block mt-0.5">{item.nameEs}</span>
                            </h3>
                            <span className="text-[#C99A3F] font-bold text-sm shrink-0">
                              ${item.price.toFixed(2)}
                            </span>
                          </div>
                          <p className="text-[#8A7E6F] text-[11px] leading-snug mb-1">
                            {item.description}
                          </p>
                          <p className="text-[#8A7E6F] italic text-[11px] leading-snug">
                            {item.descriptionEs}
                          </p>
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mt-2">
                          {item.tags.includes("popular") && (
                            <Badge className="bg-[#C65D3B] text-white text-[9px] px-1.5 py-0">Popular</Badge>
                          )}
                          {item.tags.includes("spicy") && (
                            <Badge className="bg-[#C99A3F] text-white text-[9px] px-1.5 py-0">🌶 Spicy</Badge>
                          )}
                          {item.tags.includes("signature") && (
                            <Badge className="bg-[#6B7A4F] text-white text-[9px] px-1.5 py-0">Signature</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </main>
    </div>
  );
}
