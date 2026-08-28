# HANDOFF — El Alteño · punto de partida para una sesión nueva

> **Lee este archivo completo antes de tocar nada.** Está escrito para que una sesión sin contexto previo pueda continuar el proyecto sin repetir errores que ya costaron caro.
>
> Última actualización: **2026-08-28** · commit local `ed69146`

---

## 0. Arranque en 30 segundos

```bash
cd "C:\Users\no\Documents\Sandbox Boxes\El Alteno rest\el-alteno"
npm run dev          # → http://localhost:3000
```

- Rama activa: `feat/consolidate-menu-assets` (commit `ed69146`, **sin publicar**)
- La app Next.js vive en la subcarpeta `el-alteno/`, **no en la raíz del repo**
- Producción: https://web-production-004ee.up.railway.app (sirve `master` = `a190c4d`)

---

## 1. Qué es este proyecto

Sitio web de **El Alteño**, restaurante mexicano en 323 Main St, Watsonville, California.
Lo desarrolla un contratista (el usuario) para el restaurante. **No es su propio negocio.**

**Por qué existe:** DoorDash ofreció destacar al restaurante en su plataforma una vez tuviera sitio web. Objetivo secundario: captar reservas de eventos privados, su servicio más rentable.

| Dato | Valor |
|---|---|
| Dirección | 323 Main St, Watsonville, CA 95076 |
| Teléfono | (831) 768-9876 |
| Horario | Mar–Dom 11:00–20:00 · **lunes cerrado** |
| Lunch Specials | 11:00–15:00 *(el flyer se contradice, ver §7)* |
| Eventos | hasta 100 invitados, 2 salones, llenos vie–dom de abril a diciembre |
| Delivery | DoorDash · Uber Eats |
| Público | ~90 % turistas, ~10 % locales |

---

## 2. ⚠️ La regla que no se rompe

**Este proyecto publicó datos inventados a un sitio real.** Tres platillos de desayuno y todos los precios de bebidas fueron fabricados; cuatro precios de mariscos estaban mal por entre 1 y 4 dólares. Un cliente que lee un precio equivocado discute con el mesero en el mostrador.

> **No añadas jamás un platillo, precio o descripción que no esté en `MENU-SOURCE.md`.**

`MENU-SOURCE.md` (raíz del repo) es la transcripción del flyer impreso, con las fotos de origen citadas. **Nada fuera de ese archivo cuenta como respaldo** — ni un nombre de archivo, ni una receta plausible, ni el precio de otro platillo.

Si el restaurante cambia el menú: fotografiar el nuevo → actualizar `MENU-SOURCE.md` → recién entonces tocar `src/data/menu.ts`.

Lo mismo aplica a las **fotos**: un nombre de archivo no prueba qué contiene la imagen. Tres asignaciones resultaron falsas al mirarlas (§5).

---

## 3. Estructura

```
El Alteno rest/                    ← raíz del repo git
├── HANDOFF.md                     ← este archivo (sin versionar todavía)
├── CONTEXT.md                     ← contexto histórico (parcialmente desactualizado)
├── MENU-SOURCE.md                 ← ★ FUENTE DE VERDAD del menú
├── DEPLOYMENT.md                  ← Root Directory y variables de entorno
├── public/                        ← fotos originales del menú impreso (referencia, no las sirve el sitio)
├── .claude/
│   ├── agents/                    ← 3 subagentes (versionados)
│   └── skills/                    ← 7 skills (gitignored, ver §9)
└── el-alteno/                     ← ★ LA APP NEXT.JS
    ├── src/data/menu.ts           ← ★ 83 platillos
    ├── src/types/menu.ts
    ├── src/app/page.tsx           ← home
    ├── src/app/menu/page.tsx      ← menú standalone para QR de mesa
    ├── src/components/sections/   ← Hero · About · MenuSection · Events · Cocktails · Location
    ├── src/components/menu/       ← MenuTabs · MenuItem · MenuListRow
    ├── src/context/               ← LanguageContext · ThemeContext
    └── public/images/             ← dishes · cocktails · about · location · logo
```

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · shadcn/ui · Framer Motion

**Sobre i18n:** `next-intl` está instalado **pero no se usa para routing**. No hay rutas `/en` ni `/es`. El idioma es un toggle en cliente vía `LanguageContext`; los componentes llaman `t("English", "Español")` en línea.

**Ojo con `el-alteno/AGENTS.md`:** dice que esta versión de Next trae cambios de API respecto al conocimiento previo, y que hay que leer `node_modules/next/dist/docs/` antes de escribir código. Es contenido legítimo del proyecto y **acertado** — de ahí salió el hallazgo de `priority` en §6.

---

## 4. Estado del repositorio

| Rama | Commit | Contenido | Estado |
|---|---|---|---|
| `master` | `a190c4d` | Lo que ve el público | **LIVE** |
| `chore/convert-approved-images-webp` | `bdf2ce9` | 10 conversiones WebP | PR #1 en **draft** |
| `review/live-sections` | `7721779` | Rediseño Hero/About (hecho por Codex) | sin mergear |
| `feat/consolidate-menu-assets` | `ed69146` | 11 fotos + 3 correcciones + pasos 1–3 | **solo local, 5 commits por delante** |

Los cinco commits locales sin publicar:

```
ed69146  fix(menu): make the printed-menu rows legible in light theme
5e6052f  chore(images): convert about/ assets to WebP, sized to their render slots
1533508  fix(hero): stop translating the per-flag greeting
f2c7bba  feat(menu): replace stock photography with printed-menu rows
acad2cc  feat(menu): add 11 dish photos and correct three misassigned images
```

🔴 **Producción está siete commits atrás.** Lo publicado no incluye las conversiones WebP, el rediseño, las correcciones de fotos, ni el retiro del stock.

**Consecuencia concreta:** la foto que muestra **carne** ilustrando *Two Sopes de Guacamole* —platillo **vegetariano**— sigue en línea, y los 65 platillos sin foto siguen mostrando comida de otro restaurante junto a precios reales.

**Sobre PR #1:** sus 10 conversiones ya viajan dentro de `review/live-sections` y de `ed69146`. Al mergear cualquiera de esas ramas queda absorbido — decidir si se cierra o se mergea primero.

### Otras copias locales

| Ruta | Nota |
|---|---|
| `Sandbox Boxes\el-alteno-pr1` | worktree de PR #1. Comparte el `.git`; borrarlo a mano requiere `git worktree prune` |
| `Codex\2026-07-27\...\work\live-review` | clon de Codex. Pertenece al usuario Windows `CodexSandboxOffline`; git exige `-c safe.directory=<ruta>` para leerlo |
| `Sandbox Boxes\el-alteno-reports` | informes y respaldos, **fuera de git** |

---

## 5. Estado de las imágenes

| | |
|---|---|
| Platillos totales | **83** (82 visibles; Mojarra Frita oculta, §7) |
| Con foto real del restaurante | **18** |
| Sin foto → **renglón de carta impresa** | **65** |

✅ **Cero referencias a `images.unsplash.com`.** Los 65 platillos sin foto se leen como carta impresa: nombre, puntos guía y precio, a dos columnas, sin hueco de imagen. `next.config.ts` ya no permite **ningún** host remoto de imágenes, así que el stock no puede volver por descuido.

En cada categoría los platillos fotografiados van arriba como tarjetas y el resto sigue bajo un divisor *«Also on the menu / También en la carta»*. Componente: `src/components/menu/MenuListRow.tsx`.

### Las tres asignaciones corregidas en `acad2cc`

Verificadas **mirando las imágenes**, no por nombre de archivo:

| Estaba en | La foto realmente muestra | Se movió a |
|---|---|---|
| Aguachile | copa con caldo de tomate, camarón, pepino, aguacate | **Cóctel de Camarón** |
| Charbroiled Steak Taco | tres tacos **dorados con pollo** y guarnición | **Tacos Dorados** |
| Two Sopes de Guacamole *(vegetariano)* | un sope **con carne** + una enchilada | **desasignada** |

`combo-enchilada-sope.webp` queda huérfano a propósito, hasta que el restaurante diga qué platillo es.

### Presupuesto de assets

`public/images` **8.5 MB** (antes 13 MB) · `public/videos/hero-bg.mp4` **21 MB**

`about/` pasó de 4.9 MB a **864 KB** (−83 %) en `5e6052f`. Solo quedan dos archivos sobre el tope de 400 KB:

| Archivo | Peso | Nota |
|---|---|---|
| `cocktails/chavela.png` | **2.2 MB** | 🔴 **referenciado y en línea** en `Cocktails.tsx:38`. Es hoy la imagen más pesada del sitio. Convertirla es trabajo mecánico, pero §7 marca el material de *chavela* como pendiente de revisar por marcas de terceros — **preguntar antes** |
| `logo/logo.png` | 1.6 MB | **se queda PNG**, lleva transparencia |

**Lección de `5e6052f` sobre la receta de conversión:** la calidad 82 que el proyecto fijó **no alcanza el piso de SSIM 0.95 / PSNR 35 dB en ilustraciones con canal alfa**, y subir la calidad casi no mueve la aguja (de q82 a q95, `celebration` pasa de 30.42 a 31.17 dB). `alphaQuality: 100` produce archivos byte a byte idénticos, así que el alfa **no** era la causa. Para esas cinco ilustraciones la respuesta es **WebP sin pérdida**, que además sigue ganándole al PNG. La calidad con pérdida se reserva a fotografías reales sin alfa.

**Segunda lección:** varios assets pesaban mucho más de lo que el sitio realmente dibuja. Los cuatro iconos de `about/` se renderizan a **48 px CSS** (`sizes="48px"`) desde fuentes de hasta 494 px, y el grabado de tortilla se dibuja a **220 px como máximo**, al 48 % de opacidad y con `mix-blend-screen`, desde un maestro de 1536 px. Vale la pena mirar el `sizes` antes de elegir el tope de reescalado.

---

## 6. Plan acordado

**Paso 1 · Retirar las fotos de stock** ✅ **hecho** (`f2c7bba`)
Se eligió la variante **B · lista de carta** tras comparar tres diseños en pantalla. Eliminados `categoryPlaceholders` de ambos archivos y las 24 referencias a Unsplash; retirado también el `remotePatterns` de `next.config.ts`.

**Paso 2 · Corregir el saludo bilingüe** ✅ **hecho** (`1533508`)
`Hero.tsx` ya no envuelve en `t()` el saludo por bandera. Se lee *«MX Bienvenidos · US Welcome»* en ambos idiomas.

**Paso 3 · Optimizar las seis imágenes de `about/`** ✅ **hecho** (`5e6052f`)
De 4.9 MB a 864 KB. No llegó a los 700 KB que estimaba el plan: alcanzarlos exigía bajar del piso de calidad del proyecto o recortar resolución por debajo de un margen cómodo de DPR. Si se quiere el número más ajustado, con iconos a 192 px y el grabado a 512 px queda en ~645 KB, todo por encima del piso.

**Paso 4 · Publicar y desplegar** 🔴 **pendiente — requiere decisión**
Subir `feat/consolidate-menu-assets`, abrir PR, definir orden de merge hacia `master`, y decidir qué se hace con PR #1 y con `review/live-sections`.

### Hallazgos abiertos de esta sesión

| | Qué | Dónde |
|---|---|---|
| 🟡 | **`priority` está deprecado en Next 16** en favor de `preload`; la doc recomienda `loading="eager"` o `fetchPriority="high"` en la mayoría de casos. Tres usos siguen en el código | `app/menu/page.tsx:108` · `layout/Navbar.tsx:37` · `sections/Location.tsx:20` |
| 🟡 | En **tema claro** el precio en mustard sobre crema da **2.38:1** y la descripción **3.68:1**. Es el estilo de la casa ya presente (la página del QR usa mustard para precios sobre crema), no algo que introdujera el paso 1 — pero un precio es información, no adorno | `MenuListRow.tsx` · `menu/page.tsx` · `MenuSection.tsx` |
| 🟡 | Las **notas de categoría** (`note` / `noteEs` en `menu.ts`: «Flour tortilla, rice, beans…», el horario de Lunch Specials) existen en los datos pero **no se muestran en ninguna de las dos vistas** | `MenuTabs.tsx` · `menu/page.tsx` |
| 🟡 | 2 errores de lint **preexistentes** (`setState` dentro de `useEffect`) y 1 warning de import sin usar | `LanguageContext.tsx:22` · `ThemeContext.tsx:20` · `Location.tsx:4` |

---

## 7. Bloqueado por el restaurante

1. Precio de la **Mojarra Frita** — hoy `price: 0` con `available: false`. Si alguien activa el platillo, publica **$0.00**
2. Precios y descripciones reales de **Huevos Revueltos** y **Chilaquiles**
3. Receta de la **Paloma** y contenido del **Balde Cervecero**
4. ¿Qué platillo es la foto de `combo-enchilada-sope`?
5. Derechos de las fotos — el empaque **Saladitas** es visible en `ceviche-camaron.webp`
6. **Lunch Specials: ¿hasta las 2:00 o 3:00 PM?** Los dos lados del mismo flyer se contradicen. El código usa 3:00 PM sin confirmación

### Material excluido a propósito

Estos archivos existen y están respaldados, pero **no entran** hasta que el restaurante confirme:

| Archivo | Motivo |
|---|---|
| `huevos-revueltos.webp` · `chilaquiles.webp` | descripciones escritas sin fuente documental |
| `paloma.webp` · `balde-cervecero.webp` | descripciones y etiquetas comerciales inventadas |
| `cantarito.webp` · `chavela.webp` | sustituciones de contenido; marcas de terceros sin revisar |

Respaldo: `el-alteno-reports/backup-48-cambios-20260731-1046/`
Originales PNG de `about/`: `el-alteno-reports/backup-about-png-20260828-0834/`

---

## 8. Trampas de este entorno

Estas ya costaron tiempo. Están documentadas para no repetirlas.

**Una pestaña de larga vida sirve CSS viejo.** Tras varias recompilaciones de Turbopack, una pestaña abierta puede quedarse con una hoja de estilos anterior. Da lecturas imposibles: la variable `--foreground` resuelve al valor correcto y el `color` computado es el del tema contrario. **Ante un resultado que se contradice a sí mismo, abrir pestaña nueva y volver a medir** antes de creerle.

**Las capturas de pantalla sí funcionan** (2026-08-28). La nota anterior decía que fallaban; en esta sesión compusieron bien. Aun así, para contraste, desbordes y estado de carga conviene medir por DOM: da números, no impresiones.

**Manipular `classList` a mano carrera con `ThemeContext`.** El efecto de montaje reescribe la clase del `<html>`. Para probar temas, usar **el conmutador real del Navbar**, no `classList.add("light")`.

**Las imágenes `loading="lazy"` reportan `complete: false` para siempre**, porque nunca entran en viewport desde la perspectiva del motor. Es artefacto de medición, no defecto. Comprobar por HTTP antes de reportar una imagen como rota.

**Una imagen a medio intercambio de `srcset`** da `naturalWidth: 0` estando sana. Recargar limpio y volver a medir.

**El desborde horizontal dentro de un `overflow-x-auto` es normal.** La tira de pestañas de categorías tiene `min-w-max` a propósito: sus hijos exceden el viewport dentro de su propio contenedor con scroll. Medir el desborde en `document.documentElement`, no en cada elemento.

**Next rechaza dos servidores de desarrollo** para el mismo proyecto. Comprobar qué está escuchando antes de lanzar otro. `npm run build` comparte `.next` con el dev server: conviene detenerlo antes de compilar.

**El envoltorio de la shell rompe con apóstrofos y comillas simples.** Un heredoc `<<'EOF'` cuyo contenido lleve un apóstrofo (`restaurant's`) falla con *unexpected EOF*. Para archivos con texto en prosa, usar la herramienta de escritura en vez de `cat > … <<EOF`.

**`sed` con `|` en el patrón se rompe** si `|` es también el delimitador. Ya dejó 16 referencias apuntando a archivos borrados. Verificar después de cualquier reemplazo masivo.

**Los archivos del repo son CRLF.** Un `replace` en Node con `\n` en el patrón no encuentra nada. Usar `\r?\n`. Además, un `git stash` de ida y vuelta renormaliza los finales de línea y rompe los patrones que sí funcionaban antes.

**`git show --check` siempre imprime la cabecera del commit**, incluso sin problemas. Evaluar por código de salida, no por si hubo salida.

**`gh pr view` no tiene campo `merged`.** Usar `state`, `mergedAt`, `mergedBy`, `mergeCommit`.

**`sharp` debe requerirse desde dentro de `el-alteno/`** o con `NODE_PATH` apuntando a su `node_modules`. Un script en `%TEMP%` falla con `MODULE_NOT_FOUND`.

**ffmpeg escribe SSIM y PSNR en stderr, no en stdout.** Un `execSync` que solo lea stdout devuelve vacío y parece que la métrica no existe.

**El repo de Codex pertenece a otro usuario de Windows.** Leerlo con `git -c safe.directory=<ruta>` en cada comando, sin modificar la configuración global.

**Nunca afirmar «pixel-idéntico»** de un WebP: la compresión es con pérdida y los píxeles decodificados siempre difieren. Decir «mismas dimensiones» o citar el SSIM.

---

## 9. Herramientas instaladas

### Subagentes — `.claude/agents/` (versionados)

| Agente | Cuándo usarlo |
|---|---|
| `menu-auditor` | antes de cualquier commit que toque datos de menú |
| `visual-qa` | tras cambios de UI y antes de desplegar |
| `asset-optimizer` | cuando lleguen fotos nuevas o algún asset pase de 400 KB |

Cada uno lleva escritas las lecciones concretas de este proyecto. Las reglas de `asset-optimizer` siguen vigentes salvo el matiz de §5: **calidad 82 no sirve para ilustraciones con alfa; ahí va sin pérdida.**

### Skills — `.claude/skills/` (gitignored, 1.9 MB)

`humanizer` · `playwright-cli` · `seo-audit` · `frontend-design` · `ui-ux-pro-max` · `web-design-guidelines` · `shadcn-ui`

Reinstalar con:
```bash
cp -r claude-webkit/.claude/skills/<nombre> .claude/skills/
```
*(el repo `claude-webkit` está clonado en la raíz y también gitignored)*

### Higgsfield

CLI `1.1.23` instalado · MCP conectado · plan **ultra**, ~1 737 créditos.

**No usarlo para fotos del menú:** serían imágenes sintéticas junto a precios reales — la misma clase de problema que ya se corrigió en el texto. Y el cliente pide *menos* imágenes, no más.
Encaja limpio en: fondos y texturas, material de marketing, o un hero más ligero que los 21 MB actuales.

### Jules y Stitch

**No tienen servidor MCP oficial.** El registro de conectores está vacío. Jules se conecta directo a GitHub y abre PRs por su cuenta; Stitch exporta manualmente a Figma o HTML. Ninguno requiere instalación de este lado.

---

## 10. Convenciones de trabajo

- **Informes** en `Sandbox Boxes\el-alteno-reports\`, **fuera de git**. Uno por fase o cambio relevante
- **Commits frecuentes y acotados.** Un commit = una naturaleza de cambio. No mezclar conversión mecánica con datos comerciales
- **Verificar antes de afirmar.** Consultar el remoto, la configuración y el sitio en vivo antes de decir «está todo»
- **Distinguir defecto real de artefacto de medición** al reportar QA visual
- **`npm run build` debe pasar** antes de reportar trabajo terminado
- **Comentarios de código en inglés**, como el resto del repo, aunque la conversación sea en español
- El usuario prefiere **español** y que se tome la iniciativa: proponer con recomendación, no listar opciones

---

## 11. Antes de desplegar

1. `NEXT_PUBLIC_FORMSPREE_ID` configurado en Railway — **enviar el formulario de eventos y confirmar que llega el correo.** Sin esa variable falla en silencio: el visitante cree que reservó y no llega nada
2. Reemplazar el iframe de Google Maps en `Location.tsx` si sigue con coordenadas de ejemplo
3. **Root Directory = `el-alteno`** en la plataforma de hosting. No está en el código; vive en el dashboard. Sin eso el build falla al instante
4. `npm run build` en verde
5. Revisado a 375 px y 1440 px, en ambos idiomas y ambos temas

---

## 12. Primer paso sugerido para la sesión nueva

**Cerrar el paso 4.** El trabajo técnico de los pasos 1–3 está hecho, verificado y commiteado; lo único que falta es una decisión de publicación: orden de merge entre `feat/consolidate-menu-assets`, `review/live-sections` y PR #1, y si `HANDOFF.md` entra al repo o se queda fuera.

Después de eso, los candidatos son `chavela.png` (2.2 MB en línea) y los tres `priority` deprecados, ambos en §6.
