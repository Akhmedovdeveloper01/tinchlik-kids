"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Quote, User } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WaveDivider } from "@/components/decor/WaveDivider";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const AVATAR_COLORS = ["bg-primary-light text-primary", "bg-pink/40 text-pink-dark", "bg-sunny/30 text-sunny-dark"];

export function Testimonials() {
  const t = useTranslations("testimonials");
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: true }),
  ]);
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing initial state from the embla carousel instance
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="relative bg-white py-20 sm:py-28">
      <WaveDivider className="absolute -top-[49px] sm:-top-[79px]" color="#ffffff" />
      <div className="container-page flex flex-col items-center gap-12">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />

        <div className="relative w-full max-w-2xl">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {siteConfig.testimonials.map((item, i) => (
                <div key={item.id} className="min-w-0 flex-[0_0_100%] px-2">
                  <div className="flex flex-col items-center gap-4 rounded-3xl bg-cream p-8 text-center shadow-soft sm:p-12">
                    <Quote className="h-8 w-8 text-primary-light" aria-hidden="true" />
                    <p className="max-w-lg text-lg text-ink/75">
                      {t(`items.${item.id}.text`)}
                    </p>
                    <div
                      className={cn(
                        "flex h-14 w-14 items-center justify-center rounded-full",
                        AVATAR_COLORS[i % AVATAR_COLORS.length],
                      )}
                    >
                      <User className="h-7 w-7" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="font-heading font-bold text-ink">
                        {t(`items.${item.id}.name`)}
                      </div>
                      <div className="text-sm text-ink/60">{t(`items.${item.id}.role`)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            aria-label="Previous"
            className="absolute left-0 top-1/2 hidden h-11 w-11 -translate-x-4 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary shadow-soft hover:bg-primary-light sm:flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            aria-label="Next"
            className="absolute right-0 top-1/2 hidden h-11 w-11 -translate-y-1/2 translate-x-4 items-center justify-center rounded-full bg-white text-primary shadow-soft hover:bg-primary-light sm:flex"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="mt-6 flex justify-center gap-2">
            {siteConfig.testimonials.map((item, i) => (
              <button
                key={item.id}
                type="button"
                onClick={() => emblaApi?.scrollTo(i)}
                aria-label={`Slide ${i + 1}`}
                className={cn(
                  "h-2.5 rounded-full transition-all",
                  selected === i ? "w-6 bg-primary" : "w-2.5 bg-primary/20",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
