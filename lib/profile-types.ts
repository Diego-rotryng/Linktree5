export interface ProfileData {
  slug: string
  profile: {
    name: string
    headline: string
    bio: string
    avatarUrl: string
  }
  contact: {
    whatsapp: string
    email: string
  }
  actions: {
    whatsappQuick: boolean
    book?: {
      type: "calendly" | "whatsapp"
      url: string
    }
    pay?: {
      type: "mercadopago"
      url: string
    }
  }
  social?: {
    instagram?: string
    facebook?: string
    linkedin?: string
    spotify?: string
    youtube?: string
    tiktok?: string
  }
  address?: {
    label: string
    mapsEmbed?: string
  }
  links?: Array<{
    title: string
    href: string
  }>
  theme: {
    preset: "claro" | "oscuro"
    accent: string
  }
  seo: {
    title: string
    description: string
    ogImage?: string
    jsonLdType: "LocalBusiness" | "ProfessionalService" | "Person"
  }
  analytics?: {
    gtmId?: string
  }
  ops: {
    notifyEmail: string
    status: "pending" | "active" | "suspended"
  }
}

export interface FormData {
  // Profile
  name: string
  profession: string
  slogan: string
  bio: string
  avatarUrl: string

  // Contact
  whatsapp: string
  email: string
  mercadopagoUrl: string

  // Social
  instagram?: string
  facebook?: string
  linkedin?: string
  spotify?: string
  youtube?: string
  tiktok?: string

  // Address
  address?: string
  showMap: boolean
  mapsEmbed?: string

  // Booking
  bookingType: "calendly" | "whatsapp"
  calendlyUrl?: string

  // Terms
  acceptTerms: boolean
}
