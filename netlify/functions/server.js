import serverless from "serverless-http";
import app from "../../main.js";

// Sin esto, imágenes/fonts servidas por express.static llegan corruptas (UTF-8)
// y el navegador no muestra los .webp/.svg desde Netlify Functions.
export const handler = serverless(app, {
  binary: [
    "image/*",
    "image/webp",
    "image/svg+xml",
    "font/*",
    "application/font-woff",
    "application/font-woff2",
  ],
});
