"use client";

/**
 * TEMPORAL — comparador de soluciones para el modo claro.
 * Ruta: /preview/modo-claro · borrar al elegir una.
 *
 * Cada esquema se pinta con colores explícitos, no con los tokens del tema,
 * para que se pueda comparar sin depender de en qué tema esté el sitio.
 */

import { useState } from "react";
import Image from "next/image";
import { menuItems } from "@/data/menu";
import { MenuItem } from "@/types/menu";

const conFoto = menuItems.filter((i) => i.image && i.available).slice(0, 4);
const sinFoto = menuItems.filter((i) => !i.image && i.available).slice(0, 6);

type Scheme = {
  id: string;
  nombre: string;
  resumen: string;
  page: string;
  card: string;
  border: string;
  name: string;
  desc: string;
  price: string;
  rule: string;
  /** the printed-menu row already uses the theme token, so its name differs */
  rowName?: string;
  /** true = the card paints no surface of its own (paper look) */
  paper?: boolean;
};

const ACTUAL: Scheme = {
  id: "actual",
  nombre: "Actual",
  resumen:
    "La tarjeta conserva su fondo oscuro fijo al 60 % sobre el crema. La mezcla da un gris lodoso y el texto apagado queda encima: descripción 1.48:1, precio 2.29:1.",
  page: "#FAF6EF",
  card: "rgba(30,26,23,0.6)",
  border: "rgba(201,154,63,0.15)",
  name: "#FAF6EF",
  desc: "#8A7E6F",
  price: "#C99A3F",
  rule: "rgba(255,255,255,0.05)",
  rowName: "#2E2620",
};

// Carta clara, en tres niveles de brillo. La tinta no cambia entre niveles:
// lo único que baja es la luminancia del papel, y sube la calidez.
const carta = (
  id: string,
  nombre: string,
  page: string,
  card: string,
  border: string,
  rule: string,
  resumen: string
): Scheme => ({
  id,
  nombre,
  resumen,
  page,
  card,
  border,
  rule,
  name: "#2A231D",
  desc: "#6B6054",
  price: "#A8481F",
});

const A1 = carta(
  "A1",
  "1 · Suave",
  "#F2EADC",
  "#FCF8F1",
  "#E3D5BE",
  "#E9DDC8",
  "El cambio mínimo que arregla la legibilidad. Baja el brillo un 10 % respecto al crema de hoy. De noche todavía es una pantalla bastante clara."
);

const A2 = carta(
  "A2",
  "2 · Media",
  "#EDE2CE",
  "#F7F0E2",
  "#DDCDB2",
  "#E4D7BE",
  "Punto intermedio: 17 % menos brillo y bastante más calidez. Se nota el tono a papel sin que el sitio se vea apagado de día."
);

const A3 = carta(
  "A3",
  "3 · Noche",
  "#E6D9C2",
  "#F2E9D8",
  "#D4C2A2",
  "#DCCCAF",
  "El más profundo que mantiene todo el texto en AA: 24 % menos brillo y la mayor calidez posible sin sacrificar contraste. Un nivel más y el precio cae a 4.45:1, por debajo de la norma."
);

const SCHEMES = [ACTUAL, A1, A2, A3];

function Badge({ tag }: { tag: string }) {
  const map: Record<string, [string, string]> = {
    popular: ["#C65D3B", "#FFFFFF"],
    spicy: ["#B07C22", "#FFFFFF"],
    signature: ["#5C6B42", "#FFFFFF"],
  };
  const [bg, fg] = map[tag] || ["#8A7E6F", "#FFFFFF"];
  const label = tag === "popular" ? "Popular" : tag === "spicy" ? "Picante" : "Especial";
  return (
    <span
      className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-md font-semibold"
      style={{ background: bg, color: fg }}
    >
      {label}
    </span>
  );
}

function PhotoCard({ item, s }: { item: MenuItem; s: Scheme }) {
  const tags = item.tags.filter((x) => ["popular", "spicy", "signature"].includes(x));
  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col h-full"
      style={{
        background: s.paper ? "transparent" : s.card,
        border: s.paper ? "none" : `1px solid ${s.border}`,
        boxShadow: s.paper ? "none" : "0 8px 24px rgba(46,38,32,0.08)",
      }}
    >
      <div
        className="relative aspect-[4/3] overflow-hidden"
        style={{
          borderRadius: s.paper ? 14 : 0,
          border: s.paper ? `1px solid ${s.rule}` : "none",
        }}
      >
        <Image src={item.image!} alt={item.name} fill className="object-cover" sizes="25vw" />
      </div>
      <div className={s.paper ? "pt-4 pb-5" : "p-5"}>
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3
            className="font-heading font-bold text-xl md:text-2xl leading-tight"
            style={{ color: s.name }}
          >
            {item.name}
          </h3>
          <span
            className="font-extrabold text-xl md:text-2xl shrink-0"
            style={{ color: s.price }}
          >
            ${item.price.toFixed(2)}
          </span>
        </div>
        <p className="text-[17px] leading-relaxed mb-4" style={{ color: s.desc }}>
          {item.description}
        </p>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-2" style={{ borderTop: `1px solid ${s.rule}` }}>
            {tags.map((t) => (
              <Badge key={t} tag={t} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ListRow({ item, s }: { item: MenuItem; s: Scheme }) {
  return (
    <div className="break-inside-avoid mb-7">
      <div className="flex items-baseline gap-2">
        <h3
          className="font-heading font-bold text-xl md:text-2xl leading-tight"
          style={{ color: s.rowName ?? s.name }}
        >
          {item.name}
        </h3>
        <span
          aria-hidden
          className="flex-1 border-b border-dotted relative -top-1"
          style={{ borderColor: s.price + "66" }}
        />
        <span
          className="font-extrabold text-xl md:text-2xl shrink-0 tabular-nums"
          style={{ color: s.price }}
        >
          ${item.price.toFixed(2)}
        </span>
      </div>
      <p className="text-[17px] leading-relaxed mt-1 pr-16" style={{ color: s.desc }}>
        {item.description}
      </p>
    </div>
  );
}

/** Live contrast readout so the comparison is a number, not an impression. */
function srgb(color: string, over?: number[]): { L: number; rgb: number[] } {
  let rgb: number[];
  let a = 1;
  if (color.startsWith("#")) {
    const h = color.slice(1);
    rgb = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  } else {
    const m = color.match(/[\d.]+/g) ?? ["0", "0", "0"];
    rgb = m.slice(0, 3).map(Number);
    a = m.length > 3 ? Number(m[3]) : 1;
  }
  if (over && a < 1) rgb = rgb.map((v, i) => v * a + over[i] * (1 - a));
  const c = rgb.map((v) => {
    const u = v / 255;
    return u <= 0.03928 ? u / 12.92 : Math.pow((u + 0.055) / 1.055, 2.4);
  });
  return { L: 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2], rgb };
}

function Contrast({ s }: { s: Scheme }) {
  const page = srgb(s.page);
  const surface = srgb(s.card === "transparent" ? s.page : s.card, page.rgb);
  const ratio = (fg: string) => {
    const f = srgb(fg, surface.rgb).L;
    const b = surface.L;
    return ((Math.max(f, b) + 0.05) / (Math.min(f, b) + 0.05)).toFixed(2);
  };
  const rows = [
    { label: "Nombre", v: ratio(s.name) },
    { label: "Descripción", v: ratio(s.desc) },
    { label: "Precio", v: ratio(s.price) },
  ];

  // Brillo del papel frente al crema que sirve el sitio hoy, y cuánto cae el
  // canal azul respecto al rojo, que es lo que se percibe como calidez.
  const HOY = srgb("#FAF6EF").L;
  const caida = (100 * (1 - page.L / HOY)).toFixed(0);
  const calidez = (((page.rgb[0] - page.rgb[2]) / page.rgb[0]) * 100).toFixed(0);

  return (
    <div className="flex flex-wrap gap-3 text-xs">
      {s.id !== "actual" && (
        <>
          <span
            className="px-2.5 py-1 rounded-md font-bold"
            style={{ background: "#3C3228", color: "#fff" }}
          >
            Brillo −{caida}% vs hoy
          </span>
          <span
            className="px-2.5 py-1 rounded-md font-bold"
            style={{ background: "#7A5A22", color: "#fff" }}
          >
            Calidez {calidez}%
          </span>
        </>
      )}
      {rows.map((r) => {
        const n = parseFloat(r.v);
        const ok = n >= 4.5;
        const mid = n >= 3 && n < 4.5;
        return (
          <span
            key={r.label}
            className="px-2.5 py-1 rounded-md font-bold"
            style={{ background: ok ? "#2F6B3A" : mid ? "#8A6A1E" : "#9B2C2C", color: "#fff" }}
          >
            {r.label} {r.v}:1 {ok ? "AA" : mid ? "límite" : "falla"}
          </span>
        );
      })}
    </div>
  );
}

export default function PreviewModoClaro() {
  const [active, setActive] = useState("A3");
  const s = SCHEMES.find((x) => x.id === active) ?? SCHEMES[0];

  return (
    <main className="min-h-screen" style={{ background: s.page, transition: "background 250ms" }}>
      <div className="sticky top-0 z-30 border-b" style={{ background: s.page, borderColor: s.rule }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center gap-3">
          <span
            className="text-[11px] font-bold uppercase tracking-[0.2em] mr-2"
            style={{ color: s.price }}
          >
            Preview · modo claro
          </span>
          {SCHEMES.map((x) => (
            <button
              key={x.id}
              onClick={() => setActive(x.id)}
              className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
              style={
                active === x.id
                  ? { background: "#C65D3B", color: "#fff" }
                  : { background: "transparent", color: s.desc, border: `1px solid ${s.rule}` }
              }
            >
              {x.nombre}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <header className="mb-8 max-w-3xl">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-3" style={{ color: s.name }}>
            {s.nombre}
          </h1>
          <p className="text-base leading-relaxed mb-5" style={{ color: s.desc }}>
            {s.resumen}
          </p>
          <Contrast s={s} />
          <p className="text-xs mt-3" style={{ color: s.desc }}>
            Medido dentro de la tarjeta con fotografía, que es donde está el problema. AA pide 4.5:1 para texto normal.
          </p>
        </header>

        <section className="mb-14">
          <h2
            className="text-[11px] font-bold uppercase tracking-[0.2em] mb-5"
            style={{ color: s.price }}
          >
            Platillos con fotografía
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {conFoto.map((i) => (
              <PhotoCard key={i.id} item={i} s={s} />
            ))}
          </div>
        </section>

        <section
          className="pt-12"
          style={{ borderTop: `1px solid ${s.rule}` }}
        >
          <h2
            className="text-[11px] font-bold uppercase tracking-[0.2em] mb-5"
            style={{ color: s.price }}
          >
            También en la carta
          </h2>
          <div className="columns-1 md:columns-2 gap-x-14">
            {sinFoto.map((i) => (
              <ListRow key={i.id} item={i} s={s} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
