"use client";

import { useState } from "react";
import { Bookmark } from "lucide-react";
import { useToast } from "@/contexts/toast-context";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { motion, AnimatePresence } from "framer-motion";

interface SaveButtonProps {
  postId: string;
  initialIsSaved: boolean;
}

export function SaveButton({ postId, initialIsSaved }: SaveButtonProps) {
  const [prevInitialIsSaved, setPrevInitialIsSaved] = useState(initialIsSaved);
  const [isSaved, setIsSaved] = useState(initialIsSaved);

  if (initialIsSaved !== prevInitialIsSaved) {
    setPrevInitialIsSaved(initialIsSaved);
    setIsSaved(initialIsSaved);
  }

  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { data: session } = useSession();

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!session?.user) {
      toast("Please sign in to save images", "warning");
      router.push("/login");
      return;
    }

    if (isLoading) return;

    setIsLoading(true);
    const previousIsSaved = isSaved;
    setIsSaved(!previousIsSaved);

    try {
      const res = await fetch(`/api/posts/${postId}/save`, {
        method: previousIsSaved ? "DELETE" : "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to save image");
      }

      setIsSaved(data.isSaved);
      toast(
        data.isSaved ? "Saved to your bookmarks" : "Removed from bookmarks",
        "success"
      );
    } catch (error: unknown) {
      setIsSaved(previousIsSaved);
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      toast(errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleSave}
      disabled={isLoading}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all shadow-md active:scale-95 ${
        isSaved
          ? "bg-white/10 text-white border border-white/10 hover:bg-white/15"
          : "bg-gradient-to-r from-ugen-primary to-ugen-accent text-white shadow-ugen-primary/10 hover:opacity-90"
      }`}
    >
      <div className="relative flex items-center justify-center">
        <AnimatePresence mode="wait">
          {isSaved ? (
            <motion.div
              key="saved"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Bookmark className="w-4 h-4 fill-white text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="unsaved"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Bookmark className="w-4 h-4 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <span>{isSaved ? "Saved" : "Save"}</span>
    </button>
  );
}
