import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, projectNeighbors } from "@/lib/data";
import ProjectPage from "@/components/ProjectPage";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: { absolute: `${p.title} — Mohamed Khairy` },
    description: p.sub.en,
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { project, prev, next } = projectNeighbors(slug);
  if (!project) notFound();
  return <ProjectPage project={project} prev={prev} next={next} />;
}
