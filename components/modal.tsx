"use client";

import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Modal({ children }: { children: React.ReactNode }) {
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const onClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) onDismiss();
      }
    },
    [onDismiss, overlay, wrapper]
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();
    },
    [onDismiss]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden"; // Prevent scrolling behind modal
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [onKeyDown]);

  return (
    <AnimatePresence>
      <div
        ref={overlay}
        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
        onClick={onClick}
      >
        <button
          className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-[110]"
          onClick={onDismiss}
        >
          <X size={24} />
        </button>

        <motion.div
          ref={wrapper}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="flex min-h-screen items-center justify-center p-4 md:p-10"
          onClick={onClick}
        >
          <div className="w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
