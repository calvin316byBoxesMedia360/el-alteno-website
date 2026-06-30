import { categories, menuItems } from "@/data/menu";
import MenuTabs from "@/components/menu/MenuTabs";

export default function MenuSection() {
  return (
    <section id="menu" className="section-padding bg-[#FAF6EF]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#C65D3B] text-sm font-bold tracking-widest uppercase mb-3">
            Our Menu
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold text-[#2E2620] mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Auténtica Comida Mexicana
          </h2>
          <p className="text-[#8A7E6F] text-lg max-w-xl mx-auto">
            Every plate is made to order with ingredients that respect the tradition.
            All dishes served with rice and beans unless noted.
          </p>
        </div>

        <MenuTabs categories={categories} items={menuItems} />

        <p className="text-center text-xs text-[#8A7E6F] mt-8">
          ✦ Handmade tortillas available with every dish ✦
        </p>
      </div>
    </section>
  );
}
