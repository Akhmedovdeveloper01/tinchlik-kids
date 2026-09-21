"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Phone, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Clouds } from "@/components/decor/Clouds";
import { Rainbow } from "@/components/decor/Rainbow";
import { siteConfig } from "@/config/site";

export function Hero() {
  const t = useTranslations("hero");
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -60]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 60, damping: 20 });
  const springY = useSpring(my, { stiffness: 60, damping: 20 });
  const blob1Y = useTransform([y1, springY], ([scroll, mouse]) => (scroll as number) + (mouse as number));

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - rect.left) / rect.width - 0.5) * 24);
    my.set(((e.clientY - rect.top) / rect.height - 0.5) * 24);
  }

  return (
    <section
      id="hero"
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden bg-gradient-to-b from-primary-light via-cream to-cream pb-20 pt-28 sm:pb-28 sm:pt-36"
    >
      <Clouds />

      <motion.div
        style={{ x: springX, y: blob1Y }}
        className="pointer-events-none absolute left-[8%] top-[22%] h-16 w-16 rounded-full bg-sunny/70 blur-[1px] sm:h-24 sm:w-24"
        aria-hidden="true"
      />
      <motion.div
        style={{ x: useTransform(springX, (v) => -v), y: y2 }}
        className="pointer-events-none absolute right-[10%] top-[35%] h-20 w-20 rounded-full bg-pink/60 blur-[1px] sm:h-28 sm:w-28"
        aria-hidden="true"
      />
      <motion.div
        style={{ y: y1 }}
        className="pointer-events-none absolute left-[18%] bottom-[8%] h-12 w-12 rounded-full bg-lavender/60 sm:h-16 sm:w-16"
        aria-hidden="true"
      />

      <div className="container-page relative flex flex-col items-center text-center">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-bold text-primary shadow-soft"
        >
          <Sparkles className="h-4 w-4 text-sunny-dark" />
          {t("greeting")}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading max-w-3xl text-4xl font-extrabold leading-tight text-ink sm:text-5xl md:text-6xl"
        >
          {t("title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-5 max-w-xl text-lg text-ink/70 sm:text-xl"
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-col gap-4 sm:flex-row"
        >
          <Button as="a" href="#form" variant="accent" size="lg">
            {t("ctaApply")}
          </Button>
          <Button
            as="a"
            href={siteConfig.contact.phoneHref}
            variant="outline"
            size="lg"
            icon={<Phone className="h-5 w-5" />}
          >
            {t("ctaCall")}
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 w-full max-w-md"
        >
          <Rainbow className="mx-auto w-64 sm:w-80" />
          <p className="mt-2 text-sm font-semibold text-ink/60">{t("openDoors")}</p>
        </motion.div>
      </div>
    </section>
  );
}
