"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeUp } from "./animations/FadeUp";
import { StaggerContainer } from "./animations/StaggerContainer";
import { Image as ImageIcon, Heart, Bookmark, Copy, Eye, ArrowRight } from "lucide-react";
import Link from "next/link";

const filterCategories = ["All", "Realistic", "Anime", "Fantasy", "3D", "Cinematic"];

type GalleryItem = {
  id: string;
  title: string;
  category: string;
  image: string;
  creator: {
    name: string;
    avatar: string;
  };
  likes: string;
};

const galleryItems: GalleryItem[] = [
  {
    id: "1",
    title: "Cyberpunk Cityscape",
    category: "3D",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    creator: { name: "Alex Chen", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop" },
    likes: "2.4K",
  },
  {
    id: "2",
    title: "Ethereal Portrait",
    category: "Realistic",
    image: "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?q=80&w=800&auto=format&fit=crop",
    creator: { name: "Sarah Woods", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop" },
    likes: "1.8K",
  },
  {
    id: "3",
    title: "Neon Genesis",
    category: "Anime",
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=800&auto=format&fit=crop",
    creator: { name: "Kenji Sato", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop" },
    likes: "3.1K",
  },
  {
    id: "4",
    title: "Dark Fantasy Knight",
    category: "Fantasy",
    image: "https://images.unsplash.com/photo-1682687982501-1e58f813222a?q=80&w=800&auto=format&fit=crop",
    creator: { name: "Elena Frost", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop" },
    likes: "4.5K",
  },
  {
    id: "5",
    title: "Abstract Quantum",
    category: "3D",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=800&auto=format&fit=crop",
    creator: { name: "David Kim", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop" },
    likes: "1.2K",
  },
  {
    id: "6",
    title: "Cinematic Sci-Fi Base",
    category: "Cinematic",
    image: "https://images.unsplash.com/photo-1633412802994-5c058f151b66?q=80&w=800&auto=format&fit=crop",
    creator: { name: "Marcus Reed", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop" },
    likes: "2.9K",
  },
  {
    id: "7",
    title: "Dreamscape Architecture",
    category: "Fantasy",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop",
    creator: { name: "Sophie Lin", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop" },
    likes: "3.7K",
  },
  {
    id: "8",
    title: "AI Core Entity",
    category: "Cinematic",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop",
    creator: { name: "James Holden", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop" },
    likes: "5.0K",
  },
];

const GalleryCard = ({ item }: { item: GalleryItem }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="group relative rounded-3xl overflow-hidden glass border border-white/10 break-inside-avoid mb-6 bg-ugen-surface"
    >
      {/* Background Image */}
      <div className="w-full relative overflow-hidden bg-white/5">
        <motion.img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
          style={{ minHeight: "250px" }}
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute inset-0 bg-gradient-to-t from-ugen-bg/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute inset-0 bg-gradient-to-br from-ugen-primary/20 to-ugen-secondary/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Hover Content */}
        <div className="absolute inset-0 p-5 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          
          {/* Top Actions */}
          <div className="flex justify-between items-start pointer-events-auto">
            <div className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
              <span className="text-xs font-semibold text-white tracking-wide uppercase">{item.category}</span>
            </div>
            <div className="flex gap-2">
              <button className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 hover:text-ugen-primary transition-colors text-white">
                <Bookmark className="w-4 h-4" />
              </button>
              <button className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 hover:text-ugen-accent transition-colors text-white">
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Center View Button */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
            <button className="px-6 py-2 rounded-full bg-white text-black font-semibold text-sm hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 duration-300">
              <Eye className="w-4 h-4" />
              View
            </button>
          </div>

          {/* Bottom Info */}
          <div className="flex justify-between items-end transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 pointer-events-auto">
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-bold text-white drop-shadow-md leading-tight">{item.title}</h3>
              <div className="flex items-center gap-2">
                <img src={item.creator.avatar} alt={item.creator.name} className="w-6 h-6 rounded-full border border-white/30 object-cover" />
                <span className="text-sm font-medium text-white/80">{item.creator.name}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
              <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
              <span className="text-xs font-semibold text-white">{item.likes}</span>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export const FeaturedGallery = () => {
  const [activeTab, setActiveTab] = useState("All");

  const filteredItems = activeTab === "All" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeTab);

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-ugen-bg">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-ugen-secondary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-ugen-primary/5 rounded-full blur-[150px]" />
        {/* Soft grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <FadeUp>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6 shadow-xl">
              <ImageIcon className="w-4 h-4 text-ugen-primary" />
              <span className="text-sm font-medium text-white/80 tracking-wide">
                Featured Gallery
              </span>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
              Discover Stunning AI Creations from <span className="text-gradient">Our Community</span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
              Explore a curated collection of high-quality AI-generated artwork created with powerful prompts from the ugenAI community.
            </p>
          </FadeUp>
        </div>

        {/* Filter Tabs */}
        <FadeUp delay={0.3}>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {filterCategories.map((category) => {
              const isActive = activeTab === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveTab(category)}
                  className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 overflow-hidden ${
                    isActive ? "text-white shadow-[0_0_20px_rgba(99,102,241,0.3)] border border-transparent" : "text-white/60 hover:text-white border border-white/10 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="gallery-filter-active"
                      className="absolute inset-0 bg-gradient-to-r from-ugen-primary via-ugen-secondary to-ugen-accent opacity-80"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </button>
              );
            })}
          </div>
        </FadeUp>

        {/* Masonry Gallery Grid */}
        <motion.div layout className="columns-1 sm:columns-2 lg:columns-4 gap-6 relative z-20 mb-16">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <GalleryCard key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Call To Action */}
        <FadeUp delay={0.4}>
          <div className="flex justify-center mt-8">
            <Link href="/ugen-gallery" passHref>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white transition-all duration-300 rounded-full bg-gradient-to-r from-ugen-primary via-ugen-secondary to-ugen-accent hover:shadow-[0_0_40px_rgba(99,102,241,0.5)] overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center gap-2">
                  Explore Full Gallery
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </motion.div>
            </Link>
          </div>
        </FadeUp>

      </div>
    </section>
  );
};
