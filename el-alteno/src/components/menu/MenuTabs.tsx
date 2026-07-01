"use client";

import { useState } from "react";
import { MenuCategory, MenuItem } from "@/types/menu";
import MenuItemCard from "./MenuItem";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  categories: MenuCategory[];
  items: MenuItem[];
}

export default function MenuTabs({ categories, items }: Props) {
  const { locale, t } = useLanguage();
  const [active, setActive] = useState(categories[0].id);

  const filtered = items.filter((i) => i.category === active && i.available);

  return (
    <div className="px-4 md:px-0">
      {/* Tab nav — scrollable on mobile */}
      <div className="overflow-x-auto pb-4 mb-8 scrollbar-thin scrollbar-thumb-white/10">
        <div className="flex gap-2.5 min-w-max">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                active === cat.id
                  ? "bg-terracota text-white shadow-lg shadow-terracota/20 border border-transparent"
                  : "bg-[#1E1A17] text-muted-foreground border border-[#E5D9C5]/10 hover:border-mustard/40 hover:text-mustard"
              }`}
            >
              {locale === "en" ? cat.label : cat.labelEs}
            </button>
          ))}
        </div>
      </div>

      {/* Grid with animation */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((item) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              key={item.id}
            >
              <MenuItemCard item={item} />
            </motion.div>
          ))}
        </AnimatePresence>
        {filtered.length === 0 && (
          <p className="col-span-full text-center text-muted-foreground py-16">
            {t("Coming soon!", "¡Próximamente!")}
          </p>
        )}
      </motion.div>
    </div>
  );
}
