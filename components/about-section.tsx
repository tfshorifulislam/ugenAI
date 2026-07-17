"use client";

import { motion } from "framer-motion";
import { FadeUp } from "./animations/FadeUp";
import { StaggerContainer } from "./animations/StaggerContainer";
import { Sparkles, Compass, Lightbulb, GraduationCap, Bookmark, ArrowRight, Play } from "lucide-react";
import Link from "next/link";

const images = [
  {
    src: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop",
    alt: "AI Image Generation",
    className: "h-[240px] mt-8",
    delay: 0,
  },
  {
    src: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop",
    alt: "Prompt Engineering",
    className: "h-[300px]",
    delay: 0.2,
  },
  {
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    alt: "Creative Design",
    className: "h-[280px]",
    delay: 0.4,
  },
  {
    src: "https://images.unsplash.com/photo-1633412802994-5c058f151b66?q=80&w=800&auto=format&fit=crop",
    alt: "AI Technology",
    className: "h-[220px] -mt-12",
    delay: 0.6,
  },
];

const features = [
  {
    icon: <Compass className="w-5 h-5 text-ugen-primary" />,
    text: "Discover thousands of AI prompts",
  },
  {
    icon: <Lightbulb className="w-5 h-5 text-ugen-secondary" />,
    text: "Generate high-quality prompt ideas",
  },
  {
    icon: <GraduationCap className="w-5 h-5 text-ugen-accent" />,
    text: "Learn prompt engineering step by step",
  },
  {
    icon: <Bookmark className="w-5 h-5 text-pink-400" />,
    text: "Save and organize your favorite prompts",
  },
];

export const AboutSection = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-ugen-bg">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Side: Image Gallery */}
          <div className="relative order-2 lg:order-1">
            {/* Glowing background gradient for depth */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-ugen-primary/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="grid grid-cols-2 gap-4 md:gap-6 relative z-10">
              {images.map((img, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{
                    duration: 0.8,
                    delay: img.delay,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  }}
                  className={`relative w-full rounded-[2rem] overflow-hidden glass border border-white/10 group ${img.className}`}
                >
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: img.delay,
                    }}
                    className="w-full h-full relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-ugen-bg/80 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="order-1 lg:order-2 flex flex-col justify-center">
            <StaggerContainer staggerDelay={0.15}>

              <FadeUp>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6 shadow-xl">
                  <Sparkles className="w-4 h-4 text-ugen-secondary" />
                  <span className="text-sm font-medium text-white/80 tracking-wide">
                    About ugenAI
                  </span>
                </div>
              </FadeUp>

              <FadeUp>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
                  Create Better <span className="text-gradient">AI Images</span> with Better Prompts
                </h2>
              </FadeUp>

              <FadeUp>
                <p className="text-lg text-white/60 mb-8 leading-relaxed max-w-xl">
                  ugenAI is a modern AI prompt platform designed to help creators generate high-quality prompts, discover community creations, and learn the art of prompt engineering. Whether you're creating images, artwork, or AI-generated content, ugenAI provides the tools and inspiration to achieve professional results faster.
                </p>
              </FadeUp>

              <FadeUp>
                <ul className="space-y-4 mb-10">
                  {features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 glass shadow-sm">
                        {feature.icon}
                      </div>
                      <span className="text-base font-medium text-white/80">
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </FadeUp>

              <FadeUp>
                <div className="flex flex-row flex-wrap items-center justify-center gap-4">
                  <Link href="/ugen-gallery">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-medium text-white rounded-full bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/30 hover:shadow-[0_0_40px_rgba(139,92,246,0.4)] overflow-hidden transition-all duration-300"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-ugen-primary/40 to-ugen-secondary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <span className="relative z-10 flex items-center gap-2">
                        Explore Gallery
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </motion.div>
                  </Link>

                  <Link href="/learn-ai">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-medium text-white rounded-full glass hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-300"
                    >
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

        </div>
      </div>
    </section>
  );
};
