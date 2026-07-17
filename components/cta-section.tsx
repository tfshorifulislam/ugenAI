"use client";

import { motion } from "framer-motion";
import { FadeUp } from "./animations/FadeUp";
import { StaggerContainer } from "./animations/StaggerContainer";
import { Rocket, ArrowRight, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

export const CTASection = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-ugen-bg flex items-center justify-center min-h-[80vh]">
      {/* Global Section Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Soft Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="w-full max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Premium CTA Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[3rem] p-[1px] bg-white/10 overflow-visible group"
        >
          {/* Intense Glow Behind Card */}
          <div className="absolute inset-0 bg-gradient-to-r from-ugen-primary/40 via-ugen-secondary/40 to-ugen-accent/40 rounded-[3rem] opacity-50 blur-3xl group-hover:opacity-70 transition-opacity duration-1000 -z-10" />
          
          <div className="relative bg-ugen-surface/80 backdrop-blur-3xl rounded-[calc(3rem-1px)] px-6 py-16 md:py-24 lg:px-24 overflow-hidden shadow-2xl border border-white/5">
            
            {/* Card Internal Decor */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
              <div className="absolute -top-1/2 -right-1/2 w-[800px] h-[800px] bg-ugen-secondary/10 rounded-full blur-[100px]" />
              <div className="absolute -bottom-1/2 -left-1/2 w-[600px] h-[600px] bg-ugen-primary/10 rounded-full blur-[100px]" />
              {/* Light particles illusion using radial gradient */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
              
              {/* Badge */}
              <FadeUp>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/10 backdrop-blur-md mb-8 shadow-xl">
                  <Rocket className="w-4 h-4 text-ugen-primary" />
                  <span className="text-sm font-semibold text-white tracking-wide uppercase">
                    Start Creating Today
                  </span>
                </div>
              </FadeUp>

              {/* Heading */}
              <FadeUp delay={0.1}>
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight text-white mb-6 leading-[1.1] max-w-3xl mx-auto">
                  Ready to Create <span className="text-gradient">Amazing AI Prompts?</span>
                </h2>
              </FadeUp>

              {/* Description */}
              <FadeUp delay={0.2}>
                <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl mx-auto mb-12">
                  Join thousands of creators using ugenAI to discover, generate, and master professional AI prompts.
                </p>
              </FadeUp>

              {/* CTA Buttons */}
              <StaggerContainer staggerDelay={0.1}>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                  
                  {/* Primary Button */}
                  <Link href="/signup" passHref className="w-full sm:w-auto">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="group relative flex items-center justify-center px-8 py-4 sm:py-5 text-base font-bold text-white transition-all duration-300 rounded-full bg-gradient-to-r from-ugen-primary via-ugen-secondary to-ugen-accent shadow-[0_0_40px_rgba(139,92,246,0.4)] hover:shadow-[0_0_60px_rgba(139,92,246,0.6)] overflow-hidden w-full sm:w-auto"
                    >
                      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="relative z-10 flex items-center gap-2">
                        Start Creating
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
                      </span>
                    </motion.div>
                  </Link>

                  {/* Secondary Button */}
                  <Link href="/ugen-gallery" passHref className="w-full sm:w-auto">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="group relative flex items-center justify-center px-8 py-4 sm:py-5 text-base font-bold text-white transition-all duration-300 rounded-full glass bg-white/5 border border-white/20 hover:bg-white/10 hover:border-white/30 w-full sm:w-auto"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <ImageIcon className="w-5 h-5 text-white/70 group-hover:text-white transition-colors duration-300" />
                        Explore Gallery
                      </span>
                    </motion.div>
                  </Link>

                </div>
              </StaggerContainer>

            </div>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
};
