"use client";

import { useMemo, useState } from "react";
import { Calculator, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/SectionReveal";
import { Button } from "@/components/ui/Button";
import { WaveDivider } from "@/components/decor/WaveDivider";
import { siteConfig } from "@/config/site";
import { formatPrice } from "@/lib/utils";

const AGES = Array.from(
  { length: siteConfig.ageRange.max - siteConfig.ageRange.min + 1 },
  (_, i) => siteConfig.ageRange.min + i,
);

export function Pricing() {
  const t = useTranslations("pricing");
  const tForm = useTranslations("form");
  const [age, setAge] = useState(AGES[0]);

  const calcPrice = useMemo(
    () => (age <= 3 ? siteConfig.pricing.young.price : siteConfig.pricing.older.price),
    [age],
  );

  const plans = [
    { key: "young", data: siteConfig.pricing.young },
    { key: "older", data: siteConfig.pricing.older },
  ] as const;

  return (
    <section id="pricing" className="relative bg-white py-20 sm:py-28">
      <WaveDivider className="absolute -top-[49px] sm:-top-[79px]" color="#ffffff" />
      <div className="container-page flex flex-col items-center gap-14">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

        <RevealGroup className="grid w-full max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
          {plans.map((plan) => (
            <RevealItem key={plan.key}>
              <div className="flex h-full flex-col gap-5 rounded-3xl bg-gradient-to-b from-primary-light to-white p-8 shadow-soft">
                <span className="w-fit rounded-full bg-accent-light px-3 py-1 text-xs font-bold text-accent-dark">
                  {t(`${plan.key}.note`)}
                </span>
                <p className="text-sm font-semibold text-ink/60">{t(`${plan.key}.label`)}</p>
                <div className="flex items-end gap-2">
                  <span className="font-heading text-4xl font-extrabold text-primary sm:text-5xl">
                    {formatPrice(plan.data.price)}
                  </span>
                  <span className="pb-1 text-sm font-semibold text-ink/60">
                    {siteConfig.pricing.currency} / {t("perMonth")}
                  </span>
                </div>
                <ul className="flex flex-col gap-2 text-sm text-ink/70">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 shrink-0 text-accent" /> {siteConfig.name}
                  </li>
                </ul>
                <Button as="a" href="#form" variant="primary" className="mt-auto w-full justify-center">
                  {t("bookBtn")}
                </Button>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="w-full max-w-md rounded-3xl bg-cream p-6 shadow-soft sm:p-8">
          <div className="mb-4 flex items-center gap-2 text-primary">
            <Calculator className="h-5 w-5" />
            <h3 className="font-heading text-lg font-bold">{t("calculator.title")}</h3>
          </div>
          <label htmlFor="age-calc" className="mb-2 block text-sm font-semibold text-ink/70">
            {t("calculator.selectAge")}
          </label>
          <select
            id="age-calc"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="min-h-11 w-full rounded-xl border-2 border-primary/15 bg-white px-4 py-2 text-base font-semibold text-ink focus:border-primary"
          >
            {AGES.map((a) => (
              <option key={a} value={a}>
                {tForm(`ageOptions.${a}`)}
              </option>
            ))}
          </select>
          <div className="mt-4 flex items-center justify-between rounded-xl bg-white p-4">
            <span className="font-semibold text-ink/70">{t("calculator.resultPrefix")}</span>
            <span className="font-heading text-xl font-extrabold text-accent">
              {formatPrice(calcPrice)} {siteConfig.pricing.currency}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
