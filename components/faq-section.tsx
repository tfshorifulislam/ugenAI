"use client";

import { motion } from "framer-motion";
import { FadeUp } from "./animations/FadeUp";
import { StaggerContainer } from "./animations/StaggerContainer";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FAQ = {
  question: string;
  answer: string;
};

const faqs: FAQ[] = [
  {
    question: "What is ugenAI?",
    answer: "ugenAI is an AI prompt platform that helps creators generate, discover, and learn professional AI prompts."
  },
  {
    question: "How does the AI prompt generator work?",
    answer: "ugenAI transforms simple ideas into detailed, optimized prompts designed for high-quality AI image generation."
  },
  {
    question: "Can beginners use ugenAI?",
    answer: "Yes. ugenAI provides beginner-friendly learning resources and guides to help anyone start with AI prompting."
  },
  {
    question: "Can I save my favorite prompts?",
    answer: "Yes. Users can save, organize, and manage their favorite prompts for future projects."
  },
  {
    question: "What AI image generators are supported?",
    answer: "ugenAI prompts can be used with popular AI image generation tools and models."
  },
  {
    question: "Is ugenAI free to use?",
    answer: "Users can explore many features for free, with additional premium features available in the future."
  },
  {
    question: "Can I share my own prompts?",
    answer: "Yes. Creators can contribute their prompts and inspire the ugenAI community."
  },
  {
    question: "How can I learn prompt engineering?",
    answer: "The Learn AI section provides structured lessons and practical examples to improve your prompting skills."
  }
];

export const FAQSection = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-ugen-bg">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Glowing Orbs */}
        <div className="absolute top-0 right-1/4 w-[700px] h-[700px] bg-ugen-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-ugen-accent/5 rounded-full blur-[120px]" />
        {/* Soft Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <FadeUp>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6 shadow-xl">
              <HelpCircle className="w-4 h-4 text-ugen-secondary" />
              <span className="text-sm font-medium text-white/80 tracking-wide">
                Frequently Asked Questions
              </span>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
              Everything You Need to Know <span className="text-gradient">About ugenAI</span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
              Find answers to common questions about AI prompts, features, learning resources, and the ugenAI platform.
            </p>
          </FadeUp>
        </div>

        {/* Accordion List */}
        <div className="max-w-3xl mx-auto">
          <StaggerContainer staggerDelay={0.1}>
            <Accordion type="single" collapsible className="w-full flex flex-col gap-4">
              {faqs.map((faq, idx) => (
                <motion.div
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                  }}
                  className="w-full"
                >
                  <AccordionItem 
                    value={`item-${idx}`} 
                    className="border-none rounded-2xl p-[1px] bg-white/5 data-[state=open]:bg-gradient-to-r data-[state=open]:from-ugen-primary/40 data-[state=open]:via-ugen-secondary/40 data-[state=open]:to-ugen-accent/40 transition-all duration-500 hover:bg-white/10"
                  >
                    <div className="bg-ugen-surface/90 backdrop-blur-xl rounded-[15px] border border-white/5 overflow-hidden transition-all duration-500">
                      <AccordionTrigger className="px-6 py-5 text-left text-base sm:text-lg font-semibold text-white/90 hover:text-white hover:no-underline [&[data-state=open]]:text-white data-[state=open]:bg-white/5 transition-all">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-5 text-white/60 text-sm sm:text-base leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </div>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </StaggerContainer>
        </div>
        
      </div>
    </section>
  );
};
