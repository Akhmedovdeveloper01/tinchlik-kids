"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/SectionReveal";
import { Button } from "@/components/ui/Button";
import { VideoModal } from "@/components/ui/VideoModal";
import { InstagramIcon } from "@/components/decor/InstagramIcon";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type SiteVideo = (typeof siteConfig.videos)[number];

function canHoverPreview() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

function VideoCard({ video, title, onOpen }: { video: SiteVideo; title: string; onOpen: () => void }) {
  const [hovering, setHovering] = useState(false);

  return (
    <button
      type="button"
      onClick={onOpen}
      onMouseEnter={() => canHoverPreview() && setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className="group relative block aspect-[9/16] w-full overflow-hidden rounded-3xl bg-ink shadow-soft"
    >
      <Image
        src={video.poster}
        alt={title}
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 90vw"
        className={cn(
          "object-cover transition-opacity duration-300",
          hovering ? "opacity-0" : "opacity-100",
        )}
      />
      {hovering && (
        <video
          src={video.src}
          muted
          loop
          playsInline
          autoPlay
          preload="none"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-ink/10 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-primary shadow-soft-lg">
          <Play className="h-6 w-6 translate-x-0.5" />
        </span>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-4">
        <p className="truncate text-sm font-bold text-white">{title}</p>
      </div>
    </button>
  );
}

export function Videos() {
  const t = useTranslations("videos");
  const locale = useLocale();
  const [openVideo, setOpenVideo] = useState<SiteVideo | null>(null);

  function videoTitle(video: SiteVideo) {
    return locale === "ru" ? video.title_ru : video.title_uz;
  }

  return (
    <section className="bg-cream py-20 sm:py-28">
      <div className="container-page flex flex-col items-center gap-14">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

        <RevealGroup className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3">
          {siteConfig.videos.map((video) => (
            <RevealItem key={video.id}>
              <VideoCard
                video={video}
                title={videoTitle(video)}
                onOpen={() => setOpenVideo(video)}
              />
            </RevealItem>
          ))}
        </RevealGroup>

        <Button
          as="a"
          href={siteConfig.contact.instagram}
          target="_blank"
          rel="noopener noreferrer"
          variant="outline"
          icon={<InstagramIcon className="h-4 w-4" />}
        >
          {t("followBtn")}
        </Button>
      </div>

      <VideoModal
        src={openVideo?.src ?? null}
        poster={openVideo?.poster}
        title={openVideo ? videoTitle(openVideo) : undefined}
        onClose={() => setOpenVideo(null)}
        closeLabel={t("close")}
      />
    </section>
  );
}
