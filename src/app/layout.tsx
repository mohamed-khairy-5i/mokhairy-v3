import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Sans_Arabic, IBM_Plex_Mono } from "next/font/google";
import { LangProvider } from "@/lib/lang";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import RevealRoot from "@/components/RevealRoot";
import "./globals.css";

const head = Space_Grotesk({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--f-head" });
const body = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--f-body" });
const arabic = IBM_Plex_Sans_Arabic({ subsets: ["arabic"], weight: ["400", "500", "700"], variable: "--f-arabic" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "600"], variable: "--f-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://mokhairy-v3.pages.dev"),
  title: {
    absolute: "Mohamed Khairy — Frontend Developer · Arabic-first products & dev tools",
  },
  description:
    "Freelance frontend developer from Egypt. Arabic-first SaaS products and developer tools — Waslfy, TossInbox, trigger-doctor. Shipped, not just designed.",
  openGraph: {
    title: "Mohamed Khairy — Frontend Developer",
    description: "Arabic-first products & developer tools — shipped, not just designed.",
    images: ["/assets/og-image.png"],
    type: "website",
  },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#070b18",
};

const noFlash = `(function(){try{var t=localStorage.getItem('mk-theme');if(t==='light'||t==='dark'){document.documentElement.dataset.theme=t}else{document.documentElement.dataset.theme='dark'}var l=localStorage.getItem('mk-lang');if(l==='ar'){document.documentElement.lang='ar';document.documentElement.dir='rtl'}}catch(e){document.documentElement.dataset.theme='dark'}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fontVars = `${head.variable} ${body.variable} ${arabic.variable} ${mono.variable}`;
  return (
    <html lang="en" dir="ltr" data-theme="dark" className={fontVars} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlash }} />
      </head>
      <body>
        <LangProvider>
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <SiteNav />
          <main id="main">{children}</main>
          <SiteFooter />
          <RevealRoot />
        </LangProvider>
      </body>
    </html>
  );
}
