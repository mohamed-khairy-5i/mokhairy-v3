import type { Metadata } from "next";
import { certsData } from "@/lib/data";
import CertsIndex from "@/components/CertsIndex";

export const metadata: Metadata = {
  title: { absolute: "Certificates — Mohamed Khairy" },
  description: certsData.page.sub.en,
};

export default function CertificatesPage() {
  return <CertsIndex data={certsData} />;
}
