"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Menu", href: "#menu" },
  { label: "Events", href: "#events" },
  { label: "Cocktails", href: "#cocktails" },
  { label: "Location", href: "#location" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E5D9C5]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <Image
            src="/images/logo/logo.png"
            alt="El Alteño — Auténtica Comida Mexicana"
            width={120}
            height={80}
            priority
            className="h-12 w-auto object-contain"
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-[#2E2620] hover:text-[#C65D3B] transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#events"
            className="bg-[#C65D3B] text-white text-sm font-bold px-4 py-2 rounded-md hover:bg-[#A84A2C] transition-colors"
          >
            Book an Event
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-[#2E2620]"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-[#E5D9C5] px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-base font-medium text-[#2E2620] hover:text-[#C65D3B]"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#events"
            className="bg-[#C65D3B] text-white font-bold px-4 py-2 rounded-md text-center"
            onClick={() => setOpen(false)}
          >
            Book an Event
          </a>
        </div>
      )}
    </header>
  );
}
