import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-ugen-bg overflow-hidden selection:bg-ugen-primary/30">
      <Navbar />
      <HeroSection />
      <AboutSection />
    </main>
  );
}