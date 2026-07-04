import { Sora, Inter } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sora",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Laundry Iloilo — Free Pickup & Delivery in 24 Hours | WASHERO",
  description:
    "Your laundry hero in Iloilo City — free doorstep pickup & delivery, wash & fold, ironing & dry cleaning, back within 24 hours. Serving Jaro, Molo, La Paz & all 7 districts.",
  keywords: [
    "laundry Iloilo",
    "laundry service Iloilo City",
    "laundry pickup and delivery Iloilo",
    "wash and fold Iloilo",
    "dry cleaning Iloilo City",
    "laundry shop near me Iloilo",
  ],
  openGraph: {
    title: "Laundry Iloilo — Free Pickup & Delivery in 24 Hours | WASHERO",
    description:
      "Free doorstep pickup & delivery across all 7 districts of Iloilo City. Washed, folded, and fresh within 24 hours.",
    type: "website",
    locale: "en_PH",
    siteName: "WASHERO",
  },
  other: {
    "geo.region": "PH-ILI",
    "geo.placename": "Iloilo City",
    "geo.position": "10.7202;122.5621",
    ICBM: "10.7202, 122.5621",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
