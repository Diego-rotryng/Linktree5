import type { FormData, ProfileData } from "./profile-types"
import { normalizeWhatsapp } from "./whatsapp"

/**
 * Converts form data to ProfileData JSON format
 */
export function formToProfile(formData: FormData): ProfileData {
  // Generate slug from name
  const slug = formData.name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")

  // Build social object (only include filled fields)
  const social: ProfileData["social"] = {}
  if (formData.instagram) social.instagram = formData.instagram
  if (formData.facebook) social.facebook = formData.facebook
  if (formData.linkedin) social.linkedin = formData.linkedin
  if (formData.spotify) social.spotify = formData.spotify
  if (formData.youtube) social.youtube = formData.youtube
  if (formData.tiktok) social.tiktok = formData.tiktok

  // Build address object
  const address = formData.address
    ? {
        label: formData.address,
        ...(formData.showMap && formData.mapsEmbed ? { mapsEmbed: formData.mapsEmbed } : {}),
      }
    : undefined

  // Build booking action
  const book =
    formData.bookingType === "calendly" && formData.calendlyUrl
      ? { type: "calendly" as const, url: formData.calendlyUrl }
      : {
          type: "whatsapp" as const,
          url: `https://wa.me/${normalizeWhatsapp(formData.whatsapp).replace("+", "")}?text=${encodeURIComponent("Hola! Quiero solicitar un turno.")}`,
        }

  const profile: ProfileData = {
    slug,
    profile: {
      name: formData.name,
      headline: formData.slogan,
      bio: formData.bio,
      avatarUrl: formData.avatarUrl,
    },
    contact: {
      whatsapp: normalizeWhatsapp(formData.whatsapp),
      email: formData.email,
    },
    actions: {
      whatsappQuick: true,
      book,
      pay: {
        type: "mercadopago",
        url: formData.mercadopagoUrl,
      },
    },
    ...(Object.keys(social).length > 0 ? { social } : {}),
    ...(address ? { address } : {}),
    links: [
      { title: "Solicitar Turno", href: book.url },
      { title: "Pagar ahora", href: formData.mercadopagoUrl },
    ],
    theme: {
      preset: "claro",
      accent: "#0d9488",
    },
    seo: {
      title: `${formData.name} | ${formData.profession}`,
      description: formData.slogan,
      jsonLdType: "ProfessionalService",
    },
    ops: {
      notifyEmail: "diego.rotryng@gmail.com",
      status: "pending",
    },
  }

  return profile
}
