# Diseño aprobado — continuidad del video del salón

Fecha: 2026-08-30  
Rama: `codex/menu-cta-content-polish`  
Estado: aprobado por el usuario

## Objetivo

Crear un primer corte refinado del recorrido del salón para Private Events, conservando el restaurante real y la decoración de graduación aprobada, sin el contraste visual de la apertura rústica ni los micro-saltos del montaje anterior.

## Problemas confirmados

1. Entre 0 y 2 segundos aparece una toma con mantelería sencilla y tonos mal calibrados que no corresponde al resto de la secuencia.
2. En algunos cambios de toma reaparecen por instantes fotogramas de anclaje, percibidos como recarga o interferencia.
3. El primer montaje convirtió material fuente de 24 fps a 30 fps y conservó extremos de clips generativos; ambos factores pueden introducir judder y resets visuales.

## Enfoques considerados

### A. Corrección exclusivamente determinista

Reemplazar la apertura, recortar handles y volver a montar a 24 fps. Máxima fidelidad al material, pero la igualación global de color y decoración queda limitada.

### B. Edición generativa directa del borrador actual

Pasar el montaje completo por Gemini Omni Flash 1.1. Puede armonizar el conjunto, pero corre el riesgo de suavizar un error estructural sin eliminar su causa o alterar arquitectura y personas.

### C. Flujo híbrido aprobado

Regenerar la apertura con los anclajes refinados del salón, reensamblar a 24 fps eliminando handles defectuosos y, sólo entonces, pasar el corte completo por Gemini Omni Flash 1.1 en modo `edit` a 1080p. Es el equilibrio recomendado entre continuidad, calidad y fidelidad física.

## Diseño final

### Apertura

- Duración aproximada: 4 segundos.
- Ancla inicial: vista amplia refinada del salón.
- Ancla final: mesa elegante con copas, platos, flores blancas y runner negro.
- Movimiento: gimbal lento, estable y sutil.
- Prohibido: manteles rústicos o rojos, mesas vacías, utilería simple, arquitectura inventada y cambios bruscos de exposición.

### Montaje

- Línea de tiempo nativa: 24 fps.
- Recortar entre 6 y 8 fotogramas de los extremos problemáticos de los clips posteriores.
- Transiciones breves y elegantes, sin incluir los fotogramas estáticos de carga.
- Mantener el cierre aprobado de la mesera sirviendo vino con ambas manos.
- Salida intermedia silenciosa, horizontal 16:9.

### Pase final

- Modelo: Gemini Omni Flash 1.1.
- Modo: `edit`.
- Resolución: 1080p.
- Preservar duración, encuadres, arquitectura, personas, manos y acción de servicio.
- Unificar balance de blancos, contraste, negros, mantelería, copas, platos, flores y acentos negros/blancos/plata.
- Eliminar flicker y flashes de un solo fotograma sin agregar texto, logos ni objetos nuevos.

## Verificación y límites

- Comparar el corte determinista y el corte editado por Gemini antes de integrar cualquiera al sitio.
- Descartar el resultado generativo si altera vigas, arcos, ventanas, barra, mobiliario, rostros o manos.
- `Video Deflicker` queda como herramienta secundaria sólo si persiste parpadeo real.
- Topaz se reserva para nitidez final; no se usará para corregir continuidad o decoración.
- No integrar, commitear ni publicar el video final hasta aprobación visual del usuario.

