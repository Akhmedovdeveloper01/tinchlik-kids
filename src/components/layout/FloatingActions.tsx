"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, Plus, Send, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { InstagramIcon } from "@/components/decor/InstagramIcon";
import { siteConfig } from "@/config/site";

const ACTIONS = [
  { key: "call", href: siteConfig.contact.phoneHref, icon: Phone, color: "bg-accent" },
  { key: "telegram", href: siteConfig.contact.telegram, icon: Send, color: "bg-primary" },
  { key: "instagram", href: siteConfig.contact.instagram, icon: InstagramIcon, color: "bg-pink-dark" },
];

export function FloatingActions() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("common");

  return (
    <div className="fixed bottom-24 right-4 z-40 flex flex-col items-end gap-3 sm:hidden">
      <AnimatePresence>
        {open &&
          ACTIONS.map((action, i) => (
            <motion.a
              key={action.key}
              href={action.href}
              target={action.key === "call" ? undefined : "_blank"}
              rel={action.key === "call" ? undefined : "noopener noreferrer"}
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              transition={{ delay: i * 0.05 }}
              aria-label={action.key}
              className={`flex h-12 w-12 items-center justify-center rounded-full text-white shadow-soft-lg ${action.color}`}
            >
              <action.icon className="h-5 w-5" />
            </motion.a>
          ))}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={t("call")}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-soft-lg"
      >
        <motion.span animate={{ rotate: open ? 135 : 0 }} transition={{ duration: 0.2 }}>
          {open ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
        </motion.span>
      </button>
    </div>
  );
}
