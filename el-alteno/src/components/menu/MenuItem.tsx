"use client";

import { useState } from "react";
import { MenuItem as MenuItemType } from "@/types/menu";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

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

export default function MenuItem({ item }: { item: MenuItemType }) {
  const { locale, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  
  const displayImage = item.image || categoryPlaceholders[item.category] || "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&q=80";

  return (
    <>
      <div className="group bg-[#1E1A17]/60 backdrop-blur-md rounded-2xl border border-[#C99A3F]/15 hover:border-[#C99A3F]/45 overflow-hidden shadow-xl hover:shadow-[0_10px_30px_rgba(0,0,0,0.4)] transition-all duration-300 flex flex-col transform hover:-translate-y-1 h-full">
        {/* Photo Container - Click to expand */}
        <div 
          onClick={() => setIsOpen(true)}
          className="relative aspect-[4/3] bg-[#2E2620] overflow-hidden cursor-zoom-in"
        >
          <Image 
            src={displayImage} 
            alt={locale === "en" ? item.name : item.nameEs} 
            fill 
            className="object-cover transition-transform duration-500 group-hover:scale-105" 
            sizes="(max-w-768px) 100vw, (max-w-1024px) 50vw, 25vw"
          />
          {/* Soft elegant shadow overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="bg-black/60 backdrop-blur-md text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1.5 rounded-full scale-90 group-hover:scale-100 transition-all duration-300 shadow">
              {t("Click to view", "Ampliar imagen")}
            </span>
          </div>
        </div>

        <div className="p-5 flex flex-col flex-1 justify-between">
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-bold text-[#FAF6EF] text-sm md:text-base leading-tight group-hover:text-[#C99A3F] transition-colors font-heading">
                {locale === "en" ? item.name : item.nameEs}
              </h3>
              <span className="text-mustard font-extrabold text-sm md:text-base shrink-0">
                ${item.price.toFixed(2)}
              </span>
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed line-clamp-3 mb-4">
              {locale === "en" ? item.description : item.descriptionEs}
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5 font-sans pt-2 border-t border-white/5">
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
        </div>
      </div>

      {/* Modal image preview */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#1E1A17]/95 border border-[#C99A3F]/35 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl cursor-default flex flex-col md:flex-row relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 transition-colors border border-white/10 cursor-pointer"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              {/* Photo */}
              <div className="relative aspect-[4/3] md:aspect-square md:w-1/2 bg-[#2E2620] shrink-0">
                <Image
                  src={displayImage}
                  alt={locale === "en" ? item.name : item.nameEs}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Info content */}
              <div className="p-6 md:p-8 flex flex-col justify-between flex-grow md:w-1/2">
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4 border-b border-[#C99A3F]/15 pb-4">
                    <h3 className="font-bold text-lg md:text-xl text-[#FAF6EF] leading-tight font-heading">
                      {locale === "en" ? item.name : item.nameEs}
                      <span className="text-muted-foreground font-sans font-normal text-xs block mt-1">
                        {locale === "en" ? item.nameEs : item.name}
                      </span>
                    </h3>
                    <span className="text-mustard font-extrabold text-base md:text-lg shrink-0">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="space-y-3 mt-4 font-sans text-xs md:text-sm leading-relaxed">
                    <p className="text-[#FAF6EF]/85">
                      {locale === "en" ? item.description : item.descriptionEs}
                    </p>
                    <p className="text-muted-foreground italic border-l-2 border-[#C99A3F]/25 pl-3">
                      {locale === "en" ? item.descriptionEs : item.description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-[#C99A3F]/10 font-sans">
                  {item.tags.includes("popular") && (
                    <Badge className="bg-[#C65D3B] text-white text-[9px] uppercase tracking-wider px-3 py-1 rounded-md font-semibold border-none">
                      {t("Popular", "Popular")}
                    </Badge>
                  )}
                  {item.tags.includes("spicy") && (
                    <Badge className="bg-[#C99A3F] text-white text-[9px] uppercase tracking-wider px-3 py-1 rounded-md font-semibold border-none">
                      🌶 {t("Spicy", "Picante")}
                    </Badge>
                  )}
                  {item.tags.includes("signature") && (
                    <Badge className="bg-[#6B7A4F] text-white text-[9px] uppercase tracking-wider px-3 py-1 rounded-md font-semibold border-none">
                      {t("Signature", "Especial")}
                    </Badge>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
