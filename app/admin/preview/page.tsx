import { redirect } from "next/navigation"
import { ProfilePage } from "@/components/profile-page"
import type { ProfileData } from "@/lib/profile-types"

interface PageProps {
  searchParams: Promise<{ token?: string; slug?: string }>
}

export default async function AdminPreviewPage({ searchParams }: PageProps) {
  const params = await searchParams
  const { token, slug } = params

  // Check token authentication
  const validToken = process.env.PREVIEW_TOKEN || "preview-secret-token"

  if (!token || token !== validToken) {
    redirect("/")
  }

  // Default preview profile if no slug provided
  const defaultProfile: ProfileData = {
    slug: "preview",
    profile: {
      name: "Tu Nombre",
      headline: "Tu Profesión - Tu Eslogan",
      bio: "Esta es una vista previa de cómo se verá tu página. Completá el formulario para crear tu propia página personalizada.",
      avatarUrl: "/professional-headshot.png",
    },
    contact: {
      whatsapp: "+54 9 11 1234 5678",
      email: "tu@email.com",
    },
    actions: {
      whatsappQuick: true,
      book: {
        type: "whatsapp",
        url: "https://wa.me/5491112345678",
      },
      pay: {
        type: "mercadopago",
        url: "https://mpago.la/example",
      },
    },
    social: {
      instagram: "https://instagram.com/usuario",
      linkedin: "https://linkedin.com/in/usuario",
    },
    theme: {
      preset: "claro",
      accent: "#0d9488",
    },
    seo: {
      title: "Vista Previa | Ayuda",
      description: "Vista previa de tu página profesional",
      jsonLdType: "Person",
    },
    ops: {
      notifyEmail: "diego.rotryng@gmail.com",
      status: "pending",
    },
  }

  // If slug is provided, try to load that profile
  if (slug) {
    try {
      const { loadProfile } = await import("@/lib/load-profile")
      const profile = await loadProfile(slug)
      if (profile) {
        return <ProfilePage profile={profile} />
      }
    } catch (error) {
      // Fall through to default profile
    }
  }

  return <ProfilePage profile={defaultProfile} />
}
