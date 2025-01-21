import type { Metadata } from "next";
import "./globals.css";
import { ConvexClientProvider } from "@/providers/convex-client-provider";
import { Toaster } from "@/components/ui/sonner"
import { Suspense } from "react";
import { Loading } from "@/components/auth/loading";
import { ProModalProvider } from "@/providers/max-layers-provider";
import { SettingsModalProvider } from "@/providers/settings";
import { AmplitudeAnalytics } from "@/components/AmplitudeAnalytics";
import { mainFont } from "@/lib/font";
import { OrganizationProvider } from "@/app/contexts/organization-context";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sketchlie.com"),
  title: "El Espacio de Trabajo para Colaborar | Sketchlie",
  description: "La plataforma de colaboración donde puedes convertir tus ideas en realidad. Hecha para que equipos puedan colaborar, diseñar y innovar. Construye el futuro con nosotros",
  keywords: ["sketchlie", "sketch", "colaboración", "espacio de trabajo", "diseño", "ui", "ux", "prototipado", "wireframes", "mockups", "sistema de diseño", "herramienta de diseño", "colaboración en diseño", "herramienta de colaboración en diseño", "plataforma de colaboración en diseño", "software de colaboración en diseño", "aplicación de colaboración en diseño", "sitio web de colaboración en diseño", "aplicación web de colaboración en diseño", "plataforma web de colaboración en diseño", "software web de colaboración en diseño", "herramienta web de colaboración en diseño", "sitio web de colaboración en diseño", "aplicación web de colaboración en diseño", "página web de colaboración en diseño", "servicio web de colaboración en diseño", "solución web de colaboración en diseño", "utilidad web de colaboración en diseño", "producto web de colaboración en diseño", "sistema web de colaboración en diseño"],
  alternates: {
    canonical: "https://www.sketchlie.com/",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: "/pwa/manifest.json",
  openGraph: {
    images: [{
      url: '/opengraph-image',
      width: 1200,
      height: 630,
    }],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
      </head>
      <body className={`${mainFont.className}`}>
        <AmplitudeAnalytics />
        <Suspense fallback={<Loading />}>
          <ConvexClientProvider>
            <OrganizationProvider>
              <Toaster />
              <ProModalProvider />
              <SettingsModalProvider />
              {children}
            </OrganizationProvider>
          </ConvexClientProvider>
        </Suspense>
      </body>
    </html>
  );
}
