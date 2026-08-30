# Estado actual

**Proyecto:** El Alteño restaurant website  
**Rama:** `codex/cocktail-replacements`  
**Worktree:** `C:\Users\no\Documents\ChatGPT\el alteno website\el-alteno-cocktails-test`  
**App:** `el-alteno/`  
**Base:** `origin/master` en `b7b35d2` al crear la rama.

## Completado

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

- Costo Seedance 2.5: 90 créditos; generación ejecutada con autorización.
- `public/videos/bar-service.mp4` generado, revisado y optimizado para web: 10.04 s, 1280×720, 1.28 MB, silencioso. El master generado fue 1920×1080.
- `BarFeatureVideo.tsx` integrado antes del grid, con poster, overlay localizado y `useReducedMotion`.
- ESLint focalizado, TypeScript y build de producción pasaron.

## Pendiente

- Revisar la sección completa en local, desktop, móvil y Wi‑Fi.
- Confirmar aceptación visual final del video integrado.
- Actualizar walkthrough final y abrir PR independiente hacia `master`.

## Seguridad de despliegue

No se ha hecho push de esta rama. `master` no se ha tocado. El PR #4 de hero/mobile permanece separado.

La revisión por Wi‑Fi queda automatizada: `npm run dev` ejecuta `scripts/dev-wifi.mjs`, escucha en `0.0.0.0`, imprime la URL `Wi-Fi:` y `next.config.ts` descubre las IPv4 LAN actuales para `allowedDevOrigins`. Desde el móvil nunca usar `localhost` ni `127.0.0.1`; ambos dispositivos deben estar en la misma red no-guest.
