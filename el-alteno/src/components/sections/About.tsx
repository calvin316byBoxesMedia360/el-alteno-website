"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const featureCards = [
  {
    icon: "/images/about/shrimp.webp",
    label: "Fresh Mariscos",
    labelEs: "Mariscos Frescos",
    detail: "Seafood prepared daily",
    detailEs: "Mariscos frescos diario",
  },
  {
    icon: "/images/about/celebration.webp",
    label: "Private Events",
    labelEs: "Eventos Privados",
    detail: "Up to 100 guests",
    detailEs: "Hasta 100 personas",
  },
  {
    icon: "/images/about/cocktail.webp",
    label: "Signature Drinks",
    labelEs: "Bebidas de la Casa",
    detail: "Cantaritos & more",
    detailEs: "Cantaritos y más",
  },
  {
    icon: "/images/about/takeout.webp",
    label: "Online Ordering",
    labelEs: "Pedidos en Línea",
    detail: "DoorDash & Uber Eats",
    detailEs: "DoorDash y Uber Eats",
  },
];

export default function About() {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="about"
      className="relative isolate overflow-hidden bg-[#0E0B09] px-0 py-12 text-[#F5E9D5] sm:py-16 md:py-24"
    >
      <div className="pointer-events-none absolute inset-0 -z-30" aria-hidden="true">
        <Image
          src="/images/about/story-food-frame.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-90"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(7,5,4,.1),rgba(8,6,5,.24)_42%,rgba(6,4,3,.2))]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_34%,rgba(0,0,0,.04),rgba(0,0,0,.42)_82%),linear-gradient(90deg,rgba(0,0,0,.05),transparent_25%,transparent_75%,rgba(0,0,0,.08))]" />

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.08 }}
        transition={{ duration: reduceMotion ? 0 : 0.7 }}
        className="relative mx-auto w-[90%] max-w-3xl overflow-hidden rounded-[2rem] border border-[#C98D35]/70 bg-[radial-gradient(circle_at_72%_12%,rgba(104,64,34,.06),transparent_32%),linear-gradient(145deg,rgba(20,15,11,.66),rgba(9,7,5,.6))] px-4 py-9 shadow-[0_30px_80px_rgba(0,0,0,.44)] backdrop-blur-[8px] backdrop-saturate-75 sm:w-[88%] sm:px-8 md:px-12 md:py-14"
      >
        <div className="pointer-events-none absolute inset-[7px] rounded-[1.65rem] border border-[#C98D35]/15" />
        <div className="pointer-events-none absolute inset-x-14 top-0 h-px bg-gradient-to-r from-transparent via-[#E1AA51] to-transparent" />

        <div className="relative z-10">
          <div className="mb-7">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#D8A34B] md:text-sm">
              {t("Our Story", "Nuestra Historia")}
            </p>
            <div className="mb-5 flex items-center gap-2" aria-hidden="true">
              <span className="h-px w-24 bg-[#D8A34B]/70" />
              <span className="size-1.5 rotate-45 border border-[#D8A34B]" />
            </div>
            <h2 className="max-w-3xl text-4xl font-heading font-bold leading-[1.08] text-[#FFF3DF] sm:text-5xl md:text-6xl">
              {t("Flavors that feel like home", "Sabores que se sienten como en casa")}
            </h2>
          </div>

          <div className="space-y-5 text-base leading-relaxed text-[#D7C0A3] sm:text-lg md:text-xl md:leading-relaxed">
            <p>
              {t(
                "El Alteño brings the soulful cooking of Mexico to the heart of Watsonville, California. Every dish starts with recipes handed down through generations — slow-cooked stews, hand-pressed tortillas, and mariscos so fresh you can taste the coast.",
                "El Alteño trae la cocina del alma de México al corazón de Watsonville, California. Cada platillo comienza con recetas transmitidas de generación en generación: guisados de cocción lenta, tortillas hechas a mano y mariscos tan frescos que puedes saborear la costa."
              )}
            </p>
            <p>
              {t(
                "Whether you are stopping in on a road trip down the coast, celebrating a milestone with family, or hosting a private event for up to 100 guests — this is a place where you will leave full and come back soon.",
                "Ya sea que pases en un viaje por carretera por la costa, celebres un momento importante con la familia o realices un evento privado para hasta 100 invitados, este es un lugar del que saldrás satisfecho y volverás pronto."
              )}
            </p>
          </div>

          <div className="my-8 grid grid-cols-3 divide-x divide-[#D8A34B]/45 border-y border-[#D8A34B]/35 py-6 text-center">
            <div className="px-2">
              <p className="font-heading text-4xl font-bold text-[#D9663E] sm:text-5xl">100</p>
              <p className="mt-1 text-[11px] leading-tight text-[#D7C0A3] sm:text-sm">
                {t("guests per event", "invitados por evento")}
              </p>
            </div>
            <div className="px-2">
              <p className="font-heading text-4xl font-bold text-[#D9663E] sm:text-5xl">50+</p>
              <p className="mt-1 text-[11px] leading-tight text-[#D7C0A3] sm:text-sm">
                {t("dishes on the menu", "platillos en el menú")}
              </p>
            </div>
            <div className="px-2">
              <p className="font-heading text-4xl font-bold text-[#D9663E] sm:text-5xl">7</p>
              <p className="mt-1 text-[11px] leading-tight text-[#D7C0A3] sm:text-sm">
                {t("days a week", "días a la semana")}
              </p>
            </div>
          </div>

          <div className="relative mb-3 min-h-[126px] overflow-hidden rounded-2xl border border-[#E1A24A]/80 bg-[radial-gradient(circle_at_82%_42%,rgba(248,160,91,.2),transparent_34%),linear-gradient(135deg,#9c3f1d,#6d2715)] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,211,137,.2),0_14px_32px_rgba(79,25,10,.28)] sm:min-h-[146px] sm:px-6 sm:py-5">
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
              <Image
                src="/images/about/tortillas-handmade-poster.webp"
                alt=""
                fill
                sizes="(max-width: 768px) 90vw, 768px"
                className="object-cover object-[center_58%]"
              />
              {!reduceMotion && (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  poster="/images/about/tortillas-handmade-poster.webp"
                  className="absolute inset-0 h-full w-full object-cover object-[center_58%]"
                >
                  <source src="/videos/tortillas-handmade.mp4" type="video/mp4" />
                </video>
              )}
            </div>
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(31,9,3,.96)_0%,rgba(39,12,4,.84)_42%,rgba(17,8,4,.4)_70%,rgba(9,6,4,.18)_100%)]" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/55 to-transparent" />
            <div className="relative z-10 max-w-[73%] sm:max-w-[70%]">
              <span className="inline-flex rounded-full border border-[#F0C478]/50 bg-black/15 px-4 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#F4CE8B] sm:text-xs">
                {t("Hand Made", "Hecho a Mano")}
              </span>
              <h3 className="mt-2 text-lg font-heading font-bold leading-tight text-white min-[380px]:text-xl sm:text-2xl">
                {t("Handmade Tortillas", "Tortillas Hechas a Mano")}
              </h3>
              <p className="mt-1.5 text-[11px] leading-relaxed text-white/85 min-[380px]:text-xs sm:text-sm">
                {t(
                  "Every tortilla is pressed and cooked to order. You can taste the heritage in every bite.",
                  "Cada tortilla es prensada y cocinada al momento. Puedes saborear la herencia en cada bocado."
                )}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
            {featureCards.map((feature) => {
              return (
                <article
                  key={feature.label}
                  className="flex min-h-[92px] items-center gap-2.5 rounded-2xl border border-[#C98D35]/70 bg-[linear-gradient(145deg,rgba(13,10,8,.82),rgba(4,3,2,.72))] px-3 py-3 shadow-[inset_0_1px_0_rgba(255,199,102,.05)] backdrop-blur-[3px] sm:min-h-24 sm:gap-4 sm:px-5 sm:py-4"
                >
                  <span className="relative size-10 shrink-0 sm:size-12">
                    <Image
                      src={feature.icon}
                      alt=""
                      fill
                      sizes="48px"
                      className="object-contain drop-shadow-[0_5px_8px_rgba(216,112,48,.24)]"
                    />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-[15px] font-heading font-bold leading-tight text-[#FFF3DF] sm:text-lg">
                      {t(feature.label, feature.labelEs)}
                    </h3>
                    <p className="mt-1 text-[11px] leading-tight text-[#BFA78B] sm:text-sm">
                      {t(feature.detail, feature.detailEs)}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
