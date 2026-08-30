# Contrato de sistema // producción audiovisual de Private Events

## 1. Orden narrativo

El orden contractual del maestro v1 es:

```text
Entrada → Salón → Bar → Patio
```

No cambiar el orden sin una nueva aprobación explícita.

## 2. Fuentes aprobadas

| Módulo | Archivo | Duración fuente | SHA-256 |
|---|---|---:|---|
| Entrada | `private-events-entrance-intro-v1.mp4` | 5.875 s | `87D8401889A3747CC131B0F4E237F966FEBC3E111AC4F082509C4C157D36E3B6` |
| Salón | `private-events-salon-walkthrough-v2.mp4` | 8.000 s | `276EF76D2CBF8C28AAE0AAD4BF20EFCBF35E477A0F2496D4D642C726D492D3BD` |
| Bar | `private-events-bar-clip-approved-v1.mp4` | 5.000 s | `D1AECA33298CA06BA6B3BE704BF22A1A36CB8EAEC77A6E90CAE5B09FDF630190` |
| Patio | `private-events-patio-walkthrough-v3.mp4` | 11.000 s | `C4FB50AB8354E2179DD833F1E6D582325DC36A2048054CF21213874408F1BF13` |

## 3. Normalización

Para cada clip `i`:

```text
scale = fit(source_i, 1920×1080)
pad   = center(scale, 1920×1080, black)
fps   = 30
sar   = 1
pixel = yuv420p
audio = ∅
```

No estirar una fuente para llenar el lienzo. Se permite padding centrado si la relación difiere.

## 4. Duración y fotogramas

La conversión de Entrada a 30 fps produce 176 fotogramas. Los demás módulos producen 240, 150 y 330:

```text
F_total = 176 + 240 + 150 + 330 = 896 frames
T_total = F_total / 30 = 29.866666… s
```

La duración verificada del maestro debe ser `29.866667 s` con tolerancia máxima de un fotograma (`±0.033334 s`).

## 5. Salida maestra

```text
path: public/videos/private-events-walkthrough-master-v1.mp4
codec: H.264
resolution: 1920×1080
fps: 30/1
pixel format: yuv420p
audio streams: 0
movflags: +faststart
SHA-256: 96C301AD729F6DD4050DDE5FA558B60D387B26E900DCAA260B5C881F772F9EFC
```

## 6. Encoder

Preferencia:

1. NVIDIA `h264_nvenc` sobre la RTX 5070 Ti.
2. `libx264` como fallback explícito.

La selección automática debe ejecutar un frame de prueba compatible. No usar 128×128: esta GPU rechazó esa dimensión mínima; 256×256 fue validado.

## 7. Manifiesto y seguridad

- El manifiesto es [`el-alteno/video/private-events-manifest.json`](../../../el-alteno/video/private-events-manifest.json).
- Cada ID debe ser único.
- Estados permitidos: `pending`, `approved`.
- `render` falla si un módulo requerido no está aprobado o no existe.
- Toda ruta debe resolver dentro de `el-alteno/`.
- Los temporales viven fuera del repo y se eliminan en `finally`.
- Los previews terminados en `-preview-local.mp4` están ignorados por Git.
- Los archivos fuente nunca se sobrescriben.

## 8. Reglas comerciales y de despliegue

- No tocar precios ni contenido del menú fuera de `MENU-SOURCE.md`.
- La app vive en `el-alteno/`; hosting requiere `Root Directory = el-alteno`.
- Railway despliega cada push a `master`; sólo integrar mediante PR aprobado.
- El maestro permanece silencioso hasta una fase separada de audio/licencias.
- No activar el maestro en la UI antes de revisión visual desktop/móvil.

