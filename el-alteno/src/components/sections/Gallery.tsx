"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Images, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type GalleryPhoto = {
  id: string;
  src: string;
  alt: string;
};

// User-provided event photos will be inspected and added here after they are
// copied into public/images/events-gallery. Do not infer an image's subject
// from its filename alone.
const galleryPhotos: GalleryPhoto[] = [];

export default function Gallery() {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!selectedPhoto) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedPhoto(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedPhoto]);

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
                onClick={() => setSelectedPhoto(photo)}
                aria-label={t("Open event photo", "Abrir foto del evento")}
                className="group relative aspect-[4/3] min-h-11 overflow-hidden rounded-2xl border border-border bg-card shadow-lg outline-none transition-shadow hover:shadow-2xl focus-visible:ring-2 focus-visible:ring-mustard focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
                  sizes="(max-width: 767px) 50vw, (max-width: 1279px) 33vw, 420px"
                />
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-70" />
              </motion.button>
            ))}
          </div>
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
        {selectedPhoto && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t("Event photo preview", "Vista previa de foto del evento")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
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
                onClick={() => setSelectedPhoto(null)}
                aria-label={t("Close photo preview", "Cerrar vista previa")}
                className="absolute right-5 top-5 z-10 grid min-h-11 min-w-11 place-items-center rounded-full border border-white/20 bg-black/65 text-white shadow-lg backdrop-blur-md transition-colors hover:bg-black/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mustard"
              >
                <X size={19} aria-hidden="true" />
              </button>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-black/30">
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 1024px"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
