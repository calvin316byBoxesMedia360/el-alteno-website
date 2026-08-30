# HANDOFF — El Alteño · punto de partida para una sesión nueva

> **Lee este archivo completo antes de tocar nada.** Está escrito para que una sesión sin contexto previo pueda continuar el proyecto sin repetir errores que ya costaron caro.
>
> Última actualización: **2026-08-29** · **PR #2 mergeado y desplegado.** `master` = `6fd9ac0`. Esta revisión local continúa en una rama aislada y no se ha publicado.

## ⚡ Estado operativo vigente — 2026-08-30

Este bloque prevalece sobre las referencias históricas de las secciones inferiores cuando describen la rama o el worktree de esta revisión.

- **Worktree actual:** `C:\Users\no\Documents\ChatGPT\el alteno website\el-alteno-integration-test`
- **Rama actual:** `codex/menu-cta-content-polish`
- **Últimos commits locales:** `857e2c0` (memoria audiovisual), `a766c41` (menú, CTA y Carne Asada), `84fa1e5` (plan)
- **`master`:** no tocada y sin push desde esta revisión.
- **Aplicación:** `el-alteno/`; el hosting debe usar `Root Directory = el-alteno`.
- **Implementado:** CTA telefónica glass en Private Events; Mariscada y Huachinango corregidos; martes cerrado unificado; Carne Asada usa `public/images/dishes/carne-asada-clean.png`.
- **Pendiente fuera del commit:** `el-alteno/public/images/local_para_eventos/` contiene los recursos originales y el candidato `patio-event-base-v1.png`; todavía no está integrado en la UI ni publicado.
- **Audiovisual:** el patio activo usa `private-events-patio-walkthrough-v3.mp4`. El bar tiene maestro aprobado en `public/videos/private-events-bar-clip-approved-v1.mp4`: intervalo `00:01.000–00:06.000` del candidato v2, 5.000 s, 1920×1080, 30 fps y sin audio. Se reserva para el montaje total de Private Events; no reutilizar los segundos descartados `0–1` ni `6–8`.
- **Servidor local habitual:** `http://127.0.0.1:3400/`; desde el móvil usar únicamente la URL `Wi-Fi:` que imprime `npm run dev`.

---

## 0. Arranque en 30 segundos

```bash
cd "C:\Users\no\Documents\ChatGPT\el alteno website\el-alteno-integration-test\el-alteno"
npm run dev          # imprime las URLs Local y Wi-Fi; escucha en la LAN
```

- **Worktree canónico de esta revisión:** `C:\Users\no\Documents\ChatGPT\el alteno website\el-alteno-integration-test`
- **Rama de trabajo:** `codex/site-integration-preview` — no cambiar a `master` para revisar estos cambios
- **Raíz de la aplicación:** `C:\Users\no\Documents\ChatGPT\el alteno website\el-alteno-integration-test\el-alteno`
- La app Next.js vive en la subcarpeta `el-alteno/`, **no en la raíz del repo**
- `master` permanece intacta; no hacer push desde esta revisión sin solicitar el PR explícitamente
- Producción: https://web-production-004ee.up.railway.app (sirve `master` = `a190c4d`)

**Para revisar en el teléfono** (mismo Wi-Fi): ejecuta `npm run dev` y abre la URL que el comando imprime como `Wi-Fi:`. El script escucha en `0.0.0.0` y `next.config.ts` descubre automáticamente las IPv4 LAN para `allowedDevOrigins`; no hay que editar una IP cuando DHCP la cambie.

---

## 1. Qué es este proyecto

Sitio web de **El Alteño**, restaurante mexicano en 323 Main St, Watsonville, California.
Lo desarrolla un contratista (el usuario) para el restaurante. **No es su propio negocio.**

**Por qué existe:** DoorDash ofreció destacar al restaurante en su plataforma una vez tuviera sitio web. Objetivo secundario: captar reservas de eventos privados, su servicio más rentable.

| Dato | Valor |
|---|---|
| Dirección | 323 Main St, Watsonville, CA 95076 |
| Teléfono | (831) 768-9876 |
| Horario de esta revisión | Lunes, miércoles–sábado y domingo 11:00–20:00 · **martes cerrado** |
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
| `feat/consolidate-menu-assets` | ver abajo | todo el trabajo desde el flyer | **PR #2 abierto** |

Los 17 commits que llegaron a `master` con el merge del PR #2, del más reciente al más antiguo:

```
786b1c5  chore(dev): allow the LAN origin so the site can be reviewed on a phone
c948c27  chore: drop the light-mode comparison route
da3647e  fix(theme): lower the surface a phone actually shows, and let cards read
6f20727  feat(theme): rebuild the light theme as warm paper, readable in both
42a2962  fix(images): replace the deprecated priority prop, and stop preloading a backdrop
8fafc1d  fix(mobile): stop the iOS zoom trap and size every tap target
d39a4b9  feat(footer): payment marks, stronger delivery buttons, build credit
2e707a0  feat(menu): scale dish names and descriptions by 1.5x
c9cc664  chore(assets): add the August 2026 flyer and the new logo master
dd04d45  docs: version the handoff and bring it up to date
ed69146  fix(menu): make the printed-menu rows legible in light theme
5e6052f  chore(images): convert about/ assets to WebP, sized to their render slots
1533508  fix(hero): stop translating the per-flag greeting
f2c7bba  feat(menu): replace stock photography with printed-menu rows
acad2cc  feat(menu): add 11 dish photos and correct three misassigned images
7721779  feat: refine mobile hero and story section
bdf2ce9  chore(images): convert approved assets to WebP
```

✅ **Producción está al día** desde el 2026-08-29. El merge del PR #2 disparó el despliegue automático de Railway y quedó verificado en el sitio en vivo: cero referencias a Unsplash en ambas páginas, la foto de carne ya no ilustra el platillo vegetariano, el beige nuevo sirviéndose, cero controles bajo el mínimo táctil, cero campos que disparen el zoom de iOS, cero imágenes rotas y cero errores de consola.

Contraste medido **en producción**, dentro de la tarjeta en modo claro: nombre 11.48:1 · descripción 5.93:1 · precio 5.85:1. Coincide con lo medido en local.

**Sobre PR #1:** GitHub lo marcó como *merged* por su cuenta al detectar que su commit `bdf2ce9` había llegado a `master` dentro del #2. No hizo falta cerrarlo a mano.

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

**Paso 4 · Publicar y desplegar** 🟡 **PR #2 abierto, falta mergear**
Rama publicada y PR #2 abierto hacia `master`. Contiene también los commits de PR #1 y de `review/live-sections`, así que al mergearlo ambos quedan absorbidos; PR #1 se cierra sin mergear.

**Paso 5 · Correcciones sobre el sitio vivo** ✅ **hecho**
Texto de platillos a 1.5× (17 px en descripciones, recorte a 4 líneas), pie con marcas de pago y autoría, paleta clara rehecha en beige, optimización móvil, y navegación (§6b).

---

## 6b. La paleta clara, y por qué es así

Vale la pena leer esto antes de tocar colores, porque hay dos reglas que no son obvias.

**Se mide la TARJETA, no la página.** En un teléfono las tarjetas de platillo cubren casi todo el viewport. Un primer intento bajó el fondo de página a `#EDE2CE` y reportó «−17 % de brillo», pero dejó la tarjeta en `#F7F0E2` —87.6 %, apenas por debajo del crema original— y la pantalla siguió deslumbrando. Hoy la tarjeta está en **68 %** y la página en **54 %**.

**La página es más oscura que la tarjeta, a propósito**, para que las tarjetas se lean como objetos. Esa diferencia es de 1.24:1, que por sí sola es sutil, así que `--border` lleva un alfa más alto de lo normal (0.22) para dibujar el canto.

**Cualquier superficie oscura en AMBOS temas** —el pie, la ventana de detalle del platillo— **no puede leer `--muted-foreground` ni `--accent`**, porque ahora contienen tinta oscura pensada para beige. Esas superficies toman la paleta oscura de forma literal.

El mostaza `#C99A3F` da 2.0:1 sobre beige y el terracota de marca `#C65D3B` da 2.3:1: ninguno sirve como texto en claro. El token `accent` resuelve a un terracota profundo en claro y a mostaza en oscuro, así que **usa `text-accent`, no literales**. El valor de marca se reserva para modo oscuro y para botones de relleno sólido, donde el blanco va encima.

Contrastes actuales dentro de la tarjeta en claro: nombre 11.5:1 · descripción 5.9:1 · precio 5.9:1.

### Hallazgos abiertos

| | Qué | Dónde |
|---|---|---|
| 🟡 | **Colores de marca bajo AA**, iguales en ambos temas: blanco sobre el rojo DoorDash `#FF3008` da **3.7:1** y blanco sobre terracota **4.17:1**. Son los colores propios de esas empresas — requiere decisión del cliente, no una edición silenciosa | `Footer.tsx` · botones primarios |
| 🟡 | Las **notas de categoría** (`note` / `noteEs` en `menu.ts`: «Flour tortilla, rice, beans…», el horario de Lunch Specials) existen en los datos pero **no se muestran en ninguna de las dos vistas** | `MenuTabs.tsx` · `menu/page.tsx` |
| 🟡 | La sección de ubicación **repite** los medios de pago como fichas de texto, duplicando lo que el pie ya muestra con marcas | `Location.tsx` |
| 🟡 | Las marcas de pago son **dibujos simplificados, no el arte oficial**. Las seis empresas publican sus archivos con reglas de uso | `layout/PaymentMarks.tsx` |
| 🟡 | 2 errores de lint **preexistentes** (`setState` dentro de `useEffect`) y 1 warning de import sin usar | `LanguageContext.tsx:22` · `ThemeContext.tsx:20` · `Location.tsx:4` |
| 🟡 | `el-alteno/public/images/dishes/burrito.jpeg` está sin versionar y sin asignar. **Mirar la foto antes de asignarla** — tres asignaciones por nombre de archivo ya resultaron falsas | — |

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

**Regla permanente de revisión por Wi-Fi.** Nunca abras desde el móvil `127.0.0.1` o `localhost`: esas direcciones apuntan al propio teléfono. Ejecuta `npm run dev` dentro de `el-alteno`, usa la URL `Wi-Fi:` que imprime, y conecta ambos dispositivos a la misma red no-guest. El script siempre enlaza `0.0.0.0`; `next.config.ts` agrega automáticamente las IPv4 LAN actuales a `allowedDevOrigins`, evitando el 403 de los recursos de desarrollo cuando cambia DHCP. Si el teléfono recibe HTML pero no interacción, reinicia el servidor después de cambiar de red. Si no conecta nada, la causa está fuera de Next: red guest/aislamiento de clientes o firewall de Windows.

**Medir contraste justo después de cambiar de tema da valores falsos.** El `body` tiene `transition-colors duration-300`, así que `getComputedStyle` devuelve colores interpolados a mitad de camino. Una auditoría así reportó 49 fallos inexistentes en modo oscuro. **Cargar cada tema de cero** (`localStorage.setItem('theme', …)` + recarga) en vez de pulsar el conmutador.

**`oklab()` y `lab()` rompen los parseadores de color caseros.** Chrome devuelve esos formatos cuando hay opacidad, y una expresión regular de dígitos los interpreta como casi negro, produciendo falsos fallos de contraste. Componer el color en un `<canvas>` deja que el motor lo resuelva, sea cual sea el formato.

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
2. ~~Reemplazar el iframe de Google Maps~~ — **verificado el 2026-08-28: no es un placeholder**, apunta a coordenadas reales de Watsonville (36.9099, −121.7595). Notas anteriores que decían lo contrario estaban equivocadas
3. **Root Directory = `el-alteno`** en la plataforma de hosting. No está en el código; vive en el dashboard. Sin eso el build falla al instante
4. `npm run build` en verde
5. Revisado a 375 px y 1440 px, en ambos idiomas y ambos temas

---

## 12. Cómo empezar la siguiente sesión

Cinco minutos de arranque, en este orden:

```bash
cd "C:\Users\no\Documents\ChatGPT\el alteno website\el-alteno-integration-test\el-alteno"
npm install          # solo la primera vez en una máquina nueva
npm run dev          # → http://localhost:3000
npm run build        # confirma que la base está sana antes de tocar nada
```

Luego, antes de escribir código:

1. **Lee §2** (la regla del menú) y **§6b** (las dos reglas no obvias de la paleta). Son las dos cosas que más caro han costado.
2. **Mira §8.** Son diez trampas reales de este entorno, cada una con horas detrás. Las tres más recientes son de medición: una pestaña vieja sirve CSS viejo, medir contraste tras cambiar de tema da valores interpolados, y el servidor de desarrollo bloquea el móvil por origen cruzado.
3. **Comprueba el estado real** antes de afirmar nada: `git status`, `gh pr view 2`, y el sitio en vivo. Producción y la rama llevan meses divergiendo.

### El siguiente paso del proyecto

**Confirmar `NEXT_PUBLIC_FORMSPREE_ID` en Railway.** Es lo único que queda entre una reserva de evento y la nada, y es lo único que falla **en silencio**: sin esa variable el formulario no envía y el visitante cree que reservó. No se puede verificar desde el código — hay que abrir el dashboard de Railway, y luego **enviar el formulario de verdad y comprobar que llega el correo**.

Eso es lo único urgente. El despliegue del 2026-08-29 ya resolvió lo que estaba mal en el sitio público: la foto de carne sobre el platillo vegetariano, los 65 platillos con comida de otro restaurante junto a precios reales, los precios ilegibles en modo claro y el zoom del formulario en iPhone.

### Lo que sigue, por prioridad

| Prioridad | Qué |
|---|---|
| Alta | Confirmar `NEXT_PUBLIC_FORMSPREE_ID` en Railway y enviar el formulario de verdad (arriba) |
| Alta | Decidir sobre los **colores de marca bajo AA** (§6) — es decisión del cliente, no una edición técnica |
| Alta | `chavela.png`, 2.2 MB en línea (§5) — bloqueado por revisión de marcas de terceros |
| Media | Arte oficial de las marcas de pago, en vez de los dibujos simplificados |
| Media | Mostrar las **notas de categoría** que ya existen en los datos y no se renderizan |
| Media | Quitar el bloque de pagos duplicado en Ubicación |
| Baja | Dominio propio (`elalteno.restaurant`), generar el QR hacia `/menu`, y enviar la URL a DoorDash |

Sigue bloqueado por el restaurante todo lo de §7 — sobre todo el precio de la Mojarra Frita y la contradicción del horario de Lunch Specials.

---

## 13. Componentes propios que conviene conocer

| Componente | Qué resuelve |
|---|---|
| `ui/ScrollStrip.tsx` | Tira horizontal que **admite que se desplaza**. Difumina el borde por donde continúa, dibuja una barra que muestra cuánto estás viendo, y la primera vez que entra en pantalla se desplaza y vuelve. Ese último gesto se salta con `prefers-reduced-motion`. Lo usan las pestañas del menú y los anclajes del QR |
| `ui/ScrollGuide.tsx` | Invitación a bajar del Hero (línea con una luz que cae, y es un enlace real a `#about`) más un raíl fino a la izquierda que se llena durante el recorrido de descubrimiento y se retira al terminar Cócteles, justo antes de la petición de reserva |
| `layout/PaymentMarks.tsx` | Marcas de pago y reparto en SVG en línea, sin depender de terceros. **No son el arte oficial** |
| `menu/MenuListRow.tsx` | Renglón de carta impresa para los 65 platillos sin fotografía propia |

**Orden de secciones** (2026-08-28): Hero → About → Menú → **Cócteles → Eventos** → Ubicación. Cócteles se lee como parte del menú; Eventos es la petición de reserva y va después de haber visto la comida.
