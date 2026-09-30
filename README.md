# ratio: · De atención a clientes

Web de marketing digital para pymes, negocios locales y marcas personales. HTML, CSS y JavaScript sin framework. Las animaciones usan GSAP y ScrollTrigger 3.14.2, servidos localmente. No hace falta compilar ni instalar dependencias para abrir la web.

## Editar y probar

Con Node.js 20 o posterior:

```sh
npm run dev
npm test
```

El servidor local usa `http://localhost:4173`. Puedes cambiar el puerto con `PORT=4174 npm run dev`.

También puedes abrir `dist/index.html` directamente o usar cualquier servidor estático. Para publicar en Vercel, Netlify u otro proveedor, la carpeta de publicación es `dist` y no hay comando de build.

## Archivos

| Archivo | Qué editar |
| --- | --- |
| `dist/index.html` | Textos, secciones, SEO y formulario |
| `dist/style.css` | Diseño y estructura original |
| `dist/visual.css` | Paleta azul, verde y elementos visuales |
| `dist/motion.css` | Nueva cabecera, sección de redes y estilos de movimiento |
| `dist/app.js` | Panel, ejemplos, pestañas, calculadora y formulario |
| `dist/motion.js` | Entradas, scroll, gráfico y animaciones GSAP |
| `dist/config.js` | Número de WhatsApp |
| `dist/assets/` | Fotos, logos y fuentes locales |
| `dist/vendor/` | GSAP y ScrollTrigger originales, sin modificar |
| `dist/legal.html` | Aviso legal, privacidad y atribuciones |

## Comportamiento

- Las preferencias de movimiento reducido desactivan GSAP y los efectos de scroll. El contenido sigue visible sin JavaScript o si falta la librería.
- No se intercepta el scroll ni se fuerza el desplazamiento. Las imágenes solo tienen movimiento vinculado al scroll en escritorio.
- Los paneles, la reserva y los recorridos son ejemplos, no resultados de clientes. El gráfico semanal coincide con sus totales.
- El formulario prepara un mensaje para el WhatsApp +34 665 015 804. El visitante revisa y envía el mensaje; la web no lo envía automáticamente ni guarda datos.
- El precio del Sistema Ratio corresponde a negocios con cita. Las marcas personales y otros proyectos digitales reciben una propuesta a medida.
- No se cargan analítica, píxeles, fuentes ni scripts desde terceros. Las fotos son ilustrativas y sus autores están acreditados.

## Publicación

El repositorio conserva una copia editable de la web. Los cambios en GitHub no actualizan automáticamente la publicación existente de ChatGPT Sites; hay que desplegarlos explícitamente o conectar el repositorio al proveedor elegido.

Antes de un lanzamiento público, completa los datos fiscales del titular y revisa la información de privacidad de `dist/legal.html`. La identidad visual combina el azul y el verde menta de la referencia Roket con azul verdoso. La licencia de GSAP está documentada en `dist/vendor/README.md`.
