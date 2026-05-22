import Image from "next/image";
import FrontendDeveloperJob from "./carrer";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers at Splitat | Join Our Store Sharing Startup",
  description:
    "Explore career opportunities at Splitat. Join our mission to revolutionize commercial store space sharing and help small businesses reduce rental costs across India.",
  keywords: [
    "Splitat careers",
    "Splitat jobs",
    "startup jobs India",
    "commercial real estate startup jobs",
    "retail tech jobs",
    "join Splitat team",
  ],
  alternates: {
    canonical: "https://www.Splitat.com/careers",
  },
  openGraph: {
    title: "Careers at Splitat",
    description:
      "Join Splitat and help build the future of commercial store space sharing in India.",
    url: "https://www.Splitat.com/careers",
    siteName: "Splitat",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};
export default function page() {
  return (
    <main className="w-full ">
      {/* HERO IMAGE SECTION */}
      <section className="relative h-[60vh] w-full mb-6 md:h-[70vh]">
        <Image
          src="/carer.jpg" // replace with your image
          alt="About us hero"
          fill
          priority
          className="object-cover rounded-2xl"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20 rounded-2xl" />

        {/* Title */}
        <div className="absolute bottom-10 left-6 md:left-16">
          <h2 className="text-3xl font-semibold text-white md:text-4xl">
            Work with Us
          </h2>
        </div>
      </section>

      {/* CONTENT SECTION */}

      <FrontendDeveloperJob />
    </main>
  );
}
