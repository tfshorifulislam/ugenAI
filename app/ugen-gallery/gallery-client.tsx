"use client";

import { useState } from "react";
import { Sparkles, Search } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { GalleryCard } from "@/components/gallery-card";

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
  const [posts, setPosts] = useState(initialPosts);
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(posts.map((post) => post.category)),
  ];

  const filteredPosts = posts.filter((post) => {
    const query = searchQuery.trim().toLowerCase();

    const matchesSearch =
      !query ||
      post.title?.toLowerCase().includes(query) ||
      post.description?.toLowerCase().includes(query) ||
      post.category?.toLowerCase().includes(query) ||
      post.tags?.some((tag) => tag.toLowerCase().includes(query));

    const matchesCategory =
      selectedCategory === "All" ||
      post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // const filteredPosts = posts.filter((post) => {
  //   const query = searchQuery.trim().toLowerCase();
  //   if (!query) return true;

  //   const matchTitle = post.title?.toLowerCase().includes(query);
  //   const matchDesc = post.description?.toLowerCase().includes(query);
  //   const matchCategory = post.category?.toLowerCase().includes(query);
  //   const matchTags = post.tags?.some((tag) => tag.toLowerCase().includes(query));

  //   return matchTitle || matchDesc || matchCategory || matchTags;
  // });

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
      
      {/* filter bar */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm transition-all ${selectedCategory === category
                ? "bg-ugen-primary text-white"
                : "bg-white/5 text-white/70 hover:bg-white/10"
              }`}
          >
            {category}
          </button>
        ))}
      </div>



      {/* Gallery */}
      {posts.length === 0 ? (
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredPosts.map((post) => (
              <GalleryCard
                key={post._id}
                post={post}
                onUpdateViewCount={(views) => {
                  setPosts(current => current.map(p => p._id === post._id ? { ...p, views } : p));
                }}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </>
  );
}
