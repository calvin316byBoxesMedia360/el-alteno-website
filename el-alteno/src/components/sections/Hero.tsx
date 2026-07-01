"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center text-white overflow-hidden bg-black"
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-70 pointer-events-none"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
        <source src="https://assets.mixkit.co/videos/preview/mixkit-chef-preparing-mexican-food-40134-large.mp4" type="video/mp4" />
      </video>

      {/* Decorative gradient & blur overlay */}
      <div
        className="absolute inset-0 z-0 bg-gradient-to-b from-black/50 via-[#1E1A17]/35 to-[#161311] backdrop-blur-[1px]"
      />
      <div
        className="absolute inset-0 z-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, white 2px, transparent 0), radial-gradient(circle at 75px 75px, white 2px, transparent 0)`,
          backgroundSize: "100px 100px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 md:px-6 max-w-4xl mx-auto pt-24 md:pt-16">
        {/* Welcome Flag */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-6 text-xs md:text-sm font-bold tracking-widest uppercase text-mustard"
        >
          <span>🇲🇽 Bienvenidos</span>
          <span className="w-px h-4 bg-white/35" />
          <span>🇺🇸 Welcome</span>
        </motion.div>

        {/* Logo with Colonial Arch ornament frame */}
        <h1 className="sr-only">El Alteño — Auténtica Comida Mexicana</h1>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex justify-center mb-8"
        >
          <div className="relative p-6 md:p-8 pb-5 rounded-t-full border-t border-x border-[#C99A3F]/35 bg-[#1E1A17]/70 backdrop-blur-md shadow-2xl flex flex-col items-center max-w-[280px] sm:max-w-xs md:max-w-sm overflow-hidden">
            <div className="absolute inset-0 bg-[#FAF6EF]/5 opacity-5" />
            <Image
              src="/images/logo/logo.png"
              alt="El Alteño Logo"
              width={380}
              height={240}
              priority
              className="w-40 sm:w-48 md:w-56 h-auto object-contain drop-shadow-[0_4px_16px_rgba(198,93,59,0.35)] relative z-10"
            />
            <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-[#C99A3F] font-bold mt-3 relative z-10">
              {t("Authentic Mexican Cuisine", "Auténtica Comida Mexicana")}
            </p>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-xs sm:text-sm md:text-base text-white/95 mb-10 tracking-widest uppercase font-semibold"
        >
          323 Main St · Watsonville, California
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#menu"
            className="w-full sm:w-auto bg-[#C65D3B] text-white font-bold px-8 py-3.5 rounded-full text-sm uppercase tracking-wider hover:bg-[#A84A2C] transition-colors shadow-lg border border-[#C99A3F]/35 cursor-pointer text-center"
          >
            {t("Explore Menu", "Explorar Menú")}
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#events"
            className="w-full sm:w-auto border border-white/60 text-white font-bold px-8 py-3.5 rounded-full text-sm uppercase tracking-wider hover:bg-white/10 transition-all cursor-pointer text-center"
          >
            {t("Book an Event", "Reservar Evento")}
          </motion.a>
        </motion.div>

        {/* Delivery badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground"
        >
          <span>{t("Available on", "Disponible en")}</span>
          <span className="bg-white/5 border border-white/15 px-3.5 py-1.5 rounded-full font-bold text-white tracking-wider uppercase text-[10px]">
            DoorDash
          </span>
          <span className="bg-white/5 border border-white/15 px-3.5 py-1.5 rounded-full font-bold text-white tracking-wider uppercase text-[10px]">
            Uber Eats
          </span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden sm:block"
      >
        <div className="w-5 h-8 border-2 border-white/60 rounded-full flex justify-center pt-1">
          <div className="w-1 h-2 bg-white/80 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
