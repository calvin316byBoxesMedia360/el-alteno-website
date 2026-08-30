# Próxima sesión / siguiente acción

## Estado actual — revisión del menú 2026-08-30

- Rama activa: `codex/menu-revision-2026-08-30`, creada desde el `master` verificado en `a3f2b646`.
- Fuente conciliada: `MENU-SOURCE.md` y `docs/memory/MENU-REVISION-2026-08-30.md`.
- Implementados: precios autorizados, altas y bajas de platillos, correcciones bilingües, categoría `Caldos / Soups`, aviso informativo de desayuno y horario dominical de `9:00 AM – 8:00 PM`.
- Decisión final: `Caldo de Birria de Chivo / Goat Birria Soup`, `$18.99`, categoría `soups`, disponible sólo los fines de semana.
- Validación: contrato del menú 5/5, ESLint, TypeScript y build de producción aprobados.
- No empujar directamente a `master`; el flujo seguro sigue siendo rama → PR → revisión → merge autorizado.

## Siguiente tarea técnica — optimizar video

- Fuente aprobada: `el-alteno/public/videos/private-events-walkthrough-master-v1.mp4`.
- Tamaño actual: `51,338,395 bytes` (aprox. 49 MB binarios / 51.3 MB decimales).
- Conservar el maestro sin sobrescribirlo.
- Crear una versión web H.264 con `faststart`, sin audio, objetivo aproximado de 15–20 MB para 1080p.
- Crear una variante móvil 720p, objetivo aproximado de 8–12 MB.
- Comparar calidad visual, continuidad del loop, pausa/reanudación y solicitudes HTTP Range antes de reemplazar la referencia del componente.

## Relanzamiento local y Wi-Fi

Desde `C:\Users\no\Documents\ChatGPT\el alteno website\el-alteno-integration-test\el-alteno`:

```powershell
npm run dev -- --port 3400
```

- Local: `http://127.0.0.1:3400/`.
- Móvil: usar exactamente la URL `Wi-Fi:` impresa al arrancar; nunca `127.0.0.1` desde el teléfono.
- Si cambia la red, el hotspot o la IP, reiniciar el servidor. `allowedDevOrigins` se calcula al inicio y una IP nueva puede cargar HTML pero bloquear recursos de Next.js.

## Protección de alcance

- La app está en `el-alteno/`; cualquier hosting requiere `Root Directory = el-alteno`.
- El menú no se edita a mano libre: `MENU-SOURCE.md` es la fuente de verdad.
- Los archivos sin seguimiento de `public/images/local_para_eventos/` y los videos candidatos no pertenecen al commit del menú; no usar `git add .`.
