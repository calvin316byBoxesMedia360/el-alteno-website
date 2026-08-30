# Diseño — pipeline local del video total de Private Events

**Fecha:** 2026-08-30  
**Estado:** aprobado por el usuario  
**Rama:** `codex/menu-cta-content-polish`

## Objetivo

Ensamblar localmente los clips aprobados de Private Events en un solo video largo, aprovechando la ROG Strix 18 y su NVIDIA GeForce RTX 5070 Ti Laptop GPU. Las operaciones deterministas —recorte, normalización, concatenación, transiciones y exportación— no deben consumir créditos de generación.

## Decisiones aprobadas

- El maestro permanecerá silencioso por ahora.
- Orden narrativo fijo: `entrada → salón → bar → patio`.
- Higgsfield/Seedance se reserva para generar metraje nuevo; FFmpeg local se usa para edición y montaje.
- Todos los módulos se normalizan a H.264, 1920×1080, 30 fps, píxel `yuv420p` y relación 16:9.
- El render final no puede ejecutarse si falta un módulo requerido o si su estado no es `approved`.
- Los archivos candidatos o rechazados no se incorporan al maestro.
- La aceleración preferida es NVIDIA NVENC; si no está disponible, el proceso debe informar claramente y permitir un respaldo con `libx264`.

## Enfoques considerados

### A. Script Node + manifiesto JSON — seleccionado

Ventajas: reproducible entre sesiones, fácil de validar, integrado con `npm`, registra orden y aprobación sin depender de memoria conversacional. Permite controles previos y mensajes claros.

### B. Script PowerShell

Más directo en Windows, pero acopla el flujo al shell local y dificulta reutilizarlo en otra máquina o CI.

### C. Comandos FFmpeg manuales

Es el método más corto para una sola entrega, pero es frágil, no conserva el orden como contrato y facilita montar accidentalmente un candidato no aprobado.

## Arquitectura

1. Un manifiesto versionado declara cada módulo, su ruta, estado y orden.
2. Un script Node valida FFmpeg, FFprobe, archivos, estados y propiedades básicas.
3. Cada clip se normaliza en un directorio temporal.
4. Los clips normalizados se concatenan sin audio.
5. El maestro se exporta con `faststart` para reproducción web.
6. FFprobe valida duración, resolución, codec, fps y ausencia de audio.
7. Los temporales se eliminan; los clips fuente permanecen intactos.

## Manifiesto inicial

| Orden | Módulo | Estado actual |
|---:|---|---|
| 1 | Entrada | Pendiente |
| 2 | Salón | Pendiente |
| 3 | Bar | Aprobado: `private-events-bar-clip-approved-v1.mp4` |
| 4 | Patio | Aprobado: `private-events-patio-walkthrough-v3.mp4` |

## Comandos previstos

- `npm run video:private-events:check`: valida herramientas, manifiesto y archivos sin renderizar.
- `npm run video:private-events`: crea el maestro únicamente cuando los cuatro módulos estén aprobados.
- `npm run video:private-events:preview`: montaje parcial explícito para QA; nunca se considera maestro final.

## Seguridad y trazabilidad

- El maestro nunca sobrescribe clips fuente.
- La salida final usa un nombre versionado.
- El script falla ante rutas fuera del proyecto, módulos duplicados o estados inválidos.
- No se añade música ni audio ambiente en esta fase.
- No se hace push a `master`; la infraestructura queda en la rama de trabajo.

## Criterios de aceptación

- FFmpeg y FFprobe disponibles localmente.
- NVENC detectado en la ROG o fallback documentado.
- El chequeo reconoce bar/patio y reporta entrada/salón como pendientes.
- El render final se niega correctamente mientras existan módulos pendientes.
- Un preview parcial puede ensamblarse localmente para comprobar la cadena completa.
- La memoria del proyecto identifica el comando y el contrato audiovisual.
