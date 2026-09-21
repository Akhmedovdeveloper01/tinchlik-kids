"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { routing } from "@/i18n/routing";

export default function RootRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    let locale: string = routing.defaultLocale;
    try {
      const saved = window.localStorage.getItem("locale");
      if (saved && (routing.locales as readonly string[]).includes(saved)) {
        locale = saved;
      }
    } catch {
      // localStorage unavailable — fall back to default locale
    }
    router.replace(`/${locale}/`);
  }, [router]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-cream">
      <div
        className="h-12 w-12 animate-spin rounded-full border-4 border-primary-light border-t-primary"
        aria-hidden="true"
      />
    </div>
  );
}
