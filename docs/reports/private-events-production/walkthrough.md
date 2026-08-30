# Walkthrough // El Alteño · producción y montaje audiovisual

## Resultado

Se produjo un maestro silencioso y reproducible de Private Events:

`Entrada → Salón → Bar → Patio`

- Archivo: [`private-events-walkthrough-master-v1.mp4`](../../../el-alteno/public/videos/private-events-walkthrough-master-v1.mp4)
- Duración: `29.866667 s`
- Fotogramas: `896`
- Formato: H.264, 1920×1080, 30 fps, yuv420p, sin audio
- SHA-256: `96C301AD729F6DD4050DDE5FA558B60D387B26E900DCAA260B5C881F772F9EFC`

## Qué cambió en el sitio

La rama consolidó una ronda amplia de UX y contenido:

- Hero móvil separado de la tarjeta inferior y libre de la barra fija.
- Logo transparente en navegación, enlaces funcionales de reparto y composición móvil más legible.
- Tarjeta de tortillas hechas a mano con video silencioso.
- Cócteles actualizados a Cantarito, Paloma y Chavela, sin precios ni recetas inventadas.
- Navegación glass, carruseles con señales visuales, anclas con offset y mapa a color.
- CTA telefónica glass, bilingüe y accesible en Private Events.
- Mariscada, Huachinango, Carne Asada, horario de martes y bloques duplicados corregidos.
- Tarjeta de patio integrada en Private Events mediante [`EventFeatureVideo.tsx`](../../../el-alteno/src/components/ui/EventFeatureVideo.tsx).

## Pipeline Higgsfield y generación

### Imágenes

- GPT Image 2 se usó para anclas del patio, fuente, limpieza de espacios, guía de graduación y candidatos de bar/salón.
- El bartender real se incorporó con inpainting no destructivo; se preservaron rostro, ropa, tatuajes, bebidas y orientación del backbar.
- Se fijó una guía visual negra, blanca y plata para evitar deriva de decoración entre generaciones.

### Video

- Seedance se empleó para movimientos generativos y recorridos de patio/bar/salón.
- MiniMax H3 se exploró en las iteraciones de tortillas y existe material de revisión del salón; los candidatos no seleccionados permanecen fuera del maestro.
- Gemini Omni Flash 1.1 se diseñó como opción de consistencia del salón, con reglas estrictas de preservación; no se atribuye como fuente del maestro sin evidencia de selección final.
- El flujo cambió de “generar todo en una solicitud” a módulos independientes, porque permite corregir una zona sin regenerar el recorrido completo.

## Iteraciones y descartes

### Tortillas

Los primeros intentos fueron rechazados por fondos rústicos. Se reescribieron prompts para una cocina cotidiana limpia, manos protagonistas y plancha grande con más tortillas. La opción aprobada quedó en [`tortillas-handmade.mp4`](../../../el-alteno/public/videos/tortillas-handmade.mp4).

### Patio

1. Se igualó la hora del día a golden hour.
2. Se generó una imagen inicial decorada y una fuente como ancla final.
3. Se corrigió la fuente a horizontal 16:9, puertas entreabiertas y negro mejorado.
4. Se eliminó el primer segundo defectuoso del render.
5. Se refinó el logo final con aparición sutil durante los últimos 2 s.
6. Resultado activo: [`private-events-patio-walkthrough-v3.mp4`](../../../el-alteno/public/videos/private-events-patio-walkthrough-v3.mp4).

### Bar

1. Se limpiaron elementos de servicio y luces quemadas en imágenes candidatas.
2. Se corrigió una composición en espejo para que el backbar quedara detrás del bartender.
3. Se sustituyó la persona generada por el bartender real.
4. El primer video terminó con un cierre negro excesivo.
5. La revisión v2 añadió una apertura con neones y un cierre limpio.
6. El usuario descartó `0–1` y `6–8`; se conservó exclusivamente `1–6`.
7. Resultado: [`private-events-bar-clip-approved-v1.mp4`](../../../el-alteno/public/videos/private-events-bar-clip-approved-v1.mp4).

### Salón

1. Se generaron cuatro candidatos fotográficos coherentes con el salón real.
2. Se probaron aperturas, cortes consistentes y material 2K.
3. La continuidad se diseñó para preservar vigas, arcos, mesas, manos y servicio.
4. El usuario pidió retirar los primeros 2 segundos del clip seleccionado.
5. Resultado: [`private-events-salon-walkthrough-v2.mp4`](../../../el-alteno/public/videos/private-events-salon-walkthrough-v2.mp4), 8 s.

### Entrada

Se añadió [`private-events-entrance-intro-v1.mp4`](../../../el-alteno/public/videos/private-events-entrance-intro-v1.mp4) como introducción. Su fuente mide 1918×1080; el pipeline la normaliza a 1920×1080 sin deformación.

## Herramientas locales

- Equipo: ROG Strix 18.
- GPU: NVIDIA GeForce RTX 5070 Ti Laptop, 12,227 MiB VRAM.
- Driver observado: 592.00.
- FFmpeg/FFprobe: `9.0.1-full_build-www.gyan.dev`.
- Encoder: `h264_nvenc`, probado con un fotograma real de 256×256 y luego con los módulos 1080p.
- Orquestación: [`private-events-video.mjs`](../../../el-alteno/scripts/private-events-video.mjs).
- Contrato: [`private-events-manifest.json`](../../../el-alteno/video/private-events-manifest.json).
- Pruebas: [`private-events-video.test.mjs`](../../../el-alteno/scripts/private-events-video.test.mjs), 7/7.

## Comandos reproducibles

```powershell
cd el-alteno
npm run test:video
npm run video:private-events:check
npm run video:private-events:preview
npm run video:private-events
```

El render final normaliza cada entrada, elimina audio, usa NVENC, concatena desde un directorio temporal, aplica `faststart`, valida con FFprobe y elimina temporales.

## Estrategia de verificación

- Pruebas unitarias para IDs duplicados, estados, rutas fuera del proyecto, audio, módulos pendientes y selección de preview.
- FFprobe para codec, dimensiones, fps, píxel, duración y ausencia de audio.
- SHA-256 para identificar el maestro exacto.
- Revisión visual final pendiente antes de conectar el maestro a la UI.
- Ningún push a `master`; ningún despliegue público durante esta fase.

