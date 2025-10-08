import { notFound } from "next/navigation"
import { loadProfile } from "@/lib/load-profile"
import { ProfilePage } from "@/components/profile-page"
import type { Metadata } from "next"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const profile = await loadProfile(slug)

  if (!profile) {
    return {
      title: "Página no encontrada",
      description: "Esta página no existe",
    }
  }

  return {
    title: profile.seo.title,
    description: profile.seo.description,
    openGraph: {
      title: profile.seo.title,
      description: profile.seo.description,
      images: profile.seo.ogImage ? [profile.seo.ogImage] : [],
    },
  }
}

export default async function SlugPage({ params }: PageProps) {
  const { slug } = await params
  const profile = await loadProfile(slug)

  if (!profile) {
    notFound()
  }

  return <ProfilePage profile={profile} />
}
