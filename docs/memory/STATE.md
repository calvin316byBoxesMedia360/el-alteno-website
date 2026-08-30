# Estado actual

**Proyecto:** El Alteño restaurant website  
**Rama:** `codex/menu-cta-content-polish`  
**Worktree:** `C:\Users\no\Documents\ChatGPT\el alteno website\el-alteno-integration-test`  
**App:** `el-alteno/`  
**Base:** `origin/master` en `b7b35d2` al crear la rama.

## Completado previamente

- Diseño aprobado para la sección de bebidas.
- Plan detallado y handoff de la iteración registrados en `docs/plans/`.
- Cuatro imágenes nuevas convertidas a WebP y revisadas visualmente: `cantarito.webp`, `paloma.webp`, `chavela.webp`, `bar-service-poster.webp`.
- `Cocktails.tsx` ya apunta a Cantarito, Paloma y Chavela; Paloma reemplaza Sunrise.
- Descripciones bilingües actualizadas sin precios ni recetas no confirmadas.
- Badges comerciales no respaldados retirados.
- Assets antiguos sin referencias eliminados: `cantarito.jpg`, `sunrise.webp`, `chavela.png`.
- `npm install`, ESLint focalizado y `npx tsc --noEmit` pasaron después del cambio de tarjetas.
- Higgsfield autenticado; catálogo y schema de `seedance_2_5` verificados.

## Completado en esta sesión

- Plan de diseño e implementación registrado en `docs/plans/2026-08-30-menu-cta-content-design.md` y `docs/plans/2026-08-30-menu-cta-content-implementation.md`.
- CTA telefónica de Private Events convertida en enlace `tel:` completo, bilingüe, accesible y con glass blur.
- Mariscada actualizada con mejillones, patas de cangrejo y camarones; Huachinango actualizado con frijoles en ambas fuentes.
- Footer corregido para reflejar martes cerrado, consistente con la sección de ubicación.
- Imagen editada de Carne Asada creada como `public/images/dishes/carne-asada-clean.png`, retirando únicamente el sope/tostada ajeno.
- ESLint focalizado, TypeScript y build de producción pasaron.
- Commit de documentación previo: `84fa1e5 docs: plan menu CTA and content polish`.
- Commit de implementación: `a766c41 feat: polish menu content and event phone CTA`.
- Primer clip audiovisual del patio enviado a Seedance 2.5; permanece en procesamiento para revisión antes de generar el siguiente.
- Corrección de flujo audiovisual: la imagen base decorada debe aprobarse antes de animar. Candidato GPT Image 2: `public/images/local_para_eventos/patio-event-base-v1.png`.
- Anclaje final generado con GPT Image 2: `public/images/local_para_eventos/fuente-event-end-v1.png`, conservando la fuente real y adaptando el decorado a la guía negra/blanca/plata.
- Recorrido de 12 s enviado a Seedance 2.5 con `patio-event-base-v1.png` como inicio y `fuente-event-end-v1.png` como last frame; pendiente de resultado y revisión visual.
- Anclaje final actualizado a `public/images/local_para_eventos/fuente-event-end-v2.png`: horizontal 16:9, puertas ligeramente entreabiertas y acabado negro mejorado. El recorrido anterior queda descartado.
- La inserción final será una tarjeta de Private Events basada en `BarFeatureVideo`, con `aspect-video` en desktop y móvil para preservar el encuadre horizontal.

## Pendiente

- Crear el commit de implementación de esta unidad, sin incluir todavía `public/images/local_para_eventos/`.
- Revisar CTA y menú en local, desktop, móvil y Wi‑Fi.
- Preparar la primera generación audiovisual del patio con guía fija: golden hour, graduación consistente y cuatro clips modulares.
- Integrar después los recursos aprobados de `local_para_eventos/` y abrir PR hacia `master`; no hacer push directo a `master`.

## Seguridad de despliegue

No se ha hecho push de esta rama. `master` no se ha tocado. El PR #4 de hero/mobile permanece separado.

La revisión por Wi‑Fi queda automatizada: `npm run dev` ejecuta `scripts/dev-wifi.mjs`, escucha en `0.0.0.0`, imprime la URL `Wi-Fi:` y `next.config.ts` descubre las IPv4 LAN actuales para `allowedDevOrigins`. Desde el móvil nunca usar `localhost` ni `127.0.0.1`; ambos dispositivos deben estar en la misma red no-guest.
