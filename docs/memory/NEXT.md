# Próxima sesión / siguiente acción

## Punto exacto

La CTA de Private Events y las correcciones de contenido están implementadas en `codex/menu-cta-content-polish`. La imagen corregida de Carne Asada está lista y aprobada. Hay dos anclajes audiovisuales locales: `patio-event-base-v1.png` (inicio) y `fuente-event-end-v1.png` (last frame). El recorrido de 12 s está en procesamiento; todavía no hay push ni PR de esta unidad.

## Continuación segura

Desde `C:\Users\no\Documents\ChatGPT\el alteno website\el-alteno-integration-test\el-alteno`:

```powershell
npx eslint src/components/sections/Cocktails.tsx
npx tsc --noEmit
higgsfield account status
```

El video generado ya costó 90 créditos. Para continuar la revisión local:

```powershell
npm run dev -- --port 3400
```

El comando imprime las URLs `Local:` y `Wi-Fi:`. Revisa `http://127.0.0.1:3400/` y, por Wi‑Fi, usa exactamente la URL `Wi-Fi:` impresa (nunca `127.0.0.1` desde el teléfono). Comprueba CTA `tel:`, textos EN/ES, martes cerrado y la imagen de Carne Asada.

## Después del checkpoint actual

1. Confirmar la revisión local y corregir solo defectos visuales reales.
2. Crear commit enfocado de menú/CTA/imagen; no añadir la carpeta de eventos aún.
3. Revisar el recorrido Seedance 2.5: inserts de mesas, continuidad espacial, llegada a la fuente y estabilidad del last frame.
4. Integrar recursos audiovisuales aprobados, actualizar memoria y abrir PR desde la rama de trabajo hacia `master`.
