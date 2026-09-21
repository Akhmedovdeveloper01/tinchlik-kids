import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/config/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { BackToTop } from "@/components/layout/BackToTop";
import { Loader } from "@/components/layout/Loader";
import { SetHtmlLang } from "@/components/layout/SetHtmlLang";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const url = siteConfig.seo.siteUrl;

  return {
    metadataBase: new URL(url),
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${url}/${locale}/`,
      languages: {
        uz: `${url}/uz/`,
        ru: `${url}/ru/`,
      },
    },
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: `${url}/${locale}/`,
      siteName: siteConfig.name,
      locale: locale === "uz" ? "uz_UZ" : "ru_RU",
      type: "website",
      // TODO: /public/og-image.jpg (1200x630) rasmini qo'shing
      images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("ogTitle"),
      description: t("ogDescription"),
    },
    manifest: "/manifest.webmanifest",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ChildCare",
    name: siteConfig.name,
    description:
      locale === "uz"
        ? "Farzandingiz uchun sifatli ta'lim va mehribon jamoa"
        : "Качественное образование и заботливый коллектив для вашего ребёнка",
    address: siteConfig.contact.branches.map((branch) => ({
      "@type": "PostalAddress",
      streetAddress: branch.address,
      addressLocality: "Toshkent",
      addressCountry: "UZ",
    })),
    telephone: siteConfig.contact.phone,
    url: `${siteConfig.seo.siteUrl}/${locale}/`,
    sameAs: [siteConfig.contact.instagram],
    priceRange: `${siteConfig.pricing.older.price} - ${siteConfig.pricing.young.price} UZS`,
  };

  return (
    <NextIntlClientProvider>
      <SetHtmlLang locale={locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Loader />
      <Header />
      <main id="top" className="flex-1">
        {children}
      </main>
      <Footer />
      <FloatingActions />
      <BackToTop />
    </NextIntlClientProvider>
  );
}
