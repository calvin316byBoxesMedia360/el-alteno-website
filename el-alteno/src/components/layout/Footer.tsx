"use client";

import { Phone, MapPin, Clock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

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
          <p className="text-sm text-muted-foreground">{t("Authentic Mexican Cuisine", "Auténtica Comida Mexicana")}</p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin size={14} className="text-mustard shrink-0" />
            <span>323 Main St, Watsonville, CA 95076</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone size={14} className="text-mustard shrink-0" />
            <a href="tel:8317689876" className="hover:text-mustard transition-colors font-medium">
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
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex justify-between gap-4 border-b border-white/5 pb-1">
              <span>{t("Tuesday – Saturday", "Martes – Sábado")}</span>
              <span className="text-white font-medium">11:00 AM – 8:00 PM</span>
            </li>
            <li className="flex justify-between gap-4 border-b border-white/5 pb-1">
              <span>{t("Sunday", "Domingo")}</span>
              <span className="text-white font-medium">9:00 AM – 8:00 PM</span>
            </li>
            <li className="flex justify-between gap-4 text-xs text-muted-foreground/75">
              <span>↳ {t("Sunday Breakfast", "Desayuno Dominical")}</span>
              <span>9:00 – 11:45 AM</span>
            </li>
            <li className="flex justify-between gap-4 text-xs text-muted-foreground/75">
              <span>↳ {t("Lunch Special (Tue–Sat)", "Almuerzo (Mar–Sáb)")}</span>
              <span>11:00 AM – 2:00 PM</span>
            </li>
            <li className="mt-2 pt-2 text-terracota font-bold uppercase tracking-wider text-xs">
              {t("Monday — Closed", "Lunes — Cerrado")}
            </li>
          </ul>
        </div>

        {/* Order & Payment */}
        <div className="space-y-4">
          <h4 className="font-heading font-bold text-white text-lg">{t("Order Online", "Pedidos en Línea")}</h4>
          <div className="flex flex-col gap-3">
            <a
              href="https://www.doordash.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#FF3008] text-white text-xs uppercase tracking-wider font-bold px-4 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
            >
              DoorDash
            </a>
            <a
              href="https://www.ubereats.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#06C167] text-white text-xs uppercase tracking-wider font-bold px-4 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
            >
              Uber Eats
            </a>
          </div>
          <p className="text-xs text-muted-foreground/70 pt-2">
            {t("We accept Visa · Mastercard · Apple Pay · Zelle", "Aceptamos Visa · Mastercard · Apple Pay · Zelle")}
          </p>
          <div className="flex gap-2 mt-2">
            <span className="text-lg">🇲🇽</span>
            <span className="text-xs text-muted-foreground self-center">Bienvenidos</span>
            <span className="text-lg ml-2">🇺🇸</span>
            <span className="text-xs text-muted-foreground self-center">Welcome</span>
          </div>
        </div>
      </div>

      <div className="border-t border-[#E5D9C5]/10 py-6 text-center text-[10px] text-muted-foreground uppercase tracking-widest">
        © {new Date().getFullYear()} El Alteño Restaurant · Watsonville, CA
      </div>
    </footer>
  );
}
