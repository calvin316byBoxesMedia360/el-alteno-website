"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function EventFeatureVideo() {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPausedRef = useRef(false);
  const manualPlayRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    const video = videoRef.current;

    if (!card || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting && entry.intersectionRatio >= 0.35;
        const canPlay = !shouldReduceMotion || manualPlayRef.current;

        if (isVisible && canPlay && !userPausedRef.current) {
          void video.play().catch(() => setIsPlaying(false));
          return;
        }

        video.pause();
      },
      { threshold: [0, 0.35, 0.65] }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, [shouldReduceMotion]);

  async function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      manualPlayRef.current = true;
      userPausedRef.current = false;

      try {
        await video.play();
      } catch {
        setIsPlaying(false);
      }
      return;
    }

    userPausedRef.current = true;
    video.pause();
  }

  const playbackLabel = isPlaying
    ? t("Pause private events video", "Pausar video de eventos privados")
    : t("Play private events video", "Reproducir video de eventos privados");

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      className="relative mb-6 overflow-hidden rounded-2xl border border-mustard/30 bg-[#120F0D] shadow-[0_18px_45px_rgba(0,0,0,.24)]"
    >
      <div className="relative aspect-video w-full bg-[#120F0D]">
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/local_para_eventos/private-events-master-poster.jpg"
          aria-label={t(
            "Complete walkthrough of El Alteño's private event spaces",
            "Recorrido completo por los espacios para eventos privados de El Alteño"
          )}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className="absolute inset-0 h-full w-full object-contain object-center"
        >
          <source src="/videos/private-events-walkthrough-master-v1.mp4" type="video/mp4" />
        </video>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-black/10" />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
          <div className="min-w-0 text-white">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-mustard sm:text-xs">
              {t("Explore Our Spaces", "Conoce Nuestros Espacios")}
            </p>
          </div>

          <button
            type="button"
            onClick={togglePlayback}
            aria-label={playbackLabel}
            className="pointer-events-auto grid size-9 shrink-0 place-items-center rounded-full border border-mustard/45 bg-black/45 text-mustard shadow-lg backdrop-blur-md transition-all duration-200 hover:scale-105 hover:border-mustard/75 hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mustard focus-visible:ring-offset-2 focus-visible:ring-offset-[#120F0D]"
          >
            {isPlaying ? <Pause size={15} aria-hidden="true" /> : <Play size={15} aria-hidden="true" />}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
