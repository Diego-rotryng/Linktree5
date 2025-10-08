import { Check } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function Pricing() {
  const features = [
    "Tu propio subdominio (nombre.ayuda.com.ar)",
    "Botones de WhatsApp, MercadoPago y más",
    "Links a todas tus redes sociales",
    "Mapa de ubicación integrado",
    "Diseño profesional y responsive",
    "Optimizado para SEO y Google",
    "Sin publicidad ni marca de agua",
    "Soporte por WhatsApp",
  ]

  return (
    <section className="border-b border-[#24262a] bg-[#121315]/50 py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-balance text-3xl font-extrabold tracking-tight text-white lg:text-4xl">
            Plan único y simple
          </h2>
          <p className="mb-12 text-balance text-lg text-neutral-300">
            Sin sorpresas. Un solo precio, todas las funciones incluidas.
          </p>

          <Card className="mx-auto max-w-md border-2 border-[#24262a] bg-[#121315]/95 shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white">Plan Profesional</CardTitle>
              <CardDescription className="text-neutral-300">Todo lo que necesitás para destacar online</CardDescription>
              <div className="mt-4">
                <span className="text-5xl font-bold text-white">$5.000</span>
                <span className="text-neutral-300"> ARS/mes</span>
              </div>
              <p className="mt-2 text-sm font-semibold text-[#22c55e]">15 días gratis para probar</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-left">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#22c55e]" />
                    <span className="text-sm text-neutral-200">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
