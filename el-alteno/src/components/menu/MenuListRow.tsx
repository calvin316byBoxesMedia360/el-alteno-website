"use client";

import { MenuItem as MenuItemType } from "@/types/menu";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/context/LanguageContext";

/**
 * Printed-menu row for dishes with no photograph of their own.
 *
 * The site has 18 photographs of its own for 83 dishes. Rather than fill the
 * other 65 with another restaurant food, those dishes read as a printed
 * carta: name, dotted leader and price. No image slot.
 */
export default function MenuListRow({ item }: { item: MenuItemType }) {
  const { locale, t } = useLanguage();

  return (
    <div className="group break-inside-avoid mb-6">
      <div className="flex items-baseline gap-2">
        <h3 className="font-heading font-bold text-foreground text-xl md:text-2xl leading-tight group-hover:text-[#C99A3F] transition-colors">
          {locale === "en" ? item.name : item.nameEs}
        </h3>
        <span
          aria-hidden
          className="flex-1 border-b border-dotted border-[#C99A3F]/35 relative -top-1"
        />
        <span className="text-mustard font-extrabold text-xl md:text-2xl shrink-0 tabular-nums">
          ${item.price.toFixed(2)}
        </span>
      </div>

      <p className="text-muted-foreground text-lg leading-relaxed mt-1 pr-16">
        {locale === "en" ? item.description : item.descriptionEs}
      </p>

      {item.tags.some((x) => ["popular", "spicy", "signature"].includes(x)) && (
        <div className="flex flex-wrap gap-1.5 font-sans mt-2">
          {item.tags.includes("popular") && (
            <Badge className="bg-[#C65D3B] hover:bg-[#C65D3B] text-white text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-md font-semibold border-none">
              {t("Popular", "Popular")}
            </Badge>
          )}
          {item.tags.includes("spicy") && (
            <Badge className="bg-[#C99A3F] hover:bg-[#C99A3F] text-white text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-md font-semibold border-none">
              🌶 {t("Spicy", "Picante")}
            </Badge>
          )}
          {item.tags.includes("signature") && (
            <Badge className="bg-[#6B7A4F] hover:bg-[#6B7A4F] text-white text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-md font-semibold border-none">
              {t("Signature", "Especial")}
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
