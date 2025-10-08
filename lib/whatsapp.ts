/**
 * Normalizes Argentine phone numbers to E.164 format (+54...)
 */
export function normalizeWhatsapp(input: string): string {
  // Remove all non-digit characters
  const digits = input.replace(/\D/g, "")

  // If it starts with 54, assume it's already formatted
  if (digits.startsWith("54")) {
    return `+${digits}`
  }

  // If it starts with 0, remove it (local format)
  if (digits.startsWith("0")) {
    return `+54${digits.slice(1)}`
  }

  // If it starts with 9, it's likely a mobile without country code
  if (digits.startsWith("9")) {
    return `+54${digits}`
  }

  // Otherwise, assume it needs +54 prefix
  return `+54${digits}`
}

/**
 * Builds a WhatsApp URL with pre-filled message
 */
export function buildWaUrl(number: string, message = "Hola, quiero activar mi página en ayuda.com.ar"): string {
  const normalized = normalizeWhatsapp(number)
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${normalized.replace("+", "")}${message ? `?text=${encoded}` : ""}`
}
