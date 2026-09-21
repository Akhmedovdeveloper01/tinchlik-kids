"use client";

import { Apple, GraduationCap, Heart, Home, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/SectionReveal";
import { WaveDivider } from "@/components/decor/WaveDivider";

const BENEFITS = [
  { key: "quality", icon: GraduationCap, bg: "bg-primary-light", fg: "text-primary" },
  { key: "care", icon: Heart, bg: "bg-pink/40", fg: "text-pink-dark" },
  { key: "rooms", icon: Home, bg: "bg-sunny/30", fg: "text-sunny-dark" },
  { key: "safety", icon: ShieldCheck, bg: "bg-accent-light", fg: "text-accent-dark" },
  { key: "nutrition", icon: Apple, bg: "bg-lavender/30", fg: "text-lavender-dark" },
] as const;

export function About() {
  const t = useTranslations("about");

  return (
    <section id="about" className="relative bg-white py-20 sm:py-28">
      <WaveDivider className="absolute -top-[49px] sm:-top-[79px]" color="white" />

      <div className="container-page flex flex-col items-center gap-14">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
        <p className="-mt-8 max-w-2xl text-center text-base text-ink/70 sm:text-lg">
          {t("text")}
        </p>

        <RevealGroup className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {BENEFITS.map((b) => (
            <RevealItem key={b.key}>
              <div className="flex h-full flex-col items-center gap-4 rounded-3xl bg-cream p-6 text-center shadow-soft transition-transform duration-300 hover:-translate-y-2 hover:shadow-soft-lg">
                <span className={`flex h-14 w-14 items-center justify-center rounded-2xl ${b.bg}`}>
                  <b.icon className={`h-7 w-7 ${b.fg}`} aria-hidden="true" />
                </span>
                <h3 className="font-heading text-lg font-bold text-ink">
                  {t(`benefits.${b.key}.title`)}
                </h3>
                <p className="text-sm text-ink/65">{t(`benefits.${b.key}.desc`)}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
