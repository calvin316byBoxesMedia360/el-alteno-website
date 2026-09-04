# Diseño: HERO móvil con video separado del contenido

## Problema

La composición móvil anterior convierte el video horizontal en un lienzo vertical con una copia desenfocada ocupando la mayor parte de la pantalla. El contenido se superpone a la franja nítida y el logo fue desplazado hacia arriba con offsets negativos, quedando oculto detrás de la navegación fija.

## Decisión aprobada

En pantallas menores de `768px`, el HERO tendrá dos zonas consecutivas y claramente diferenciadas:

1. Una etapa de video de ancho completo con proporción `16:9`, usando el video original y sin texto, logo ni botones encima. La imagen se conserva completa para que no se pierdan los extremos horizontales.
2. Un panel de contenido opaco, oscuro y de inspiración heritage debajo del video. El logo vuelve al flujo normal, seguido por el saludo, la dirección, las acciones principales y las opciones de delivery.

En `md` y superiores se conserva la experiencia inmersiva actual: el video ocupa todo el HERO, el contenido permanece centrado sobre él y se mantiene el orden visual existente de escritorio.

## Composición responsive

- Móvil: el `section` fluye verticalmente; el video usa `aspect-video` y `object-contain`; el panel usa el fondo oscuro del sitio y espaciado compacto.
- Desktop: el video vuelve a ser absoluto, cubre el viewport con `object-cover` y el panel de contenido vuelve a ser transparente y centrado.
- El logo móvil tendrá un ancho legible dentro del panel y ya no dependerá de `top` o `margin` negativos.
- El navbar fijo conserva su posición y ya no puede tapar el logo del HERO porque este aparece después de la etapa de video.

## Accesibilidad y rendimiento

- Se mantiene un único elemento `<video>` con `autoPlay`, `loop`, `muted` y `playsInline`.
- Se elimina el uso de la variante vertical desenfocada que provocó la regresión visual.
- El contenido y los controles siguen siendo HTML accesible y no dependen de que el video se reproduzca.
- No se modifica `MENU-SOURCE.md` ni ningún precio o dato del menú.

## Validación

- Revisar visualmente en viewport móvil estrecho, especialmente `375px` de ancho.
- Confirmar que el video muestra la composición completa y que el logo aparece debajo, sin quedar bajo el navbar.
- Confirmar que desktop conserva la composición inmersiva.
- Ejecutar lint, TypeScript y build de producción antes de dejar el servidor local listo.
