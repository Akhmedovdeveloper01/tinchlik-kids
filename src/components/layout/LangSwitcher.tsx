"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const LABELS: Record<string, string> = { uz: "UZ", ru: "RU" };

export function LangSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("header");

  function switchTo(nextLocale: string) {
    try {
      window.localStorage.setItem("locale", nextLocale);
    } catch {
      // ignore storage errors (private mode, etc.)
    }
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <div
      className={cn(
        "inline-flex rounded-full border-2 border-primary/15 bg-white/80 p-1",
        className,
      )}
      role="group"
      aria-label={t("langSwitch")}
    >
      {routing.locales.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => switchTo(code)}
          aria-pressed={locale === code}
          className={cn(
            "min-h-11 min-w-11 rounded-full px-3 text-sm font-extrabold transition-colors",
            locale === code
              ? "bg-primary text-white shadow-soft"
              : "text-ink/60 hover:text-primary",
          )}
        >
          {LABELS[code]}
        </button>
      ))}
    </div>
  );
}
