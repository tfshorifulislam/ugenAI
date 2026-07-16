"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FadeUp } from "./animations/FadeUp";
import { StaggerContainer } from "./animations/StaggerContainer";
import { Zap, Lightbulb, Sparkles, Palette, Rocket } from "lucide-react";

type Step = {
  num: string;
  title: string;
  description: string;
  icon: React.ReactNode;
};

const steps: Step[] = [
  {
    num: "01",
    title: "Describe Your Idea",
    description: "Start with a simple idea or concept. Tell ugenAI what you want to create.",
    icon: <Lightbulb className="w-6 h-6 text-ugen-primary" />,
  },
  {
    num: "02",
    title: "Generate AI Prompt",
    description: "ugenAI instantly creates a detailed, high-quality prompt optimized for AI image generation.",
    icon: <Sparkles className="w-6 h-6 text-ugen-secondary" />,
  },
  {
    num: "03",
    title: "Customize & Improve",
    description: "Edit, refine, and enhance the prompt until it perfectly matches your creative vision.",
    icon: <Palette className="w-6 h-6 text-ugen-accent" />,
  },
  {
    num: "04",
    title: "Create Stunning Images",
    description: "Copy your prompt and use it in your favorite AI image generator to create amazing artwork.",
    icon: <Rocket className="w-6 h-6 text-white" />,
  },
];

const StepCard = ({ step, index }: { step: Step; index: number }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
      }}
      className="relative flex flex-col items-center lg:items-start group z-10 w-full"
    >
      {/* Icon & Line Connector area */}
      <div className="flex flex-col items-center lg:flex-row lg:items-center mb-6 lg:mb-8 relative w-full justify-center lg:justify-start">
        
        {/* Animated Icon Circle */}
        <motion.div 
          className="relative z-10 w-16 h-16 rounded-2xl glass border border-white/20 flex items-center justify-center bg-ugen-surface/80 group-hover:bg-white/10 transition-colors duration-500 shadow-xl"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          {step.icon}
          {/* Subtle glow behind icon */}
          <div className="absolute inset-0 bg-white/5 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </motion.div>
      </div>

      {/* Card Content */}
      <motion.div 
        whileHover={{ y: -8 }}
        className="relative w-full rounded-3xl p-[1px] bg-white/5 hover:bg-white/10 transition-colors duration-500"
      >
        {/* Glow border effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-ugen-primary/40 via-ugen-secondary/40 to-ugen-accent/40 rounded-3xl opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500" />
        
        <div className="relative h-full bg-ugen-surface/90 backdrop-blur-2xl rounded-[23px] p-8 flex flex-col border border-white/5 overflow-hidden text-center lg:text-left">
          {/* Large Step Number */}
          <div className="absolute top-4 right-4 text-6xl font-black text-white/[0.03] select-none pointer-events-none group-hover:text-white/[0.05] transition-colors duration-500">
            {step.num}
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <h3 className="text-xl font-bold text-white mb-3 relative z-10 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-all duration-300">
            {step.title}
          </h3>
          <p className="text-white/60 leading-relaxed text-sm relative z-10">
            {step.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const HowItWorks = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-ugen-bg" ref={sectionRef}>
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-ugen-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 -left-1/4 w-[600px] h-[600px] bg-ugen-secondary/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20 lg:mb-32">
          <FadeUp>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6 shadow-xl">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium text-white/80 tracking-wide">
                How It Works
              </span>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
              Create Amazing AI Prompts in <span className="text-gradient">Just Four Simple Steps</span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
              From idea to AI-ready prompt, ugenAI makes the entire process fast, intuitive, and enjoyable.
            </p>
          </FadeUp>
        </div>

        {/* Timeline Layout */}
        <div className="relative">
          {/* Animated Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-8 left-[calc(12.5%)] right-[calc(12.5%)] h-[2px] bg-white/10 rounded-full z-0">
            <motion.div
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-ugen-primary via-ugen-secondary to-ugen-accent rounded-full shadow-[0_0_15px_rgba(139,92,246,0.5)]"
            />
          </div>

          {/* Animated Connecting Line (Mobile/Tablet) */}
          <div className="lg:hidden absolute top-[10%] bottom-[10%] left-1/2 -translate-x-1/2 w-[2px] bg-white/10 rounded-full z-0">
            <motion.div
              initial={{ height: "0%" }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-ugen-primary via-ugen-secondary to-ugen-accent rounded-full shadow-[0_0_15px_rgba(139,92,246,0.5)]"
            />
          </div>

          {/* Steps Grid */}
          <StaggerContainer staggerDelay={0.2}>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
              {steps.map((step, idx) => (
                <StepCard key={idx} step={step} index={idx} />
              ))}
            </div>
          </StaggerContainer>
        </div>
        
      </div>
    </section>
  );
};
