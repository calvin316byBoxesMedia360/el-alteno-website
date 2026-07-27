# Deployment — El Alteño

> **Lee esto antes de desplegar en cualquier plataforma.** Contiene la configuración que NO vive en el código y que se pierde si solo clonas el repo.

---

## ⚠️ La trampa #1: el proyecto NO está en la raíz del repo

```
el-alteno-website/          ← raíz del repo git
├── CONTEXT.md
├── DEPLOYMENT.md           ← este archivo
├── public/                 ← imágenes fuente originales (NO se usan en el sitio)
└── el-alteno/              ← ★ LA APP NEXT.JS VIVE AQUÍ
    ├── package.json
    ├── src/
    └── public/             ← las imágenes que el sitio realmente usa
```

**Toda plataforma de hosting debe configurarse con:**

```
Root Directory = el-alteno
```

Sin esto el build falla al instante (no encuentra `package.json`).

---

## Estado actual del deploy

| | |
|---|---|
| **Plataforma** | Railway |
| **URL en vivo** | https://web-production-004ee.up.railway.app |
| **Repo conectado** | https://github.com/calvin316byBoxesMedia360/el-alteno-website |
| **Rama** | `master` |
| **Deploy** | Automático al hacer push |

---

## Variables de entorno

Se configuran **en el dashboard de la plataforma**, no en el repo.

| Variable | Requerida | Para qué |
|---|---|---|
| `NEXT_PUBLIC_FORMSPREE_ID` | Sí | Formulario de reservas de eventos |

> ⚠️ **Pendiente de verificar:** confirmar que esta variable está configurada en Railway. Si falta, el formulario de eventos falla en silencio — el usuario cree que envió su solicitud pero nunca llega.
>
> Prueba: llena el formulario en `/#events` y confirma que llega el correo.

Ver [`el-alteno/.env.example`](el-alteno/.env.example) para instrucciones de cómo obtener el ID.

---

## Railway — configuración

| Ajuste | Valor |
|---|---|
| Root Directory | `el-alteno` |
| Build Command | `npm run build` (autodetectado) |
| Start Command | `npm start` (autodetectado) |
| Variables | `NEXT_PUBLIC_FORMSPREE_ID` |

Railway detecta Next.js automáticamente vía Nixpacks. No hay `railway.json` ni `Dockerfile` en el repo — todo es autodetección + el Root Directory configurado en el dashboard.

---

## Si migras a Vercel

Vercel es gratis para este sitio y está hecho por los creadores de Next.js. Pasos:

1. Ir a [vercel.com/new](https://vercel.com/new) → importar el repo de GitHub
2. **Root Directory:** poner `el-alteno` ← el paso que todos olvidan
3. Framework Preset: Next.js (se autodetecta)
4. Environment Variables: agregar `NEXT_PUBLIC_FORMSPREE_ID`
5. Deploy

**Trade-off Railway vs Vercel:**

| | Railway | Vercel |
|---|---|---|
| Costo | ~$5/mes (servidor siempre activo) | Gratis en plan Hobby |
| Optimización de imágenes | Se procesa en tu servidor | CDN global incluido |
| Mejor para | Apps con backend/BD | Sitios estáticos como este |

Este sitio no tiene base de datos ni backend propio (el formulario va a Formspree, un servicio externo), así que Vercel le queda mejor. Pero Railway funciona bien — si ya está andando, no hay urgencia de mover.

---

## Dominio personalizado

Pendiente. Candidato: `elalteno.restaurant` (sin verificar disponibilidad).

Una vez comprado:
- **Railway:** Settings → Networking → Custom Domain → agregar CNAME en el registrador
- **Vercel:** Settings → Domains → agregar → seguir instrucciones de DNS

SSL es automático en ambas.

---

## Checklist antes de cada deploy

- [ ] `cd el-alteno && npm run build` pasa sin errores
- [ ] Probado en móvil (375px) y escritorio
- [ ] Toggle ES/EN funciona en todas las secciones
- [ ] Modo claro/oscuro funciona
- [ ] Formulario de eventos envía y **llega el correo**
- [ ] El video del hero carga (o degrada bien si no)
- [ ] Página `/menu` carga (es la del código QR en mesa)
