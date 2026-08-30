# Registro audiovisual aprobado

Este archivo es el índice corto para retomar producción sin releer conversaciones extensas. Sólo enumera activos aprobados y reglas de montaje vigentes.

## Patio

| Campo | Valor |
|---|---|
| Activo | `el-alteno/public/videos/private-events-patio-walkthrough-v3.mp4` |
| Estado | Aprobado y activo en la tarjeta de Private Events |
| Uso | Clip de patio del recorrido total; también se muestra en su tarjeta actual |
| Rasgo final | Logo centrado con aparición sutil durante los últimos 2 s |

## Bar

| Campo | Valor |
|---|---|
| Maestro | `el-alteno/public/videos/private-events-bar-clip-approved-v1.mp4` |
| Estado | Aprobado para el montaje audiovisual total de Private Events |
| Fuente de edición | `bar-service-cocktails-8s-candidate-v2.mp4` |
| Intervalo conservado | `00:01.000–00:06.000` |
| Intervalos descartados | `00:00.000–00:01.000` y `00:06.000–00:08.067` |
| Duración | `5.000 s` |
| Formato | H.264 · 1920×1080 · 30 fps · yuv420p · sin audio |
| Tamaño | `3,434,710 bytes` |
| SHA-256 | `D1AECA33298CA06BA6B3BE704BF22A1A36CB8EAEC77A6E90CAE5B09FDF630190` |
| Uso | Insertar como módulo de bar en el recorrido total; no integrarlo aislado en la UI salvo nueva aprobación |

### Regla de recuperación

Los candidatos `bar-service-cocktails-8s-candidate-v1.mp4` y `bar-service-cocktails-8s-candidate-v2.mp4` permanecen como respaldos locales, pero no forman parte del activo aprobado ni deben añadirse al commit. No regenerar ni extender el maestro del bar sin una solicitud nueva.

## Próximos módulos del recorrido total

- Salón: imágenes candidatas listas; falta aprobación definitiva y generación del clip.
- Entrada: falta preparar anclajes y clip.
- Ensamble: realizar únicamente cuando entrada y salón estén aprobados; combinar entonces entrada, salón, bar y patio.

## Política de producción local

- Equipo confirmado: ROG Strix 18 con NVIDIA GeForce RTX 5070 Ti Laptop GPU y 12,227 MiB de VRAM.
- Ejecutar localmente recortes, concatenación, transiciones, overlays, logo, reencuadre, compresión y render maestro. Estas operaciones no requieren créditos de generación.
- Reservar Higgsfield/Seedance para metraje nuevo producido con IA.
- Entorno confirmado al 2026-08-30: FFmpeg/FFprobe `9.0.1-full_build-www.gyan.dev`; `h264_nvenc` inicializa correctamente sobre la RTX 5070 Ti.
- Manifiesto: `el-alteno/video/private-events-manifest.json`.
- `npm run video:private-events:check`: valida herramientas, archivos y estados.
- `npm run video:private-events:preview`: ensambla sólo módulos aprobados en un archivo local ignorado por Git.
- `npm run video:private-events`: genera el maestro únicamente cuando todos los módulos requeridos estén aprobados.
- Prueba real: preview Bar → Patio de `16.000 s`, H.264, 1920×1080, 30 fps y sin pistas de audio.
