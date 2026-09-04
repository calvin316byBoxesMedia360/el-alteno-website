"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronRight, Images, Play, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type PreviewImage = {
  id: string;
  kind: "image";
  src: string;
  altEn: string;
  altEs: string;
};

type PreviewVideo = {
  id: string;
  kind: "video";
  src: string;
  labelEn: string;
  labelEs: string;
};

type PreviewMedia = PreviewImage | PreviewVideo;

const previewMedia: PreviewMedia[] = [
  {
    id: "preview-birthday-backdrop",
    kind: "image",
    src: "/images/events-gallery/IMG_20250627_133454.webp",
    altEn: "Colorful birthday backdrop framed by pink and orange balloons.",
    altEs: "Telón colorido de cumpleaños enmarcado por globos rosas y naranjas.",
  },
  {
    id: "preview-festive-table",
    kind: "image",
    src: "/images/events-gallery/IMG_20250627_133528.webp",
    altEn: "Colorful event table styling with vibrant linens and festive details.",
    altEs: "Mesa de evento colorida con mantelería vibrante y detalles festivos.",
  },
  {
    id: "preview-formal-tables",
    kind: "image",
    src: "/images/events-gallery/IMG_20231021_140858.webp",
    altEn: "Long formal dining tables arranged beneath the restaurant patio.",
    altEs: "Mesas largas y formales acomodadas bajo el patio del restaurante.",
  },
  {
    id: "preview-dessert-table",
    kind: "image",
    src: "/images/events-gallery/IMG_20230610_135659.webp",
    altEn: "A close view of a decorated dessert table with festive sweets.",
    altEs: "Detalle de una mesa de postres decorada con dulces festivos.",
  },
  {
    id: "preview-colorful-patio",
    kind: "image",
    src: "/images/events-gallery/IMG_20250627_133825.webp",
    altEn: "Colorful decorated tables arranged across the covered patio.",
    altEs: "Mesas decoradas con color a lo largo del patio techado.",
  },
  {
    id: "preview-celebration-video",
    kind: "video",
    src: "/images/events-gallery/VID_20231203_134004.mp4",
    labelEn: "A celebration in motion",
    labelEs: "Una celebración en movimiento",
  },
];

const previewLayout = [
  "col-span-2 min-h-[18rem] md:row-span-2 md:min-h-[30rem]",
  "min-h-[9rem] md:min-h-[14rem]",
  "min-h-[9rem] md:min-h-[14rem]",
  "min-h-[9rem] md:min-h-[14rem]",
  "min-h-[9rem] md:min-h-[14rem]",
  "col-span-2 min-h-[11rem] md:min-h-[14rem]",
];

export default function GalleryPreview() {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const [selectedMedia, setSelectedMedia] = useState<PreviewMedia | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!selectedMedia) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedMedia(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedMedia]);

  const labelFor = (media: PreviewMedia) =>
    media.kind === "video" ? t(media.labelEn, media.labelEs) : t(media.altEn, media.altEs);

  const handlePreviewKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>, media: PreviewMedia) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setSelectedMedia(media);
    }
  };

  return (
    <section
      id="gallery-preview"
      className="section-padding scroll-mt-24 relative overflow-hidden bg-background text-foreground transition-colors duration-300"
    >
      <div className="absolute -left-28 top-20 size-72 rounded-full bg-terracota/10 blur-3xl" aria-hidden="true" />
      <div className="absolute -right-40 bottom-4 size-96 rounded-full bg-mustard/10 blur-3xl" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-6 px-4 md:mb-12 md:flex-row md:items-end md:justify-between lg:px-0">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-accent md:text-sm">
              {t("A glimpse of the celebrations", "Un vistazo a las celebraciones")}
            </p>
            <h2 className="font-heading text-3xl font-bold leading-tight text-foreground md:text-5xl">
              {t("See the moments before you arrive", "Mira los momentos antes de llegar")}
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
              {t(
                "A few moments from the tables, details, and gatherings that make El Alteño feel like home.",
                "Algunos momentos de las mesas, los detalles y las reuniones que hacen que El Alteño se sienta como casa."
              )}
            </p>
          </div>

          <a
            href="#gallery"
            className="group inline-flex min-h-11 w-fit items-center gap-2 rounded-full border border-mustard/60 bg-card/70 px-5 text-xs font-extrabold uppercase tracking-[0.14em] text-foreground shadow-lg outline-none backdrop-blur-sm transition-colors hover:border-mustard hover:bg-card focus-visible:ring-2 focus-visible:ring-mustard focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Images className="size-4 text-accent" aria-hidden="true" />
            <span>{t("View full gallery", "Ver galería completa")}</span>
            <ChevronRight className="size-4 text-accent transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" />
          </a>
        </div>

        <div className="grid grid-cols-2 gap-3 px-4 md:grid-cols-4 md:gap-5 lg:px-0">
          {previewMedia.map((media, index) => (
            <motion.button
              key={media.id}
              type="button"
              initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: reduceMotion ? 0 : 0.45, delay: reduceMotion ? 0 : index * 0.06 }}
              whileHover={reduceMotion ? undefined : { y: -4 }}
              whileTap={reduceMotion ? undefined : { scale: 0.985 }}
              onClick={() => setSelectedMedia(media)}
              onKeyDown={(event) => handlePreviewKeyDown(event, media)}
              aria-label={t("Preview event media", "Vista previa de medio del evento")}
              className={`group relative min-h-11 overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-lg outline-none transition-shadow hover:shadow-2xl focus-visible:ring-2 focus-visible:ring-mustard focus-visible:ring-offset-2 focus-visible:ring-offset-background ${previewLayout[index]}`}
            >
              {media.kind === "video" ? (
                <video
                  src={media.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-[1.03] motion-reduce:transition-none"
                  aria-hidden="true"
                />
              ) : (
                <Image
                  src={media.src}
                  alt={labelFor(media)}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
                  sizes="(max-width: 767px) 50vw, (max-width: 1279px) 25vw, 520px"
                />
              )}
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
              {media.kind === "video" && (
                <span className="pointer-events-none absolute bottom-4 right-4 grid size-11 place-items-center rounded-full border border-white/25 bg-black/45 text-white shadow-xl backdrop-blur-md transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none">
                  <Play size={16} fill="currentColor" aria-hidden="true" />
                </span>
              )}
              <span className="sr-only">{labelFor(media)}</span>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t("Preview media", "Vista previa del medio")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMedia(null)}
            className="fixed inset-0 z-[60] flex cursor-zoom-out items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.96, y: reduceMotion ? 0 : 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.96, y: reduceMotion ? 0 : 12 }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-mustard/35 bg-[#1E1A17] p-2 shadow-2xl"
            >
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setSelectedMedia(null)}
                aria-label={t("Close preview", "Cerrar vista previa")}
                className="absolute right-5 top-5 z-10 grid min-h-11 min-w-11 place-items-center rounded-full border border-white/20 bg-black/65 text-white shadow-lg backdrop-blur-md transition-colors hover:bg-black/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mustard"
              >
                <X size={19} aria-hidden="true" />
              </button>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-black/30">
                {selectedMedia.kind === "video" ? (
                  <video
                    key={selectedMedia.id}
                    src={selectedMedia.src}
                    controls
                    autoPlay
                    playsInline
                    className="h-full w-full object-contain"
                    aria-label={labelFor(selectedMedia)}
                  />
                ) : (
                  <Image
                    src={selectedMedia.src}
                    alt={labelFor(selectedMedia)}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 1024px"
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
