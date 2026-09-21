"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type LightboxProps = {
  images: string[];
  index: number | null;
  onClose: () => void;
  onChange: (index: number) => void;
};

export function Lightbox({ images, index, onClose, onChange }: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (index === null) return;
    closeRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onChange(((index as number) + 1) % images.length);
      if (e.key === "ArrowLeft")
        onChange(((index as number) - 1 + images.length) % images.length);
    }

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [index, images.length, onClose, onChange]);

  function handleDragEnd(_: unknown, info: PanInfo) {
    if (index === null) return;
    if (info.offset.x < -60) onChange((index + 1) % images.length);
    else if (info.offset.x > 60) onChange((index - 1 + images.length) % images.length);
  }

  return (
    <AnimatePresence>
      {index !== null && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Gallery viewer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/85 p-4"
          onClick={onClose}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onChange((index - 1 + images.length) % images.length);
            }}
            aria-label="Previous"
            className="absolute left-2 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 sm:left-4"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <motion.img
            key={index}
            src={images[index]}
            alt=""
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={handleDragEnd}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-h-[80vh] max-w-[90vw] touch-none rounded-2xl object-contain shadow-soft-lg"
          />

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onChange((index + 1) % images.length);
            }}
            aria-label="Next"
            className="absolute right-2 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 sm:right-4"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
