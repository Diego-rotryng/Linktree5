import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ayuda - Tu página profesional",
    short_name: "Ayuda",
    description: "Creá tu link-in-bio profesional en minutos",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0d9488",
    icons: [
      {
        src: "/icon-192.jpg",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.jpg",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
