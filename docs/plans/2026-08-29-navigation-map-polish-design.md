# Navegación, carrusel y mapa — Diseño aprobado

**Fecha:** 2026-08-29  
**Estado:** Aprobado para implementación  
**Rama:** `codex/site-integration-preview`

## Objetivo

Refinar tres puntos de la experiencia: hacer más elegante y respirable la barra de navegación, comunicar de forma inmediata que las categorías del menú se desplazan horizontalmente y devolverle al mapa su color natural.

## 1. Barra de navegación

La barra seguirá siendo una superficie glass oscura, pero dejará de verse como un bloque negro sólido. Se reducirá la opacidad del fondo y se reforzará la lectura del contenido que queda detrás con `backdrop-blur` y una sombra más suave. El borde mostaza seguirá siendo discreto para conservar la identidad de El Alteño.

La altura compacta (`h-14`), el logo, los enlaces, el menú móvil y los objetivos táctiles no cambian. La legibilidad seguirá resolviéndose con foreground claro, independiente del tema del resto de la página.

## 2. Categorías del menú

Se adoptará una cinta editorial de categorías:

- encabezado bilingüe de exploración;
- categoría activa visualmente más amplia y destacada;
- parte de la siguiente categoría visible para comunicar continuidad;
- flecha circular flotante en el borde derecho;
- línea de progreso mostaza debajo;
- desplazamiento con `snap` y transición suave;
- compatibilidad con `prefers-reduced-motion`.

Se conserva la interacción horizontal existente y se evita añadir iconos o ilustraciones que obligarían a inventar assets para catorce categorías.

## 3. Mapa

El iframe conservará la ubicación real, el enlace de direcciones, el tamaño responsive y el tratamiento de borde. Se eliminará únicamente el filtro CSS que fuerza `grayscale`, `invert` y `contrast`; el mapa volverá a mostrar colores naturales de Google Maps.

## Criterios de aceptación

1. La barra muestra el video/fondo insinuado sin verse negra sólida, en ambos temas y tamaños.
2. La navegación mantiene contraste, logo visible y controles táctiles adecuados.
3. El carrusel se reconoce como desplazable sin depender solo del gesto automático.
4. La categoría activa y la siguiente visible se distinguen con claridad en móvil y escritorio.
5. El mapa se muestra a color y sigue apuntando a 323 Main St, Watsonville.
6. Se respetan los estados de movimiento reducido y no se rompe el desplazamiento existente.
7. ESLint, TypeScript, build y revisión en local/Wi-Fi pasan.
