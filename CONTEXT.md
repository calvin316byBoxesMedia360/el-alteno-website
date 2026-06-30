# El Alteño — Contexto del Proyecto

> **Para cualquier IA o desarrollador que retome este proyecto:** Lee este archivo primero. Contiene todo el contexto de las decisiones tomadas hasta ahora.

---

## Estado Actual

**Fase:** Sitio CONSTRUIDO y funcionando. Refinando estética.

**El proyecto Next.js está en la subcarpeta `el-alteno/`** — completamente funcional, build pasa sin errores.

**Cómo correrlo:**
```bash
cd el-alteno
npm install        # solo la primera vez en un IDE nuevo
npm run dev        # → http://localhost:3000
```

**Última decisión visual (aplicada):** Paleta cambiada a **"Cálido Artesanal"** — el cliente NO quería los rojos/naranjas saturados originales.

**Siguiente acción sugerida:** Continuar refinando estética (tipografía, espaciado, animaciones Framer Motion), reemplazar emojis restantes con fotos reales, configurar Formspree, y deploy a Vercel.

---

## El Cliente

| Campo | Valor |
|---|---|
| Restaurante | El Alteño — Auténtica Comida Mexicana |
| Dirección | 323 Main St, Watsonville, CA 95076 |
| Teléfono | 831.768.9876 |
| Horario | Mar–Sáb 11am–8pm · Dom 9am–8pm (desayunos Dom 9–11:45am) |
| Pagos | DoorDash, Uber Eats, Visa, Mastercard, Zelle |

---

## Contexto de Negocio

- **Audiencia:** 90% turistas, 10% locales. Muchos referidos por contactos del restaurante.
- **Dos pilares de ingresos:**
  1. Comedor para turistas (menú digital es el gancho principal)
  2. Eventos privados — Abr–Dic, viernes/sáb/dom con agenda llena, hasta 100 personas, hasta 2 eventos simultáneos
- **DoorDash:** Ya tienen cuenta activa. Una vez el sitio esté live, DoorDash los referirá en su plataforma.
- **Reservas hoy:** Por teléfono o presencial. El sitio añadirá formulario + WhatsApp.

---

## Identidad Visual (extraída del material físico en `/public/`)

- **Logo:** "EL ALTEÑO" en rojo intenso con outline blanco, tipografía script/display. Motivo de arco colonial con paisaje mexicano. Banderas MX + US.
- **Tagline:** Auténtica Comida Mexicana
- **Paleta:** Rojo (#C0392B aprox), verde, naranja/ámbar, crema
- **Estilo:** Calidez mexicana tradicional — no estética genérica de IA
- **Nota:** El logo será recreado en SVG/alta calidad por el desarrollador

---

## Categorías del Menú (del menú físico fotografiado)

| Sección | Notas |
|---|---|
| Aperitivos / Appetizers | Tostadas de Camarón, Vuelve a la Vida, etc. |
| Mariscos / Sea Food | Camarones a la Diabla, Huachinango, etc. (sección fuerte) |
| Parilladas | |
| Especialidades de la Casa | Molcajetes, Sopa Pastor, Chiles Rellenos, Pipián Mole, etc. |
| Enchiladas | Mole Rojo, Chipotle, Camarón, Verde de Langosta, Mariscos, etc. |
| Burritos | Clásicos + Burritos Creativos |
| Fajitas | Pollo, Steak, Camarón, mixtas |
| Vegetariano | |
| Cócteles | Sunrise, Chavela, Cantarito (con fotos disponibles) |
| Ensaladas / Salads | |
| Desayunos | Solo domingos |
| Lunch | Mar–Sáb 11am–2pm |
| Brunch | Domingos |
| Dinner | |

---

## Arquitectura Aprobada

### Stack Técnico
```
Next.js 15 (App Router)
Tailwind CSS 4
shadcn/ui
TypeScript
Framer Motion
Vercel (deploy)
```

### Estructura del Sitio
```
/ (Home — una sola página scrolleable)
├── Navbar — Logo + links + toggle ES/EN
├── Hero — Foto del restaurante + cócteles + CTA "See Menu" / "Reserve Event"
├── About — Historia breve, "Auténtica Comida Mexicana", Watsonville CA
├── Menu — Tabs por categoría (Mariscos, Especialidades, Burritos, Desayunos, etc.)
├── Events — Fotos del salón + formulario de contacto/WhatsApp
├── Cocktails — Sunrise, Chavela, Cantarito con fotos
├── Hours & Location — Google Maps embed + horarios + métodos de pago
└── Footer — Links DoorDash / Uber Eats + teléfono + dirección

/menu (standalone) — Página dedicada solo al menú, para QR code en mesa
```

### Idioma
- Inglés como idioma principal (audiencia 90% turistas en CA)
- Toggle ES/EN en el navbar

### Reservas de Eventos
- Formulario: nombre, fecha, número de personas, tipo de evento
- Envío: Formspree (gratis, sin backend) → email + WhatsApp
- Sin pasarela de pago ni carrito

### Dominio Candidato
- `elalteno.restaurant` (pendiente verificar disponibilidad)

---

## Assets Disponibles

```
/public/
├── WhatsApp Image 2026-06-30 at 2.01.45 PM.jpeg  → Portada del menú (logo + interior)
├── WhatsApp Image 2026-06-30 at 2.02.36 PM.jpeg  → Flyer con logo, horarios, contacto, cócteles
├── WhatsApp Image 2026-06-30 at 2.51.50 PM.jpeg  → Menú interior página 1 (Aperitivos, Mariscos, Parilladas)
├── WhatsApp Image 2026-06-30 at 2.52.00 PM.jpeg  → Menú interior página 2 (Especialidades, Enchiladas, Burritos)
```

**Fotos de platillos:** El desarrollador tiene fotos adicionales (pendiente de compartir/organizar).

---

## Herramientas Instaladas en Este Proyecto

| Carpeta | Qué es | Cómo usar |
|---|---|---|
| `the-architect/` | Meta-agente para generar blueprints | `cd the-architect && claude` |
| `claude-webkit/` | Constructor de sitios web con 13 skills | `cd claude-webkit && claude` |

---

## Historial de Decisiones

| Decisión | Resultado |
|---|---|
| ¿Landing page o sitio completo? | Sitio completo (menú + eventos son pilares separados) |
| ¿CMS o estático? | Estático (menú cambia 1-2 veces/año) |
| ¿Idioma? | Inglés principal + toggle español |
| ¿Carrito/pagos? | No — solo presentación y contacto |
| ¿Reservas? | Formulario Formspree → email + WhatsApp |
| ¿Deploy? | Vercel |
| ¿Stack? | Next.js 15 + Tailwind + shadcn/ui + Framer Motion |

---

## Paleta Visual ACTUAL — "Cálido Artesanal"

> El cliente RECHAZÓ la paleta original (rojos/naranjas saturados). Esta es la aprobada.

| Rol | Hex | Uso |
|---|---|---|
| Fondo | `#FAF6EF` | Crema hueso, con textura sutil de papel |
| Superficie/cards | `#F0E6D6` | Crema más cálido |
| Primario | `#C65D3B` | Terracota — CTAs, links, acentos |
| Primario oscuro | `#A84A2C` | Hover |
| Acento | `#6B7A4F` | Verde olivo |
| Mostaza | `#C99A3F` | Detalles, precios |
| Texto | `#2E2620` | Café cálido (no negro) |
| Muted | `#8A7E6F` | Texto secundario |
| Borde | `#E5D9C5` | Bordes suaves |
| Hero | Degradado `#3D3226 → #6B4A35 → #A84A2C` | Café oscuro a terracota |

Tipografía: **Playfair Display** (títulos) + **Lato** (cuerpo), vía `next/font/google`.
Definida en `el-alteno/src/app/globals.css`.

---

## Estructura del Código Construido

```
el-alteno/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Fuentes + metadata SEO
│   │   ├── page.tsx            # Ensambla todas las secciones
│   │   └── globals.css         # ★ PALETA Y DESIGN SYSTEM aquí
│   ├── components/
│   │   ├── layout/Navbar.tsx   # Logo + nav + mobile hamburger
│   │   ├── layout/Footer.tsx
│   │   ├── sections/Hero.tsx
│   │   ├── sections/About.tsx
│   │   ├── sections/MenuSection.tsx
│   │   ├── sections/Events.tsx     # Formulario Formspree
│   │   ├── sections/Cocktails.tsx
│   │   ├── sections/Location.tsx
│   │   └── menu/MenuTabs.tsx + MenuItem.tsx
│   ├── data/menu.ts            # ★ TODO EL MENÚ (55+ platillos, EN+ES)
│   └── types/menu.ts
└── public/images/
    ├── logo/logo.png          # Logo en alta calidad
    └── dishes/                # mojarra-frita, camarones-vallarta, enchiladas-pollo
```

---

## Fotos Disponibles (con foto real, resto usa emoji 🍽️)

- ✅ Mojarra Frita (seafood)
- ✅ Camarones a la Vallarta (seafood)
- ✅ Enchiladas de Mole Rojo (enchiladas)
- ⏳ Faltan fotos del resto de platillos

---

## Pendientes

- [x] Generar blueprint completo → `the-architect/output/el-alteno-blueprint.md`
- [x] Digitalizar menú completo desde fotos → `el-alteno/src/data/menu.ts`
- [x] Logo en alta calidad integrado
- [x] Construir el sitio (Next.js funcionando)
- [x] Paleta "Cálido Artesanal" aplicada
- [ ] Afinar tipografía, espaciado, animaciones Framer Motion
- [ ] Conseguir e integrar fotos del resto de platillos
- [ ] Configurar Formspree: crear cuenta gratis → poner ID en `el-alteno/.env.local`
- [ ] Actualizar iframe de Google Maps con URL real
- [ ] Verificar disponibilidad de dominio `elalteno.restaurant`
- [ ] Crear página standalone `/menu` para QR en mesa
- [ ] Deploy a Vercel (`cd el-alteno && npx vercel --yes`)
- [ ] Compartir URL con DoorDash

---

## Para Retomar en Otro IDE

1. Abre la carpeta raíz `El Alteno rest` en tu IDE
2. Lee este `CONTEXT.md` completo
3. `cd el-alteno && npm install && npm run dev`
4. El design system vive en `el-alteno/src/app/globals.css` — cambia colores ahí
5. El menú vive en `el-alteno/src/data/menu.ts`
6. Build de verificación: `npm run build` (debe pasar sin errores)

---

*Última actualización: 2026-06-30 — sitio construido, paleta Cálido Artesanal aplicada*
*Desarrollado con Claude Code*
