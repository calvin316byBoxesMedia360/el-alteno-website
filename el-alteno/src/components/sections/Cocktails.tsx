"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { X } from "lucide-react";

const cocktails = [
  {
    id: "cantarito",
    name: "Cantarito",
    nameEs: "Cantarito",
    image: "/images/cocktails/cantarito.jpg",
    description:
      "Tequila, lime, grapefruit, and orange juice served in a traditional clay cup over ice. The classic Jalisco cocktail — citrusy, refreshing, and unmistakably Mexican.",
    descriptionEs:
      "Tequila, limón, toronja y jugo de naranja servido en un cantarito de barro tradicional con hielo. El clásico cóctel jalisciense: cítrico, refrescante e indudablemente mexicano.",
    badge: "Most Popular",
    badgeEs: "El Más Popular",
  },
  {
    id: "sunrise",
    name: "Tequila Sunrise",
    nameEs: "Tequila Sunrise",
    image: "/images/cocktails/sunrise.png",
    description:
      "Premium tequila, fresh orange juice, and sweet grenadine layered beautifully to create a stunning sunrise gradient. Elegant, sweet, and photo-ready.",
    descriptionEs:
      "Tequila premium, jugo de naranja fresco y granadina dulce servidos en capas para crear el degradado de un hermoso amanecer. Elegante, dulce y perfecto para fotos.",
    badge: "Classic",
    badgeEs: "Clásico",
  },
  {
    id: "chavela",
    name: "Chavela",
    nameEs: "Chavela",
    image: "/images/cocktails/chavela.png",
    description:
      "Chilled Mexican beer mixed with fresh lime juice, Clamato, hot sauce, and Worcestershire in a tajín and salt-rimmed glass. Bold, savory, and perfect with mariscos.",
    descriptionEs:
      "Cerveza mexicana fría mezclada con jugo de limón fresco, Clamato, salsa picante y salsa inglesa en un vaso escarchado con sal y tajín. Intenso, sabroso e ideal con mariscos.",
    badge: "House Special",
    badgeEs: "Especial de la Casa",
  },
];

export default function Cocktails() {
  const { t, locale } = useLanguage();
  const [selectedCocktail, setSelectedCocktail] = useState<typeof cocktails[0] | null>(null);

  return (
    <section id="cocktails" className="section-padding bg-background relative overflow-hidden transition-colors duration-300">
      {/* Decorative background gradients */}
      <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-terracota/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-mustard/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 px-4">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-mustard text-xs md:text-sm font-bold tracking-widest uppercase mb-3"
          >
            {t("Signature Cocktails", "Cócteles de la Casa")}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-4"
          >
            {t("Raise a Glass to Heritage", "Brinda con Tradición")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-sm md:text-lg max-w-xl mx-auto"
          >
            {t(
              "Three handcrafted drinks that define the El Alteño experience. Each one made with premium spirits and fresh, authentic ingredients.",
              "Tres bebidas artesanales que definen la experiencia El Alteño. Cada una preparada con licores premium e ingredientes frescos y auténticos."
            )}
          </motion.p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 lg:px-0">
          {cocktails.map((c, index) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -8 }}
              onClick={() => setSelectedCocktail(c)}
              className="bg-card backdrop-blur-md border border-[#E5D9C5]/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-full group cursor-zoom-in transition-colors duration-300"
            >
              {/* Image Container with Zoom */}
              <div className="relative h-64 md:h-72 w-full overflow-hidden">
                <Image
                  src={c.image}
                  alt={locale === "en" ? c.name : c.nameEs}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-w-768px) 100vw, 33vw"
                />
                {/* Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-80" />
                
                {/* Premium badge */}
                <span className="absolute top-4 left-4 text-[10px] uppercase font-bold tracking-widest bg-terracota text-white px-3 py-1 rounded-full border border-white/10 shadow-lg">
                  {t(c.badge, c.badgeEs)}
                </span>

                {/* Soft elegant shadow overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-black/60 backdrop-blur-md text-white text-[10px] uppercase font-bold tracking-wider px-3.5 py-1.5 rounded-full scale-90 group-hover:scale-100 transition-all duration-300 shadow">
                    {t("Click to view", "Ver detalles")}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 md:p-8 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-xl md:text-2xl font-heading font-bold text-foreground mb-3 group-hover:text-mustard transition-colors">
                    {t(c.name, c.nameEs)}
                  </h3>
                  <p className="text-muted-foreground text-xs md:text-sm leading-relaxed line-clamp-3">
                    {t(c.description, c.descriptionEs)}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#E5D9C5]/10 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-mustard font-semibold">
                    {t("Handcrafted", "Artesanal")}
                  </span>
                  <span className="text-lg font-bold text-foreground">$9.99</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs md:text-sm text-muted-foreground mt-12 px-4"
        >
          {t(
            "We also serve a full bar including imported beers, red & white wines, premium margaritas, and non-alcoholic options. Ask your server.",
            "También contamos con barra completa que incluye cervezas importadas, vinos tintos y blancos, margaritas premium y opciones sin alcohol. Pregunte a su mesero."
          )}
        </motion.p>
      </div>

      {/* Modal image preview */}
      <AnimatePresence>
        {selectedCocktail && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCocktail(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-mustard/35 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl cursor-default flex flex-col md:flex-row relative transition-colors duration-300"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCocktail(null)}
                className="absolute top-4 right-4 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 transition-colors border border-white/10 cursor-pointer"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              {/* Photo */}
              <div className="relative aspect-[4/3] md:aspect-square md:w-1/2 bg-[#2E2620] shrink-0">
                <Image
                  src={selectedCocktail.image}
                  alt={locale === "en" ? selectedCocktail.name : selectedCocktail.nameEs}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Info content */}
              <div className="p-6 md:p-8 flex flex-col justify-between flex-grow md:w-1/2">
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4 border-b border-[#E5D9C5]/10 pb-4">
                    <h3 className="font-bold text-lg md:text-xl text-foreground leading-tight font-heading">
                      {locale === "en" ? selectedCocktail.name : selectedCocktail.nameEs}
                      <span className="text-muted-foreground font-sans font-normal text-xs block mt-1">
                        {locale === "en" ? selectedCocktail.nameEs : selectedCocktail.name}
                      </span>
                    </h3>
                    <span className="text-mustard font-extrabold text-base md:text-lg shrink-0">
                      $9.99
                    </span>
                  </div>
                  
                  <div className="space-y-3 mt-4 font-sans text-xs md:text-sm leading-relaxed">
                    <p className="text-foreground">
                      {locale === "en" ? selectedCocktail.description : selectedCocktail.descriptionEs}
                    </p>
                    <p className="text-muted-foreground italic border-l-2 border-mustard/25 pl-3">
                      {locale === "en" ? selectedCocktail.descriptionEs : selectedCocktail.description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-[#E5D9C5]/10 font-sans">
                  <span className="text-xs uppercase tracking-wider text-mustard font-semibold">
                    {t("Handcrafted", "Artesanal")}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
