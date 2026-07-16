import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { FeaturesSection } from "@/components/features-section";
import { HowItWorks } from "@/components/how-it-works";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-ugen-bg overflow-hidden selection:bg-ugen-primary/30">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <HowItWorks />
    </main>
  );
}