import type { Metadata } from "next";
import { contact } from "@/lib/data";
import ContactBody from "@/components/ContactBody";

export const metadata: Metadata = {
  title: { absolute: "Contact — Mohamed Khairy" },
  description: contact.page.sub.en,
};

export default function ContactPage() {
  return <ContactBody data={contact} />;
}
