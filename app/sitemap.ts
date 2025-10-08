import type { MetadataRoute } from "next"
import { listProfiles } from "@/lib/load-profile"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://ayuda.com.ar"

  // Get all profile slugs
  const profiles = await listProfiles()

  const profileUrls = profiles.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...profileUrls,
  ]
}
