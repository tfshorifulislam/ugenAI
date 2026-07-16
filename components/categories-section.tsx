"use client";

import { motion } from "framer-motion";
import { FadeUp } from "./animations/FadeUp";
import { StaggerContainer } from "./animations/StaggerContainer";
import { Camera, Sparkles, UserSquare, Film, Wand2, Box, PenTool, Building2, ArrowRight, Palette } from "lucide-react";
import Link from "next/link";

type Category = {
  title: string;
  count: string;
  image: string;
  icon: React.ReactNode;
};

const categories: Category[] = [
  {
    title: "Realistic",
    count: "4.2K Prompts",
    image: "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?q=80&w=800&auto=format&fit=crop",
    icon: <Camera className="w-5 h-5 text-white" />,
  },
  {
    title: "Anime",
    count: "3.8K Prompts",
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=800&auto=format&fit=crop",
    icon: <Sparkles className="w-5 h-5 text-white" />,
  },
  {
    title: "Portrait",
    count: "2.9K Prompts",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
    icon: <UserSquare className="w-5 h-5 text-white" />,
  },
  {
    title: "Cinematic",
    count: "5.1K Prompts",
    image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=800&auto=format&fit=crop",
    icon: <Film className="w-5 h-5 text-white" />,
  },
  {
    title: "Fantasy",
    count: "3.4K Prompts",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop",
    icon: <Wand2 className="w-5 h-5 text-white" />,
  },
  {
    title: "3D Art",
    count: "1.8K Prompts",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    icon: <Box className="w-5 h-5 text-white" />,
  },
  {
    title: "Product Design",
    count: "1.2K Prompts",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
    icon: <PenTool className="w-5 h-5 text-white" />,
  },
  {
    title: "Architecture",
    count: "2.1K Prompts",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
    icon: <Building2 className="w-5 h-5 text-white" />,
  },
];

const CategoryCard = ({ category }: { category: Category }) => {
  return (
    <Link href={`/gallery?category=${category.title.toLowerCase()}`} className="block">
      <motion.div
        variants={{
          hidden: { opacity: 0, scale: 0.95 },
          show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
        }}
        whileHover={{ y: -8 }}
        className="group relative h-72 rounded-[2rem] overflow-hidden glass border border-white/10 z-10"
      >
        {/* Glow border effect behind inner card */}
        <div className="absolute inset-0 bg-gradient-to-br from-ugen-primary/40 via-ugen-secondary/40 to-ugen-accent/40 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
        
        {/* Background Image & Overlays */}
        <div className="absolute inset-[1px] rounded-[calc(2rem-1px)] overflow-hidden bg-ugen-surface">
          <motion.div 
            className="w-full h-full relative"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <img 
              src={category.image} 
              alt={category.title} 
              className="w-full h-full object-cover opacity-60 transition-opacity duration-500 group-hover:opacity-80"
            />
            {/* Subtle dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-ugen-bg via-ugen-bg/60 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-gradient-to-br from-ugen-primary/20 to-ugen-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none">
          {/* Top: Icon & Count */}
          <div className="flex justify-between items-start">
            <motion.div 
              className="w-10 h-10 rounded-full glass border border-white/20 flex items-center justify-center bg-white/10 backdrop-blur-md shadow-lg"
              whileHover={{ scale: 1.15, rotate: 10 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {category.icon}
            </motion.div>
            
            <div className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
              <span className="text-xs font-semibold text-white/80">{category.count}</span>
            </div>
          </div>
          
          {/* Bottom: Title & Arrow */}
          <div className="flex items-end justify-between">
            <h3 className="text-2xl font-bold text-white tracking-tight">
              {category.title}
            </h3>
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export const CategoriesSection = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-ugen-bg">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Soft Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        
        {/* Glowing Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-ugen-accent/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-ugen-primary/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <FadeUp>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6 shadow-xl">
              <Palette className="w-4 h-4 text-ugen-secondary" />
              <span className="text-sm font-medium text-white/80 tracking-wide">
                Explore Categories
              </span>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
              Find the Perfect Prompt for <span className="text-gradient">Every Creative Idea</span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
              Browse thousands of AI prompts organized into carefully curated categories to inspire your next creation.
            </p>
          </FadeUp>
        </div>

        {/* Categories Grid */}
        <StaggerContainer staggerDelay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative z-20 mb-16">
            {categories.map((category, idx) => (
              <CategoryCard key={idx} category={category} />
            ))}
          </div>
        </StaggerContainer>

        {/* Call To Action */}
        <FadeUp delay={0.3}>
          <div className="flex justify-center">
            <Link href="/categories" passHref>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white transition-all duration-300 rounded-full bg-gradient-to-r from-ugen-primary via-ugen-secondary to-ugen-accent hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center gap-2">
                  Explore All Categories
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
