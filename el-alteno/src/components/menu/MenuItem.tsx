import { MenuItem as MenuItemType } from "@/types/menu";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export default function MenuItem({ item }: { item: MenuItemType }) {
  return (
    <div className="bg-white rounded-xl border border-[#E5D9C5] overflow-hidden hover:shadow-md transition-shadow flex flex-col">
      {/* Photo placeholder */}
      {item.image ? (
        <div className="relative aspect-[4/3] bg-[#F0E6D6]">
          <Image src={item.image} alt={item.name} fill className="object-cover" />
        </div>
      ) : (
        <div className="aspect-[4/3] bg-gradient-to-br from-[#F0E6D6] to-[#E8D5A8] flex items-center justify-center text-4xl">
          🍽️
        </div>
      )}

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold text-[#2E2620] text-sm leading-tight" style={{ fontFamily: "var(--font-playfair)" }}>
            {item.name}
          </h3>
          <span className="text-[#C99A3F] font-bold text-sm shrink-0">
            ${item.price.toFixed(2)}
          </span>
        </div>
        <p className="text-[#8A7E6F] text-xs leading-relaxed flex-1 mb-3">
          {item.description}
        </p>
        <div className="flex flex-wrap gap-1">
          {item.tags.includes("popular") && (
            <Badge className="bg-[#C65D3B] text-white text-[10px] px-2 py-0">Popular</Badge>
          )}
          {item.tags.includes("spicy") && (
            <Badge className="bg-[#C99A3F] text-white text-[10px] px-2 py-0">🌶 Spicy</Badge>
          )}
          {item.tags.includes("signature") && (
            <Badge className="bg-[#6B7A4F] text-white text-[10px] px-2 py-0">Signature</Badge>
          )}
        </div>
      </div>
    </div>
  );
}
