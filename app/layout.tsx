import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/providers/convex-client-provider";

import { Toaster } from "@/components/ui/sonner"
import { ModalProvider } from "@/providers/modal-provider";
import { Suspense } from "react";
import { Loading } from "@/components/auth/loading";
import { ProModalProvider } from "@/providers/max-layers-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sketchlie.com"),
  title: "El Espacio de Trabajo para Colaborar | Sketchlie",
  description: "Sketchlie es una plataforma intuitiva y colaborativa que transforma la manera en que gestionas tus proyectos. Una espacio de trabajo que permite visualizar tus ideas, estructurar sistemas complejos y organizar tu trabajo de manera eficiente",
  keywords: ["sketchlie", "sketch", "colaboración", "espacio de trabajo", "diseño", "ui", "ux", "prototipado", "wireframes", "mockups", "sistema de diseño", "herramienta de diseño", "colaboración en diseño", "herramienta de colaboración en diseño", "plataforma de colaboración en diseño", "software de colaboración en diseño", "aplicación de colaboración en diseño", "sitio web de colaboración en diseño", "aplicación web de colaboración en diseño", "plataforma web de colaboración en diseño", "software web de colaboración en diseño", "herramienta web de colaboración en diseño", "sitio web de colaboración en diseño", "aplicación web de colaboración en diseño", "página web de colaboración en diseño", "servicio web de colaboración en diseño", "solución web de colaboración en diseño", "utilidad web de colaboración en diseño", "producto web de colaboración en diseño", "sistema web de colaboración en diseño"],
  alternates: {
    canonical: "https://www.sketchlie.com",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/public/favicon/favicon.ico",
    apple: "/public/favicon/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Suspense fallback={<Loading />}>
          <ConvexClientProvider>
            <Toaster />
            <ProModalProvider />
            <ModalProvider />
            {children}
          </ConvexClientProvider>
        </Suspense>
      </body>
    </html>
  );
}
