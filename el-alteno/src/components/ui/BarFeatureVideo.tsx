"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function BarFeatureVideo() {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      className="relative mx-4 mb-12 overflow-hidden rounded-3xl border border-mustard/25 bg-card shadow-2xl lg:mx-0 md:mb-16"
    >
      <div className="relative aspect-[4/5] w-full sm:aspect-video">
        {shouldReduceMotion ? (
          <Image
            src="/images/cocktails/bar-service-poster.webp"
            alt={t(
              "Bartender serving a chilled beer bucket at the bar",
              "Bartender sirviendo una cubeta de cerveza fría en la barra"
            )}
            fill
            className="object-cover object-center"
            sizes="(max-width: 640px) 100vw, 1280px"
          />
        ) : (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/cocktails/bar-service-poster.webp"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover object-center"
          >
            <source src="/videos/bar-service.mp4" type="video/mp4" />
          </video>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-10">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.28em] text-mustard sm:text-xs">
            {t("From the Bar", "Desde la barra")}
          </p>
          <h3 className="max-w-xl font-heading text-2xl font-bold leading-tight sm:text-4xl">
            {t(
              "Finished and served with care.",
              "Preparado y servido con atención."
            )}
          </h3>
        </div>
      </div>
    </motion.div>
  );
}
