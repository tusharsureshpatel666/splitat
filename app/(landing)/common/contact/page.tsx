import type { Metadata } from "next";
import ContactPage from "./Contact";

export const metadata: Metadata = {
  title: "Contact Splitat | Store Sharing Platform in India",
  description:
    "Get in touch with Splitat. Contact us for support, partnerships, business inquiries, or questions about sharing commercial store space in India.",
  keywords: [
    "contact Splitat",
    "Splitat support",
    "store sharing contact",
    "commercial space sharing India",
    "retail space platform contact",
  ],
  alternates: {
    canonical: "https://www.Splitat.com/contact",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function page() {
  return <ContactPage />;
}
