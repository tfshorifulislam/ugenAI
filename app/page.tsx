import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { FeaturesSection } from "@/components/features-section";
import { HowItWorks } from "@/components/how-it-works";
import { CategoriesSection } from "@/components/categories-section";
import { FeaturedGallery } from "@/components/featured-gallery";
import { LearnSection } from "@/components/learn-section";
import { WhyChooseSection } from "@/components/why-choose-section";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-ugen-bg overflow-hidden selection:bg-ugen-primary/30">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <HowItWorks />
      <CategoriesSection />
      <FeaturedGallery />
      <LearnSection />
      <WhyChooseSection />
    </main>
  );
}