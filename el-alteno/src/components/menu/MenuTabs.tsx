"use client";

import { useState } from "react";
import { MenuCategory, MenuItem } from "@/types/menu";
import MenuItemCard from "./MenuItem";

interface Props {
  categories: MenuCategory[];
  items: MenuItem[];
}

export default function MenuTabs({ categories, items }: Props) {
  const [active, setActive] = useState(categories[0].id);

  const filtered = items.filter((i) => i.category === active && i.available);

  return (
    <div>
      {/* Tab nav — scrollable on mobile */}
      <div className="overflow-x-auto pb-2 mb-8">
        <div className="flex gap-2 min-w-max">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                active === cat.id
                  ? "bg-[#C65D3B] text-white shadow"
                  : "bg-white text-[#8A7E6F] border border-[#E5D9C5] hover:border-[#C65D3B] hover:text-[#C65D3B]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full text-center text-[#8A7E6F] py-12">
            Coming soon!
          </p>
        )}
      </div>
    </div>
  );
}
