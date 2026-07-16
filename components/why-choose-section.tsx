"use client";

import { motion } from "framer-motion";
import { FadeUp } from "./animations/FadeUp";
import { StaggerContainer } from "./animations/StaggerContainer";
import { Star, X, Check, Sparkles, Users, GraduationCap, Diamond } from "lucide-react";

const disadvantages = [
  "Limited prompt collections",
  "No structured learning",
  "Basic prompt generation",
  "Poor organization",
  "No community inspiration",
  "Difficult prompt management",
];

const advantages = [
  "AI-powered prompt generation",
  "Thousands of community prompts",
  "Learn Prompt Engineering",
  "Smart search & categories",
  "Save & organize favorites",
  "One-click prompt copy",
  "Beautiful modern interface",
  "Fast and responsive experience",
];

const highlights = [
  {
    title: "AI-Powered",
    description: "Generate better prompts instantly.",
    icon: <Sparkles className="w-6 h-6 text-ugen-primary" />
  },
  {
    title: "Community Driven",
    description: "Discover thousands of prompts created by real creators.",
    icon: <Users className="w-6 h-6 text-ugen-secondary" />
  },
  {
    title: "Learn Faster",
    description: "Structured lessons for every skill level.",
    icon: <GraduationCap className="w-6 h-6 text-ugen-accent" />
  },
  {
    title: "Premium Experience",
    description: "Modern UI with fast performance and beautiful interactions.",
    icon: <Diamond className="w-6 h-6 text-white" />
  }
];

const ComparisonCard = ({ type }: { type: "other" | "ugenai" }) => {
  const isUgen = type === "ugenai";

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
      }}
      className={`relative w-full rounded-3xl p-[1px] ${
        isUgen 
          ? "bg-gradient-to-b from-ugen-primary/50 to-white/5 z-10 hover:shadow-[0_0_50px_rgba(99,102,241,0.2)] transition-shadow duration-500" 
          : "bg-white/5 z-0"
      }`}
    >
      {/* Background Glow for ugenAI */}
      {isUgen && (
        <div className="absolute inset-0 bg-gradient-to-br from-ugen-primary/20 via-ugen-secondary/20 to-ugen-accent/20 rounded-3xl blur-xl opacity-50" />
      )}

      <div className={`relative h-full rounded-[23px] overflow-hidden ${
        isUgen 
          ? "bg-ugen-surface/90 backdrop-blur-2xl" 
          : "bg-white/[0.02] backdrop-blur-md"
      }`}>
        
        {/* Header */}
        <div className={`p-8 pb-6 border-b ${isUgen ? "border-white/10" : "border-white/5"}`}>
          <h3 className={`text-2xl font-bold ${isUgen ? "text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70" : "text-white/50"}`}>
            {isUgen ? "ugenAI" : "Other Platforms"}
          </h3>
        </div>

        {/* List */}
        <div className="p-8">
          <ul className="flex flex-col gap-6">
            {(isUgen ? advantages : disadvantages).map((item, idx) => (
              <motion.li 
                key={idx}
                initial={{ opacity: 0, x: isUgen ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + (idx * 0.1) }}
                className={`flex items-start gap-4 ${isUgen ? "group" : "opacity-60"}`}
              >
                <div className={`mt-0.5 flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full ${
                  isUgen ? "bg-green-500/20 text-green-400 group-hover:scale-110 transition-transform" : "bg-red-500/10 text-red-400/60"
                }`}>
                  {isUgen ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                </div>
                <span className={`text-base leading-snug ${isUgen ? "text-white/90 font-medium" : "text-white/60"}`}>
                  {item}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>

      </div>
    </motion.div>
  );
};

const HighlightCard = ({ item }: { item: typeof highlights[0] }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
      }}
      whileHover={{ y: -8 }}
      className="group relative rounded-2xl p-[1px] bg-white/5 hover:bg-white/10 transition-colors duration-500"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-ugen-primary/30 to-ugen-accent/30 rounded-2xl opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500" />
      
      <div className="relative h-full bg-ugen-surface/90 backdrop-blur-xl rounded-[15px] p-6 flex flex-col gap-3 border border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-2 shadow-inner group-hover:scale-110 transition-transform duration-300">
          {item.icon}
        </div>
        
        <div className="relative z-10">
          <h4 className="text-lg font-bold text-white mb-2 transition-colors duration-300">
            {item.title}
          </h4>
          <p className="text-white/60 text-sm leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export const WhyChooseSection = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-ugen-bg">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Glowing Orbs */}
        <div className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-ugen-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-ugen-accent/5 rounded-full blur-[120px]" />
        {/* Soft Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <FadeUp>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6 shadow-xl">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-medium text-white/80 tracking-wide">
                Why Choose ugenAI
              </span>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
              The Smarter Way to Create <span className="text-gradient">AI Prompts</span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
              ugenAI combines powerful prompt generation, an active community, and structured learning into one beautiful platform designed for creators.
            </p>
          </FadeUp>
        </div>

        {/* Comparison Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch mb-20 lg:mb-24">
          <StaggerContainer staggerDelay={0.2}>
            <ComparisonCard type="other" />
          </StaggerContainer>
          <StaggerContainer staggerDelay={0.4}>
            <ComparisonCard type="ugenai" />
          </StaggerContainer>
        </div>

        {/* Bottom Highlights */}
        <StaggerContainer staggerDelay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-20">
            {highlights.map((item, idx) => (
              <HighlightCard key={idx} item={item} />
            ))}
          </div>
        </StaggerContainer>
        
      </div>
    </section>
  );
};
