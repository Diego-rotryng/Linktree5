"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle2 } from "lucide-react"
import { formToProfile } from "@/lib/form-to-profile"
import type { FormData } from "@/lib/profile-types"

export function SignupForm() {
  const [formData, setFormData] = useState<Partial<FormData>>({
    bookingType: "whatsapp",
    showMap: false,
    acceptTerms: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStartTime, setSubmitStartTime] = useState<number | null>(null)
  const [mathAnswer, setMathAnswer] = useState("")
  const [honeypot, setHoneypot] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [mercadopagoUrl, setMercadopagoUrl] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Honeypot check
    if (honeypot) {
      setError("Error en el envío. Por favor, intentá de nuevo.")
      return
    }

    // Math validation
    if (mathAnswer !== "5") {
      setError("La respuesta a la suma es incorrecta.")
      return
    }

    // Time delay check (minimum 3 seconds)
    if (submitStartTime && Date.now() - submitStartTime < 3000) {
      setError("Por favor, completá el formulario con más cuidado.")
      return
    }

    // Validate required fields
    if (
      !formData.name ||
      !formData.profession ||
      !formData.slogan ||
      !formData.bio ||
      !formData.avatarUrl ||
      !formData.whatsapp ||
      !formData.email ||
      !formData.mercadopagoUrl ||
      !formData.acceptTerms
    ) {
      setError("Por favor, completá todos los campos obligatorios.")
      return
    }

    if (formData.bio && formData.bio.length > 240) {
      setError("La biografía no puede superar los 240 caracteres.")
      return
    }

    setIsSubmitting(true)

    try {
      // Generate profile JSON
      const profile = formToProfile(formData as FormData)
      const profileJson = JSON.stringify(profile, null, 2)

      const response = await fetch("https://formsubmit.co/ajax/diego.rotryng@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          whatsapp: formData.whatsapp,
          profession: formData.profession,
          slug: profile.slug,
          json: profileJson,
          _subject: `Nueva solicitud de página: ${formData.name}`,
        }),
      })

      if (response.ok) {
        setMercadopagoUrl(formData.mercadopagoUrl!)
        setSubmitted(true)
      } else {
        setError("Hubo un error al enviar el formulario. Por favor, intentá de nuevo.")
      }
    } catch (err) {
      setError("Hubo un error al enviar el formulario. Por favor, intentá de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    if (!submitStartTime) {
      setSubmitStartTime(Date.now())
    }
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (submitted) {
    return (
      <Card id="formulario" className="border-2 border-[#24262a] bg-[#121315]/95 shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <CheckCircle2 className="h-16 w-16 text-[#22c55e]" />
          </div>
          <CardTitle className="text-2xl text-white">¡Gracias!</CardTitle>
          <CardDescription className="text-base text-neutral-200">
            Tenés 15 días gratis. El plan es $5.000 ARS/mes.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-[#24262a] bg-[#121315]">
            <AlertDescription className="text-neutral-200">
              Tu página será <strong>{formData.name?.toLowerCase().replace(/\s+/g, "-")}.ayuda.com.ar</strong>
            </AlertDescription>
          </Alert>
          <Button
            className="w-full rounded-[9999px] bg-[#22c55e] px-5 py-3 font-bold text-neutral-900 shadow-[0_6px_18px_rgba(34,197,94,0.35)] hover:bg-[#34d399] focus:outline-none focus:ring-2 focus:ring-[#22c55e]/60"
            size="lg"
            asChild
          >
            <a href={mercadopagoUrl} target="_blank" rel="noopener noreferrer">
              Pagar con MercadoPago
            </a>
          </Button>
          <p className="text-center text-sm text-neutral-400">Recibirás un email de confirmación en {formData.email}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card id="formulario" className="border-2 border-[#24262a] bg-[#121315]/95 shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
      <CardHeader>
        <CardTitle className="text-2xl text-white">Creá tu página ahora</CardTitle>
        <CardDescription className="text-neutral-300">
          Completá el formulario y tu página estará lista en minutos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Información básica</h3>

            <div className="space-y-2">
              <Label htmlFor="name" className="text-neutral-200">
                Nombre completo <span className="text-red-400">*</span>
              </Label>
              <Input
                id="name"
                placeholder="Ej: Clarisa Rozenbaum"
                value={formData.name || ""}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="border-[#24262a] bg-[#121315] text-neutral-100 focus:border-[#22c55e]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="profession" className="text-neutral-200">
                Profesión <span className="text-red-400">*</span>
              </Label>
              <Input
                id="profession"
                placeholder="Ej: Psicóloga"
                value={formData.profession || ""}
                onChange={(e) => handleInputChange("profession", e.target.value)}
                className="border-[#24262a] bg-[#121315] text-neutral-100 focus:border-[#22c55e]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slogan" className="text-neutral-200">
                Eslogan <span className="text-red-400">*</span>
              </Label>
              <Input
                id="slogan"
                placeholder="Ej: Psicóloga en CABA - Sesiones Online"
                value={formData.slogan || ""}
                onChange={(e) => handleInputChange("slogan", e.target.value)}
                className="border-[#24262a] bg-[#121315] text-neutral-100 focus:border-[#22c55e]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio" className="text-neutral-200">
                Biografía (máx. 240 caracteres) <span className="text-red-400">*</span>
              </Label>
              <Textarea
                id="bio"
                placeholder="Contá brevemente sobre vos y tu trabajo..."
                value={formData.bio || ""}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                maxLength={240}
                rows={3}
                className="border-[#24262a] bg-[#121315] text-neutral-100 focus:border-[#22c55e]"
                required
              />
              <p className="text-xs text-neutral-500">{formData.bio?.length || 0}/240 caracteres</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="avatarUrl" className="text-neutral-200">
                URL de tu foto/logo <span className="text-red-400">*</span>
              </Label>
              <Input
                id="avatarUrl"
                type="url"
                placeholder="https://ejemplo.com/mi-foto.jpg"
                value={formData.avatarUrl || ""}
                onChange={(e) => handleInputChange("avatarUrl", e.target.value)}
                className="border-[#24262a] bg-[#121315] text-neutral-100 focus:border-[#22c55e]"
                required
              />
            </div>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Contacto</h3>

            <div className="space-y-2">
              <Label htmlFor="whatsapp" className="text-neutral-200">
                WhatsApp <span className="text-red-400">*</span>
              </Label>
              <Input
                id="whatsapp"
                type="tel"
                placeholder="+54 9 11 1234 5678"
                value={formData.whatsapp || ""}
                onChange={(e) => handleInputChange("whatsapp", e.target.value)}
                className="border-[#24262a] bg-[#121315] text-neutral-100 focus:border-[#22c55e]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-neutral-200">
                Email <span className="text-red-400">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={formData.email || ""}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="border-[#24262a] bg-[#121315] text-neutral-100 focus:border-[#22c55e]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mercadopagoUrl" className="text-neutral-200">
                Link de MercadoPago <span className="text-red-400">*</span>
              </Label>
              <Input
                id="mercadopagoUrl"
                type="url"
                placeholder="https://mpago.la/abc123"
                value={formData.mercadopagoUrl || ""}
                onChange={(e) => handleInputChange("mercadopagoUrl", e.target.value)}
                className="border-[#24262a] bg-[#121315] text-neutral-100 focus:border-[#22c55e]"
                required
              />
            </div>
          </div>

          {/* Social Media Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Redes sociales (opcional)</h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="instagram" className="text-neutral-200">
                  Instagram
                </Label>
                <Input
                  id="instagram"
                  placeholder="https://instagram.com/usuario"
                  value={formData.instagram || ""}
                  onChange={(e) => handleInputChange("instagram", e.target.value)}
                  className="border-[#24262a] bg-[#121315] text-neutral-100 focus:border-[#22c55e]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="facebook" className="text-neutral-200">
                  Facebook
                </Label>
                <Input
                  id="facebook"
                  placeholder="https://facebook.com/usuario"
                  value={formData.facebook || ""}
                  onChange={(e) => handleInputChange("facebook", e.target.value)}
                  className="border-[#24262a] bg-[#121315] text-neutral-100 focus:border-[#22c55e]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedin" className="text-neutral-200">
                  LinkedIn
                </Label>
                <Input
                  id="linkedin"
                  placeholder="https://linkedin.com/in/usuario"
                  value={formData.linkedin || ""}
                  onChange={(e) => handleInputChange("linkedin", e.target.value)}
                  className="border-[#24262a] bg-[#121315] text-neutral-100 focus:border-[#22c55e]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="spotify" className="text-neutral-200">
                  Spotify
                </Label>
                <Input
                  id="spotify"
                  placeholder="https://open.spotify.com/..."
                  value={formData.spotify || ""}
                  onChange={(e) => handleInputChange("spotify", e.target.value)}
                  className="border-[#24262a] bg-[#121315] text-neutral-100 focus:border-[#22c55e]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="youtube" className="text-neutral-200">
                  YouTube
                </Label>
                <Input
                  id="youtube"
                  placeholder="https://youtube.com/@usuario"
                  value={formData.youtube || ""}
                  onChange={(e) => handleInputChange("youtube", e.target.value)}
                  className="border-[#24262a] bg-[#121315] text-neutral-100 focus:border-[#22c55e]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tiktok" className="text-neutral-200">
                  TikTok
                </Label>
                <Input
                  id="tiktok"
                  placeholder="https://tiktok.com/@usuario"
                  value={formData.tiktok || ""}
                  onChange={(e) => handleInputChange("tiktok", e.target.value)}
                  className="border-[#24262a] bg-[#121315] text-neutral-100 focus:border-[#22c55e]"
                />
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Ubicación (opcional)</h3>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-neutral-200">
                Dirección
              </Label>
              <Input
                id="address"
                placeholder="Av. Santa Fe 1234, CABA"
                value={formData.address || ""}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className="border-[#24262a] bg-[#121315] text-neutral-100 focus:border-[#22c55e]"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="showMap"
                checked={formData.showMap}
                onCheckedChange={(checked) => handleInputChange("showMap", checked as boolean)}
              />
              <Label htmlFor="showMap" className="cursor-pointer font-normal text-neutral-200">
                Mostrar mapa de ubicación
              </Label>
            </div>

            {formData.showMap && (
              <div className="space-y-2">
                <Label htmlFor="mapsEmbed" className="text-neutral-200">
                  URL de Google Maps Embed
                </Label>
                <Input
                  id="mapsEmbed"
                  placeholder="https://www.google.com/maps/embed?pb=..."
                  value={formData.mapsEmbed || ""}
                  onChange={(e) => handleInputChange("mapsEmbed", e.target.value)}
                  className="border-[#24262a] bg-[#121315] text-neutral-100 focus:border-[#22c55e]"
                />
                <p className="text-xs text-neutral-500">
                  Buscá tu ubicación en Google Maps, hacé clic en "Compartir" → "Insertar un mapa" y copiá el URL
                </p>
              </div>
            )}
          </div>

          {/* Booking Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Sistema de turnos</h3>

            <div className="space-y-2">
              <Label className="text-neutral-200">Tipo de reserva</Label>
              <div className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="whatsapp-booking"
                    name="bookingType"
                    value="whatsapp"
                    checked={formData.bookingType === "whatsapp"}
                    onChange={(e) => handleInputChange("bookingType", e.target.value)}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="whatsapp-booking" className="cursor-pointer font-normal text-neutral-200">
                    WhatsApp
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="calendly-booking"
                    name="bookingType"
                    value="calendly"
                    checked={formData.bookingType === "calendly"}
                    onChange={(e) => handleInputChange("bookingType", e.target.value)}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="calendly-booking" className="cursor-pointer font-normal text-neutral-200">
                    Calendly
                  </Label>
                </div>
              </div>
            </div>

            {formData.bookingType === "calendly" && (
              <div className="space-y-2">
                <Label htmlFor="calendlyUrl" className="text-neutral-200">
                  URL de Calendly
                </Label>
                <Input
                  id="calendlyUrl"
                  type="url"
                  placeholder="https://calendly.com/usuario/30min"
                  value={formData.calendlyUrl || ""}
                  onChange={(e) => handleInputChange("calendlyUrl", e.target.value)}
                  className="border-[#24262a] bg-[#121315] text-neutral-100 focus:border-[#22c55e]"
                />
              </div>
            )}
          </div>

          {/* Anti-spam Section */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="math" className="text-neutral-200">
                ¿Cuánto es 1 + 4? <span className="text-red-400">*</span>
              </Label>
              <Input
                id="math"
                type="number"
                placeholder="Tu respuesta"
                value={mathAnswer}
                onChange={(e) => setMathAnswer(e.target.value)}
                className="border-[#24262a] bg-[#121315] text-neutral-100 focus:border-[#22c55e]"
                required
              />
            </div>

            {/* Honeypot field (hidden) */}
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              style={{ display: "none" }}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="terms"
              checked={formData.acceptTerms}
              onCheckedChange={(checked) => handleInputChange("acceptTerms", checked as boolean)}
              required
            />
            <Label htmlFor="terms" className="cursor-pointer text-sm font-normal leading-relaxed text-neutral-200">
              Acepto los Términos y Condiciones y la Política de Privacidad. Entiendo que el servicio es $5.000 ARS/mes
              con 15 días gratis, y que los pagos se procesan por MercadoPago (tercero).{" "}
              <span className="text-red-400">*</span>
            </Label>
          </div>

          {error && (
            <Alert variant="destructive" className="border-red-800 bg-red-950/50">
              <AlertDescription className="text-red-300">{error}</AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            className="w-full rounded-[9999px] bg-[#22c55e] px-5 py-3 font-bold text-neutral-900 shadow-[0_6px_18px_rgba(34,197,94,0.35)] hover:bg-[#34d399] focus:outline-none focus:ring-2 focus:ring-[#22c55e]/60"
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Enviando...
              </>
            ) : (
              "Crear mi página"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
