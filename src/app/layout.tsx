import type { ReactNode } from "react";
import { Nunito } from "next/font/google";
import { routing } from "@/i18n/routing";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "700", "800", "900"],
});

// `lang` defaults to the site's default locale here because this layout also
// renders the non-localized "/" redirect page. `[locale]/layout.tsx` corrects
// it client-side once the actual locale is known (see SetHtmlLang).
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={routing.defaultLocale} className={`${nunito.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col overflow-x-hidden bg-cream">
        {children}
      </body>
    </html>
  );
}
