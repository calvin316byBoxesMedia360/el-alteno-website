# Próxima sesión / siguiente acción

## Punto exacto

La CTA de Private Events y las correcciones de contenido están implementadas en `codex/menu-cta-content-polish`. La imagen corregida de Carne Asada está lista y aprobada. Hay dos anclajes audiovisuales locales: `patio-event-base-v1.png` (inicio) y `fuente-event-end-v2.png` (last frame). El recorrido `private-events-patio-walkthrough-v3.mp4` está aprobado y activo en la tarjeta, con FX de logo en los últimos 2 s.

## Continuación segura

Desde `C:\Users\no\Documents\ChatGPT\el alteno website\el-alteno-integration-test\el-alteno`:

```powershell
npx eslint src/components/sections/Cocktails.tsx
npx tsc --noEmit
higgsfield account status
```

El video generado ya costó 90 créditos. La versión editada está en `public/videos/private-events-patio-walkthrough-v2.mp4` (11 s, 1920×1080, silenciosa). Para continuar la revisión local:

```powershell
npm run dev -- --port 3400
```

El comando imprime las URLs `Local:` y `Wi-Fi:`. Revisa `http://127.0.0.1:3400/` y, por Wi‑Fi, usa exactamente la URL `Wi-Fi:` impresa (nunca `127.0.0.1` desde el teléfono). Comprueba CTA `tel:`, textos EN/ES, martes cerrado y la imagen de Carne Asada.

## Después del checkpoint actual

1. Confirmar la revisión local y corregir sólo defectos visuales reales.
2. Revisar en local la tarjeta activa con `v3`.
3. Aprobar visualmente el set recomendado del salón y el set de tres roles del bar, incluyendo `bar-candidate-02-service-v2.png` como reemplazo de la toma de servicio.
4. Incorporar sólo los candidatos aprobados al UI; después preparar videos únicamente si aportan valor.
5. Crear commit enfocado y abrir PR desde `codex/menu-cta-content-polish` hacia `master`; no hacer push directo a `master`.
