"use client";

import { categories, menuItems } from "@/data/menu";
import MenuTabs from "@/components/menu/MenuTabs";
import { useLanguage } from "@/context/LanguageContext";

export default function MenuSection() {
  const { t } = useLanguage();

  return (
    <section id="menu" className="section-padding bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 talavera-pattern pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Asymmetric Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-end px-4 md:px-6 lg:px-0">
          <div className="lg:col-span-7">
            <p className="text-mustard text-xs font-bold tracking-[0.2em] uppercase mb-3">
              {t("Nuestro Menú · Our Menu", "Nuestro Menú · Our Menu")}
            </p>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-foreground leading-tight md:leading-none">
              {t("Sabores con", "Sabores con")}{" "}<br className="hidden md:inline" />
              <span className="text-terracota italic">{t("Tradición", "Tradición")}</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pl-8 border-l-0 lg:border-l border-mustard/20 pt-4 lg:pt-0">
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              {t(
                "Every plate is prepared to order respecting generations of culinary heritage. All dinner plates are accompanied by our signature rice and slow-cooked refried beans.",
                "Cada platillo se prepara al momento respetando generaciones de herencia culinaria. Todos los platos fuertes van acompañados de nuestro arroz tradicional y frijoles refritos."
              )}
            </p>
            <p className="text-mustard text-xs uppercase tracking-wider mt-4 font-bold">
              ✦ {t("Handmade corn tortillas served fresh daily", "Tortillas de maíz hechas a mano servidas al momento")} ✦
            </p>
          </div>
        </div>

        <MenuTabs categories={categories} items={menuItems} />
      </div>
    </section>
  );
}
