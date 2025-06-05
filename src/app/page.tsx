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
      <main className="bg-neutral-900" id="main">
        <div className="absolute inset-0 isolate z-[2] hidden lg:block contain-strict">
          <div className="absolute left-0 top-0 h-[1280px] w-[560px] -translate-y-[350px] -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]"></div>
          <div className="absolute left-0 top-0 h-[1280px] w-[240px] -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]"></div>
          <div className="absolute left-0 top-0 h-[1280px] w-[240px] -translate-y-[350px] -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]"></div>
        </div>

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
      </main>
    </>
  );
}
