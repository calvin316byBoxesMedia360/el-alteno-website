# El Alteño — Contexto del Proyecto

> **Para cualquier IA o desarrollador que retome este proyecto:** lee este archivo primero.
> Para desplegar, lee además [`DEPLOYMENT.md`](DEPLOYMENT.md) — contiene configuración que no vive en el código.

---

## Estado Actual

**El sitio está CONSTRUIDO y EN VIVO.**

| | |
|---|---|
| **URL en producción** | https://web-production-004ee.up.railway.app |
| **Repo** | https://github.com/calvin316byBoxesMedia360/el-alteno-website (público) |
| **Plataforma** | Railway (deploy automático al hacer push a `master`) |

### Cómo correrlo localmente

```bash
cd el-alteno          # ← la app vive en esta subcarpeta, NO en la raíz
npm install           # solo la primera vez
npm run dev           # → http://localhost:3000
```

---

## ⚠️ Lo primero que debes saber

**1. La app Next.js está en la subcarpeta `el-alteno/`, no en la raíz del repo.**
Cualquier plataforma de hosting necesita `Root Directory = el-alteno`. Sin eso, el build falla.

**2. Falta configurar `NEXT_PUBLIC_FORMSPREE_ID`.**
El formulario de eventos la necesita. Ver [`el-alteno/.env.example`](el-alteno/.env.example).
Sin ella el formulario **falla en silencio** — el visitante cree que envió su solicitud y nunca llega.

**3. La carpeta `/public/` de la raíz son imágenes fuente, no las del sitio.**
Las que el sitio usa están en `el-alteno/public/images/`.

---

## El Cliente

| Campo | Valor |
|---|---|
| Restaurante | El Alteño — Auténtica Comida Mexicana |
| Dirección | 323 Main St, Watsonville, CA 95076 |
| Teléfono | 831.768.9876 |
| Horario | Mar–Sáb 11am–8pm · Dom 9am–8pm (desayunos Dom 9–11:45am) · Lunes cerrado |
| Pagos | DoorDash, Uber Eats, Visa, Mastercard, Zelle |

---

## Contexto de Negocio

- **Audiencia:** 90% turistas, 10% locales. Muchos referidos por contactos del restaurante.
- **Dos pilares de ingresos:**
  1. Comedor para turistas (el menú digital es el gancho principal)
  2. Eventos privados — Abr–Dic, viernes/sáb/dom con agenda llena, hasta 100 personas, hasta 2 eventos simultáneos
- **DoorDash:** ya tienen cuenta activa. Una vez el sitio esté consolidado, DoorDash los referirá en su plataforma. **Este fue el motivo original de construir el sitio.**
- **Reservas de eventos hoy:** por teléfono o presencial. El sitio añade formulario web como canal adicional.

---

## Stack Real (verificado en el código)

```
Next.js 16.2.9 (App Router)
React 19.2.4
TypeScript 5
Tailwind CSS v4
shadcn/ui + @base-ui/react
Framer Motion 12
lucide-react (iconos)
```

**Nota sobre i18n:** `next-intl` está en `package.json` pero **no se usa para routing**. El idioma se maneja con un Context propio (`src/context/LanguageContext.tsx`) que hace toggle en cliente. No hay rutas `/en` ni `/es` — es una sola ruta con estado.

**Modo claro/oscuro:** vía `src/context/ThemeContext.tsx` + la clase `.dark` en `globals.css`.

---

## Estructura del Código

```
el-alteno-website/               ← raíz del repo
├── CONTEXT.md                   ← este archivo
├── DEPLOYMENT.md                ← config de deploy (Root Directory, env vars)
├── public/                      ← imágenes FUENTE originales (no las usa el sitio)
└── el-alteno/                   ← ★ LA APP
    ├── .env.example             ← variables necesarias
    ├── README.md
    ├── CLAUDE.md / AGENTS.md    ← instrucciones para agentes de IA
    ├── src/
    │   ├── app/
    │   │   ├── layout.tsx       # Fuentes, metadata SEO, providers
    │   │   ├── page.tsx         # Home — ensambla todas las secciones
    │   │   └── menu/page.tsx    # ★ Página standalone del menú (para QR en mesa)
    │   ├── components/
    │   │   ├── layout/          # Navbar, Footer
    │   │   ├── sections/        # Hero, About, MenuSection, Events, Cocktails, Location
    │   │   ├── menu/            # MenuTabs, MenuItem
    │   │   └── ui/              # shadcn + WatermarkBg
    │   ├── context/
    │   │   ├── LanguageContext.tsx   # ★ Toggle ES/EN
    │   │   └── ThemeContext.tsx      # ★ Modo claro/oscuro
    │   ├── data/menu.ts         # ★ TODO EL MENÚ (50+ platillos, EN+ES)
    │   ├── types/menu.ts
    │   └── lib/utils.ts
    └── public/
        ├── images/logo/         # logo.png
        ├── images/dishes/       # 11 fotos de platillos
        ├── images/cocktails/    # cantarito, sunrise, chavela
        ├── images/location/     # plaza_watsonville.png
        └── videos/hero-bg.mp4   # video de fondo del hero
```

---

## Sistema Visual — "Cálido Artesanal"

> ⚠️ El cliente **RECHAZÓ** la paleta original de rojos/naranjas saturados. No volver a ella.

Definido en `el-alteno/src/app/globals.css`.

**Modo claro:**
| Rol | Hex |
|---|---|
| Fondo | `#FAF6EF` (crema cálido) |
| Texto | `#2E2620` (café oscuro cálido) |
| Primario | `#C65D3B` (terracota) |
| Acento | `#C99A3F` (mostaza) |
| Muted | `#8A7E6F` |

**Modo oscuro:**
| Rol | Hex |
|---|---|
| Fondo | `#161311` (carbón heritage) |
| Texto | `#FAF6EF` |
| Primario | `#C65D3B` (mismo terracota) |
| Acento | `#C99A3F` |

**Tipografía:** Playfair Display (títulos) + Lato (cuerpo), vía `next/font/google`.

**Detalles de estilo:** textura de ruido orgánico en el fondo, patrón inspirado en talavera, borde papel picado, glass cards con backdrop-blur.

---

## Assets — Fotos Disponibles

**Platillos con foto real (11):**
camarones-diabla · camarones-vallarta · carne-asada · combo-enchilada-sope · enchilada-salsa-verde · enchiladas-pollo · fajitas-pollo · filete-parrilla · mojarra-frita · sopes

**Cócteles (3):** cantarito · sunrise · chavela

**Otros:** logo.png · plaza_watsonville.png · hero-bg.mp4

Los platillos sin foto muestran un emoji de placeholder.

---

## Historial de Decisiones

| Decisión | Resultado |
|---|---|
| ¿Landing page o sitio completo? | Sitio completo (menú + eventos son pilares separados) |
| ¿CMS o estático? | Estático — el menú cambia 1-2 veces al año |
| ¿Idioma? | Bilingüe con toggle en cliente (no rutas separadas) |
| ¿Carrito / pagos? | **No** — solo presentación y contacto |
| ¿Reservas? | Formulario Formspree, con teléfono como fallback visible |
| ¿Paleta? | Cálido Artesanal (el cliente rechazó los rojos saturados) |
| ¿Modo oscuro? | Sí, agregado después |
| ¿Hosting? | Railway (el blueprint sugería Vercel — ver DEPLOYMENT.md para el trade-off) |

---

## Pendientes

**Críticos:**
- [ ] Configurar `NEXT_PUBLIC_FORMSPREE_ID` en Railway y verificar que llega el correo de prueba
- [ ] Actualizar el iframe de Google Maps en `Location.tsx` con la URL real del negocio

**Importantes:**
- [ ] Verificar disponibilidad del dominio `elalteno.restaurant` y conectarlo
- [ ] Conseguir fotos del resto de platillos
- [ ] Generar el código QR apuntando a `/menu` para las mesas
- [ ] Compartir la URL con DoorDash (objetivo original del proyecto)

**Opcionales:**
- [ ] Evaluar migrar a Vercel (gratis vs ~$5/mes en Railway — ver DEPLOYMENT.md)
- [ ] Auditoría SEO y de accesibilidad antes del lanzamiento formal

---

## Para Retomar en Otro IDE

```bash
git clone https://github.com/calvin316byBoxesMedia360/el-alteno-website.git
cd el-alteno-website/el-alteno
cp .env.example .env.local    # y llena NEXT_PUBLIC_FORMSPREE_ID
npm install
npm run dev
```

**Dónde tocar qué:**
| Quiero cambiar… | Archivo |
|---|---|
| Colores / tipografía | `el-alteno/src/app/globals.css` |
| Platillos, precios, descripciones | `el-alteno/src/data/menu.ts` |
| Textos de secciones | El `.tsx` de la sección — usan `t("English", "Español")` |
| Orden de secciones | `el-alteno/src/app/page.tsx` |

**Siempre antes de subir:** `npm run build` debe pasar sin errores.

---

*Última actualización: 2026-07-27 — sitio en vivo en Railway, documentación de deploy y variables agregada*
