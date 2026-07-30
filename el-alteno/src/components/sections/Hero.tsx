"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CalendarDays, ChevronRight, UtensilsCrossed } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

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
      className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden bg-black text-white"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-30 h-full w-full object-cover"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 -z-20 bg-black/35" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(10,7,5,.3)_0%,rgba(10,7,5,.12)_34%,rgba(10,7,5,.58)_68%,rgba(8,6,5,.96)_100%)]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-48 bg-gradient-to-b from-black/55 to-transparent" />

      <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center px-5 pb-10 pt-32 text-center sm:px-8 sm:pb-14 sm:pt-36 md:pt-32">
        <motion.div
          {...entrance(0)}
          className="mb-7 flex items-center justify-center gap-4 text-[11px] font-bold uppercase tracking-[0.24em] text-[#D8A34B] sm:text-xs md:mb-8 md:text-sm"
        >
          <span>MX&nbsp; {t("Welcome", "Bienvenidos")}</span>
          <span className="h-7 w-px bg-[#D8A34B]/70" aria-hidden="true" />
          <span>US&nbsp; Welcome</span>
        </motion.div>

        <h1 className="sr-only">El Alteño — Auténtica Comida Mexicana</h1>

        <motion.div
          {...entrance(0.12)}
          className="relative mb-7 w-full max-w-[280px] drop-shadow-[0_22px_34px_rgba(0,0,0,.48)] sm:max-w-[360px]"
        >
          <svg
            viewBox="0 0 445 381"
            role="img"
            aria-label="El Alteño — Auténtica Comida Mexicana"
            className="h-auto w-full overflow-visible"
          >
            <defs>
              <clipPath id="hero-emblem-clip">
                <path d="M18 358 Q8 346 8 322 L8 112 Q8 82 36 67 Q47 60 62 60 Q88 33 122 19 Q166 1 222 1 Q279 1 323 19 Q357 33 383 60 Q398 60 409 67 Q437 82 437 112 L437 322 Q437 346 427 358 Q414 374 388 377 L57 377 Q31 374 18 358 Z" />
              </clipPath>
            </defs>
            <image
              href="/images/logo/hero-emblem-reference.png"
              width="445"
              height="381"
              clipPath="url(#hero-emblem-clip)"
              preserveAspectRatio="xMidYMid slice"
            />
          </svg>
        </motion.div>

        <motion.p
          {...entrance(0.22)}
          className="mb-7 text-[11px] font-bold uppercase tracking-[0.16em] text-white/95 drop-shadow-md sm:text-sm md:mb-8"
        >
          323 Main St <span className="text-[#D8A34B]">·</span> Watsonville, California
        </motion.p>

        <motion.div
          {...entrance(0.3)}
          className="flex w-full max-w-[300px] flex-col gap-3.5 sm:max-w-[360px]"
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
          className="mt-8 w-full max-w-[300px] sm:mt-10 sm:max-w-[360px]"
        >
          <div className="mb-4 flex items-center gap-4 text-xs text-[#D8A34B]">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#D8A34B]/55" />
            <span>{t("Available on", "Disponible en")}</span>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#D8A34B]/55" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <span className="flex min-h-12 items-center justify-center rounded-full border border-[#D8A34B]/55 bg-black/35 px-3 text-[11px] font-extrabold uppercase tracking-[0.1em] text-white/90 backdrop-blur-[2px] sm:text-xs">
              DoorDash
            </span>
            <span className="flex min-h-12 items-center justify-center rounded-full border border-[#D8A34B]/55 bg-black/35 px-3 text-[11px] font-extrabold uppercase tracking-[0.1em] text-white/90 backdrop-blur-[2px] sm:text-xs">
              Uber Eats
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
