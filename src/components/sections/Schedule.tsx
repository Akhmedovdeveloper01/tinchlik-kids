"use client";

import {
  BookOpen,
  Coffee,
  Cookie,
  Moon,
  Puzzle,
  ToyBrick,
  TreePine,
  UtensilsCrossed,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/SectionReveal";
import { siteConfig } from "@/config/site";

const ICONS: Record<string, LucideIcon> = {
  breakfast: Coffee,
  morningActivity: BookOpen,
  walk: TreePine,
  lunch: UtensilsCrossed,
  nap: Moon,
  afternoonActivity: Puzzle,
  snack: Cookie,
  freePlay: ToyBrick,
  pickup: Users,
};

export function Schedule() {
  const t = useTranslations("schedule");

  return (
    <section className="bg-cream py-20 sm:py-28">
      <div className="container-page flex flex-col items-center gap-14">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

        <RevealGroup className="relative w-full max-w-2xl">
          <div
            className="absolute left-6 top-2 bottom-2 w-1 rounded-full bg-primary-light sm:left-1/2 sm:-translate-x-1/2"
            aria-hidden="true"
          />
          <ol className="flex flex-col gap-6">
            {siteConfig.schedule.map((step, i) => {
              const Icon = ICONS[step.id];
              const isEven = i % 2 === 0;
              return (
                <RevealItem key={step.id}>
                  <li
                    className={`relative flex items-center gap-4 sm:gap-8 ${
                      isEven ? "sm:flex-row" : "sm:flex-row-reverse"
                    }`}
                  >
                    <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-soft sm:h-14 sm:w-14">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div
                      className={`flex-1 rounded-2xl bg-white p-4 shadow-soft sm:max-w-[calc(50%-2.5rem)] ${
                        isEven ? "" : "sm:text-right"
                      }`}
                    >
                      <div className="font-heading text-lg font-extrabold text-primary">
                        {step.time}
                      </div>
                      <div className="text-sm font-semibold text-ink/70">
                        {t(`items.${step.id}.label`)}
                      </div>
                    </div>
                  </li>
                </RevealItem>
              );
            })}
          </ol>
        </RevealGroup>
      </div>
    </section>
  );
}
