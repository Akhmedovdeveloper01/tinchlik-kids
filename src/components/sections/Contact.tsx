"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Navigation, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { InstagramIcon } from "@/components/decor/InstagramIcon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { RevealGroup, RevealItem } from "@/components/ui/SectionReveal";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function Contact() {
  const t = useTranslations("contact");
  const [branchId, setBranchId] = useState<string>(siteConfig.contact.branches[0].id);
  const branch =
    siteConfig.contact.branches.find((b) => b.id === branchId) ??
    siteConfig.contact.branches[0];

  const rows = [
    { key: "phone", icon: Phone, label: t("phone"), value: siteConfig.contact.phone, href: siteConfig.contact.phoneHref },
    {
      key: "instagram",
      icon: InstagramIcon,
      label: t("instagram"),
      value: siteConfig.contact.instagramHandle,
      href: siteConfig.contact.instagram,
    },
  ];

  return (
    <section id="contact" className="bg-cream py-20 sm:py-28">
      <div className="container-page flex flex-col items-center gap-12">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />

        {siteConfig.contact.branches.length > 1 && (
          <div
            role="tablist"
            aria-label={t("address")}
            className="flex w-full max-w-md flex-col gap-2 rounded-full bg-white p-2 shadow-soft sm:flex-row"
          >
            {siteConfig.contact.branches.map((b) => (
              <button
                key={b.id}
                role="tab"
                type="button"
                aria-selected={branchId === b.id}
                onClick={() => setBranchId(b.id)}
                className={cn(
                  "min-h-11 flex-1 rounded-full px-4 py-2.5 text-sm font-bold transition-colors",
                  branchId === b.id
                    ? "bg-primary text-white shadow-soft"
                    : "text-ink/60 hover:text-primary",
                )}
              >
                {t(`branches.${b.id}`)}
              </button>
            ))}
          </div>
        )}

        <RevealGroup className="grid w-full grid-cols-1 gap-8 lg:grid-cols-2">
          <RevealItem className="flex flex-col gap-6 rounded-3xl bg-white p-8 shadow-soft">
            <ul className="flex flex-col gap-5">
              <li className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <div className="text-sm font-semibold text-ink/50">{t("address")}</div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={branch.id}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.2 }}
                      className="font-bold text-ink"
                    >
                      {branch.address}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </li>

              {rows.map((row) => (
                <li key={row.key} className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
                    <row.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-ink/50">{row.label}</div>
                    <a
                      href={row.href}
                      target={row.href.startsWith("http") ? "_blank" : undefined}
                      rel={row.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="font-bold text-ink hover:text-primary"
                    >
                      {row.value}
                    </a>
                  </div>
                </li>
              ))}
            </ul>

            <p className="rounded-2xl bg-accent-light px-5 py-4 text-sm font-bold text-accent-dark">
              {t("openDoors")}
            </p>

            <Button
              as="a"
              href={branch.mapDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              icon={<Navigation className="h-4 w-4" />}
              className="w-full justify-center"
            >
              {t("directions")}
            </Button>
          </RevealItem>

          <RevealItem className="overflow-hidden rounded-3xl shadow-soft">
            <iframe
              key={branch.id}
              src={branch.mapEmbedSrc}
              title={branch.address}
              className="h-full min-h-[320px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
