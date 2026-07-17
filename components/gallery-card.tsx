"use client";

import { Eye } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { LikeButton } from "@/components/like-button";
import { PostViewTracker } from "@/components/post-view-tracker";

export type PostType = {
  _id: string;
  image: string;
  title: string;
  category: string;
  description?: string;
  tags?: string[];
  userImage?: string;
  userName: string;
  userId: string;
  createdAt: string;
  likes: number;
  views: number;
  isLiked: boolean;
};

export function GalleryCard({ 
  post, 
  onUpdateViewCount 
}: { 
  post: PostType;
  onUpdateViewCount?: (views: number) => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="group relative glass rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-300"
    >
      {/* Image Link */}
      <Link href={`/ugen-gallery/${post._id}`} className="aspect-[4/5] w-full overflow-hidden bg-black/40 block">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </Link>

      {/* Overlay Gradient for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 pointer-events-none" />

      {onUpdateViewCount && (
        <PostViewTracker 
          postId={post._id} 
          onUpdate={onUpdateViewCount} 
        />
      )}

      {/* Content Area (Absolute positioned on bottom) */}
      <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col justify-end pointer-events-none">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-white/10 text-white/90 backdrop-blur-md">
            {post.category}
          </span>
        </div>

        <h3 className="text-white font-bold text-lg leading-tight mb-3 line-clamp-2">
          {post.title}
        </h3>

        <div className="flex items-center justify-between pointer-events-auto">
          {/* User Info */}
          <Link href={`/profile/${post.userId}`} className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            <div className="w-6 h-6 rounded-full bg-white/20 overflow-hidden flex items-center justify-center flex-shrink-0">
              {post.userImage ? (
                <img src={post.userImage} alt={post.userName} className="w-full h-full object-cover" />
              ) : (
                <span className="text-[10px] font-bold text-white">{post.userName.charAt(0).toUpperCase()}</span>
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-white/90 truncate max-w-[100px]">{post.userName}</span>
              <span className="text-[10px] text-white/50">{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
          </Link>

          {/* Stats */}
          <div className="flex items-center gap-3 text-white/60">
            <div onClick={(e) => e.stopPropagation()}>
              <LikeButton postId={post._id} initialLikes={post.likes || 0} initialIsLiked={post.isLiked || false} />
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">{post.views || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
