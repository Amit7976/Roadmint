import { Meteors } from "@/components/magicui/meteors";
import DailyQuote from "@/components/mainUi/DailyQuote";
import DailyTip from "@/components/mainUi/DailyTip";
import DailyTrivia from "@/components/mainUi/DailyTrivia";
import Faq from "@/components/mainUi/Faq";
import { FeaturesSection } from "@/components/mainUi/features";
import Footer from "@/components/mainUi/Footer";
import FunDevStat from "@/components/mainUi/FunDevStat";
import Header from "@/components/mainUi/Header";
import Hero from "@/components/mainUi/Hero";


//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////


export default function Page() {
  return (
    <>
      <div className="bg-neutral-900" id="main">
        <div className="w-[98%] h-screen absolute z-0 overflow-hidden">
          <Meteors />
        </div>
        <div className="z-10 relative">
          <Header />
          <Hero />
          <div className="p-2 space-y-5">
            <DailyQuote />
            <DailyTip />
            <FunDevStat />
            <DailyTrivia />
          </div>
          <FeaturesSection />
          <Faq />
          <Footer />
        </div>
      </div>
    </>
  );
}
