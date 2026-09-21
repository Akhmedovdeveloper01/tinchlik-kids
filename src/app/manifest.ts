import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: "Farzandingiz uchun sifatli ta'lim va mehribon jamoa",
    start_url: "/uz/",
    display: "standalone",
    background_color: "#fffaf0",
    theme_color: "#2f6fb5",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
