import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || ""

  // Check if it's a subdomain (not www, not the main domain)
  const isSubdomain = hostname.includes(".ayuda.com.ar") && !hostname.startsWith("www.")

  if (isSubdomain) {
    // Extract subdomain slug
    const slug = hostname.split(".")[0]

    // Rewrite to the dynamic route
    return NextResponse.rewrite(new URL(`/${slug}`, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (public images)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|images).*)",
  ],
}
