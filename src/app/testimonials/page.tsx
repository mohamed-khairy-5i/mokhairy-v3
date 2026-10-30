import type { Metadata } from "next";
import { testimonials } from "@/lib/data";
import TestimonialsBody from "@/components/TestimonialsBody";

export const metadata: Metadata = {
  title: { absolute: "Testimonials — Mohamed Khairy" },
  description: testimonials.page.sub.en,
};

export default function TestimonialsPage() {
  return <TestimonialsBody data={testimonials} />;
}
