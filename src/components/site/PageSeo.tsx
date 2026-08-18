import { useEffect } from "react";

interface PageSeoProps {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  structuredData?: object;
}

export function PageSeo({ title, description, canonical, ogImage, structuredData }: PageSeoProps) {
  const image = ogImage ?? "https://telicomlink.com/og-default.jpg";

  useEffect(() => {
    document.title = title;
    setMeta("description", description);
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta("og:url", canonical, "property");
    setMeta("og:image", image, "property");
    setMeta("og:type", "website", "property");
    setMeta("og:site_name", "TelicomLink", "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", image);
    setLink("canonical", canonical);

    if (structuredData) {
      let el = document.getElementById("tl-structured-data") as HTMLScriptElement | null;
      if (!el) {
        el = document.createElement("script");
        el.id = "tl-structured-data";
        el.type = "application/ld+json";
        document.head.appendChild(el);
      }
      el.textContent = JSON.stringify(structuredData);
    }

    return () => {
      const el = document.getElementById("tl-structured-data");
      if (el) el.remove();
    };
  }, [title, description, canonical, image, structuredData]);

  return null;
}

function setMeta(name: string, content: string, attr: "name" | "property" = "name") {
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

export const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "TelicomLink",
  url: "https://telicomlink.com",
  logo: "https://telicomlink.com/favicon.png",
  email: "info@telicomlink.com",
  areaServed: ["Europe", "APAC"],
  sameAs: ["https://www.linkedin.com/company/telicomlink/"],
  contactPoint: [
    { "@type": "ContactPoint", telephone: "+33646018040", contactType: "customer service", areaServed: "Europe" },
    { "@type": "ContactPoint", telephone: "+919014127090", contactType: "customer service", areaServed: "APAC" },
  ],
};
