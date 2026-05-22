import type { Metadata } from "next";
import TermsPage from "./terms";

export const metadata: Metadata = {
  title: "Terms & Conditions | Splitat",
  description:
    "Read the Terms and Conditions of Splitat, a platform for sharing commercial store space across India.",
  alternates: {
    canonical: "https://www.Splitat.com/terms",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermPage() {
  return (
    <div>
      <TermsPage />
    </div>
  );
}
