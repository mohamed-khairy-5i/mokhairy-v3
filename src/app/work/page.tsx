import type { Metadata } from "next";
import { work } from "@/lib/data";
import WorkGrid from "@/components/WorkGrid";

export const metadata: Metadata = {
  title: { absolute: "Work — Mohamed Khairy" },
  description: work.page.sub.en,
};

export default function WorkPage() {
  return <WorkGrid data={work} />;
}
