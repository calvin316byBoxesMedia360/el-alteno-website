# Próxima sesión / siguiente acción

## Punto exacto

El video ya fue generado y está integrado localmente. El siguiente checkpoint es revisión visual del sitio completo; todavía no hay push ni PR.

## Continuación segura

Desde `C:\Users\no\Documents\ChatGPT\el alteno website\el-alteno-cocktails-test\el-alteno`:

```powershell
npx eslint src/components/sections/Cocktails.tsx
npx tsc --noEmit
higgsfield account status
```

El video generado ya costó 90 créditos. Para continuar la revisión local:

```powershell
npm run dev -- --port 3300
```

El comando imprime las URLs `Local:` y `Wi-Fi:`. Revisa `http://127.0.0.1:3300/#cocktails` y, por Wi‑Fi, usa exactamente la URL `Wi-Fi:` impresa (nunca `127.0.0.1` desde el teléfono). Comprueba rostro, manos, cubeta Pacífico, transición, crop móvil, textos EN/ES y reduced-motion.

## Después del video

1. Confirmar la revisión local y corregir solo defectos visuales reales.
2. Ejecutar `npx eslint`, `npx tsc --noEmit`, `npm run build` y pruebas visuales en desktop, móvil y Wi‑Fi.
3. Actualizar `STATE.md`, `task.md` y `walkthrough.md` con el commit final.
4. Push únicamente de `codex/cocktail-replacements` y abrir PR a `master`.
