"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RainbowIcon } from "@/components/decor/RainbowIcon";

export function Loader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-cream"
        >
          <motion.div
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut" }}
          >
            <RainbowIcon className="h-16 w-16" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
