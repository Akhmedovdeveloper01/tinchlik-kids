import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { About } from "@/components/sections/About";
import { Program } from "@/components/sections/Program";
import { Groups } from "@/components/sections/Groups";
import { Schedule } from "@/components/sections/Schedule";
import { Pricing } from "@/components/sections/Pricing";
import { Gallery } from "@/components/sections/Gallery";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { ApplicationForm } from "@/components/sections/ApplicationForm";
import { Contact } from "@/components/sections/Contact";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Stats />
      <About />
      <Program />
      <Groups />
      <Schedule />
      <Pricing />
      <Gallery />
      <Testimonials />
      <FAQ />
      <ApplicationForm />
      <Contact />
    </>
  );
}
