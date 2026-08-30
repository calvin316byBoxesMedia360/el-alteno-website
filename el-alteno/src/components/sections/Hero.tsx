"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, CalendarDays, ChevronRight, UtensilsCrossed } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { DELIVERY_LINKS } from "@/lib/deliveryLinks";

export default function Hero() {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();

  const entrance = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduceMotion ? 0 : 0.65, delay, ease: "easeOut" as const },
  });

  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-[#161311] pt-24 text-white md:flex md:min-h-[100svh] md:items-center md:justify-center md:pt-0"
    >
      <div className="relative z-0 w-full shrink-0 md:absolute md:inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          className="pointer-events-none block aspect-video h-auto w-full object-contain md:h-full md:aspect-auto md:object-cover"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/20 md:bg-black/35" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-[#161311] md:inset-0 md:h-auto md:bg-[linear-gradient(to_bottom,rgba(10,7,5,.3)_0%,rgba(10,7,5,.12)_34%,rgba(10,7,5,.58)_68%,rgba(8,6,5,.96)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/35 to-transparent md:h-48 md:from-black/55" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center bg-[#161311] px-5 pb-10 pt-7 text-center sm:px-8 sm:pb-14 sm:pt-8 md:bg-transparent md:pt-32">
        <motion.div
          {...entrance(0)}
          className="order-2 mb-7 flex items-center justify-center gap-4 text-[11px] font-bold uppercase tracking-[0.24em] text-[#D8A34B] sm:text-xs md:order-none md:mb-8 md:text-sm"
        >
          {/* Fixed label — one greeting per flag, not a localisable string.
              Wrapping it in t() read "MX Welcome · US Welcome" in English. */}
          <span>MX&nbsp; Bienvenidos</span>
          <span className="h-7 w-px bg-[#D8A34B]/70" aria-hidden="true" />
          <span>US&nbsp; Welcome</span>
        </motion.div>

        <h1 className="sr-only">El Alteño — Auténtica Comida Mexicana</h1>

        <motion.p
          {...entrance(0.22)}
          className="order-3 mb-7 text-[11px] font-bold uppercase tracking-[0.16em] text-white/95 drop-shadow-md sm:text-sm md:order-none md:mb-8"
        >
          323 Main St <span className="text-[#D8A34B]">·</span> Watsonville, California
        </motion.p>

        <motion.div
          {...entrance(0.3)}
          className="order-4 flex w-full max-w-[300px] flex-col gap-3.5 sm:max-w-[360px] md:order-none"
        >
          <motion.a
            whileHover={reduceMotion ? undefined : { scale: 1.015 }}
            whileTap={reduceMotion ? undefined : { scale: 0.985 }}
            href="#menu"
            className="group flex min-h-14 w-full items-center rounded-full border border-[#F0B55B]/75 bg-[linear-gradient(180deg,#D66B42,#B94E2E)] px-5 text-white shadow-[0_14px_32px_rgba(75,26,10,.4)] outline-none transition-colors hover:from-[#DE754D] hover:to-[#C15836] focus-visible:ring-2 focus-visible:ring-[#F1BC5D] focus-visible:ring-offset-2 focus-visible:ring-offset-black motion-reduce:transition-none sm:min-h-16 sm:px-7"
          >
            <UtensilsCrossed className="size-5 text-[#F4C56F] sm:size-6" aria-hidden="true" />
            <span className="flex-1 text-sm font-extrabold uppercase tracking-[0.12em] sm:text-base">
              {t("Explore Menu", "Explorar Menú")}
            </span>
            <ChevronRight className="size-5 text-[#F4C56F] transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" />
          </motion.a>

          <motion.a
            whileHover={reduceMotion ? undefined : { scale: 1.015 }}
            whileTap={reduceMotion ? undefined : { scale: 0.985 }}
            href="#events"
            className="group flex min-h-14 w-full items-center rounded-full border border-[#D8A34B]/70 bg-black/45 px-5 text-white shadow-[0_12px_28px_rgba(0,0,0,.28)] outline-none backdrop-blur-[3px] transition-colors hover:bg-black/60 focus-visible:ring-2 focus-visible:ring-[#F1BC5D] focus-visible:ring-offset-2 focus-visible:ring-offset-black motion-reduce:transition-none sm:min-h-16 sm:px-7"
          >
            <CalendarDays className="size-5 text-[#D8A34B] sm:size-6" aria-hidden="true" />
            <span className="flex-1 text-sm font-extrabold uppercase tracking-[0.12em] sm:text-base">
              {t("Book an Event", "Reservar Evento")}
            </span>
            <ChevronRight className="size-5 text-[#D8A34B] transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" />
          </motion.a>
        </motion.div>

        <motion.div
          {...entrance(0.4)}
          className="order-5 mt-8 w-full max-w-[300px] sm:mt-10 sm:max-w-[360px] md:order-none"
        >
          <div className="mb-4 flex items-center gap-4 text-xs text-[#D8A34B]">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#D8A34B]/55" />
            <span>{t("Available on", "Disponible en")}</span>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#D8A34B]/55" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <a
              href={DELIVERY_LINKS.doorDash}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Order from DoorDash (opens in a new tab)"
              className="group flex min-h-12 items-center justify-center gap-1.5 rounded-full border border-[#D8A34B]/45 bg-black/30 px-3 text-[11px] font-extrabold uppercase tracking-[0.1em] text-white/85 outline-none backdrop-blur-[2px] transition-colors hover:border-[#D8A34B]/70 hover:bg-black/45 hover:text-white focus-visible:ring-2 focus-visible:ring-[#F1BC5D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#161311] sm:text-xs"
            >
              <span>DoorDash</span>
              <ArrowUpRight
                className="size-3.5 text-[#D8A34B]/75 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
            <a
              href={DELIVERY_LINKS.uberEats}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Order from Uber Eats (opens in a new tab)"
              className="group flex min-h-12 items-center justify-center gap-1.5 rounded-full border border-[#D8A34B]/45 bg-black/30 px-3 text-[11px] font-extrabold uppercase tracking-[0.1em] text-white/85 outline-none backdrop-blur-[2px] transition-colors hover:border-[#D8A34B]/70 hover:bg-black/45 hover:text-white focus-visible:ring-2 focus-visible:ring-[#F1BC5D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#161311] sm:text-xs"
            >
              <span>Uber Eats</span>
              <ArrowUpRight
                className="size-3.5 text-[#D8A34B]/75 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
