"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MessageCircle, Calendar, CreditCard, Instagram, Linkedin, MapPin } from "lucide-react"

export function PreviewSection() {
  return (
    <div className="flex items-center justify-center">
      <Card className="w-full max-w-md border-2 border-[#24262a] bg-[#121315]/95 shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <Avatar className="h-24 w-24 border-4 border-[#24262a]">
              <AvatarImage src="/images/clarisa.jpg" alt="Clarisa Rozenbaum" />
              <AvatarFallback className="bg-[#121315] text-neutral-200">CR</AvatarFallback>
            </Avatar>
          </div>
          <h2 className="text-2xl font-extrabold text-white">Clarisa Rozenbaum</h2>
          <p className="text-lg text-neutral-300">Psicóloga – Sesiones Online y Presenciales</p>
          <p className="mt-2 text-sm text-neutral-300">
            Acompaño procesos de cambio con enfoque humanista. Trabajo con adultos en terapia individual.
          </p>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            className="w-full rounded-[9999px] bg-[#22c55e] px-5 py-3 font-bold text-neutral-900 shadow-[0_6px_18px_rgba(34,197,94,0.35)] hover:bg-[#34d399] focus:outline-none focus:ring-2 focus:ring-[#22c55e]/60"
            size="lg"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Mandar WhatsApp
          </Button>
          <Button
            className="w-full rounded-xl border border-[#24262a] bg-[#121315] px-5 py-3 text-neutral-200 hover:border-neutral-500"
            variant="outline"
            size="lg"
          >
            <Calendar className="mr-2 h-5 w-5" />
            Solicitar Turno
          </Button>
          <Button
            className="w-full rounded-xl border border-[#24262a] bg-[#121315] px-5 py-3 text-neutral-200 hover:border-neutral-500"
            variant="outline"
            size="lg"
          >
            <CreditCard className="mr-2 h-5 w-5" />
            Pagar ahora
          </Button>

          <div className="flex justify-center gap-4 pt-4">
            <Button variant="ghost" size="icon" className="text-neutral-300 hover:bg-[#121315] hover:text-white">
              <Instagram className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-neutral-300 hover:bg-[#121315] hover:text-white">
              <Linkedin className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex items-center justify-center gap-2 pt-2 text-sm text-neutral-400">
            <MapPin className="h-4 w-4" />
            <span>Av. Santa Fe 1234, CABA</span>
          </div>

          <p className="pt-4 text-center text-xs text-neutral-500">Vista previa de tu página</p>
        </CardContent>
      </Card>
    </div>
  )
}
