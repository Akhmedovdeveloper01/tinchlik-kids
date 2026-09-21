"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { IMaskInput } from "react-imask";
import confetti from "canvas-confetti";
import { CheckCircle2, Send, XCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { isTelegramConfigured, sendTelegramMessage } from "@/lib/telegram";
import { cn } from "@/lib/utils";

const AGES = Array.from(
  { length: 7 },
  (_, i) => i + 1,
);

const PHONE_REGEX = /^\+998 \d{2} \d{3} \d{2} \d{2}$/;

function fireConfetti() {
  confetti({
    particleCount: 120,
    spread: 90,
    origin: { y: 0.6 },
    colors: ["#2F6FB5", "#3BA55C", "#FFD84D", "#F7C6E0", "#C9B8F2"],
  });
}

function redirectToPhoneCall() {
  window.location.href = siteConfig.contact.phoneHref;
}

export function ApplicationForm() {
  const t = useTranslations("form");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const schema = z.object({
    name: z
      .string()
      .min(1, t("errors.nameRequired"))
      .min(2, t("errors.nameMin")),
    phone: z
      .string()
      .min(1, t("errors.phoneRequired"))
      .regex(PHONE_REGEX, t("errors.phoneInvalid")),
    age: z.string().min(1, t("errors.ageRequired")),
    time: z.string().optional(),
    comment: z.string().optional(),
  });

  type FormValues = z.infer<typeof schema>;

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", phone: "", age: "", time: "", comment: "" },
  });

  async function onSubmit(data: FormValues) {
    if (!isTelegramConfigured()) {
      redirectToPhoneCall();
      return;
    }

    setStatus("submitting");
    try {
      await sendTelegramMessage(data);
      setStatus("success");
      fireConfetti();
      reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="form" className="bg-white py-20 sm:py-28">
      <div className="container-page flex flex-col items-center gap-12">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

        <div className="w-full max-w-xl rounded-3xl bg-cream p-6 shadow-soft-lg sm:p-10">
          {status === "success" ? (
            <div className="flex flex-col items-center gap-3 py-8 text-center">
              <CheckCircle2 className="h-14 w-14 text-accent" />
              <h3 className="font-heading text-2xl font-extrabold text-ink">
                {t("successTitle")}
              </h3>
              <p className="text-ink/70">{t("successText")}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-bold text-ink/70">
                  {t("name")}
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder={t("namePlaceholder")}
                  autoComplete="name"
                  {...register("name")}
                  className={cn(
                    "min-h-11 w-full rounded-xl border-2 bg-white px-4 py-2.5 text-base text-ink focus:border-primary",
                    errors.name ? "border-red-400" : "border-primary/15",
                  )}
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <p className="mt-1 text-sm font-semibold text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="mb-1.5 block text-sm font-bold text-ink/70">
                  {t("phone")}
                </label>
                <Controller
                  control={control}
                  name="phone"
                  render={({ field }) => (
                    <IMaskInput
                      id="phone"
                      mask="+998 00 000 00 00"
                      lazy={false}
                      placeholder="+998 90 123 45 67"
                      value={field.value}
                      unmask={false}
                      onAccept={(value: string) => field.onChange(value)}
                      onBlur={field.onBlur}
                      inputMode="tel"
                      autoComplete="tel"
                      className={cn(
                        "min-h-11 w-full rounded-xl border-2 bg-white px-4 py-2.5 text-base text-ink focus:border-primary",
                        errors.phone ? "border-red-400" : "border-primary/15",
                      )}
                    />
                  )}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm font-semibold text-red-500">{errors.phone.message}</p>
                )}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="age" className="mb-1.5 block text-sm font-bold text-ink/70">
                    {t("age")}
                  </label>
                  <select
                    id="age"
                    {...register("age")}
                    defaultValue=""
                    className={cn(
                      "min-h-11 w-full rounded-xl border-2 bg-white px-4 py-2.5 text-base text-ink focus:border-primary",
                      errors.age ? "border-red-400" : "border-primary/15",
                    )}
                  >
                    <option value="" disabled>
                      {t("agePlaceholder")}
                    </option>
                    {AGES.map((a) => (
                      <option key={a} value={a}>
                        {t(`ageOptions.${a}`)}
                      </option>
                    ))}
                  </select>
                  {errors.age && (
                    <p className="mt-1 text-sm font-semibold text-red-500">{errors.age.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="time" className="mb-1.5 block text-sm font-bold text-ink/70">
                    {t("time")}
                  </label>
                  <select
                    id="time"
                    {...register("time")}
                    defaultValue=""
                    className="min-h-11 w-full rounded-xl border-2 border-primary/15 bg-white px-4 py-2.5 text-base text-ink focus:border-primary"
                  >
                    <option value="">{t("timePlaceholder")}</option>
                    <option value={t("timeOptions.morning")}>{t("timeOptions.morning")}</option>
                    <option value={t("timeOptions.afternoon")}>{t("timeOptions.afternoon")}</option>
                    <option value={t("timeOptions.evening")}>{t("timeOptions.evening")}</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="comment" className="mb-1.5 block text-sm font-bold text-ink/70">
                  {t("comment")}
                </label>
                <textarea
                  id="comment"
                  rows={3}
                  placeholder={t("commentPlaceholder")}
                  {...register("comment")}
                  className="w-full rounded-xl border-2 border-primary/15 bg-white px-4 py-2.5 text-base text-ink focus:border-primary"
                />
              </div>

              {status === "error" && (
                <div className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-500">
                  <XCircle className="h-5 w-5 shrink-0" />
                  {t("errorText")}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="mt-2 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 text-lg font-bold text-white shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-dark hover:shadow-soft-lg active:scale-95 disabled:opacity-60"
              >
                <Send className="h-5 w-5" />
                {status === "submitting" ? t("submitting") : t("submit")}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
