"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function EventFeatureVideo() {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      className="relative mb-8 overflow-hidden rounded-3xl border border-mustard/25 bg-card shadow-2xl"
    >
      <div className="relative aspect-video w-full">
        {shouldReduceMotion ? (
          <Image
            src="/images/local_para_eventos/patio-event-base-v1.png"
            alt={t(
              "Graduation-themed private event patio at El Alteño",
              "Patio de eventos privados de El Alteño decorado para una graduación"
            )}
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        ) : (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/local_para_eventos/patio-event-base-v1.png"
            aria-label={t(
              "A walkthrough of El Alteño's private event patio",
              "Recorrido por el patio para eventos privados de El Alteño"
            )}
            className="absolute inset-0 h-full w-full object-cover object-center"
          >
            <source src="/videos/private-events-patio-walkthrough-v3.mp4" type="video/mp4" />
          </video>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-7">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.28em] text-mustard sm:text-xs">
            {t("Our Patio", "Nuestro patio")}
          </p>
          <h3 className="max-w-xl font-heading text-2xl font-bold leading-tight sm:text-3xl">
            {t(
              "A setting made for meaningful celebrations.",
              "Un espacio creado para celebrar momentos especiales."
            )}
          </h3>
        </div>
      </div>
    </motion.div>
  );
}
