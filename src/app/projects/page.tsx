import type { Metadata } from "next";
import { projects } from "@/lib/data";
import ProjectsGrid from "@/components/ProjectsGrid";

export const metadata: Metadata = {
  title: { absolute: "Projects — Mohamed Khairy" },
  description:
    "All 21 projects split by topic — personal products, open-source tools, client work and graphic design. University projects get their own filter too.",
};

export default function ProjectsPage() {
  return <ProjectsGrid projects={projects} />;
}
