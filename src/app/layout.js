export const dynamic = 'force-dynamic';
// import { Geist, Geist_Mono } from "next/font/google";
import { Montez, Manrope } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import 'swiper/css';

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

// Disable auto CSS injection
config.autoAddCss = false;

import Header from "@/components/Partials/Header";
import Footer from "@/components/Partials/Footer";
import Head from "next/head";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// ✅ Montez font
const montez = Montez({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-montez",
});

// ✅ Manrope font
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});



export const metadata = {
 
   title: "Tour Pickkars",
  description: "Tour Pickkars - Book your tours and travel experiences with us.",
  authors: [{ name: "Tour Pickkars" }],
  keywords: [
    "Travel",
    "Tour Booking",
    "Tour Pickkars",
    "Travel Agency",
    "Holiday Booking"
  ],
  robots: "index, follow",
  themeColor: "#00c18d",

  // 🔹 Open Graph (Facebook, LinkedIn, WhatsApp, etc.)
  openGraph: {
    title: "Tour Pickkars",
    description: "Book your tours and travel experiences with Tour Pickkars.",
    url: "https://tourpickkars.com",   // replace with your actual domain
    siteName: "Tour Pickkars",
    images: [
      {
        url: "/img/logo.svg", // put og-image.jpg in /public/assets/img/
        width: 1200,
        height: 630,
        alt: "Tour Pickkars",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // 🔹 Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Tour Pickkars",
    description: "Plan your dream vacation with Tour Pickkars, your trusted travel partner.",
    creator: "@tourpickkars",
    images: ["/img/logo.svg"],
  },

  // 🔹 Favicons
  icons: {
    icon: [
      { url: "/img/logo.svg", sizes: "32x32" },
      { url: "/img/logo.svg", sizes: "96x96" },
      { url: "/img/logo.svg", sizes: "16x16" },
    ],
    apple: [
      { url: "/img/logo.svg", sizes: "57x57" },
      { url: "/img/logo.svg", sizes: "60x60" },
      { url: "/img/logo.svg", sizes: "72x72" },
      { url: "/img/logo.svg", sizes: "76x76" },
      { url: "/img/logo.svg", sizes: "114x114" },
      { url: "/img/logo.svg", sizes: "120x120" },
      { url: "/img/logo.svg", sizes: "144x144" },
      { url: "/img/logo.svg", sizes: "152x152" },
      { url: "/img/logo.svg", sizes: "180x180" },
    ],
    other: [
      { rel: "manifest", url: "/img/favicons/manifest.json" },
      { rel: "msapplication-TileImage", url: "/img/logo.svg" },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montez.variable} ${manrope.variable}`}>
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
