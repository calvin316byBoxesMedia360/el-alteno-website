"use client";

import { useState } from "react";
import { MenuCategory, MenuItem } from "@/types/menu";
import MenuItemCard from "./MenuItem";
import MenuListRow from "./MenuListRow";
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
  // Only dishes photographed at the restaurant get a card with an image.
  // The rest read as a printed carta — see MenuListRow.
  const withPhoto = filtered.filter((i) => i.image);
  const withoutPhoto = filtered.filter((i) => !i.image);

  return (
    <div className="px-4 md:px-0">
      {/* Tab nav — scrollable on mobile */}
      <div className="overflow-x-auto pb-4 mb-8 scrollbar-thin scrollbar-thumb-white/10">
        <div className="flex gap-2.5 min-w-max">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`px-5 min-h-11 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
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

      {/* Photographed dishes — card grid */}
      {withPhoto.length > 0 && (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {withPhoto.map((item) => (
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
        </motion.div>
      )}

      {/* Everything else — printed-menu rows, two columns */}
      {withoutPhoto.length > 0 && (
        <motion.div
          key={`${active}-list`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className={withPhoto.length > 0 ? "mt-14" : ""}
        >
          {withPhoto.length > 0 && (
            <div className="flex items-center gap-4 mb-7">
              <span className="text-mustard text-[11px] font-bold uppercase tracking-[0.2em] whitespace-nowrap">
                {t("Also on the menu", "También en la carta")}
              </span>
              <span className="h-px flex-1 bg-[#C99A3F]/15" />
            </div>
          )}
          <div className="columns-1 md:columns-2 gap-x-14">
            {withoutPhoto.map((item) => (
              <MenuListRow key={item.id} item={item} />
            ))}
          </div>
        </motion.div>
      )}

      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground py-16">
          {t("Coming soon!", "¡Próximamente!")}
        </p>
      )}
    </div>
  );
}
