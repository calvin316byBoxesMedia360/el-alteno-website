import Image from "next/image";
import { Sun } from "lucide-react";

interface BreakfastNoticeProps {
  locale?: "en" | "es";
  bilingual?: boolean;
}

export default function BreakfastNotice({
  locale = "en",
  bilingual = false,
}: BreakfastNoticeProps) {
  const english = "Craving breakfast? Ask about our breakfast menu.";
  const spanish = "¿Antojo de desayuno? Pregunte por nuestro menú de desayunos.";

  return (
    <aside
      aria-label={locale === "es" ? "Información de desayunos" : "Breakfast information"}
      className="relative isolate flex min-h-[158px] items-center overflow-hidden rounded-3xl border border-mustard/45 bg-[#24160F] px-5 py-6 shadow-[0_20px_55px_rgba(60,28,10,0.24)] md:min-h-[170px] md:px-8 md:py-7"
    >
      <Image
        src="/images/menu/breakfast-morning.webp"
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 1280px"
        className="-z-20 object-cover object-[58%_center] sm:object-center"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(25,13,9,0.98)_0%,rgba(66,32,17,0.92)_48%,rgba(66,32,17,0.30)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_84%_32%,rgba(226,182,121,0.22),transparent_38%)] backdrop-blur-[1px]"
      />
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-mustard via-terracota to-mustard"
      />

      <div className="relative z-10 flex max-w-[88%] items-start gap-3.5 sm:max-w-[68%] md:gap-4">
        <span className="mt-0.5 grid size-11 shrink-0 place-items-center rounded-full border border-[#F1CB83]/45 bg-[#2A1710]/45 text-[#F1CB83] shadow-[0_8px_24px_rgba(0,0,0,0.22)] backdrop-blur-md md:size-12">
          <Sun className="size-5" aria-hidden />
        </span>
        <div className="pt-0.5">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#F1CB83] md:text-[11px]">
            Breakfast / Desayunos
          </p>
          {bilingual ? (
            <>
              <p className="mt-2 text-base font-semibold leading-snug text-[#FFF7E8] md:text-lg">
                {english}
              </p>
              <p className="mt-1 text-sm leading-snug text-[#F4DFC1]/90 md:text-base">
                {spanish}
              </p>
            </>
          ) : (
            <p className="mt-2 text-lg font-semibold leading-snug text-[#FFF7E8] drop-shadow-sm md:text-xl">
              {locale === "es" ? spanish : english}
            </p>
          )}
        </div>
      </div>
    </aside>
  );
}
