"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/SectionReveal";
import { Lightbox } from "@/components/ui/Lightbox";
import { siteConfig } from "@/config/site";

export function Gallery() {
  const t = useTranslations("gallery");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const images = [...siteConfig.gallery.images];

  return (
    <section id="gallery" className="bg-cream py-20 sm:py-28">
      <div className="container-page flex flex-col items-center gap-12">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

        <RevealGroup className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {images.map((src, i) => (
            <RevealItem key={src}>
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                className="group relative block aspect-square w-full overflow-hidden rounded-2xl shadow-soft"
              >
                <Image
                  src={src}
                  alt={`${t("title")} ${i + 1}`}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </button>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      <Lightbox
        images={images}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onChange={setOpenIndex}
      />
    </section>
  );
}
