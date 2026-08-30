"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Horizontal strip that admits it scrolls.
 *
 * A row of chips that overflows gives the reader no signal that more exists
 * past the edge — on a phone there is not even a scrollbar. Three signals are
 * layered here, weakest to strongest:
 *
 *   1. the edge the content continues past is faded out, so a chip is always
 *      cut mid-shape rather than ending cleanly at the viewport
 *   2. a hairline under the strip shows how much of it you are seeing and
 *      where you are in it
 *   3. the first time the strip comes into view it scrolls a little and comes
 *      back — the one signal nobody misses, and the only one that costs
 *      motion, so it is skipped under prefers-reduced-motion
 *
 * Arrows appear only where a pointer exists; on touch the fade and the nudge
 * carry it.
 */
export default function ScrollStrip({
  children,
  className = "",
  ariaLabel,
}: {
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const nudged = useRef(false);
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(false);
  const [bar, setBar] = useState({ w: 0, x: 0 });

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setLeft(el.scrollLeft > 2);
    setRight(el.scrollLeft < max - 2);
    if (max <= 2) {
      setBar({ w: 0, x: 0 });
      return;
    }
    const w = (el.clientWidth / el.scrollWidth) * 100;
    setBar({ w, x: (el.scrollLeft / max) * (100 - w) });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    measure();
    el.addEventListener("scroll", measure, { passive: true });
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    Array.from(el.children).forEach((child) => ro.observe(child));
    const mo = new MutationObserver(measure);
    mo.observe(el, { characterData: true, childList: true, subtree: true });
    return () => {
      el.removeEventListener("scroll", measure);
      ro.disconnect();
      mo.disconnect();
    };
  }, [measure]);

  // Show, once, that the strip moves.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timers: number[] = [];

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || nudged.current) return;
        if (el.scrollWidth - el.clientWidth < 24) return;
        nudged.current = true;
        io.disconnect();
        const t1 = window.setTimeout(() => el.scrollTo({ left: 40, behavior: "smooth" }), 600);
        const t2 = window.setTimeout(() => el.scrollTo({ left: 0, behavior: "smooth" }), 1250);
        timers.push(t1, t2);
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  const step = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(180, el.clientWidth * 0.7), behavior: "smooth" });
  };

  const mask =
    left && right
      ? "linear-gradient(to right, transparent 0, #000 28px, #000 calc(100% - 28px), transparent 100%)"
      : left
        ? "linear-gradient(to right, transparent 0, #000 28px, #000 100%)"
        : right
          ? "linear-gradient(to right, #000 calc(100% - 28px), transparent 100%)"
          : undefined;

  const arrow =
    "flex absolute top-[58%] -translate-y-1/2 z-10 size-11 items-center justify-center rounded-full " +
    "bg-transparent text-mustard transition-[opacity,transform] hover:scale-105 cursor-pointer";

  const arrowSurface =
    "flex size-8 items-center justify-center rounded-full bg-[#17120F]/82 dark:bg-[#0F0C0A]/88 " +
    "backdrop-blur-md border border-mustard/35 text-mustard shadow-lg";

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        aria-label="Anterior"
        disabled={!left}
        onClick={() => step(-1)}
        className={`${arrow} -left-3 ${left ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <span className={arrowSurface}>
          <ChevronLeft size={15} />
        </span>
      </button>

      <div
        ref={ref}
        role={ariaLabel ? "group" : undefined}
        aria-label={ariaLabel}
        className="overflow-x-auto overscroll-x-contain [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        style={{ maskImage: mask, WebkitMaskImage: mask }}
      >
        {children}
      </div>

      <button
        type="button"
        aria-label="Siguiente"
        disabled={!right}
        onClick={() => step(1)}
        className={`${arrow} -right-3 ${right ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <span className={arrowSurface}>
          <ChevronRight size={15} />
        </span>
      </button>

      {/* How much of the strip you are seeing, and where in it you are. */}
      {bar.w > 0 && bar.w < 99 && (
        <div aria-hidden className="mt-2 h-[3px] w-full rounded-full bg-foreground/10">
          <div
            className="h-full rounded-full bg-accent/70 transition-[margin] duration-150"
            style={{ width: `${bar.w}%`, marginLeft: `${bar.x}%` }}
          />
        </div>
      )}
    </div>
  );
}
