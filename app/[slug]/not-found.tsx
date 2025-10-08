import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, Home } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  const whatsappUrl = "https://wa.me/5491155155371?text=Hola!%20Quiero%20crear%20mi%20p%C3%A1gina%20en%20Ayuda"

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mb-4 text-6xl">🔍</div>
          <CardTitle className="text-2xl">Página no encontrada</CardTitle>
          <CardDescription className="text-base">
            Esta página todavía no existe. Si querés crear tu propia página profesional, contactanos por WhatsApp.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button className="w-full" size="lg" asChild>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-5 w-5" />
              Crear mi página
            </a>
          </Button>
          <Button className="w-full bg-transparent" variant="outline" size="lg" asChild>
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Volver al inicio
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
