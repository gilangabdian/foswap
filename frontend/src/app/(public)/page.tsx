import HeroSection from "@/components/public/hero-section";
import HowItWorksSection from "@/components/public/how-it-works-section";
import FeaturesSection from "@/components/public/features-section";
import CtaSection from "@/components/public/cta-section";

export default function HomePage() {
  return (
    <main className="flex-1 w-full text-white overflow-hidden bg-[#151515]">
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <CtaSection />
    </main>
  );
}
