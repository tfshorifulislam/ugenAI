"use client";

import { motion } from "framer-motion";
import { FadeUp } from "./animations/FadeUp";
import { StaggerContainer } from "./animations/StaggerContainer";
import { TrendingUp, Sparkles, Users, Image as ImageIcon, Heart } from "lucide-react";
import CountUp from "react-countup";

type Stat = {
  id: string;
  value: number;
  suffix: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
};

const stats: Stat[] = [
  {
    id: "1",
    value: 25,
    suffix: "K+",
    label: "AI Prompts",
    description: "Professional prompts created by the community.",
    icon: <Sparkles className="w-5 h-5 text-white" />,
    color: "from-ugen-primary to-blue-500",
  },
  {
    id: "2",
    value: 12,
    suffix: "K+",
    label: "Active Creators",
    description: "Designers, artists, and AI enthusiasts using ugenAI.",
    icon: <Users className="w-5 h-5 text-white" />,
    color: "from-ugen-secondary to-fuchsia-500",
  },
  {
    id: "3",
    value: 150,
    suffix: "K+",
    label: "AI Images",
    description: "Amazing AI artworks generated using our prompts.",
    icon: <ImageIcon className="w-5 h-5 text-white" />,
    color: "from-ugen-accent to-teal-400",
  },
  {
    id: "4",
    value: 98,
    suffix: "%",
    label: "Satisfaction",
    description: "Creators who recommend ugenAI to others.",
    icon: <Heart className="w-5 h-5 text-white" />,
    color: "from-pink-500 to-rose-400",
  },
];

const StatCard = ({ stat }: { stat: Stat }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
      }}
      whileHover={{ y: -8 }}
      className="group relative rounded-3xl p-[1px] bg-white/5 hover:bg-white/10 transition-colors duration-500 h-full"
    >
      {/* Glow Border Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-ugen-primary/40 via-ugen-secondary/40 to-ugen-accent/40 rounded-3xl opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500" />
      
      {/* Inner Card */}
      <div className="relative h-full bg-ugen-surface/90 backdrop-blur-xl rounded-[23px] p-6 lg:p-8 flex flex-col items-center text-center border border-white/5 overflow-hidden shadow-2xl group-hover:shadow-[0_20px_40px_rgba(99,102,241,0.15)] transition-shadow duration-500">
        
        {/* Soft gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10 flex flex-col items-center h-full">
          {/* Icon */}
          <motion.div 
            className={`w-12 h-12 rounded-xl mb-6 flex items-center justify-center shadow-lg bg-gradient-to-br ${stat.color}`}
            whileHover={{ scale: 1.15, rotate: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {stat.icon}
          </motion.div>

          {/* Animated Counter */}
          <h3 className="text-4xl lg:text-5xl font-black text-white tracking-tight mb-2 flex items-center justify-center">
            <CountUp 
              end={stat.value} 
              suffix={stat.suffix}
              duration={2.5}
              enableScrollSpy
              scrollSpyOnce
              useEasing
            />
          </h3>

          {/* Labels */}
          <h4 className="text-lg font-bold text-white/90 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-colors">
            {stat.label}
          </h4>
          
          <p className="text-sm text-white/60 leading-relaxed font-medium">
            {stat.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export const StatisticsSection = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-ugen-bg">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Glowing Orbs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-ugen-primary/5 rounded-full blur-[150px]" />
        {/* Soft Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <FadeUp>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6 shadow-xl">
              <TrendingUp className="w-4 h-4 text-ugen-accent" />
              <span className="text-sm font-medium text-white/80 tracking-wide">
                Our Impact
              </span>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
              Growing with Thousands of <span className="text-gradient">AI Creators</span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
              Every day, creators use ugenAI to generate better prompts, learn faster, and create amazing AI artwork.
            </p>
          </FadeUp>
        </div>

        {/* Statistics Grid */}
        <StaggerContainer staggerDelay={0.1}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 relative z-20">
            {stats.map((stat) => (
              <StatCard key={stat.id} stat={stat} />
            ))}
          </div>
        </StaggerContainer>
        
      </div>
    </section>
  );
};
