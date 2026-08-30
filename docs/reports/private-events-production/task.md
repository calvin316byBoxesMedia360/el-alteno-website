# El Alteño // Registro de tareas de producción

**Corte:** 2026-08-30  
**Rama:** `codex/menu-cta-content-polish`  
**Despliegue:** ninguno; `master` permanece intacta.

## [MATRIX: COMPLETE]

- [x] Clonar y aislar el desarrollo en un worktree separado.
- [x] Proteger el flujo contra push directo a `master`.
- [x] Hacer repetible la revisión móvil por Wi‑Fi mediante `dev-wifi.mjs`.
- [x] Corregir Hero móvil: margen superior, composición del video y logo transparente.
- [x] Activar enlaces de DoorDash y Uber Eats mediante destinos compartidos.
- [x] Integrar tarjeta silenciosa del proceso de tortillas hechas a mano.
- [x] Reemplazar Cantarito, Paloma y Chavela con imágenes y descripciones bilingües sin precios inventados.
- [x] Crear e integrar el video de servicio del bar en Cócteles.
- [x] Rediseñar navegación glass y las señales del carrusel de categorías.
- [x] Corregir saltos de ancla, flechas, márgenes, tipografía responsiva y mapa a color.
- [x] Corregir Mariscada, Huachinango, Carne Asada, martes cerrado y CTA telefónica glass.
- [x] Crear anclajes visuales del patio con GPT Image 2.
- [x] Generar y refinar el recorrido del patio; aprobar `private-events-patio-walkthrough-v3.mp4`.
- [x] Crear galería candidata del bar y corregir orientación espacial.
- [x] Incorporar al bartender real mediante inpainting preservando backbar y cócteles.
- [x] Generar y recortar el clip maestro del bar a `00:01–00:06`.
- [x] Crear y refinar el recorrido del salón; eliminar sus primeros 2 segundos.
- [x] Confirmar el clip de Entrada como introducción.
- [x] Instalar FFmpeg/FFprobe 9.0.1 localmente.
- [x] Confirmar NVIDIA `h264_nvenc` sobre RTX 5070 Ti Laptop.
- [x] Crear manifiesto audiovisual versionado.
- [x] Crear ensamblador Node con validación, temporales seguros y fallback CPU.
- [x] Crear siete pruebas automáticas; resultado 7/7.
- [x] Ensamblar localmente Entrada → Salón → Bar → Patio.
- [x] Validar el maestro: 29.8667 s, 1920×1080, 30 fps, H.264, sin audio.
- [x] Crear informe HTML, walkthrough y contrato de sistema.

## [MATRIX: REVIEW]

- [/] Revisar visualmente el maestro completo en desktop y móvil.
- [/] Decidir si sustituye o complementa la tarjeta individual del patio.
- [/] Seleccionar estrategia de audio en una fase independiente; el maestro actual permanece silencioso.

## [MATRIX: PENDING]

- [ ] Confirmar `NEXT_PUBLIC_FORMSPREE_ID` en Railway y probar la recepción real del formulario.
- [ ] Ejecutar build final después de la próxima integración de UI.
- [ ] Abrir PR desde la rama de trabajo hacia `master`.
- [ ] Verificar producción después del merge; nunca empujar directamente a `master`.

