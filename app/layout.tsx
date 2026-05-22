import { Inter } from "next/font/google";
import type { Metadata } from "next";

import "./globals.css";
import Providers from "@/lib/Provider";
import { ThemeProvider } from "./dashboard/components/theme/themeProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "react-hot-toast";

// Load Inter font via next/font/google
const inter = Inter({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.Splitat.com"),
  title: {
    default: "Splitat — Share Commercial Store Space & Reduce Rent",
    template: "%s | Splitat",
  },
  description:
    "Splitat helps small business owners share commercial store space. Share your shop by hours, days, or weekends and split rent easily. Reduce costs and grow your business.",
  keywords: [
    "share shop space",
    "commercial space sharing",
    "shop sharing platform",
    "retail space sharing india",
    "shared store rent",
    "share commercial property",
    "shop rent sharing",
    "retail shop sharing",
    "store sharing startup",
    "reduce shop rent",
  ],
  authors: [{ name: "Splitat" }],
  creator: "Splitat",
  verification: {
    google: "k3mc_VAMfjXYGpdMTLbCc9jcRS94IcNLaFb_dsgOwKs",
  },
  openGraph: {
    title: "Splitat — Share Your Shop Space & Split Rent",
    description:
      "Share your commercial store space by time or day. Help small businesses reduce rent by sharing retail space.",
    url: "https://www.Splitat.com",
    siteName: "Splitat",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Share commercial store space platform",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Share Your Shop Space & Reduce Rent | Splitat",
    description:
      "Platform for small businesses to share retail store space and split rent.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  category: "business",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased no-scrollbar`}>
        <ThemeProvider
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          attribute="class"
        >
          <Providers>
            <Toaster />
            <SpeedInsights />
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
