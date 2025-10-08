import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
  return (
    <section className="border-b border-[#24262a] bg-gradient-to-b from-[#0b0b0c] to-[#121315]">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-[9999px] border border-[#24262a] bg-[#121315] px-4 py-1 text-sm">
            <span className="h-2 w-2 rounded-full bg-[#22c55e]"></span>
            <span className="text-neutral-200">Lanzamiento especial · 15 días gratis</span>
          </div>

          <h1 className="mb-6 text-balance text-5xl font-extrabold tracking-tight text-white lg:text-6xl">
            Tu página profesional en minutos
          </h1>

          <p className="mb-8 text-balance text-lg text-neutral-300 lg:text-xl">
            Creá tu link-in-bio profesional para compartir tus servicios, redes sociales y formas de contacto. Ideal
            para psicólogos, coaches, profesionales y comercios.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              asChild
              className="w-full rounded-[9999px] bg-[#22c55e] px-5 py-3 font-bold text-neutral-900 shadow-[0_6px_18px_rgba(34,197,94,0.35)] hover:bg-[#34d399] focus:outline-none focus:ring-2 focus:ring-[#22c55e]/60 sm:w-auto"
            >
              <Link href="#formulario">Crear mi página</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="w-full rounded-xl border border-[#24262a] bg-[#121315] px-5 py-3 text-neutral-200 hover:border-neutral-500 sm:w-auto"
            >
              <Link href="/clarisa">Ver ejemplo</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
