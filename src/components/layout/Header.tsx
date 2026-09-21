"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { RainbowIcon } from "@/components/decor/RainbowIcon";
import { LangSwitcher } from "@/components/layout/LangSwitcher";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const NAV_IDS = ["about", "program", "groups", "pricing", "gallery", "contact"] as const;

export function Header() {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "bg-white/90 shadow-soft backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between sm:h-20">
        <a href="#top" className="flex items-center gap-2 font-heading text-lg font-extrabold text-primary sm:text-xl">
          <RainbowIcon className="h-8 w-8 sm:h-9 sm:w-9" />
          {siteConfig.name}
        </a>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main">
          {NAV_IDS.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className="text-sm font-bold text-ink/70 transition-colors hover:text-primary"
            >
              {t(id)}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LangSwitcher />
          <Button
            as="a"
            href={siteConfig.contact.phoneHref}
            variant="accent"
            size="md"
            icon={<Phone className="h-4 w-4" />}
          >
            {t("callBtn")}
          </Button>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full text-ink lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? tCommon("closeMenu") : tCommon("openMenu")}
        >
          {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden bg-white shadow-soft lg:hidden"
          >
            <nav className="container-page flex flex-col gap-1 py-4" aria-label="Mobile">
              {NAV_IDS.map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  className="min-h-11 rounded-xl px-3 py-3 text-base font-bold text-ink/80 transition-colors hover:bg-primary-light hover:text-primary"
                >
                  {t(id)}
                </a>
              ))}
              <div className="mt-2 flex items-center justify-between gap-3 px-3">
                <LangSwitcher />
                <Button
                  as="a"
                  href={siteConfig.contact.phoneHref}
                  variant="accent"
                  size="md"
                  icon={<Phone className="h-4 w-4" />}
                >
                  {t("callBtn")}
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
