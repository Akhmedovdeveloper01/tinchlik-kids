import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = siteConfig.seo.siteUrl;

  return routing.locales.map((locale) => ({
    url: `${url}/${locale}/`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: locale === routing.defaultLocale ? 1 : 0.9,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${url}/${l}/`]),
      ),
    },
  }));
}
