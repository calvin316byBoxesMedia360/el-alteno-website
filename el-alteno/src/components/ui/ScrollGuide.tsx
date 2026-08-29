"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

/**
 * Two linked gestures that invite the reader down the page.
 *
 *   1. On the hero, a hairline with a light travelling down it and a quiet
 *      label. It is a real link to the next section, so it rewards a tap
 *      rather than only suggesting one, and it retires as soon as the reader
 *      takes the hint.
 *   2. Once past the hero, a thin rail at the left edge fills as the reader
 *      moves through the stretch worth discovering — about, menu, cocktails —
 *      and fades out at the end of it. It accompanies part of the journey
 *      rather than the whole page, which is what makes it feel like a guide
 *      instead of a browser chrome.
 *
 * Both are decorative to a screen reader. Under prefers-reduced-motion the
 * travelling light is replaced by a static mark and the rail stops easing.
 */
export default function ScrollGuide() {
  const { t } = useLanguage();
  const [heroOpacity, setHeroOpacity] = useState(1);
  const [railOpacity, setRailOpacity] = useState(0);
  const [progress, setProgress] = useState(0);
  const [reduce, setReduce] = useState(false);
  const frame = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const read = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;

      // The hero cue is at full strength until the reader moves, and gone by
      // the time a third of a screen has passed.
      setHeroOpacity(Math.max(0, 1 - y / (vh * 0.33)));

      // The rail covers the discovery stretch: everything from the end of the
      // hero to the end of the last section worth browsing.
      const end =
        document.querySelector("#cocktails") ??
        document.querySelector("#menu");
      if (!end) return;
      const stop = end.getBoundingClientRect().bottom + y;
      const start = vh * 0.5;
      const span = Math.max(1, stop - vh - start);
      const p = (y - start) / span;

      setProgress(Math.min(1, Math.max(0, p)));
      // Fades in over the first sixth of the stretch and back out over the
      // last sixth, so it arrives and leaves without ever being an event.
      setRailOpacity(p <= 0 || p >= 1 ? 0 : Math.min(1, p * 6, (1 - p) * 6));
    };

    const onScroll = () => {
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      {/* 1 · the invitation, over the hero */}
      <a
        href="#about"
        aria-label={t("Scroll to explore", "Desplázate para explorar")}
        className="fixed bottom-4 left-4 z-30 flex flex-col items-center gap-1.5 sm:bottom-6 sm:left-6 sm:gap-2"
        style={{
          opacity: heroOpacity,
          pointerEvents: heroOpacity < 0.15 ? "none" : "auto",
          transition: "opacity 220ms ease-out",
        }}
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#D8A34B]">
          {t("Explore", "Descubre")}
        </span>
        <span
          aria-hidden
          className="relative block h-8 w-px overflow-hidden rounded-full bg-gradient-to-b from-[#D8A34B]/10 via-[#D8A34B]/45 to-[#D8A34B]/10 sm:h-14"
        >
          {reduce ? (
            <span className="absolute left-1/2 top-1/2 block size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F1BC5D]" />
          ) : (
            <span className="scroll-guide-spark absolute left-1/2 block size-1.5 -translate-x-1/2 rounded-full bg-[#F1BC5D] shadow-[0_0_10px_2px_rgba(241,188,93,.55)]" />
          )}
        </span>
      </a>

      {/* 2 · the rail that walks the discovery stretch */}
      <div
        aria-hidden
        className="pointer-events-none fixed left-3 top-1/2 z-30 hidden -translate-y-1/2 md:block"
        style={{ opacity: railOpacity, transition: reduce ? "none" : "opacity 300ms ease-out" }}
      >
        <span className="relative block h-32 w-[3px] overflow-hidden rounded-full bg-foreground/12">
          <span
            className="absolute inset-x-0 top-0 block rounded-full bg-gradient-to-b from-[#C65D3B] to-[#D8A34B]"
            style={{
              height: `${progress * 100}%`,
              transition: reduce ? "none" : "height 120ms linear",
            }}
          />
        </span>
      </div>
    </>
  );
}
