# Anclas, carrusel y tipografía — Diseño aprobado

**Fecha:** 2026-08-29  
**Estado:** Aprobado para implementación  
**Rama:** `codex/site-integration-preview`

## Objetivo

Mejorar la orientación al navegar por el sitio: dejar cada sección visible bajo la barra fija, evitar que las flechas del carrusel tapen las categorías y prevenir cortes poco naturales en inglés y español.

## Dirección aprobada

### Anclas de sección

Las secciones alcanzadas desde la navegación usarán `scroll-margin-top` suficiente para compensar la barra fija. Se conserva el comportamiento nativo de las anclas, incluyendo teclado, historial y navegación directa por URL.

### Flechas del carrusel

Las flechas serán más pequeñas, de aproximadamente 36 px, y se colocarán ligeramente por debajo del centro vertical de la tira. El carrusel reservará espacio lateral para que la flecha no tape las etiquetas ni reduzca el área táctil. Solo se mostrarán cuando haya desplazamiento disponible.

### Textos responsivos

El nombre de marca `El Alteño` se protegerá con `white-space: nowrap` en títulos relevantes. Los títulos largos conservarán su tamaño y podrán envolver de forma natural; se revisarán márgenes, ancho mínimo, interlineado y etiquetas en 375 px, en inglés y español, para corregir desbordes reales sin reducir la tipografía global.

## Criterios de aceptación

1. Al pulsar Menu, Events, Cocktails o Location, el encabezado de la sección queda visible y separado de la barra.
2. Las flechas no cubren botones ni texto en el carrusel móvil.
3. La flecha conserva un objetivo táctil cómodo aunque el icono sea visualmente menor.
4. `El Alteño` nunca se divide en dos líneas dentro de los títulos revisados.
5. No aparecen textos cortados, desbordes horizontales ni etiquetas incompletas en 375 px, 580 px y escritorio.
6. El resultado funciona en inglés y español y respeta movimiento reducido.
