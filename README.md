# ratio: · Basauri, Bizkaia

Landing web oficial de **ratio:** — Marketing y captación para negocios con cita previa en Bizkaia.

---

## 🚀 Despliegue en Cloudflare

Este repositorio está 100% configurado para desplegarse sin fricción tanto en **Cloudflare Pages** como en **Cloudflare Workers (Static Assets)**.

### Opción A: Cloudflare Pages (Recomendado por interfaz web)

1. En el panel de Cloudflare, ve a **Workers & Pages** → **Create application** → pestaña **Pages** → **Connect to Git**.
2. Selecciona el repositorio `ratio-agency-web`.
3. Parámetros de compilación:
   - **Framework preset**: `None`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/`
4. Pulsa **Save and Deploy**.

> Las cabeceras de seguridad, caché inmutable para fuentes/imágenes y la página de error 404 personalizada se cargan automáticamente desde `dist/_headers`, `dist/_redirects` y `dist/404.html`.

---

### Opción B: Cloudflare Workers / Wrangler CLI

El repositorio incluye [`wrangler.jsonc`](./wrangler.jsonc) configurado para servir la carpeta `dist/` como assets estáticos nativos.

Para desplegar desde tu terminal:

```bash
# Iniciar sesión en Cloudflare (si no lo has hecho)
npx wrangler login

# Desplegar
npm run deploy
```

---

## 💻 Desarrollo local

Requiere Node.js 18+ (o Node 20+ / 22+).

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor local de desarrollo y previsualización
npm run dev

# 3. Comprobar integridad de assets y configuración
npm run build
```

El servidor local se iniciará en `http://localhost:8788`.

---

## ⚙️ Configuración del negocio

- **Número de WhatsApp**: Se gestiona en [`dist/config.js`](./dist/config.js):
  ```javascript
  window.RATIO_CONFIG = Object.freeze({ whatsapp: "34665015804" });
  ```
- **Textos legales**: Disponibles en [`dist/legal.html`](./dist/legal.html).
- **Error 404**: Página personalizada en [`dist/404.html`](./dist/404.html).
