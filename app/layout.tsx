import type { Metadata } from "next";
import { siteConfig } from "@/site.config";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? "https://" + process.env.VERCEL_PROJECT_PRODUCTION_URL
    : "http://localhost:3000");

export const metadata: Metadata = {
  title: siteConfig.name + " — " + siteConfig.title,
  description: siteConfig.description,
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: siteConfig.name + " — Ciberseguridad ofensiva",
    description: "Conocé tus riesgos. Tomá el control. Pentesting, retesting y evaluación de vulnerabilidades.",
    type: "website",
    locale: "es_AR",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es-AR"><body>{children}</body></html>;
}
