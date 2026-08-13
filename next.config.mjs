/** @type {import('next').NextConfig} */
const nextConfig = {
  // Exportación estática para GitHub Pages
  output: "export",

  // Nombre del repositorio en GitHub (necesario para que los assets carguen bien)
  basePath: "/mobile_coupon",

  // next/image no funciona con exportación estática sin un loader externo,
  // así que deshabilitamos la optimización para que carguen las URLs directamente
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "api.dicebear.com",
      },
    ],
  },
};

export default nextConfig;
