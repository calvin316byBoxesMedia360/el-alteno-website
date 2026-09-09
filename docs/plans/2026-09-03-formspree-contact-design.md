# Diseño: formulario de eventos de El Alteño con Formspree

## Objetivo

Conectar el formulario de eventos del sitio de El Alteño al endpoint de Formspree creado bajo el proyecto del restaurante, manteniendo la recepción y administración en `elaltenorest@gmail.com` y sin incluir credenciales ni correos personales en el código.

## Contexto confirmado

- El componente `src/components/sections/Events.tsx` envía el formulario a Formspree usando `NEXT_PUBLIC_FORMSPREE_ID`.
- El endpoint creado es `https://formspree.io/f/mbgjklrl`.
- La captura de Formspree muestra `elaltenorest@gmail.com` como destinatario de notificaciones.
- El repositorio documenta Railway, pero el dominio público también aparece asociado a una configuración de Netlify; la variable debe configurarse en el hosting que sirva el dominio público.

## Enfoques considerados

1. **Variable de entorno, recomendado:** conservar la integración existente y configurar `NEXT_PUBLIC_FORMSPREE_ID=mbgjklrl` en el hosting. Es el cambio mínimo, reversible y evita publicar el ID dentro del código.
2. **Endpoint escrito directamente en el componente:** funcionaría, pero mezcla configuración de despliegue con código y hace más difícil cambiar de formulario.
3. **Backend propio con Gmail/SMTP:** daría más control, pero añade servidor, secretos, mantenimiento y riesgo innecesario para este formulario.

## Diseño aprobado

Usar el enfoque 1. No se cambiará el proveedor ni se añadirá un backend. Se mantendrá el endpoint parametrizado por variable de entorno; se actualizará únicamente la configuración necesaria del hosting activo y, si existe un despliegue paralelo en Railway, se replicará allí para evitar una versión rota. Después se ejecutará un build y se enviará una solicitud de prueba desde el sitio público para comprobar que el mensaje llega a `elaltenorest@gmail.com`.

## Criterios de éxito

- La variable del hosting activo contiene exactamente `mbgjklrl`.
- El sitio compila sin errores.
- El formulario público muestra estado de envío exitoso.
- El correo de prueba llega a `elaltenorest@gmail.com` y permite responder al visitante.

## Límites de seguridad

- No se solicitarán ni almacenarán contraseñas, códigos de verificación o tokens de Gmail.
- No se enviará correo de prueba hasta que el flujo esté listo y se confirme la acción de envío.
