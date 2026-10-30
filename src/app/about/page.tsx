import type { Metadata } from "next";
import { about } from "@/lib/data";
import AboutPageBody from "@/components/AboutPageBody";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "About — Mohamed Khairy" },
  description: about.page.sub.en,
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    mainEntity: {
      "@type": "Person",
      name: "Mohamed Khairy",
      jobTitle: "Frontend Developer",
      url: SITE.url,
      address: { "@type": "PostalAddress", addressCountry: "EG" },
    },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AboutPageBody data={about} />
    </>
  );
}
