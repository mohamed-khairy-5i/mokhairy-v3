import type { MetadataRoute } from "next";
import projects from "@/data/projects.json";
import certsData from "@/data/certs.json";

export const dynamic = "force-static";

const BASE = "https://mokhairy-v3.pages.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const statics = ["", "/work/", "/projects/", "/certificates/", "/about/", "/testimonials/", "/contact/"].map((p) => ({
    url: `${BASE}${p}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.8,
  }));
  const projPages = projects.map((p) => ({
    url: `${BASE}/projects/${p.slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  const certPages = certsData.certs.map((c) => ({
    url: `${BASE}/certificates/${c.slug}/`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));
  return [...statics, ...projPages, ...certPages];
}
