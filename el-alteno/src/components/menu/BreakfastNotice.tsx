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
      className="relative overflow-hidden rounded-2xl border border-mustard/35 bg-card/65 px-4 py-4 shadow-[0_14px_40px_rgba(92,55,22,0.10)] backdrop-blur-md dark:border-mustard/20 dark:bg-[#231D18]/70"
    >
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-mustard via-terracota to-mustard"
      />
      <div className="flex items-start gap-3">
        <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full border border-mustard/35 bg-mustard/10 text-accent">
          <Sun className="size-4" aria-hidden />
        </span>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent">
            Breakfast / Desayunos
          </p>
          {bilingual ? (
            <>
              <p className="mt-1 text-sm font-semibold text-foreground">{english}</p>
              <p className="mt-0.5 text-sm text-muted-foreground">{spanish}</p>
            </>
          ) : (
            <p className="mt-1 text-sm font-semibold text-foreground">
              {locale === "es" ? spanish : english}
            </p>
          )}
        </div>
      </div>
    </aside>
  );
}
