# Barra de navegación oscura glass — Diseño aprobado

**Fecha:** 2026-08-29  
**Estado:** Aprobado para implementación  
**Rama:** `codex/site-integration-preview`

## Objetivo

Mantener la barra de navegación legible, estable y visualmente integrada con el Hero en escritorio y móvil, sin que el tema claro la convierta en una superficie beige demasiado luminosa.

## Diagnóstico

La barra usa `bg-card/95` como fondo base, por lo que en el tema claro hereda la superficie beige de las tarjetas. El fondo oscuro solo estaba definido con `dark:bg-[#0F0C0A]/95`; por eso la vista oscura se veía negra y la vista móvil en tema claro se veía beige. No es un problema de la red ni del navegador móvil.

## Dirección visual

- Usar una superficie oscura translúcida negro-café en ambos temas y tamaños.
- Conservar `backdrop-blur` para que el video y el fondo sigan insinuándose detrás.
- Mantener un borde mostaza de baja intensidad y una sombra profunda para separar la barra del Hero sin crear una caja pesada.
- Mantener la altura reducida ya aprobada (`h-14`) y los objetivos táctiles mínimos de 44 px.
- No cambiar el tema del resto del sitio: solo la navegación tendrá una superficie estable.

## Criterios de aceptación

1. La barra se percibe oscura glass en modo claro y oscuro.
2. El resultado es consistente en escritorio y móvil.
3. Logo, iconos, idioma, enlaces y menú conservan contraste suficiente.
4. El video del Hero sigue siendo visible a través del desenfoque, sin quedar lavado.
5. El menú móvil abierto usa la misma familia visual oscura.
6. ESLint, TypeScript y la revisión en las URLs local y Wi-Fi pasan.
