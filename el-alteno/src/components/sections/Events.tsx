"use client";

import { useState } from "react";
import { Users, Calendar, Phone } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

export default function Events() {
  const { t } = useLanguage();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    guests: "",
    eventType: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="events" className="section-padding bg-background text-foreground relative overflow-hidden transition-colors duration-300">
      {/* Decorative gradient overlay */}
      <div className="absolute top-1/3 -left-1/4 w-80 h-80 bg-terracota/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start px-4 md:px-6 relative z-10">
        {/* Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-mustard text-xs md:text-sm font-bold tracking-widest uppercase mb-3">
            {t("Private Events", "Eventos Privados")}
          </p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 leading-tight">
            {t("Host your celebration at El Alteño", "Celebra tu evento especial en El Alteño")}
          </h2>
          <p className="text-muted-foreground text-sm md:text-lg leading-relaxed mb-8">
            {t(
              "From quinceañeras to corporate dinners, we have hosted hundreds of celebrations in our private dining room. Our team handles the food so you can focus on the people.",
              "Desde quinceañeras hasta cenas corporativas, hemos albergado cientos de celebraciones en nuestro salón privado. Nuestro equipo se encarga de la comida para que te enfoques en disfrutar."
            )}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-card border border-[#E5D9C5]/10 rounded-2xl p-5 text-center shadow-lg">
              <Users size={24} className="text-mustard mx-auto mb-2" />
              <p className="text-2xl font-heading font-bold text-foreground">100</p>
              <p className="text-xs text-muted-foreground">{t("max guests", "máx. invitados")}</p>
            </div>
            <div className="bg-card border border-[#E5D9C5]/10 rounded-2xl p-5 text-center shadow-lg">
              <Calendar size={24} className="text-mustard mx-auto mb-2" />
              <p className="text-2xl font-heading font-bold text-foreground">2</p>
              <p className="text-xs text-muted-foreground">{t("spaces available", "salones disponibles")}</p>
            </div>
            <div className="bg-card border border-[#E5D9C5]/10 rounded-2xl p-5 text-center shadow-lg">
              <span className="block text-2xl mb-2">🎉</span>
              <p className="text-2xl font-heading font-bold text-foreground">Fri–Sun</p>
              <p className="text-xs text-muted-foreground">{t("popular days", "días populares")}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {[
              t("Birthdays", "Cumpleaños"),
              t("Quinceañeras", "Quinceañeras"),
              t("Weddings", "Bodas"),
              t("Corporate Events", "Eventos Corporativos"),
              t("Baby Showers", "Baby Showers"),
              t("Family Gatherings", "Reuniones Familiares"),
            ].map((tag) => (
              <span
                key={tag}
                className="bg-card border border-[#E5D9C5]/10 text-muted-foreground text-xs px-3.5 py-1.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3 text-muted-foreground">
            <Phone size={16} className="text-mustard" />
            <span>{t("Prefer to call?", "¿Prefieres llamar?")}</span>
            <a href="tel:8317689876" className="text-foreground font-bold hover:text-mustard transition-colors">
              (831) 768-9876
            </a>
          </div>
        </motion.div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-card backdrop-blur-md border border-[#E5D9C5]/15 text-foreground rounded-3xl p-6 md:p-8 shadow-2xl w-full"
        >
          <h3 className="text-2xl font-heading font-bold mb-6">
            {t("Request a Reservation", "Solicitar Reservación")}
          </h3>

          {status === "sent" ? (
            <div className="text-center py-8">
              <span className="text-4xl">🎉</span>
              <p className="text-xl font-heading font-bold mt-4 mb-2">
                {t("Request Received!", "¡Solicitud Recibida!")}
              </p>
              <p className="text-muted-foreground text-sm">
                {t(
                  "We will contact you within 24 hours to confirm your event details and options.",
                  "Nos pondremos en contacto contigo en menos de 24 horas para confirmar los detalles y opciones."
                )}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase mb-1" htmlFor="name">
                    {t("Name", "Nombre")}
                  </label>
                  <input
                    id="name"
                    required
                    type="text"
                    placeholder={t("Your name", "Tu nombre")}
                    className="w-full bg-background border border-[#E5D9C5]/15 rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-terracota"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase mb-1" htmlFor="phone">
                    {t("Phone", "Teléfono")}
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="(831) 000-0000"
                    className="w-full bg-background border border-[#E5D9C5]/15 rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-terracota"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-muted-foreground uppercase mb-1" htmlFor="email">
                  {t("Email", "Correo Electrónico")}
                </label>
                <input
                  id="email"
                  required
                  type="email"
                  placeholder="you@example.com"
                  className="w-full bg-background border border-[#E5D9C5]/15 rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-terracota"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase mb-1" htmlFor="date">
                    {t("Event Date", "Fecha del Evento")}
                  </label>
                  <input
                    id="date"
                    required
                    type="date"
                    className="w-full bg-background border border-[#E5D9C5]/15 rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-terracota scheme-light dark:scheme-dark"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase mb-1" htmlFor="guests">
                    {t("Guests", "Invitados")}
                  </label>
                  <input
                    id="guests"
                    required
                    type="number"
                    min="1"
                    max="100"
                    placeholder="50"
                    className="w-full bg-background border border-[#E5D9C5]/15 rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-terracota"
                    value={form.guests}
                    onChange={(e) => setForm({ ...form, guests: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-muted-foreground uppercase mb-1" htmlFor="eventType">
                  {t("Event Type", "Tipo de Evento")}
                </label>
                <select
                  id="eventType"
                  required
                  className="w-full bg-background border border-[#E5D9C5]/15 rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-terracota"
                  value={form.eventType}
                  onChange={(e) => setForm({ ...form, eventType: e.target.value })}
                >
                  <option value="" className="bg-background">{t("Select type…", "Seleccionar tipo…")}</option>
                  <option value="Birthday" className="bg-background">{t("Birthday", "Cumpleaños")}</option>
                  <option value="Quinceañera" className="bg-background">{t("Quinceañera", "Quinceañera")}</option>
                  <option value="Wedding" className="bg-background">{t("Wedding", "Boda")}</option>
                  <option value="Corporate" className="bg-background">{t("Corporate", "Corporativo")}</option>
                  <option value="Baby Shower" className="bg-background">{t("Baby Shower", "Baby Shower")}</option>
                  <option value="Other" className="bg-background">{t("Other", "Otro")}</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-muted-foreground uppercase mb-1" htmlFor="message">
                  {t("Additional Details", "Detalles Adicionales")}
                </label>
                <textarea
                  id="message"
                  rows={3}
                  placeholder={t("Tell us more about your event…", "Cuéntanos más sobre tu evento…")}
                  className="w-full bg-background border border-[#E5D9C5]/15 rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-terracota resize-none"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>
              {status === "error" && (
                <p className="text-destructive text-xs">
                  {t(
                    "Something went wrong. Please call us at (831) 768-9876.",
                    "Ocurrió un error. Por favor llámanos al (831) 768-9876."
                  )}
                </p>
              )}
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full bg-terracota text-white font-bold py-3 rounded-xl hover:bg-terracota-dark transition-colors disabled:opacity-60 cursor-pointer shadow-lg uppercase tracking-wider text-xs"
              >
                {status === "sending" ? t("Sending…", "Enviando…") : t("Send Request", "Enviar Solicitud")}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
