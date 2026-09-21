"use client";

import { useTranslations } from "next-intl";
import { CountUp } from "@/components/ui/CountUp";
import { RevealGroup, RevealItem } from "@/components/ui/SectionReveal";
import { siteConfig } from "@/config/site";

export function Stats() {
  const t = useTranslations("stats");

  const cards = [
    {
      key: "groups",
      value: <CountUp value={siteConfig.groupsCount} />,
      label: t("groupsLabel"),
    },
    {
      key: "age",
      value: (
        <>
          <CountUp value={siteConfig.ageRange.min} />
          {"–"}
          <CountUp value={siteConfig.ageRange.max} />
        </>
      ),
      label: t("ageLabel"),
    },
    {
      key: "programs",
      value: <CountUp value={siteConfig.programCount} />,
      label: t("programsLabel"),
    },
    {
      key: "since",
      value: t("since"),
      label: t("sinceLabel"),
    },
  ];

  return (
    <section className="relative -mt-10 pb-16 sm:-mt-14">
      <div className="container-page">
        <RevealGroup className="grid grid-cols-2 gap-4 rounded-3xl bg-white p-6 shadow-soft-lg sm:gap-6 sm:p-10 lg:grid-cols-4">
          {cards.map((card) => (
            <RevealItem key={card.key} className="flex flex-col items-center gap-1 text-center">
              <div className="font-heading text-3xl font-extrabold text-primary sm:text-4xl">
                {card.value}
              </div>
              <div className="text-sm font-semibold text-ink/60 sm:text-base">
                {card.label}
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
