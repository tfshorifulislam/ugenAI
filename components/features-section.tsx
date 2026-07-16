"use client";

import { motion } from "framer-motion";
import { FadeUp } from "./animations/FadeUp";
import { StaggerContainer } from "./animations/StaggerContainer";
import { Sparkles, Image as ImageIcon, Search, BookOpen, Bookmark, Copy } from "lucide-react";

type Feature = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const features: Feature[] = [
  {
    title: "AI Prompt Generator",
    description: "Generate professional AI prompts in seconds with intelligent prompt assistance.",
    icon: <Sparkles className="w-6 h-6 text-ugen-primary" />,
  },
  {
    title: "Prompt Gallery",
    description: "Explore thousands of community-created prompts across different categories.",
    icon: <ImageIcon className="w-6 h-6 text-ugen-secondary" />,
  },
  {
    title: "Smart Search",
    description: "Quickly search prompts by keyword, category, style, or AI model.",
    icon: <Search className="w-6 h-6 text-ugen-accent" />,
  },
  {
    title: "Learn AI",
    description: "Master prompt engineering with beginner-friendly lessons and practical examples.",
    icon: <BookOpen className="w-6 h-6 text-ugen-primary" />,
  },
  {
    title: "Save Favorites",
    description: "Bookmark your favorite prompts and organize them for future use.",
    icon: <Bookmark className="w-6 h-6 text-ugen-secondary" />,
  },
  {
    title: "One-Click Copy",
    description: "Copy any prompt instantly with a beautiful success animation.",
    icon: <Copy className="w-6 h-6 text-ugen-accent" />,
  },
];

const FeatureCard = ({ feature }: { feature: Feature }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
      }}
      whileHover={{ y: -8 }}
      className="group relative rounded-3xl p-[1px] bg-white/5 hover:bg-white/10 transition-colors duration-500 z-10"
    >
      {/* Glow border effect behind the inner card */}
      <div className="absolute inset-0 bg-gradient-to-br from-ugen-primary/40 via-ugen-secondary/40 to-ugen-accent/40 rounded-3xl opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500" />
      
      {/* Inner Card */}
      <div className="relative h-full bg-ugen-surface/90 backdrop-blur-2xl rounded-[23px] p-8 flex flex-col gap-4 border border-white/5 overflow-hidden shadow-2xl">
        {/* Soft gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Icon */}
        <motion.div 
          className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-2 shadow-inner"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          {feature.icon}
        </motion.div>
        
        {/* Content */}
        <div className="relative z-10">
          <h3 className="text-xl font-semibold text-white mb-3 transition-colors duration-300">
            {feature.title}
          </h3>
          <p className="text-white/60 leading-relaxed text-sm">
            {feature.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export const FeaturesSection = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-ugen-bg">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-ugen-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-ugen-secondary/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
          <FadeUp>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6 shadow-xl">
              <Sparkles className="w-4 h-4 text-ugen-accent" />
              <span className="text-sm font-medium text-white/80 tracking-wide">
                Powerful Features
              </span>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
              Everything You Need to Create <span className="text-gradient">Better AI Prompts</span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
              ugenAI gives creators the tools to generate, organize, discover, and learn professional AI prompts—all in one modern platform.
            </p>
          </FadeUp>
        </div>

        {/* Features Grid */}
        <StaggerContainer staggerDelay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 relative z-20">
            {features.map((feature, idx) => (
              <FeatureCard key={idx} feature={feature} />
            ))}
          </div>
        </StaggerContainer>
        
      </div>
    </section>
  );
};
