"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronRight, Images, Play } from "lucide-react";
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
    src: "/videos/optimized/gallery-celebration-720.mp4",
    labelEn: "A celebration in motion",
    labelEs: "Una celebración en movimiento",
  },
];

const previewLayout = [
  "col-span-2 min-h-[18rem] md:row-span-2 md:min-h-[30rem]",
  "min-h-[9rem] md:min-h-[14rem]",
  "min-h-[9rem] md:min-h-[14rem]",
  "min-h-[9rem] md:min-h-[14rem]",
  "col-span-2 min-h-[11rem] md:min-h-[14rem]",
];

export default function GalleryPreview() {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();

  const labelFor = (media: PreviewMedia) =>
    media.kind === "video" ? t(media.labelEn, media.labelEs) : t(media.altEn, media.altEs);

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

          <Link
            href="/gallery"
            className="group inline-flex min-h-11 w-fit items-center gap-2 rounded-full border border-mustard/60 bg-card/70 px-5 text-xs font-extrabold uppercase tracking-[0.14em] text-foreground shadow-lg outline-none backdrop-blur-sm transition-colors hover:border-mustard hover:bg-card focus-visible:ring-2 focus-visible:ring-mustard focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Images className="size-4 text-accent" aria-hidden="true" />
            <span>{t("View full gallery", "Ver galería completa")}</span>
            <ChevronRight className="size-4 text-accent transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" />
          </Link>
        </div>

        <div className="relative max-h-[30rem] overflow-hidden rounded-[2rem] md:max-h-[37rem]">
          <div className="grid grid-cols-2 gap-3 px-4 pb-4 md:grid-cols-4 md:gap-5 lg:px-0">
            {previewMedia.map((media, index) => (
              <Link
                key={media.id}
                href="/gallery"
                aria-label={t("Open the complete gallery", "Abrir la galería completa")}
                className={`group relative block min-h-11 overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-lg outline-none transition-shadow hover:shadow-2xl focus-visible:ring-2 focus-visible:ring-mustard focus-visible:ring-offset-2 focus-visible:ring-offset-background ${previewLayout[index]}`}
              >
                <motion.div
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: reduceMotion ? 0 : 0.45, delay: reduceMotion ? 0 : index * 0.06 }}
                  className="absolute inset-0"
                >
                  {media.kind === "video" ? (
                    <Image src="/videos/optimized/gallery-celebration-720.jpg" alt={labelFor(media)} fill sizes="(max-width: 767px) 50vw, 25vw" className="object-cover" />
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
                </motion.div>
              </Link>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background via-background/80 to-transparent" aria-hidden="true" />
          <div className="absolute inset-x-0 bottom-5 z-10 flex justify-center px-4">
            <Link
              href="/gallery"
              className="pointer-events-auto inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 bg-[#1E1A17]/85 px-5 text-xs font-extrabold uppercase tracking-[0.14em] text-white shadow-2xl backdrop-blur-md outline-none transition-colors hover:border-mustard hover:bg-[#1E1A17] focus-visible:ring-2 focus-visible:ring-mustard focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <span>{t("Explore the collection", "Explorar la colección")}</span>
              <ChevronRight className="size-4 text-mustard" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
