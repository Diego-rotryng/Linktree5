import type { ProfileData } from "./profile-types"
import fs from "fs"
import path from "path"

/**
 * Loads a profile from the content directory
 */
export async function loadProfile(slug: string): Promise<ProfileData | null> {
  try {
    const filePath = path.join(process.cwd(), "content", `${slug}.json`)
    const fileContents = fs.readFileSync(filePath, "utf8")
    const profile: ProfileData = JSON.parse(fileContents)
    return profile
  } catch (error) {
    return null
  }
}

/**
 * Lists all available profiles
 */
export async function listProfiles(): Promise<string[]> {
  try {
    const contentDir = path.join(process.cwd(), "content")
    const files = fs.readdirSync(contentDir)
    return files.filter((file) => file.endsWith(".json")).map((file) => file.replace(".json", ""))
  } catch (error) {
    return []
  }
}
