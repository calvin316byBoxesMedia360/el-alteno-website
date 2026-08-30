# Próxima sesión / siguiente acción

## Punto exacto

La CTA de Private Events y las correcciones de contenido están implementadas en `codex/menu-cta-content-polish`. La imagen corregida de Carne Asada está lista y aprobada. El recorrido `private-events-patio-walkthrough-v3.mp4` está aprobado y activo en la tarjeta. El clip maestro del bar también está aprobado como `public/videos/private-events-bar-clip-approved-v1.mp4`: 5.000 s, 1920×1080, silencioso; corresponde exclusivamente a `00:01.000–00:06.000` del candidato v2 y queda reservado para el montaje audiovisual total.

## Continuación segura

Desde `C:\Users\no\Documents\ChatGPT\el alteno website\el-alteno-integration-test\el-alteno`:

```powershell
npx eslint src/components/sections/Cocktails.tsx
npx tsc --noEmit
npm run test:video
npm run video:private-events:check
```

El pipeline local usa FFmpeg 9.0.1 y la RTX 5070 Ti mediante `h264_nvenc`. `npm run video:private-events:preview` crea un montaje parcial sólo con módulos aprobados; `npm run video:private-events` se niega a crear el maestro mientras Entrada o Salón estén pendientes. El maestro permanece silencioso.

El video generado ya costó 90 créditos. La versión editada está en `public/videos/private-events-patio-walkthrough-v2.mp4` (11 s, 1920×1080, silenciosa). Para continuar la revisión local:

```powershell
npm run dev -- --port 3400
```

El comando imprime las URLs `Local:` y `Wi-Fi:`. Revisa `http://127.0.0.1:3400/` y, por Wi‑Fi, usa exactamente la URL `Wi-Fi:` impresa (nunca `127.0.0.1` desde el teléfono). Comprueba CTA `tel:`, textos EN/ES, martes cerrado y la imagen de Carne Asada.

## Después del checkpoint actual

1. Confirmar la revisión local y corregir sólo defectos visuales reales.
2. Revisar en local la tarjeta activa con `v3`.
3. Aprobar visualmente el set recomendado del salón. En el bar ya están aprobados `bar-candidate-02-service-v3.png` y `bar-candidate-03-cocktails.png`; este último incorpora al bartender real.
4. Preparar y aprobar los clips de Salón y Entrada; después cambiar únicamente sus estados/rutas en `el-alteno/video/private-events-manifest.json`.
5. Incorporar sólo los candidatos aprobados al UI; el clip del bar no debe mostrarse aislado salvo nueva decisión del usuario.
6. Ejecutar `npm run video:private-events` para producir el maestro silencioso cuando los cuatro módulos estén aprobados; después abrir PR desde `codex/menu-cta-content-polish` hacia `master`, nunca hacer push directo a `master`.
