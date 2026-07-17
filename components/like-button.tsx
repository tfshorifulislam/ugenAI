"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/contexts/toast-context";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

interface LikeButtonProps {
  postId: string;
  initialLikes: number;
  initialIsLiked: boolean;
}

export function LikeButton({ postId, initialLikes, initialIsLiked }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    setLikes(initialLikes);
    setIsLiked(initialIsLiked);
  }, [initialLikes, initialIsLiked]);

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!session?.user) {
      toast("Please sign in to like posts", "warning");
      router.push("/login");
      return;
    }

    if (isLoading) return;

    // Optimistic UI update
    setIsLoading(true);
    const previousIsLiked = isLiked;
    const previousLikes = likes;

    setIsLiked(!previousIsLiked);
    setLikes((prev) => (previousIsLiked ? Math.max(0, prev - 1) : prev + 1));

    try {
      const res = await fetch(`/api/posts/${postId}/like`, {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to like post");
      }

      // Sync with server source of truth just in case
      setLikes(data.likes);
      setIsLiked(data.isLiked);
    } catch (error: any) {
      // Revert optimistic update on failure
      setIsLiked(previousIsLiked);
      setLikes(previousLikes);
      toast(error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      className="flex items-center gap-1 group focus:outline-none"
      disabled={isLoading}
      title={isLiked ? "Unlike" : "Like"}
    >
      <div className="relative">
        <AnimatePresence mode="wait">
          {isLiked ? (
            <motion.div
              key="liked"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Heart className="w-4 h-4 fill-pink-500 text-pink-500" />
            </motion.div>
          ) : (
            <motion.div
              key="unliked"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Heart className="w-4 h-4 text-white/60 group-hover:text-pink-400 transition-colors" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Burst animation on like */}
        <AnimatePresence>
          {isLiked && (
            <motion.div
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 2.5, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 bg-pink-500 rounded-full"
            />
          )}
        </AnimatePresence>
      </div>
      <span className={`text-xs font-medium transition-colors ${isLiked ? "text-pink-500" : "text-white/60 group-hover:text-pink-400"}`}>
        {likes}
      </span>
    </button>
  );
}
