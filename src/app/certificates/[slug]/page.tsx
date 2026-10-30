import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { certsData, certNeighbors } from "@/lib/data";
import CertPage from "@/components/CertPage";

export function generateStaticParams() {
  return certsData.certs.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = certsData.certs.find((x) => x.slug === slug);
  if (!c) return {};
  return {
    title: { absolute: `${c.title.en} — ${c.issuer}` },
    description: `${c.title.en} — verified certificate from ${c.issuer}, ${c.date}. Mohamed Khairy, frontend developer.`,
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { cert, prev, next } = certNeighbors(slug);
  if (!cert) notFound();
  return <CertPage cert={cert} prev={prev} next={next} />;
}
