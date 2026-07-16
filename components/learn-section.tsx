"use client";

import { motion } from "framer-motion";
import { FadeUp } from "./animations/FadeUp";
import { StaggerContainer } from "./animations/StaggerContainer";
import { BookOpen, Target, Layers, Crown, Play, Book, Clock, Star, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

type RoadmapItem = {
  level: string;
  title: string;
  description: string;
  icon: React.ReactNode;
};

const roadmapItems: RoadmapItem[] = [
  {
    level: "Beginner",
    title: "AI Fundamentals",
    description: "Learn the basics of AI image generation and how to structure your first simple prompts.",
    icon: <BookOpen className="w-5 h-5 text-white" />,
  },
  {
    level: "Intermediate",
    title: "Prompt Architecture",
    description: "Understand prompt weights, styles, camera angles, and advanced modifiers.",
    icon: <Target className="w-5 h-5 text-white" />,
  },
  {
    level: "Advanced",
    title: "Creative Workflows",
    description: "Create professional prompts for character design, environments, and consistent styles.",
    icon: <Layers className="w-5 h-5 text-white" />,
  },
  {
    level: "Expert",
    title: "AI Mastery",
    description: "Master prompt tuning, negative prompting, and AI productivity templates.",
    icon: <Crown className="w-5 h-5 text-white" />,
  },
];

export const LearnSection = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-ugen-bg">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Glowing Orbs */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-ugen-secondary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-ugen-primary/5 rounded-full blur-[120px]" />
        {/* Soft Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <FadeUp>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6 shadow-xl">
              <BookOpen className="w-4 h-4 text-ugen-secondary" />
              <span className="text-sm font-medium text-white/80 tracking-wide">
                Learn AI
              </span>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
              Master Prompt Engineering, <span className="text-gradient">One Lesson at a Time</span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
              Whether you're a beginner or an advanced creator, our structured learning path will help you write better prompts and generate stunning AI content.
            </p>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Side: Learning Roadmap */}
          <div className="relative">
            {/* Vertical Timeline Background Line */}
            <div className="absolute top-4 bottom-4 left-[23px] w-[2px] bg-white/10 rounded-full z-0" />
            
            {/* Animated Progress Line */}
            <motion.div
              initial={{ height: "0%" }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="absolute top-4 left-[23px] w-[2px] bg-gradient-to-b from-ugen-primary via-ugen-secondary to-ugen-accent rounded-full z-0 shadow-[0_0_15px_rgba(139,92,246,0.6)]"
            />

            <StaggerContainer staggerDelay={0.2}>
              <div className="flex flex-col gap-10">
                {roadmapItems.map((item, idx) => (
                  <motion.div
                    key={idx}
                    variants={{
                      hidden: { opacity: 0, x: -30 },
                      show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
                    }}
                    className="relative pl-16 group"
                  >
                    {/* Node Icon */}
                    <motion.div 
                      className="absolute top-0 left-0 w-12 h-12 rounded-full glass border border-white/20 bg-ugen-surface flex items-center justify-center z-10 shadow-lg group-hover:scale-110 group-hover:border-ugen-primary/50 transition-all duration-300"
                      whileHover={{ rotate: 10 }}
                    >
                      {item.icon}
                      <div className="absolute inset-0 bg-white/5 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>

                    {/* Content */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 glass hover:bg-white/10 transition-colors duration-300 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-ugen-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative z-10">
                        <span className="text-xs font-bold text-ugen-secondary uppercase tracking-wider mb-2 block">
                          Step 0{idx + 1} • {item.level}
                        </span>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-white/60 text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </StaggerContainer>
          </div>

          {/* Right Side: Featured Course Card */}
          <div className="relative">
            <FadeUp delay={0.3}>
              <motion.div 
                whileHover={{ y: -10 }}
                className="group relative rounded-3xl overflow-hidden glass border border-white/10 bg-ugen-surface p-1 shadow-2xl"
              >
                {/* Glow Border */}
                <div className="absolute inset-0 bg-gradient-to-br from-ugen-primary/40 via-ugen-secondary/40 to-ugen-accent/40 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700" />
                
                <div className="relative bg-ugen-surface/90 backdrop-blur-2xl rounded-[1.4rem] overflow-hidden">
                  {/* Thumbnail */}
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop" 
                      alt="Prompt Engineering Bootcamp" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ugen-bg to-transparent opacity-90" />
                    <div className="absolute inset-0 bg-gradient-to-br from-ugen-primary/20 to-ugen-secondary/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <div className="px-3 py-1.5 rounded-full bg-ugen-primary/20 backdrop-blur-md border border-ugen-primary/30 flex items-center gap-1.5">
                        <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                        <span className="text-xs font-semibold text-white">Featured Course</span>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="w-10 h-10 rounded-full glass bg-white/10 flex items-center justify-center border border-white/20 shadow-lg cursor-pointer hover:scale-110 transition-transform hover:bg-white/20">
                        <Play className="w-4 h-4 text-white ml-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* Course Details */}
                  <div className="p-8">
                    <div className="flex gap-2 mb-4">
                      <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-medium text-white/70">Beginner Friendly</span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-3 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-colors">
                      Complete Prompt Engineering Bootcamp
                    </h3>
                    
                    <p className="text-white/60 text-sm mb-6 leading-relaxed">
                      Master the art of writing prompts for Midjourney, Stable Diffusion, and DALL-E. Build a portfolio of stunning AI creations.
                    </p>

                    <div className="flex items-center gap-6 mb-8 border-y border-white/10 py-4">
                      <div className="flex items-center gap-2">
                        <Book className="w-4 h-4 text-ugen-secondary" />
                        <span className="text-sm font-medium text-white/80">24 Lessons</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-ugen-accent" />
                        <span className="text-sm font-medium text-white/80">4.5 Hours</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-white/50" />
                        <span className="text-sm font-medium text-white/80">15K+ Enrolled</span>
                      </div>
                    </div>

                    <Link href="/courses" passHref>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full relative flex items-center justify-center px-6 py-4 text-base font-semibold text-white transition-all duration-300 rounded-xl bg-gradient-to-r from-ugen-primary via-ugen-secondary to-ugen-accent hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                        <span className="relative z-10 flex items-center gap-2">
                          Start Learning
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </FadeUp>
          </div>
          
        </div>
      </div>
    </section>
  );
};
