"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Images, Play, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type GalleryPhoto = {
  id: string;
  kind: "image";
  src: string;
  altEn: string;
  altEs: string;
};

type GalleryVideo = {
  id: string;
  kind: "video";
  src: string;
  labelEn: string;
  labelEs: string;
  featured?: boolean;
};

type GalleryMedia = GalleryPhoto | GalleryVideo;

// Originals stay in this folder as the source archive. The gallery uses the
// EXIF-corrected WebP derivatives so the page remains lighter on mobile.
const galleryPhotos: GalleryPhoto[] = [
  {
    id: "2025-birthday-backdrop",
    kind: "image",
    src: "/images/events-gallery/IMG_20250627_133454.webp",
    altEn: "Colorful birthday backdrop framed by pink and orange balloons.",
    altEs: "Telón colorido de cumpleaños enmarcado por globos rosas y naranjas.",
  },
  {
    id: "2025-festive-table",
    kind: "image",
    src: "/images/events-gallery/IMG_20250627_133528.webp",
    altEn: "Colorful event table styling with vibrant linens and festive details.",
    altEs: "Mesa de evento colorida con mantelería vibrante y detalles festivos.",
  },
  {
    id: "2023-formal-tables",
    kind: "image",
    src: "/images/events-gallery/IMG_20231021_140858.webp",
    altEn: "Long formal dining tables arranged beneath the restaurant patio.",
    altEs: "Mesas largas y formales acomodadas bajo el patio del restaurante.",
  },
  {
    id: "2023-candy-table",
    kind: "image",
    src: "/images/events-gallery/IMG_20230610_135645.webp",
    altEn: "A candy and dessert table set beside the restaurant fireplace.",
    altEs: "Mesa de dulces y postres junto a la chimenea del restaurante.",
  },
  {
    id: "2023-decorated-backdrop",
    kind: "image",
    src: "/images/events-gallery/IMG_20231021_141002.webp",
    altEn: "A decorated event backdrop ready for guests.",
    altEs: "Un telón decorado de evento listo para recibir a los invitados.",
  },
  {
    id: "2025-colorful-patio",
    kind: "image",
    src: "/images/events-gallery/IMG_20250627_133825.webp",
    altEn: "Colorful decorated tables arranged across the covered patio.",
    altEs: "Mesas decoradas con color a lo largo del patio techado.",
  },
  {
    id: "2023-round-table-room",
    kind: "image",
    src: "/images/events-gallery/IMG_20231021_140913.webp",
    altEn: "A bright event room prepared with round tables and floral centerpieces.",
    altEs: "Salón iluminado preparado con mesas redondas y centros florales.",
  },
  {
    id: "2023-dessert-table",
    kind: "image",
    src: "/images/events-gallery/IMG_20230610_135659.webp",
    altEn: "A close view of a decorated dessert table with festive sweets.",
    altEs: "Detalle de una mesa de postres decorada con dulces festivos.",
  },
  {
    id: "2025-pink-table",
    kind: "image",
    src: "/images/events-gallery/IMG_20250627_133627.webp",
    altEn: "A vibrant pink event table setting with place settings and floral decor.",
    altEs: "Mesa de evento en rosa vibrante con vajilla y decoración floral.",
  },
  {
    id: "2023-formal-dessert-table",
    kind: "image",
    src: "/images/events-gallery/IMG_20231021_140937.webp",
    altEn: "A formal dining table with dessert details and floral accents.",
    altEs: "Mesa formal con detalles de postres y acentos florales.",
  },
  {
    id: "2023-appetizer-table",
    kind: "image",
    src: "/images/events-gallery/IMG_20230610_135657.webp",
    altEn: "A welcoming event table with appetizers and fresh fruit.",
    altEs: "Mesa de evento acogedora con aperitivos y fruta fresca.",
  },
  {
    id: "2023-pink-runner-tables",
    kind: "image",
    src: "/images/events-gallery/IMG_20231021_141019.webp",
    altEn: "Long dining tables styled with soft pink runners and floral details.",
    altEs: "Mesas largas decoradas con caminos rosa suave y detalles florales.",
  },
  {
    id: "2023-candy-detail",
    kind: "image",
    src: "/images/events-gallery/IMG_20230610_135652.webp",
    altEn: "A close detail of the candy station prepared for guests.",
    altEs: "Detalle de la estación de dulces preparada para los invitados.",
  },
  {
    id: "2023-outdoor-dining",
    kind: "image",
    src: "/images/events-gallery/IMG_20230610_135704.webp",
    altEn: "An outdoor dining area arranged for a private celebration.",
    altEs: "Área de comedor exterior preparada para una celebración privada.",
  },
];

const galleryVideos: GalleryVideo[] = [
  {
    id: "celebration-in-motion",
    kind: "video",
    src: "/images/events-gallery/VID_20231203_134004.mp4",
    labelEn: "A celebration in motion",
    labelEs: "Una celebración en movimiento",
    featured: true,
  },
  {
    id: "room-ready-for-events",
    kind: "video",
    src: "/images/events-gallery/VID_20231021_140635.mp4",
    labelEn: "The room, ready for your event",
    labelEs: "El salón, listo para tu evento",
  },
];

const photoLayout = [
  "col-span-2 aspect-[16/9] md:col-span-2 md:aspect-[16/9]",
  "aspect-[4/3]",
  "aspect-[4/3]",
  "col-span-2 aspect-[16/9] md:col-span-2 md:aspect-[16/9]",
  "aspect-[4/3]",
  "aspect-[4/3]",
  "aspect-[4/3]",
  "aspect-[4/3]",
  "aspect-[4/3]",
  "col-span-2 aspect-[16/9] md:col-span-2 md:aspect-[16/9]",
  "aspect-[4/3]",
  "aspect-[4/3]",
  "aspect-[4/3]",
  "aspect-[4/3]",
];

export default function Gallery() {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const featuredVideo = galleryVideos.find((video) => video.featured);
  const secondaryVideo = galleryVideos.find((video) => !video.featured);
  const [selectedMedia, setSelectedMedia] = useState<GalleryMedia | null>(null);
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

  const openFeaturedVideo = () => {
    if (featuredVideo) setSelectedMedia(featuredVideo);
  };

  const handleFeaturedVideoKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openFeaturedVideo();
    }
  };

  return (
    <section
      id="gallery"
      className="section-padding scroll-mt-24 relative overflow-hidden bg-background text-foreground transition-colors duration-300"
    >
      <div className="absolute -right-32 top-16 size-80 rounded-full bg-terracota/10 blur-3xl" aria-hidden="true" />
      <div className="absolute -left-40 bottom-12 size-96 rounded-full bg-mustard/10 blur-3xl" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-3xl px-4 text-center md:mb-16">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-accent md:text-sm">
            {t("Celebrations at El Alteño", "Celebraciones en El Alteño")}
          </p>
          <h2 className="mb-5 font-heading text-3xl font-bold leading-tight text-foreground md:text-5xl">
            {t("Moments worth celebrating", "Momentos que vale la pena celebrar")}
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground md:text-lg">
            {t(
              "Every celebration has a story. From joyful tables to unforgettable milestones, discover the moments our guests have shared with us at El Alteño.",
              "Cada celebración tiene una historia. Descubre los momentos que nuestros invitados han compartido con nosotros: mesas llenas de alegría y recuerdos inolvidables en El Alteño."
            )}
          </p>
        </div>

        {galleryPhotos.length > 0 ? (
          <>
            {featuredVideo && (
              <motion.div
                initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: reduceMotion ? 0 : 0.55 }}
                role="button"
                tabIndex={0}
                onClick={openFeaturedVideo}
                onKeyDown={handleFeaturedVideoKeyDown}
                aria-label={t(featuredVideo.labelEn, featuredVideo.labelEs)}
                className="group relative mx-4 mb-5 min-h-11 cursor-zoom-in overflow-hidden rounded-[2rem] border border-mustard/30 bg-[#1E1A17] shadow-2xl outline-none transition-shadow hover:shadow-[0_24px_80px_-24px_rgba(0,0,0,0.75)] focus-visible:ring-2 focus-visible:ring-mustard focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:mx-0"
              >
                <video
                  src={featuredVideo.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="aspect-[16/9] w-full object-cover transition-transform duration-1000 group-hover:scale-[1.015] motion-reduce:transition-none"
                  aria-hidden="true"
                />
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <span className="pointer-events-none absolute bottom-5 right-5 grid size-12 place-items-center rounded-full border border-white/25 bg-black/45 text-white shadow-xl backdrop-blur-md transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none">
                  <Play size={18} fill="currentColor" aria-hidden="true" />
                  <span className="sr-only">{t("Open featured event video", "Abrir video destacado del evento")}</span>
                </span>
              </motion.div>
            )}

            <div className="grid grid-cols-2 gap-3 px-4 md:grid-cols-3 md:gap-5 lg:px-0">
              {galleryPhotos.map((photo, index) => (
                <motion.button
                  key={photo.id}
                  type="button"
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: reduceMotion ? 0 : 0.45, delay: reduceMotion ? 0 : index * 0.05 }}
                  whileHover={reduceMotion ? undefined : { y: -4 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.985 }}
                  onClick={() => setSelectedMedia(photo)}
                  aria-label={t("Open event photo", "Abrir foto del evento")}
                  className={`group relative min-h-11 overflow-hidden rounded-2xl border border-border bg-card shadow-lg outline-none transition-shadow hover:shadow-2xl focus-visible:ring-2 focus-visible:ring-mustard focus-visible:ring-offset-2 focus-visible:ring-offset-background ${photoLayout[index]}`}
                >
                  <Image
                    src={photo.src}
                    alt={t(photo.altEn, photo.altEs)}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
                    sizes="(max-width: 767px) 50vw, (max-width: 1279px) 33vw, 420px"
                  />
                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-70" />
                </motion.button>
              ))}
            </div>

            {secondaryVideo && (
              <motion.div
                initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: reduceMotion ? 0 : 0.5 }}
                className="mx-4 mt-5 overflow-hidden rounded-[2rem] border border-border bg-card p-2 shadow-xl lg:mx-0"
              >
                <video
                  src={secondaryVideo.src}
                  controls
                  playsInline
                  preload="metadata"
                  className="aspect-video w-full rounded-[1.5rem] bg-black object-cover"
                  aria-label={t(secondaryVideo.labelEn, secondaryVideo.labelEs)}
                />
              </motion.div>
            )}
          </>
        ) : (
          <div className="mx-4 rounded-3xl border border-dashed border-border bg-card/45 px-6 py-14 text-center shadow-lg lg:mx-0">
            <Images className="mx-auto mb-4 size-10 text-accent" aria-hidden="true" />
            <p className="font-heading text-xl font-bold text-foreground">
              {t("A collection of celebrations is coming soon.", "Una colección de celebraciones llegará pronto.")}
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              {t(
                "We are gathering the moments that make El Alteño feel like home.",
                "Estamos reuniendo los momentos que hacen que El Alteño se sienta como casa."
              )}
            </p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t(
              selectedMedia.kind === "video" ? "Event video preview" : "Event photo preview",
              selectedMedia.kind === "video" ? "Vista previa de video del evento" : "Vista previa de foto del evento"
            )}
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
                aria-label={t("Close media preview", "Cerrar vista previa")}
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
                    aria-label={t(selectedMedia.labelEn, selectedMedia.labelEs)}
                  />
                ) : (
                  <Image
                    src={selectedMedia.src}
                    alt={t(selectedMedia.altEn, selectedMedia.altEs)}
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
