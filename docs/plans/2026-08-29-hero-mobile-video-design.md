# Diseño: variante móvil del video del HERO

## Contexto

El HERO usa `public/videos/hero-bg.mp4`, un video panorámico 16:9, con `object-cover` dentro de un HERO vertical basado en `100svh`. En pantallas móviles esto recorta los extremos horizontales y el emblema superpuesto ocupa demasiado espacio visual.

## Objetivo

Conservar más información del video en móviles sin perder la presencia de pantalla completa del HERO y sin alterar la composición de escritorio. El logo debe seguir siendo protagonista, pero no bloquear el foco del video.

## Decisión aprobada

Crear una variante móvil derivada del MP4 existente, sin inventar ni cambiar el contenido del restaurante. La variante conservará el cuadro panorámico dentro de una composición vertical con relleno visual extendido y oscurecido; el video original seguirá siendo la fuente para desktop.

En `Hero.tsx` se usará selección responsive de fuente: la variante móvil en anchos pequeños y `hero-bg.mp4` desde el breakpoint de escritorio. El logo tendrá un tamaño menor y un espacio seguro propio en móvil; desktop conservará sus dimensiones actuales salvo que la prueba visual revele una regresión.

## Límites

- No cambiar datos, precios ni copy del menú.
- No reemplazar el video original.
- No modificar la paleta aprobada del proyecto fuera de los overlays necesarios para legibilidad.
- Mantener autoplay, loop, muted y playsInline.

## Validación

- Revisar 320, 375 y 430 px de ancho, además de desktop.
- Confirmar que los extremos del video sean visibles en la variante móvil y que el logo no tape el foco principal.
- Verificar que no haya overflow horizontal, cambios accidentales en desktop ni regresiones de accesibilidad.
- Ejecutar `npm run build` y `npx tsc --noEmit` antes del commit de implementación.
