"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FadeUp } from "./animations/FadeUp";
import { StaggerContainer } from "./animations/StaggerContainer";
import Link from "next/link";
import { Sparkles, ArrowRight, Play } from "lucide-react";

export const HeroSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Slow background image zoom and parallax
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Image with Parallax & Slow Zoom */}
      <motion.div
        style={{ y: backgroundY, scale: backgroundScale }}
        className="absolute inset-0 z-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2874&auto=format&fit=crop')",
          }}
        />
        {/* Dark overlays for readability and premium depth */}
        <div className="absolute inset-0 bg-linear-to-b from-ugen-bg/80 via-ugen-bg/90 to-ugen-bg" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-ugen-bg/80 to-ugen-bg" />
      </motion.div>

      {/* Floating Gradient Blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            y: [0, -50, 0],
            x: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-ugen-primary/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            y: [0, 40, 0],
            x: [0, -40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-ugen-secondary/15 rounded-full blur-[150px]"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center justify-center text-center">
        <StaggerContainer staggerDelay={0.15}>
          {/* Badge */}
          <FadeUp>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 shadow-2xl">
              <Sparkles className="w-4 h-4 text-ugen-primary" />
              <span className="text-sm font-medium text-white/80 tracking-wide">
                AI Powered Image Prompt Platform
              </span>
            </div>
          </FadeUp>

          {/* Heading */}
          <FadeUp>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-8 max-w-5xl mx-auto leading-[1.1]">
              Generate Stunning{" "}
              <span className="text-gradient relative inline-block">
                AI Prompts
                <motion.span
                  initial={{ opacity: 0, width: "0%" }}
                  animate={{ opacity: 1, width: "100%" }}
                  transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
                  className="absolute -bottom-2 left-0 h-[4px] bg-gradient-to-r from-ugen-primary via-ugen-secondary to-ugen-accent rounded-full glow"
                />
              </span>{" "}
              in Seconds
            </h1>
          </FadeUp>

          {/* Description */}
          <FadeUp>
            <p className="text-lg md:text-xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed">
              Create professional AI image prompts, explore thousands of community creations, and master prompt engineering—all in one beautiful platform.
            </p>
          </FadeUp>

          {/* Buttons */}
          <FadeUp>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Link href="/ugen-gallery" passHref>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative inline-flex items-center justify-center
      px-5 py-3 sm:px-8 sm:py-4
      text-sm sm:text-base font-medium text-white
      rounded-full bg-white/10 border border-white/20
      hover:bg-white/20 hover:border-white/30
      hover:shadow-[0_0_40px_rgba(99,102,241,0.4)]
      transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-ugen-primary/40 to-ugen-secondary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <span className="relative z-10 flex items-center gap-2">
                    Explore Gallery
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.div>
              </Link>

              <Link href="/learn" passHref>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative inline-flex items-center justify-center px-5 py-3  sm:px-8 sm:py-4 text-sm sm:text-base font-medium text-white rounded-full glass hover:bg-white/5 transition-all duration-300" >
                  <span className="relative z-10 flex items-center gap-2">
                    <Play className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
                    Learn AI
                  </span>
                </motion.div>
              </Link>
            </div>
          </FadeUp>
        </StaggerContainer>
      </div>

      {/* Decorative Bottom Fade */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ugen-bg to-transparent z-10 pointer-events-none"
      />
    </section>
  );
};
