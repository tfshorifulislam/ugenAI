"use client";

import { motion } from "framer-motion";
import { FadeUp } from "./animations/FadeUp";
import { StaggerContainer } from "./animations/StaggerContainer";
import { MessageCircle, Star, BadgeCheck, Users, Image as ImageIcon, Rocket } from "lucide-react";

type Testimonial = {
  name: string;
  profession: string;
  avatar: string;
  text: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Alex Rivera",
    profession: "AI Artist",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&auto=format&fit=crop",
    text: "ugenAI completely changed how I write prompts. My AI images are now far more detailed and realistic.",
  },
  {
    name: "Samantha Lee",
    profession: "Content Creator",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
    text: "The learning roadmap helped me understand prompt engineering much faster than YouTube tutorials.",
  },
  {
    name: "Marcus Thorne",
    profession: "Designer",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=150&auto=format&fit=crop",
    text: "The community gallery is an endless source of inspiration.",
  },
  {
    name: "Elena Frost",
    profession: "Product Manager",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop",
    text: "Beautiful UI, amazing performance, and incredibly useful prompt generator.",
  },
  {
    name: "David Kim",
    profession: "Developer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
    text: "I love how easy it is to organize and save my favorite prompts.",
  },
  {
    name: "Sophia Martinez",
    profession: "Freelancer",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format&fit=crop",
    text: "The best prompt platform I've used so far.",
  },
];

const trustBadges = [
  { icon: <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />, text: "4.9/5 Average Rating" },
  { icon: <Users className="w-4 h-4 text-ugen-secondary" />, text: "20K+ Happy Creators" },
  { icon: <ImageIcon className="w-4 h-4 text-ugen-accent" />, text: "100K+ AI Images Created" },
  { icon: <Rocket className="w-4 h-4 text-ugen-primary" />, text: "Trusted Worldwide" },
];

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
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
      <div className="relative h-full bg-ugen-surface/90 backdrop-blur-xl rounded-[23px] p-8 flex flex-col justify-between border border-white/5 overflow-hidden shadow-2xl group-hover:shadow-[0_20px_40px_rgba(99,102,241,0.15)] transition-shadow duration-500">
        
        {/* Soft gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10 flex flex-col h-full">
          {/* Top: Rating */}
          <div className="flex gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            ))}
          </div>

          {/* Quote Text */}
          <p className="text-white/80 text-lg leading-relaxed mb-8 italic font-light flex-grow">
            "{testimonial.text}"
          </p>

          {/* User Info */}
          <div className="flex items-center gap-4 pt-6 border-t border-white/10">
            <motion.div 
              className="relative w-12 h-12 rounded-full overflow-hidden border border-white/20"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <img 
                src={testimonial.avatar} 
                alt={testimonial.name} 
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <h4 className="text-white font-bold tracking-tight">
                  {testimonial.name}
                </h4>
                <BadgeCheck className="w-4 h-4 text-ugen-secondary" />
              </div>
              <span className="text-sm font-medium text-white/50">
                {testimonial.profession}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const TrustBadge = ({ icon, text }: { icon: React.ReactNode; text: string }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, scale: 0.9 },
        show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
      }}
      whileHover={{ y: -3, scale: 1.02 }}
      className="flex items-center gap-3 px-5 py-3 rounded-full bg-white/5 border border-white/10 glass shadow-lg cursor-default hover:bg-white/10 transition-colors duration-300"
    >
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10">
        {icon}
      </div>
      <span className="text-sm font-semibold text-white/80">{text}</span>
    </motion.div>
  );
};

export const TestimonialsSection = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-ugen-bg">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Glowing Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-ugen-secondary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[800px] h-[800px] bg-ugen-accent/5 rounded-full blur-[120px]" />
        {/* Soft Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <FadeUp>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6 shadow-xl">
              <MessageCircle className="w-4 h-4 text-ugen-accent" />
              <span className="text-sm font-medium text-white/80 tracking-wide">
                Testimonials
              </span>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
              Loved by AI Creators <span className="text-gradient">Around the World</span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
              See how creators, designers, and AI enthusiasts use ugenAI to create better prompts and generate incredible AI artwork.
            </p>
          </FadeUp>
        </div>

        {/* Testimonials Grid */}
        <StaggerContainer staggerDelay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-20 mb-16">
            {testimonials.map((testimonial, idx) => (
              <TestimonialCard key={idx} testimonial={testimonial} />
            ))}
          </div>
        </StaggerContainer>

        {/* Trust Badges */}
        <StaggerContainer staggerDelay={0.1}>
          <div className="flex flex-wrap items-center justify-center gap-4 relative z-20">
            {trustBadges.map((badge, idx) => (
              <TrustBadge key={idx} icon={badge.icon} text={badge.text} />
            ))}
          </div>
        </StaggerContainer>
        
      </div>
    </section>
  );
};
