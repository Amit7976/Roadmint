import SplashCursor from "@/components/Animations/SplashCursor";
import { Meteors } from "@/components/magicui/meteors";
import Faq from "@/components/mainUi/Faq";
import { FeaturesSection } from "@/components/mainUi/features";
import Footer from "@/components/mainUi/Footer";
import Header from "@/components/mainUi/Header";
import Hero from "@/components/mainUi/Hero";
  
export default function Page() {

  return (
    <>
      <div className="bg-neutral-900" id="main">
        <Meteors />
        <SplashCursor />
        <Header />
        <Hero />
        <FeaturesSection />
        <Faq />
        <Footer />
      </div>
    </>
  );
}
