"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/SectionReveal";
import { cn } from "@/lib/utils";

type FaqItem = { q: string; a: string };

export function FAQ() {
  const t = useTranslations("faq");
  const items = t.raw("items") as FaqItem[];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-cream py-20 sm:py-28">
      <div className="container-page flex flex-col items-center gap-12">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />

        <RevealGroup className="flex w-full max-w-2xl flex-col gap-4">
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <RevealItem key={item.q}>
                <div className="overflow-hidden rounded-2xl bg-white shadow-soft">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex min-h-14 w-full items-center justify-between gap-4 px-6 py-4 text-left"
                  >
                    <span className="font-heading font-bold text-ink">{item.q}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="shrink-0 text-primary"
                    >
                      <ChevronDown className="h-5 w-5" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className={cn("overflow-hidden")}
                      >
                        <p className="px-6 pb-5 text-ink/70">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
