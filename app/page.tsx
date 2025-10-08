import { Hero } from "@/components/hero"
import { Pricing } from "@/components/pricing"
import { SignupForm } from "@/components/signup-form"
import { PreviewSection } from "@/components/preview-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Pricing />
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <SignupForm />
          <PreviewSection />
        </div>
      </div>
      <Footer />
    </main>
  )
}
