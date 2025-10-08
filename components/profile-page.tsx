"use client"

import type { ProfileData } from "@/lib/profile-types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  MessageCircle,
  Calendar,
  CreditCard,
  Instagram,
  Facebook,
  Linkedin,
  Music,
  Youtube,
  MapPin,
  ExternalLink,
} from "lucide-react"
import { buildWaUrl } from "@/lib/whatsapp"
import { useEffect } from "react"

interface ProfilePageProps {
  profile: ProfileData
}

export function ProfilePage({ profile }: ProfilePageProps) {
  // Load Google Tag Manager if configured
  useEffect(() => {
    if (profile.analytics?.gtmId) {
      const script = document.createElement("script")
      script.innerHTML = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${profile.analytics.gtmId}');
      `
      document.head.appendChild(script)
    }
  }, [profile.analytics?.gtmId])

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case "instagram":
        return <Instagram className="h-5 w-5" />
      case "facebook":
        return <Facebook className="h-5 w-5" />
      case "linkedin":
        return <Linkedin className="h-5 w-5" />
      case "spotify":
        return <Music className="h-5 w-5" />
      case "youtube":
        return <Youtube className="h-5 w-5" />
      case "tiktok":
        return (
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
          </svg>
        )
      default:
        return <ExternalLink className="h-5 w-5" />
    }
  }

  const whatsappQuickUrl = buildWaUrl(profile.contact.whatsapp, "Hola, quiero activar mi página en ayuda.com.ar")

  // Generate JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": profile.seo.jsonLdType,
    name: profile.profile.name,
    description: profile.profile.bio,
    image: profile.profile.avatarUrl,
    telephone: profile.contact.whatsapp,
    email: profile.contact.email,
    ...(profile.address
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: profile.address.label,
          },
        }
      : {}),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="flex min-h-screen flex-col">
        <div className="flex flex-1 items-center justify-center bg-[#0b0b0c] p-4">
          <Card className="w-full max-w-md border-2 border-[#24262a] bg-[#121315]/95 shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
            <CardHeader className="text-center">
              <div className="mb-4 flex justify-center">
                <Avatar className="h-24 w-24 border-4 border-[#24262a]">
                  <AvatarImage src={profile.profile.avatarUrl || "/placeholder.svg"} alt={profile.profile.name} />
                  <AvatarFallback className="bg-[#121315] text-neutral-200">
                    {profile.profile.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
              <h1 className="text-balance text-3xl font-extrabold text-white">{profile.profile.name}</h1>
              <p className="text-balance text-lg text-neutral-300">{profile.profile.headline}</p>
              <p className="mt-2 text-pretty text-sm text-neutral-300">{profile.profile.bio}</p>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* WhatsApp Quick Button */}
              {profile.actions.whatsappQuick && (
                <Button
                  className="w-full rounded-[9999px] bg-[#22c55e] px-5 py-3 font-bold text-neutral-900 shadow-[0_6px_18px_rgba(34,197,94,0.35)] hover:bg-[#34d399] focus:outline-none focus:ring-2 focus:ring-[#22c55e]/60"
                  size="lg"
                  asChild
                >
                  <a href={whatsappQuickUrl} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Mandar WhatsApp
                  </a>
                </Button>
              )}

              {/* Booking Button */}
              {profile.actions.book && (
                <Button
                  className="w-full rounded-xl border border-[#24262a] bg-[#121315] px-5 py-3 text-neutral-200 hover:border-neutral-500"
                  variant="outline"
                  size="lg"
                  asChild
                >
                  <a href={profile.actions.book.url} target="_blank" rel="noopener noreferrer">
                    <Calendar className="mr-2 h-5 w-5" />
                    Solicitar Turno
                  </a>
                </Button>
              )}

              {/* Payment Button */}
              {profile.actions.pay && (
                <Button
                  className="w-full rounded-xl border border-[#24262a] bg-[#121315] px-5 py-3 text-neutral-200 hover:border-neutral-500"
                  variant="outline"
                  size="lg"
                  asChild
                >
                  <a href={profile.actions.pay.url} target="_blank" rel="noopener noreferrer">
                    <CreditCard className="mr-2 h-5 w-5" />
                    Pagar ahora
                  </a>
                </Button>
              )}

              {/* Custom Links */}
              {profile.links &&
                profile.links.length > 0 &&
                profile.links.map((link, index) => (
                  <Button
                    key={index}
                    className="w-full rounded-xl border border-[#24262a] bg-[#121315] px-5 py-3 text-neutral-200 hover:border-neutral-500"
                    variant="outline"
                    size="lg"
                    asChild
                  >
                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-5 w-5" />
                      {link.title}
                    </a>
                  </Button>
                ))}

              {/* Social Media Icons */}
              {profile.social && Object.keys(profile.social).length > 0 && (
                <div className="flex justify-center gap-4 pt-4">
                  {Object.entries(profile.social).map(([platform, url]) => (
                    <Button
                      key={platform}
                      variant="ghost"
                      size="icon"
                      className="text-neutral-300 hover:bg-[#121315] hover:text-white"
                      asChild
                    >
                      <a href={url} target="_blank" rel="noopener noreferrer" aria-label={platform}>
                        {getSocialIcon(platform)}
                      </a>
                    </Button>
                  ))}
                </div>
              )}

              {/* Address */}
              {profile.address && (
                <div className="pt-4">
                  <div className="flex items-center justify-center gap-2 text-sm text-neutral-400">
                    <MapPin className="h-4 w-4" />
                    <span>{profile.address.label}</span>
                  </div>

                  {/* Embedded Map */}
                  {profile.address.mapsEmbed && (
                    <div className="mt-4 overflow-hidden rounded-lg">
                      <iframe
                        src={profile.address.mapsEmbed}
                        width="100%"
                        height="200"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Ubicación"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Footer */}
              <div className="pt-6 text-center">
                <a href="https://ayuda.com.ar" className="text-xs text-neutral-500 hover:underline">
                  Creá tu página en Ayuda
                </a>
              </div>
            </CardContent>
          </Card>
        </div>

        <footer className="border-t border-[#24262a] bg-[#0b0b0c] py-6">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <p className="text-xs leading-relaxed text-neutral-500">
                <strong className="text-neutral-400">Descargo de responsabilidad:</strong> ayuda.com.ar provee la
                plataforma de publicación. Los enlaces externos (WhatsApp, MercadoPago, calendarios y redes sociales)
                pertenecen a terceros. ayuda.com.ar no se responsabiliza por su contenido, disponibilidad, pagos ni
                tratamiento de datos.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
