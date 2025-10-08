import type React from "react"
import type { Metadata } from "next/metadata"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Ayuda - Tu página profesional en minutos",
  description:
    "Creá tu link-in-bio profesional para compartir tus servicios, redes sociales y formas de contacto. Ideal para psicólogos, coaches, profesionales y comercios.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-surface text-neutral-100 antialiased">
        <Suspense fallback={<div>Loading...</div>}>
          {children}
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
