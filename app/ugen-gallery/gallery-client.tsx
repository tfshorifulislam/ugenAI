"use client";

import { useState } from "react";
import { Heart, Eye, Sparkles, Search } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { LikeButton } from "@/components/like-button";

type Post = {
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

export function GalleryClient({ initialPosts }: { initialPosts: Post[] }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = initialPosts.filter((post) => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;

    const matchTitle = post.title?.toLowerCase().includes(query);
    const matchDesc = post.description?.toLowerCase().includes(query);
    const matchCategory = post.category?.toLowerCase().includes(query);
    const matchTags = post.tags?.some((tag) => tag.toLowerCase().includes(query));

    return matchTitle || matchDesc || matchCategory || matchTags;
  });

  return (
    <>
      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-12 relative">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-white/40 group-focus-within:text-ugen-primary transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Search prompts by title, category, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/20 border border-white/10 rounded-full py-4 pl-12 pr-6 text-white placeholder-white/40 focus:outline-none focus:border-ugen-primary/50 focus:ring-1 focus:ring-ugen-primary/50 transition-all shadow-xl backdrop-blur-md"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/40 hover:text-white transition-colors text-sm"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Gallery */}
      {initialPosts.length === 0 ? (
        <div className="glass rounded-3xl p-12 text-center border border-white/10 max-w-2xl mx-auto mt-12">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-10 h-10 text-white/30" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No posts yet</h3>
          <p className="text-white/50 mb-8">Be the first to generate and share an amazing AI image with the community!</p>
          <Link
            href="/generate-image"
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-ugen-primary to-ugen-accent text-white font-medium rounded-full shadow-lg shadow-ugen-primary/20 hover:scale-105 transition-transform"
          >
            Generate Image
          </Link>
        </div>
      ) : filteredPosts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl p-12 text-center border border-white/10 max-w-2xl mx-auto mt-12"
        >
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-10 h-10 text-white/30" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No matching prompts found</h3>
          <p className="text-white/50 mb-8">Try adjusting your search terms or exploring different categories.</p>
        </motion.div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredPosts.map((post) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={post._id}
                className="group relative glass rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-300"
              >
                {/* Image */}
                <div className="aspect-[4/5] w-full overflow-hidden bg-black/40">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Overlay Gradient for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80" />

                {/* Content Area (Absolute positioned on bottom) */}
                <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col justify-end">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-white/10 text-white/90 backdrop-blur-md">
                      {post.category}
                    </span>
                  </div>

                  <h3 className="text-white font-bold text-lg leading-tight mb-3 line-clamp-2">
                    {post.title}
                  </h3>

                  <div className="flex items-center justify-between">
                    {/* User Info */}
                    <Link href={`/profile/${post.userId}`} className="flex items-center gap-2">
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
                      <LikeButton postId={post._id} initialLikes={post.likes || 0} initialIsLiked={post.isLiked || false} />
                      <div className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        <span className="text-xs font-medium">{post.views || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </>
  );
}
