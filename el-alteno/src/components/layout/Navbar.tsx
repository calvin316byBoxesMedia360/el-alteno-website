"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X, Globe, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

const links = [
  { label: "Menu", labelEs: "Menú", href: "#menu" },
  { label: "Events", labelEs: "Eventos", href: "#events" },
  { label: "Cocktails", labelEs: "Cócteles", href: "#cocktails" },
  { label: "Location", labelEs: "Ubicación", href: "#location" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { locale, setLocale, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 pointer-events-none">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto bg-card/90 backdrop-blur-md border border-mustard/20 h-16 rounded-full px-6 flex items-center justify-between shadow-xl pointer-events-auto transition-colors duration-300"
      >
        {/* Logo */}
        <a href="#" className="flex items-center">
          <Image
            src="/images/logo/logo.png"
            alt="El Alteño Logo"
            width={100}
            height={60}
            priority
            className="h-10 w-auto object-contain brightness-100 dark:brightness-100 transition-all"
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs font-bold tracking-wider uppercase text-foreground/80 hover:text-mustard transition-colors"
            >
              {t(l.label, l.labelEs)}
            </a>
          ))}
          
          {/* Theme Toggle Desktop */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-mustard/25 text-mustard hover:bg-mustard/10 transition-all cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          {/* Language Toggle Desktop */}
          <button
            onClick={() => setLocale(locale === "en" ? "es" : "en")}
            className="text-[10px] tracking-wider font-extrabold px-3 py-1.5 rounded-full border border-mustard/25 text-mustard hover:bg-mustard/10 transition-all flex items-center gap-1.5 cursor-pointer uppercase"
          >
            <Globe size={12} />
            <span>{locale === "en" ? "Español" : "English"}</span>
          </button>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#events"
            className="bg-terracota text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full hover:bg-terracota-dark transition-colors border border-mustard/20 shadow-lg"
          >
            {t("Book an Event", "Reservar Evento")}
          </motion.a>
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Theme Toggle Mobile */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-mustard/25 text-mustard hover:bg-mustard/10 transition-all cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun size={12} /> : <Moon size={12} />}
          </button>

          {/* Language Toggle Mobile */}
          <button
            onClick={() => setLocale(locale === "en" ? "es" : "en")}
            className="text-[10px] tracking-wider font-extrabold px-2.5 py-1.5 rounded-full border border-mustard/25 text-mustard hover:bg-mustard/10 transition-all flex items-center gap-1 cursor-pointer uppercase"
          >
            <Globe size={11} />
            <span>{locale === "en" ? "ES" : "EN"}</span>
          </button>

          {/* Mobile hamburger */}
          <button
            className="p-2 text-foreground"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.div>

      {/* Mobile menu container */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-card/95 backdrop-blur-lg border border-mustard/20 mt-2 px-6 py-5 rounded-2xl flex flex-col gap-4 shadow-2xl pointer-events-auto max-w-5xl mx-auto"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-semibold uppercase tracking-wider text-foreground hover:text-mustard border-b border-foreground/5 pb-2"
                onClick={() => setOpen(false)}
              >
                {t(l.label, l.labelEs)}
              </a>
            ))}
            <a
              href="#events"
              className="bg-terracota text-white text-xs font-bold uppercase tracking-wider py-3 rounded-full text-center hover:bg-terracota-dark transition-colors"
              onClick={() => setOpen(false)}
            >
              {t("Book an Event", "Reservar Evento")}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
