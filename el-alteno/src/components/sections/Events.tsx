"use client";

import { useState } from "react";
import { Users, Calendar, Phone } from "lucide-react";

export default function Events() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", date: "",
    guests: "", eventType: "", message: "",
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
    <section id="events" className="section-padding bg-[#2E2620] text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Info */}
        <div>
          <p className="text-[#C99A3F] text-sm font-bold tracking-widest uppercase mb-3">
            Private Events
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Host your celebration<br />at El Alteño
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            From quinceañeras to corporate dinners, we have hosted hundreds of celebrations
            in our private dining room. Our team handles the food so you can focus on the people.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white/10 rounded-xl p-5 text-center">
              <Users size={24} className="text-[#C99A3F] mx-auto mb-2" />
              <p className="text-2xl font-bold" style={{ fontFamily: "var(--font-playfair)" }}>100</p>
              <p className="text-xs text-gray-400">max guests</p>
            </div>
            <div className="bg-white/10 rounded-xl p-5 text-center">
              <Calendar size={24} className="text-[#C99A3F] mx-auto mb-2" />
              <p className="text-2xl font-bold" style={{ fontFamily: "var(--font-playfair)" }}>2</p>
              <p className="text-xs text-gray-400">simultaneous events</p>
            </div>
            <div className="bg-white/10 rounded-xl p-5 text-center">
              <span className="block text-2xl mb-2">🎉</span>
              <p className="text-2xl font-bold" style={{ fontFamily: "var(--font-playfair)" }}>Fri–Sun</p>
              <p className="text-xs text-gray-400">Apr – Dec</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {["Birthdays", "Quinceañeras", "Weddings", "Corporate", "Baby Showers", "Celebrations"].map((t) => (
              <span key={t} className="bg-white/10 text-gray-300 text-sm px-3 py-1 rounded-full">
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3 text-gray-300">
            <Phone size={16} className="text-[#C99A3F]" />
            <span>Prefer to call?&nbsp;</span>
            <a href="tel:8317689876" className="text-white font-bold hover:text-[#C99A3F] transition-colors">
              (831) 768-9876
            </a>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white text-[#2E2620] rounded-2xl p-8">
          <h3
            className="text-2xl font-bold mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Request a Reservation
          </h3>

          {status === "sent" ? (
            <div className="text-center py-8">
              <span className="text-4xl">🎉</span>
              <p className="text-xl font-bold mt-4 mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
                Request Received!
              </p>
              <p className="text-[#8A7E6F]">We will contact you within 24 hours to confirm your event.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#8A7E6F] uppercase mb-1" htmlFor="name">Name</label>
                  <input id="name" required type="text" placeholder="Your name"
                    className="w-full border border-[#E5D9C5] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C65D3B]"
                    value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#8A7E6F] uppercase mb-1" htmlFor="phone">Phone</label>
                  <input id="phone" type="tel" placeholder="(831) 000-0000"
                    className="w-full border border-[#E5D9C5] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C65D3B]"
                    value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#8A7E6F] uppercase mb-1" htmlFor="email">Email</label>
                <input id="email" required type="email" placeholder="you@example.com"
                  className="w-full border border-[#E5D9C5] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C65D3B]"
                  value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#8A7E6F] uppercase mb-1" htmlFor="date">Event Date</label>
                  <input id="date" required type="date"
                    className="w-full border border-[#E5D9C5] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C65D3B]"
                    value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#8A7E6F] uppercase mb-1" htmlFor="guests">Guests</label>
                  <input id="guests" required type="number" min="1" max="100" placeholder="50"
                    className="w-full border border-[#E5D9C5] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C65D3B]"
                    value={form.guests} onChange={e => setForm({...form, guests: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#8A7E6F] uppercase mb-1" htmlFor="eventType">Event Type</label>
                <select id="eventType" required
                  className="w-full border border-[#E5D9C5] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C65D3B] bg-white"
                  value={form.eventType} onChange={e => setForm({...form, eventType: e.target.value})}>
                  <option value="">Select type…</option>
                  <option>Birthday</option>
                  <option>Quinceañera</option>
                  <option>Wedding</option>
                  <option>Corporate</option>
                  <option>Baby Shower</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#8A7E6F] uppercase mb-1" htmlFor="message">Additional Details</label>
                <textarea id="message" rows={3} placeholder="Tell us more about your event…"
                  className="w-full border border-[#E5D9C5] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C65D3B] resize-none"
                  value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
              </div>
              {status === "error" && (
                <p className="text-red-600 text-xs">Something went wrong. Please call us at (831) 768-9876.</p>
              )}
              <button type="submit" disabled={status === "sending"}
                className="w-full bg-[#C65D3B] text-white font-bold py-3 rounded-md hover:bg-[#A84A2C] transition-colors disabled:opacity-60">
                {status === "sending" ? "Sending…" : "Send Request"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
