"use client";

import { Brain, Dumbbell, Languages, Music, Palette, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/SectionReveal";
import { WaveDivider } from "@/components/decor/WaveDivider";
import { siteConfig } from "@/config/site";

const ICONS: Record<string, LucideIcon> = {
  Languages,
  Brain,
  Palette,
  Music,
  Dumbbell,
};

const CARD_COLORS = [
  "from-primary-light to-white",
  "from-pink/30 to-white",
  "from-sunny/25 to-white",
  "from-accent-light to-white",
  "from-lavender/30 to-white",
];

export function Program() {
  const t = useTranslations("program");

  return (
    <section id="program" className="relative bg-cream py-20 sm:py-28">
      <WaveDivider className="absolute -top-[49px] sm:-top-[79px]" color="#fffaf0" />
      <div className="container-page flex flex-col items-center gap-14">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

        <RevealGroup className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {siteConfig.programs.map((program, i) => {
            const Icon = ICONS[program.icon];
            return (
              <RevealItem key={program.id}>
                <motion.div
                  whileHover={{ y: -10, rotate: i % 2 === 0 ? -2 : 2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  className={`group flex h-full flex-col items-center gap-4 rounded-3xl bg-gradient-to-b ${CARD_COLORS[i % CARD_COLORS.length]} p-6 text-center shadow-soft`}
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-soft transition-transform duration-300 group-hover:animate-bounce-soft">
                    {Icon && <Icon className="h-8 w-8 text-primary" aria-hidden="true" />}
                  </span>
                  <h3 className="font-heading text-lg font-bold text-ink">
                    {t(`items.${program.id}.title`)}
                  </h3>
                  <p className="text-sm text-ink/65">{t(`items.${program.id}.desc`)}</p>
                </motion.div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
