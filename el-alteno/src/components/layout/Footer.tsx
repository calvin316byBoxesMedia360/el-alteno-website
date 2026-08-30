"use client";

import { Phone, MapPin, Clock, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { DELIVERY_LINKS } from "@/lib/deliveryLinks";
import {
  VisaMark,
  MastercardMark,
  ApplePayMark,
  ZelleMark,
  DoorDashMark,
  UberEatsMark,
} from "./PaymentMarks";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#100D0B] border-t border-[#E5D9C5]/10 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div className="space-y-4">
          <h3 className="text-2xl font-heading font-bold text-mustard">
            El Alteño
          </h3>
          <p className="text-sm text-[#A39485]">{t("Authentic Mexican Cuisine", "Auténtica Comida Mexicana")}</p>
          <div className="flex items-center gap-2 text-sm text-[#A39485]">
            <MapPin size={14} className="text-mustard shrink-0" />
            <span>323 Main St, Watsonville, CA 95076</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#A39485]">
            <Phone size={14} className="text-mustard shrink-0" />
            <a href="tel:8317689876" className="inline-flex items-center min-h-11 hover:text-mustard transition-colors font-medium">
              (831) 768-9876
            </a>
          </div>
        </div>

        {/* Hours */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-mustard" />
            <h4 className="font-heading font-bold text-white text-lg">{t("Hours", "Horarios")}</h4>
          </div>
          <ul className="space-y-2 text-sm text-[#A39485]">
            <li className="flex justify-between gap-4 border-b border-white/5 pb-1">
              <span>{t("Tuesday – Saturday", "Martes – Sábado")}</span>
              <span className="text-white font-medium">11:00 AM – 8:00 PM</span>
            </li>
            <li className="flex justify-between gap-4 border-b border-white/5 pb-1">
              <span>{t("Sunday", "Domingo")}</span>
              <span className="text-white font-medium">11:00 AM – 8:00 PM</span>
            </li>
            <li className="flex justify-between gap-4 text-xs text-[#A39485] ml-1 pl-3 border-l border-white/10">
              <span>{t("Lunch Specials", "Especiales de Lunch")}</span>
              <span>11:00 AM – 3:00 PM</span>
            </li>
            <li className="mt-2 pt-2 text-terracota font-bold uppercase tracking-wider text-xs">
              {t("Monday — Closed", "Lunes — Cerrado")}
            </li>
          </ul>
        </div>

        {/* Order & Payment */}
        <div className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-white text-lg">{t("Order Online", "Pedidos en Línea")}</h4>
            <div className="flex flex-col gap-3">
              <a
                href={DELIVERY_LINKS.doorDash}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 bg-[#FF3008] text-white px-4 py-3.5 rounded-xl shadow-lg shadow-[#FF3008]/20 hover:shadow-xl hover:shadow-[#FF3008]/30 hover:-translate-y-0.5 transition-all duration-200"
              >
                <DoorDashMark />
                <span className="flex flex-col leading-tight">
                  <span className="text-sm font-bold tracking-wide">DoorDash</span>
                  <span className="text-[10px] uppercase tracking-wider text-white">
                    {t("Delivery & pickup", "Entrega y recoger")}
                  </span>
                </span>
                <ArrowUpRight
                  size={16}
                  className="ml-auto shrink-0 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                />
              </a>
              <a
                href={DELIVERY_LINKS.uberEats}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 bg-[#06C167] text-black px-4 py-3.5 rounded-xl shadow-lg shadow-[#06C167]/20 hover:shadow-xl hover:shadow-[#06C167]/30 hover:-translate-y-0.5 transition-all duration-200"
              >
                <UberEatsMark />
                <span className="flex flex-col leading-tight">
                  <span className="text-sm font-bold tracking-wide">Uber Eats</span>
                  <span className="text-[10px] uppercase tracking-wider text-black">
                    {t("Delivery & pickup", "Entrega y recoger")}
                  </span>
                </span>
                <ArrowUpRight
                  size={16}
                  className="ml-auto shrink-0 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                />
              </a>
            </div>
          </div>

          <div className="space-y-2.5">
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#A39485] font-bold">
              {t("We accept", "Aceptamos")}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <VisaMark />
              <MastercardMark />
              <ApplePayMark />
              <ZelleMark />
            </div>
          </div>

          <div className="flex gap-2">
            <span className="text-lg">🇲🇽</span>
            <span className="text-xs text-[#A39485] self-center">Bienvenidos</span>
            <span className="text-lg ml-2">🇺🇸</span>
            <span className="text-xs text-[#A39485] self-center">Welcome</span>
          </div>
        </div>
      </div>

      {/*
        The copyright belongs to the restaurant — it covers their name, photos
        and menu. The build credit is a separate statement about who made the
        site, so it sits alongside rather than replacing it.
      */}
      <div className="border-t border-[#E5D9C5]/10 py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] uppercase tracking-widest text-[#A39485]">
          <span>© {new Date().getFullYear()} El Alteño Restaurant · Watsonville, CA</span>
          <span className="flex items-center gap-1.5">
            {t("Site by", "Sitio por")}
            <span className="text-mustard font-bold tracking-[0.12em] normal-case text-[11px]">
              Boxes Media 360
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
}
