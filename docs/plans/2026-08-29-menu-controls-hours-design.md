# Controles del menú, horarios y contenido de ubicación — Diseño aprobado

**Fecha:** 2026-08-29  
**Estado:** Aprobado para implementación  
**Rama:** `codex/site-integration-preview`

## Objetivo

Eliminar las interferencias restantes del carrusel, corregir los cortes de texto y alinear la información operativa de eventos y ubicación sin modificar precios ni datos de platillos.

## Dirección aprobada

### Carrusel

Las flechas dejarán de flotar sobre las categorías. Se moverán a un riel inferior, junto a la barra de progreso, con un icono visual pequeño y un área táctil mínima de 44 px. Así se conserva la navegación por flecha sin obstruir etiquetas ni botones.

### Copia y teléfono

El texto de presentación del menú usará «frijoles» en lugar de «frijoles refritos». El teléfono del bloque de eventos se mantendrá en una sola línea y su contenedor podrá adaptarse en móvil sin recortar el contenido.

### Horarios

La información se mostrará en una cuadrícula de dos columnas, con día a la izquierda y hora a la derecha, para que el alineamiento sea estable en inglés y español. Según la confirmación del usuario, lunes queda abierto de 11:00 AM a 8:00 PM, martes cerrado, miércoles–sábado abierto y domingo abierto.

### Pagos

Se eliminará de la sección de Ubicación el bloque redundante de métodos de pago y socios de entrega. La información ya existe en la parte inferior del sitio y no debe repetirse.

## Criterios de aceptación

1. Ninguna flecha del carrusel cubre una categoría o su texto.
2. Las flechas siguen siendo operables por teclado y táctiles.
3. «Frijoles» aparece correctamente en inglés y español sin la palabra adicional.
4. El número `(831) 768-9876` no se divide ni se corta en el bloque de eventos.
5. Los horarios quedan alineados y muestran martes como cerrado y lunes como abierto.
6. El bloque duplicado de pagos ya no aparece en Ubicación.
7. No hay desborde horizontal ni texto cortado a 375 px, 580 px o escritorio.
