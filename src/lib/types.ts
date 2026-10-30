export type Bi = { en: string; ar: string };

export type ProductLink = { label: Bi; href: string };

export type WorkProduct = {
  img: string;
  alt: string;
  type: Bi;
  year: string;
  title: string;
  p: Bi;
  href: string;
  terminal?: string[];
  links: ProductLink[];
};

export type WorkDesign = { img: string; alt: string; meta: string[] };

export type WorkData = {
  page: { overline: Bi; title: Bi; sub: Bi };
  filters: { id: string; label: Bi }[];
  products: WorkProduct[];
  design: WorkDesign[];
};

export type StoryBlock =
  | { type: "p"; en: string; ar: string }
  | { type: "cols"; cols: Bi[] }
  | { type: "list"; items: Bi[] }
  | { type: "pills"; items: string[] }
  | { type: "term"; lines: string[] };

export type Project = {
  slug: string;
  layout: "story" | "standard";
  title: string;
  overline?: Bi;
  sub: Bi;
  tags?: Bi[];
  img?: string;
  img_alt?: string;
  ctas: ProductLink[];
  metrics?: { v: string; label: Bi }[];
  stack?: string[];
  story?: { n: string; h: Bi; p: Bi }[];
  sections?: { h: Bi; blocks: StoryBlock[] }[];
};

export type Cert = {
  slug: string;
  group: string;
  href: string;
  img: string;
  img_en: string;
  img_ar: string | null;
  issuer: string;
  title: Bi;
  category: Bi;
  date: string;
};

export type CertsData = {
  page: { overline: Bi; title: Bi; sub: Bi };
  groups: { id: string; label: Bi }[];
  certs: Cert[];
};

export type Quote = { text: Bi; ctx: Bi; who: Bi };

export type TestimonialsData = {
  page: { overline: Bi; title: Bi; sub: Bi };
  blocks: { h: Bi; p: Bi }[];
  quotes: Quote[];
};

export type AboutData = {
  page: { overline: Bi; title: Bi; sub: Bi };
  stats: { v: string; label: Bi }[];
  caps: { h: Bi; p: Bi }[];
  stack: { h: Bi; pills: string[] }[];
  paras: { sec: string; en: string; ar: string }[];
};

export type ContactData = {
  page: { overline: Bi; title: Bi; sub: Bi };
  fields: {
    label: Bi;
    type: "select" | "textarea" | "input";
    name: string;
    placeholder_en: string;
    placeholder_ar: string;
    options: { en: string; ar: string }[];
  }[];
  buttons: { label: Bi; href: string }[];
  links: { label: Bi; href: string }[];
  note: string;
};
