import Image from "next/image";
import Link from "next/link";
import { categories, menuItems } from "@/data/menu";
import { Badge } from "@/components/ui/badge";
import { MenuItem } from "@/types/menu";
import ScrollStrip from "@/components/ui/ScrollStrip";

function ItemTags({ item, className = "" }: { item: MenuItem; className?: string }) {
  if (!item.tags.some((x) => ["popular", "spicy", "signature"].includes(x))) return null;
  return (
    <div className={`flex flex-wrap gap-1 ${className}`}>
      {item.tags.includes("popular") && (
        <Badge className="bg-[#C65D3B] text-white text-[9px] px-1.5 py-0">Popular</Badge>
      )}
      {item.tags.includes("spicy") && (
        <Badge className="bg-[#8A6A1E] text-white text-[9px] px-1.5 py-0">🌶 Spicy</Badge>
      )}
      {item.tags.includes("signature") && (
        <Badge className="bg-[#6B7A4F] text-white text-[9px] px-1.5 py-0">Signature</Badge>
      )}
    </div>
  );
}

/** Card for a dish photographed at the restaurant. Only 18 dishes have one. */
function PhotoCard({ item }: { item: MenuItem }) {
  return (
    <div className="bg-[#E4D6B8] rounded-xl border border-[#C0AE8B] overflow-hidden shadow-sm flex">
      {/* Image side */}
      <div className="relative w-24 sm:w-32 h-auto min-h-[96px] bg-[#CFBE9B] shrink-0">
        <Image src={item.image!} alt={item.name} fill className="object-cover" />
      </div>

      {/* Content side */}
      <div className="p-3 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3
              className="font-bold text-[#241E17] text-sm leading-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {item.name}{" "}
              <span className="text-[#554B3F] font-sans font-normal text-xs block mt-0.5">
                {item.nameEs}
              </span>
            </h3>
            <span className="text-[#85340F] font-bold text-sm shrink-0">
              ${item.price.toFixed(2)}
            </span>
          </div>
          <p className="text-[#554B3F] text-[11px] leading-snug mb-1">{item.description}</p>
          <p className="text-[#554B3F] italic text-[11px] leading-snug">{item.descriptionEs}</p>
        </div>

        <ItemTags item={item} className="mt-2" />
      </div>
    </div>
  );
}

/**
 * Printed-menu row for the 65 dishes with no photograph of their own.
 * No image slot and no stock photography: name, dotted leader, price.
 */
function ListRow({ item }: { item: MenuItem }) {
  return (
    <div className="break-inside-avoid mb-5">
      <div className="flex items-baseline gap-2">
        <h3
          className="font-bold text-[#241E17] text-sm leading-tight"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {item.name}
        </h3>
        <span
          aria-hidden
          className="flex-1 border-b border-dotted border-[#85340F]/45 relative -top-1"
        />
        <span className="text-[#85340F] font-bold text-sm shrink-0 tabular-nums">
          ${item.price.toFixed(2)}
        </span>
      </div>
      <p className="text-[#554B3F] text-[11px] leading-snug">{item.nameEs}</p>
      <p className="text-[#554B3F] text-[11px] leading-snug mt-1">{item.description}</p>
      <p className="text-[#554B3F] italic text-[11px] leading-snug">{item.descriptionEs}</p>
      <ItemTags item={item} className="mt-1.5" />
    </div>
  );
}

export default function QRMenuPage() {
  return (
    <div className="min-h-screen bg-[#D2C09C] text-[#241E17] pb-16 font-sans">
      {/* Sticky Clean Header */}
      <header className="sticky top-0 z-30 bg-[#E4D6B8]/95 backdrop-blur-sm border-b border-[#C0AE8B] py-3 px-4 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="text-xs font-bold uppercase tracking-wider text-[#C65D3B] hover:text-[#A84A2C] transition-colors inline-flex items-center min-h-11 gap-1"
          >
            ← Home
          </Link>
          <div className="relative w-24 h-12">
            <Image
              src="/images/logo/logo.png"
              alt="El Alteño"
              fill
              className="object-contain"
              loading="eager"
            />
          </div>
          <a
            href="tel:8317689876"
            className="text-xs font-bold bg-[#C65D3B] text-white px-4 min-h-11 inline-flex items-center rounded-full hover:bg-[#A84A2C] transition-colors"
          >
            Call
          </a>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 pt-6">
        <div className="text-center mb-8">
          <h1
            className="text-3xl md:text-4xl font-bold text-[#241E17] mb-2"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Digital Menu / Menú Digital
          </h1>
          <p className="text-xs text-[#554B3F] max-w-md mx-auto">
            Bilingual tableside menu. Hand-made tortillas available with every dish.
            <br />
            Menú bilingüe. Tortillas hechas a mano disponibles con cada platillo.
          </p>
        </div>

        {/* Quick Jump Anchors */}
        <div className="mb-8 -mx-4 px-4 sticky top-[60px] bg-[#D2C09C]/90 backdrop-blur-md py-2 z-20 border-b border-[#C0AE8B]/40">
          <ScrollStrip ariaLabel="Categorías">
            <div className="flex gap-2 min-w-max pb-1">
              {categories.map((cat) => (
                <a
                  key={cat.id}
                  href={`#${cat.id}`}
                  className="px-3.5 min-h-11 inline-flex items-center rounded-full text-xs font-medium bg-[#E4D6B8] text-[#554B3F] border border-[#C0AE8B] hover:border-[#C65D3B] hover:text-[#C65D3B] transition-all shadow-sm"
                >
                  {cat.label} / {cat.labelEs}
                </a>
              ))}
            </div>
          </ScrollStrip>
        </div>

        {/* Menu Sections */}
        <div className="space-y-12">
          {categories.map((cat) => {
            const items = menuItems.filter((item) => item.category === cat.id && item.available);
            if (items.length === 0) return null;

            const withPhoto = items.filter((item) => item.image);
            const withoutPhoto = items.filter((item) => !item.image);

            return (
              <section key={cat.id} id={cat.id} className="scroll-mt-24">
                <div className="flex items-center gap-4 mb-6">
                  <h2
                    className="text-2xl font-bold text-[#C65D3B] whitespace-nowrap"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {cat.label}{" "}
                    <span className="text-sm font-medium text-[#554B3F] font-sans">
                      / {cat.labelEs}
                    </span>
                  </h2>
                  <div className="h-px bg-[#C0AE8B] w-full" />
                </div>

                {withPhoto.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {withPhoto.map((item) => (
                      <PhotoCard key={item.id} item={item} />
                    ))}
                  </div>
                )}

                {withoutPhoto.length > 0 && (
                  <div className={withPhoto.length > 0 ? "mt-8" : ""}>
                    {withPhoto.length > 0 && (
                      <div className="flex items-center gap-3 mb-5">
                        <span className="text-[#85340F] text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap">
                          Also on the menu / También en la carta
                        </span>
                        <span className="h-px flex-1 bg-[#C0AE8B]" />
                      </div>
                    )}
                    <div className="columns-1 md:columns-2 gap-x-10">
                      {withoutPhoto.map((item) => (
                        <ListRow key={item.id} item={item} />
                      ))}
                    </div>
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </main>
    </div>
  );
}
