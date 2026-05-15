import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TickerBar from "@/components/sections/TickerBar";
import HeroSection from "@/components/sections/HeroSection";
import PartnersSection from "@/components/sections/PartnersSection";
import MetricsSection from "@/components/sections/MetricsSection";
import ValuePropSection from "@/components/sections/ValuePropSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Header />
      <TickerBar />
      <HeroSection />
      <PartnersSection />
      <MetricsSection />
      <ValuePropSection />
      <HowItWorksSection />
      <Footer />
    </main>
  );
}
