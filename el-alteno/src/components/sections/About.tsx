"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="section-padding bg-background relative overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute top-1/2 -right-1/4 w-80 h-80 bg-olive/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-4 md:px-6">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-mustard text-xs md:text-sm font-bold tracking-widest uppercase mb-3">
            {t("Our Story", "Nuestra Historia")}
          </p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6 leading-tight">
            {t("Flavors that feel like home", "Sabores que se sienten como en casa")}
          </h2>
          <p className="text-muted-foreground text-sm md:text-lg leading-relaxed mb-5">
            {t(
              "El Alteño brings the soulful cooking of Mexico to the heart of Watsonville, California. Every dish starts with recipes handed down through generations — slow-cooked stews, hand-pressed tortillas, and mariscos so fresh you can taste the coast.",
              "El Alteño trae la cocina del alma de México al corazón de Watsonville, California. Cada platillo comienza con recetas transmitidas de generación en generación: guisados de cocción lenta, tortillas hechas a mano y mariscos tan frescos que puedes saborear la costa."
            )}
          </p>
          <p className="text-muted-foreground text-sm md:text-lg leading-relaxed mb-8">
            {t(
              "Whether you are stopping in on a road trip down the coast, celebrating a milestone with family, or hosting a private event for up to 100 guests — this is a place where you will leave full and come back soon.",
              "Ya sea que pases en un viaje por carretera por la costa, celebres un momento importante con la familia o realices un evento privado para hasta 100 invitados, este es un lugar del que saldrás satisfecho y volverás pronto."
            )}
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 md:gap-8 pt-4 border-t border-[#E5D9C5]/10">
            <div>
              <p className="text-3xl md:text-4xl font-heading font-bold text-terracota">100</p>
              <p className="text-xs md:text-sm text-muted-foreground">{t("guests per event", "invitados por evento")}</p>
            </div>
            <div className="hidden sm:block w-px bg-[#E5D9C5]/15" />
            <div>
              <p className="text-3xl md:text-4xl font-heading font-bold text-terracota">50+</p>
              <p className="text-xs md:text-sm text-muted-foreground">{t("dishes on the menu", "platillos en el menú")}</p>
            </div>
            <div className="hidden sm:block w-px bg-[#E5D9C5]/15" />
            <div>
              <p className="text-3xl md:text-4xl font-heading font-bold text-terracota">7</p>
              <p className="text-xs md:text-sm text-muted-foreground">{t("days a week", "días a la semana")}</p>
            </div>
          </div>
        </motion.div>

        {/* Visual Card - Fully responsive layout */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-card backdrop-blur-md border border-[#E5D9C5]/10 rounded-3xl p-6 md:p-8 flex flex-col gap-6 shadow-2xl"
        >
          <div className="bg-terracota rounded-2xl p-6 border border-white/10 shadow-lg">
            <p className="text-[10px] md:text-xs font-bold tracking-widest uppercase mb-1 text-amber-200">
              {t("Hand Made", "Hecho a Mano")}
            </p>
            <h3 className="text-xl md:text-2xl font-heading font-bold text-white">
              {t("Tortillas Hechas a Mano", "Tortillas Hechas a Mano")}
            </h3>
            <p className="text-white/80 mt-2 text-xs md:text-sm leading-relaxed">
              {t(
                "Every tortilla is pressed and cooked to order. You can taste the heritage in every bite.",
                "Cada tortilla es prensada y cocinada al momento. Puedes saborear la herencia en cada bocado."
              )}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-background/80 rounded-xl p-4 border border-[#E5D9C5]/10 hover:border-mustard/30 transition-colors">
              <p className="text-xl md:text-2xl mb-1">🦐</p>
              <p className="font-heading font-bold text-sm text-foreground">{t("Fresh Mariscos", "Mariscos Frescos")}</p>
              <p className="text-[11px] text-muted-foreground">{t("Seafood prepared daily", "Mariscos frescos diario")}</p>
            </div>
            <div className="bg-background/80 rounded-xl p-4 border border-[#E5D9C5]/10 hover:border-mustard/30 transition-colors">
              <p className="text-xl md:text-2xl mb-1">🎉</p>
              <p className="font-heading font-bold text-sm text-foreground">{t("Private Events", "Eventos Privados")}</p>
              <p className="text-[11px] text-muted-foreground">{t("Up to 100 guests", "Hasta 100 personas")}</p>
            </div>
            <div className="bg-background/80 rounded-xl p-4 border border-[#E5D9C5]/10 hover:border-mustard/30 transition-colors">
              <p className="text-xl md:text-2xl mb-1">🍹</p>
              <p className="font-heading font-bold text-sm text-foreground">{t("Signature Drinks", "Bebidas de la Casa")}</p>
              <p className="text-[11px] text-muted-foreground">{t("Cantaritos & more", "Cantaritos y más")}</p>
            </div>
            <div className="bg-background/80 rounded-xl p-4 border border-[#E5D9C5]/10 hover:border-mustard/30 transition-colors">
              <p className="text-xl md:text-2xl mb-1">📦</p>
              <p className="font-heading font-bold text-sm text-foreground">{t("Online Ordering", "Pedidos en Línea")}</p>
              <p className="text-[11px] text-muted-foreground">{t("DoorDash & Uber Eats", "DoorDash y Uber Eats")}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
