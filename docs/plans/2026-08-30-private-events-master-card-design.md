# Diseño aprobado — minitarjeta del recorrido completo de Private Events

Fecha: 2026-08-30  
Rama: `codex/menu-cta-content-polish`  
Estado: aprobado por el usuario

## Objetivo

Incorporar el video maestro completo de Private Events como una minitarjeta editorial dentro de la columna informativa de la sección, usando la estética de la tarjeta actual del patio sin duplicar dos experiencias audiovisuales.

## Ubicación aprobada

La minitarjeta aparece exactamente entre:

1. El título `Host your celebration at El Alteño / Celebra tu evento especial en El Alteño`.
2. El párrafo que comienza `From quinceañeras to corporate dinners / Desde quinceañeras hasta cenas corporativas`.

La tarjeta actual `EventFeatureVideo` se adapta a esta ubicación compacta y deja de mostrarse después del párrafo.

## Activo

- Fuente activa: `el-alteno/public/videos/private-events-walkthrough-master-v1.mp4`.
- Video horizontal 16:9, silencioso y completo: Entrada → Salón → Bar → Patio.
- No recortar el encuadre: usar `object-contain` sobre un fondo oscuro integrado con la tarjeta.

## Interacción

- Reproducción automática, silenciosa, `playsInline` y con `loop`.
- Pausar cuando sale del viewport y reanudar al volver, sin reiniciar el tiempo.
- Control pequeño y accesible de pausa/reproducción sobre la esquina inferior derecha.
- El control debe ser sutil: vidrio oscuro, borde cálido, icono Lucide y estados de foco visibles.
- El botón no debe activar controles nativos ni cubrir contenido importante.
- Para `prefers-reduced-motion`, mostrar el poster y permitir reproducción manual mediante el mismo botón.

## Tratamiento visual

- Mantener bordes redondeados, sombra profunda, borde mostaza discreto y degradado inferior de `EventFeatureVideo`.
- Reducir el bloque de copy superpuesto a una etiqueta editorial bilingüe: `Explore Our Spaces / Conoce Nuestros Espacios`.
- Evitar un segundo titular grande que compita con el encabezado de la sección.
- Relación 16:9 en móvil y desktop; ancho completo dentro de la columna izquierda.
- Espaciado compacto para funcionar como transición visual entre título y párrafo.

## Pulido final aprobado

- Conservar únicamente la etiqueta `Explore Our Spaces / Conoce Nuestros Espacios`.
- Eliminar por completo la línea secundaria `Entrance · Dining Room · Bar · Patio / Entrada · Salón · Bar · Patio` para reducir ruido visual.
- Reducir el círculo visible del control de reproducción de 40 px a 36 px y su icono de 17 px a 15 px.
- Mantener el contraste, el efecto glass, el foco visible y una interacción táctil clara.

## Accesibilidad y rendimiento

- `preload="metadata"` y poster estático.
- Etiqueta accesible bilingüe para el video y el control.
- El estado visual del botón siempre corresponde al estado real del elemento `<video>`.
- La página sigue siendo utilizable si el autoplay es bloqueado.

## Verificación

- Revisar en inglés y español.
- Revisar desktop local y móvil real por Wi‑Fi.
- Confirmar que el título, la tarjeta y el párrafo conservan una jerarquía clara.
- Confirmar loop, pausa, reanudación, `playsInline`, ausencia de crop y reducción de movimiento.
