# Próxima sesión / siguiente acción

## Punto exacto

La CTA, las correcciones de contenido y los cuatro módulos audiovisuales de Private Events están implementados en `codex/menu-cta-content-polish`. El maestro silencioso `public/videos/private-events-walkthrough-master-v1.mp4` está activo en la minitarjeta: Entrada → Salón → Bar → Patio, 29.8667 s, 1920×1080, 30 fps, loop y pausa/reanudación accesible.

## Continuación segura

Desde `C:\Users\no\Documents\ChatGPT\el alteno website\el-alteno-integration-test\el-alteno`:

```powershell
npx eslint src/components/sections/Cocktails.tsx
npx tsc --noEmit
npm run test:video
npm run video:private-events:check
```

El pipeline local usa FFmpeg 9.0.1 y la RTX 5070 Ti mediante `h264_nvenc`. Los cuatro módulos ya figuran como `approved`; `npm run video:private-events` reconstruye de forma reproducible el maestro silencioso.

El video generado ya costó 90 créditos. La versión editada está en `public/videos/private-events-patio-walkthrough-v2.mp4` (11 s, 1920×1080, silenciosa). Para continuar la revisión local:

```powershell
npm run dev -- --port 3400
```

El comando imprime las URLs `Local:` y `Wi-Fi:`. Revisa `http://127.0.0.1:3400/` y, por Wi‑Fi, usa exactamente la URL `Wi-Fi:` impresa (nunca `127.0.0.1` desde el teléfono). Comprueba CTA `tel:`, textos EN/ES, martes cerrado y la imagen de Carne Asada.

## Después del checkpoint actual

1. Revisar el PR [#6](https://github.com/calvin316byBoxesMedia360/el-alteno-website/pull/6) y sus checks.
2. Fusionar únicamente con aprobación explícita: el merge a `master` activa Railway automáticamente.
3. Tras el despliegue, validar el sitio público en desktop y móvil real antes de continuar otra ronda.
4. Mantener el maestro silencioso hasta aprobar una estrategia separada de audio y licencias.
