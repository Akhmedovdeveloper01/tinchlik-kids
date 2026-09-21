import { Phone, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { InstagramIcon } from "@/components/decor/InstagramIcon";
import { RainbowIcon } from "@/components/decor/RainbowIcon";
import { WaveDivider } from "@/components/decor/WaveDivider";
import { siteConfig } from "@/config/site";

const NAV_IDS = ["about", "program", "groups", "pricing", "gallery", "contact"] as const;

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-primary-dark text-white">
      <WaveDivider className="absolute -top-[49px] sm:-top-[79px]" color="#235a95" />
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 font-heading text-xl font-extrabold">
            <RainbowIcon className="h-9 w-9" />
            {siteConfig.name}
          </div>
          <p className="text-sm text-white/75">{t("tagline")}</p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-heading text-lg font-bold">{t("quickLinks")}</h3>
          <ul className="flex flex-col gap-2 text-sm text-white/75">
            {NAV_IDS.map((id) => (
              <li key={id}>
                <a href={`#${id}`} className="min-h-11 inline-flex items-center hover:text-white">
                  {tNav(id)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-heading text-lg font-bold">{t("contacts")}</h3>
          <ul className="flex flex-col gap-2 text-sm text-white/75">
            {siteConfig.contact.branches.map((branch) => (
              <li key={branch.id}>{branch.address}</li>
            ))}
            <li>
              <a href={siteConfig.contact.phoneHref} className="hover:text-white">
                {siteConfig.contact.phone}
              </a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-heading text-lg font-bold">{t("followUs")}</h3>
          <div className="flex gap-3">
            <a
              href={siteConfig.contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a
              href={siteConfig.contact.telegram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
            >
              <Send className="h-5 w-5" />
            </a>
            <a
              href={siteConfig.contact.phoneHref}
              aria-label={t("tagline")}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
            >
              <Phone className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-white/60">
        © {year} {siteConfig.name}. {t("rights")}
      </div>
    </footer>
  );
}
