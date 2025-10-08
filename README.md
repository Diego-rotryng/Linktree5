# Ayuda - Link-in-Bio Argentino

Mini-SaaS de link-in-bio para profesionales y comercios argentinos.

## Características

- **Subdominios automáticos**: Cada cliente obtiene `nombre.ayuda.com.ar`
- **Diseño profesional**: Responsive, accesible (AA), optimizado para SEO
- **Integración completa**: WhatsApp, MercadoPago, Calendly, redes sociales
- **Sistema anti-spam**: Honeypot, delay, validación matemática
- **PWA**: Manifest y optimización para móviles

## Stack Técnico

- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS v4
- **Componentes**: shadcn/ui
- **Hosting**: Vercel

## Estructura del Proyecto

\`\`\`
├── app/
│   ├── page.tsx              # Landing page principal
│   ├── [slug]/page.tsx       # Páginas dinámicas de clientes
│   ├── layout.tsx
│   ├── globals.css
│   ├── manifest.ts
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── hero.tsx
│   ├── pricing.tsx
│   ├── signup-form.tsx
│   ├── preview-section.tsx
│   ├── profile-page.tsx
│   ├── footer.tsx
│   └── ui/                   # Componentes shadcn
├── lib/
│   ├── whatsapp.ts           # Normalización de números argentinos
│   ├── profile-types.ts      # Tipos TypeScript
│   ├── form-to-profile.ts    # Conversión de formulario a JSON
│   └── load-profile.ts       # Carga de perfiles desde archivos
├── content/
│   └── *.json                # Archivos JSON de perfiles
├── middleware.ts             # Manejo de subdominios wildcard
└── vercel.json               # Configuración de Vercel
\`\`\`

## Configuración de Vercel

### Wildcard Subdomain

1. En tu proyecto de Vercel, ve a **Settings** → **Domains**
2. Agrega el dominio: `*.ayuda.com.ar`
3. Configura los DNS records en tu proveedor:
   - Type: `CNAME`
   - Name: `*`
   - Value: `cname.vercel-dns.com`

## Uso

### Landing Page Principal

Visita `ayuda.com.ar` para ver la página de venta con:
- Hero explicando el servicio
- Pricing ($5.000 ARS/mes, 15 días gratis)
- Formulario de alta
- Vista previa en vivo

### Crear una Nueva Página

1. Completa el formulario en la landing page
2. El sistema genera automáticamente el JSON del perfil
3. Se envía por email a `diego.rotryng@gmail.com` vía FormSubmit
4. Muestra mensaje de confirmación con botón de pago de MercadoPago

### Páginas de Clientes

Cada cliente obtiene su página en `nombre.ayuda.com.ar` que renderiza desde `/content/nombre.json`

## Desarrollo Local

\`\`\`bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build

# Iniciar servidor de producción
npm start
\`\`\`

## Criterios de Aceptación (DoD)

- [x] Tema negro aplicado globalmente (neutral-950/900/800)
- [x] Landing page muestra plan de $5.000 ARS/mes con 15 días gratis
- [x] Formulario envía a diego.rotryng@gmail.com vía FormSubmit (AJAX) con campo JSON
- [x] Post-submit inline muestra mensaje + botón MercadoPago
- [x] Checkbox legal obligatorio con términos completos
- [x] Footer con descargo de responsabilidad en todas las páginas
- [x] Páginas dinámicas leen JSON; si no existe, 404 humano con CTA
- [x] WhatsApp abre con número normalizado (+54) + mensaje "Hola, quiero activar mi página en ayuda.com.ar"
- [x] Wildcard funciona en Vercel con `*.ayuda.com.ar`
- [x] Lighthouse score ≥ 90
- [x] Accesibilidad AA
- [x] SEO optimizado (meta tags, JSON-LD, sitemap)
- [x] PWA básico (manifest + favicon)

## Soporte

Para soporte, contacta por WhatsApp: [+54 9 11 5515 5371](https://wa.me/5491155155371)

## Licencia

Propiedad de Ayuda © 2025
