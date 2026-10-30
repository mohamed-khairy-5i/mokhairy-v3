import type { Metadata } from "next";
import { projects } from "@/lib/data";
import ProjectsGrid from "@/components/ProjectsGrid";

export const metadata: Metadata = {
  title: { absolute: "Projects — Mohamed Khairy" },
  description: "All 21 projects — web products, Arabic apps, CLI tools, brand identities and design work.",
};

export default function ProjectsPage() {
  return <ProjectsGrid projects={projects} />;
}
