import TopBar from "@/components/layout/TopBar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import TickerSection from "@/components/sections/TickerSection";
import WhySection from "@/components/sections/WhySection";
import UtilitySection from "@/components/sections/UtilitySection";
import TokenomicsSection from "@/components/sections/TokenomicsSection";
import EcosystemSection from "@/components/sections/EcosystemSection";
import RoadmapSection from "@/components/sections/RoadmapSection";
import KnowledgeSection from "@/components/sections/KnowledgeSection";
import CommunitySection from "@/components/sections/CommunitySection";
import FAQSection from "@/components/sections/FAQSection";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <TopBar />
      <HeroSection />
      <TickerSection />
      <WhySection />
      <UtilitySection />
      <TokenomicsSection />
      <EcosystemSection />
      <RoadmapSection />
      <KnowledgeSection />
      <CommunitySection />
      <FAQSection />
      <Footer />
    </main>
  );
}
