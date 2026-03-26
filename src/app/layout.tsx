import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/providers/LenisProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NOIR CAFÉ | Café de Especialidad",
  description: "Café de especialidad, creado para quienes exigen lo extraordinario. Vive el ritual cinematográfico de NOIR CAFÉ en cada taza.",
  alternates: {
    canonical: "https://noircafe.co",
  },
  openGraph: {
    title: "NOIR CAFÉ | Café de Especialidad",
    description: "Café de especialidad para los que exigen lo extraordinario. Vive el ritual de NOIR CAFÉ.",
    url: "https://noircafe.co",
    siteName: "NOIR CAFÉ",
    locale: "es_CO",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Experiencia Noir Café",
      },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  "name": "NOIR CAFÉ",
  "image": "https://noircafe.co/images/og-image.jpg",
  "@id": "https://noircafe.co",
  "url": "https://noircafe.co",
  "telephone": "+573000000000",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Noche de la Ciudad",
    "addressLocality": "Bogotá",
    "postalCode": "110111",
    "addressCountry": "CO"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 4.6097,
    "longitude": -74.0817
  },
  "menu": "https://noircafe.co/menu",
  "servesCuisine": "Specialty Coffee",
  "priceRange": "$$",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "08:00",
      "closes": "22:00"
    }
  ],
  "potentialAction": {
    "@type": "ReserveAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://noircafe.co/reservas",
      "inLanguage": "es",
      "actionPlatform": ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"]
    },
    "result": {
      "@type": "Reservation",
      "name": "Reserva tu Mesa"
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} font-inter antialiased noise`}
      >
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
