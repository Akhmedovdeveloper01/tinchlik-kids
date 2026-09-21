"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Baby, GraduationCap, Smile } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const ICONS = { toddler: Baby, middle: Smile, senior: GraduationCap };

export function Groups() {
  const t = useTranslations("groups");
  const [active, setActive] = useState<string>(siteConfig.ageGroups[0].id);
  const Icon = ICONS[active as keyof typeof ICONS];

  return (
    <section id="groups" className="bg-white py-20 sm:py-28">
      <div className="container-page flex flex-col items-center gap-12">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

        <div
          role="tablist"
          aria-label={t("title")}
          className="flex w-full max-w-xl flex-col gap-2 rounded-full bg-cream p-2 sm:flex-row"
        >
          {siteConfig.ageGroups.map((group) => (
            <button
              key={group.id}
              role="tab"
              type="button"
              aria-selected={active === group.id}
              onClick={() => setActive(group.id)}
              className={cn(
                "min-h-11 flex-1 rounded-full px-4 py-3 text-sm font-bold transition-colors sm:text-base",
                active === group.id
                  ? "bg-primary text-white shadow-soft"
                  : "text-ink/60 hover:text-primary",
              )}
            >
              {t(`tabs.${group.id}.label`)}
            </button>
          ))}
        </div>

        <div className="relative w-full max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex flex-col items-center gap-4 rounded-3xl bg-gradient-to-b from-primary-light to-white p-8 text-center shadow-soft sm:p-12"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-soft">
                <Icon className="h-8 w-8 text-primary" aria-hidden="true" />
              </span>
              <span className="rounded-full bg-accent-light px-4 py-1 text-sm font-bold text-accent-dark">
                {t(`tabs.${active}.label`)}
              </span>
              <h3 className="font-heading text-2xl font-extrabold text-ink">
                {t(`tabs.${active}.title`)}
              </h3>
              <p className="max-w-lg text-ink/70">{t(`tabs.${active}.desc`)}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
