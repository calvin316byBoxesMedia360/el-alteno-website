"use client";

import Image from "next/image";
import { MapPin, Phone, Clock, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function Location() {
  const { t } = useLanguage();

  return (
    <section id="location" className="section-padding bg-background relative overflow-hidden">
      {/* Subtle overlay background for the section */}
      <div className="absolute inset-0 z-0 opacity-10 mix-blend-overlay">
        <Image
          src="/images/location/plaza_watsonville.png"
          alt="Watsonville Plaza Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background z-0" />

      <div className="max-w-7xl mx-auto relative z-10 px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-mustard text-xs md:text-sm font-bold tracking-widest uppercase mb-3"
          >
            {t("Find Us", "Ubicación")}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-heading font-bold text-foreground"
          >
            {t("Visit El Alteño in Watsonville", "Visita El Alteño en Watsonville")}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Map Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 rounded-3xl overflow-hidden border border-[#E5D9C5]/10 shadow-2xl relative min-h-[350px] lg:min-h-full"
          >
            <iframe
              title="El Alteño location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3197.669814674744!2d-121.7594801!3d36.9099496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808e15033c4ebcf5%3A0x33e8b0b875ea467b!2s323+Main+St%2C+Watsonville%2C+CA+95076!5e0!3m2!1sen!2sus!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(1) invert(0.9) contrast(1.2)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full"
            />
          </motion.div>

          {/* Info Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 bg-card backdrop-blur-md border border-[#E5D9C5]/10 rounded-3xl p-6 md:p-8 flex flex-col justify-between gap-6 shadow-2xl"
          >
            <div className="space-y-6">
              {/* Address */}
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-full bg-terracota/20 flex items-center justify-center shrink-0">
                  <MapPin size={20} className="text-terracota" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-foreground text-lg mb-1">
                    {t("Address", "Dirección")}
                  </h4>
                  <p className="text-muted-foreground text-sm">323 Main St</p>
                  <p className="text-muted-foreground text-sm">Watsonville, CA 95076</p>
                  <a
                    href="https://maps.app.goo.gl/JuMsrYVQm52sZR3X7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-mustard text-xs font-semibold mt-2 inline-flex items-center gap-1 hover:underline"
                  >
                    {t("Get Directions", "Cómo llegar")} →
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-full bg-terracota/20 flex items-center justify-center shrink-0">
                  <Phone size={20} className="text-terracota" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-foreground text-lg mb-1">
                    {t("Phone", "Teléfono")}
                  </h4>
                  <a
                    href="tel:8317689876"
                    className="text-muted-foreground text-sm hover:text-mustard transition-colors font-medium"
                  >
                    (831) 768-9876
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-full bg-terracota/20 flex items-center justify-center shrink-0">
                  <Clock size={20} className="text-terracota" />
                </div>
                <div className="w-full">
                  <h4 className="font-heading font-bold text-foreground text-lg mb-2">
                    {t("Hours of Operation", "Horario de Servicio")}
                  </h4>
                  <div className="text-xs md:text-sm text-muted-foreground space-y-2">
                    <div className="flex justify-between border-b border-white/5 pb-1">
                      <span>{t("Tuesday – Saturday", "Martes – Sábado")}</span>
                      <span className="text-foreground font-semibold">11:00 AM – 8:00 PM</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-1">
                      <span>{t("Sunday", "Domingo")}</span>
                      <span className="text-foreground font-semibold">9:00 AM – 8:00 PM</span>
                    </div>
                    <div className="pl-4 text-xs flex justify-between text-muted-foreground/75">
                      <span>↳ {t("Sunday Breakfast", "Desayuno Dominical")}</span>
                      <span>9:00 AM – 11:45 AM</span>
                    </div>
                    <div className="pl-4 text-xs flex justify-between text-muted-foreground/75">
                      <span>↳ {t("Lunch Special (Tue–Sat)", "Especial Almuerzo (Mar–Sáb)")}</span>
                      <span>11:00 AM – 2:00 PM</span>
                    </div>
                    <div className="flex justify-between text-terracota font-bold pt-1">
                      <span>{t("Monday", "Lunes")}</span>
                      <span className="uppercase">{t("Closed", "Cerrado")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment & Partners */}
            <div className="bg-background/60 border border-white/5 rounded-2xl p-4 mt-4">
              <p className="font-bold text-foreground text-xs uppercase tracking-wider mb-3">
                {t("We Accept & Delivery Partners", "Aceptamos y Entregas a Domicilio")}
              </p>
              <div className="flex flex-wrap gap-2">
                {["Visa", "Mastercard", "Zelle", "Apple Pay", "DoorDash", "Uber Eats"].map((p) => (
                  <span
                    key={p}
                    className="bg-card border border-[#E5D9C5]/10 px-2.5 py-1 rounded-lg text-[10px] font-bold text-muted-foreground tracking-wider uppercase"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
