import projectsRaw from "@/data/projects.json";
import certsRaw from "@/data/certs.json";
import workRaw from "@/data/work.json";
import testimonialsRaw from "@/data/testimonials.json";
import aboutRaw from "@/data/about.json";
import contactRaw from "@/data/contact.json";
import type { Project, CertsData, WorkData, TestimonialsData, AboutData, ContactData, Cert } from "@/lib/types";

/* v3 files link internally as project-<slug>.html / projects/<slug>.html — normalize to /projects/<slug>/ */
const slugHref = (h: string) => h.replace(/^(?:.*\/)?(?:projects\/|project-)([a-z0-9-]+)\.html$/i, "/projects/$1/");

function deepNormalize<T>(v: T): T {
  if (typeof v === "string") return slugHref(v) as unknown as T;
  if (Array.isArray(v)) return v.map((x) => deepNormalize(x)) as unknown as T;
  if (v && typeof v === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, val] of Object.entries(v as Record<string, unknown>)) out[k] = k === "href" ? slugHref(String(val)) : deepNormalize(val);
    return out as T;
  }
  return v;
}

export const projects = deepNormalize(projectsRaw as unknown as Project[]);
export const certsData = certsRaw as unknown as CertsData;
export const work = deepNormalize(workRaw as unknown as WorkData);
export const testimonials = testimonialsRaw as unknown as TestimonialsData;
export const about = aboutRaw as unknown as AboutData;
export const contact = contactRaw as unknown as ContactData;

export function projectNeighbors(slug: string): { project: Project | null; prev: Project | null; next: Project | null } {
  const idx = projects.findIndex((x) => x.slug === slug);
  if (idx === -1) return { project: null, prev: null, next: null };
  return {
    project: projects[idx],
    prev: projects[(idx - 1 + projects.length) % projects.length],
    next: projects[(idx + 1) % projects.length],
  };
}

export function certNeighbors(slug: string): { cert: Cert | null; prev: Cert | null; next: Cert | null } {
  const certs = certsData.certs;
  const idx = certs.findIndex((x) => x.slug === slug);
  if (idx === -1) return { cert: null, prev: null, next: null };
  return {
    cert: certs[idx],
    prev: certs[(idx - 1 + certs.length) % certs.length],
    next: certs[(idx + 1) % certs.length],
  };
}
