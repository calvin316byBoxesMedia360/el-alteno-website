# Hero Welcome Card — Exploración descartada

> Este concepto se probó en la rama de integración y fue descartado tras la revisión visual: repetía contenido de la sección siguiente y añadía carga innecesaria al Hero.

## Objetivo

Reemplazar el emblema grande superpuesto al contenido del Hero por una tarjeta de bienvenida bilingüe que mantenga identidad visual sin repetir el logotipo que ya aparece en la navegación y dentro del video.

## Dirección visual

- Conservar la posición del bloque inmediatamente debajo del video en móvil.
- Usar una placa oscura, borde dorado tenue, sombras suaves y el motivo artesanal de tortilla como textura secundaria.
- No incluir otro logotipo completo.
- Mostrar `Welcome / Bienvenidos`, `Flavors that feel like home / Sabores que se sienten como en casa` y una línea descriptiva ya aprobada para el sitio.
- Mantener la composición cálida y contenida del Hero; el bloque no debe competir con el video ni con los CTA.

## Comportamiento

- Mantener el bloque como parte del flujo de contenido del Hero para que el video quede arriba y el mensaje debajo.
- Usar la ilustración existente `public/images/about/tortilla-engraving.webp` con baja opacidad como detalle, sin crear un asset nuevo.
- Mantener `useReducedMotion`; la tarjeta sigue visible, pero sin animación de entrada cuando el usuario la solicita.
- No modificar el archivo `hero-bg.mp4`, el menú, los enlaces de delivery ni el video de bebidas.

## Criterio de aceptación

En móvil se perciben como máximo el logo de navegación y el logo integrado en el video; el tercer bloque es una bienvenida textual, legible en EN/ES y visualmente subordinada al video.
